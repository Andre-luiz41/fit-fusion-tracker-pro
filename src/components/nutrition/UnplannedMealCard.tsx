
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pizza } from "lucide-react";

export function UnplannedMealCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Adicionar Refeição Fora do Plano</CardTitle>
        <CardDescription>Fast-food ou refeições não planejadas</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center py-6">
        <Button className="w-full">
          <Pizza className="h-4 w-4 mr-2" />
          Registrar Refeição Não Planejada
        </Button>
      </CardContent>
    </Card>
  );
}
