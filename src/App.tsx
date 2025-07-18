import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { SupplementStorePage } from './pages/SupplementStorePage';
import { MyCoachPage } from './pages/MyCoachPage';
import { NutritionPage } from './pages/NutritionPage';
import { FitnessPage } from './pages/FitnessPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { OnboardingPage } from './pages/auth/OnboardingPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { BioclockPage } from './pages/BioclockPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="supplements" element={<SupplementStorePage />} />
            <Route path="coach" element={<MyCoachPage />} />
            <Route path="nutrition" element={<NutritionPage />} />
            <Route path="fitness" element={<FitnessPage />} />
            <Route path="sleep/bioclock" element={<BioclockPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;