
import { MainLayout } from "@/components/layout/MainLayout";
import { WorkoutPlanCard } from "@/components/workouts/WorkoutPlanCard";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Video, ClipboardCheck } from "lucide-react";

export default function WorkoutDetail() {
  const { workoutType } = useParams();
  const navigate = useNavigate();
  
  // Workout data based on the images provided
  const workoutPlans = {
    "treino-a": {
      type: "Treino 1A",
      title: "Quadríceps e Glúteos",
      description: "Treino focado em pernas",
      exercises: [
        { id: 1, name: "Agachamento livre", sets: "1x20/1x15/1x10/1x6", reps: "", description: "Série de progressão de carga, inicie a primeira série com uma carga leve (tipo 20 repetições), nas próximas séries vá aumentando a carga e reduzindo as repetições, até chegar na quarta série de 6 repetições, com uma carga bem elevada, mas sem perder a qualidade do movimento." },
        { id: 2, name: "Afundo no smith", sets: "1x20/1x15/1x10/1x6", reps: "", description: "Série de progressão de carga, inicie a primeira série com uma carga leve (tipo 20 repetições), nas próximas séries vá aumentando a carga e reduzindo as repetições, até chegar na quarta série de 6 repetições, com uma carga bem elevada, mas sem perder a qualidade do movimento." },
        { id: 3, name: "Leg Press 45", sets: "3x8/8", reps: "", description: "8 repetições com pés de tamanho de 2 passíveis no baixo, logo a seguir em baixo por 2 segundos, sem descanso faça mais 8 repetições direto (sem pisar da contração em baixo)." },
        { id: 4, name: "Agachamento Sumô x Passadas com halteres", sets: "3x12/30", reps: "", description: "Faça 12 repetições no agachamento sumô, em descanso faça 30 passadas, sendo 15 de cada perna." },
        { id: 5, name: "Cadeira extensora", sets: "3x20", reps: "", description: "Inicie com 20 repetições, descanse 10 segundos, em seguida faça 10 repetições bem lentas (para elevar a carga durante o ciclo)." },
        { id: 6, name: "Máquina abdutora", sets: "6x15", reps: "", description: "6x15 (com intervalo de 30 segundos entre as séries)" },
      ]
    },
    "treino-b": {
      type: "Treino 1B",
      title: "Peito, Ombro e Bíceps",
      description: "Treino focado em parte superior",
      exercises: [
        { id: 1, name: "Supino reto com barra x crucifixo reto com halteres", sets: "3x10/10", reps: "", description: "Faça 10 repetições no supino reto, sem descanso no mesmo banco, faça 10 repetições de crucifixo reto nos halteres." },
        { id: 2, name: "Crucifixo máquina", sets: "3x12", reps: "", description: "" },
        { id: 3, name: "Desenvolvimento com halteres", sets: "1x15/1x12/1x8", reps: "", description: "Série de progressão de carga, inicie a primeira série com uma carga leve (tipo 15 repetições), nas próximas séries vá aumentando a carga e reduzindo as repetições, até chegar na quarta série de 6 repetições, com uma carga bem elevada, mas sem perder a qualidade do movimento." },
        { id: 4, name: "Desenvolvimento arnold + Elevação frontal com halteres", sets: "3x10/10", reps: "", description: "Inicie e saia fazendo 10 repetições de desenvolvimento arnold, sem descanso faça 10 repetições de elevação frontal com halters." },
        { id: 5, name: "Elevação lateral com halteres", sets: "3x DROPSET", reps: "", description: "Comece a série com uma carga elevada, faça o máximo de repetições (de 6 a 10), sem descanso pegue uma carga mais leve e faça o máximo de repetições, sem descanso pegue uma carga mais leve e faça o último set até a falha (utilhe-se, onde 3 séries são sem descanso) repita x 3 drop set." },
        { id: 6, name: "Rosca alternada", sets: "3x10", reps: "", description: "" },
        { id: 7, name: "Rosca 21 com halteres", sets: "7/7/7", reps: "", description: "Comece e saia fazendo 7 repetições de baixo até o metade, em seguida 7 repetições de metade até em cima e por último 7 repetições completas (partindo-se, serão 21 repetições seguidas e uma série)" },
      ]
    },
    "treino-c": {
      type: "Treino 1C",
      title: "Posteriores de Coxa e Panturrilha",
      description: "Treino focado em parte inferior",
      exercises: [
        { id: 1, name: "Mesa flexora", sets: "1x20/1x15/1x10/1x6", reps: "", description: "Série de progressão de carga, inicie a primeira série com uma carga leve (tipo 20 repetições), nas próximas séries vá aumentando a carga e reduzindo as repetições, até chegar na quarta série de 6 repetições, com uma carga bem elevada, mas sem perder a qualidade do movimento." },
        { id: 2, name: "Cadeira flexora", sets: "4x20", reps: "", description: "4x 20 + 10 segundos de isometria no baixo. Faça 20 repetições e na última repetição segure 10 segundos de isometria no baixo." },
        { id: 3, name: "Stiff com barra", sets: "1x15/1x10/1x6", reps: "", description: "Série de progressão de carga, inicie a primeira série com uma carga leve (tipo 15 repetições), nas próximas séries vá aumentando a carga e reduzindo as repetições, até chegar na quarta série de 6 repetições, com uma carga bem elevada, mas sem perder a qualidade do movimento." },
        { id: 4, name: "Flexora unilateral x Stiff unilateral", sets: "3x10/10", reps: "", description: "Faça 10 repetições na flexora unilateral, em seguida faça 10 repetições no stiff unilateral com a mesma perna, depois faça os dois exercícios com a outra perna." },
        { id: 5, name: "Máquina adutora", sets: "4x12", reps: "", description: "" },
        { id: 6, name: "Panturrilha sentada", sets: "1x20/1x15/1x10/1x6", reps: "", description: "Série de progressão de carga, inicie a primeira série com uma carga leve (tipo 20 repetições), nas próximas séries vá aumentando a carga e reduzindo as repetições, até chegar na quarta série de 6 repetições, com uma carga bem elevada, mas sem perder a qualidade do movimento." },
        { id: 7, name: "Panturrilha no smith com step", sets: "4x12", reps: "", description: "Movimento bem lento, desvida em 7 segundos e subida em 7 segundos." }
      ]
    },
    "treino-d": {
      type: "Treino 1D",
      title: "Dorsal, Tríceps e Abdômen",
      description: "Treino focado em parte superior e core",
      exercises: [
        { id: 1, name: "Puxada na frente", sets: "1x20/1x15/1x10/1x6", reps: "", description: "Série de progressão de carga, inicie a primeira série com uma carga leve (tipo 20 repetições), nas próximas séries vá aumentando a carga e reduzindo as repetições, até chegar na quarta série de 6 repetições, com uma carga bem elevada, mas sem perder a qualidade do movimento." },
        { id: 2, name: "Remada baixa com barra triângulo", sets: "3x DROPSET", reps: "", description: "Comece a série com uma carga elevada, faça o máximo de repetições (de 6 a 10), sem descanso pegue uma carga mais leve e faça o máximo de repetições, sem descanso pegue uma carga mais leve e faça o último set até a falha (utilhe-se, onde 3 séries são sem descanso) repita x 3 drop set." },
        { id: 3, name: "Remada unilateral", sets: "3x10", reps: "", description: "3x 10 (com pico de contração). A cada remada segure 2 segundos em cima." },
        { id: 4, name: "Tríceps na polia com barra reta", sets: "3x12", reps: "", description: "" },
        { id: 5, name: "Tríceps testa com halteres x Tríceps francês com halter", sets: "3x10/10", reps: "", description: "Faça o tríceps testa, em seguida (sem descanso) faça o tríceps francês com halter." },
        { id: 6, name: "Tríceps na polia com corda", sets: "1x20/1x15/1x10/1x6", reps: "", description: "Série de progressão de carga, inicie a primeira série com uma carga leve (tipo 20 repetições), nas próximas séries vá aumentando a carga e reduzindo as repetições, até chegar na quarta série de 6 repetições, com uma carga bem elevada, mas sem perder a qualidade do movimento." },
        { id: 7, name: "Abdominal infra com as pernas flexionadas", sets: "3x15", reps: "", description: "" },
        { id: 8, name: "Abdominal supra no banco declinado", sets: "3x15", reps: "", description: "" }
      ]
    }
  };
  
  const workoutKey = workoutType as keyof typeof workoutPlans;
  const workout = workoutPlans[workoutKey];
  
  if (!workout) {
    return (
      <MainLayout>
        <div className="py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Treino não encontrado</h1>
            <Button className="mt-4" onClick={() => navigate("/workouts")}>
              Voltar para Treinos
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <Button 
              variant="outline" 
              className="mb-2"
              onClick={() => navigate("/workouts")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">{workout.type}: {workout.title}</h1>
            <p className="text-muted-foreground">
              {workout.description}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Marcar como concluído
            </Button>
            <Button>
              <Video className="mr-2 h-4 w-4" />
              Enviar vídeo
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <WorkoutPlanCard 
            type={workout.type}
            title={workout.title}
            description={workout.description}
            exercises={workout.exercises}
          />
        </div>
      </div>
    </MainLayout>
  );
}
