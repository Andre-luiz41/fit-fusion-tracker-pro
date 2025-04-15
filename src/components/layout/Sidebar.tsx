
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { 
  BarChart3, 
  Calendar, 
  Dumbbell, 
  Home, 
  Menu, 
  MessageSquare, 
  User, 
  Utensils, 
  Video, 
  X,
  Droplets,
  PieChart
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/",
    },
    {
      label: "Meu Perfil",
      icon: User,
      href: "/profile",
    },
    {
      label: "Treinos",
      icon: Dumbbell,
      href: "/workouts",
    },
    {
      label: "Agenda",
      icon: Calendar,
      href: "/calendar",
    },
    {
      label: "Alimentação",
      icon: Utensils,
      href: "/nutrition",
    },
    {
      label: "Hidratação",
      icon: Droplets,
      href: "/hydration",
    },
    {
      label: "Progresso",
      icon: BarChart3,
      href: "/progress",
    },
    {
      label: "Vídeos",
      icon: Video,
      href: "/videos",
    },
    {
      label: "Suplementos",
      icon: PieChart,
      href: "/supplements",
    },
    {
      label: "Chat",
      icon: MessageSquare,
      href: "/chat",
    },
  ];

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 bg-sidebar w-72">
          <div className="flex flex-col h-full">
            <div className="px-6 py-5 border-b border-sidebar-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-fitness-primary">Fit Fusion</h2>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-1">
                {routes.map((route) => (
                  <Button
                    key={route.href}
                    variant={location.pathname === route.href ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      location.pathname === route.href
                        ? "bg-fitness-primary text-white"
                        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                    onClick={() => {
                      navigate(route.href);
                      setOpen(false);
                    }}
                  >
                    <route.icon className="h-5 w-5 mr-3" />
                    {route.label}
                  </Button>
                ))}
              </div>
            </ScrollArea>
            <div className="p-6 border-t border-sidebar-border">
              <div className="flex items-center gap-3">
                <div className="rounded-full overflow-hidden h-10 w-10 bg-fitness-primary flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Plano Premium</span>
                  <span className="text-xs text-muted-foreground">Atleta</span>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden lg:flex lg:flex-col h-full w-72 border-r bg-sidebar border-sidebar-border">
        <div className="px-6 py-5 border-b border-sidebar-border">
          <h2 className="text-2xl font-bold text-fitness-primary">Fit Fusion</h2>
        </div>
        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={location.pathname === route.href ? "default" : "ghost"}
                className={`w-full justify-start ${
                  location.pathname === route.href
                    ? "bg-fitness-primary text-white"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                onClick={() => navigate(route.href)}
              >
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </Button>
            ))}
          </div>
        </ScrollArea>
        <div className="p-6 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="rounded-full overflow-hidden h-10 w-10 bg-fitness-primary flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Plano Premium</span>
              <span className="text-xs text-muted-foreground">Atleta</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
