import React, { useState, useEffect } from 'react';
import { Loader2, ChevronRight } from 'lucide-react';
import { recipeApi, Recipe, RecipeSearchParams } from '../../api/recipeApi';
import RecipeCard from './RecipeCard';
import { Button } from '../ui/Button';
import RecipeFilters from './RecipeFilters';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';

const PersonalizedRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
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
    // Combine search query with other filters
    const combinedParams = {
      ...searchParams,
      query: searchQuery.trim() || undefined
    };
    
    setIsLoading(true);
    setError(null);
    try {
      const { recipes } = await recipeApi.searchRecipes(combinedParams);
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

  // Filter recipes by search query (client-side filtering for immediate response)
  const filteredRecipes = recipes.filter(recipe => 
    !searchQuery.trim() || recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recommended For You</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Recipes tailored to your preferences and health goals
              </p>
            </div>
          </div>
          
          {/* Search input */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && loadRecipes()}
              className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Button 
              onClick={loadRecipes}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              Search
            </Button>
          </div>
        </div>
        
        <div>
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filter Options</h3>
              <RecipeFilters 
                initialFilters={searchParams}
                onApplyFilters={(filters) => {
                  setSearchParams(filters);
                  loadRecipes();
                }}
              />
            </div>
            
            <div className="flex justify-between items-center mb-2 border-t border-gray-200 dark:border-gray-700 pt-3 mt-2">
              <Link to="/saved-recipes" className="text-primary hover:text-primary-dark text-sm font-medium flex items-center">
                View Saved Recipes
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={loadRecipes}>Try Again</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              as={Link}
              to={`/recipes/${recipe.id}`}
              key={recipe.id}
              recipe={recipe}
              onSave={() => handleSaveRecipe(recipe)}
              isSaved={savedRecipes.includes(recipe.id)}
            />
          ))}
          
          {filteredRecipes.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchQuery.trim() 
                  ? `No recipes found matching "${searchQuery}"` 
                  : "No recipes found matching your criteria."}
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
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
        
      {recipes.length > 0 && (
        <div className="mt-8 text-center">
          <Link 
            to="/recipes"
            className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
          >
            View more recipes
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default PersonalizedRecipes;