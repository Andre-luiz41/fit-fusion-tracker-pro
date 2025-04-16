
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer 
} from "recharts";
import { nutritionData } from "@/data/progressData";

const NutritionProgress = () => {
  // Calculate averages
  const avgCalories = Math.round(nutritionData.reduce((sum, day) => sum + day.calories, 0) / nutritionData.length);
  const avgProtein = Math.round(nutritionData.reduce((sum, day) => sum + day.protein, 0) / nutritionData.length);
  const avgCarbs = Math.round(nutritionData.reduce((sum, day) => sum + day.carbs, 0) / nutritionData.length);
  const avgFat = Math.round(nutritionData.reduce((sum, day) => sum + day.fat, 0) / nutritionData.length);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acompanhamento Nutricional</CardTitle>
        <CardDescription>
          Sua ingestão nutricional da última semana
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={nutritionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="calories" name="Calorias (kcal)" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line yAxisId="right" type="monotone" dataKey="protein" name="Proteínas (g)" stroke="#82ca9d" />
              <Line yAxisId="right" type="monotone" dataKey="carbs" name="Carboidratos (g)" stroke="#ffc658" />
              <Line yAxisId="right" type="monotone" dataKey="fat" name="Gorduras (g)" stroke="#ff8042" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Média de Calorias</p>
            <p className="text-2xl font-bold">{avgCalories} kcal</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Média de Proteínas</p>
            <p className="text-2xl font-bold">{avgProtein}g</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Média de Carboidratos</p>
            <p className="text-2xl font-bold">{avgCarbs}g</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Média de Gorduras</p>
            <p className="text-2xl font-bold">{avgFat}g</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionProgress;
