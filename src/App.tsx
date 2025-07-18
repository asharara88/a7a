import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Layout from './components/layout/Layout';
import { default as HomePage } from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import MyCoachPage from './pages/MyCoachPage';
import MyPlatePage from './pages/MyPlatePage';
import NutritionPage from './pages/NutritionPage';
import FitnessPage from './pages/FitnessPage';
import SupplementsPage from './pages/SupplementsPage';
import RecipesPage from './pages/RecipesPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import OnboardingPage from './pages/auth/OnboardingPage';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';
import MyStacksPage from './pages/MyStacksPage';
import SupplementStorePage from './pages/SupplementStorePage';
import SupplementDetailPage from './pages/SupplementDetailPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import SavedRecipesPage from './pages/SavedRecipesPage';
import NutritionDashboardPage from './pages/NutritionDashboardPage';
import SupplementRecommendationsPage from './pages/SupplementRecommendationsPage';
import MetabolismPage from './pages/MetabolismPage';
import BioclockPage from './pages/BioclockPage';
import MyBioPage from './pages/MyBioPage';
import SleepPage from './pages/SleepPage';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="mycoach" element={<MyCoachPage />} />
        <Route path="nutrition" element={<NutritionPage />} />
        <Route path="nutrition/dashboard" element={<NutritionDashboardPage />} />
        <Route path="nutrition/myplate" element={<MyPlatePage />} />
        <Route path="fitness" element={<FitnessPage />} />
        <Route path="sleep" element={<SleepPage />} />
        <Route path="supplements" element={<SupplementsPage />} />
        <Route path="supplements/store" element={<SupplementStorePage />} />
        <Route path="my-stacks" element={<MyStacksPage />} />
        <Route path="supplements/recommendations" element={<SupplementRecommendationsPage />} />
        <Route path="supplements/:id" element={<SupplementDetailPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="recipes/saved" element={<SavedRecipesPage />} />
        <Route path="recipes/:id" element={<RecipeDetailPage />} />
        <Route path="metabolism" element={<MetabolismPage />} />
        <Route path="mybio" element={<MyBioPage />} />
        <Route path="bioclock" element={<BioclockPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;