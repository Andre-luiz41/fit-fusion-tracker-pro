
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pizza } from "lucide-react";
import { AddMealDialog } from "./AddMealDialog";
import { toast } from "sonner";

export function UnplannedMealCard() {
  const handleSaveUnplannedMeal = (items: any[]) => {
    if (items.length > 0) {
      const totalCalories = items.reduce((sum: number, item: any) => sum + item.calories, 0);
      toast.success(`Refeição não planejada adicionada (${totalCalories} kcal)`);
      console.log("Unplanned meal items:", items);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Adicionar Refeição Fora do Plano</CardTitle>
        <CardDescription>Fast-food ou refeições não planejadas</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center py-6">
        <AddMealDialog 
          mealType="Refeição Não Planejada" 
          onSave={handleSaveUnplannedMeal} 
        />
      </CardContent>
    </Card>
  );
}
