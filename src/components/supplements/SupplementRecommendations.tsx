import React, { useState, useEffect } from 'react';
import { Loader2, Info, AlertTriangle, RefreshCw, Sparkles } from 'lucide-react';
import { supplementApi, Supplement, SupplementStack } from '../../api/supplementApi';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { cn } from '../../utils/cn';

// Helper function to get tier badge component
const getTierBadge = (tier: string) => {
  const colors = {
    green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colors[tier] || colors.orange}`}>
      {tier.charAt(0).toUpperCase() + tier.slice(1)} Tier
    </span>
  );
};

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SupplementRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<{
    supplements: Supplement[];
    stacks: SupplementStack[];
    personalized_message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [selectedStackId, setSelectedStackId] = useState<string | null>(null);

  const [retryCount, setRetryCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      let userId = user?.id;
      
      // For demo purposes, use a fallback if no user is authenticated
      if (!userId) {
        console.warn('No authenticated user, using demo mode');
        userId = 'demo-user-id';
      }
      
      const data = await supplementApi.getPersonalizedRecommendations(userId);
      setRecommendations(data);
      setLastUpdated(new Date());
      setRetryCount(0);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      setError('Failed to load recommendations. Check your connection and try again.');
      
      // Set mock data for development
      setRecommendations({
        supplements: getMockSupplements(),
        stacks: getMockStacks(),
        personalized_message: "We're preparing your personalized recommendations."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (supplementId: string) => {
    try {
      setAddingToCart(supplementId);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      await supplementApi.addToCart(user.id, supplementId);
      
      // Show success state briefly
      setTimeout(() => {
        setAddingToCart(null);
      }, 1500);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setAddingToCart(null);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    loadRecommendations();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading personalized recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />
          <h3 className="text-lg font-medium text-red-800 dark:text-red-300">Failed to Load Recommendations</h3>
        </div>
        <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
        <div className="flex gap-3">
          <Button onClick={handleRetry} className="flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again {retryCount > 0 && `(${retryCount})`}
          </Button>
          <Button variant="outline" as={Link} to="/supplements">
            Browse All Supplements
          </Button>
        </div>
      </div>
    );
  }

  if (!recommendations || (!recommendations.supplements.length && !recommendations.stacks.length)) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          No personalized recommendations available yet. Complete your profile to get tailored suggestions.
        </p>
        <Button as={Link} to="/onboarding">
          Complete Your Profile
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with last updated info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Sparkles className="w-6 h-6 text-primary mr-3" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Personalized Recommendations</h2>
            {lastUpdated && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        <Button variant="outline" onClick={loadRecommendations} size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {recommendations.personalized_message && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 flex items-start shadow-sm">
          <Info className="w-5 h-5 mr-4 flex-shrink-0 mt-0.5" />
          <p className="tracking-wide leading-relaxed">{recommendations.personalized_message}</p>
        </div>
      )}

      {/* Recommended Supplements */}
      {recommendations.supplements.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Recommended Supplements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {recommendations.supplements.slice(0, 6).map((supplement) => (
              <Card key={supplement.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48">
                  <img 
                    src={supplement.image_url || 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300'} 
                    alt={supplement.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      supplement.tier === 'green' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : supplement.tier === 'yellow'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                    }`}>
                      {supplement.tier.charAt(0).toUpperCase() + supplement.tier.slice(1)} Tier
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">
                    {supplement.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {supplement.brand}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                    {supplement.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900 dark:text-white">
                      {supplement.price_aed.toFixed(2)} AED
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        as={Link}
                        to={`/supplements/${supplement.id}`}
                        variant="outline"
                        size="sm"
                      >
                        Details
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(supplement.id)}
                        disabled={addingToCart === supplement.id}
                      >
                        {addingToCart === supplement.id ? 'Added!' : 'Add to Cart'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {recommendations.supplements.length > 6 && (
            <div className="mt-4 text-center">
              <Button as={Link} to="/supplements" variant="outline">
                View All Recommendations
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Recommended Stacks */}
      {recommendations.stacks.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Recommended Supplement Stacks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.stacks.map((stack) => (
              <Card key={stack.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="p-5">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {stack.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {stack.description || `A curated stack for ${stack.category.toLowerCase()} support.`}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {stack.components.slice(0, 3).map((component, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          {component.name || component}
                        </span>
                        {component.price && (
                          <span className="font-medium text-gray-900 dark:text-white">
                            {typeof component.price === 'number' ? component.price.toFixed(2) : component.price} AED
                          </span>
                        )}
                      </div>
                    ))}
                    
                    {stack.components.length > 3 && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        +{stack.components.length - 3} more supplement{stack.components.length - 3 > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="font-bold text-lg text-primary dark:text-primary-light">
                      {Number(stack.total_price).toFixed(2)} AED
                    </span>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={cn(
                          "text-xs px-3 py-1",
                          selectedStackId === stack.id && "bg-green-50 text-green-700 border-green-300"
                        )}
                        onClick={() => setSelectedStackId(selectedStackId === stack.id ? null : stack.id)}
                      >
                        {selectedStackId === stack.id ? "Selected" : "Select Stack"}
                      </Button>
                      <Button as={Link} to={`/my-stacks/${stack.id}`} size="sm" className="text-xs px-3 py-1">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button as={Link} to="/my-stacks" variant="outline">
              View All Stacks
            </Button>
            {selectedStackId && (
              <Button 
                className="ml-4" 
                as={Link} 
                to={`/my-stacks/${selectedStackId}`}
              >
                Proceed with Selected Stack
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Mock supplements for development/fallback
function getMockSupplements(): Supplement[] {
  return [
    {
      id: '1',
      name: 'Creatine Monohydrate',
      brand: 'Biowell',
      description: 'Increases strength and power output during high-intensity exercise.',
      detailed_description: 'Increases intramuscular phosphocreatine for rapid ATP regeneration, enhancing strength and power output.',
      tier: 'green',
      use_case: 'Muscle strength & power',
      price_aed: 85.00,
      subscription_discount_percent: 15,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      is_available: true,
      is_featured: true,
      is_bestseller: true
    },
    {
      id: '2',
      name: 'Vitamin D3',
      brand: 'Biowell',
      description: 'Essential fat-soluble vitamin that supports immune function, bone health, and mood regulation.',
      tier: 'green',
      use_case: 'Immune & bone health',
      price_aed: 40.00,
      subscription_discount_percent: 10,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      is_available: true,
      is_featured: false,
      is_bestseller: false
    },
    {
      id: '3',
      name: 'Magnesium Glycinate',
      brand: 'Biowell',
      description: 'Highly bioavailable form of magnesium that supports sleep, muscle recovery, and nervous system function.',
      tier: 'yellow',
      use_case: 'Sleep & recovery',
      price_aed: 75.00,
      subscription_discount_percent: 12,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      is_available: true,
      is_featured: false,
      is_bestseller: false
    }
  ];
}

// Mock stacks for development/fallback
function getMockStacks(): SupplementStack[] {
  return [
    {
      id: '1',
      name: 'Sleep & Recovery Stack',
      category: 'Sleep',
      total_price: 215.00,
      components: [
        { name: 'Magnesium Glycinate', dosage: '400mg', price: 75.00 },
        { name: 'L-Theanine', dosage: '200mg', price: 65.00 },
        { name: 'Ashwagandha', dosage: '600mg', price: 75.00 }
      ]
    },
    {
      id: '2',
      name: 'Cognitive Performance Stack',
      category: 'Cognition',
      total_price: 255.00,
      components: [
        { name: 'Bacopa Monnieri', dosage: '300mg', price: 85.00 },
        { name: 'Lion\'s Mane', dosage: '500mg', price: 95.00 },
        { name: 'Rhodiola Rosea', dosage: '300mg', price: 75.00 }
      ]
    }
  ];
}

export default SupplementRecommendations;