
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer 
} from "recharts";
import { hydrationData } from "@/data/progressData";

const HydrationProgress = () => {
  // Calculate average water intake
  const avgIntake = Math.round(hydrationData.reduce((sum, day) => sum + day.actual, 0) / hydrationData.length);
  const goalAmount = hydrationData[0].goal; // Assuming same goal for all days
  const goalPercentage = Math.round((avgIntake / goalAmount) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monitoramento de Hidratação</CardTitle>
        <CardDescription>
          Sua ingestão diária de água na última semana
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hydrationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="actual" name="Ingestão de Água (ml)" fill="#82ca9d" />
              <Bar dataKey="goal" name="Meta Diária (ml)" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Meta Diária</p>
            <p className="text-2xl font-bold">{goalAmount} ml</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Ingestão Média</p>
            <p className="text-2xl font-bold">{avgIntake} ml</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Cumprimento da Meta</p>
            <p className="text-2xl font-bold">{goalPercentage}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HydrationProgress;
