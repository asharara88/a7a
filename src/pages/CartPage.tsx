import React, { useState, useEffect } from 'react'
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Check, Loader2, ShieldCheck, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { createClient } from '@supabase/supabase-js'
import { supplementApi } from '../api/supplementApi'

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface CartItem {
  id: string;
  supplement: {
    id: string;
    name: string;
    brand?: string;
    description?: string;
    price_aed: number;
    image_url?: string;
    tier?: 'green' | 'yellow' | 'orange';
  };
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingQuantity, setUpdatingQuantity] = useState<string | null>(null);
  const [removingItem, setRemovingItem] = useState<string | null>(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    setIsLoading(true);
    try {
      // First get the user ID
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // If no user, use mock data for demo
        setCartItems([
          {
            id: '1',
            supplement: {
              id: 'supp-1',
              name: 'Vitamin D3',
              brand: 'Biowell',
              price_aed: 40.00,
              image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
              tier: 'green'
            },
            quantity: 2
          },
          {
            id: '2',
            supplement: {
              id: 'supp-2',
              name: 'Omega-3 Fish Oil',
              brand: 'Biowell',
              price_aed: 65.00,
              image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
              tier: 'yellow'
            },
            quantity: 1
          }
        ]);
        setIsLoading(false);
        return;
      }
      
      // Then fetch cart items for this user
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          id, quantity,
          supplement:supplement_id (id, name, brand, description, price_aed, image_url, tier)
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setCartItems(data || []);
    } catch (err) {
      console.error('Error fetching cart items:', err);
      setError('Failed to load your cart items');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setUpdatingQuantity(itemId);
    
    // Optimistic update
    const updatedItems = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // For demo mode, just keep the optimistic update
        setUpdatingQuantity(null);
        return;
      }
      
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId)
        .eq('user_id', user.id);
      
      if (error) throw error;
    } catch (err) {
      console.error('Error updating quantity:', err);
      // Revert the optimistic update
      fetchCartItems();
    } finally {
      setUpdatingQuantity(null);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    setRemovingItem(itemId);
    
    // Optimistic update
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // For demo mode, just keep the optimistic update
        setRemovingItem(null);
        return;
      }
      
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)
        .eq('user_id', user.id);
      
      if (error) throw error;
    } catch (err) {
      console.error('Error removing item:', err);
      // Revert the optimistic update
      fetchCartItems();
    } finally {
      setRemovingItem(null);
    }
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => 
    sum + (item.supplement.price_aed * item.quantity), 0);
    
  const shipping = 5.99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      // In a real app, you would redirect to checkout page or show success message
      alert('Thank you for your order! This is a demo checkout.');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
          <Link 
            to="/supplements"
            className="text-primary hover:text-primary-dark font-medium flex items-center" 
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
          </Link>
        </div>

        cartItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
            <>
            <div className="text-gray-500 dark:text-gray-400 mb-6">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm mt-2">Add some supplements to get started</p>
            </div>
            <Link
              to="/supplements"
              className="inline-flex items-center bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
            </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Cart Items ({isLoading ? "..." : cartItems.length})
                  </h2>
                  
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <div className="w-16 h-16 relative">
                          <img 
                            src={item.supplement.image_url || 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300'}
                            alt={item.supplement.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          {item.supplement.tier === 'green' && (
                            <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                              <ShieldCheck className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 ml-4">
                          <div className="flex items-center">
                            <h3 className="font-medium text-gray-900 dark:text-white">{item.supplement.name}</h3>
                            {item.supplement.tier === 'green' && (
                              <span className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs px-2 py-0.5 rounded-full flex items-center">
                                <ShieldCheck className="w-3 h-3 mr-1" />Green
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-400">{item.supplement.brand || 'Biowell'}</p>
                          <p className="text-gray-600 dark:text-gray-400">{item.supplement.price_aed.toFixed(2)} AED</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            className={`p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full ${
                              updatingQuantity === item.id ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={updatingQuantity === item.id || item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button 
                            className={`p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full ${
                              updatingQuantity === item.id ? 'opacity-50 cursor-not-allowed' : ''
                            }`} 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={updatingQuantity === item.id}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">{(item.supplement.price_aed * item.quantity).toFixed(2)} AED</p>
                          <button 
                            className={`text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 mt-1 ${
                              removingItem === item.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={removingItem === item.id}
                          >
                            {removingItem === item.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-white">{subtotal.toFixed(2)} AED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-medium text-gray-900 dark:text-white">{shipping.toFixed(2)} AED</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-600 dark:text-gray-400">Total</span>
                      <span className="text-primary text-lg">{total.toFixed(2)} AED</span>
                    </div>
                  </div>
                </div>
                
                {/* Payment security banner */}
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4 flex items-center">
                  <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Secure payment processing. All payments are encrypted and secure.
                  </p>
                </div>
                
                <Button 
                  className="w-full py-3"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Proceed to Checkout
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage