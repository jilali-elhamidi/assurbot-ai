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
    <div className="min-h-screen flex bg-slate-50 font-['Outfit'] selection:bg-blue-100 selection:text-blue-900">
      
      {/* Sidebar - Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex flex-col fixed left-0 top-0 h-full bg-white border-r border-slate-200 z-40 shadow-sm"
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
          <Link to="/dashboard" className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-white" />
            </div>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-lg font-bold text-slate-900 whitespace-nowrap"
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
            className="h-8 w-8 hover:bg-slate-100 text-slate-500"
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
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                    isActive(item.path) 
                        ? "bg-blue-50 text-blue-700 font-medium" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0 transition-colors",
                      isActive(item.path) ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                    )}
                  />
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Petit indicateur actif */}
                  {isActive(item.path) && !sidebarCollapsed && (
                      <motion.div 
                        layoutId="active-pill"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"
                      />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className={cn("flex items-center gap-3", sidebarCollapsed && "justify-center")}>
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm text-slate-400">
              <User className="h-5 w-5" />
            </div>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p className="font-semibold text-sm text-slate-900 truncate">Jean Dupont</p>
                  <p className="text-xs text-slate-500 truncate">jean.dupont@email.com</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <Link to="/login" className="block mt-3">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors h-9",
                sidebarCollapsed && "justify-center px-0"
              )}
            >
              <LogOut className="h-4 w-4" />
              {!sidebarCollapsed && <span className="text-sm">Déconnexion</span>}
            </Button>
          </Link>
        </div>
      </motion.aside>

      {/* Mobile Header (White) */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 flex items-center justify-between px-4 shadow-sm">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
             <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">AssurBot.AI</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-slate-600 hover:bg-slate-100"
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
              className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-full w-72 bg-white border-r border-slate-200 z-50 shadow-xl"
            >
              <div className="h-16 flex items-center px-4 border-b border-slate-100">
                <Link to="/dashboard" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                     <Shield className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-slate-900">AssurBot.AI</span>
                </Link>
              </div>
              <nav className="py-6 px-3">
                <ul className="space-y-1">
                  {sidebarItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                          isActive(item.path) 
                            ? "bg-blue-50 text-blue-700 font-medium" 
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-5 w-5",
                            isActive(item.path) ? "text-blue-600" : "text-slate-400"
                          )}
                        />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 bg-slate-50">
                 <Link to="/login">
                    <Button variant="ghost" className="w-full justify-start gap-2 text-slate-500 hover:text-red-600 hover:bg-red-50">
                        <LogOut className="h-4 w-4" /> Déconnexion
                    </Button>
                 </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 min-h-screen transition-all duration-300 bg-slate-50/50",
          "pt-16 lg:pt-0",
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-[280px]"
        )}
      >
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Voice Assistant Widget - Always Present */}
      <VoiceAssistantWidget />
    </div>
  );
};

export default DashboardLayout;