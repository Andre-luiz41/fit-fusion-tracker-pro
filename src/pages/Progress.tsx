
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, AreaChart, Area 
} from "recharts";

const weightData = [
  { date: "Jan", value: 78 },
  { date: "Feb", value: 76 },
  { date: "Mar", value: 75 },
  { date: "Apr", value: 74.5 },
  { date: "May", value: 75 },
  { date: "Jun", value: 74 },
];

const exerciseData = [
  { name: "Bench Press", week1: 60, week2: 65, week3: 70, week4: 75 },
  { name: "Squat", week1: 90, week2: 95, week3: 100, week4: 110 },
  { name: "Deadlift", week1: 120, week2: 125, week3: 130, week4: 135 },
  { name: "Pull Ups", week1: 8, week2: 10, week3: 10, week4: 12 },
];

const nutritionData = [
  { date: "Mon", calories: 2100, protein: 120, carbs: 200, fat: 70 },
  { date: "Tue", calories: 2250, protein: 130, carbs: 220, fat: 75 },
  { date: "Wed", calories: 2050, protein: 125, carbs: 190, fat: 65 },
  { date: "Thu", calories: 2150, protein: 135, carbs: 210, fat: 70 },
  { date: "Fri", calories: 2300, protein: 140, carbs: 230, fat: 80 },
  { date: "Sat", calories: 2400, protein: 145, carbs: 240, fat: 85 },
  { date: "Sun", calories: 2000, protein: 120, carbs: 180, fat: 70 },
];

const hydrationData = [
  { date: "Mon", goal: 2500, actual: 2000 },
  { date: "Tue", goal: 2500, actual: 2300 },
  { date: "Wed", goal: 2500, actual: 1800 },
  { date: "Thu", goal: 2500, actual: 2500 },
  { date: "Fri", goal: 2500, actual: 2200 },
  { date: "Sat", goal: 2500, actual: 2600 },
  { date: "Sun", goal: 2500, actual: 2400 },
];

const Progress = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Progress Tracking</h1>
        
        <Tabs defaultValue="weight">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="strength">Strength</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="hydration">Hydration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weight">
            <Card>
              <CardHeader>
                <CardTitle>Weight Progression</CardTitle>
                <CardDescription>
                  Your weight changes over the past 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weightData}>
                      <defs>
                        <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8884d8" 
                        fillOpacity={1} 
                        fill="url(#colorWeight)" 
                        name="Weight (kg)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Starting Weight</p>
                    <p className="text-2xl font-bold">78 kg</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Current Weight</p>
                    <p className="text-2xl font-bold">74 kg</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Change</p>
                    <p className="text-2xl font-bold text-green-600">-4 kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="strength">
            <Card>
              <CardHeader>
                <CardTitle>Strength Progress</CardTitle>
                <CardDescription>
                  Your lifting performance over the past 4 weeks
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
                      <Bar dataKey="week1" name="Week 1" fill="#8884d8" />
                      <Bar dataKey="week2" name="Week 2" fill="#82ca9d" />
                      <Bar dataKey="week3" name="Week 3" fill="#ffc658" />
                      <Bar dataKey="week4" name="Week 4" fill="#ff8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Exercise</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Start</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Improvement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {exerciseData.map((item) => (
                        <tr key={item.name}>
                          <td className="px-4 py-3 whitespace-nowrap">{item.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{item.week1} {item.name.includes("Pull Ups") ? "reps" : "kg"}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{item.week4} {item.name.includes("Pull Ups") ? "reps" : "kg"}</td>
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
          </TabsContent>
          
          <TabsContent value="nutrition">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Tracking</CardTitle>
                <CardDescription>
                  Your nutrition intake for the past week
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
                      <Line yAxisId="left" type="monotone" dataKey="calories" name="Calories (kcal)" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line yAxisId="right" type="monotone" dataKey="protein" name="Protein (g)" stroke="#82ca9d" />
                      <Line yAxisId="right" type="monotone" dataKey="carbs" name="Carbs (g)" stroke="#ffc658" />
                      <Line yAxisId="right" type="monotone" dataKey="fat" name="Fat (g)" stroke="#ff8042" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Avg. Calories</p>
                    <p className="text-2xl font-bold">2179 kcal</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Avg. Protein</p>
                    <p className="text-2xl font-bold">130g</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Avg. Carbs</p>
                    <p className="text-2xl font-bold">210g</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Avg. Fat</p>
                    <p className="text-2xl font-bold">74g</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="hydration">
            <Card>
              <CardHeader>
                <CardTitle>Hydration Tracking</CardTitle>
                <CardDescription>
                  Your daily water intake for the past week
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
                      <Bar dataKey="actual" name="Water Intake (ml)" fill="#82ca9d" />
                      <Bar dataKey="goal" name="Daily Goal (ml)" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Daily Goal</p>
                    <p className="text-2xl font-bold">2500 ml</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Average Intake</p>
                    <p className="text-2xl font-bold">2257 ml</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Goal Achievement</p>
                    <p className="text-2xl font-bold">90%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Progress;
