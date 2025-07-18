import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { createClient } from '@supabase/supabase-js'
import { useLocation } from 'react-router-dom'
import FitnessFloatingMenu from './components/ui/FitnessFloatingMenu'
import ErrorBoundary from './components/ui/ErrorBoundary'

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are missing. Check your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Auth error:', error);
          setIsAuthenticated(false);
          return;
        }
        setIsAuthenticated(!!data.user);
      } catch (e) {
        console.error('Auth check failed:', e);
        setError('Authentication service unavailable. Please check your connection.');
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Still checking authentication
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8">
          <h2 className="text-xl font-bold text-red-600 mb-4">Authentication Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
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
const FitnessPage = React.lazy(() => import('./pages/FitnessPage'))
const NutritionPage = React.lazy(() => import('./pages/NutritionPage'))
const RecipesPage = React.lazy(() => import('./pages/RecipesPage')) 
const SupplementsPage = React.lazy(() => import('./pages/SupplementsPage')) 
const NutritionDashboardPage = React.lazy(() => import('./pages/NutritionDashboardPage'))
const RecipeDetailPage = React.lazy(() => import('./pages/RecipeDetailPage'))
const SavedRecipesPage = React.lazy(() => import('./pages/SavedRecipesPage'))
const MetabolismPage = React.lazy(() => import('./pages/MetabolismPage'))
const SupplementStorePage = React.lazy(() => import('./pages/SupplementStorePage'))
const MyStacksPage = React.lazy(() => import('./pages/MyStacksPage'))
const SupplementRecommendationsPage = React.lazy(() => import('./pages/SupplementRecommendationsPage'))
const SupplementDetailPage = React.lazy(() => import('./pages/SupplementDetailPage'))
const CartPage = React.lazy(() => import('./pages/CartPage'))
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'))

const App: React.FC = () => {
  const location = useLocation();
  
  // Show fitness floating menu on relevant pages
  const showFitnessMenu = ['/dashboard', '/nutrition', '/mycoach'].some(path => 
    location.pathname.startsWith(path)
  );

  return (
    <ErrorBoundary>
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
            <Route path="/fitness" element={<ProtectedRoute><FitnessPage /></ProtectedRoute>} />
            <Route path="/nutrition" element={<ProtectedRoute><NutritionPage /></ProtectedRoute>} />
            <Route path="/nutrition/dashboard" element={<ProtectedRoute><NutritionDashboardPage /></ProtectedRoute>} />
            <Route path="/metabolism" element={<ProtectedRoute><MetabolismPage /></ProtectedRoute>} />
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
          
          {/* Contextual Fitness Menu */}
          {showFitnessMenu && <FitnessFloatingMenu />}
        </React.Suspense>
      </Layout>
    </ErrorBoundary>
  )
}

export default App