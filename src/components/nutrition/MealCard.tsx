
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddMealDialog } from "./AddMealDialog";
import { Utensils } from "lucide-react";

interface FoodItem {
  id: string;
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MealCardProps {
  title: string;
  time: string;
  items: FoodItem[];
  onAddItems: (items: FoodItem[]) => void;
}

export function MealCard({ title, time, items, onAddItems }: MealCardProps) {
  const totalCalories = items.reduce((sum, item) => sum + item.calories, 0);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            <p className="text-xs text-muted-foreground">{time}</p>
          </div>
          
          <div className="h-8 w-8 rounded-full bg-fitness-primary/10 flex items-center justify-center">
            <Utensils className="h-4 w-4 text-fitness-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {items.length > 0 ? (
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{item.calories} kcal</p>
                  <p className="text-xs text-muted-foreground">
                    P: {item.protein}g • C: {item.carbs}g • G: {item.fat}g
                  </p>
                </div>
              </div>
            ))}
            
            <div className="pt-2 border-t mt-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Total:</span>
                <span className="font-medium">{totalCalories} kcal</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center text-muted-foreground text-sm">
            Nenhum alimento adicionado
          </div>
        )}
        
        <AddMealDialog mealType={title} onSave={onAddItems} />
      </CardContent>
    </Card>
  );
}
