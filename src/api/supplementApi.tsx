import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Supplement {
  id: string;
  name: string;
  brand?: string;
  description?: string;
  detailed_description?: string;
  price?: number;
  price_aed?: number;
  image_url?: string;
  tier?: 'green' | 'yellow' | 'orange' | 'red';
  benefits?: string[];
  dosage?: string;
  form_type?: string;
  form_image_url?: string;
  goal?: string;
  mechanism?: string;
  evidence_summary?: string;
  source_link?: string;
  nutritional_info?: string;
  stock_quantity?: number;
  is_available?: boolean;
  is_featured?: boolean;
  is_bestseller?: boolean;
  subscription_discount_percent?: number;
  use_case?: string;
  evidence_rating?: number;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SupplementStack {
  id: string;
  user_id?: string;
  category: string;
  name: string;
  description?: string;
  total_price: number;
  components: {
    supplement_id?: string;
    name: string;
    dosage: string;
    timing: string;
    price: number;
    notes?: string;
  }[];
  is_active?: boolean;
  goals?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  supplement_id: string;
  supplement: Supplement;
  quantity: number;
  created_at?: string;
  updated_at?: string;
}

export interface RecommendationResponse {
  supplements: Supplement[];
  stacks: SupplementStack[];
  personalized_message: string;
}

export const supplementApi = {
  // Get all supplements with filtering options
  async getSupplements(filters?: {
    category?: string;
    tier?: string;
    search?: string;
    featured?: boolean;
    bestseller?: boolean;
  }): Promise<Supplement[]> {
    try {
      let query = supabase
        .from('supplements')
        .select('*')
        .eq('is_available', true)
        .order('name');

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      
      if (filters?.tier) {
        query = query.eq('tier', filters.tier);
      }
      
      if (filters?.featured) {
        query = query.eq('is_featured', true);
      }
      
      if (filters?.bestseller) {
        query = query.eq('is_bestseller', true);
      }
      
      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,use_case.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching supplements:', error);
      return getMockSupplements();
    }
  },

  // Get supplement by ID
  async getSupplementById(id: string): Promise<Supplement | null> {
    try {
      const { data, error } = await supabase
        .from('supplements')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching supplement:', error);
      return getMockSupplementById(id);
    }
  },

  // Get personalized supplement recommendations
  async getPersonalizedRecommendations(userId?: string): Promise<RecommendationResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('recommendations', {
        body: { userId }
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return getMockRecommendations();
    }
  },

  // Create a new supplement stack
  async createSupplementStack(stackData: Omit<SupplementStack, 'id'>): Promise<SupplementStack | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.warn('User not authenticated, using mock data');
        return {
          id: 'mock-stack-' + Date.now(),
          ...stackData
        };
      }

      const { data, error } = await supabase.functions.invoke('supplement-stacks', {
        body: {
          action: 'create_stack',
          stackData: {
            ...stackData,
            user_id: user.id
          }
        }
      });

      if (error) throw error;
      return data.stack;
    } catch (error) {
      console.error('Error creating supplement stack:', error);
      return null;
    }
  },

  // Get user's supplement stacks
  async getUserSupplementStacks(): Promise<SupplementStack[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return getMockUserStacks();
      }

      const { data, error } = await supabase.functions.invoke('supplement-stacks', {
        body: {
          action: 'get_stacks'
        }
      });

      if (error) throw error;
      return data.stacks || [];
    } catch (error) {
      console.error('Error fetching user stacks:', error);
      return getMockUserStacks();
    }
  },

  // Update supplement stack
  async updateSupplementStack(stackId: string, updates: Partial<SupplementStack>): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.warn('User not authenticated');
        return false;
      }

      const { data, error } = await supabase.functions.invoke('supplement-stacks', {
        body: {
          action: 'update_stack',
          stackData: {
            id: stackId,
            ...updates
          }
        }
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating supplement stack:', error);
      return false;
    }
  },

  // Delete supplement stack
  async deleteSupplementStack(stackId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.warn('User not authenticated');
        return false;
      }

      const { data, error } = await supabase.functions.invoke('supplement-stacks', {
        body: {
          action: 'delete_stack',
          stackData: { id: stackId }
        }
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting supplement stack:', error);
      return false;
    }
  },

  // Add supplement to cart
  async addToCart(supplementId: string, quantity: number = 1): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.warn('User not authenticated, using mock data');
        return true;
      }

      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq('supplement_id', supplementId)
        .single();

      if (existingItem) {
        // Update quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ 
            quantity: existingItem.quantity + quantity,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        // Add new item
        const { error } = await supabase
          .from('cart_items')
          .insert([{
            user_id: user.id,
            supplement_id: supplementId,
            quantity
          }]);

        if (error) throw error;
      }

      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  },

  // Get cart items
  async getCartItems(): Promise<CartItem[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return getMockCartItems();
      }

      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          id, user_id, supplement_id, quantity, created_at, updated_at,
          supplement:supplement_id (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return getMockCartItems();
    }
  },

  // Update cart item quantity
  async updateCartItemQuantity(itemId: string, quantity: number): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.warn('User not authenticated');
        return false;
      }

      if (quantity <= 0) {
        return await this.removeFromCart(itemId);
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ 
          quantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', itemId)
        .eq('user_id', user.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating cart item:', error);
      return false;
    }
  },

  // Remove item from cart
  async removeFromCart(itemId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.warn('User not authenticated');
        return false;
      }

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)
        .eq('user_id', user.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  },

  // Clear entire cart
  async clearCart(): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.warn('User not authenticated');
        return false;
      }

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  },

  // Get supplement stacks (public/featured)
  async getSupplementStacks(): Promise<SupplementStack[]> {
    try {
      const { data, error } = await supabase
        .from('supplement_stacks')
        .select('*')
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching supplement stacks:', error);
      return getMockPublicStacks();
    }
  },

  // Get categories
  async getCategories(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('supplements')
        .select('category')
        .not('category', 'is', null);

      if (error) throw error;
      
      const categories = [...new Set(data?.map(item => item.category).filter(Boolean))] as string[];
      return categories.sort();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [
        'Muscle Building',
        'Sleep & Recovery', 
        'Cognitive Support',
        'Metabolism',
        'Gut Health',
        'General Health',
        'Longevity',
        'Hormonal Support'
      ];
    }
  },

  // Search supplements
  async searchSupplements(query: string): Promise<Supplement[]> {
    try {
      const { data, error } = await supabase
        .from('supplements')
        .select('*')
        .eq('is_available', true)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,use_case.ilike.%${query}%,category.ilike.%${query}%`)
        .order('name')
        .limit(20);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching supplements:', error);
      return [];
    }
  }
};

// Mock data functions for development and fallback
function getMockSupplements(): Supplement[] {
  return [
    {
      id: '1',
      name: 'Creatine Monohydrate',
      brand: 'Biowell',
      description: 'Increases strength and power output during high-intensity exercise.',
      detailed_description: 'Increases intramuscular phosphocreatine for rapid ATP regeneration, enhancing strength and power output.',
      tier: 'green',
      use_case: 'Muscle strength & power',
      price_aed: 85.00,
      subscription_discount_percent: 15,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      is_available: true,
      is_featured: true,
      is_bestseller: true,
      category: 'Muscle Building',
      dosage: '5g daily',
      benefits: ['Increased strength', 'Enhanced power output', 'Improved recovery']
    },
    {
      id: '2',
      name: 'Vitamin D3',
      brand: 'Biowell',
      description: 'Essential fat-soluble vitamin that supports immune function, bone health, and mood regulation.',
      tier: 'green',
      use_case: 'Immune & bone health',
      price_aed: 40.00,
      subscription_discount_percent: 10,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      is_available: true,
      is_featured: false,
      is_bestseller: false,
      category: 'General Health',
      dosage: '5000 IU daily',
      benefits: ['Immune support', 'Bone health', 'Mood regulation']
    },
    {
      id: '3',
      name: 'Magnesium Glycinate',
      brand: 'Biowell',
      description: 'Highly bioavailable form of magnesium that supports sleep, muscle recovery, and nervous system function.',
      tier: 'yellow',
      use_case: 'Sleep & recovery',
      price_aed: 75.00,
      subscription_discount_percent: 12,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      is_available: true,
      is_featured: false,
      is_bestseller: false,
      category: 'Sleep & Recovery',
      dosage: '400mg before bed',
      benefits: ['Better sleep', 'Muscle relaxation', 'Stress reduction']
    }
  ];
}

function getMockSupplementById(id: string): Supplement | null {
  const supplements = getMockSupplements();
  return supplements.find(s => s.id === id) || null;
}

function getMockRecommendations(): RecommendationResponse {
  return {
    supplements: getMockSupplements().slice(0, 3),
    stacks: getMockPublicStacks().slice(0, 2),
    personalized_message: "Based on your health goals, here are some evidence-based supplements that may support your wellness journey."
  };
}

function getMockUserStacks(): SupplementStack[] {
  return [
    {
      id: '1',
      category: 'Sleep',
      name: 'Sleep Optimization Stack',
      description: 'Comprehensive stack for better sleep quality and recovery',
      total_price: 190.00,
      components: [
        { name: 'Magnesium Glycinate', dosage: '400mg', timing: 'Before bed', price: 75.00 },
        { name: 'L-Theanine', dosage: '200mg', timing: 'Evening', price: 65.00 },
        { name: 'Ashwagandha', dosage: '600mg', timing: 'Dinner', price: 50.00 }
      ],
      is_active: true,
      goals: ['Better sleep', 'Stress reduction']
    }
  ];
}

function getMockPublicStacks(): SupplementStack[] {
  return [
    {
      id: 'public-1',
      category: 'Performance',
      name: 'Athletic Performance Stack',
      description: 'Boost your workout performance and recovery',
      total_price: 185.00,
      components: [
        { name: 'Creatine Monohydrate', dosage: '5g', timing: 'Pre-workout', price: 85.00 },
        { name: 'Beta-Alanine', dosage: '3g', timing: 'Pre-workout', price: 60.00 },
        { name: 'Whey Protein', dosage: '30g', timing: 'Post-workout', price: 40.00 }
      ]
    },
    {
      id: 'public-2',
      category: 'Cognitive',
      name: 'Brain Boost Stack',
      description: 'Enhance focus, memory, and cognitive performance',
      total_price: 220.00,
      components: [
        { name: 'Lion\'s Mane', dosage: '1000mg', timing: 'Morning', price: 80.00 },
        { name: 'Bacopa Monnieri', dosage: '300mg', timing: 'Morning', price: 70.00 },
        { name: 'Omega-3 DHA', dosage: '1000mg', timing: 'With meals', price: 70.00 }
      ]
    }
  ];
}

function getMockCartItems(): CartItem[] {
  return [
    {
      id: '1',
      user_id: 'demo-user',
      supplement_id: '1',
      supplement: {
        id: '1',
        name: 'Creatine Monohydrate',
        brand: 'Biowell',
        price_aed: 85.00,
        image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
        tier: 'green',
        category: 'Muscle Building'
      },
      quantity: 2
    },
    {
      id: '2',
      user_id: 'demo-user',
      supplement_id: '2',
      supplement: {
        id: '2',
        name: 'Vitamin D3',
        brand: 'Biowell',
        price_aed: 40.00,
        image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
        tier: 'green',
        category: 'General Health'
      },
      quantity: 1
    }
  ];
}