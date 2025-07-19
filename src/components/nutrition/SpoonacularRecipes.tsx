import React, { useState, useEffect } from 'react';
import { Search, Clock, Users, Heart, Star, Filter, ChefHat, Utensils, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { motion, AnimatePresence } from 'framer-motion';

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  summary: string;
  diets: string[];
  dishTypes: string[];
  cuisines: string[];
  nutrition?: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
}

interface SpoonacularRecipesProps {
  maxResults?: number;
  showFilters?: boolean;
}

const SpoonacularRecipes: React.FC<SpoonacularRecipesProps> = ({ 
  maxResults = 12, 
  showFilters = true 
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    diet: '',
    cuisine: '',
    maxReadyTime: 60,
    minHealthScore: 0,
    maxCalories: 1000
  });
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Mock Spoonacular data for demo
  const mockRecipes: Recipe[] = [
    {
      id: 716429,
      title: "Mediterranean Quinoa Bowl with Grilled Chicken",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      readyInMinutes: 25,
      servings: 2,
      healthScore: 89,
      spoonacularScore: 92,
      pricePerServing: 4.50,
      summary: "A nutritious Mediterranean-inspired bowl packed with protein, healthy fats, and complex carbohydrates.",
      diets: ["gluten free", "dairy free"],
      dishTypes: ["lunch", "main course"],
      cuisines: ["Mediterranean"],
      nutrition: {
        calories: 485,
        protein: 32,
        fat: 18,
        carbs: 45
      }
    },
    {
      id: 715538,
      title: "Salmon Teriyaki with Steamed Vegetables",
      image: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400",
      readyInMinutes: 20,
      servings: 4,
      healthScore: 95,
      spoonacularScore: 88,
      pricePerServing: 6.25,
      summary: "Omega-3 rich salmon with a light teriyaki glaze, served with colorful steamed vegetables.",
      diets: ["dairy free", "pescatarian"],
      dishTypes: ["dinner", "main course"],
      cuisines: ["Asian"],
      nutrition: {
        calories: 420,
        protein: 35,
        fat: 22,
        carbs: 18
      }
    },
    {
      id: 782601,
      title: "Avocado Toast with Poached Egg",
      image: "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=400",
      readyInMinutes: 10,
      servings: 1,
      healthScore: 78,
      spoonacularScore: 85,
      pricePerServing: 3.75,
      summary: "Classic avocado toast elevated with a perfectly poached egg and microgreens.",
      diets: ["vegetarian"],
      dishTypes: ["breakfast", "brunch"],
      cuisines: ["American"],
      nutrition: {
        calories: 320,
        protein: 14,
        fat: 22,
        carbs: 24
      }
    },
    {
      id: 644387,
      title: "Greek Yogurt Berry Parfait",
      image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400",
      readyInMinutes: 5,
      servings: 1,
      healthScore: 92,
      spoonacularScore: 90,
      pricePerServing: 2.50,
      summary: "Protein-rich Greek yogurt layered with fresh berries and crunchy granola.",
      diets: ["vegetarian", "gluten free"],
      dishTypes: ["breakfast", "snack"],
      cuisines: ["Greek"],
      nutrition: {
        calories: 280,
        protein: 20,
        fat: 8,
        carbs: 35
      }
    },
    {
      id: 633142,
      title: "Lentil and Vegetable Curry",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      readyInMinutes: 35,
      servings: 4,
      healthScore: 96,
      spoonacularScore: 87,
      pricePerServing: 2.25,
      summary: "Hearty plant-based curry loaded with protein-rich lentils and colorful vegetables.",
      diets: ["vegan", "vegetarian", "dairy free", "gluten free"],
      dishTypes: ["dinner", "main course"],
      cuisines: ["Indian"],
      nutrition: {
        calories: 340,
        protein: 18,
        fat: 8,
        carbs: 52
      }
    },
    {
      id: 715415,
      title: "Grilled Chicken Caesar Salad",
      image: "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=400",
      readyInMinutes: 15,
      servings: 2,
      healthScore: 82,
      spoonacularScore: 89,
      pricePerServing: 5.00,
      summary: "Classic Caesar salad with grilled chicken breast and homemade croutons.",
      diets: [],
      dishTypes: ["lunch", "salad"],
      cuisines: ["American"],
      nutrition: {
        calories: 380,
        protein: 28,
        fat: 24,
        carbs: 16
      }
    }
  ];

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter recipes based on current filters
      let filteredRecipes = mockRecipes;
      
      if (searchQuery) {
        filteredRecipes = filteredRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.cuisines.some(cuisine => cuisine.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      if (filters.diet) {
        filteredRecipes = filteredRecipes.filter(recipe =>
          recipe.diets.includes(filters.diet)
        );
      }
      
      if (filters.maxReadyTime < 60) {
        filteredRecipes = filteredRecipes.filter(recipe =>
          recipe.readyInMinutes <= filters.maxReadyTime
        );
      }
      
      if (filters.minHealthScore > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
          recipe.healthScore >= filters.minHealthScore
        );
      }
      
      setRecipes(filteredRecipes.slice(0, maxResults));
    } catch (err) {
      setError('Failed to load recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadRecipes();
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setShowFiltersPanel(false);
    loadRecipes();
  };

  const clearFilters = () => {
    setFilters({
      diet: '',
      cuisine: '',
      maxReadyTime: 60,
      minHealthScore: 0,
      maxCalories: 1000
    });
    setSearchQuery('');
    loadRecipes();
  };

  const getDietBadgeColor = (diet: string) => {
    const colors: Record<string, string> = {
      'vegan': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'vegetarian': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'gluten free': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'dairy free': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'pescatarian': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300'
    };
    return colors[diet] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-primary/10 mr-4">
            <ChefHat className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recipe Discovery</h2>
            <p className="text-gray-600 dark:text-gray-400">Powered by Spoonacular API</p>
          </div>
        </div>
        
        {showFilters && (
          <Button
            variant="outline"
            onClick={() => setShowFiltersPanel(!showFiltersPanel)}
            className="flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        )}
      </div>

      {/* Search Bar */}
      <Card className="p-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Search recipes, cuisines, or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} disabled={loading}>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </Card>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFiltersPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recipe Filters</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Diet</label>
                  <select
                    value={filters.diet}
                    onChange={(e) => handleFilterChange('diet', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Any Diet</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="pescatarian">Pescatarian</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Max Cook Time: {filters.maxReadyTime} min
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="120"
                    value={filters.maxReadyTime}
                    onChange={(e) => handleFilterChange('maxReadyTime', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Min Health Score: {filters.minHealthScore}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.minHealthScore}
                    onChange={(e) => handleFilterChange('minHealthScore', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={applyFilters}>Apply Filters</Button>
                <Button variant="outline" onClick={clearFilters}>Clear All</Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={loadRecipes}>Try Again</Button>
        </Card>
      )}

      {/* Recipes Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <button className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <div className="flex items-center bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                        <Star className="w-3 h-3 mr-1 text-yellow-400" />
                        {recipe.healthScore}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {recipe.title}
                    </h3>
                    
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="mr-4">{recipe.readyInMinutes} min</span>
                      <Users className="w-4 h-4 mr-1" />
                      <span>{recipe.servings} servings</span>
                    </div>
                    
                    {recipe.nutrition && (
                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <p className="font-medium">{recipe.nutrition.calories}</p>
                          <p className="text-gray-500">cal</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <p className="font-medium">{recipe.nutrition.protein}g</p>
                          <p className="text-gray-500">protein</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {recipe.diets.slice(0, 2).map((diet) => (
                        <span
                          key={diet}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getDietBadgeColor(diet)}`}
                        >
                          {diet}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto">
                      <Button className="w-full" size="sm">
                        <Utensils className="w-4 h-4 mr-2" />
                        View Recipe
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* No Results */}
      {!loading && !error && recipes.length === 0 && (
        <Card className="p-12 text-center">
          <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No recipes found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your search terms or filters to find more recipes.
          </p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </Card>
      )}
    </div>
  );
};

export default SpoonacularRecipes;