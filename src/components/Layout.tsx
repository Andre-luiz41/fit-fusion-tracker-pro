
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Menu, Home, Calendar, Dumbbell, Video, User, 
  BarChart, GlassWater, Pill, MessageCircle 
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
  { path: "/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
  { path: "/calendar", label: "Calendar", icon: <Calendar className="h-5 w-5" /> },
  { path: "/workout", label: "Workout", icon: <Dumbbell className="h-5 w-5" /> },
  { path: "/hydration", label: "Hydration", icon: <GlassWater className="h-5 w-5" /> },
  { path: "/progress", label: "Progress", icon: <BarChart className="h-5 w-5" /> },
  { path: "/supplements", label: "Supplements", icon: <Pill className="h-5 w-5" /> },
  { path: "/chat", label: "Chat", icon: <MessageCircle className="h-5 w-5" /> },
  { path: "/videos", label: "Videos", icon: <Video className="h-5 w-5" /> },
];

export function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="px-7">
                <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
                  <span className="font-bold text-xl">FitApp</span>
                </Link>
              </div>
              <div className="flex flex-col gap-4 my-4 px-2">
                <div className="flex items-center gap-2 px-4">
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/user/200" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                  </div>
                </div>
              </div>
              <nav className="grid gap-2 px-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                      isActive(item.path)
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-2 ml-2">
            <span className="font-bold text-xl">FitApp</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Link to="/profile">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/seed/user/200" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-60 lg:flex-col bg-sidebar border-r">
        <div className="flex flex-col space-y-4 py-4">
          <Link to="/" className="flex items-center gap-2 px-4 py-2">
            <span className="font-bold text-xl">FitApp</span>
          </Link>
          <div className="flex items-center gap-2 px-4">
            <Avatar>
              <AvatarImage src="https://picsum.photos/seed/user/200" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>
          <nav className="grid gap-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                  isActive(item.path)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:pl-60">
        {children}
      </main>
    </div>
  );
}
