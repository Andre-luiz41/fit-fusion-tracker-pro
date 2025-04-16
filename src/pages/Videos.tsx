
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, PlayCircle, Check, AlertTriangle, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface VideoEntry {
  id: string;
  title: string;
  date: string;
  status: "pending" | "reviewed" | "analyzing";
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
  
  const [selectedVideo, setSelectedVideo] = useState<VideoEntry | null>(null);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");

  const handleUpload = () => {
    // In a real implementation, this would open a file picker
    setIsUploading(true);
    
    toast({
      title: "Upload Started",
      description: "Your video is being uploaded and processed."
    });
    
    // Simulate adding a new video after upload and analysis
    setTimeout(() => {
      const newVideo = {
        id: String(videos.length + 1),
        title: videoTitle || "New Exercise Form",
        date: new Date().toISOString().split('T')[0],
        status: "analyzing",
        thumbnailUrl: `https://picsum.photos/seed/${Math.random()}/300/200`
      };
      
      setVideos(prev => [...prev, newVideo]);
      
      toast({
        title: "Upload Complete",
        description: "Your video is now being analyzed for form assessment."
      });
      
      // Simulate analysis completion
      setTimeout(() => {
        setVideos(prev => 
          prev.map(video => 
            video.id === newVideo.id 
              ? { ...video, status: "pending" } 
              : video
          )
        );
        
        toast({
          title: "Analysis Complete",
          description: "Your video has been analyzed and is now pending review by your trainer."
        });
        
        setIsUploading(false);
        setVideoTitle("");
      }, 3000);
    }, 2000);
  };

  const handlePlayVideo = (video: VideoEntry) => {
    setSelectedVideo(video);
    setIsVideoDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "reviewed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            <Check size={12} className="mr-1" /> Reviewed
          </Badge>
        );
      case "analyzing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <AlertTriangle size={12} className="mr-1" /> Analyzing
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            <AlertTriangle size={12} className="mr-1" /> Pending Review
          </Badge>
        );
    }
  };

  const handleWhatsAppShare = (videoId: string) => {
    const videoUrl = `https://yourapp.com/videos/${videoId}`;
    const message = encodeURIComponent(`Check out my exercise form: ${videoUrl}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
    
    toast({
      title: "WhatsApp Sharing",
      description: "Opening WhatsApp to share your video"
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Form Review Videos</h1>
          <Button onClick={handleUpload} disabled={isUploading} className="flex items-center gap-2">
            <Upload size={16} />
            {isUploading ? "Uploading..." : "Upload Video"}
          </Button>
        </div>
        
        <div className="mb-6">
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
            <h2 className="text-lg font-medium mb-2">How It Works</h2>
            <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
              <li>Record your exercise form using your phone or camera</li>
              <li>Upload the video for AI-powered form analysis</li>
              <li>Our system automatically detects your movement patterns</li>
              <li>Your trainer reviews the analysis and provides feedback</li>
              <li>Implement the feedback to improve your form and prevent injuries</li>
            </ol>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <div className="relative aspect-video bg-gray-200 overflow-hidden">
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title} 
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                  onClick={() => handlePlayVideo(video)}
                >
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute top-2 right-2">
                  {getStatusBadge(video.status)}
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
              <CardFooter className="pt-0 justify-between">
                <Button 
                  variant="ghost" 
                  className="flex-1 mr-1"
                  onClick={() => handlePlayVideo(video)}
                >
                  <PlayCircle size={16} className="mr-2" />
                  Watch
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MessageSquare size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleWhatsAppShare(video.id)}>
                      Share via WhatsApp
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedVideo?.title}</DialogTitle>
              <DialogDescription>
                Uploaded on {selectedVideo?.date}
              </DialogDescription>
            </DialogHeader>
            
            <div className="aspect-video bg-black rounded-md flex items-center justify-center">
              {/* In a real app, this would be a video player */}
              <div className="text-center">
                <PlayCircle className="w-16 h-16 text-white/50 mx-auto mb-2" />
                <p className="text-white/70">Video playback would appear here</p>
              </div>
            </div>
            
            {selectedVideo?.feedback && (
              <div className="mt-4">
                <h3 className="font-medium mb-1">Trainer Feedback</h3>
                <p className="text-muted-foreground">{selectedVideo.feedback}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Videos;
