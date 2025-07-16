import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { recipeApi, Recipe, RecipeSearchParams } from '../../api/recipeApi';
import RecipeCard from './RecipeCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

const PersonalizedRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState<number[]>([]);
  
  // Filter states
  const [searchParams, setSearchParams] = useState<RecipeSearchParams>({
    diet: '',
    intolerances: '',
    maxReadyTime: 60,
    maxCalories: 800
  });

  // Mock user ID for demo purposes
  const userId = 'demo-user-id';

  useEffect(() => {
    loadRecipes();
    loadSavedRecipes();
  }, []);

  const loadRecipes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { recipes } = await recipeApi.searchRecipes(searchParams);
      setRecipes(recipes);
    } catch (error) {
      console.error('Error loading recipes:', error);
      setError('Failed to load recipes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadSavedRecipes = async () => {
    try {
      const savedRecipes = await recipeApi.getSavedRecipes(userId);
      setSavedRecipes(savedRecipes.map(r => r.recipeId));
    } catch (error) {
      console.error('Error loading saved recipes:', error);
    }
  };

  const handleSaveRecipe = async (recipe: Recipe) => {
    try {
      const isSaved = savedRecipes.includes(recipe.id);
      
      if (isSaved) {
        // Remove from saved recipes
        // In a real app, you would call an API to delete the saved recipe
        setSavedRecipes(prev => prev.filter(id => id !== recipe.id));
      } else {
        // Add to saved recipes
        await recipeApi.saveRecipe(userId, recipe);
        setSavedRecipes(prev => [...prev, recipe.id]);
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  const handleSearchParamChange = (key: keyof RecipeSearchParams, value: any) => {
    setSearchParams(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    loadRecipes();
  };

  const dietOptions = [
    { value: '', label: 'Any' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'ketogenic', label: 'Keto' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'pescetarian', label: 'Pescatarian' },
    { value: 'mediterranean', label: 'Mediterranean' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Personalized Recipes</h2>
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="flex items-center"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {showFilters ? (
            <ChevronUp className="w-4 h-4 ml-2" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-2" />
          )}
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Diet</label>
              <select
                value={searchParams.diet}
                onChange={(e) => handleSearchParamChange('diet', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {dietOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Intolerances</label>
              <Input
                type="text"
                placeholder="e.g., dairy, gluten"
                value={searchParams.intolerances || ''}
                onChange={(e) => handleSearchParamChange('intolerances', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Max Ready Time (min)</label>
              <Input
                type="number"
                min={10}
                max={120}
                value={searchParams.maxReadyTime || 60}
                onChange={(e) => handleSearchParamChange('maxReadyTime', parseInt(e.target.value))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Max Calories</label>
              <Input
                type="number"
                min={100}
                max={1500}
                value={searchParams.maxCalories || 800}
                onChange={(e) => handleSearchParamChange('maxCalories', parseInt(e.target.value))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Include Ingredients</label>
              <Input
                type="text"
                placeholder="e.g., chicken, broccoli"
                value={searchParams.includeIngredients || ''}
                onChange={(e) => handleSearchParamChange('includeIngredients', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Exclude Ingredients</label>
              <Input
                type="text"
                placeholder="e.g., peanuts, shellfish"
                value={searchParams.excludeIngredients || ''}
                onChange={(e) => handleSearchParamChange('excludeIngredients', e.target.value)}
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button onClick={handleSearch} className="flex items-center">
              <Search className="w-4 h-4 mr-2" />
              Search Recipes
            </Button>
          </div>
        </Card>
      )}

      {/* Recipes Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Finding the perfect recipes for you...</p>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={loadRecipes}>Try Again</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSave={() => handleSaveRecipe(recipe)}
              isSaved={savedRecipes.includes(recipe.id)}
            />
          ))}
          
          {recipes.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">No recipes found matching your criteria.</p>
              <Button onClick={() => {
                setSearchParams({
                  diet: '',
                  intolerances: '',
                  maxReadyTime: 60,
                  maxCalories: 800
                });
                loadRecipes();
              }}>Reset Filters</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalizedRecipes;