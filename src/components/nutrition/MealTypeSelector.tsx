
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Coffee, Apple, Utensils, Egg, Pizza } from "lucide-react";

export const MEAL_TYPES = [
  { value: "cafe-da-manha", label: "Café da Manhã", icon: Coffee, time: "07:00" },
  { value: "lanche-manha", label: "Lanche da Manhã", icon: Apple, time: "10:00" },
  { value: "almoco", label: "Almoço", icon: Utensils, time: "13:00" },
  { value: "lanche-tarde", label: "Lanche da Tarde", icon: Apple, time: "16:00" },
  { value: "jantar", label: "Jantar", icon: Utensils, time: "19:30" },
  { value: "ceia", label: "Ceia", icon: Egg, time: "22:00" },
  { value: "extra", label: "Refeição Extra", icon: Pizza, time: "Personalizado" },
];

interface MealTypeSelectorProps {
  selectedMealType: string;
  setSelectedMealType: (value: string) => void;
  customTime: string;
  setCustomTime: (value: string) => void;
}

export function MealTypeSelector({
  selectedMealType,
  setSelectedMealType,
  customTime,
  setCustomTime
}: MealTypeSelectorProps) {
  const selectedMeal = MEAL_TYPES.find(m => m.value === selectedMealType);
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="mealType">Tipo de Refeição</Label>
        <Select 
          value={selectedMealType} 
          onValueChange={setSelectedMealType}
        >
          <SelectTrigger className="bg-[#252525] border-[#333]">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent className="bg-[#252525] border-[#333]">
            {MEAL_TYPES.map(meal => (
              <SelectItem key={meal.value} value={meal.value}>
                <div className="flex items-center">
                  <meal.icon className="h-4 w-4 mr-2" />
                  {meal.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="mealTime">Horário</Label>
        <Input
          id="mealTime"
          type="time"
          value={selectedMeal?.value === "extra" ? customTime : selectedMeal?.time || ""}
          onChange={(e) => setCustomTime(e.target.value)}
          className="bg-[#252525] border-[#333]"
          disabled={selectedMeal?.value !== "extra"}
        />
      </div>
    </div>
  );
}
