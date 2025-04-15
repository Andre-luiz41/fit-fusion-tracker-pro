
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { MealCard } from "./MealCard";
import { Meal } from "@/pages/Nutrition";

interface DailyMealPlanProps {
  meals: Meal[];
}

export function DailyMealPlan({ meals }: DailyMealPlanProps) {
  const handleAddItems = (mealId: number, items: any[]) => {
    console.log(`Adding items to meal ${mealId}:`, items);
    // In a real app, this would update the state or call an API
  };

  return (
    <>
      {meals.map((meal) => (
        <MealCard 
          key={meal.id}
          title={meal.name}
          time={meal.time}
          items={meal.foods.map(food => ({
            id: String(food.id),
            name: food.name,
            quantity: food.serving,
            calories: food.calories,
            protein: food.protein,
            carbs: food.carbs,
            fat: food.fat
          }))}
          onAddItems={(items) => handleAddItems(meal.id, items)}
        />
      ))}
      
      <div className="flex justify-center mt-4">
        <Button>
          <Plus className="h-4 w-4 mr-1" />
          Adicionar Refeição
        </Button>
      </div>
    </>
  );
}
