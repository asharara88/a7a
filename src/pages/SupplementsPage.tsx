import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Info, Filter } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Supplement {
  id: string;
  name: string;
  brand: string;
  description: string;
  tier: 'green' | 'yellow' | 'orange';
  use_case: string;
  price_aed: number;
  subscription_discount_percent: number;
  image_url: string;
  rating?: number;
}

const SupplementsPage: React.FC = () => {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTier, setActiveTier] = useState<'all' | 'green' | 'yellow' | 'orange'>('all');
  const [showTierInfo, setShowTierInfo] = useState(false);

  useEffect(() => {
    fetchSupplements();
  }, []);

  const fetchSupplements = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('supplements')
        .select('*')
        .not('tier', 'eq', 'red');
      
      if (error) throw error;
      
      setSupplements(data || []);
    } catch (err) {
      console.error('Error fetching supplements:', err);
      setError('Failed to load supplements. Please try again.');
      
      // Fallback to mock data for demo purposes
      setSupplements(getMockSupplements());
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSupplements = activeTier === 'all' 
    ? supplements 
    : supplements.filter(s => s.tier === activeTier);

  const calculateDiscountedPrice = (price: number, discountPercent: number) => {
    return price - (price * (discountPercent / 100));
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'green':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'orange':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getTierDescription = (tier: string) => {
    switch (tier) {
      case 'green':
        return "Strong evidence – Supported by multiple high-quality human clinical trials and major scientific consensus (e.g., creatine, vitamin D).";
      case 'yellow':
        return "Moderate/emerging evidence – Some supporting studies, but either limited in scale, mixed results, or moderate scientific consensus (e.g., ashwagandha, beta-alanine).";
      case 'orange':
        return "Limited/preliminary evidence – Mostly early-stage or animal/lab-based research, few or low-quality human trials, or anecdotal support (e.g., tongkat ali, shilajit).";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Supplements</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover science-backed supplements for your wellness journey</p>
        </div>

        {/* Tier Information */}
        <div className="mb-6">
          <button 
            onClick={() => setShowTierInfo(!showTierInfo)}
            className="flex items-center text-primary hover:text-primary-dark font-medium"
          >
            <Info className="w-5 h-5 mr-2" />
            {showTierInfo ? 'Hide' : 'Show'} Evidence Tier Information
          </button>
          
          {showTierInfo && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Evidence Tier Definitions</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-3 mt-0.5">Green</span>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Strong evidence – Supported by multiple high-quality human clinical trials and major scientific consensus (e.g., creatine, vitamin D).</p>
                </div>
                <div className="flex items-start">
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 mr-3 mt-0.5">Yellow</span>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Moderate/emerging evidence – Some supporting studies, but either limited in scale, mixed results, or moderate scientific consensus (e.g., ashwagandha, beta-alanine).</p>
                </div>
                <div className="flex items-start">
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 mr-3 mt-0.5">Orange</span>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Limited/preliminary evidence – Mostly early-stage or animal/lab-based research, few or low-quality human trials, or anecdotal support (e.g., tongkat ali, shilajit).</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filter by Evidence Tier</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={activeTier === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveTier('all')}
              className="px-4 py-2"
            >
              All Tiers
            </Button>
            <Button 
              variant={activeTier === 'green' ? 'default' : 'outline'}
              onClick={() => setActiveTier('green')}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white"
            >
              Green Tier
            </Button>
            <Button 
              variant={activeTier === 'yellow' ? 'default' : 'outline'}
              onClick={() => setActiveTier('yellow')}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Yellow Tier
            </Button>
            <Button 
              variant={activeTier === 'orange' ? 'default' : 'outline'}
              onClick={() => setActiveTier('orange')}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Orange Tier
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-700 dark:text-red-300 mb-8">
            {error}
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSupplements.map((supplement) => (
              <Card key={supplement.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative">
                  <img
                    src={supplement.image_url || 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300'}
                    alt={supplement.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <span 
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTierColor(supplement.tier)}`}
                      title={getTierDescription(supplement.tier)}
                    >
                      {supplement.tier.charAt(0).toUpperCase() + supplement.tier.slice(1)} Tier
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {supplement.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {supplement.brand}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-medium">Use case:</span> {supplement.use_case || 'General health'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">
                    {supplement.description?.length > 100 
                      ? `${supplement.description.substring(0, 100)}...` 
                      : supplement.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(supplement.rating || 4.5)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {supplement.price_aed.toFixed(2)} AED
                        </span>
                        {supplement.subscription_discount_percent > 0 && (
                          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                            Subscribe & Save {supplement.subscription_discount_percent}%
                          </span>
                        )}
                      </div>
                      
                      {supplement.subscription_discount_percent > 0 && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Subscription price: <span className="font-semibold text-primary">
                            {calculateDiscountedPrice(
                              supplement.price_aed, 
                              supplement.subscription_discount_percent
                            ).toFixed(2)} AED
                          </span>
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <Link
                          to={`/supplements/${supplement.id}`}
                          className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex-1 text-center"
                        >
                          View
                        </Link>
                        <button className="px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center justify-center flex-1">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            {filteredSupplements.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 mb-4">No supplements found in this tier.</p>
                <Button onClick={() => setActiveTier('all')}>View All Supplements</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Mock data function for development and fallback
function getMockSupplements(): Supplement[] {
  return [
    {
      id: '1',
      name: 'Creatine Monohydrate',
      brand: 'Biowell',
      description: 'Increases intramuscular phosphocreatine for rapid ATP regeneration, enhancing strength and power output during high-intensity exercise.',
      tier: 'green',
      use_case: 'Muscle strength & power',
      price_aed: 85.00,
      subscription_discount_percent: 15,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.9
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
      rating: 4.8
    },
    {
      id: '3',
      name: 'Ashwagandha KSM-66',
      brand: 'Biowell',
      description: 'Adaptogenic herb that helps the body manage stress and supports overall wellbeing.',
      tier: 'yellow',
      use_case: 'Stress & anxiety',
      price_aed: 95.00,
      subscription_discount_percent: 12,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.7
    },
    {
      id: '4',
      name: 'Magnesium Glycinate',
      brand: 'Biowell',
      description: 'Highly bioavailable form of magnesium that supports sleep, muscle recovery, and nervous system function.',
      tier: 'green',
      use_case: 'Sleep & recovery',
      price_aed: 75.00,
      subscription_discount_percent: 10,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.8
    },
    {
      id: '5',
      name: 'Tongkat Ali',
      brand: 'Biowell',
      description: 'Traditional herb used to support male hormonal health and vitality.',
      tier: 'orange',
      use_case: 'Hormonal support',
      price_aed: 135.00,
      subscription_discount_percent: 15,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.5
    },
    {
      id: '6',
      name: 'Berberine',
      brand: 'Biowell',
      description: 'Plant compound that supports metabolic health and glucose metabolism.',
      tier: 'yellow',
      use_case: 'Metabolic health',
      price_aed: 110.00,
      subscription_discount_percent: 12,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.6
    },
    {
      id: '7',
      name: 'Rhodiola Rosea',
      brand: 'Biowell',
      description: 'Adaptogenic herb that helps combat fatigue and supports cognitive function during stress.',
      tier: 'yellow',
      use_case: 'Energy & focus',
      price_aed: 95.00,
      subscription_discount_percent: 10,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.7
    },
    {
      id: '8',
      name: 'Beta-Alanine',
      brand: 'Biowell',
      description: 'Non-essential amino acid that helps buffer lactic acid in muscles, potentially improving endurance.',
      tier: 'yellow',
      use_case: 'Endurance',
      price_aed: 95.00,
      subscription_discount_percent: 10,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.6
    }
  ];
}

export default SupplementsPage;