
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Calendar, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NutritionSummaryCard } from "@/components/nutrition/NutritionSummaryCard";
import { DailyMealPlan } from "@/components/nutrition/DailyMealPlan";
import { FoodSearchTab } from "@/components/nutrition/FoodSearchTab";
import { SavedMealsTab } from "@/components/nutrition/SavedMealsTab";
import { SupplementationCard } from "@/components/nutrition/SupplementationCard";
import { UnplannedMealCard } from "@/components/nutrition/UnplannedMealCard";

// Types
export interface FoodItem {
  id: number;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

export interface Meal {
  id: number;
  time: string;
  name: string;
  foods: FoodItem[];
}

export interface DailyNutrition {
  date: string;
  calorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
  meals: Meal[];
}

export default function Nutrition() {
  // Sample data - in a real app this would come from a database or API
  const foodDatabase: FoodItem[] = [
    { id: 1, name: "Peito de frango grelhado", category: "Proteínas", calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: "100g" },
    { id: 2, name: "Arroz branco cozido", category: "Carboidratos", calories: 130, protein: 2.7, carbs: 28, fat: 0.3, serving: "100g" },
    { id: 3, name: "Batata doce cozida", category: "Carboidratos", calories: 86, protein: 1.6, carbs: 20, fat: 0.1, serving: "100g" },
    { id: 4, name: "Ovo inteiro cozido", category: "Proteínas", calories: 77, protein: 6.3, carbs: 0.6, fat: 5.3, serving: "1 unidade (50g)" },
    { id: 5, name: "Azeite de oliva extra virgem", category: "Gorduras", calories: 120, protein: 0, carbs: 0, fat: 14, serving: "1 colher (15ml)" },
    { id: 6, name: "Aveia em flocos", category: "Carboidratos", calories: 68, protein: 2.4, carbs: 12, fat: 1.4, serving: "20g" },
    { id: 7, name: "Whey Protein", category: "Suplementos", calories: 120, protein: 24, carbs: 3, fat: 1.5, serving: "30g" },
    { id: 8, name: "Banana", category: "Frutas", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, serving: "1 unidade média (118g)" },
    { id: 9, name: "Pão integral", category: "Carboidratos", calories: 80, protein: 4, carbs: 14, fat: 1, serving: "1 fatia (30g)" },
    { id: 10, name: "Queijo cottage", category: "Laticínios", calories: 98, protein: 11, carbs: 3.4, fat: 4.3, serving: "100g" },
  ];

  const nutritionPlan: DailyNutrition = {
    date: new Date().toISOString(),
    calorieGoal: 2500,
    proteinGoal: 180,
    carbsGoal: 250,
    fatGoal: 70,
    meals: [
      {
        id: 1,
        time: "07:00",
        name: "Café da manhã",
        foods: [
          foodDatabase[5], // Aveia
          foodDatabase[7], // Banana
          foodDatabase[3], // Ovo
          foodDatabase[6], // Whey
        ]
      },
      {
        id: 2,
        time: "10:00",
        name: "Lanche da manhã",
        foods: [
          foodDatabase[9], // Queijo cottage
          foodDatabase[7], // Banana
        ]
      },
      {
        id: 3,
        time: "13:00",
        name: "Almoço",
        foods: [
          foodDatabase[0], // Frango
          foodDatabase[1], // Arroz
          foodDatabase[2], // Batata doce
          foodDatabase[4], // Azeite
        ]
      },
      {
        id: 4,
        time: "16:00",
        name: "Lanche da tarde",
        foods: [
          foodDatabase[8], // Pão
          foodDatabase[0], // Frango
        ]
      },
      {
        id: 5,
        time: "19:30",
        name: "Jantar",
        foods: [
          foodDatabase[0], // Frango
          foodDatabase[2], // Batata doce
          foodDatabase[4], // Azeite
        ]
      },
    ]
  };

  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
  
  // Calculate totals
  const calculateTotals = () => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    
    nutritionPlan.meals.forEach(meal => {
      meal.foods.forEach(food => {
        calories += food.calories;
        protein += food.protein;
        carbs += food.carbs;
        fat += food.fat;
      });
    });
    
    return { calories, protein, carbs, fat };
  };
  
  const totals = calculateTotals();
  
  return (
    <MainLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Nutrição</h1>
            <p className="text-muted-foreground">
              Plano de alimentação personalizado
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Histórico
            </Button>
            <Button>
              <BarChart3 className="mr-2 h-4 w-4" />
              Relatórios
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="daily" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="daily">Plano Diário</TabsTrigger>
                <TabsTrigger value="add">Adicionar Alimento</TabsTrigger>
                <TabsTrigger value="custom">Refeições Salvas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="daily" className="m-0 space-y-4">
                <DailyMealPlan meals={nutritionPlan.meals} />
              </TabsContent>
              
              <TabsContent value="add" className="m-0 space-y-4">
                <FoodSearchTab 
                  foodDatabase={foodDatabase}
                  selectedFoods={selectedFoods}
                  setSelectedFoods={setSelectedFoods}
                />
              </TabsContent>
              
              <TabsContent value="custom" className="m-0">
                <SavedMealsTab />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <NutritionSummaryCard 
              totals={totals} 
              goals={{
                calories: nutritionPlan.calorieGoal,
                protein: nutritionPlan.proteinGoal,
                carbs: nutritionPlan.carbsGoal,
                fat: nutritionPlan.fatGoal
              }} 
            />
            
            <SupplementationCard />
            
            <UnplannedMealCard />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
