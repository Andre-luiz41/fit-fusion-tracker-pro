
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Search, 
  Utensils, 
  Apple, 
  Beef, 
  Egg, 
  Fish, 
  Milk, 
  BarChart3, 
  Calendar, 
  Pizza,
  FilterX
} from "lucide-react";

// Tipos de dados
interface FoodItem {
  id: number;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

interface Meal {
  id: number;
  time: string;
  name: string;
  foods: FoodItem[];
}

interface DailyNutrition {
  date: string;
  calorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
  meals: Meal[];
}

export default function Nutrition() {
  // Dados de exemplo
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

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
  
  // Cálculo dos totais nutricionais
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
                {nutritionPlan.meals.map((meal) => (
                  <Card key={meal.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-base font-medium">{meal.name}</CardTitle>
                          <CardDescription>{meal.time}</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Adicionar
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {meal.foods.map((food) => (
                          <div key={food.id} className="flex justify-between items-center py-2">
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
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Total da refeição:</span>
                          <span>
                            {meal.foods.reduce((acc, food) => acc + food.calories, 0)} kcal
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="flex justify-center mt-4">
                  <Button>
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar Refeição
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="add" className="m-0 space-y-4">
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
              </TabsContent>
              
              <TabsContent value="custom" className="m-0">
                <div className="flex items-center justify-center h-40 border rounded-lg bg-muted/10">
                  <p className="text-muted-foreground">Salve suas refeições favoritas para adicioná-las rapidamente ao seu plano</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Resumo Nutricional</CardTitle>
                <CardDescription>Progresso diário</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Calorias</Label>
                    <span className="text-sm text-muted-foreground">
                      {totals.calories} / {nutritionPlan.calorieGoal} kcal
                    </span>
                  </div>
                  <Progress 
                    value={(totals.calories / nutritionPlan.calorieGoal) * 100} 
                    className="h-2 bg-red-100"
                  >
                    <div 
                      className="h-full bg-red-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((totals.calories / nutritionPlan.calorieGoal) * 100, 100)}%` }}
                    />
                  </Progress>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Proteínas</Label>
                    <span className="text-sm text-muted-foreground">
                      {totals.protein} / {nutritionPlan.proteinGoal} g
                    </span>
                  </div>
                  <Progress 
                    value={(totals.protein / nutritionPlan.proteinGoal) * 100} 
                    className="h-2 bg-blue-100"
                  >
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((totals.protein / nutritionPlan.proteinGoal) * 100, 100)}%` }}
                    />
                  </Progress>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Carboidratos</Label>
                    <span className="text-sm text-muted-foreground">
                      {totals.carbs} / {nutritionPlan.carbsGoal} g
                    </span>
                  </div>
                  <Progress 
                    value={(totals.carbs / nutritionPlan.carbsGoal) * 100} 
                    className="h-2 bg-yellow-100"
                  >
                    <div 
                      className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((totals.carbs / nutritionPlan.carbsGoal) * 100, 100)}%` }}
                    />
                  </Progress>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Gorduras</Label>
                    <span className="text-sm text-muted-foreground">
                      {totals.fat} / {nutritionPlan.fatGoal} g
                    </span>
                  </div>
                  <Progress 
                    value={(totals.fat / nutritionPlan.fatGoal) * 100} 
                    className="h-2 bg-green-100"
                  >
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((totals.fat / nutritionPlan.fatGoal) * 100, 100)}%` }}
                    />
                  </Progress>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Ver Relatório Completo
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Suplementação</CardTitle>
                <CardDescription>Recomendações diárias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-fitness-primary/10 flex items-center justify-center mr-3">
                        <Egg className="h-4 w-4 text-fitness-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Whey Protein</p>
                        <p className="text-xs text-muted-foreground">2 doses diárias</p>
                      </div>
                    </div>
                    <span className="text-xs bg-fitness-primary/10 text-fitness-primary px-2 py-1 rounded-full">
                      45g
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-fitness-primary/10 flex items-center justify-center mr-3">
                        <Egg className="h-4 w-4 text-fitness-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Creatina</p>
                        <p className="text-xs text-muted-foreground">1 dose diária</p>
                      </div>
                    </div>
                    <span className="text-xs bg-fitness-primary/10 text-fitness-primary px-2 py-1 rounded-full">
                      5g
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-fitness-primary/10 flex items-center justify-center mr-3">
                        <Egg className="h-4 w-4 text-fitness-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">BCAA</p>
                        <p className="text-xs text-muted-foreground">Durante treino</p>
                      </div>
                    </div>
                    <span className="text-xs bg-fitness-primary/10 text-fitness-primary px-2 py-1 rounded-full">
                      10g
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-1" />
                  Gerenciar Suplementos
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Adicionar Refeição Fora do Plano</CardTitle>
                <CardDescription>Fast-food ou refeições não planejadas</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-6">
                <Button className="w-full">
                  <Pizza className="h-4 w-4 mr-2" />
                  Registrar Refeição Não Planejada
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
