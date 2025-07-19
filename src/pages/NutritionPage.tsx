import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import NutritionDashboard from '../components/nutrition/NutritionDashboard'
import SpoonacularRecipes from '../components/nutrition/SpoonacularRecipes'
import AIFoodAnalyzer from '../components/nutrition/AIFoodAnalyzer'
import { 
  Apple, 
  Camera, 
  ChefHat, 
  TrendingUp,
  Target,
  Clock,
  Zap
} from 'lucide-react'

const NutritionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analyzer' | 'recipes'>('dashboard')

  const nutritionFeatures = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Macro Tracking",
      description: "Track protein, carbs, and fats with precision",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Personalized Goals",
      description: "AI-optimized nutrition targets for your goals",
      gradient: "from-blue-400 to-blue-500"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Meal Timing",
      description: "Circadian-aligned eating windows",
      gradient: "from-blue-300 to-blue-400"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Energy Optimization",
      description: "Optimize energy levels through nutrition",
      gradient: "from-green-400 to-green-500"
    }
  ]

  const tabs = [
    { id: 'dashboard', label: 'Nutrition Dashboard', icon: <Apple className="w-5 h-5" /> },
    { id: 'analyzer', label: 'AI Food Analyzer', icon: <Camera className="w-5 h-5" /> },
    { id: 'recipes', label: 'Recipe Discovery', icon: <ChefHat className="w-5 h-5" /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                Nutrition
              </h1>
              <p className="text-gray-600 mt-1">
                Optimize your nutrition with AI-powered insights
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nutritionFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="p-6 text-center group hover:scale-105 transition-all duration-300">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                className={`flex-1 justify-start gap-3 h-12 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
                onClick={() => setActiveTab(tab.id as any)}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'dashboard' && <NutritionDashboard />}
          {activeTab === 'analyzer' && <AIFoodAnalyzer />}
          {activeTab === 'recipes' && <SpoonacularRecipes />}
        </motion.div>
      </div>
    </div>
  )
}

export default NutritionPage