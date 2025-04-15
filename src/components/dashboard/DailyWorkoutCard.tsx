
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, ChevronRight, Clock } from "lucide-react";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  rest: number; // em segundos
}

interface DailyWorkoutCardProps {
  day: string;
  title: string;
  duration: number; // em minutos
  exercises: Exercise[];
  completed?: boolean;
  onStart?: () => void;
}

export function DailyWorkoutCard({
  day,
  title,
  duration,
  exercises,
  completed = false,
  onStart
}: DailyWorkoutCardProps) {
  return (
    <Card className={completed ? "border-fitness-success bg-green-50" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            <CardDescription>{day}</CardDescription>
          </div>
          {completed && (
            <div className="flex items-center text-fitness-success text-sm font-medium">
              <span className="rounded-full bg-fitness-success/20 p-1 mr-1">
                <svg
                  className="h-3 w-3 text-fitness-success"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </span>
              Concluído
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>{duration} minutos</span>
        </div>
        
        <div className="space-y-2">
          {exercises.slice(0, 3).map((exercise, index) => (
            <div key={index} className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-fitness-primary/10 flex items-center justify-center mr-3">
                <Dumbbell className="h-4 w-4 text-fitness-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{exercise.name}</p>
                <p className="text-xs text-muted-foreground">
                  {exercise.sets} séries • {exercise.reps} repetições • {exercise.rest}s descanso
                </p>
              </div>
            </div>
          ))}
          
          {exercises.length > 3 && (
            <p className="text-xs text-muted-foreground ml-11">
              +{exercises.length - 3} exercícios
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={completed ? "outline" : "default"}
          onClick={onStart}
        >
          {completed ? "Ver detalhes" : "Iniciar treino"}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
