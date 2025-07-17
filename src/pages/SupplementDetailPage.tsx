import React from 'react'
import { useParams } from 'react-router-dom'
import { Star, ShoppingCart, Heart, Shield, Award } from 'lucide-react'

const SupplementDetailPage: React.FC = () => {
  const { id } = useParams()

  // Mock data - in real app, fetch based on id
  const supplement = {
    id: '1',
    name: 'Vitamin D3',
    description: 'High-potency Vitamin D3 supplement for optimal bone health and immune function support',
    price: 24.99,
    rating: 4.8,
    reviews: 156,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
    benefits: [
      'Supports bone health and calcium absorption',
      'Boosts immune system function',
      'May improve mood and energy levels',
      'Supports muscle strength and function'
    ],
    ingredients: 'Vitamin D3 (Cholecalciferol) 2000 IU, Microcrystalline Cellulose, Vegetable Magnesium Stearate',
    dosage: 'Take 1 capsule daily with food',
    certifications: ['Third-party tested', 'GMP certified', 'Non-GMO']
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div>
              <img
                src={supplement.image}
                alt={supplement.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {supplement.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(supplement.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {supplement.rating} ({supplement.reviews} reviews)
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                {supplement.description}
              </p>

              <div className="text-3xl font-bold text-gray-900 mb-6">
               {supplement.price} AED
              </div>

              <div className="flex space-x-4 mb-8">
                <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-2 mb-6">
                {supplement.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t border-gray-200">
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Benefits */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-blue-600" />
                    Key Benefits
                  </h3>
                  <ul className="space-y-2">
                    {supplement.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Usage & Ingredients */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Usage & Ingredients
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Dosage</h4>
                      <p className="text-gray-600">{supplement.dosage}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Ingredients</h4>
                      <p className="text-gray-600">{supplement.ingredients}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupplementDetailPage