
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, FilterX, Utensils, Apple, Beef, Egg, Fish, Milk } from "lucide-react";
import { FoodItem } from "@/pages/Nutrition";

interface FoodSearchTabProps {
  foodDatabase: FoodItem[];
  selectedFoods: FoodItem[];
  setSelectedFoods: React.Dispatch<React.SetStateAction<FoodItem[]>>;
}

export function FoodSearchTab({ foodDatabase, selectedFoods, setSelectedFoods }: FoodSearchTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredFoods = searchQuery 
    ? foodDatabase.filter(food => 
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  const icons = {
    "Proteínas": Beef,
    "Carboidratos": Apple,
    "Gorduras": Fish,
    "Frutas": Apple,
    "Laticínios": Milk,
    "Suplementos": Egg,
  };
  
  const getFoodIcon = (category: string) => {
    const IconComponent = icons[category as keyof typeof icons] || Utensils;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Adicionar Alimento</CardTitle>
        <CardDescription>Pesquise ou cadastre um novo alimento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Pesquisar alimento..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {searchQuery && (
            <div className="border rounded-md divide-y max-h-80 overflow-y-auto">
              {filteredFoods.length > 0 ? (
                filteredFoods.map((food) => (
                  <div 
                    key={food.id} 
                    className="flex justify-between items-center p-3 hover:bg-muted/50 cursor-pointer"
                    onClick={() => setSelectedFoods([...selectedFoods, food])}
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-fitness-primary/10 flex items-center justify-center mr-3">
                        {getFoodIcon(food.category)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{food.name}</p>
                        <p className="text-xs text-muted-foreground">{food.serving}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{food.calories} kcal</p>
                      <p className="text-xs text-muted-foreground">
                        P: {food.protein}g • C: {food.carbs}g • G: {food.fat}g
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center">
                  <p className="text-muted-foreground">Nenhum alimento encontrado.</p>
                  <Button variant="link" className="mt-2">
                    <Plus className="h-4 w-4 mr-1" />
                    Cadastrar novo alimento
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {selectedFoods.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Alimentos Selecionados</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedFoods([])}
                >
                  <FilterX className="h-4 w-4 mr-1" />
                  Limpar
                </Button>
              </div>
              
              <div className="border rounded-md divide-y">
                {selectedFoods.map((food, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-fitness-primary/10 flex items-center justify-center mr-3">
                        {getFoodIcon(food.category)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{food.name}</p>
                        <p className="text-xs text-muted-foreground">{food.serving}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{food.calories} kcal</p>
                      <p className="text-xs text-muted-foreground">
                        P: {food.protein}g • C: {food.carbs}g • G: {food.fat}g
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-between">
                <div>
                  <p className="text-sm font-medium">Total: {selectedFoods.reduce((acc, food) => acc + food.calories, 0)} kcal</p>
                  <p className="text-xs text-muted-foreground">
                    P: {selectedFoods.reduce((acc, food) => acc + food.protein, 0)}g • 
                    C: {selectedFoods.reduce((acc, food) => acc + food.carbs, 0)}g • 
                    G: {selectedFoods.reduce((acc, food) => acc + food.fat, 0)}g
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Salvar Refeição</Button>
                  <Button size="sm">Adicionar ao Plano</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
