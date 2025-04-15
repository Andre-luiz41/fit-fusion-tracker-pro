
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddMealDialog } from "./AddMealDialog";
import { Coffee, Utensils, Apple } from "lucide-react";

interface SavedMeal {
  id: string;
  name: string;
  mealType: string;
  calories: number;
  foodItems: any[];
}

export function SavedMealsTab() {
  const [savedMeals, setSavedMeals] = useState<SavedMeal[]>([]);

  const handleSaveMeal = (items: any[]) => {
    if (items.length > 0) {
      const totalCalories = items.reduce((sum, item) => sum + item.calories, 0);
      
      const newMeal: SavedMeal = {
        id: Date.now().toString(),
        name: "Refeição personalizada",
        mealType: "Personalizada",
        calories: totalCalories,
        foodItems: items
      };
      
      setSavedMeals([...savedMeals, newMeal]);
    }
  };

  return (
    <div className="space-y-4">
      {savedMeals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedMeals.map((meal) => (
            <Card key={meal.id} className="bg-[#252525] border-[#333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  {meal.mealType === "Café da Manhã" ? (
                    <Coffee className="h-4 w-4 mr-2 text-blue-400" />
                  ) : meal.mealType === "Almoço" || meal.mealType === "Jantar" ? (
                    <Utensils className="h-4 w-4 mr-2 text-green-400" />
                  ) : (
                    <Apple className="h-4 w-4 mr-2 text-yellow-400" />
                  )}
                  {meal.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-400">
                  {meal.foodItems.length} item(s) • {meal.calories} kcal
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-40 border rounded-lg bg-muted/10">
          <p className="text-muted-foreground">Salve suas refeições favoritas para adicioná-las rapidamente ao seu plano</p>
        </div>
      )}
      
      <AddMealDialog onSave={handleSaveMeal} />
    </div>
  );
}
