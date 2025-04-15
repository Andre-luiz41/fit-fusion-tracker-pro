
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Dumbbell, Filter, Play, Plus, Timer, Video } from "lucide-react";

// Tipos de dados
interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  rest: number; // em segundos
  videoUrl?: string;
  technique?: string;
}

interface Workout {
  id: number;
  day: string;
  title: string;
  target: string;
  duration: number;
  exercises: Exercise[];
}

export default function Workouts() {
  // Dados de exemplo
  const workouts: Workout[] = [
    {
      id: 1,
      day: "Segunda-feira",
      title: "Treino de Peito e Tríceps",
      target: "Hipertrofia",
      duration: 60,
      exercises: [
        { id: 1, name: "Supino Reto", sets: 4, reps: 12, rest: 60, videoUrl: "#", technique: "Mantenha os cotovelos a 45 graus do corpo" },
        { id: 2, name: "Supino Inclinado", sets: 3, reps: 10, rest: 60, videoUrl: "#" },
        { id: 3, name: "Crucifixo com Halteres", sets: 3, reps: 15, rest: 45 },
        { id: 4, name: "Tríceps Corda", sets: 4, reps: 12, rest: 45, videoUrl: "#" },
        { id: 5, name: "Tríceps Francês", sets: 3, reps: 12, rest: 45 }
      ]
    },
    {
      id: 2,
      day: "Terça-feira",
      title: "Treino de Pernas",
      target: "Força",
      duration: 70,
      exercises: [
        { id: 6, name: "Agachamento Livre", sets: 4, reps: 10, rest: 90, videoUrl: "#", technique: "Mantenha o peito para cima e joelhos alinhados com os pés" },
        { id: 7, name: "Leg Press", sets: 4, reps: 12, rest: 75 },
        { id: 8, name: "Cadeira Extensora", sets: 3, reps: 15, rest: 60 },
        { id: 9, name: "Cadeira Flexora", sets: 3, reps: 15, rest: 60, videoUrl: "#" },
        { id: 10, name: "Panturrilha em Pé", sets: 4, reps: 20, rest: 45 }
      ]
    },
    {
      id: 3,
      day: "Quinta-feira",
      title: "Treino de Costas e Bíceps",
      target: "Hipertrofia",
      duration: 65,
      exercises: [
        { id: 11, name: "Puxada Frontal", sets: 4, reps: 12, rest: 60, videoUrl: "#" },
        { id: 12, name: "Remada Baixa", sets: 4, reps: 12, rest: 60 },
        { id: 13, name: "Remada Curvada", sets: 3, reps: 10, rest: 60, videoUrl: "#", technique: "Mantenha as costas retas e puxe com os cotovelos" },
        { id: 14, name: "Rosca Direta", sets: 3, reps: 12, rest: 45 },
        { id: 15, name: "Rosca Martelo", sets: 3, reps: 12, rest: 45, videoUrl: "#" }
      ]
    },
    {
      id: 4,
      day: "Sexta-feira",
      title: "Treino de Ombros",
      target: "Definição",
      duration: 55,
      exercises: [
        { id: 16, name: "Desenvolvimento com Halteres", sets: 4, reps: 10, rest: 60, videoUrl: "#" },
        { id: 17, name: "Elevação Lateral", sets: 4, reps: 12, rest: 45, technique: "Cotovelos levemente flexionados, sem impulso" },
        { id: 18, name: "Elevação Frontal", sets: 3, reps: 12, rest: 45 },
        { id: 19, name: "Face Pull", sets: 3, reps: 15, rest: 45, videoUrl: "#" },
        { id: 20, name: "Encolhimento de Ombros", sets: 3, reps: 15, rest: 45 }
      ]
    },
    {
      id: 5,
      day: "Sábado",
      title: "Treino Funcional",
      target: "Resistência",
      duration: 45,
      exercises: [
        { id: 21, name: "Burpees", sets: 3, reps: 15, rest: 45, videoUrl: "#" },
        { id: 22, name: "Mountain Climbers", sets: 3, reps: 20, rest: 30 },
        { id: 23, name: "Jumping Jacks", sets: 3, reps: 30, rest: 30 },
        { id: 24, name: "Pranchas", sets: 3, reps: 30, rest: 45, technique: "Mantenha o core contraído e o quadril alinhado" },
        { id: 25, name: "Agachamento com Salto", sets: 3, reps: 15, rest: 45, videoUrl: "#" }
      ]
    }
  ];

  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  
  return (
    <MainLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meus Treinos</h1>
            <p className="text-muted-foreground">
              Plano avançado • Semana 3 de 12
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Ver calendário
            </Button>
          </div>
        </div>

        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="weekly">Treinos da Semana</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="custom">Treinos Personalizados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workouts.map((workout) => (
                <Card key={workout.id} onClick={() => setSelectedWorkout(workout)} className="cursor-pointer hover:border-fitness-primary transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base font-medium">{workout.title}</CardTitle>
                        <CardDescription>{workout.day}</CardDescription>
                      </div>
                      <div className="flex items-center text-fitness-primary text-sm font-medium">
                        <span className="rounded-full bg-fitness-primary/10 p-1">
                          <Dumbbell className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{workout.duration} minutos</span>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-fitness-secondary/10 text-fitness-secondary">
                        {workout.target}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {workout.exercises.slice(0, 3).map((exercise, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{exercise.name}</span>
                          <span className="text-muted-foreground">{exercise.sets} × {exercise.reps}</span>
                        </div>
                      ))}
                      
                      {workout.exercises.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          +{workout.exercises.length - 3} exercícios
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant="default"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Iniciar treino
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="m-0">
            <div className="flex items-center justify-center h-40 border rounded-lg bg-muted/10">
              <p className="text-muted-foreground">Histórico de treinos será exibido aqui</p>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="m-0">
            <div className="flex flex-col items-center justify-center h-60 border rounded-lg bg-muted/10 p-4 text-center">
              <Dumbbell className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Crie seu próprio treino</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Personalize seus exercícios, séries e repetições para criar um treino que atenda seus objetivos específicos.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Criar treino personalizado
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {selectedWorkout && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedWorkout.title}</h2>
                <p className="text-muted-foreground">{selectedWorkout.day} • {selectedWorkout.duration} minutos</p>
              </div>
              <Button>
                <Play className="h-4 w-4 mr-2" />
                Iniciar treino
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lista de Exercícios</CardTitle>
                <CardDescription>Completos com detalhes técnicos e vídeos demonstrativos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {selectedWorkout.exercises.map((exercise, index) => (
                    <div key={exercise.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-fitness-primary/10 flex items-center justify-center mr-3">
                            <span className="font-bold text-fitness-primary">{index + 1}</span>
                          </div>
                          <span className="font-medium">{exercise.name}</span>
                        </div>
                        <div className="flex gap-2">
                          {exercise.videoUrl && (
                            <Button variant="ghost" size="sm" className="text-fitness-primary">
                              <Video className="h-4 w-4 mr-1" />
                              Ver vídeo
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 ml-11 text-sm">
                        <div className="flex items-center">
                          <Dumbbell className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span><strong>{exercise.sets}</strong> séries × <strong>{exercise.reps}</strong> repetições</span>
                        </div>
                        <div className="flex items-center">
                          <Timer className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span><strong>{exercise.rest}</strong> segundos de descanso</span>
                        </div>
                      </div>
                      
                      {exercise.technique && (
                        <div className="mt-2 ml-11 bg-muted/30 p-3 rounded-md text-sm">
                          <p className="font-medium mb-1">Técnica:</p>
                          <p className="text-muted-foreground">{exercise.technique}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
