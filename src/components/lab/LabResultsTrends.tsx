import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { format, parseISO } from 'date-fns';
import { LabResult } from '../../api/labResultsApi';
import { Card } from '../ui/Card';

interface LabResultsTrendsProps {
  labResults: LabResult[];
  metric: string;
  subMetric?: string;
  unit?: string;
  referenceRange?: { min: number; max: number };
}

const LabResultsTrends: React.FC<LabResultsTrendsProps> = ({
  labResults,
  metric,
  subMetric,
  unit = '',
  referenceRange
}) => {
  const [chartData, setChartData] = useState<any>(null);
  
  useEffect(() => {
    if (!labResults.length) return;
    
    // Extract data for the specified metric
    const filteredResults = labResults
      .filter(result => {
        if (subMetric) {
          return result.testResults[metric] && 
                 typeof result.testResults[metric] === 'object' && 
                 result.testResults[metric][subMetric] !== undefined;
        }
        return result.testResults[metric] !== undefined;
      })
      .sort((a, b) => new Date(a.testDate).getTime() - new Date(b.testDate).getTime());
    
    if (filteredResults.length === 0) return;
    
    const labels = filteredResults.map(result => format(new Date(result.testDate), 'MMM d, yyyy'));
    const data = filteredResults.map(result => {
      if (subMetric) {
        return result.testResults[metric][subMetric];
      }
      return result.testResults[metric];
    });
    
    const datasets = [
      {
        label: subMetric ? `${metric} - ${subMetric}` : metric,
        data,
        borderColor: 'rgba(59, 130, 246, 1)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ];
    
    // Add reference range if provided
    if (referenceRange) {
      datasets.push(
        {
          label: 'Min Reference',
          data: Array(labels.length).fill(referenceRange.min),
          borderColor: 'rgba(239, 68, 68, 0.5)', // red-500
          borderDash: [5, 5],
          borderWidth: 1,
          pointRadius: 0,
          fill: false
        },
        {
          label: 'Max Reference',
          data: Array(labels.length).fill(referenceRange.max),
          borderColor: 'rgba(239, 68, 68, 0.5)', // red-500
          borderDash: [5, 5],
          borderWidth: 1,
          pointRadius: 0,
          fill: false
        }
      );
    }
    
    setChartData({
      labels,
      datasets
    });
    
  }, [labResults, metric, subMetric, referenceRange]);
  
  if (!chartData) {
    return (
      <Card className="p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No data available for {subMetric ? `${metric} - ${subMetric}` : metric}
        </p>
      </Card>
    );
  }
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: unit || 'Value'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + (unit ? ` ${unit}` : '');
            }
            return label;
          }
        }
      }
    }
  };
  
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">
        {subMetric ? `${metric} - ${subMetric}` : metric} Trends
      </h3>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
};

export default LabResultsTrends;