
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FoodItemFormProps {
  newItem: {
    name: string;
    quantity: string;
    calories: string;
  };
  setNewItem: React.Dispatch<React.SetStateAction<{
    name: string;
    quantity: string;
    calories: string;
  }>>;
  onAddItem: () => void;
}

export function FoodItemForm({ newItem, setNewItem, onAddItem }: FoodItemFormProps) {
  return (
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
          onClick={onAddItem}
          className="w-full h-10 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
