
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Save, Utensils } from "lucide-react";
import { FoodItemForm } from "./FoodItemForm";
import { FoodItemsTable } from "./FoodItemsTable";
import { MealTypeSelector, MEAL_TYPES } from "./MealTypeSelector";

interface FoodItem {
  id: string;
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface AddMealDialogProps {
  mealType?: string;
  onSave: (items: FoodItem[]) => void;
}

export function AddMealDialog({ mealType = "", onSave }: AddMealDialogProps) {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [newItem, setNewItem] = useState<{name: string; quantity: string; calories: string}>({ 
    name: "", 
    quantity: "",
    calories: ""
  });
  const [open, setOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState(
    mealType ? MEAL_TYPES.find(m => m.label === mealType)?.value || "cafe-da-manha" : "cafe-da-manha"
  );
  const [customTime, setCustomTime] = useState("12:00");

  const addFoodItem = () => {
    if (newItem.name.trim() && newItem.quantity.trim()) {
      // Parse the calories if provided, otherwise generate a random value
      const calories = newItem.calories.trim() 
        ? parseInt(newItem.calories) 
        : Math.floor(Math.random() * 200) + 50;
      
      // Calculate macros based on calories (simplified simulation)
      const totalGrams = calories / 4; // rough estimate
      const protein = Math.floor(totalGrams * 0.3);
      const carbs = Math.floor(totalGrams * 0.5);
      const fat = Math.floor((calories - (protein * 4 + carbs * 4)) / 9);
      
      setFoodItems([
        ...foodItems,
        {
          id: Date.now().toString(),
          name: newItem.name,
          quantity: newItem.quantity,
          calories,
          protein,
          carbs,
          fat
        }
      ]);
      setNewItem({ name: "", quantity: "", calories: "" });
    }
  };

  const removeFoodItem = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  const handleSave = () => {
    onSave(foodItems);
    setOpen(false);
    setFoodItems([]);
  };

  // Calculate totals
  const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = foodItems.reduce((sum, item) => sum + item.protein, 0);
  const totalCarbs = foodItems.reduce((sum, item) => sum + item.carbs, 0);
  const totalFat = foodItems.reduce((sum, item) => sum + item.fat, 0);

  // Get the selected meal type object
  const selectedMeal = MEAL_TYPES.find(m => m.value === selectedMealType);
  const MealIcon = selectedMeal?.icon || Utensils;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full bg-[#2a2a2a] border-[#333] hover:bg-[#3a3a3a]">
          <Plus className="h-4 w-4 mr-1" />
          Adicionar {mealType || "Refeição"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-[#1e1e1e] text-white border-[#333]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MealIcon className="h-5 w-5 mr-2 text-purple-400" />
            Adicionar {selectedMeal?.label || "Refeição"}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Adicione os alimentos desta refeição e suas informações nutricionais.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4 my-4">
          <MealTypeSelector
            selectedMealType={selectedMealType}
            setSelectedMealType={setSelectedMealType}
            customTime={customTime}
            setCustomTime={setCustomTime}
          />

          <FoodItemForm
            newItem={newItem}
            setNewItem={setNewItem}
            onAddItem={addFoodItem}
          />
          
          <FoodItemsTable
            items={foodItems}
            onRemoveItem={removeFoodItem}
            totalCalories={totalCalories}
            totalProtein={totalProtein}
            totalCarbs={totalCarbs}
            totalFat={totalFat}
          />
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            className="bg-[#252525] border-[#333] hover:bg-[#3a3a3a]"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={foodItems.length === 0}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <Save className="h-4 w-4 mr-1" />
            Salvar Refeição
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
