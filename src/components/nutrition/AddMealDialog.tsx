
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
  mealType: string;
  onSave: (items: FoodItem[]) => void;
}

export function AddMealDialog({ mealType, onSave }: AddMealDialogProps) {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [newItem, setNewItem] = useState<{name: string; quantity: string}>({ name: "", quantity: "" });
  const [open, setOpen] = useState(false);

  const addFoodItem = () => {
    if (newItem.name.trim() && newItem.quantity.trim()) {
      // Simulate calorie calculation - in a real app this would come from a database
      const calories = Math.floor(Math.random() * 200) + 50;
      const protein = Math.floor(Math.random() * 20) + 1;
      const carbs = Math.floor(Math.random() * 30) + 1;
      const fat = Math.floor(Math.random() * 10) + 1;
      
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
      setNewItem({ name: "", quantity: "" });
    }
  };

  const removeFoodItem = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  const handleSave = () => {
    onSave(foodItems);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Plus className="h-4 w-4 mr-1" />
          Adicionar {mealType}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar {mealType}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4 my-4">
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-2">
              <Label htmlFor="foodName">Alimento</Label>
              <Input
                id="foodName"
                placeholder="Ex: Ovos mexidos"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                placeholder="Ex: 2 unidades"
                value={newItem.quantity}
                onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addFoodItem} className="w-full">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {foodItems.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alimento</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Calorias</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {foodItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.calories} kcal</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFoodItem(item.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              Nenhum alimento adicionado
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave} disabled={foodItems.length === 0}>
            <Save className="h-4 w-4 mr-1" />
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
