
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer 
} from "recharts";
import { exerciseData } from "@/data/progressData";

const StrengthProgress = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progresso de Força</CardTitle>
        <CardDescription>
          Seu desempenho de levantamento nas últimas 4 semanas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={exerciseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="week1" name="Semana 1" fill="#8884d8" />
              <Bar dataKey="week2" name="Semana 2" fill="#82ca9d" />
              <Bar dataKey="week3" name="Semana 3" fill="#ffc658" />
              <Bar dataKey="week4" name="Semana 4" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Exercício</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Início</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Atual</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Melhoria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {exerciseData.map((item) => (
                <tr key={item.name}>
                  <td className="px-4 py-3 whitespace-nowrap">{item.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{item.week1} {item.name.includes("Barra Fixa") ? "reps" : "kg"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{item.week4} {item.name.includes("Barra Fixa") ? "reps" : "kg"}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-green-600">
                    +{(((item.week4 - item.week1) / item.week1) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StrengthProgress;
