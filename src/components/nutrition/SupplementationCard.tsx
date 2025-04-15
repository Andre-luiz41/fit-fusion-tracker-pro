
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Egg } from "lucide-react";

export function SupplementationCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Suplementação</CardTitle>
        <CardDescription>Recomendações diárias</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-fitness-primary/10 flex items-center justify-center mr-3">
                <Egg className="h-4 w-4 text-fitness-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Whey Protein</p>
                <p className="text-xs text-muted-foreground">2 doses diárias</p>
              </div>
            </div>
            <span className="text-xs bg-fitness-primary/10 text-fitness-primary px-2 py-1 rounded-full">
              45g
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-fitness-primary/10 flex items-center justify-center mr-3">
                <Egg className="h-4 w-4 text-fitness-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Creatina</p>
                <p className="text-xs text-muted-foreground">1 dose diária</p>
              </div>
            </div>
            <span className="text-xs bg-fitness-primary/10 text-fitness-primary px-2 py-1 rounded-full">
              5g
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-fitness-primary/10 flex items-center justify-center mr-3">
                <Egg className="h-4 w-4 text-fitness-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">BCAA</p>
                <p className="text-xs text-muted-foreground">Durante treino</p>
              </div>
            </div>
            <span className="text-xs bg-fitness-primary/10 text-fitness-primary px-2 py-1 rounded-full">
              10g
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <Plus className="h-4 w-4 mr-1" />
          Gerenciar Suplementos
        </Button>
      </CardFooter>
    </Card>
  );
}
