import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface LabResult {
  id: string;
  userId: string;
  testName: string;
  testDate: string;
  testCategory?: string;
  testResults: Record<string, any>;
  fileUrl?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LabResultSummary {
  recentTests: {
    testName: string;
    testDate: string;
    testCategory: string;
  }[];
  totalResults: number;
  categories: string[];
}

// API functions
export const labResultsApi = {
  // Upload lab results
  uploadLabResult: async (
    userId: string, 
    data: Omit<LabResult, 'id' | 'userId' | 'createdAt' | 'updatedAt'>, 
    file?: File
  ): Promise<LabResult | null> => {
    try {
      // If no user ID, return mock data for demo
      if (!userId || userId === 'demo-user-id') {
        return {
          id: `lab-${Date.now()}`,
          userId: 'demo-user-id',
          testName: data.testName,
          testDate: data.testDate,
          testCategory: data.testCategory,
          testResults: data.testResults,
          fileUrl: data.fileUrl || 'https://example.com/sample-lab.pdf',
          notes: data.notes
        };
      }
      
      let fileUrl = '';
      
      // Upload file if provided
      if (file) {
        const fileExt = file.name.split('.').pop();
        const filePath = `lab-results/${userId}/${Math.random().toString(36).substring(2)}${fileExt ? `.${fileExt}` : ''}`;
        
        const { data: fileData, error: fileError } = await supabase
          .storage
          .from('lab-results')
          .upload(filePath, file);
        
        if (fileError) throw fileError;
        
        // Get public URL for the file
        const { data: { publicUrl } } = supabase
          .storage
          .from('lab-results')
          .getPublicUrl(filePath);
        
        fileUrl = publicUrl;
      }
      
      // Save lab result data
      const { data: resultData, error } = await supabase
        .from('lab_results')
        .insert([{
          user_id: userId,
          test_name: data.testName,
          test_date: data.testDate,
          test_category: data.testCategory,
          test_results: data.testResults,
          file_url: fileUrl || data.fileUrl,
          notes: data.notes
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        id: resultData.id,
        userId: resultData.user_id,
        testName: resultData.test_name,
        testDate: resultData.test_date,
        testCategory: resultData.test_category,
        testResults: resultData.test_results,
        fileUrl: resultData.file_url,
        notes: resultData.notes,
        createdAt: resultData.created_at,
        updatedAt: resultData.updated_at
      };
    } catch (error) {
      console.error('Error uploading lab result:', error);
      return null;
    }
  },
  
  // Get lab results for a user
  getLabResults: async (userId: string): Promise<LabResult[]> => {
    try {
      // If no user ID, return mock data for demo
      if (!userId || userId === 'demo-user-id') {
        return getMockLabResults();
      }
      
      const { data, error } = await supabase
        .from('lab_results')
        .select('*')
        .eq('user_id', userId)
        .order('test_date', { ascending: false });
      
      if (error) throw error;
      
      return data.map(item => ({
        id: item.id,
        userId: item.user_id,
        testName: item.test_name,
        testDate: item.test_date,
        testCategory: item.test_category,
        testResults: item.test_results,
        fileUrl: item.file_url,
        notes: item.notes,
        createdAt: item.created_at,
        updatedAt: item.updated_at
      }));
    } catch (error) {
      console.error('Error getting lab results:', error);
      return getMockLabResults();
    }
  },
  
  // Get lab result by ID
  getLabResult: async (id: string): Promise<LabResult | null> => {
    try {
      // For demo data
      if (id.startsWith('mock')) {
        const mockResults = getMockLabResults();
        return mockResults.find(r => r.id === id) || null;
      }
      
      const { data, error } = await supabase
        .from('lab_results')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        userId: data.user_id,
        testName: data.test_name,
        testDate: data.test_date,
        testCategory: data.test_category,
        testResults: data.test_results,
        fileUrl: data.file_url,
        notes: data.notes,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error getting lab result:', error);
      return null;
    }
  },
  
  // Delete lab result
  deleteLabResult: async (id: string): Promise<boolean> => {
    try {
      // For demo data
      if (id.startsWith('mock')) {
        return true;
      }
      
      const { error } = await supabase
        .from('lab_results')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error deleting lab result:', error);
      return false;
    }
  },
  
  // Get lab results summary
  getLabResultsSummary: async (userId: string): Promise<LabResultSummary> => {
    try {
      // If no user ID, return mock data for demo
      if (!userId || userId === 'demo-user-id') {
        const mockResults = getMockLabResults();
        
        const recentTests = mockResults.slice(0, 3).map(item => ({
          testName: item.testName,
          testDate: item.testDate,
          testCategory: item.testCategory || 'General'
        }));
        
        const categories = [...new Set(mockResults
          .map(item => item.testCategory)
          .filter(Boolean) as string[])];
        
        return {
          recentTests,
          totalResults: mockResults.length,
          categories
        };
      }
      
      const { data, error } = await supabase
        .from('lab_results')
        .select('test_name, test_date, test_category')
        .eq('user_id', userId)
        .order('test_date', { ascending: false });
      
      if (error) throw error;
      
      const recentTests = data.slice(0, 5).map(item => ({
        testName: item.test_name,
        testDate: item.test_date,
        testCategory: item.test_category
      }));
      
      const categories = [...new Set(data
        .map(item => item.test_category)
        .filter(Boolean))];
      
      return {
        recentTests,
        totalResults: data.length,
        categories
      };
    } catch (error) {
      console.error('Error getting lab results summary:', error);
      return {
        recentTests: [],
        totalResults: 0,
        categories: []
      };
    }
  }
};

// Mock data for development and testing
function getMockLabResults(): LabResult[] {
  return [
    {
      id: 'mock-lab-1',
      userId: 'demo-user-id',
      testName: 'Comprehensive Blood Panel',
      testDate: '2025-06-15',
      testCategory: 'Blood Panel',
      testResults: {
        cholesterol: {
          total: 175,
          hdl: 55,
          ldl: 95,
          ratio: 3.2
        },
        glucose: 88,
        hemoglobin: 14.5,
        hematocrit: 43,
        platelets: 250,
        wbc: 6.2
      },
      fileUrl: 'https://example.com/lab-results/blood-panel.pdf',
      notes: 'Annual checkup results showing improvements in cholesterol levels',
      createdAt: '2025-06-16T10:30:00Z',
      updatedAt: '2025-06-16T10:30:00Z'
    },
    {
      id: 'mock-lab-2',
      userId: 'demo-user-id',
      testName: 'Vitamin Panel',
      testDate: '2025-06-01',
      testCategory: 'Nutrient Panel',
      testResults: {
        vitaminD: 35,
        vitaminB12: 550,
        folate: 18,
        iron: 95,
        ferritin: 120
      },
      fileUrl: 'https://example.com/lab-results/vitamin-panel.pdf',
      createdAt: '2025-06-02T14:15:00Z',
      updatedAt: '2025-06-02T14:15:00Z'
    },
    {
      id: 'mock-lab-3',
      userId: 'demo-user-id',
      testName: 'Lipid Profile',
      testDate: '2025-03-10',
      testCategory: 'Blood Panel',
      testResults: {
        cholesterol: {
          total: 195,
          hdl: 48,
          ldl: 120,
          ratio: 4.1
        },
        triglycerides: 140
      },
      fileUrl: 'https://example.com/lab-results/lipid-profile.pdf',
      notes: 'Pre-supplement baseline',
      createdAt: '2025-03-11T09:45:00Z',
      updatedAt: '2025-03-11T09:45:00Z'
    },
    {
      id: 'mock-lab-4',
      userId: 'demo-user-id',
      testName: 'Hormone Panel',
      testDate: '2025-05-05',
      testCategory: 'Hormone Panel',
      testResults: {
        testosterone: {
          total: 650,
          free: 15.2
        },
        estradiol: 25,
        dhea: 320,
        cortisol: 14.2,
        tsh: 2.1,
        t4: 1.2,
        t3: 3.1
      },
      createdAt: '2025-05-06T11:20:00Z',
      updatedAt: '2025-05-06T11:20:00Z'
    }
  ];
}