
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save, X, Utensils, Coffee, Apple, Egg, Pizza } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const MEAL_TYPES = [
  { value: "cafe-da-manha", label: "Café da Manhã", icon: Coffee, time: "07:00" },
  { value: "lanche-manha", label: "Lanche da Manhã", icon: Apple, time: "10:00" },
  { value: "almoco", label: "Almoço", icon: Utensils, time: "13:00" },
  { value: "lanche-tarde", label: "Lanche da Tarde", icon: Apple, time: "16:00" },
  { value: "jantar", label: "Jantar", icon: Utensils, time: "19:30" },
  { value: "ceia", label: "Ceia", icon: Egg, time: "22:00" },
  { value: "extra", label: "Refeição Extra", icon: Pizza, time: "Personalizado" },
];

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

          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-2">
              <Label htmlFor="foodName">Alimento</Label>
              <Input
                id="foodName"
                placeholder="Ex: Ovos mexidos"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                className="bg-[#252525] border-[#333]"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                placeholder="Ex: 2 unidades"
                value={newItem.quantity}
                onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                className="bg-[#252525] border-[#333]"
              />
            </div>
            <div className="col-span-1">
              <Label htmlFor="calories">Calorias</Label>
              <Input
                id="calories"
                placeholder="kcal"
                value={newItem.calories}
                onChange={(e) => setNewItem({...newItem, calories: e.target.value})}
                className="bg-[#252525] border-[#333]"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={addFoodItem}
                className="w-full h-10 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {foodItems.length > 0 ? (
            <div className="bg-[#252525] rounded-md border border-[#333] overflow-hidden">
              <Table>
                <TableHeader className="bg-[#2a2a2a]">
                  <TableRow className="border-[#333]">
                    <TableHead className="text-gray-300">Alimento</TableHead>
                    <TableHead className="text-gray-300">Quantidade</TableHead>
                    <TableHead className="text-gray-300">Calorias</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {foodItems.map((item) => (
                    <TableRow key={item.id} className="border-[#333]">
                      <TableCell className="text-white">{item.name}</TableCell>
                      <TableCell className="text-white">{item.quantity}</TableCell>
                      <TableCell className="text-white">{item.calories} kcal</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeFoodItem(item.id)}
                          className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {foodItems.length > 0 && (
                <div className="p-3 border-t border-[#333] bg-[#2a2a2a]">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Total Calorias:</span>
                    <span className="text-purple-400">{totalCalories} kcal</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Macronutrientes:</span>
                    <span>P: {totalProtein}g • C: {totalCarbs}g • G: {totalFat}g</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 bg-[#252525] rounded-md border border-[#333] text-gray-400">
              Nenhum alimento adicionado
            </div>
          )}
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
