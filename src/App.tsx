import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setIsAuthenticated(!!data.user);
    };
    
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Still checking authentication
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Lazy load pages
const HomePage = React.lazy(() => import('./pages/HomePage'))
const AboutPage = React.lazy(() => import('./pages/AboutPage'))
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'))
const SignupPage = React.lazy(() => import('./pages/auth/SignupPage'))
const OnboardingPage = React.lazy(() => import('./pages/auth/OnboardingPage'))
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'))
const MyCoachPage = React.lazy(() => import('./pages/MyCoachPage.tsx'))
const NutritionPage = React.lazy(() => import('./pages/NutritionPage'))
const FitnessPage = React.lazy(() => import('./pages/FitnessPage'))
const RecipesPage = React.lazy(() => import('./pages/RecipesPage')) 
const SupplementsPage = React.lazy(() => import('./pages/SupplementsPage')) 
const NutritionDashboardPage = React.lazy(() => import('./pages/NutritionDashboardPage'))
const RecipeDetailPage = React.lazy(() => import('./pages/RecipeDetailPage'))
const SupplementStorePage = React.lazy(() => import('./pages/SupplementStorePage'))
const MyStacksPage = React.lazy(() => import('./pages/MyStacksPage'))
const SupplementRecommendationsPage = React.lazy(() => import('./pages/SupplementRecommendationsPage'))
const SupplementDetailPage = React.lazy(() => import('./pages/SupplementDetailPage'))
const CartPage = React.lazy(() => import('./pages/CartPage'))
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'))

const App: React.FC = () => {
  return (
    <Layout>
      <React.Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/mycoach" element={<ProtectedRoute><MyCoachPage /></ProtectedRoute>} />
          <Route path="/nutrition" element={<ProtectedRoute><NutritionPage /></ProtectedRoute>} />
          <Route path="/nutrition/dashboard" element={<ProtectedRoute><NutritionDashboardPage /></ProtectedRoute>} />
          <Route path="/fitness" element={<ProtectedRoute><FitnessPage /></ProtectedRoute>} />
          <Route path="/recipes" element={<ProtectedRoute><RecipesPage /></ProtectedRoute>} />
          <Route path="/recipes/:id" element={<ProtectedRoute><RecipeDetailPage /></ProtectedRoute>} />
          <Route path="/saved-recipes" element={<ProtectedRoute><SavedRecipesPage /></ProtectedRoute>} />
          <Route path="/my-stacks" element={<ProtectedRoute><MyStacksPage /></ProtectedRoute>} />
          <Route path="/supplement-store" element={<ProtectedRoute><SupplementStorePage /></ProtectedRoute>} />
          <Route path="/supplements" element={<ProtectedRoute><SupplementsPage /></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute><SupplementRecommendationsPage /></ProtectedRoute>} />
          <Route path="/supplements/:id" element={<ProtectedRoute><SupplementDetailPage /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </React.Suspense>
    </Layout>
  )
}

export default App