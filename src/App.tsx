import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import OnboardingPage from './pages/auth/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
import MyCoachPage from './pages/MyCoachPage'
import FitnessPage from './pages/FitnessPage'
import NutritionPage from './pages/NutritionPage'
import SupplementsPage from './pages/SupplementsPage'
import CartPage from './pages/CartPage'
import MyStacksPage from './pages/MyStacksPage'
import SupplementRecommendationsPage from './pages/SupplementRecommendationsPage'
import SupplementDetailPage from './pages/SupplementDetailPage'
import BioclockPage from './pages/BioclockPage'
import MyBioPage from './pages/MyBioPage'
import MetabolismPage from './pages/MetabolismPage'
import SleepPage from './pages/SleepPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'
import ErrorBoundary from './components/ui/ErrorBoundary'

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="onboarding" element={<OnboardingPage />} />
            
            {/* Protected routes */}
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="mycoach" element={<MyCoachPage />} />
            <Route path="fitness" element={<FitnessPage />} />
            <Route path="nutrition" element={<NutritionPage />} />
            <Route path="supplements" element={<SupplementsPage />} />
            <Route path="supplements/:id" element={<SupplementDetailPage />} />
            <Route path="supplements/recommendations" element={<SupplementRecommendationsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="my-stacks" element={<MyStacksPage />} />
            <Route path="bioclock" element={<BioclockPage />} />
            <Route path="mybio" element={<MyBioPage />} />
            <Route path="metabolism" element={<MetabolismPage />} />
            <Route path="sleep" element={<SleepPage />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App