
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Timer, CheckCircle, Play, Pause, RotateCcw } from "lucide-react";

interface Exercise {
  id: number;
  name: string;
  description?: string;
  sets: string;
  reps: string;
  completed?: boolean;
}

interface WorkoutPlanCardProps {
  type: string;
  title: string;
  description: string;
  exercises: Exercise[];
  onExerciseComplete?: (exerciseId: number, completed: boolean) => void;
}

export function WorkoutPlanCard({ type, title, description, exercises: initialExercises, onExerciseComplete }: WorkoutPlanCardProps) {
  const [exercises, setExercises] = useState(initialExercises.map(ex => ({ ...ex, completed: ex.completed || false })));
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [time, setTime] = useState(0); // time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [restMode, setRestMode] = useState(false);
  const [restTime, setRestTime] = useState(60); // 60 seconds rest by default

  // Timer control functions
  const startTimer = (exerciseId: number) => {
    if (activeTimer === exerciseId && isRunning) {
      // If already running for this exercise, toggle to rest mode
      setRestMode(true);
      setTime(restTime);
    } else {
      // Start fresh timer for this exercise
      setActiveTimer(exerciseId);
      setTime(0);
      setIsRunning(true);
      setRestMode(false);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(restMode ? restTime : 0);
  };

  const toggleCompleted = (exerciseId: number) => {
    const updatedExercises = exercises.map(ex => 
      ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
    );
    setExercises(updatedExercises);
    
    if (onExerciseComplete) {
      const exercise = updatedExercises.find(ex => ex.id === exerciseId);
      if (exercise) {
        onExerciseComplete(exerciseId, exercise.completed);
      }
    }
  };

  // Timer effect
  React.useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning) {
      interval = window.setInterval(() => {
        setTime(prevTime => {
          if (restMode && prevTime <= 0) {
            // Rest time finished
            setRestMode(false);
            setIsRunning(false);
            return 0;
          }
          return prevTime + (restMode ? -1 : 1);
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, restMode]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="flex flex-col h-full bg-[#1e1e1e] border-[#333] text-white">
      <CardHeader className="pb-2 bg-gradient-to-r from-purple-800 to-indigo-900 rounded-t-lg">
        <div className="flex justify-between items-center">
          <Badge className="bg-purple-600 text-white">{type}</Badge>
        </div>
        <CardTitle className="text-xl font-bold uppercase tracking-wider text-white">
          {title}
        </CardTitle>
        <p className="text-sm text-white uppercase tracking-wide">TRYFITS ACADEMIA</p>
      </CardHeader>
      <CardContent className="pt-4 flex-grow">
        <div className="space-y-4">
          {exercises.map((exercise) => (
            <div key={exercise.id} className={`space-y-1 border-b border-gray-700 pb-3 ${exercise.completed ? 'opacity-70' : ''}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id={`exercise-${exercise.id}`}
                    checked={exercise.completed}
                    onCheckedChange={() => toggleCompleted(exercise.id)}
                    className="data-[state=checked]:bg-green-600"
                  />
                  <h3 className={`font-bold text-red-400 ${exercise.completed ? 'line-through' : ''}`}>
                    {exercise.id}. {exercise.name}
                  </h3>
                </div>
                <span className="text-sm font-bold">{exercise.sets}</span>
              </div>
              
              {exercise.description && (
                <p className="text-xs text-gray-400 ml-6">{exercise.description}</p>
              )}
              
              <div className="flex items-center justify-between mt-2 ml-6">
                <div className="flex gap-2">
                  {activeTimer === exercise.id ? (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className={`${restMode ? 'bg-orange-700/20 text-orange-400 hover:text-orange-300' : 'bg-green-700/20 text-green-400 hover:text-green-300'}`}
                        onClick={() => isRunning ? pauseTimer() : startTimer(exercise.id)}
                      >
                        {isRunning ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                        {restMode ? 'Descanso' : 'Treino'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-blue-700/20 text-blue-400 hover:text-blue-300"
                        onClick={resetTimer}
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reset
                      </Button>
                    </>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-indigo-700/20 text-indigo-400 hover:text-indigo-300"
                      onClick={() => startTimer(exercise.id)}
                    >
                      <Timer className="h-4 w-4 mr-1" />
                      Iniciar Timer
                    </Button>
                  )}
                </div>
                
                {activeTimer === exercise.id && (
                  <div className={`font-mono text-lg ${restMode ? 'text-orange-400' : 'text-green-400'}`}>
                    {formatTime(time)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
