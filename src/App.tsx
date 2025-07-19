 codex/fix-import-resolution-error-for-button
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { Button } from './components/ui/Button'

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug environment variables
console.log('Environment check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  urlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'missing',
  keyPreview: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'missing'
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  });
}

let supabase;
try {
  supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co', 
    supabaseAnonKey || 'placeholder-key'
  );
  console.log('Supabase client created successfully');
} catch (err) {
  console.error('Failed to create Supabase client:', err);
}

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Comprehensive validation
    if (!supabaseUrl) {
      setError('Missing Supabase URL. Please check environment variables.')
      console.error('VITE_SUPABASE_URL is not set');
      return
    }
    
    if (!supabaseAnonKey) {
      setError('Missing Supabase API key. Please check environment variables.')
      console.error('VITE_SUPABASE_ANON_KEY is not set');
      return
    }

    if (!supabase) {
      setError('Supabase client initialization failed.')
      return
    }

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password')
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      console.log('Attempting to sign in with:', { email: formData.email });
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })
      
      if (signInError) {
        console.error('Supabase sign in error:', signInError);
        throw signInError;
      }
      
      if (data?.user) {
        console.log('Sign in successful:', data.user.id);
        // Successful login, redirect to dashboard
        navigate('/dashboard')
      } else {
        console.warn('No user data returned from successful sign in');
        setError('Login successful but no user data received. Please try again.');
      }
    } catch (err: any) {
      console.error('Login error:', err)
      
      // More specific error messages
      if (err.message?.includes('Invalid API key') || err.message?.includes('API key')) {
        setError('Configuration error: Please check your Supabase API key configuration.')
      } else if (err.message?.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please check your credentials.')
      } else if (err.message?.includes('Email not confirmed')) {
        setError('Please check your email and click the confirmation link.')
      } else if (err.message?.includes('User not found')) {
        setError('No account found with this email address. Please sign up first.')
      } else if (err.message?.includes('Too many requests')) {
        setError('Too many login attempts. Please wait a moment and try again.')
      } else {
        setError(err.message || 'Failed to sign in. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
}
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
 main

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