export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  prepTime: number;
  cookTime: number;
  servings: number;
  image?: string;
  tags: string[];
}

export interface RecipeFilters {
  cuisine?: string;
  dietaryRestrictions?: string[];
  prepTime?: number;
  difficulty?: string;
  ingredients?: string[];
}

class RecipeApi {
  private readonly apiUrl = 'https://api.spoonacular.com/recipes';
  private readonly apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  async searchRecipes(query: string, filters?: RecipeFilters): Promise<Recipe[]> {
    try {
      const params = new URLSearchParams({
        apiKey: this.apiKey,
        query,
        number: '12',
        addRecipeInformation: 'true',
        fillIngredients: 'true'
      });

      if (filters?.cuisine) params.append('cuisine', filters.cuisine);
      if (filters?.dietaryRestrictions?.length) {
        params.append('diet', filters.dietaryRestrictions.join(','));
      }
      if (filters?.prepTime) params.append('maxReadyTime', filters.prepTime.toString());

      const response = await fetch(`${this.apiUrl}/complexSearch?${params}`);
      const data = await response.json();

      return data.results?.map(this.transformRecipe) || [];
    } catch (error) {
      console.error('Error searching recipes:', error);
      return [];
    }
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}/information?apiKey=${this.apiKey}`);
      const data = await response.json();
      
      return this.transformRecipe(data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      return null;
    }
  }

  private transformRecipe(apiRecipe: any): Recipe {
    return {
      id: apiRecipe.id.toString(),
      name: apiRecipe.title,
      description: apiRecipe.summary?.replace(/<[^>]*>/g, '') || '',
      ingredients: apiRecipe.extendedIngredients?.map((ing: any) => ing.original) || [],
      instructions: apiRecipe.analyzedInstructions?.[0]?.steps?.map((step: any) => step.step) || [],
      nutritionInfo: {
        calories: apiRecipe.nutrition?.nutrients?.find((n: any) => n.name === 'Calories')?.amount || 0,
        protein: apiRecipe.nutrition?.nutrients?.find((n: any) => n.name === 'Protein')?.amount || 0,
        carbs: apiRecipe.nutrition?.nutrients?.find((n: any) => n.name === 'Carbohydrates')?.amount || 0,
        fat: apiRecipe.nutrition?.nutrients?.find((n: any) => n.name === 'Fat')?.amount || 0,
      },
      prepTime: apiRecipe.preparationMinutes || 0,
      cookTime: apiRecipe.cookingMinutes || 0,
      servings: apiRecipe.servings || 1,
      image: apiRecipe.image,
      tags: apiRecipe.dishTypes || []
    };
  }
}

export const recipeApi = new RecipeApi();