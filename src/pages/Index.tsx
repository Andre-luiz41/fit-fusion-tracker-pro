
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { DailyWorkoutCard } from "@/components/dashboard/DailyWorkoutCard";
import { NutritionCard } from "@/components/dashboard/NutritionCard";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { VideoUploadCard } from "@/components/dashboard/VideoUploadCard";
import { WaterIntakeCard } from "@/components/dashboard/WaterIntakeCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronRight, Dumbbell, MessageSquare, User, Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const weekdays = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export default function Index() {
  const today = new Date();
  const currentDayIndex = today.getDay();
  const currentDayName = weekdays[currentDayIndex];
  
  // Dados de exemplo
  const workouts = [
    {
      day: "Segunda-feira",
      title: "Treino de Peito e Tríceps",
      duration: 60,
      exercises: [
        { name: "Supino Reto", sets: 4, reps: 12, rest: 60 },
        { name: "Supino Inclinado", sets: 3, reps: 10, rest: 60 },
        { name: "Crucifixo com Halteres", sets: 3, reps: 15, rest: 45 },
        { name: "Tríceps Corda", sets: 4, reps: 12, rest: 45 },
        { name: "Tríceps Francês", sets: 3, reps: 12, rest: 45 }
      ],
      completed: currentDayIndex > 1 || (currentDayIndex === 1 && today.getHours() >= 19)
    },
    {
      day: "Terça-feira",
      title: "Treino de Pernas",
      duration: 70,
      exercises: [
        { name: "Agachamento Livre", sets: 4, reps: 10, rest: 90 },
        { name: "Leg Press", sets: 4, reps: 12, rest: 75 },
        { name: "Cadeira Extensora", sets: 3, reps: 15, rest: 60 },
        { name: "Cadeira Flexora", sets: 3, reps: 15, rest: 60 },
        { name: "Panturrilha em Pé", sets: 4, reps: 20, rest: 45 }
      ],
      completed: currentDayIndex > 2 || (currentDayIndex === 2 && today.getHours() >= 19)
    },
    {
      day: "Quarta-feira",
      title: "Descanso Ativo",
      duration: 30,
      exercises: [
        { name: "Alongamentos", sets: 1, reps: 10, rest: 30 },
        { name: "Caminhada Leve", sets: 1, reps: 1, rest: 0 }
      ],
      completed: currentDayIndex > 3 || (currentDayIndex === 3 && today.getHours() >= 19)
    },
    {
      day: "Quinta-feira",
      title: "Treino de Costas e Bíceps",
      duration: 65,
      exercises: [
        { name: "Puxada Frontal", sets: 4, reps: 12, rest: 60 },
        { name: "Remada Baixa", sets: 4, reps: 12, rest: 60 },
        { name: "Remada Curvada", sets: 3, reps: 10, rest: 60 },
        { name: "Rosca Direta", sets: 3, reps: 12, rest: 45 },
        { name: "Rosca Martelo", sets: 3, reps: 12, rest: 45 }
      ],
      completed: currentDayIndex > 4 || (currentDayIndex === 4 && today.getHours() >= 19)
    },
    {
      day: "Sexta-feira",
      title: "Treino de Ombros",
      duration: 55,
      exercises: [
        { name: "Desenvolvimento com Halteres", sets: 4, reps: 10, rest: 60 },
        { name: "Elevação Lateral", sets: 4, reps: 12, rest: 45 },
        { name: "Elevação Frontal", sets: 3, reps: 12, rest: 45 },
        { name: "Face Pull", sets: 3, reps: 15, rest: 45 },
        { name: "Encolhimento de Ombros", sets: 3, reps: 15, rest: 45 }
      ],
      completed: currentDayIndex > 5 || (currentDayIndex === 5 && today.getHours() >= 19)
    },
    {
      day: "Sábado",
      title: "Treino Funcional",
      duration: 45,
      exercises: [
        { name: "Burpees", sets: 3, reps: 15, rest: 45 },
        { name: "Mountain Climbers", sets: 3, reps: 20, rest: 30 },
        { name: "Jumping Jacks", sets: 3, reps: 30, rest: 30 },
        { name: "Pranchas", sets: 3, reps: 30, rest: 45 },
        { name: "Agachamento com Salto", sets: 3, reps: 15, rest: 45 }
      ],
      completed: currentDayIndex > 6 || (currentDayIndex === 6 && today.getHours() >= 19)
    },
    {
      day: "Domingo",
      title: "Descanso Total",
      duration: 0,
      exercises: [],
      completed: currentDayIndex === 0
    },
  ];

  const meals = [
    { time: "07:00", name: "Café da manhã", calories: 450, consumed: true },
    { time: "10:00", name: "Lanche da manhã", calories: 200, consumed: true },
    { time: "13:00", name: "Almoço", calories: 650, consumed: today.getHours() > 13 },
    { time: "16:00", name: "Lanche da tarde", calories: 250, consumed: today.getHours() > 16 },
    { time: "19:30", name: "Jantar", calories: 550, consumed: today.getHours() > 19 },
  ];

  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);
  const consumedCalories = meals
    .filter(meal => meal.consumed)
    .reduce((acc, meal) => acc + meal.calories, 0);

  return (
    <MainLayout>
      <div className="flex items-center justify-between py-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Olá, Atleta!</h1>
          <p className="text-muted-foreground">
            Hoje é {currentDayName}, {today.getDate()} de {today.toLocaleString('pt-BR', { month: 'long' })}
          </p>
        </div>
        <div className="hidden md:flex gap-2">
          <Button>
            <Video className="mr-2 h-4 w-4" />
            Agendar videochamada
          </Button>
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat com instrutor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <ProgressCard
          title="Progresso Semanal"
          value={5}
          maxValue={7}
          description="Treinos completados"
          variant="default"
        />
        <ProgressCard
          title="Calorias Diárias"
          value={consumedCalories}
          maxValue={totalCalories}
          variant="success"
          suffix=" kcal"
        />
        <ProgressCard
          title="Hidratação"
          value={1800}
          maxValue={2500}
          variant="warning"
          suffix=" ml"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="today" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="today">Hoje</TabsTrigger>
                <TabsTrigger value="week">Semana</TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
                Ver Calendário Completo
                <Calendar className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <TabsContent value="today" className="m-0">
              <DailyWorkoutCard {...workouts[currentDayIndex]} />
            </TabsContent>
            
            <TabsContent value="week" className="m-0 grid grid-cols-1 md:grid-cols-2 gap-4">
              {workouts.map((workout, index) => (
                <DailyWorkoutCard key={index} {...workout} />
              ))}
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Seu Plano de Treino</CardTitle>
              <CardDescription>Avançado • Semana 3 de 12</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-fitness-primary/10 flex items-center justify-center mr-3">
                    <Dumbbell className="h-5 w-5 text-fitness-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Ganho de Massa Muscular</p>
                    <p className="text-sm text-muted-foreground">5 treinos por semana</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Detalhes
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg
                      className="h-4 w-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Próxima mudança de treino:</span> Em 3 semanas
                  </p>
                </div>
                
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Reavaliação física:</span> 15 de maio
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <NutritionCard
            date={today.toISOString()}
            meals={meals}
            totalCalories={totalCalories}
            consumedCalories={consumedCalories}
          />
          
          <WaterIntakeCard goal={2500} current={1800} />
          
          <VideoUploadCard />
        </div>
      </div>
    </MainLayout>
  );
}
