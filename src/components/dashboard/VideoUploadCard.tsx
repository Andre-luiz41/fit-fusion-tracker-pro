
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Upload } from "lucide-react";

export function VideoUploadCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Enviar vídeo</CardTitle>
            <CardDescription>Receba feedback do seu instrutor</CardDescription>
          </div>
          <div className="h-10 w-10 rounded-full bg-fitness-accent/10 flex items-center justify-center">
            <Video className="h-5 w-5 text-fitness-accent" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-6">
        <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg p-6 bg-muted/50">
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm font-medium mb-1">Arraste e solte seu vídeo aqui</p>
          <p className="text-xs text-muted-foreground mb-4">Suporte para MP4, MOV até 100MB</p>
          <Button size="sm">Selecionar arquivo</Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">Seus últimos uploads aparecerão na guia Vídeos</p>
      </CardFooter>
    </Card>
  );
}
