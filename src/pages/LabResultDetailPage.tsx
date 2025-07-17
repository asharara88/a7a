import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, Download, Trash2, Loader2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { labResultsApi, LabResult } from '../api/labResultsApi';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import LabResultsTrends from '../components/lab/LabResultsTrends';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LabResultDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [labResult, setLabResult] = useState<LabResult | null>(null);
  const [relatedResults, setRelatedResults] = useState<LabResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    if (!id) return;
    loadLabResult(id);
  }, [id]);
  
  const loadLabResult = async (resultId: string) => {
    setIsLoading(true);
    try {
      const result = await labResultsApi.getLabResult(resultId);
      
      if (!result) {
        throw new Error('Lab result not found');
      }
      
      setLabResult(result);
      
      // Load related results
      const { data: { user } } = await supabase.auth.getUser();
      
      const userId = user?.id || 'demo-user-id';
      
      const allResults = await labResultsApi.getLabResults(userId);
      
      // Filter related results (same category or containing the same metrics)
      const related = allResults.filter(r => 
        r.id !== resultId && (
          r.testCategory === result.testCategory ||
          Object.keys(r.testResults).some(key => result.testResults[key] !== undefined)
        )
      );
      
      setRelatedResults(related);
      
    } catch (err) {
      console.error('Error loading lab result:', err);
      setError('Failed to load lab result. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!labResult) return;
    
    try {
      setIsDeleting(true);
      const success = await labResultsApi.deleteLabResult(labResult.id);
      
      if (success) {
        navigate('/lab-results');
      } else {
        throw new Error('Failed to delete lab result');
      }
    } catch (err) {
      console.error('Error deleting lab result:', err);
      setError('Failed to delete lab result. Please try again.');
      setIsDeleting(false);
    }
  };
  
  const renderMetricsSection = (results: Record<string, any>) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Object.entries(results).map(([key, value]) => {
          if (typeof value === 'object') {
            return (
              <div key={key} className="col-span-2 sm:col-span-3 md:col-span-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize mb-2">
                  {key}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {Object.entries(value).map(([subKey, subValue]) => (
                    <div key={`${key}.${subKey}`} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{subKey}</p>
                      <p className="font-semibold">{subValue}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          
          return (
            <div key={key} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{key}</p>
              <p className="font-semibold">{value}</p>
            </div>
          );
        })}
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
        <div className="mobile-container flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }
  
  if (error || !labResult) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
        <div className="mobile-container">
          <div className="text-center py-12 bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <p className="text-red-700 dark:text-red-300">
              {error || 'Lab result not found'}
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <Button onClick={() => navigate('/lab-results')}>
                Back to Lab Results
              </Button>
              {id && (
                <Button onClick={() => loadLabResult(id)} variant="outline">
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
      <div className="mobile-container">
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/lab-results')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lab Results
          </Button>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {labResult.testName}
              </h1>
              <div className="flex items-center mt-1">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {new Date(labResult.testDate).toLocaleDateString()}
                  </span>
                </div>
                {labResult.testCategory && (
                  <span className="ml-4 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs">
                    {labResult.testCategory}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2">
              {labResult.fileUrl && (
                <Button
                  as="a"
                  href={labResult.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View File
                </Button>
              )}
              <Button 
                variant="outline" 
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Trash2 className="w-4 h-4 mr-2" />
                )}
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Results Card */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Test Results</h2>
          {renderMetricsSection(labResult.testResults)}
          
          {/* Notes */}
          {labResult.notes && (
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</h3>
              <p className="text-gray-600 dark:text-gray-400">{labResult.notes}</p>
            </div>
          )}
        </Card>
        
        {/* Trends */}
        {Object.keys(labResult.testResults).length > 0 && relatedResults.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Trends Over Time</h2>
            <div className="space-y-6">
              {Object.entries(labResult.testResults).map(([metric, value]) => {
                if (typeof value === 'object') {
                  return Object.keys(value).map(subMetric => (
                    <LabResultsTrends
                      key={`${metric}-${subMetric}`}
                      labResults={[...relatedResults, labResult]}
                      metric={metric}
                      subMetric={subMetric}
                      unit={metric === 'cholesterol' ? 'mg/dL' : ''}
                      referenceRange={
                        metric === 'cholesterol' && subMetric === 'total' 
                          ? { min: 125, max: 200 } 
                          : metric === 'cholesterol' && subMetric === 'ldl' 
                          ? { min: 0, max: 100 }
                          : metric === 'cholesterol' && subMetric === 'hdl'
                          ? { min: 40, max: 60 }
                          : undefined
                      }
                    />
                  ));
                }
                
                return (
                  <LabResultsTrends
                    key={metric}
                    labResults={[...relatedResults, labResult]}
                    metric={metric}
                    unit={
                      metric === 'glucose' ? 'mg/dL' :
                      metric === 'vitaminD' ? 'ng/mL' :
                      ''
                    }
                    referenceRange={
                      metric === 'glucose' ? { min: 70, max: 99 } :
                      metric === 'vitaminD' ? { min: 30, max: 100 } :
                      undefined
                    }
                  />
                );
              })}
            </div>
          </div>
        )}
        
        {/* Related Tests */}
        {relatedResults.length > 0 && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Related Test Results</h2>
            <div className="space-y-3">
              {relatedResults.map(result => (
                <div 
                  key={result.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary rounded-lg flex justify-between items-center cursor-pointer hover:shadow-md transition-all duration-200"
                  onClick={() => navigate(`/lab-results/${result.id}`)}
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {result.testName}
                    </h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(result.testDate).toLocaleDateString()}
                      {result.testCategory && (
                        <span className="ml-4 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs">
                          {result.testCategory}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <Button 
                      variant="outline"
                      size="sm"
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LabResultDetailPage;