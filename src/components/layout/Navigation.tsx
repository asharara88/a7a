import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Info, Filter, Check, AlertCircle, X, ShieldCheck, Plus, Package, Store, Sparkles, Edit, Trash2, ArrowRight } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { supplementApi } from '../api/supplementApi';
import StackBuilderModal from '../components/supplements/StackBuilderModal';
import SupplementGrid from '../components/supplements/SupplementGrid';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SupplementsPage: React.FC = () => {
  const [supplements, setSupplements] = useState([]);
  const [stacks, setStacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTierInfo, setShowTierInfo] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  const [showStackBuilder, setShowStackBuilder] = useState(false);
  const [selectedSupplementId, setSelectedSupplementId] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null);

  useEffect(() => {
    fetchSupplements();
    fetchStacks();
  }, []);

  const fetchSupplements = async () => {
    setIsLoading(true);
    try {
      const data = await supplementApi.getSupplements({ tier: 'all' });
      setSupplements(data || []);
    } catch (err) {
      console.error('Error fetching supplements:', err);
      setError('Failed to load supplements. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStacks = async () => {
    try {
      // Get user ID
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const stacks = await supplementApi.getUserSupplementStacks(user.id);
        setStacks(stacks || []);
      } else {
        // Mock data for demo
        setStacks([
          {
            id: '1',
            name: 'Morning Energy Stack',
            description: 'Supplements to boost energy and focus in the morning',
            components: [
              { name: 'Vitamin B Complex', dosage: '1 capsule', timing: 'With breakfast' },
              { name: 'Omega-3', dosage: '1000mg', timing: 'With breakfast' },
              { name: 'Rhodiola Rosea', dosage: '500mg', timing: 'Morning' }
            ],
            total_price: 205.00,
            is_active: true
          },
          {
            id: '2',
            name: 'Sleep & Recovery',
            description: 'Supplements to improve sleep quality and recovery',
            components: [
              { name: 'Magnesium Glycinate', dosage: '400mg', timing: 'Before bed' },
              { name: 'L-Theanine', dosage: '200mg', timing: 'Before bed' },
              { name: 'Zinc', dosage: '15mg', timing: 'With dinner' }
            ],
            total_price: 215.00,
            is_active: true
          },
          {
            id: '3',
            name: 'Immune Support',
            description: 'Supplements to boost immune system',
            components: [
              { name: 'Vitamin D3', dosage: '5000 IU', timing: 'With breakfast' },
              { name: 'Vitamin C', dosage: '1000mg', timing: 'With lunch' },
              { name: 'Zinc', dosage: '15mg', timing: 'With dinner' }
            ],
            total_price: 155.00,
            is_active: false
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching stacks:', err);
      // Not setting error since this is supplementary data
    }
  };

  const handleAddToCart = (supplementId) => {
    setAddingToCart(supplementId);
    // Simulate adding to cart with delay
    setTimeout(() => {
      setAddingToCart(null);
    }, 1000);
  };

  const handleAddToStack = (supplementId) => {
    setSelectedSupplementId(supplementId);
    setShowStackBuilder(true);
  };

  const handleCreateStack = () => {
    setSelectedSupplementId(null);
    setShowStackBuilder(true);
  };

  const handleSaveStack = async (stackData) => {
    try {
      await supplementApi.createSupplementStack(stackData);
      // Refresh stacks after saving
      fetchStacks();
    } catch (error) {
      console.error('Error saving stack:', error);
      throw error;
    }
  };

  const handleDeleteStack = (id) => {
    setStacks(stacks.filter(stack => stack.id !== id));
  };

  const handleToggleActive = (id) => {
    setStacks(stacks.map(stack => 
      stack.id === id ? { ...stack, is_active: !stack.is_active } : stack
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
      <div className="mobile-container">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Supplements</h1>
            <p className="text-gray-600 dark:text-gray-400">Explore, shop, and manage your supplements</p>
          </div>
          <div className="flex space-x-2">
            <Button className="flex items-center" onClick={handleCreateStack}>
              <Plus className="w-4 h-4 mr-2" />
              Create Stack
            </Button>
            <Link to="/cart">
              <Button variant="outline">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="explore" onValueChange={setActiveTab} className="mb-6">
          <TabsList className="mb-6">
            <TabsTrigger value="explore" className="flex items-center">
              <Store className="w-4 h-4 mr-2" />
              Explore
            </TabsTrigger>
            <TabsTrigger value="my-stacks" className="flex items-center">
              <Package className="w-4 h-4 mr-2" />
              My Stacks
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Recommendations
            </TabsTrigger>
          </TabsList>

          {/* Explore Supplements Tab */}
          <TabsContent value="explore">
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

            <SupplementGrid 
              supplements={supplements}
              onAddToCart={handleAddToCart}
              onAddToStack={handleAddToStack}
              loading={isLoading}
              error={error}
            />
          </TabsContent>

          {/* My Stacks Tab */}
          <TabsContent value="my-stacks">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : stacks.length === 0 ? (
              <Card className="p-12 text-center">
                <Package className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Supplement Stacks</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  You haven't created any supplement stacks yet. Create your first stack to get started.
                </p>
                <Button className="flex items-center mx-auto" onClick={handleCreateStack}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Stack
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stacks.map(stack => (
                  <Card key={stack.id} className="overflow-hidden">
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{stack.name}</h3>
                        <div className="flex space-x-1">
                          <button 
                            className="p-1 text-gray-500 hover:text-primary rounded-full"
                            aria-label="Edit stack"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-1 text-gray-500 hover:text-red-500 rounded-full"
                            aria-label="Delete stack"
                            onClick={() => handleDeleteStack(stack.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{stack.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        {stack.components.map((supplement, index) => {
                          return (
                            <div key={index} className="flex justify-between text-sm">
                              <div>
                                <span className="font-medium text-gray-900 dark:text-white">{supplement.name}</span>
                                <span className="text-gray-600 dark:text-gray-400 ml-2">({supplement.dosage})</span>
                              </div>
                              <span className="text-gray-900 dark:text-white font-medium">
                                {typeof supplement.price === 'number' 
                                  ? supplement.price.toFixed(2) 
                                  : supplement.price} AED
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                        <span className="font-bold text-lg text-primary dark:text-primary-light">
                          Total: {stack.total_price.toFixed(2)} AED
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Active</span>
                          <button
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                              stack.is_active ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                            onClick={() => handleToggleActive(stack.id)}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                stack.is_active ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">
                          Order Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 flex items-start shadow-sm mb-6">
              <Info className="w-5 h-5 mr-4 flex-shrink-0 mt-0.5" />
              <p className="tracking-wide leading-relaxed">
                Based on your health profile, we recommend the following supplements to support your wellness goals.
                Green tier supplements have the strongest scientific evidence, while yellow and orange tiers have 
                moderate or preliminary evidence respectively.
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <Card className="p-6 text-center">
                <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={fetchSupplements}>
                  Try Again
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {supplements.slice(0, 6).map(supplement => (
                  <Card key={supplement.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
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
                        {supplement.brand || 'Biowell'}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                        {supplement.use_case || supplement.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900 dark:text-white">
                          {supplement.price_aed?.toFixed(2)} AED
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
            )}

            <div className="mt-6 text-center">
              <Button as={Link} to="/recommendations" variant="outline">
                View All Recommendations <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Stack Builder Modal */}
        <StackBuilderModal
          isOpen={showStackBuilder}
          onClose={() => setShowStackBuilder(false)}
          initialSupplementId={selectedSupplementId || undefined}
          onSaveStack={handleSaveStack}
        />
      </div>
    </div>
  );
};

export default SupplementsPage;