import React from 'react';
import { Info } from "lucide-react";

// Placeholder donut chart using SVG
function DonutChart({ protein = 95, carbs = 210, fat = 65, goalProtein = 120, goalCarbs = 250, goalFat = 70 }) {
  // Simple static arc, replace with <PieChart/> from recharts for production
  return (
    <div className="flex flex-col items-center">
      <svg width="70" height="70">
        <circle cx="35" cy="35" r="30" fill="none" stroke="#6366f1" strokeWidth="8" strokeDasharray="180 110" />
        <circle cx="35" cy="35" r="30" fill="none" stroke="#22d3ee" strokeWidth="8" strokeDasharray="100 190" strokeDashoffset="-100"/>
        <circle cx="35" cy="35" r="30" fill="none" stroke="#f43f5e" strokeWidth="8" strokeDasharray="70 220" strokeDashoffset="-200"/>
      </svg>
      <div className="flex gap-2 text-xs mt-2">
        <span className="text-indigo-500 font-bold">Protein</span>
        <span className="text-cyan-500 font-bold">Carbs</span>
        <span className="text-pink-500 font-bold">Fat</span>
      </div>
    </div>
  );
}

function BWScoreCard({ score = 76, sleep = 78, fitness = 82 }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-surface-1 shadow-lg border border-neutral-200/60 dark:border-neutral-700/60 p-8 w-full h-full hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 text-left">
          <span className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight">
            BW Score
          </span>
          <Info className="w-5 h-5 text-primary cursor-pointer" title="Biowell Score: Composite of sleep, fitness, and consistency." />
        </div>
        <span className="text-4xl font-bold text-primary tracking-tight">{score}</span>
      </div>
      <div className="flex items-center gap-2 mb-6 text-left">
        <span className="text-sm text-neutral-500 dark:text-neutral-400">/100</span>
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium ml-2 tracking-wide">
          Good
        </span>
      </div>
      <div className="border-t border-neutral-200/60 dark:border-neutral-700/60 pt-6 mt-4 space-y-5">
        <div className="flex items-center justify-between text-left">
          <span className="flex items-center gap-2 text-sm text-secondary font-medium tracking-wide">
            Sleep
            <Info className="w-4 h-4 text-secondary/60" title="Based on sleep duration, quality, and consistency." />
          </span>
          <span className="text-lg font-bold text-secondary tracking-tight">{sleep}</span>
        </div>
        <div className="flex items-center justify-between text-left">
          <span className="flex items-center gap-2 text-sm text-tertiary font-medium tracking-wide">
            Fitness
            <Info className="w-4 h-4 text-tertiary/60" title="Based on activity levels, workouts, and recovery." />
          </span>
          <span className="text-lg font-bold text-tertiary tracking-tight">{fitness}</span>
        </div>
      </div>
    </div>
  );
}

function MacroCard({ protein = 95, carbs = 210, fat = 65, goalProtein = 120, goalCarbs = 250, goalFat = 70 }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-surface-1 shadow-lg border border-neutral-200/60 dark:border-neutral-700/60 p-8 w-full h-full hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-2.5 mb-5 text-left">
        <span className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight">
          Macros
        </span>
        <Info className="w-5 h-5 text-tertiary cursor-pointer" title="Macronutrient breakdown based on daily intake and goals." />
      </div>
      <DonutChart protein={protein} carbs={carbs} fat={fat} />
      <div className="flex flex-col gap-4 mt-5">
        <div className="flex items-center justify-between text-sm text-left">
          <div 
            className="bg-purple-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(percent, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
          <span className="font-bold tracking-tight">{protein}g <span className="text-gray-400">/ {goalProtein}g</span></span>
        </div>
        <div className="flex items-center justify-between text-sm text-left">
          <span className="text-cyan-600 dark:text-cyan-400 tracking-wide">Carbs</span>
          <span className="font-bold tracking-tight">{carbs}g <span className="text-gray-400">/ {goalCarbs}g</span></span>
        </div>
        <div className="flex items-center justify-between text-sm text-left">
          <span className="text-pink-600 dark:text-pink-400 tracking-wide">Fat</span>
          <span className="font-bold tracking-tight">{fat}g <span className="text-gray-400">/ {goalFat}g</span></span>
        </div>
      </div>
    </div>
  );
}

function SleepCard({ totalSleep = 7.5, deepSleep = 1.2, remSleep = 1.0, sleepGoal = 8 }) {
  const percent = Math.round((totalSleep / sleepGoal) * 100);
  return (
    <div className="rounded-xl bg-white dark:bg-neutral-900 shadow-md border border-neutral-100 dark:border-neutral-800 p-7 w-full h-full">
      <div className="flex items-center gap-2.5 mb-5 text-left">
        <span className="text-xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
          Sleep Analysis
        </span>
        <Info className="w-5 h-5 text-purple-500 cursor-pointer" title="Total, Deep, and REM sleep compared to optimal targets." />
      </div>
      <div className="flex items-start gap-5 text-left">
        <div className="text-left">
          <span className="text-3xl font-bold text-purple-500 tracking-tight">{totalSleep}h</span>
          <div className="text-xs text-gray-500 dark:text-gray-400 tracking-wide mt-1">Total Sleep</div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 text-left">
            <span className="text-sm text-indigo-600 dark:text-indigo-400 tracking-wide">Deep</span>
            <span className="font-bold tracking-tight">{deepSleep}h</span>
            <span className="text-sm text-pink-600 dark:text-pink-400 tracking-wide">REM</span>
            <span className="font-bold tracking-tight">{remSleep}h</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2.5 rounded-full mt-3">
            <div
              className="bg-purple-400 h-2.5 rounded-full transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="text-xs text-gray-400 mt-2 tracking-wide">{percent}% of sleep goal</div>
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Cards component
const DashboardCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <BWScoreCard />
      </div>
      <div className="md:col-span-1">
        <MacroCard />
      </div>
      <div className="md:col-span-1">
        <SleepCard />
      </div>
    </div>
  );
};

export default DashboardCards;