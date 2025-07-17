import React, { useState, useEffect } from 'react';
import { Plus, Upload, FileText, Filter, Trash2, Calendar, Search, Loader2, Download } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { labResultsApi, LabResult } from '../api/labResultsApi';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LabResultsPage: React.FC = () => {
  const [labResults, setLabResults] = useState<LabResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form state for uploading
  const [uploadForm, setUploadForm] = useState({
    testName: '',
    testDate: new Date().toISOString().split('T')[0],
    testCategory: '',
    notes: '',
    file: null as File | null
  });
  
  // Parse test results state
  const [parsedResults, setParsedResults] = useState<Record<string, any>>({});
  const [isParsingFile, setIsParsingFile] = useState(false);
  
  useEffect(() => {
    loadLabResults();
  }, []);
  
  const loadLabResults = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const userId = user?.id || 'demo-user-id';
      
      const results = await labResultsApi.getLabResults(userId);
      setLabResults(results);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(results
        .map(result => result.testCategory)
        .filter(Boolean) as string[])];
      
      setCategories(uniqueCategories);
      
    } catch (err) {
      console.error('Error loading lab results:', err);
      setError('Failed to load lab results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadForm(prev => ({ ...prev, file }));
      
      // Attempt to parse file if it's a PDF or text file
      if (file.type === 'application/pdf' || file.type.startsWith('text/')) {
        parseLabResultFile(file);
      }
    }
  };
  
  const parseLabResultFile = async (file: File) => {
    setIsParsingFile(true);
    try {
      // In a real app, this would send the file to a server for processing
      // For demo purposes, we'll simulate a simple parsing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulated parsed data
      const simulatedResults = {
        cholesterol: {
          total: Math.floor(Math.random() * (250 - 150) + 150),
          hdl: Math.floor(Math.random() * (80 - 40) + 40),
          ldl: Math.floor(Math.random() * (170 - 80) + 80),
          ratio: (Math.random() * (5 - 2) + 2).toFixed(1)
        },
        glucose: Math.floor(Math.random() * (120 - 70) + 70),
        vitaminD: Math.floor(Math.random() * (70 - 20) + 20)
      };
      
      setParsedResults(simulatedResults);
      
      // Set test category based on file name
      const fileName = file.name.toLowerCase();
      if (fileName.includes('blood') || fileName.includes('metabolic')) {
        setUploadForm(prev => ({ ...prev, testCategory: 'Blood Panel' }));
      } else if (fileName.includes('hormone')) {
        setUploadForm(prev => ({ ...prev, testCategory: 'Hormone Panel' }));
      } else if (fileName.includes('vitamin') || fileName.includes('nutrient')) {
        setUploadForm(prev => ({ ...prev, testCategory: 'Nutrient Panel' }));
      }
      
    } catch (err) {
      console.error('Error parsing file:', err);
    } finally {
      setIsParsingFile(false);
    }
  };
  
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsUploading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || 'demo-user-id';
      
      const result = await labResultsApi.uploadLabResult(
        userId,
        {
          testName: uploadForm.testName,
          testDate: uploadForm.testDate,
          testCategory: uploadForm.testCategory,
          testResults: parsedResults,
          notes: uploadForm.notes
        },
        uploadForm.file || undefined
      );
      
      if (result) {
        // Refresh lab results
        await loadLabResults();
        // Reset form and close modal
        setUploadForm({
          testName: '',
          testDate: new Date().toISOString().split('T')[0],
          testCategory: '',
          notes: '',
          file: null
        });
        setParsedResults({});
        setShowUploadModal(false);
      } else {
        throw new Error('Failed to upload lab result');
      }
      
    } catch (err) {
      console.error('Error uploading lab result:', err);
      setError('Failed to upload lab result. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleDeleteResult = async (id: string) => {
    try {
      const success = await labResultsApi.deleteLabResult(id);
      
      if (success) {
        // Remove from local state
        setLabResults(prev => prev.filter(result => result.id !== id));
      } else {
        throw new Error('Failed to delete lab result');
      }
    } catch (err) {
      console.error('Error deleting lab result:', err);
      setError('Failed to delete lab result. Please try again.');
    }
  };
  
  // Filter results
  const filteredResults = labResults.filter(result => {
    const matchesCategory = selectedCategory ? result.testCategory === selectedCategory : true;
    const matchesSearch = searchQuery 
      ? (result.testName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
         result.notes?.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
      <div className="mobile-container">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Lab Results</h1>
            <p className="text-gray-600 dark:text-gray-400">Upload and track your lab test results</p>
          </div>
          <Button onClick={() => setShowUploadModal(true)} className="flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Upload Results
          </Button>
        </div>
        
        {/* Filters and search */}
        <Card className="p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search lab results..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Category</label>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    selectedCategory === null
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
        
        {/* Lab Results List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <p className="text-red-700 dark:text-red-300">{error}</p>
            <Button onClick={loadLabResults} className="mt-4">
              Try Again
            </Button>
          </div>
        ) : filteredResults.length === 0 ? (
          <Card className="p-6 text-center py-12">
            <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              No lab results found
            </p>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
              {searchQuery || selectedCategory
                ? "No results match your current filters. Try changing your search criteria."
                : "Upload your lab test results to track your health metrics over time."}
            </p>
            <Button onClick={() => setShowUploadModal(true)}>
              Upload Your First Lab Result
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredResults.map((result) => (
              <Link key={result.id} to={`/lab-results/${result.id}`}>
                <Card className="p-5 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {result.testName}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(result.testDate).toLocaleDateString()}
                        {result.testCategory && (
                          <span className="ml-4 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs">
                            {result.testCategory}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {result.fileUrl && (
                        <Button
                          as="a" 
                          href={result.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          variant="outline"
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Test Results Summary */}
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Object.entries(result.testResults).slice(0, 4).map(([key, value]) => {
                      // Handle nested values like cholesterol
                      if (typeof value === 'object') {
                        return Object.entries(value).slice(0, 1).map(([subKey, subValue]) => (
                          <div key={`${key}.${subKey}`} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                              {key} - {subKey}
                            </p>
                            <p className="font-semibold">{subValue}</p>
                          </div>
                        ));
                      }
                      
                      return (
                        <div key={key} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{key}</p>
                          <p className="font-semibold">{value}</p>
                        </div>
                      );
                    })}
                    {Object.keys(result.testResults).length > 4 && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium">+ {Object.keys(result.testResults).length - 4} more</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Notes Preview */}
                  {result.notes && (
                    <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{result.notes}</p>
                    </div>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}
        
        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleUploadSubmit} className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upload Lab Results</h2>
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Test Name *</label>
                    <input
                      type="text"
                      required
                      value={uploadForm.testName}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, testName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                      placeholder="e.g., Complete Blood Count, Hormone Panel"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Test Date *</label>
                    <input
                      type="date"
                      required
                      value={uploadForm.testDate}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, testDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={uploadForm.testCategory}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, testCategory: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                    >
                      <option value="">Select a category</option>
                      <option value="Blood Panel">Blood Panel</option>
                      <option value="Hormone Panel">Hormone Panel</option>
                      <option value="Nutrient Panel">Nutrient Panel</option>
                      <option value="Metabolic Panel">Metabolic Panel</option>
                      <option value="Lipid Panel">Lipid Panel</option>
                      <option value="Thyroid Panel">Thyroid Panel</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload File</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept=".pdf,.jpg,.jpeg,.png,.txt,.csv"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PDF, JPG, PNG, TXT or CSV up to 10MB
                        </p>
                      </div>
                    </div>
                    {uploadForm.file && (
                      <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                        File selected: {uploadForm.file.name}
                      </p>
                    )}
                    {isParsingFile && (
                      <p className="mt-2 text-sm text-blue-600 dark:text-blue-400 animate-pulse">
                        Analyzing file content...
                      </p>
                    )}
                  </div>
                  
                  {/* Parsed Results */}
                  {Object.keys(parsedResults).length > 0 && (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Detected Test Results
                      </label>
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {Object.entries(parsedResults).map(([key, value]) => {
                            if (typeof value === 'object') {
                              return Object.entries(value).map(([subKey, subValue]) => (
                                <div key={`${key}.${subKey}`} className="p-2 border border-gray-200 dark:border-gray-700 rounded">
                                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{key} - {subKey}</p>
                                  <p className="font-semibold">{subValue}</p>
                                </div>
                              ));
                            }
                            
                            return (
                              <div key={key} className="p-2 border border-gray-200 dark:border-gray-700 rounded">
                                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{key}</p>
                                <p className="font-semibold">{value}</p>
                              </div>
                            );
                          })}
                        </div>
                        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                          * These values were automatically extracted and may need verification
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Notes</label>
                    <textarea
                      value={uploadForm.notes}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                      placeholder="Add any relevant notes about these test results..."
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowUploadModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isUploading || !uploadForm.testName || !uploadForm.testDate}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      'Upload Results'
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabResultsPage;