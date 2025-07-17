import React, { useState, useEffect, useCallback } from 'react';
import { recipeApi, SavedRecipe } from '../../api/recipeApi';
import { Card } from '../ui/Card';
import { Heart, Clock, Users, ExternalLink, Loader2, Search, Filter, SortDesc } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for auth
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SavedRecipesGrid: React.FC = () => {
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [userId, setUserId] = useState<string>('demo-user-id');
  const [removingRecipe, setRemovingRecipe] = useState<number | null>(null);
  
  useEffect(() => {
    // Get actual user ID if logged in
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUserId(data.user.id);
      }
    };
    
    getUser();
  }, []);

  useEffect(() => {
    const loadSavedRecipes = async () => {
      setIsLoading(true);
      try {
  const loadSavedRecipes = useCallback(async () => {
        setSavedRecipes(recipes);
      } catch (error) {
        console.error('Error loading saved recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSavedRecipes();
  }, []);

  const handleRemoveRecipe = async (recipeId: number) => {
    setError(null);
    try {
      // In a real app, you would call an API to delete the saved recipe
      setSavedRecipes(prev => prev.filter(r => r.recipeId !== recipeId));
    } catch (error) {
      console.error('Error removing recipe:', error);
      setError('Failed to load your saved recipes. Please try again.');
      
      // Set mock data for demo
      setSavedRecipes([
        {
          id: '1',
          userId: 'demo-user-id',
          recipeId: 123456,
          title: 'Healthy Mediterranean Salad',
          image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          savedAt: new Date().toISOString(),
          isFavorite: true
        },
        {
          id: '2',
          userId: 'demo-user-id',
          recipeId: 789012,
  const handleRemoveRecipe = async (recipeId: number) => {
    setRemovingRecipe(recipeId);
          image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      await recipeApi.unsaveRecipe(userId, recipeId);
      setSavedRecipes(prev => prev.filter(r => r.recipeId !== recipeId));
    } catch (err) {
      console.error('Error removing recipe:', err);
      setError('Failed to remove recipe. Please try again.');
    } finally {
      setRemovingRecipe(null);
    }
  };

  // Filter and sort recipes
  const filteredRecipes = savedRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort recipes
  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  // Retry loading
  const handleRetry = () => {
    loadSavedRecipes();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={handleRetry}>
          Try Again
        </Button>
      </div>
    );
  }

  if (savedRecipes.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
        <p className="text-gray-600 dark:text-gray-400 mb-4">You haven't saved any recipes yet.</p>
        <Link
          to="/recipes"
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          Discover Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and sort controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search saved recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="date">Date Saved</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>
      
      {sortedRecipes.length === 0 ? (
        <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-gray-600 dark:text-gray-400 mb-4">No recipes match your search criteria.</p>
          <Button onClick={() => setSearchQuery('')}>
            Clear Search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
          <div className="relative">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2">
              <button 
                onClick={() => handleRemoveRecipe(recipe.recipeId)}
                className="p-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
                aria-label="Remove from saved recipes"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {recipe.title}
            </h3>
            
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>30 min</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>4 servings</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Link
                to={`/recipes/${recipe.recipeId}`}
                className="text-primary hover:text-primary-dark font-medium flex items-center"
              >
                View Recipe
                <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Saved {new Date(recipe.savedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SavedRecipesGrid;