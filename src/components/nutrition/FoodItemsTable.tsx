
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";

interface FoodItem {
  id: string;
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodItemsTableProps {
  items: FoodItem[];
  onRemoveItem: (id: string) => void;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export function FoodItemsTable({
  items,
  onRemoveItem,
  totalCalories,
  totalProtein,
  totalCarbs,
  totalFat
}: FoodItemsTableProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-6 bg-[#252525] rounded-md border border-[#333] text-gray-400">
        Nenhum alimento adicionado
      </div>
    );
  }

  return (
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
          {items.map((item) => (
            <TableRow key={item.id} className="border-[#333]">
              <TableCell className="text-white">{item.name}</TableCell>
              <TableCell className="text-white">{item.quantity}</TableCell>
              <TableCell className="text-white">{item.calories} kcal</TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onRemoveItem(item.id)}
                  className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
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
    </div>
  );
}
