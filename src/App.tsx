import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import OnboardingPage from './pages/auth/OnboardingPage';
import ParticipationSelectionPage from './pages/ParticipationSelectionPage';
import FertilityPartnerPage from './pages/FertilityPartnerPage';
import MyCoachPage from './pages/MyCoachPage';
import NutritionPage from './pages/NutritionPage';
import NutritionDashboardPage from './pages/NutritionDashboardPage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import SavedRecipesPage from './pages/SavedRecipesPage';
import FitnessPage from './pages/FitnessPage';
import BioClockPage from './pages/BioClockPage';
import MetabolismPage from './pages/MetabolismPage';
import SupplementsPage from './pages/SupplementsPage';
import SupplementDetailPage from './pages/SupplementDetailPage';
import SupplementRecommendationsPage from './pages/SupplementRecommendationsPage';
import MyStacksPage from './pages/MyStacksPage';
import LabResultsPage from './pages/LabResultsPage';
import LabResultDetailPage from './pages/LabResultDetailPage';
import CartPage from './pages/CartPage';
import ProfileExportPage from './pages/ProfileExportPage';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setIsAuthenticated(!!data.user);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  if (isLoading) {
    // Show loading state
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Demo mode route - can be accessed without login for demonstration purposes
const DemoRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setIsAuthenticated(!!data.user);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};

function App() {
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize theme system
    const initializeApp = async () => {
      // Any additional initialization can be added here
      setIsInitialized(true);
    };

    initializeApp();
  }, []);

  // Don't render until we've initialized
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // For auth pages, don't use the main layout
  const isAuthPage = [
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/onboarding'
  ].includes(location.pathname);

  return (
    <>
      {isAuthPage ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            
            {/* Demo/Preview Routes */}
            <Route path="/dashboard" element={<DemoRoute><DashboardPage /></DemoRoute>} />
            <Route path="/mycoach" element={<DemoRoute><MyCoachPage /></DemoRoute>} />
            
            {/* Protected Routes */}
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/export" element={<ProtectedRoute><ProfileExportPage /></ProtectedRoute>} />
            
            {/* Nutrition Routes */}
            <Route path="/nutrition" element={<DemoRoute><NutritionPage /></DemoRoute>} />
            <Route path="/nutrition/dashboard" element={<DemoRoute><NutritionDashboardPage /></DemoRoute>} />
            <Route path="/recipes" element={<DemoRoute><RecipesPage /></DemoRoute>} />
            <Route path="/recipes/:id" element={<DemoRoute><RecipeDetailPage /></DemoRoute>} />
            <Route path="/saved-recipes" element={<DemoRoute><SavedRecipesPage /></DemoRoute>} />
            
            {/* Fitness Routes */}
            <Route path="/fitness" element={<DemoRoute><FitnessPage /></DemoRoute>} />
            
            {/* Bioclock Routes */}
            <Route path="/bioclock" element={<DemoRoute><BioClockPage /></DemoRoute>} />
            <Route path="/metabolism" element={<DemoRoute><MetabolismPage /></DemoRoute>} />
            
            {/* Supplements Routes */}
            <Route path="/supplements" element={<DemoRoute><SupplementsPage /></DemoRoute>} />
            <Route path="/supplements/:id" element={<DemoRoute><SupplementDetailPage /></DemoRoute>} />
            <Route path="/recommendations" element={<DemoRoute><SupplementRecommendationsPage /></DemoRoute>} />
            <Route path="/my-stacks" element={<DemoRoute><MyStacksPage /></DemoRoute>} />
            <Route path="/lab-results" element={<DemoRoute><LabResultsPage /></DemoRoute>} />
            <Route path="/lab-results/:id" element={<DemoRoute><LabResultDetailPage /></DemoRoute>} />
            <Route path="/cart" element={<DemoRoute><CartPage /></DemoRoute>} />
            
            {/* Partner Routes */}
            <Route path="/participation" element={<DemoRoute><ParticipationSelectionPage /></DemoRoute>} />
            <Route path="/fertility/partner" element={<DemoRoute><FertilityPartnerPage /></DemoRoute>} />
            
            {/* Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;