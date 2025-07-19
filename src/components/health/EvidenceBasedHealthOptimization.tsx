import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, BookOpen, Brain, Heart, Activity, Moon, Utensils, ArrowRight, Shield, Award, Target, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface EvidenceBasedHealthOptimizationProps {
  expanded?: boolean;
}

const EvidenceBasedHealthOptimization: React.FC<EvidenceBasedHealthOptimizationProps> = ({ 
  expanded = false 
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(expanded);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const evidenceCategories = [
    {
      id: 'supplements',
      title: 'Evidence-Based Supplements',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-primary-600 to-primary-500',
      description: 'Scientifically validated supplements with clinical research backing',
      content: {
        overview: 'Our supplement recommendations are categorized by evidence strength, ensuring you get the most scientifically supported options.',
        tiers: [
          {
            name: 'Green Tier',
            description: 'Strong evidence from multiple high-quality human clinical trials',
            examples: ['Creatine Monohydrate', 'Vitamin D3', 'Omega-3 Fish Oil', 'Magnesium'],
            icon: <CheckCircle className="w-5 h-5 text-green-500" />
          },
          {
            name: 'Yellow Tier',
            description: 'Moderate evidence with some supporting studies',
            examples: ['Ashwagandha', 'Rhodiola Rosea', 'L-Theanine', 'Bacopa Monnieri'],
            icon: <CheckCircle className="w-5 h-5 text-yellow-500" />
          },
          {
            name: 'Orange Tier',
            description: 'Limited evidence, mostly preliminary or animal studies',
            examples: ['Tongkat Ali', 'Shilajit', 'Pine Bark Extract'],
            icon: <CheckCircle className="w-5 h-5 text-orange-500" />
          }
        ],
        actionItems: [
          'Start with Green Tier supplements for maximum benefit',
          'Consider Yellow Tier for specific health goals',
          'Use Orange Tier supplements with caution and professional guidance'
        ]
      }
    },
    {
      id: 'nutrition',
      title: 'Nutrition Science',
      icon: <Utensils className="w-6 h-6" />,
      color: 'from-secondary-600 to-secondary-500',
      description: 'Evidence-based nutrition principles for optimal health',
      content: {
        overview: 'Our nutrition recommendations are based on peer-reviewed research and established dietary guidelines.',
        principles: [
          {
            name: 'Protein Optimization',
            description: 'Research shows 1.6-2.2g per kg body weight for active individuals',
            evidence: 'Meta-analysis of 49 studies (Helms et al., 2014)',
            icon: <Zap className="w-5 h-5 text-blue-500" />
          },
          {
            name: 'Meal Timing',
            description: 'Circadian-aligned eating improves metabolic health',
            evidence: 'Chronobiology research (Scheer et al., 2009)',
            icon: <Moon className="w-5 h-5 text-purple-500" />
          },
          {
            name: 'Micronutrient Density',
            description: 'Whole foods provide superior nutrient absorption',
            evidence: 'Nutrient bioavailability studies (Heaney, 2001)',
            icon: <Heart className="w-5 h-5 text-red-500" />
          }
        ],
        actionItems: [
          'Prioritize whole, minimally processed foods',
          'Time carbohydrates around physical activity',
          'Include variety to ensure micronutrient adequacy'
        ]
      }
    },
    {
      id: 'sleep',
      title: 'Sleep Optimization',
      icon: <Moon className="w-6 h-6" />,
      color: 'from-tertiary-600 to-tertiary-500',
      description: 'Science-backed strategies for better sleep quality and recovery',
      content: {
        overview: 'Sleep research consistently shows the critical importance of both duration and quality for health outcomes.',
        factors: [
          {
            name: 'Sleep Duration',
            description: '7-9 hours for adults, with individual variation',
            evidence: 'National Sleep Foundation guidelines (Hirshkowitz et al., 2015)',
            icon: <Target className="w-5 h-5 text-indigo-500" />
          },
          {
            name: 'Sleep Consistency',
            description: 'Regular sleep-wake times improve circadian rhythm',
            evidence: 'Circadian biology research (Roenneberg & Merrow, 2016)',
            icon: <Activity className="w-5 h-5 text-green-500" />
          },
          {
            name: 'Sleep Environment',
            description: 'Cool, dark, quiet environment optimizes sleep quality',
            evidence: 'Sleep hygiene studies (Irish et al., 2015)',
            icon: <Shield className="w-5 h-5 text-blue-500" />
          }
        ],
        actionItems: [
          'Maintain consistent sleep and wake times',
          'Create an optimal sleep environment (cool, dark, quiet)',
          'Limit blue light exposure 2 hours before bedtime'
        ]
      }
    },
    {
      id: 'fitness',
      title: 'Exercise Science',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-accent-600 to-accent-500',
      description: 'Research-backed fitness protocols for optimal health outcomes',
      content: {
        overview: 'Exercise science provides clear guidelines for different health and performance goals.',
        protocols: [
          {
            name: 'Strength Training',
            description: '2-3 sessions per week, progressive overload principle',
            evidence: 'Resistance training guidelines (ACSM, 2009)',
            icon: <Zap className="w-5 h-5 text-orange-500" />
          },
          {
            name: 'Cardiovascular Exercise',
            description: '150 minutes moderate or 75 minutes vigorous per week',
            evidence: 'WHO Physical Activity Guidelines (2020)',
            icon: <Heart className="w-5 h-5 text-red-500" />
          },
          {
            name: 'Recovery Protocols',
            description: 'Active recovery and adequate rest between sessions',
            evidence: 'Recovery research (Kellmann et al., 2018)',
            icon: <Moon className="w-5 h-5 text-purple-500" />
          }
        ],
        actionItems: [
          'Include both resistance and cardiovascular training',
          'Progressive overload for continued adaptation',
          'Prioritize recovery and sleep for optimal results'
        ]
      }
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-all duration-300">
      <div className="mobile-container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4 inline mr-2" />
              Evidence-Based Approach
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
              Science-Driven Health Optimization
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Every recommendation in Biowell is backed by peer-reviewed research and clinical evidence. 
              Learn about the science behind our approach to health optimization.
            </p>
          </div>

          {/* Evidence Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {evidenceCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className={`p-6 bg-gradient-to-br ${category.color} text-white`}>
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-full bg-white/20 mr-4">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold">{category.title}</h3>
                    </div>
                    <p className="text-white/90 mb-4">{category.description}</p>
                    <Button
                      variant="outline"
                      onClick={() => toggleSection(category.id)}
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      {expandedSection === category.id ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-2" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-2" />
                          Learn More
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <AnimatePresence>
                    {expandedSection === category.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-gray-50 dark:bg-gray-800">
                          <p className="text-gray-700 dark:text-gray-300 mb-6">
                            {category.content.overview}
                          </p>
                          
                          {/* Supplement Tiers */}
                          {category.content.tiers && (
                            <div className="space-y-4 mb-6">
                              <h4 className="font-semibold text-gray-900 dark:text-white">Evidence Tiers</h4>
                              {category.content.tiers.map((tier) => (
                                <div key={tier.name} className="flex items-start p-4 bg-white dark:bg-gray-700 rounded-lg">
                                  <div className="mr-3 mt-0.5">{tier.icon}</div>
                                  <div>
                                    <h5 className="font-medium text-gray-900 dark:text-white">{tier.name}</h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{tier.description}</p>
                                    <div className="flex flex-wrap gap-1">
                                      {tier.examples.map((example) => (
                                        <span key={example} className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-xs">
                                          {example}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Nutrition Principles */}
                          {category.content.principles && (
                            <div className="space-y-4 mb-6">
                              <h4 className="font-semibold text-gray-900 dark:text-white">Key Principles</h4>
                              {category.content.principles.map((principle) => (
                                <div key={principle.name} className="flex items-start p-4 bg-white dark:bg-gray-700 rounded-lg">
                                  <div className="mr-3 mt-0.5">{principle.icon}</div>
                                  <div>
                                    <h5 className="font-medium text-gray-900 dark:text-white">{principle.name}</h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{principle.description}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 italic">{principle.evidence}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Sleep Factors */}
                          {category.content.factors && (
                            <div className="space-y-4 mb-6">
                              <h4 className="font-semibold text-gray-900 dark:text-white">Key Factors</h4>
                              {category.content.factors.map((factor) => (
                                <div key={factor.name} className="flex items-start p-4 bg-white dark:bg-gray-700 rounded-lg">
                                  <div className="mr-3 mt-0.5">{factor.icon}</div>
                                  <div>
                                    <h5 className="font-medium text-gray-900 dark:text-white">{factor.name}</h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{factor.description}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 italic">{factor.evidence}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Fitness Protocols */}
                          {category.content.protocols && (
                            <div className="space-y-4 mb-6">
                              <h4 className="font-semibold text-gray-900 dark:text-white">Research-Based Protocols</h4>
                              {category.content.protocols.map((protocol) => (
                                <div key={protocol.name} className="flex items-start p-4 bg-white dark:bg-gray-700 rounded-lg">
                                  <div className="mr-3 mt-0.5">{protocol.icon}</div>
                                  <div>
                                    <h5 className="font-medium text-gray-900 dark:text-white">{protocol.name}</h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{protocol.description}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 italic">{protocol.evidence}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Action Items */}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Actionable Steps</h4>
                            <div className="space-y-2">
                              {category.content.actionItems.map((item, index) => (
                                <div key={index} className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Research Standards */}
          <Card className="p-8 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
            <div className="text-center mb-6">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Our Research Standards</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We maintain the highest standards for evidence evaluation and recommendation development.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="p-4 rounded-full bg-primary-100 dark:bg-primary-900/30 inline-flex mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Peer-Reviewed Sources</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All recommendations are based on studies published in reputable, peer-reviewed journals.
                </p>
              </div>
              
              <div className="text-center">
                <div className="p-4 rounded-full bg-secondary-100 dark:bg-secondary-900/30 inline-flex mb-4">
                  <Brain className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Expert Review</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our team of health professionals regularly reviews and updates recommendations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="p-4 rounded-full bg-tertiary-100 dark:bg-tertiary-900/30 inline-flex mb-4">
                  <Target className="w-6 h-6 text-tertiary" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Personalized Application</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Evidence is applied to your individual health profile and goals.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button as={Link} to="/supplements" className="mr-4">
                <Shield className="w-4 h-4 mr-2" />
                Explore Evidence-Based Supplements
              </Button>
              <Button as={Link} to="/about" variant="outline">
                Learn More About Our Approach
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EvidenceBasedHealthOptimization;