import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  LayoutDashboard,
  FileText,
  AlertTriangle,
  User,
  LogOut,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import VoiceAssistantWidget from "@/components/VoiceAssistantWidget";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Tableau de bord", path: "/dashboard" },
  { icon: FileText, label: "Mes Contrats", path: "/contracts" },
  { icon: AlertTriangle, label: "Déclarer un Sinistre", path: "/claims" },
  { icon: User, label: "Mon Profil", path: "/profile" },
];

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex flex-col fixed left-0 top-0 h-full glass-card border-r border-white/10 z-40"
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <Link to="/dashboard" className="flex items-center gap-2 overflow-hidden">
            <Shield className="h-8 w-8 text-primary flex-shrink-0" />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-lg font-bold gradient-text whitespace-nowrap"
                >
                  AssurBot.AI
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="h-8 w-8"
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                sidebarCollapsed && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                    "hover:bg-white/5",
                    isActive(item.path) && "sidebar-item-active bg-primary/10"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isActive(item.path) ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className={cn(
                          "whitespace-nowrap",
                          isActive(item.path) ? "text-foreground font-medium" : "text-muted-foreground"
                        )}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/10">
          <div className={cn("flex items-center gap-3", sidebarCollapsed && "justify-center")}>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-primary" />
            </div>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p className="font-medium truncate">Jean Dupont</p>
                  <p className="text-sm text-muted-foreground truncate">jean.dupont@email.com</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/login" className="block mt-4">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 text-muted-foreground hover:text-destructive",
                sidebarCollapsed && "justify-center px-0"
              )}
            >
              <LogOut className="h-4 w-4" />
              {!sidebarCollapsed && "Déconnexion"}
            </Button>
          </Link>
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 glass-card border-b border-white/10 z-50 flex items-center justify-between px-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-lg font-bold gradient-text">AssurBot.AI</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-full w-72 glass-card border-r border-white/10 z-50"
            >
              <div className="h-16 flex items-center px-4 border-b border-white/10">
                <Link to="/dashboard" className="flex items-center gap-2">
                  <Shield className="h-8 w-8 text-primary" />
                  <span className="text-lg font-bold gradient-text">AssurBot.AI</span>
                </Link>
              </div>
              <nav className="py-6 px-3">
                <ul className="space-y-2">
                  {sidebarItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                          "hover:bg-white/5",
                          isActive(item.path) && "sidebar-item-active bg-primary/10"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-5 w-5",
                            isActive(item.path) ? "text-primary" : "text-muted-foreground"
                          )}
                        />
                        <span
                          className={cn(
                            isActive(item.path) ? "text-foreground font-medium" : "text-muted-foreground"
                          )}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 min-h-screen transition-all duration-300",
          "pt-16 lg:pt-0",
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-[280px]"
        )}
      >
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Voice Assistant Widget - Always Present */}
      <VoiceAssistantWidget />
    </div>
  );
};

export default DashboardLayout;
