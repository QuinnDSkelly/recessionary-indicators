import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import FedCountdown from "./pages/FedCountdown";
import LaggingIndicators from "./pages/LaggingIndicators";
import NotFound from "./pages/NotFound";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Timer, LineChart, BarChart3 } from "lucide-react";

const queryClient = new QueryClient();

function SidebarTriggerButton() {
  const { open } = useSidebar();
  return (
    <div className={`fixed top-3 z-50 transition-all duration-300 ${open ? 'left-[260px]' : 'left-3'}`}>
      <SidebarTrigger className="h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary/90 border border-primary/30" />
    </div>
  );
}

function NavSidebar() {
  const { pathname } = useLocation();
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader />
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/"}>
                <Link to="/">
                  <Timer />
                  <span>Countdown</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/leading"}>
                <Link to="/leading">
                  <LineChart />
                  <span>Leading Indicators</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/lagging"}>
                <Link to="/lagging">
                  <BarChart3 />
                  <span>Lagging Indicators</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <SidebarTriggerButton />
        <div className="p-0">
          <Routes>
            <Route path="/" element={<FedCountdown />} />
            <Route path="/leading" element={<Index />} />
            <Route path="/lagging" element={<LaggingIndicators />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <NavSidebar />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
