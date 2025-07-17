// @deno-types="https://deno.land/x/types/npm/axios/index.d.ts"
import axios from "npm:axios@1.6.2";

// Define response types
interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  sourceUrl: string;
  summary: string;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  analyzedInstructions: any[];
  cuisines: string[];
  diets: string[];
  nutrition?: {
    nutrients: {
      name: string;
      amount: number;
      unit: string;
    }[];
  };
}

interface RecipeSearchResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}

// Cors headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { diet, intolerances, excludeIngredients, includeIngredients, maxReadyTime, minProtein, maxCalories } = await req.json();
    
    // Get API key from environment
    const apiKey = Deno.env.get("SPOONACULAR_API_KEY");
    if (!apiKey) {
      console.warn("Spoonacular API key not configured, returning mock data");
      return new Response(
        JSON.stringify({ 
          recipes: getMockRecipeData(),
          total: getMockRecipeData().length,
          message: "Using mock data - API key not configured"
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Build query parameters
    const params = new URLSearchParams();
    params.append("apiKey", apiKey);
    params.append("number", "12"); // Increased number of results
    params.append("addRecipeNutrition", "true"); // Include nutrition info
    
    if (diet) params.append("diet", diet);
    if (intolerances) params.append("intolerances", intolerances);
    if (excludeIngredients) params.append("excludeIngredients", excludeIngredients);
    if (includeIngredients) params.append("includeIngredients", includeIngredients);
    if (query) params.append("query", query);
    if (maxReadyTime) params.append("maxReadyTime", maxReadyTime.toString());
    if (minProtein) params.append("minProtein", minProtein.toString());
    if (maxCalories) params.append("maxCalories", maxCalories.toString());
    
    // Make request to Spoonacular API
    const response = await axios.get<RecipeSearchResponse>(
      `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`
    );
    
    // Process and return the data
    const recipes = response.data.results.map(recipe => ({
      id: recipe.id || 0,
      title: recipe.title || "Unnamed Recipe",
      image: recipe.image || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300",
      readyInMinutes: recipe.readyInMinutes || 30,
      servings: recipe.servings || 4,
      sourceUrl: recipe.sourceUrl || "",
      summary: recipe.summary || "No summary available",
      healthScore: recipe.healthScore || 50,
      diets: recipe.diets || [],
      nutrition: recipe.nutrition ? {
        calories: recipe.nutrition.nutrients.find(n => n.name === "Calories")?.amount || 0,
        protein: recipe.nutrition.nutrients.find(n => n.name === "Protein")?.amount || 0,
        fat: recipe.nutrition.nutrients.find(n => n.name === "Fat")?.amount || 0,
        carbs: recipe.nutrition.nutrients.find(n => n.name === "Carbohydrates")?.amount || 0,
      } : {
        calories: 0,
        protein: 0, 
        fat: 0,
        carbs: 0
      }
    }));
    
    return new Response(
      JSON.stringify({ recipes, total: response.data.totalResults }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ 
        recipes: getMockRecipeData(),
        total: getMockRecipeData().length,
        message: error instanceof Error ? error.message : "Failed to process request - using mock data"
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});

// Mock recipe data function for development and fallback
function getMockRecipeData() {
  return [
    {
      id: 716429,
      title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
      image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
      readyInMinutes: 45,
      servings: 2,
      sourceUrl: "https://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html",
      summary: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be just the main course you are searching for. This recipe makes 2 servings with 636 calories, 21g of protein, and 20g of fat each.",
      healthScore: 76,
      diets: ["dairy free", "lacto ovo vegetarian", "vegan"],
      nutrition: {
        calories: 636,
        protein: 21,
        fat: 20,
        carbs: 83
      }
    },
    {
      id: 715538,
      title: "What to make for dinner tonight?? Bruschetta Style Pork & Pasta",
      image: "https://spoonacular.com/recipeImages/715538-556x370.jpg",
      readyInMinutes: 35,
      servings: 4,
      sourceUrl: "https://www.pinkwhen.com/bruschetta-style-pork-pasta/",
      summary: "What to make for dinner tonight?? Bruschetta Style Pork & Pasta might be a good recipe to expand your main course recipe box. This recipe makes 4 servings with 520 calories, 45g of protein, and 19g of fat each.",
      healthScore: 81,
      diets: ["dairy free"],
      nutrition: {
        calories: 520,
        protein: 45,
        fat: 19,
        carbs: 45
      }
    },
    {
      id: 782601,
      title: "Red Kidney Bean Jambalaya",
      image: "https://spoonacular.com/recipeImages/782601-556x370.jpg",
      readyInMinutes: 45,
      servings: 6,
      sourceUrl: "https://www.foodista.com/recipe/6BFKZR7Y/red-kidney-bean-jambalaya",
      summary: "Red Kidney Bean Jambalayan is a main course that serves 6. One serving contains 538 calories, 21g of protein, and 8g of fat.",
      healthScore: 96,
      diets: ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan"],
      nutrition: {
        calories: 538,
        protein: 21,
        fat: 8,
        carbs: 92
      }
    }
  ];
}