
import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
      <div className="mb-6 rounded-full bg-fitness-primary/10 p-6">
        <Dumbbell className="h-16 w-16 text-fitness-primary" />
      </div>
      
      <h1 className="text-4xl font-bold mb-2">Página não encontrada</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Ops! Parece que você se perdeu durante o treino.
      </p>
      
      <Button size="lg" onClick={() => navigate("/")}>
        Voltar para o início
      </Button>
    </div>
  );
}
