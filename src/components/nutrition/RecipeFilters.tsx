import React, { useState } from 'react';
import { Filter, X, Search, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/card';
import { Input } from '../ui/Input';
import { RecipeSearchParams } from '../../api/recipeApi';
import { cn } from '../../utils/cn';

interface RecipeFiltersProps {
  initialFilters: RecipeSearchParams;
  onApplyFilters: (filters: RecipeSearchParams) => void;
}

const RecipeFilters: React.FC<RecipeFiltersProps> = ({ initialFilters, onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<RecipeSearchParams>(initialFilters);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleChange = (key: keyof RecipeSearchParams, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    // Track which filters are active for the badge
    if (value && !activeFilters.includes(key)) {
      setActiveFilters(prev => [...prev, key]);
    } else if (!value && activeFilters.includes(key)) {
      setActiveFilters(prev => prev.filter(filter => filter !== key));
    }
  };

  const handleApply = () => {
    onApplyFilters(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetFilters: RecipeSearchParams = {
      diet: '',
      intolerances: '',
      excludeIngredients: '',
      includeIngredients: '',
      maxReadyTime: 60,
      maxCalories: 800
    };
    setFilters(resetFilters);
    setActiveFilters([]);
    onApplyFilters(resetFilters);
    setIsOpen(false);
  };

  const dietOptions = [
    { value: '', label: 'Any' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'ketogenic', label: 'Keto' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'pescetarian', label: 'Pescatarian' },
    { value: 'mediterranean', label: 'Mediterranean' }
  ];

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant={activeFilters.length > 0 ? "default" : "outline"}
        className="flex items-center relative"
        aria-label="Filter recipes"
      >
        <Filter className={`w-4 h-4 ${activeFilters.length > 0 ? 'mr-1.5' : 'mr-2'}`} />
        Filters
        {activeFilters.length > 0 && (
          <span className="ml-1.5 bg-white text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeFilters.length}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-lg font-semibold mb-4">Recipe Filters</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Diet</label>
                <select
                  value={filters.diet || ''}
                  onChange={(e) => handleChange('diet', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {dietOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Intolerances/Allergies</label>
                <Input
                  type="text"
                  placeholder="e.g., dairy, gluten"
                  value={filters.intolerances || ''}
                  onChange={(e) => handleChange('intolerances', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Separate multiple values with commas</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Max Ready Time (min)</label>
                <Input
                  type="number"
                  min={10}
                  max={120}
                  value={filters.maxReadyTime || 60}
                  onChange={(e) => handleChange('maxReadyTime', parseInt(e.target.value))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Max Calories</label>
                <Input
                  type="number"
                  min={100}
                  max={1500}
                  value={filters.maxCalories || 800}
                  onChange={(e) => handleChange('maxCalories', parseInt(e.target.value))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Must Include</label>
                <Input
                  type="text"
                  placeholder="e.g., chicken, broccoli"
                  value={filters.includeIngredients || ''}
                  onChange={(e) => handleChange('includeIngredients', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Separate multiple values with commas</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Must Exclude</label>
                <Input
                  type="text"
                  placeholder="e.g., peanuts, shellfish"
                  value={filters.excludeIngredients || ''}
                  onChange={(e) => handleChange('excludeIngredients', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Separate multiple values with commas</p>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
              <Button onClick={handleApply}>
                <Check className="w-4 h-4 mr-1.5" />
                Apply Filters
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Active filters indicator */}
      {activeFilters.length > 0 && !isOpen && (
        <div className="mt-2 flex flex-wrap gap-2">
          {filters.diet && (
            <div className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 px-2 py-1 rounded-full">
              Diet: {filters.diet}
            </div>
          )}
          {filters.intolerances && (
            <div className="text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 px-2 py-1 rounded-full">
              Avoiding: {filters.intolerances}
            </div>
          )}
          {filters.maxReadyTime && filters.maxReadyTime < 60 && (
            <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 px-2 py-1 rounded-full">
              Quick: ≤{filters.maxReadyTime} min
            </div>
          )}
          {filters.maxCalories && (
            <div className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300 px-2 py-1 rounded-full">
              ≤{filters.maxCalories} cal
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeFilters;