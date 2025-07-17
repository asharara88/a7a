import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

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
const SupplementDetailPage = React.lazy(() => import('./pages/SupplementDetailPage'))
const RecipeDetailPage = React.lazy(() => import('./pages/RecipeDetailPage'))
const SavedRecipesPage = React.lazy(() => import('./pages/SavedRecipesPage'))
const NutritionDashboardPage = React.lazy(() => import('./pages/NutritionDashboardPage'))
const MyStacksPage = React.lazy(() => import('./pages/MyStacksPage'))
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
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/mycoach" element={<MyCoachPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/nutrition/dashboard" element={<NutritionDashboardPage />} />
          <Route path="/fitness" element={<FitnessPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
          <Route path="/saved-recipes" element={<SavedRecipesPage />} />
          <Route path="/my-stacks" element={<MyStacksPage />} />
          <Route path="/supplements" element={<SupplementsPage />} />
          <Route path="/supplements/:id" element={<SupplementDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </React.Suspense>
    </Layout>
  )
}

export default App