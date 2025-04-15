
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Calendar, Clock, Dumbbell, Filter, Video } from "lucide-react";
import { Link } from "react-router-dom";

export default function Workouts() {
  // All workout plans
  const workoutPlans = [
    {
      id: "treino-a",
      type: "Treino 1A",
      title: "Quadríceps e Glúteos",
      description: "Série de exercícios para quadríceps e glúteos",
      color: "from-pink-600 to-purple-600"
    },
    {
      id: "treino-b",
      type: "Treino 1B",
      title: "Peito, Ombro e Bíceps",
      description: "Série de exercícios para parte superior",
      color: "from-blue-600 to-purple-600"
    },
    {
      id: "treino-c",
      type: "Treino 1C",
      title: "Posteriores de Coxa e Panturrilha",
      description: "Foco em posteriores e panturrilha",
      color: "from-green-600 to-blue-600"
    },
    {
      id: "treino-d",
      type: "Treino 1D",
      title: "Dorsal, Tríceps e Abdômen",
      description: "Trabalho para costas, tríceps e abdômen",
      color: "from-red-600 to-orange-600"
    }
  ];

  // Scheduled workouts for the week
  const scheduledWorkouts = [
    { day: "Segunda", workout: "Treino 1A: Quadríceps e Glúteos", time: "18:00", completed: true },
    { day: "Terça", workout: "Treino 1B: Peito, Ombro e Bíceps", time: "18:00", completed: false },
    { day: "Quarta", workout: "Descanso", time: "", completed: false },
    { day: "Quinta", workout: "Treino 1C: Posteriores de Coxa e Panturrilha", time: "18:00", completed: false },
    { day: "Sexta", workout: "Treino 1D: Dorsal, Tríceps e Abdômen", time: "18:00", completed: false },
    { day: "Sábado", workout: "Cardio", time: "10:00", completed: false },
    { day: "Domingo", workout: "Descanso", time: "", completed: false },
  ];

  return (
    <MainLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Treinos</h1>
            <p className="text-muted-foreground">
              Plano de treino personalizado
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Cronograma
            </Button>
            <Button>
              <Video className="mr-2 h-4 w-4" />
              Enviar vídeo
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {workoutPlans.map((plan) => (
            <Link key={plan.id} to={`/workouts/${plan.id}`} className="block">
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className={`h-2 bg-gradient-to-r ${plan.color}`}></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg font-bold">{plan.type}</CardTitle>
                      <p className="font-medium">{plan.title}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-fitness-primary/10 flex items-center justify-center">
                      <Dumbbell className="h-5 w-5 text-fitness-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Ver detalhes
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-bold mb-4">Programação Semanal</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {scheduledWorkouts.map((day, idx) => (
                <div key={idx} className={`flex items-center justify-between p-4 ${day.completed ? 'bg-green-50' : ''}`}>
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${day.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                      {day.workout === "Descanso" ? (
                        <Clock className="h-5 w-5" />
                      ) : (
                        <Dumbbell className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{day.day}</p>
                      <p className="text-sm text-muted-foreground">{day.workout}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {day.time && <span className="text-sm mr-4">{day.time}</span>}
                    {day.completed ? (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        Concluído
                      </span>
                    ) : day.workout !== "Descanso" ? (
                      <Button size="sm" variant="outline">
                        {day.day === "Hoje" ? "Iniciar" : "Ver"}
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center">
          <Button size="lg">
            <BarChart3 className="mr-2 h-5 w-5" />
            Ver Relatório de Progresso
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
