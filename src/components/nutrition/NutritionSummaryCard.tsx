
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { BarChart3 } from "lucide-react";

interface NutritionSummaryProps {
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  goals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export function NutritionSummaryCard({ totals, goals }: NutritionSummaryProps) {
  return (
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
              {totals.calories} / {goals.calories} kcal
            </span>
          </div>
          <Progress 
            value={(totals.calories / goals.calories) * 100} 
            className="h-2 bg-red-100"
          >
            <div 
              className="h-full bg-red-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((totals.calories / goals.calories) * 100, 100)}%` }}
            />
          </Progress>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <Label>Proteínas</Label>
            <span className="text-sm text-muted-foreground">
              {totals.protein} / {goals.protein} g
            </span>
          </div>
          <Progress 
            value={(totals.protein / goals.protein) * 100} 
            className="h-2 bg-blue-100"
          >
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((totals.protein / goals.protein) * 100, 100)}%` }}
            />
          </Progress>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <Label>Carboidratos</Label>
            <span className="text-sm text-muted-foreground">
              {totals.carbs} / {goals.carbs} g
            </span>
          </div>
          <Progress 
            value={(totals.carbs / goals.carbs) * 100} 
            className="h-2 bg-yellow-100"
          >
            <div 
              className="h-full bg-yellow-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((totals.carbs / goals.carbs) * 100, 100)}%` }}
            />
          </Progress>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <Label>Gorduras</Label>
            <span className="text-sm text-muted-foreground">
              {totals.fat} / {goals.fat} g
            </span>
          </div>
          <Progress 
            value={(totals.fat / goals.fat) * 100} 
            className="h-2 bg-green-100"
          >
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((totals.fat / goals.fat) * 100, 100)}%` }}
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
  );
}
