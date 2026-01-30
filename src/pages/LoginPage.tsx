import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Bot, Shield, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// --- IMPORT DE L'IMAGE LOCALE ---
import robotImage from "@/assets/callbot.png"; 

// --- FOND PARTICULES GRIS ---
const LightParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const particles: Array<{ x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }> = [];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, i) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${particle.opacity})`; 
        ctx.fill();

        particles.forEach((particle2, j) => {
           if (i === j) return;
           const dx = particle.x - particle2.x;
           const dy = particle.y - particle2.y;
           const distance = Math.sqrt(dx * dx + dy * dy);
           if (distance < 100) {
             ctx.beginPath();
             ctx.strokeStyle = `rgba(148, 163, 184, ${0.15 * (1 - distance / 100)})`;
             ctx.lineWidth = 0.5;
             ctx.moveTo(particle.x, particle.y);
             ctx.lineTo(particle2.x, particle2.y);
             ctx.stroke();
           }
        });

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });
      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener('resize', setCanvasSize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: isLogin ? "Connexion réussie" : "Compte créé",
        description: "Redirection vers votre tableau de bord...",
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50 font-['Outfit'] selection:bg-slate-200 selection:text-slate-900 overflow-hidden relative">
      
      {/* --- FOND ANIMÉ --- */}
      <div className="absolute inset-0 z-0">
         <LightParticles />
         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-slate-200/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gray-200/50 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      </div>

      {/* --- CARTE PRINCIPALE --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        // MODIFICATION ICI : Hauteur 90vh (Presque tout l'écran) et Largeur 7xl (Plus large)
        className="w-full max-w-7xl h-[85vh] md:h-[90vh] bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden"
      >
        
        {/* COLONNE GAUCHE AVEC BACKGROUND IMAGE */}
        <div 
            // bg-cover = L'image couvre tout de gauche à droite et de haut en bas
            className="hidden md:flex w-1/2 relative flex-col justify-between p-12 text-white overflow-hidden bg-cover bg-center"
            style={{
                backgroundImage: `url(${robotImage})`,
            }}
        >
            {/* Overlay sombre pour assurer la lisibilité du texte */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/40 z-0" />
            
            {/* Cercles décoratifs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2 z-1" />
            
            {/* Contenu */}
            <div className="flex items-center gap-2 relative z-10">
                <div className="w-8 h-8 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg tracking-tight">AssurBot.ai</span>
            </div>

            {/* Texte bas */}
            <div className="relative z-10 mt-auto">
                <h2 className="text-4xl font-bold mb-4 leading-tight drop-shadow-md">
                    L'assurance intelligente.
                </h2>
                {/* Liste points forts */}
                <div className="space-y-3">
                    {['Protection 24/7', 'Données chiffrées', 'IA Avancée'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-base text-slate-200 font-medium drop-shadow">
                            <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
             {/* Footer Gauche */}
            <div className="relative z-10 text-xs text-slate-300/80 mt-8">
                © 2024 AssurBot Inc. Tous droits réservés.
            </div>
        </div>


        {/* COLONNE DROITE : FORMULAIRE */}
        <div className="w-full md:w-1/2 bg-white/50 p-8 md:p-16 flex flex-col justify-center relative">
            <div className="max-w-md mx-auto w-full">
                
                <div className="text-center mb-10">
                    <h3 className="text-3xl font-bold text-slate-900 mb-3">
                        {isLogin ? "Bon retour !" : "Créer un compte"}
                    </h3>
                    <p className="text-slate-500 text-base">
                        {isLogin ? "Accédez à votre espace sécurisé." : "Rejoignez l'assurance du futur."}
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-5">
                    {!isLogin && (
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-slate-700">Nom complet</Label>
                            <Input 
                                id="name" 
                                placeholder="Jean Dupont"
                                className="bg-white/60 border-slate-200 focus:border-slate-500 focus:ring-slate-500/20 h-12 text-base"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-700">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="nom@exemple.com"
                                className="pl-10 bg-white/60 border-slate-200 focus:border-slate-500 focus:ring-slate-500/20 h-12 text-base"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="password" className="text-slate-700">Mot de passe</Label>
                            {isLogin && <a href="#" className="text-sm text-slate-600 hover:text-slate-900 hover:underline">Oublié ?</a>}
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input 
                                id="password" 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••"
                                className="pl-10 pr-10 bg-white/60 border-slate-200 focus:border-slate-500 focus:ring-slate-500/20 h-12 text-base"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 text-base rounded-xl shadow-lg shadow-slate-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] mt-6"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                {isLogin ? "Se connecter" : "S'inscrire"} 
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                        )}
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm">
                    <span className="text-slate-500">
                        {isLogin ? "Nouveau ici ? " : "Déjà inscrit ? "}
                    </span>
                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-slate-800 font-bold hover:underline ml-1"
                    >
                        {isLogin ? "Créer un compte" : "Se connecter"}
                    </button>
                </div>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white/50 px-2 text-slate-400 font-medium">Ou continuer avec</span></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="border-slate-200 hover:bg-white hover:text-slate-900 bg-white/60 h-11">
                        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                        Google
                    </Button>
                    <Button variant="outline" className="border-slate-200 hover:bg-white hover:text-slate-900 bg-white/60 h-11">
                        <Shield className="mr-2 h-5 w-5 text-slate-700" />
                        SSO
                    </Button>
                </div>

            </div>
        </div>

      </motion.div>
    </div>
  );
};

export default LoginPage;