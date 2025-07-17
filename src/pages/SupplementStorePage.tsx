import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { CheckCircle, AlertCircle, Info, Loader2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TIER_COLORS = {
  green: "bg-green-100 text-green-700 border-green-500 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
  yellow: "bg-yellow-100 text-yellow-700 border-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
  orange: "bg-orange-100 text-orange-700 border-orange-500 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700",
};

const TIER_LABELS = {
  green: "Green (Strong evidence)",
  yellow: "Yellow (Moderate evidence)",
  orange: "Orange (Preliminary evidence)",
};

const TIER_ICONS = {
  green: <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />,
  yellow: <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />,
  orange: <Info className="w-4 h-4 text-orange-600 dark:text-orange-400" />,
};

function formatAED(price) {
  return `${parseFloat(price).toFixed(2)} AED`;
}

export default function SupplementStorePage() {
  const [supplements, setSupplements] = useState([]);
  const [tierFilter, setTierFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null);

  useEffect(() => {
    async function fetchSupplements() {
      setLoading(true);
      try {
        let query = supabase.from('supplements').select('*');
        // Add sorting by tier (green first, then yellow, then orange)
        query = query.order('tier', { ascending: true });
        
        let { data, error: fetchError } = await query;
        
        if (fetchError) {
          throw fetchError;
        }
        
        if (data) {
          setSupplements(data);
        } else {
          // Fallback to mock data if no data returned
          setSupplements(getMockSupplements());
        }
      } catch (err) {
        console.error("Error fetching supplements:", err);
        setError("Failed to load supplements. Please try again.");
        // Fallback to mock data
        setSupplements(getMockSupplements());
      } finally {
        setLoading(false);
      }
    }
    
    fetchSupplements();
  }, []);

  const handleAddToCart = (suppId) => {
    setAddingToCart(suppId);
    // Simulate adding to cart
    setTimeout(() => {
      setAddingToCart(null);
    }, 1000);
  };

  const handleAddToStack = (suppId) => {
    // TODO: Implement stack builder modal/functionality
    alert(`Added ${suppId} to stack builder. This functionality will be implemented soon.`);
  };

  const filteredSupps = tierFilter === "all"
    ? supplements
    : supplements.filter((s) => s.tier === tierFilter);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="mobile-container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Supplement Store</h1>
          <p className="text-gray-600 dark:text-gray-400">Browse our evidence-based supplements</p>
        </div>

        <Card className="p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Filter by Evidence Tier</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Supplements are categorized by the strength of scientific evidence supporting their efficacy
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={tierFilter === "all" ? "default" : "outline"}
                onClick={() => setTierFilter("all")}
                className="px-4 py-2"
              >
                All Tiers
              </Button>
              
              <Button
                variant={tierFilter === "green" ? "default" : "outline"}
                onClick={() => setTierFilter("green")}
                className={`px-4 py-2 flex items-center gap-2 ${tierFilter === "green" ? "bg-green-600 hover:bg-green-700" : ""}`}
              >
                {TIER_ICONS.green} Green Tier
              </Button>
              
              <Button
                variant={tierFilter === "yellow" ? "default" : "outline"}
                onClick={() => setTierFilter("yellow")}
                className={`px-4 py-2 flex items-center gap-2 ${tierFilter === "yellow" ? "bg-yellow-600 hover:bg-yellow-700" : ""}`}
              >
                {TIER_ICONS.yellow} Yellow Tier
              </Button>
              
              <Button
                variant={tierFilter === "orange" ? "default" : "outline"}
                onClick={() => setTierFilter("orange")}
                className={`px-4 py-2 flex items-center gap-2 ${tierFilter === "orange" ? "bg-orange-600 hover:bg-orange-700" : ""}`}
              >
                {TIER_ICONS.orange} Orange Tier
              </Button>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                {TIER_ICONS.green}
                <span className="font-medium text-gray-800 dark:text-gray-200">Strong Evidence:</span>
                <span className="text-gray-600 dark:text-gray-400">Multiple high-quality clinical trials</span>
              </div>
              
              <div className="flex items-center gap-1">
                {TIER_ICONS.yellow}
                <span className="font-medium text-gray-800 dark:text-gray-200">Moderate Evidence:</span>
                <span className="text-gray-600 dark:text-gray-400">Some supporting studies</span>
              </div>
              
              <div className="flex items-center gap-1">
                {TIER_ICONS.orange}
                <span className="font-medium text-gray-800 dark:text-gray-200">Preliminary Evidence:</span>
                <span className="text-gray-600 dark:text-gray-400">Early-stage research</span>
              </div>
            </div>
          </div>
        </Card>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <span className="ml-3 text-lg text-gray-600 dark:text-gray-400">Loading supplements...</span>
          </div>
        ) : error ? (
          <Card className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSupps.map((supp) => {
              // Calculate discount price if available
              const discount = supp.subscription_discount_percent || 0;
              const price = parseFloat(supp.price_aed || 0);
              const discounted = discount > 0 ? price * (1 - discount / 100) : price;

              return (
                <Card key={supp.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {supp.image_url ? (
                      <img 
                        src={supp.image_url} 
                        alt={supp.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 dark:text-gray-600">No image</div>
                    )}
                    
                    <div className="absolute top-2 left-2">
                      <div 
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-lg border font-semibold ${TIER_COLORS[supp.tier]}`} 
                        title={TIER_LABELS[supp.tier]}
                      >
                        {TIER_ICONS[supp.tier]} {supp.tier.charAt(0).toUpperCase() + supp.tier.slice(1)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{supp.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{supp.brand || 'Biowell'}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-1">
                      {supp.use_case || supp.description?.substring(0, 100) || 'General health support'}
                    </p>
                    
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="font-bold text-lg text-primary dark:text-primary-light">
                        {formatAED(discounted)}
                      </span>
                      {discount > 0 && (
                        <span className="line-through text-gray-400 text-xs">
                          {formatAED(price)}
                        </span>
                      )}
                      {discount > 0 && (
                        <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded px-2 py-0.5 text-xs font-semibold">
                          {discount}% off
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleAddToStack(supp.id)}
                      >
                        Add to Stack
                      </Button>
                      
                      <Button
                        className="flex-1"
                        onClick={() => handleAddToCart(supp.id)}
                        disabled={addingToCart === supp.id}
                      >
                        {addingToCart === supp.id ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Added!
                          </>
                        ) : (
                          "Buy Now"
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
            
            {filteredSupps.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 mb-4">No supplements found in this tier.</p>
                <Button onClick={() => setTierFilter("all")}>
                  View All Supplements
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Mock data function for development and fallback
function getMockSupplements() {
  return [
    {
      id: '1',
      name: 'Creatine Monohydrate',
      brand: 'Biowell',
      description: 'Increases intramuscular phosphocreatine for rapid ATP regeneration, enhancing strength and power output during high-intensity exercise.',
      tier: 'green',
      use_case: 'Muscle strength & power',
      price_aed: 85.00,
      subscription_discount_percent: 15,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '2',
      name: 'Vitamin D3',
      brand: 'Biowell',
      description: 'Essential fat-soluble vitamin that supports immune function, bone health, and mood regulation.',
      tier: 'green',
      use_case: 'Immune & bone health',
      price_aed: 40.00,
      subscription_discount_percent: 10,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '3',
      name: 'Ashwagandha KSM-66',
      brand: 'Biowell',
      description: 'Adaptogenic herb that helps the body manage stress and supports overall wellbeing.',
      tier: 'yellow',
      use_case: 'Stress & anxiety',
      price_aed: 95.00,
      subscription_discount_percent: 12,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '4',
      name: 'Magnesium Glycinate',
      brand: 'Biowell',
      description: 'Highly bioavailable form of magnesium that supports sleep, muscle recovery, and nervous system function.',
      tier: 'green',
      use_case: 'Sleep & recovery',
      price_aed: 75.00,
      subscription_discount_percent: 10,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '5',
      name: 'Tongkat Ali',
      brand: 'Biowell',
      description: 'Traditional herb used to support male hormonal health and vitality.',
      tier: 'orange',
      use_case: 'Hormonal support',
      price_aed: 135.00,
      subscription_discount_percent: 15,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '6',
      name: 'Berberine',
      brand: 'Biowell',
      description: 'Plant compound that supports metabolic health and glucose metabolism.',
      tier: 'yellow',
      use_case: 'Metabolic health',
      price_aed: 110.00,
      subscription_discount_percent: 12,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '7',
      name: 'Rhodiola Rosea',
      brand: 'Biowell',
      description: 'Adaptogenic herb that helps combat fatigue and supports cognitive function during stress.',
      tier: 'yellow',
      use_case: 'Energy & focus',
      price_aed: 95.00,
      subscription_discount_percent: 10,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '8',
      name: 'Beta-Alanine',
      brand: 'Biowell',
      description: 'Non-essential amino acid that helps buffer lactic acid in muscles, potentially improving endurance.',
      tier: 'yellow',
      use_case: 'Endurance',
      price_aed: 95.00,
      subscription_discount_percent: 10,
      image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
    }
  ];
}