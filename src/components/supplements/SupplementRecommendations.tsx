import React, { useState, useEffect } from 'react';
import { Loader2, Info } from 'lucide-react';
import { supplementApi, Supplement, SupplementStack } from '../../api/supplementApi';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { supplementApi } from '../../api/supplementApi';

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

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      const data = await supplementApi.getPersonalizedRecommendations(user.id);
      setRecommendations(data);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      setError('Failed to load personalized recommendations. Please try again.');
      
      // Set mock data for development
      setRecommendations({
        supplements: [],
        stacks: [],
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-700 dark:text-red-300">
        <p>{error}</p>
        <Button onClick={loadRecommendations} className="mt-4">
          Try Again
        </Button>
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
                        +{stack.components.length - 3} more supplements
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="font-bold text-lg text-primary dark:text-primary-light">
                      {stack.total_price.toFixed(2)} AED
                    </span>
                    <Button as={Link} to={`/my-stacks/${stack.id}`} size="sm">
                      View Stack
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button as={Link} to="/my-stacks" variant="outline">
              View All Stacks
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplementRecommendations;