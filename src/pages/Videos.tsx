
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, PlayCircle, Check, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VideoEntry {
  id: string;
  title: string;
  date: string;
  status: "pending" | "reviewed";
  thumbnailUrl: string;
  feedback?: string;
}

const Videos = () => {
  const { toast } = useToast();
  const [videos, setVideos] = useState<VideoEntry[]>([
    {
      id: "1",
      title: "Squat Form Check",
      date: "2025-04-15",
      status: "reviewed",
      thumbnailUrl: "https://picsum.photos/seed/squat/300/200",
      feedback: "Good depth, but watch your knee alignment. Try to keep them in line with your toes."
    },
    {
      id: "2",
      title: "Deadlift Technique",
      date: "2025-04-16",
      status: "pending",
      thumbnailUrl: "https://picsum.photos/seed/deadlift/300/200"
    }
  ]);

  const handleUpload = () => {
    // In a real implementation, this would open a file picker
    toast({
      title: "Upload Started",
      description: "Your video is being uploaded and processed."
    });
    
    // Simulate adding a new video after upload
    setTimeout(() => {
      setVideos(prev => [
        ...prev,
        {
          id: String(prev.length + 1),
          title: "New Exercise Form",
          date: new Date().toISOString().split('T')[0],
          status: "pending",
          thumbnailUrl: `https://picsum.photos/seed/${Math.random()}/300/200`
        }
      ]);
      
      toast({
        title: "Upload Complete",
        description: "Your video has been uploaded successfully and is pending review."
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Form Review Videos</h1>
          <Button onClick={handleUpload} className="flex items-center gap-2">
            <Upload size={16} />
            Upload Video
          </Button>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Record your exercise form and upload it here for your trainer to review and provide feedback.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <div className="relative aspect-video bg-gray-200 overflow-hidden">
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <PlayCircle className="w-12 h-12 text-white cursor-pointer" />
                </div>
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                  video.status === "reviewed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                }`}>
                  {video.status === "reviewed" ? <Check size={12} /> : <AlertTriangle size={12} />}
                  {video.status === "reviewed" ? "Reviewed" : "Pending Review"}
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{video.title}</CardTitle>
                <CardDescription>Uploaded on {video.date}</CardDescription>
              </CardHeader>
              {video.feedback && (
                <CardContent className="pt-0">
                  <h4 className="text-sm font-medium mb-1">Trainer Feedback:</h4>
                  <p className="text-sm text-muted-foreground">{video.feedback}</p>
                </CardContent>
              )}
              <CardFooter className="pt-0">
                <Button variant="ghost" className="w-full">
                  <PlayCircle size={16} className="mr-2" />
                  Watch Video
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Videos;
