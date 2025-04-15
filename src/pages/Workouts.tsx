
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Calendar as CalendarIcon, 
  Clock, 
  Dumbbell, 
  Filter,
  Video, 
  Plus
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Workouts() {
  const navigate = useNavigate();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAddWorkoutDialog, setShowAddWorkoutDialog] = useState(false);

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

  // Get current day of week to determine today's workout
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ...

  // Scheduled workouts for the week
  const scheduledWorkouts = [
    { day: "Segunda", workout: "Treino 1A: Quadríceps e Glúteos", time: "18:00", completed: dayOfWeek > 1, workoutId: "treino-a" },
    { day: "Terça", workout: "Treino 1B: Peito, Ombro e Bíceps", time: "18:00", completed: dayOfWeek > 2, workoutId: "treino-b" },
    { day: "Quarta", workout: "Descanso", time: "", completed: dayOfWeek > 3, workoutId: "" },
    { day: "Quinta", workout: "Treino 1C: Posteriores de Coxa e Panturrilha", time: "18:00", completed: dayOfWeek > 4, workoutId: "treino-c" },
    { day: "Sexta", workout: "Treino 1D: Dorsal, Tríceps e Abdômen", time: "18:00", completed: dayOfWeek > 5, workoutId: "treino-d" },
    { day: "Sábado", workout: "Cardio", time: "10:00", completed: dayOfWeek > 6, workoutId: "" },
    { day: "Domingo", workout: "Descanso", time: "", completed: false, workoutId: "" },
  ];

  // Formatting functions
  const formatCalendarDate = (date: Date) => {
    return format(date, "dd 'de' MMMM", { locale: ptBR });
  };

  // Handle start workout button click
  const startWorkout = (workoutId: string) => {
    if (workoutId) {
      navigate(`/workouts/${workoutId}`);
    }
  };

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
            <Popover open={showCalendar} onOpenChange={setShowCalendar}>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Calendário
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#1e1e1e] border-[#333]" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="bg-[#1e1e1e] text-white"
                />
                <div className="p-3 border-t border-[#333]">
                  <h3 className="font-medium text-white mb-1">
                    {selectedDate ? formatCalendarDate(selectedDate) : "Selecione uma data"}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {selectedDate ? "Treino programado: Treino 1A" : "Nenhuma data selecionada"}
                  </p>
                  {selectedDate && (
                    <Button size="sm" className="mt-2 w-full">Ver treino</Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              <Video className="mr-2 h-4 w-4" />
              Enviar vídeo
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {workoutPlans.map((plan) => (
            <Link key={plan.id} to={`/workouts/${plan.id}`} className="block">
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow bg-gradient-to-br from-[#1e1e1e] to-[#121212] border-[#333] text-white">
                <div className={`h-2 bg-gradient-to-r ${plan.color}`}></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg font-bold">{plan.type}</CardTitle>
                      <p className="font-medium">{plan.title}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                      <Dumbbell className="h-5 w-5 text-purple-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 mb-4">{plan.description}</p>
                  <Button variant="outline" size="sm" className="w-full text-purple-400 border-purple-400/30 hover:bg-purple-400/10">
                    Ver detalhes
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Programação Semanal</h2>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-purple-400"
            onClick={() => setShowAddWorkoutDialog(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Adicionar Treino
          </Button>
        </div>
        
        <Card className="bg-[#1e1e1e] border-[#333] text-white mb-6">
          <CardContent className="p-0">
            <div className="divide-y divide-[#333]">
              {scheduledWorkouts.map((day, idx) => {
                const isToday = idx + 1 === dayOfWeek; // +1 because our array starts with Monday
                
                return (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between p-4 ${day.completed ? 'bg-green-900/20' : ''} ${isToday ? 'bg-purple-900/20' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 
                        ${day.completed ? 'bg-green-900/30 text-green-400' : isToday ? 'bg-purple-900/30 text-purple-400' : 'bg-[#2a2a2a] text-gray-400'}`}
                      >
                        {day.workout === "Descanso" ? (
                          <Clock className="h-5 w-5" />
                        ) : (
                          <Dumbbell className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium flex items-center">
                          {day.day} 
                          {isToday && <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">Hoje</span>}
                        </p>
                        <p className="text-sm text-gray-300">{day.workout}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {day.time && <span className="text-sm mr-4 text-gray-300">{day.time}</span>}
                      {day.completed ? (
                        <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-full">
                          Concluído
                        </span>
                      ) : day.workout !== "Descanso" ? (
                        <Button 
                          size="sm" 
                          variant={isToday ? "default" : "outline"}
                          className={isToday ? "bg-gradient-to-r from-purple-600 to-indigo-600" : ""}
                          onClick={() => startWorkout(day.workoutId)}
                        >
                          {isToday ? "Iniciar" : "Ver"}
                        </Button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            <BarChart3 className="mr-2 h-5 w-5" />
            Ver Relatório de Progresso
          </Button>
        </div>

        {/* Add new workout dialog */}
        <Dialog open={showAddWorkoutDialog} onOpenChange={setShowAddWorkoutDialog}>
          <DialogContent className="bg-[#1e1e1e] text-white border-[#333]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Treino</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="workout-day">Dia da Semana</Label>
                <Select defaultValue="segunda">
                  <SelectTrigger className="bg-[#252525] border-[#333]">
                    <SelectValue placeholder="Selecione o dia" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#252525] border-[#333]">
                    <SelectItem value="segunda">Segunda-feira</SelectItem>
                    <SelectItem value="terca">Terça-feira</SelectItem>
                    <SelectItem value="quarta">Quarta-feira</SelectItem>
                    <SelectItem value="quinta">Quinta-feira</SelectItem>
                    <SelectItem value="sexta">Sexta-feira</SelectItem>
                    <SelectItem value="sabado">Sábado</SelectItem>
                    <SelectItem value="domingo">Domingo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="workout-type">Tipo de Treino</Label>
                <Select defaultValue="treino-a">
                  <SelectTrigger className="bg-[#252525] border-[#333]">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#252525] border-[#333]">
                    <SelectItem value="treino-a">Treino 1A: Quadríceps e Glúteos</SelectItem>
                    <SelectItem value="treino-b">Treino 1B: Peito, Ombro e Bíceps</SelectItem>
                    <SelectItem value="treino-c">Treino 1C: Posteriores e Panturrilha</SelectItem>
                    <SelectItem value="treino-d">Treino 1D: Dorsal, Tríceps e Abdômen</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="workout-time">Horário</Label>
                <Input 
                  id="workout-time" 
                  type="time" 
                  defaultValue="18:00" 
                  className="bg-[#252525] border-[#333]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Adicionar Treino
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
