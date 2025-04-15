
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Camera, 
  CheckCircle2, 
  Clock, 
  Download, 
  MessageSquare, 
  ThumbsUp, 
  Upload, 
  Video,
  Filter,
  Clock4
} from "lucide-react";

// Tipos de dados
interface VideoSubmission {
  id: number;
  title: string;
  exercise: string;
  date: string;
  thumbnail: string;
  duration: string;
  status: "pending" | "reviewed" | "feedback";
  feedback?: {
    rating: number;
    comment: string;
    timestamp: string;
  };
}

interface VideoTutorial {
  id: number;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  views: number;
}

export default function Videos() {
  // Dados de exemplo
  const submissions: VideoSubmission[] = [
    {
      id: 1,
      title: "Supino reto com barra",
      exercise: "Peito",
      date: "2023-05-10T14:30:00",
      thumbnail: "https://placehold.co/400x250/3B82F6/white?text=Supino+Reto",
      duration: "0:48",
      status: "reviewed",
      feedback: {
        rating: 4,
        comment: "Boa execução! Tente manter os cotovelos um pouco mais próximos ao corpo para proteger os ombros.",
        timestamp: "2023-05-11T10:15:00"
      }
    },
    {
      id: 2,
      title: "Agachamento livre",
      exercise: "Pernas",
      date: "2023-05-12T16:45:00",
      thumbnail: "https://placehold.co/400x250/3B82F6/white?text=Agachamento",
      duration: "1:12",
      status: "feedback",
      feedback: {
        rating: 3,
        comment: "Precisa melhorar a profundidade do agachamento. Tente descer até que suas coxas fiquem paralelas ao chão.",
        timestamp: "2023-05-13T09:30:00"
      }
    },
    {
      id: 3,
      title: "Rosca direta com barra",
      exercise: "Bíceps",
      date: "2023-05-15T18:20:00",
      thumbnail: "https://placehold.co/400x250/3B82F6/white?text=Rosca+Direta",
      duration: "0:55",
      status: "pending"
    },
  ];

  const tutorials: VideoTutorial[] = [
    {
      id: 1,
      title: "Como fazer supino corretamente",
      category: "Técnica",
      duration: "5:32",
      thumbnail: "https://placehold.co/400x250/10B981/white?text=Tutorial+Supino",
      views: 1240
    },
    {
      id: 2,
      title: "Guia completo de agachamento",
      category: "Técnica",
      duration: "8:15",
      thumbnail: "https://placehold.co/400x250/10B981/white?text=Guia+Agachamento",
      views: 2356
    },
    {
      id: 3,
      title: "Treino de costas para iniciantes",
      category: "Rotina",
      duration: "12:45",
      thumbnail: "https://placehold.co/400x250/10B981/white?text=Treino+Costas",
      views: 1876
    },
    {
      id: 4,
      title: "Melhores exercícios para ombros",
      category: "Rotina",
      duration: "7:20",
      thumbnail: "https://placehold.co/400x250/10B981/white?text=Exercícios+Ombros",
      views: 945
    },
    {
      id: 5,
      title: "Como evitar lesões no treino",
      category: "Saúde",
      duration: "10:30",
      thumbnail: "https://placehold.co/400x250/10B981/white?text=Prevenção+Lesões",
      views: 3210
    },
    {
      id: 6,
      title: "Dieta para ganho de massa",
      category: "Nutrição",
      duration: "15:18",
      thumbnail: "https://placehold.co/400x250/10B981/white?text=Dieta+Massa",
      views: 4589
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState<VideoSubmission | null>(null);
  
  return (
    <MainLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vídeos</h1>
            <p className="text-muted-foreground">
              Envie seus treinos e receba feedback do seu instrutor
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Enviar novo vídeo
            </Button>
          </div>
        </div>

        <Tabs defaultValue="myvideos" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="myvideos">Meus Vídeos</TabsTrigger>
            <TabsTrigger value="tutorials">Tutoriais</TabsTrigger>
            <TabsTrigger value="feedback">Feedback (2)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="myvideos" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video relative flex items-center justify-center bg-muted rounded-t-lg border-b">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-medium">Enviar Novo Vídeo</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Compartilhe seu treino e receba feedback do instrutor
                    </p>
                    <Button className="w-full mt-4">
                      <Camera className="mr-2 h-4 w-4" />
                      Gravar ou Enviar
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {submissions.map((video) => (
                <Card key={video.id} onClick={() => setSelectedVideo(video)} className="cursor-pointer hover:border-fitness-primary transition-colors">
                  <CardContent className="p-0">
                    <div className="aspect-video relative group rounded-t-lg overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Video className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                        {video.duration}
                      </div>
                      
                      {video.status === "pending" && (
                        <div className="absolute top-2 right-2 bg-yellow-500 px-2 py-1 rounded-full text-xs text-white flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Pendente
                        </div>
                      )}
                      
                      {video.status === "reviewed" && (
                        <div className="absolute top-2 right-2 bg-green-500 px-2 py-1 rounded-full text-xs text-white flex items-center">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Revisado
                        </div>
                      )}
                      
                      {video.status === "feedback" && (
                        <div className="absolute top-2 right-2 bg-fitness-primary px-2 py-1 rounded-full text-xs text-white flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Feedback
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1">{video.title}</h3>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{video.exercise}</span>
                        <span className="text-muted-foreground">
                          {new Date(video.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      
                      {video.status === "reviewed" || video.status === "feedback" ? (
                        <div className="mt-3 flex items-center">
                          <div className="flex-1 mr-2">
                            <Progress value={video.feedback?.rating ? (video.feedback.rating / 5) * 100 : 0} className="h-1" />
                          </div>
                          <span className="text-xs font-medium">
                            {video.feedback?.rating}/5
                          </span>
                        </div>
                      ) : (
                        <div className="mt-3 text-xs text-muted-foreground italic">
                          Aguardando análise do instrutor...
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tutorials" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tutorials.map((tutorial) => (
                <Card key={tutorial.id} className="cursor-pointer hover:border-fitness-secondary transition-colors">
                  <CardContent className="p-0">
                    <div className="aspect-video relative group rounded-t-lg overflow-hidden">
                      <img 
                        src={tutorial.thumbnail} 
                        alt={tutorial.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Video className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                        {tutorial.duration}
                      </div>
                      <div className="absolute top-2 right-2 bg-fitness-secondary px-2 py-1 rounded-full text-xs text-white">
                        {tutorial.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1">{tutorial.title}</h3>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground flex items-center">
                          <Clock4 className="h-3 w-3 mr-1" />
                          {tutorial.duration}
                        </span>
                        <span className="text-muted-foreground">
                          {tutorial.views.toLocaleString()} visualizações
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="feedback" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {submissions
                .filter(video => video.status === "feedback" || video.status === "reviewed")
                .map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 aspect-video relative">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                          {video.duration}
                        </div>
                      </div>
                      
                      <div className="p-4 md:w-2/3">
                        <h3 className="font-medium mb-1">{video.title}</h3>
                        <div className="flex justify-between items-center text-sm mb-3">
                          <span className="text-muted-foreground">{video.exercise}</span>
                          <span className="text-muted-foreground">
                            {new Date(video.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          <div className="flex-1 mr-2">
                            <Progress value={video.feedback?.rating ? (video.feedback.rating / 5) * 100 : 0} className="h-2" />
                          </div>
                          <span className="text-sm font-medium">
                            {video.feedback?.rating}/5
                          </span>
                        </div>
                        
                        <div className="bg-muted/30 p-3 rounded-md mb-3">
                          <p className="text-sm font-medium mb-1">Feedback do instrutor:</p>
                          <p className="text-sm text-muted-foreground">{video.feedback?.comment}</p>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <Button variant="outline" size="sm">
                            <Video className="h-4 w-4 mr-1" />
                            Ver vídeo
                          </Button>
                          <Button variant="ghost" size="sm" className="text-fitness-primary">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Agradecer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {selectedVideo && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedVideo.title}</CardTitle>
                    <CardDescription>
                      Enviado em {new Date(selectedVideo.date).toLocaleDateString('pt-BR')} • {selectedVideo.exercise}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedVideo(null)}>
                    Fechar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-black rounded-md overflow-hidden">
                  <img 
                    src={selectedVideo.thumbnail} 
                    alt={selectedVideo.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {selectedVideo.status !== "pending" && selectedVideo.feedback && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Feedback do Instrutor</h3>
                    <div className="bg-muted/30 p-4 rounded-md">
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Avaliação:</span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div 
                                key={i} 
                                className={`h-5 w-5 ${i < selectedVideo.feedback!.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                              >
                                ★
                              </div>
                            ))}
                          </div>
                        </div>
                        <span className="ml-2 text-sm text-muted-foreground">
                          {selectedVideo.feedback.rating}/5
                        </span>
                      </div>
                      
                      <p className="text-sm mb-2 font-medium">Comentário:</p>
                      <p className="text-muted-foreground">{selectedVideo.feedback.comment}</p>
                      
                      <div className="mt-3 text-xs text-muted-foreground">
                        Feedback fornecido em {new Date(selectedVideo.feedback.timestamp).toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedVideo.status === "pending" && (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                      <h3 className="text-lg font-medium">Aguardando Análise</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Seu vídeo está na fila para análise. Você receberá uma notificação quando o instrutor fornecer feedback.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Baixar Vídeo
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-1" />
                    Enviar Novo
                  </Button>
                  <Button size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Perguntar ao Instrutor
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
