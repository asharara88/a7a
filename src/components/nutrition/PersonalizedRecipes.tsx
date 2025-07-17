import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { recipeApi, Recipe, RecipeSearchParams } from '../../api/recipeApi';
import RecipeCard from './RecipeCard';
import { Button } from '../ui/Button';
import RecipeFilters from './RecipeFilters';
import { Link } from 'react-router-dom';

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
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Personalized Recipes</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Recipes tailored to your preferences and health goals
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/saved-recipes" className="text-primary hover:text-primary-dark text-sm font-medium">
            Saved Recipes
          </Link>
          <RecipeFilters 
            initialFilters={searchParams}
            onApplyFilters={(filters) => {
              setSearchParams(filters);
              loadRecipes();
            }}
          />
        </div>
      </div>

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
              as={Link}
              to={`/recipes/${recipe.id}`}
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