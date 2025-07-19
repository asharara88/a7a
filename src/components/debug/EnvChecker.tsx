import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';
import { Card } from '../ui/Card';

const EnvChecker: React.FC = () => {
  const envVars = [
    {
      name: 'VITE_SUPABASE_URL',
      value: import.meta.env.VITE_SUPABASE_URL,
      required: true,
      description: 'Supabase project URL'
    },
    {
      name: 'VITE_SUPABASE_ANON_KEY',
      value: import.meta.env.VITE_SUPABASE_ANON_KEY,
      required: true,
      description: 'Supabase anonymous key'
    },
    {
      name: 'JWT_SECRET',
      value: import.meta.env.JWT_SECRET,
      required: true,
      description: 'JWT secret for token validation'
    },
    {
      name: 'VITE_OPENAI_API_KEY',
      value: import.meta.env.VITE_OPENAI_API_KEY,
      required: false,
      description: 'OpenAI API key for AI coach'
    },
    {
      name: 'VITE_ELEVENLABS_API_KEY',
      value: import.meta.env.VITE_ELEVENLABS_API_KEY,
      required: false,
      description: 'ElevenLabs API key for voice synthesis'
    },
    {
      name: 'VITE_STRIPE_PUBLISHABLE_KEY',
      value: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
      required: false,
      description: 'Stripe publishable key for payments'
    }
  ];

  const getStatus = (value: string | undefined, required: boolean) => {
    if (!value) {
      return required ? 'error' : 'warning';
    }
    return 'success';
  };

  const getIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const maskValue = (value: string | undefined) => {
    if (!value) return 'Not set';
    if (value.length <= 10) return value;
    return `${value.substring(0, 8)}...${value.substring(value.length - 4)}`;
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Info className="w-6 h-6 text-blue-500 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Environment Variables Status
        </h2>
      </div>

      <div className="space-y-4">
        {envVars.map((envVar) => {
          const status = getStatus(envVar.value, envVar.required);
          
          return (
            <div
              key={envVar.name}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-center">
                {getIcon(status)}
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {envVar.name}
                    {envVar.required && <span className="text-red-500 ml-1">*</span>}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {envVar.description}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                  {maskValue(envVar.value)}
                </p>
                <p className={`text-xs ${
                  status === 'success' ? 'text-green-600' :
                  status === 'error' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {status === 'success' ? 'Configured' :
                   status === 'error' ? 'Missing (Required)' : 'Missing (Optional)'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
          Configuration Instructions
        </h3>
        <div className="text-sm text-blue-800 dark:text-blue-400 space-y-2">
          <p><strong>For Local Development:</strong> Create a <code>.env</code> file in the project root</p>
          <p><strong>For Netlify Deployment:</strong> Add variables in Netlify Dashboard → Site Settings → Environment Variables</p>
          <p><strong>Required Variables:</strong> Must be set for the app to function properly</p>
          <p><strong>Optional Variables:</strong> Enable additional features when configured</p>
        </div>
      </div>
    </Card>
  );
};

export default EnvChecker;