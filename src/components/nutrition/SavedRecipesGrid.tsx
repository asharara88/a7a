import React, { useState, useEffect, useCallback } from 'react';
import { recipeApi, SavedRecipe } from '../../api/recipeApi';
import { Card } from '../ui/card';
import { Heart, Clock, Users, ExternalLink, Loader2, Search, Filter, SortDesc, SortAsc, ListFilter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { createClient } from '@supabase/supabase-js';
import { cn } from '../../utils/cn';

// Initialize Supabase client for auth
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SavedRecipesGrid: React.FC = () => {
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'calories'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [userId, setUserId] = useState<string>('demo-user-id');
  const [removingRecipe, setRemovingRecipe] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterFavorites, setFilterFavorites] = useState(false);
  
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

  const loadSavedRecipes = useCallback(async () => {
    setIsLoading(true);
    try {
      const recipes = await recipeApi.getSavedRecipes(userId);
      setSavedRecipes(recipes);
    } catch (error) {
      console.error('Error loading saved recipes:', error);
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
          title: 'Spicy Thai Curry',
          image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          savedAt: new Date().toISOString(),
          isFavorite: false
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadSavedRecipes();
  }, [loadSavedRecipes]);

  const handleRemoveRecipe = async (recipeId: number) => {
    setRemovingRecipe(recipeId);
    setError(null);
    try {
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
  
  // Apply favorite filter if needed
  const filteredByFavorites = filterFavorites 
    ? filteredRecipes.filter(recipe => recipe.isFavorite) 
    : filteredRecipes;
  
  // Sort recipes
  const sortedRecipes = [...filteredByFavorites].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'desc'
        ? new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
        : new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime();
    } else if (sortBy === 'title') {
      return sortOrder === 'desc'
        ? b.title.localeCompare(a.title)
        : a.title.localeCompare(b.title);
    } else {
      // For calories sorting - we'd need to fetch nutrition data but we'll sort by title as fallback
      return sortOrder === 'desc'
        ? b.title.localeCompare(a.title)
        : a.title.localeCompare(b.title);
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
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your Saved Recipes</h2>
        <p className="text-gray-600 dark:text-gray-400">Browse and manage your collection of saved recipes</p>
      </div>
      
      {/* Search, filter and sort controls */}
      <Card className="p-4 mb-6">
        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search saved recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        
        <div className="flex flex-wrap gap-3 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <ListFilter className="w-4 h-4 mr-1.5" />
            Filters & Sort
            {filterFavorites && <span className="ml-1.5 bg-primary/20 text-primary text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>}
          </Button>
          
          {savedRecipes.length > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
              {sortedRecipes.length} {sortedRecipes.length === 1 ? 'recipe' : 'recipes'} found
            </span>
          )}
        </div>
        
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filters</h4>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filterFavorites}
                  onChange={() => setFilterFavorites(!filterFavorites)}
                  className="rounded border-gray-300 text-primary focus:ring-primary mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">Favorites only</span>
              </label>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort by</h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={sortBy === 'date' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    if (sortBy === 'date') {
                      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('date');
                      setSortOrder('desc');
                    }
                  }}
                  className="flex items-center"
                >
                  Date {sortBy === 'date' && (
                    sortOrder === 'asc' ? <SortAsc className="w-3 h-3 ml-1" /> : <SortDesc className="w-3 h-3 ml-1" />
                  )}
                </Button>
                
                <Button
                  variant={sortBy === 'title' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    if (sortBy === 'title') {
                      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('title');
                      setSortOrder('asc');
                    }
                  }}
                  className="flex items-center"
                >
                  Name {sortBy === 'title' && (
                    sortOrder === 'asc' ? <SortAsc className="w-3 h-3 ml-1" /> : <SortDesc className="w-3 h-3 ml-1" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
      
      {/* Recipe grid */}
      {sortedRecipes.length === 0 ? (
        <Card className="text-center py-12">
          <div className="max-w-sm mx-auto">
            {searchQuery || filterFavorites ? (
              <>
                <p className="text-gray-600 dark:text-gray-400 mb-4">No recipes match your search criteria.</p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setFilterFavorites(false);
                }}>
                  Clear Filters
                </Button>
              </>
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-400 mb-4">You haven't saved any recipes yet.</p>
                <Link
                  to="/recipes"
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg"
                >
                  Discover Recipes
                </Link>
              </>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full">
              <div className="relative h-48">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button 
                    onClick={() => handleRemoveRecipe(recipe.recipeId)}
                    className={cn(
                      "p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-colors",
                      removingRecipe === recipe.recipeId ? "bg-gray-200" : "hover:bg-gray-100"
                    )}
                    disabled={removingRecipe === recipe.recipeId}
                    aria-label="Remove from saved recipes"
                  >
                    <Heart className={cn(
                      "w-4 h-4", 
                      recipe.isFavorite ? "text-red-500 fill-current" : "text-gray-500"
                    )} />
                  </button>
                </div>
              </div>
              
              <div className="p-4 flex flex-col flex-grow">
                <Link to={`/recipes/${recipe.recipeId}`} className="group-hover:text-primary transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {recipe.title}
                  </h3>
                </Link>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 opacity-70" />
                    <span>30 min</span>
                  </div>
                  <div className="mx-2">•</div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1 opacity-70" />
                    <span>4 servings</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <Link
                    to={`/recipes/${recipe.recipeId}`}
                    className="text-primary hover:text-primary-dark font-medium text-sm flex items-center"
                  >
                    View Recipe
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </Link>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(recipe.savedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipesGrid;