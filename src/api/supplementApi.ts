import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Supplement {
  id: string;
  name: string;
  brand: string;
  description: string;
  detailed_description?: string;
  tier: 'green' | 'yellow' | 'orange' | 'red';
  use_case: string;
  price_aed: number;
  subscription_discount_percent: number;
  image_url: string;
  is_available?: boolean;
  is_featured?: boolean;
  is_bestseller?: boolean;
  form_type?: string;
  form_image_url?: string;
  benefits?: string[];
  ingredients?: string;
  dosage?: string;
  certifications?: string[];
  rating?: number;
  reviews?: number;
  is_available: boolean;
  is_featured: boolean;
  is_bestseller: boolean;
}

export interface SupplementStack {
  id: string;
  name: string;
  category: string;
  total_price: number;
  components: any[];
  description?: string;
  is_active?: boolean;
}

export interface SupplementRecommendation {
  supplements: Supplement[];
  stacks: SupplementStack[];
  personalized_message: string;
}

export interface CartItem {
  id: string;
  supplement_id: string;
  user_id: string;
  quantity: number;
  created_at: string;
  updated_at?: string;
}

// API functions
export const supplementApi = {
  // Get all supplements
  getSupplements: async (filters?: {
    tier?: 'green' | 'yellow' | 'orange' | 'all';
    category?: string;
    featured?: boolean;
    search?: string;
  }): Promise<Supplement[]> => {
    try {
      // First try to get supplements from supplements table
      let query = supabase.from('supplements').select('*');
      
      if (filters) {
        if (filters.tier && filters.tier !== 'all') {
          query = query.eq('tier', filters.tier);
        }
        
        if (filters.category) {
          query = query.eq('category', filters.category);
        }
        
        if (filters.featured) {
          query = query.eq('is_featured', true);
        }
        
        if (filters.search) {
          query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
        }
      }
      
      const { data: supplementsData, error: supplementsError } = await query.eq('is_available', true);
      
      if (supplementsData && supplementsData.length > 0) {
        return supplementsData;
      }
      
      // If no supplements found or error, try supplement table (older name)
      query = supabase.from('supplement').select('*');
      
      // Apply filters
      if (filters) {
        if (filters.tier && filters.tier !== 'all') {
          query = query.eq('tier', filters.tier);
        }
        
        if (filters.category) {
          query = query.eq('category', filters.category);
        }
        
        if (filters.featured) {
          query = query.eq('is_featured', true);
        }
        
        if (filters.search) {
          query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
        }
      }
      
      const { data, error } = await query.eq('is_available', true);
      
      if (error) {
        console.warn("Error fetching supplements:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Error getting supplements:', error);
      return [];
    }
  },
  
  // Get supplements by tier
  getSupplementsByTier: async (tier: 'green' | 'yellow' | 'orange' | 'all'): Promise<Supplement[]> => {
    return supplementApi.getSupplements({ tier });
  },
  
  // Get supplement by ID
  getSupplementById: async (id: string): Promise<Supplement | null> => {
    try {
      const { data, error } = await supabase
        .from('supplements')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error getting supplement:', error);
      return null;
    }
  },
  
  // Get personalized supplement recommendations
  getPersonalizedRecommendations: async (userId: string): Promise<SupplementRecommendation> => {
    try {
      const { data, error } = await supabase.functions.invoke('recommendations', {
        body: { userId }
      });
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error getting personalized recommendations:', error);
      
      // Return mock data for development
      return {
        supplements: [],
        stacks: [],
        personalized_message: "We couldn't generate personalized recommendations at this time."
      };
    }
  },
  
  // Get supplement stacks
  getSupplementStacks: async (): Promise<SupplementStack[]> => {
    try {
      const { data, error } = await supabase
        .from('supplement_stacks')
        .select('*');
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error getting supplement stacks:', error);
      return [];
    }
  },
  
  // Get user's supplement stacks
  getUserSupplementStacks: async (userId: string): Promise<SupplementStack[]> => {
    try {
      const { data, error } = await supabase
        .from('supplement_stacks')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error getting user supplement stacks:', error);
      return [];
    }
  },
  
  // Create a supplement stack
  createSupplementStack: async (stack: Omit<SupplementStack, 'id'>): Promise<SupplementStack | null> => {
    try {
      const { data, error } = await supabase
        .from('supplement_stacks')
        .insert([stack])
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error creating supplement stack:', error);
      return null;
    }
  },
  
  // Update a supplement stack
  updateSupplementStack: async (id: string, updates: Partial<SupplementStack>): Promise<SupplementStack | null> => {
    try {
      const { data, error } = await supabase
        .from('supplement_stacks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error updating supplement stack:', error);
      return null;
    }
  },
  
  // Delete a supplement stack
  deleteSupplementStack: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('supplement_stacks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error deleting supplement stack:', error);
      return false;
    }
  },
  
  // Get cart items
  getCartItems: async (userId: string): Promise<CartItem[]> => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*, supplements(*)')
        .eq('user_id', userId);
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error getting cart items:', error);
      return [];
    }
  },
  
  // Add item to cart
  addToCart: async (userId: string, supplementId: string, quantity: number = 1): Promise<CartItem | null> => {
    try {
      // Check if item already exists in cart
      const { data: existingItems, error: checkError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('supplement_id', supplementId)
        .maybeSingle();
      
      if (checkError) throw checkError;
      
      if (existingItems) {
        // Update quantity if item exists
        const newQuantity = existingItems.quantity + quantity;
        
        const { data, error } = await supabase
          .from('cart_items')
          .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
          .eq('id', existingItems.id)
          .select()
          .single();
        
        if (error) throw error;
        
        return data;
      } else {
        // Insert new item if it doesn't exist
        const { data, error } = await supabase
          .from('cart_items')
          .insert([{
            user_id: userId,
            supplement_id: supplementId,
            quantity
          }])
          .select()
          .single();
        
        if (error) throw error;
        
        return data;
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      return null;
    }
  },
  
  // Update cart item quantity
  updateCartItemQuantity: async (itemId: string, quantity: number): Promise<CartItem | null> => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity, updated_at: new Date().toISOString() })
        .eq('id', itemId)
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      return null;
    }
  },
  
  // Remove item from cart
  removeFromCart: async (itemId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  },
  
  // Clear cart
  clearCart: async (userId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  }
};