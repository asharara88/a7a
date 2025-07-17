import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recipeApi, Recipe } from '../api/recipeApi';
import RecipeDetail from '../components/nutrition/RecipeDetail';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [userId, setUserId] = useState<string>('demo-user-id');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

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
    if (!id) return;
    
    const recipeId = parseInt(id);
    if (isNaN(recipeId)) {
      setError('Invalid recipe ID');
      setIsLoading(false);
      return;
    }
    
    const loadRecipe = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const recipeData = await recipeApi.getRecipeById(recipeId);
        if (!recipeData) {
          throw new Error('Recipe not found');
        }
        setRecipe(recipeData);
        
        // Check if recipe is saved
        const savedRecipes = await recipeApi.getSavedRecipes(userId);
        setIsSaved(savedRecipes.some(r => r.recipeId === recipeId));
      } catch (err) {
        console.error('Error loading recipe:', err);
        setError('Failed to load recipe. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRecipe();
  }, [id, userId]);

  const handleSaveRecipe = async () => {
    if (!recipe) return;
    setIsSaving(true);
    try {
      if (isSaved) {
        await recipeApi.unsaveRecipe(userId, recipe.id);
        setIsSaved(false);
      } else {
        await recipeApi.saveRecipe(userId, recipe, true);
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Error saving recipe:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Function to handle retrying recipe load
  const handleRetry = () => {
    if (!id) return;
    const recipeId = parseInt(id);
    if (isNaN(recipeId)) return;
    
    setIsLoading(true);
    setError(null);
    
    recipeApi.getRecipeById(recipeId)
      .then(recipeData => {
        if (!recipeData) {
          throw new Error('Recipe not found');
        }
        setRecipe(recipeData);
        
        // Check if recipe is saved
        return recipeApi.getSavedRecipes(userId);
      })
      .then(savedRecipes => {
        setIsSaved(savedRecipes.some(r => r.recipeId === recipeId));
      })
      .catch(err => {
        console.error('Error loading recipe:', err);
        setError('Failed to load recipe. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
      <div className="mobile-container">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
          </div>
        ) : recipe ? (
          <RecipeDetail 
            recipe={recipe} 
            onSave={handleSaveRecipe}
            isSaved={isSaved}
            isSaving={isSaving}
          />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">Recipe not found</p>
    return (
      <div className="mobile-container">
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 dark:text-red-400 text-lg font-medium mb-4">{error}</p>
          <div className="space-x-4">
            <Button onClick={handleRetry} className="mr-2">
              Try Again
            </Button>
            <Button variant="outline" onClick={() => navigate('/recipes')}>
              Back to Recipes
            </Button>
          </div>
        </div>
      </div>
    );
    </div>
  );
      <div className="mobile-container">
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">Recipe not found</p>
          <Button onClick={() => navigate('/recipes')}>
            Back to Recipes
          </Button>
        </div>
export default RecipeDetailPage;