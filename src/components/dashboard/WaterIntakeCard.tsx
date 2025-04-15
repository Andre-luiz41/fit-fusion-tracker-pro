
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Plus, Minus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface WaterIntakeCardProps {
  goal: number; // em mililitros
  current: number; // em mililitros
}

export function WaterIntakeCard({ goal, current: initialCurrent }: WaterIntakeCardProps) {
  const [current, setCurrent] = useState(initialCurrent);
  
  const percentage = Math.min(Math.max(Math.round((current / goal) * 100), 0), 100);
  
  const handleAddWater = (amount: number) => {
    setCurrent(prev => Math.min(prev + amount, goal));
  };
  
  const handleRemoveWater = (amount: number) => {
    setCurrent(prev => Math.max(prev - amount, 0));
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">Hidratação</CardTitle>
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Droplets className="h-4 w-4 text-blue-500" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2 mt-4">
          <div className="flex justify-between mb-1">
            <span className="text-2xl font-bold text-blue-500">{current}ml</span>
            <span className="text-sm text-muted-foreground">Meta: {goal}ml</span>
          </div>
          <Progress value={percentage} className="h-3 bg-blue-100">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </Progress>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-5">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
            onClick={() => handleAddWater(100)}
          >
            +100ml
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
            onClick={() => handleAddWater(250)}
          >
            +250ml
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
            onClick={() => handleAddWater(500)}
          >
            +500ml
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground"
          onClick={() => handleRemoveWater(250)}
        >
          <Minus className="h-4 w-4 mr-1" />
          Remover
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-blue-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Adicionar outro valor
        </Button>
      </CardFooter>
    </Card>
  );
}
