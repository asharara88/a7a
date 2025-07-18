import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, Grid, List, Star, Award, Package } from 'lucide-react';
import { supplementApi, Supplement } from '../../api/supplementApi';
import SupplementCard from './SupplementCard';
import StackBuilderModal from './StackBuilderModal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

interface SupplementGridProps {
  initialFilters?: {
    category?: string;
    tier?: string;
    featured?: boolean;
    bestseller?: boolean;
  };
  showFilters?: boolean;
  maxItems?: number;
  title?: string;
}

const SupplementGrid: React.FC<SupplementGridProps> = ({
  initialFilters = {},
  showFilters = true,
  maxItems,
  title = "All Supplements"
}) => {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [filteredSupplements, setFilteredSupplements] = useState<Supplement[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || 'all');
  const [selectedTier, setSelectedTier] = useState(initialFilters.tier || 'all');
  const [showFeatured, setShowFeatured] = useState(initialFilters.featured || false);
  const [showBestsellers, setShowBestsellers] = useState(initialFilters.bestseller || false);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'tier'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  
  // Cart and stack states
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [showStackBuilder, setShowStackBuilder] = useState(false);
  const [selectedSupplementId, setSelectedSupplementId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [supplements, searchQuery, selectedCategory, selectedTier, showFeatured, showBestsellers, sortBy]);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [supplementsData, categoriesData] = await Promise.all([
        supplementApi.getSupplements(),
        supplementApi.getCategories()
      ]);
      
      setSupplements(supplementsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load supplements. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...supplements];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(supplement =>
        supplement.name.toLowerCase().includes(query) ||
        supplement.description?.toLowerCase().includes(query) ||
        supplement.use_case?.toLowerCase().includes(query) ||
        supplement.category?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(supplement => supplement.category === selectedCategory);
    }

    // Tier filter
    if (selectedTier !== 'all') {
      filtered = filtered.filter(supplement => supplement.tier === selectedTier);
    }

    // Featured filter
    if (showFeatured) {
      filtered = filtered.filter(supplement => supplement.is_featured);
    }

    // Bestseller filter
    if (showBestsellers) {
      filtered = filtered.filter(supplement => supplement.is_bestseller);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return (a.price_aed || 0) - (b.price_aed || 0);
        case 'tier':
          const tierOrder = { green: 1, yellow: 2, orange: 3, red: 4 };
          return (tierOrder[a.tier as keyof typeof tierOrder] || 4) - (tierOrder[b.tier as keyof typeof tierOrder] || 4);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    // Apply max items limit
    if (maxItems) {
      filtered = filtered.slice(0, maxItems);
    }

    setFilteredSupplements(filtered);
  };

  const handleAddToCart = async (supplementId: string) => {
    setAddingToCart(supplementId);
    try {
      const success = await supplementApi.addToCart(supplementId, 1);
      if (success) {
        // Could show a toast notification here
        setTimeout(() => setAddingToCart(null), 1000);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setAddingToCart(null);
    }
  };

  const handleAddToStack = (supplementId: string) => {
    setSelectedSupplementId(supplementId);
    setShowStackBuilder(true);
  };

  const handleSaveStack = async (stackData: any) => {
    try {
      await supplementApi.createSupplementStack(stackData);
      setShowStackBuilder(false);
      setSelectedSupplementId(null);
    } catch (error) {
      console.error('Error saving stack:', error);
      throw error;
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTier('all');
    setShowFeatured(false);
    setShowBestsellers(false);
    setSortBy('name');
  };

  const activeFiltersCount = [
    searchQuery,
    selectedCategory !== 'all',
    selectedTier !== 'all',
    showFeatured,
    showBestsellers
  ].filter(Boolean).length;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={loadData}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredSupplements.length} supplement{filteredSupplements.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          
          {/* Filters Toggle */}
          {showFilters && (
            <Button
              variant="outline"
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className="relative"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <AnimatePresence>
          {showFiltersPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search supplements..."
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Tier */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Evidence Tier</label>
                    <select
                      value={selectedTier}
                      onChange={(e) => setSelectedTier(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="all">All Tiers</option>
                      <option value="green">Green Tier</option>
                      <option value="yellow">Yellow Tier</option>
                      <option value="orange">Orange Tier</option>
                    </select>
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'tier')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="name">Name</option>
                      <option value="price">Price</option>
                      <option value="tier">Evidence Tier</option>
                    </select>
                  </div>
                </div>

                {/* Special Filters */}
                <div className="mt-4 flex flex-wrap gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showFeatured}
                      onChange={(e) => setShowFeatured(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Star className="w-4 h-4 ml-2 mr-1 text-blue-500" />
                    <span className="text-sm">Featured Only</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showBestsellers}
                      onChange={(e) => setShowBestsellers(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Award className="w-4 h-4 ml-2 mr-1 text-purple-500" />
                    <span className="text-sm">Bestsellers Only</span>
                  </label>
                </div>

                {/* Clear Filters */}
                {activeFiltersCount > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="outline" onClick={clearFilters} size="sm">
                      Clear All Filters ({activeFiltersCount})
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Results */}
      {filteredSupplements.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No supplements found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your filters or search terms
          </p>
          {activeFiltersCount > 0 && (
            <Button onClick={clearFilters}>Clear Filters</Button>
          )}
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }>
          <AnimatePresence>
            {filteredSupplements.map((supplement, index) => (
              <motion.div
                key={supplement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <SupplementCard
                  supplement={supplement}
                  onAddToCart={handleAddToCart}
                  onAddToStack={handleAddToStack}
                  isAddingToCart={addingToCart === supplement.id}
                  showFullDescription={viewMode === 'list'}
                  className={viewMode === 'list' ? 'flex flex-row' : ''}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Stack Builder Modal */}
      <StackBuilderModal
        isOpen={showStackBuilder}
        onClose={() => {
          setShowStackBuilder(false);
          setSelectedSupplementId(null);
        }}
        initialSupplementId={selectedSupplementId || undefined}
        onSaveStack={handleSaveStack}
      />
    </div>
  );
};

export default SupplementGrid;