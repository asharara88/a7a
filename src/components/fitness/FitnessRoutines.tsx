import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Dumbbell, Plus, ArrowRight, Calendar, Check, Edit, Trash } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

interface Routine {
  id: string;
  name: string;
  type: string;
  exercises: {
    name: string;
    sets: number;
    reps: string;
    weight?: string;
  }[];
  duration: number;
  frequency: string;
}

const FitnessRoutines: React.FC = () => {
  const [routines, setRoutines] = useState<Routine[]>([
    {
      id: '1',
      name: 'Upper Body Strength',
      type: 'Strength',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: '8-10', weight: '135 lbs' },
        { name: 'Lat Pulldowns', sets: 3, reps: '10-12', weight: '120 lbs' },
        { name: 'Shoulder Press', sets: 3, reps: '8-10', weight: '80 lbs' },
        { name: 'Bicep Curls', sets: 3, reps: '12-15', weight: '30 lbs' }
      ],
      duration: 45,
      frequency: 'Mon, Thu'
    },
    {
      id: '2',
      name: 'Lower Body Focus',
      type: 'Strength',
      exercises: [
        { name: 'Squats', sets: 4, reps: '8-10', weight: '185 lbs' },
        { name: 'Leg Press', sets: 3, reps: '10-12', weight: '270 lbs' },
        { name: 'Romanian Deadlifts', sets: 3, reps: '8-10', weight: '135 lbs' },
        { name: 'Calf Raises', sets: 4, reps: '15-20', weight: '100 lbs' }
      ],
      duration: 50,
      frequency: 'Tue, Fri'
    }
  ]);
  
  const [selectedRoutine, setSelectedRoutine] = useState<string | null>(null);
  const [showAddRoutine, setShowAddRoutine] = useState(false);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3">
            <Dumbbell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Workout Routines</h3>
        </div>
        <Button
          size="sm"
          onClick={() => setShowAddRoutine(true)}
          className="text-sm"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Routine
        </Button>
      </div>

      <div className="space-y-4">
        {routines.map((routine) => (
          <div 
            key={routine.id}
            className={cn(
              "p-4 border rounded-xl transition-all cursor-pointer",
              selectedRoutine === routine.id
                ? "border-primary bg-primary/5 dark:bg-primary/10" 
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            )}
            onClick={() => setSelectedRoutine(selectedRoutine === routine.id ? null : routine.id)}
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-lg text-gray-900 dark:text-white">
                {routine.name}
              </h4>
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                {routine.type}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
              <Calendar className="w-4 h-4 mr-1.5" />
              <span>{routine.frequency}</span>
              <span className="mx-2">•</span>
              <span>{routine.duration} min</span>
            </div>

            {selectedRoutine === routine.id && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">Exercises</h5>
                <div className="space-y-3">
                  {routine.exercises.map((exercise, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          {exercise.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {exercise.sets} sets × {exercise.reps} reps
                          {exercise.weight && ` • ${exercise.weight}`}
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <button className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex space-x-2 justify-end">
                  <Button variant="outline" size="sm">
                    Edit Routine
                  </Button>
                  <Button variant="default" size="sm">
                    Start Workout
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Button variant="outline" className="text-primary" size="sm">
          View All Routines <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>
    </Card>
  );
};

export default FitnessRoutines;