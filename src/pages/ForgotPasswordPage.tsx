import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, ArrowLeft, CheckCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '../components/ui/Button';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      setSuccess(true);
    } catch (err: any) {
      console.error('Error sending reset password email:', err);
      setError(err.message || 'Failed to send password reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div>
          <Link to="/login" className="inline-flex items-center text-primary hover:text-primary-dark mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
          
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>
        
        {success ? (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Password reset email sent</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Please check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSuccess(false);
                setEmail('');
              }}
            >
              Send again
            </Button>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-gray-900"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center"
              >
                {isLoading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send reset instructions
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;