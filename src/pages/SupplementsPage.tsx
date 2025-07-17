import React from 'react'
import { Link } from 'react-router-dom'
import { Star, ShoppingCart } from 'lucide-react'

const SupplementsPage: React.FC = () => {
  const supplements = [
    {
      id: '1',
      name: 'Vitamin D3',
      description: 'Essential for bone health and immune function',
      price: 24.99,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      name: 'Omega-3 Fish Oil',
      description: 'Supports heart and brain health',
      price: 32.99,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      name: 'Magnesium Glycinate',
      description: 'Promotes relaxation and better sleep',
      price: 19.99,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '4',
      name: 'Probiotics',
      description: 'Supports digestive and immune health',
      price: 39.99,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplements</h1>
          <p className="text-gray-600">Discover science-backed supplements for your wellness journey</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <select className="border border-gray-300 rounded-md px-3 py-2">
              <option>All Categories</option>
              <option>Vitamins</option>
              <option>Minerals</option>
              <option>Probiotics</option>
              <option>Omega-3</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-2">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
              <option>Name</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {supplements.map((supplement) => (
            <div key={supplement.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <img
                src={supplement.image}
                alt={supplement.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {supplement.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {supplement.description}
                </p>
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {supplement.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                   {supplement.price} AED
                  </span>
                  <div className="flex space-x-2">
                    <Link
                      to={`/supplements/${supplement.id}`}
                      className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      View
                    </Link>
                    <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SupplementsPage