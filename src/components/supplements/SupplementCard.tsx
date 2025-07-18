import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Info, Check, Package, ShieldCheck, AlertCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Supplement } from '../../api/supplementApi';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

interface SupplementCardProps {
  supplement: Supplement;
  onAddToCart?: (supplementId: string) => void;
  onAddToStack?: (supplementId: string) => void;
  isAddingToCart?: boolean;
  showFullDescription?: boolean;
  className?: string;
}

const SupplementCard: React.FC<SupplementCardProps> = ({
  supplement,
  onAddToCart,
  onAddToStack,
  isAddingToCart = false,
  showFullDescription = false,
  className
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showTierInfo, setShowTierInfo] = useState(false);

  const getTierConfig = (tier: string) => {
    switch (tier) {
      case 'green':
        return {
          color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800',
          icon: <ShieldCheck className="w-3 h-3 mr-1" />,
          description: 'Strong evidence – Supported by multiple high-quality human clinical trials and major scientific consensus.'
        };
      case 'yellow':
        return {
          color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
          icon: <AlertCircle className="w-3 h-3 mr-1" />,
          description: 'Moderate/emerging evidence – Some supporting studies, but either limited in scale, mixed results, or moderate scientific consensus.'
        };
      case 'orange':
        return {
          color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800',
          icon: <Info className="w-3 h-3 mr-1" />,
          description: 'Limited/preliminary evidence – Mostly early-stage or animal/lab-based research, few or low-quality human trials.'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
          icon: <X className="w-3 h-3 mr-1" />,
          description: 'Insufficient evidence or not recommended.'
        };
    }
  };

  const tierConfig = getTierConfig(supplement.tier || 'orange');
  const hasDiscount = (supplement.subscription_discount_percent || 0) > 0;
  const discountedPrice = hasDiscount 
    ? (supplement.price_aed || 0) * (1 - (supplement.subscription_discount_percent || 0) / 100)
    : supplement.price_aed || 0;

  return (
    <Card className={cn(
      "overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group",
      className
    )}>
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={supplement.image_url || 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300'} 
          alt={supplement.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {/* Tier Badge */}
          <div className="relative">
            <button
              onClick={() => setShowTierInfo(!showTierInfo)}
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${tierConfig.color} hover:opacity-80 transition-opacity`}
            >
              {tierConfig.icon}
              {supplement.tier?.charAt(0).toUpperCase() + supplement.tier?.slice(1)} Tier
            </button>
            
            {showTierInfo && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 z-10">
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  {tierConfig.description}
                </p>
              </div>
            )}
          </div>
          
          {/* Feature Badges */}
          {supplement.is_bestseller && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
              <Star className="w-3 h-3 mr-1" />
              Bestseller
            </span>
          )}
          
          {supplement.is_featured && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              Featured
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{supplement.subscription_discount_percent}%
            </span>
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute bottom-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
        </button>
      </div>
      
      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 leading-tight">
              {supplement.name}
            </h3>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {supplement.brand} • {supplement.category}
          </p>
          
          {supplement.use_case && (
            <p className="text-xs text-green-600 dark:text-green-400 mb-2 font-medium">
              {supplement.use_case}
            </p>
          )}

          <p className={`text-sm text-gray-700 dark:text-gray-300 mb-4 ${showFullDescription ? '' : 'line-clamp-2'}`}>
            {supplement.description}
          </p>

          {/* Benefits */}
          {supplement.benefits && supplement.benefits.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {supplement.benefits.slice(0, 3).map((benefit, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                  >
                    {benefit}
                  </span>
                ))}
                {supplement.benefits.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{supplement.benefits.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              {discountedPrice.toFixed(2)} AED
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {(supplement.price_aed || 0).toFixed(2)} AED
              </span>
            )}
          </div>
          {hasDiscount && (
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">
              Save {supplement.subscription_discount_percent}% with subscription
            </p>
          )}
          {supplement.dosage && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Recommended: {supplement.dosage}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onAddToStack?.(supplement.id)}
          >
            <Package className="w-4 h-4 mr-1" />
            Add to Stack
          </Button>
          
          <Button
            size="sm"
            className="flex-1"
            onClick={() => onAddToCart?.(supplement.id)}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add to Cart
              </>
            )}
          </Button>
        </div>

        {/* View Details Link */}
        <Link
          to={`/supplements/${supplement.id}`}
          className="mt-3 text-center text-sm text-primary hover:text-primary-dark font-medium"
        >
          View Details →
        </Link>
      </div>
    </Card>
  );
};

export default SupplementCard;