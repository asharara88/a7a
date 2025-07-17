import React from 'react'
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Check, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = React.useState([
    {
      id: '1',
      name: 'Vitamin D3',
      price: 24.99,
      quantity: 2,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      name: 'Omega-3 Fish Oil',
      price: 32.99,
      quantity: 1,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 5.99
  const total = subtotal + shipping
  const [isCheckingOut, setIsCheckingOut] = React.useState(false)
  
  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false)
      // In a real app, you would redirect to checkout page or show success message
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <Link
            to="/supplements"
            className="text-primary hover:text-primary-dark font-medium flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <a
              href="/supplements"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Cart Items ({cartItems.length})
                  </h2>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1 ml-4">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-gray-600">${item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={() => {
                              setCartItems(cartItems.map(cartItem => 
                                cartItem.id === item.id 
                                  ? { ...cartItem, quantity: Math.max(1, cartItem.quantity - 1) } 
                                  : cartItem
                              ));
                            }}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button 
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={() => {
                              setCartItems(cartItems.map(cartItem => 
                                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
                            }}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{(item.price * item.quantity).toFixed(2)} AED</p>
                          <button 
                            className="text-red-600 hover:text-red-700 mt-1"
                            onClick={() => {
                              setCartItems(cartItems.filter(cartItem => 
                                cartItem.id !== item.id
                              ));
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{subtotal.toFixed(2)} AED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping.toFixed(2)} AED</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-600">Total</span>
                      <span>{total.toFixed(2)} AED</span>
                    </div>
                  </div>
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
        )}
      </div>
    </div>
  )
}

export default CartPage