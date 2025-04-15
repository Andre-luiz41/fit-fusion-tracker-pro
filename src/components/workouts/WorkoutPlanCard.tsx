
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Exercise {
  id: number;
  name: string;
  description?: string;
  sets: string;
  reps: string;
}

interface WorkoutPlanCardProps {
  type: string;
  title: string;
  description: string;
  exercises: Exercise[];
}

export function WorkoutPlanCard({ type, title, description, exercises }: WorkoutPlanCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2 bg-black text-white rounded-t-lg">
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
            <div key={exercise.id} className="space-y-1 border-b border-gray-200 pb-3">
              <div className="flex justify-between">
                <h3 className="font-bold text-red-500">
                  {exercise.id}. {exercise.name}
                </h3>
                <span className="text-sm font-bold">{exercise.sets}</span>
              </div>
              {exercise.description && (
                <p className="text-xs text-muted-foreground">{exercise.description}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
