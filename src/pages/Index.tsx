
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Dumbbell, GlassWater, BarChart, Video, Calendar, 
  User, ArrowRight, BookOpen, ChevronRight 
} from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">Welcome Back, John!</h1>
            <p className="text-muted-foreground mb-4">
              Here's your fitness summary for today.
            </p>
            <div className="flex gap-3">
              <Button asChild>
                <Link to="/workout" className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4" />
                  Start Workout
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/progress" className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  View Progress
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://picsum.photos/seed/fitness/800/400" 
              alt="Fitness Motivation"
              className="rounded-xl w-full" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Workout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Upper Body</div>
              <p className="text-xs text-muted-foreground">8 exercises • 45 min</p>
              <Button size="sm" variant="ghost" asChild className="mt-2 w-full">
                <Link to="/workout" className="flex items-center justify-between">
                  View Workout <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Hydration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2 / 2.5L</div>
              <p className="text-xs text-muted-foreground">48% of daily goal</p>
              <Button size="sm" variant="ghost" asChild className="mt-2 w-full">
                <Link to="/hydration" className="flex items-center justify-between">
                  Log Water <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Nutrition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1250 / 2200</div>
              <p className="text-xs text-muted-foreground">57% of calorie goal</p>
              <Button size="sm" variant="ghost" asChild className="mt-2 w-full">
                <Link to="/nutrition" className="flex items-center justify-between">
                  Log Meal <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Next Session</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Tomorrow, 10:00</div>
              <p className="text-xs text-muted-foreground">with Coach Michael</p>
              <Button size="sm" variant="ghost" asChild className="mt-2 w-full">
                <Link to="/calendar" className="flex items-center justify-between">
                  View Schedule <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-bold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link to="/profile" className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl flex flex-col items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <User className="h-8 w-8" />
            <span className="font-medium">Profile</span>
          </Link>
          <Link to="/calendar" className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl flex flex-col items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <Calendar className="h-8 w-8" />
            <span className="font-medium">Calendar</span>
          </Link>
          <Link to="/progress" className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl flex flex-col items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <BarChart className="h-8 w-8" />
            <span className="font-medium">Progress</span>
          </Link>
          <Link to="/videos" className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl flex flex-col items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <Video className="h-8 w-8" />
            <span className="font-medium">Videos</span>
          </Link>
        </div>

        <h2 className="text-xl font-bold mb-4">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <img 
              src="https://picsum.photos/seed/nutrition/600/400" 
              alt="Nutrition Tips"
              className="w-full h-48 object-cover rounded-t-lg" 
            />
            <CardHeader>
              <CardTitle>5 Nutrition Tips for Muscle Gain</CardTitle>
              <CardDescription>Learn the best nutrition strategies for building muscle effectively.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="flex items-center gap-1">
                Read More <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <img 
              src="https://picsum.photos/seed/workout/600/400" 
              alt="Workout Tips"
              className="w-full h-48 object-cover rounded-t-lg" 
            />
            <CardHeader>
              <CardTitle>Full Body vs. Split Routines</CardTitle>
              <CardDescription>Which workout style is best for your fitness goals?</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="flex items-center gap-1">
                Read More <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <img 
              src="https://picsum.photos/seed/recovery/600/400" 
              alt="Recovery Tips"
              className="w-full h-48 object-cover rounded-t-lg" 
            />
            <CardHeader>
              <CardTitle>Recovery Strategies for Athletes</CardTitle>
              <CardDescription>How to optimize your recovery for better performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="flex items-center gap-1">
                Read More <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
