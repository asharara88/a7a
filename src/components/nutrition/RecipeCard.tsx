import React from 'react';
import { Clock, Users, Heart, Award } from 'lucide-react';
import { Recipe } from '../../api/recipeApi';
import { Card } from '../ui/Card';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  recipe: Recipe;
  onSave?: () => void;
  isSaved?: boolean;
  as?: typeof Link;
  to?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSave, isSaved = false, as, to }) => {
  // Function to truncate summary and remove HTML tags
  const cleanSummary = (summary: string) => {
    const withoutTags = summary.replace(/<\/?[^>]+(>|$)/g, "");
    return withoutTags.length > 120 ? withoutTags.substring(0, 120) + "..." : withoutTags;
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-lg"
      as={as}
      to={to}
    >
      <div className="relative">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <button 
            onClick={onSave}
            className={`p-2 rounded-full ${isSaved ? 'bg-primary text-white' : 'bg-white/80 text-gray-700'} hover:bg-primary hover:text-white transition-colors z-10`}
            aria-label={isSaved ? "Remove from saved recipes" : "Save recipe"}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center space-x-2">
            {recipe.healthScore >= 80 && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <Award className="w-3 h-3 mr-1" />
                Healthy
              </span>
            )}
            {recipe.diets && recipe.diets.length > 0 && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {recipe.diets[0]}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {recipe.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {cleanSummary(recipe.summary)}
        </p>
        
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{recipe.readyInMinutes} min</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
        
        {recipe.nutrition && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Calories</p>
                <p className="font-semibold text-gray-900 dark:text-white">{Math.round(recipe.nutrition.calories)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Protein</p>
                <p className="font-semibold text-gray-900 dark:text-white">{Math.round(recipe.nutrition.protein)}g</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Carbs</p>
                <p className="font-semibold text-gray-900 dark:text-white">{Math.round(recipe.nutrition.carbs)}g</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Fat</p>
                <p className="font-semibold text-gray-900 dark:text-white">{Math.round(recipe.nutrition.fat)}g</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecipeCard;