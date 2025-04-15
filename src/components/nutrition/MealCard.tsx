
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
  const totalProtein = items.reduce((sum, item) => sum + item.protein, 0);
  const totalCarbs = items.reduce((sum, item) => sum + item.carbs, 0);
  const totalFat = items.reduce((sum, item) => sum + item.fat, 0);
  
  // Determine background gradient based on meal type
  const getBgGradient = () => {
    if (title.toLowerCase().includes('café')) return 'from-amber-600 to-yellow-600';
    if (title.toLowerCase().includes('almoço')) return 'from-green-600 to-teal-600';
    if (title.toLowerCase().includes('jantar')) return 'from-blue-600 to-indigo-600';
    if (title.toLowerCase().includes('lanche')) return 'from-orange-600 to-red-600';
    return 'from-purple-600 to-indigo-600';
  };
  
  return (
    <Card className="bg-[#1e1e1e] border-[#333] text-white overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r border-b border-[#333] text-white">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            <p className="text-xs text-gray-300">{time}</p>
          </div>
          
          <div className="h-8 w-8 rounded-full bg-[#2a2a2a] flex items-center justify-center">
            <Utensils className="h-4 w-4 text-purple-400" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {items.length > 0 ? (
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between border-b border-[#333] pb-2">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{item.calories} kcal</p>
                  <p className="text-xs text-gray-400">
                    P: {item.protein}g • C: {item.carbs}g • G: {item.fat}g
                  </p>
                </div>
              </div>
            ))}
            
            <div className="pt-2 border-t border-[#333] mt-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Total:</span>
                <span className="font-medium">{totalCalories} kcal</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Macronutrientes:</span>
                <span>P: {totalProtein}g • C: {totalCarbs}g • G: {totalFat}g</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center text-gray-400 text-sm">
            Nenhum alimento adicionado
          </div>
        )}
        
        <AddMealDialog mealType={title} onSave={onAddItems} />
      </CardContent>
    </Card>
  );
}
