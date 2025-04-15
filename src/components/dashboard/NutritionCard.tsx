
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Utensils } from "lucide-react";

interface Meal {
  time: string;
  name: string;
  calories: number;
  consumed?: boolean;
}

interface NutritionCardProps {
  date: string;
  meals: Meal[];
  totalCalories: number;
  consumedCalories: number;
}

export function NutritionCard({
  date,
  meals,
  totalCalories,
  consumedCalories
}: NutritionCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
  
  // Capitalize first letter
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Plano Alimentar</CardTitle>
        <p className="text-sm text-muted-foreground">{capitalizedDate}</p>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{consumedCalories} kcal</span>
            <span className="text-xs text-muted-foreground">de {totalCalories} kcal</span>
          </div>
          
          <div className="h-10 w-10 rounded-full bg-fitness-secondary/10 flex items-center justify-center">
            <Utensils className="h-5 w-5 text-fitness-secondary" />
          </div>
        </div>
        
        <div className="space-y-3">
          {meals.map((meal, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`h-2 w-2 rounded-full mr-2 ${meal.consumed ? 'bg-fitness-success' : 'bg-gray-300'}`} />
                <span className="text-sm font-medium mr-2">{meal.time}</span>
                <span className="text-sm">{meal.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{meal.calories} kcal</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Registrar refeição
        </Button>
        <Button variant="outline" size="sm" className="flex items-center">
          <BarChart className="h-4 w-4 mr-1" />
          Ver análise
        </Button>
      </CardFooter>
    </Card>
  );
}
