import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingCart, CreditCard, Package, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import { supplementApi, CartItem } from '../api/supplementApi';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const items = await supplementApi.getCartItems();
      setCartItems(items);
    } catch (error) {
      console.error('Error loading cart:', error);
      setError('Failed to load cart items. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    setIsUpdating(itemId);
    try {
      const success = await supplementApi.updateCartItemQuantity(itemId, newQuantity);
      if (success) {
        if (newQuantity === 0) {
          setCartItems(prev => prev.filter(item => item.id !== itemId));
        } else {
          setCartItems(prev => prev.map(item => 
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          ));
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      setError('Failed to update item quantity.');
    } finally {
      setIsUpdating(null);
    }
  };

  const removeItem = async (itemId: string) => {
    setIsUpdating(itemId);
    try {
      const success = await supplementApi.removeFromCart(itemId);
      if (success) {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
      }
    } catch (error) {
      console.error('Error removing item:', error);
      setError('Failed to remove item from cart.');
    } finally {
      setIsUpdating(null);
    }
  };

  const clearCart = async () => {
    try {
      const success = await supplementApi.clearCart();
      if (success) {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      setError('Failed to clear cart.');
    }
  };

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

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => 
      sum + (item.supplement.price_aed || 0) * item.quantity, 0
    );
  };

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.05; // 5% VAT
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/supplements"
            className="inline-flex items-center text-primary hover:text-primary-dark font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
            {cartItems.length > 0 && (
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-600 hover:text-red-700"
              >
                Clear Cart
              </Button>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
              <span className="text-red-700 dark:text-red-300">{error}</span>
            </div>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Discover our science-backed supplements to optimize your health
            </p>
            <div className="space-x-4">
              <Button as={Link} to="/supplements">
                Browse Supplements
              </Button>
              <Button as={Link} to="/supplements/recommendations" variant="outline">
                Get Recommendations
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                  Cart Items ({cartItems.length})
                </h2>
                
                <AnimatePresence>
                  <div className="space-y-6">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <img
                          src={item.supplement.image_url || 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300'}
                          alt={item.supplement.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {item.supplement.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.supplement.brand}
                              </p>
                              <div className="mt-1">
                                {item.supplement.tier && getTierBadge(item.supplement.tier)}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg text-gray-900 dark:text-white">
                                {(item.supplement.price_aed || 0).toFixed(2)} AED
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                per item
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={isUpdating === item.id || item.quantity <= 1}
                                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-medium text-gray-900 dark:text-white w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={isUpdating === item.id}
                                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <p className="font-bold text-primary">
                                {((item.supplement.price_aed || 0) * item.quantity).toFixed(2)} AED
                              </p>
                              <button
                                onClick={() => removeItem(item.id)}
                                disabled={isUpdating === item.id}
                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full disabled:opacity-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-8">
                <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {calculateSubtotal().toFixed(2)} AED
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">VAT (5%)</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {calculateTax(calculateSubtotal()).toFixed(2)} AED
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      Free
                    </span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                      <span className="text-lg font-bold text-primary">
                        {calculateTotal().toFixed(2)} AED
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full"
                    onClick={() => setShowCheckout(true)}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    as={Link}
                    to="/supplements"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-1">
                        Free Shipping
                      </h4>
                      <p className="text-sm text-blue-800 dark:text-blue-400">
                        Free shipping on all orders within UAE
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md p-6">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Checkout Demo
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  This is a demonstration of the checkout process. In a real implementation, 
                  this would integrate with Stripe or another payment processor.
                </p>
                <div className="space-y-3">
                  <Button className="w-full" onClick={() => setShowCheckout(false)}>
                    Continue Demo
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowCheckout(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;