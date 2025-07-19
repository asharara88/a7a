import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ui/ErrorBoundary';
import MinimalNav from './components/layout/MinimalNav';

// Import pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import OnboardingPage from './pages/auth/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import MyCoachPage from './pages/MyCoachPage';
import FitnessPage from './pages/FitnessPage';
import NutritionPage from './pages/NutritionPage';
import NutritionDashboardPage from './pages/NutritionDashboardPage';
import MyPlatePage from './pages/MyPlatePage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import SavedRecipesPage from './pages/SavedRecipesPage';
import SupplementsPage from './pages/SupplementsPage';
import SupplementDetailPage from './pages/SupplementDetailPage';
import SupplementRecommendationsPage from './pages/SupplementRecommendationsPage';
import MyStacksPage from './pages/MyStacksPage';
import CartPage from './pages/CartPage';
import SleepPage from './pages/SleepPage';
import MetabolismPage from './pages/MetabolismPage';
import MyBioPage from './pages/MyBioPage';
import BioclockPage from './pages/BioclockPage';
import EnvCheckPage from './pages/debug/EnvCheckPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <MinimalNav />
          <main>
            <Routes>
              {/* Public routes - Hero page at root */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              
              {/* Debug routes */}
              <Route path="/debug/env" element={<EnvCheckPage />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/mycoach" element={<MyCoachPage />} />
              <Route path="/mybio" element={<MyBioPage />} />
              <Route path="/bioclock" element={<BioclockPage />} />
              
              {/* Fitness routes */}
              <Route path="/fitness" element={<FitnessPage />} />
              
              {/* Nutrition routes */}
              <Route path="/nutrition" element={<NutritionPage />} />
              <Route path="/nutrition/dashboard" element={<NutritionDashboardPage />} />
              <Route path="/nutrition/myplate" element={<MyPlatePage />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/recipes/:id" element={<RecipeDetailPage />} />
              <Route path="/recipes/saved" element={<SavedRecipesPage />} />
              
              {/* Supplement routes */}
              <Route path="/supplements" element={<SupplementsPage />} />
              <Route path="/supplements/:id" element={<SupplementDetailPage />} />
              <Route path="/supplements/recommendations" element={<SupplementRecommendationsPage />} />
              <Route path="/my-stacks" element={<MyStacksPage />} />
              <Route path="/cart" element={<CartPage />} />
              
              {/* Health tracking routes */}
              <Route path="/sleep" element={<SleepPage />} />
              <Route path="/metabolism" element={<MetabolismPage />} />
              
              {/* 404 route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;