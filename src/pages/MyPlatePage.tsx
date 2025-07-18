import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, Utensils, Clock, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';

const MyPlatePage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysis(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // Trigger camera input
    cameraInputRef.current?.click();
  };

  const handleFileUpload = () => {
    // Trigger file input
    fileInputRef.current?.click();
  };

  const analyzeFood = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Simulate AI analysis for demo purposes
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis result
      const mockAnalysis = {
        meal: "Grilled chicken breast with steamed broccoli and brown rice",
        calories: 420,
        macros: {
          protein: 35,
          carbs: 45,
          fat: 8
        },
        healthScore: 85,
        recommendations: [
          "Great protein choice! The chicken provides high-quality complete protein.",
          "Excellent vegetable portion with broccoli providing fiber and vitamins.",
          "Consider adding a healthy fat source like avocado or olive oil.",
          "This meal fits well within a balanced diet for weight management."
        ],
        nutrients: {
          fiber: 6,
          sodium: 320,
          sugar: 3,
          iron: 2.1
        }
      };

      setAnalysis(mockAnalysis);
    } catch (err) {
      console.error('Error analyzing food:', err);
      setError('Failed to analyze the image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 transition-all duration-200">
      <div className="mobile-container">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">MyPlate™</h1>
          <p className="text-gray-600 dark:text-gray-400">AI-powered food analysis from photos</p>
        </div>

        {/* Camera/Upload Section */}
        <Card className="p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 mr-4">
              <Camera className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Capture Your Meal</h2>
              <p className="text-gray-600 dark:text-gray-400">Take a photo or upload an image to analyze your food</p>
            </div>
          </div>

          {!selectedImage ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 text-center">
              <div className="space-y-6">
                <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No image selected
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Capture or upload a photo of your meal to get started
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleCameraCapture}
                    className="flex items-center justify-center"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleFileUpload}
                    className="flex items-center justify-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected meal"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setAnalysis(null);
                    setError(null);
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="flex gap-4">
                <Button
                  onClick={analyzeFood}
                  disabled={isAnalyzing}
                  className="flex-1"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Analyze Food
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedImage(null);
                    setAnalysis(null);
                    setError(null);
                  }}
                >
                  Try Another
                </Button>
              </div>
            </div>
          )}

          {/* Hidden file inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageSelect}
            className="hidden"
          />
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="p-4 mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700 dark:text-red-300">{error}</span>
            </div>
          </Card>
        )}

        {/* Analysis Results */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Nutrition Overview */}
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3">
                  <Utensils className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Nutritional Analysis</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Calories</p>
                  <p className="text-2xl font-bold text-primary">{analysis.calories}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Protein</p>
                  <p className="text-2xl font-bold text-blue-500">{analysis.macros.protein}g</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Carbs</p>
                  <p className="text-2xl font-bold text-green-500">{analysis.macros.carbs}g</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fat</p>
                  <p className="text-2xl font-bold text-orange-500">{analysis.macros.fat}g</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Identified Meal</p>
                  <p className="font-medium text-gray-900 dark:text-white">{analysis.meal}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Health Score</p>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-green-500">{analysis.healthScore}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">/100</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 mr-3">
                  <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI Recommendations</h3>
              </div>
              
              <div className="space-y-3">
                {analysis.recommendations.map((rec: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-green-800 dark:text-green-300 text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button className="flex-1">
                <Utensils className="w-4 h-4 mr-2" />
                Save to Food Log
              </Button>
              <Button variant="outline" className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                Share Analysis
              </Button>
            </div>
          </motion.div>
        )}

        {/* Demo Notice */}
        <Card className="p-4 mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start">
            <Camera className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-1">
                Demo Mode
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-400">
                This is a demonstration of MyPlate's AI food analysis capabilities. 
                Camera access is simulated for demo purposes. In the full version, 
                you'll be able to capture photos directly with your device's camera 
                and get real-time nutritional analysis.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyPlatePage;