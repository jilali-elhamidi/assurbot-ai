import React from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link
import {
  Shield, Mic, FileText, Zap, Clock, Lock,
  ArrowRight, Bot, Check, MapPin, Activity, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- 1. COMPOSANT SPOTLIGHT CARD ---
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.08), 
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// --- 2. FOND GRILLE CLAIR ---
const GridBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_0px,transparent,white)]" />
    <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-blue-50/80 via-indigo-50/30 to-transparent blur-[80px]" />
  </div>
);

// --- 3. DASHBOARD PANORAMIQUE ---
const VisualWideDashboard = () => {
  return (
    <div className="w-full relative">
      {/* Container Principal */}
      <div className="w-full bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[450px] flex items-center">
        
        <div className="absolute inset-0 bg-slate-50/50 opacity-50 pointer-events-none" />

        <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* COLONNE GAUCHE */}
            <div className="md:col-span-3 flex flex-col gap-5">
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
                >
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Check className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Assuré</p>
                        <p className="text-base font-bold text-slate-800">Identité Vérifiée</p>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 opacity-90"
                >
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Localisation</p>
                        <p className="text-base font-bold text-slate-800">Paris, FR</p>
                    </div>
                </motion.div>
            </div>

            {/* COLONNE CENTRALE */}
            <div className="md:col-span-6 relative flex justify-center">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-full h-80 rounded-[2rem] bg-gradient-to-b from-blue-50 via-white to-blue-50 border border-blue-100 shadow-inner flex flex-col items-center justify-center relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <div className="w-28 h-28 rounded-full bg-white shadow-xl flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10 animate-ping duration-1000" />
                            <div className="absolute inset-0 bg-blue-400 rounded-full opacity-10 animate-ping delay-75 duration-1000" />
                            <Mic className="w-12 h-12 text-blue-600" />
                        </div>
                    </div>

                    <div className="mt-10 flex items-end gap-2 h-16 w-full justify-center px-10">
                        {[...Array(24)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 rounded-full bg-blue-500/20"
                                animate={{ 
                                    height: [12, Math.random() * 50 + 15, 12],
                                    backgroundColor: ["rgba(59,130,246,0.2)", "rgba(59,130,246,0.8)", "rgba(59,130,246,0.2)"]
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.05,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>

                    <p className="absolute bottom-6 text-slate-400 text-xs font-mono tracking-widest uppercase">Écoute active...</p>
                </motion.div>

                <div className="hidden md:block absolute top-1/2 -left-4 w-8 h-[2px] bg-slate-200" />
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-slate-200" />
            </div>

            {/* COLONNE DROITE */}
            <div className="md:col-span-3 flex flex-col gap-5">
                
                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white p-5 rounded-2xl border border-blue-100 shadow-lg relative overflow-hidden group"
                >
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-100 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-center gap-4 mb-3 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Agent Smart</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-medium text-slate-500">En ligne</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 relative z-10">
                        <div className="flex gap-2">
                             <MessageSquare className="w-3 h-3 text-slate-400 mt-1 flex-shrink-0" />
                             <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                "J'ai bien reçu votre déclaration. L'analyse est positive."
                             </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
                >
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                        <Activity className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Dossier</p>
                        <p className="text-base font-bold text-slate-800">Validé à 100%</p>
                    </div>
                </motion.div>
            </div>

        </div>
      </div>
    </div>
  );
};

// --- DATA ---
const features = [
  { icon: Mic, title: "Commande Vocale", description: "Déclarez un sinistre simplement, comme si vous laissiez un message vocal.", color: "text-blue-600 bg-blue-50" },
  { icon: Zap, title: "Remboursement Flash", description: "L'IA valide votre dossier et vire les fonds instantanément.", color: "text-amber-600 bg-amber-50" },
  { icon: Shield, title: "Sécurité Maximale", description: "Algorithmes prédictifs pour protéger la communauté.", color: "text-emerald-600 bg-emerald-50" },
  { icon: Clock, title: "Disponible 24/7", description: "Pas d'horaires de bureau. L'IA est toujours réveillée.", color: "text-indigo-600 bg-indigo-50" },
  { icon: FileText, title: "Zéro Papier", description: "Tout est numérisé, centralisé et accessible en un clic.", color: "text-purple-600 bg-purple-50" },
  { icon: Lock, title: "Données Chiffrées", description: "Vos données personnelles sont chiffrées (AES-256).", color: "text-rose-600 bg-rose-50" },
];

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Outfit'] selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;700&display=swap');
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
               <Bot className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl font-jakarta tracking-tight text-slate-900">AssurBot.ai</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Fonctionnalités</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Témoignages</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Tarifs</a>
          </div>
          {/* LIEN AJOUTÉ ICI */}
          <Link to="/login">
            <Button className="bg-slate-900 text-white hover:bg-slate-800 shadow-md">
              Connexion
            </Button>
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-20 md:pt-28 md:pb-32 overflow-hidden">
        <GridBackground />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
            
            {/* Titre */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-jakarta tracking-tight leading-[1.1] mb-6 text-slate-900"
            >
              L'Assurance <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Intelligente.
              </span>
            </motion.h1>

            {/* Sous-titre */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl leading-relaxed font-medium"
            >
              Gérez vos contrats et déclarez vos sinistres à la voix. 
              Une protection instantanée, transparente et pilotée par l'IA.
            </motion.p>

            {/* Boutons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link to="/login">
                <Button size="lg" className="h-14 px-8 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-bold text-base shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all hover:scale-105">
                  Démarrer gratuitement
                </Button>
              </Link>
              <Link to="/demo">
				<Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-base shadow-sm">
				  <Mic className="mr-2 w-4 h-4 text-blue-600" /> Voir la démo
				</Button>
			  </Link>
            </motion.div>
          </div>

          {/* ZONE VISUELLE PANORAMIQUE */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ y }}
            className="w-full max-w-7xl mx-auto"
          >
            <div className="absolute inset-0 bg-blue-600/10 blur-[100px] -z-10 rounded-full opacity-50" />
            <VisualWideDashboard />
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section className="py-24 bg-slate-50 relative border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="mb-16 md:text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-jakarta mb-4">
              Technologie de pointe. <br/>
              <span className="text-blue-600">Simplicité absolue.</span>
            </h2>
            <p className="text-slate-500">
              Nous avons supprimé tout ce que vous détestez dans l'assurance traditionnelle pour ne garder que l'essentiel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <SpotlightCard key={i} className="rounded-2xl p-8">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-jakarta">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-24 relative overflow-hidden bg-white">
         <div className="container mx-auto px-6 relative z-10">
            <div className="bg-blue-600 rounded-3xl p-10 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-900/20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/30 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />
                
                <h2 className="text-3xl md:text-5xl font-bold text-white font-jakarta mb-6 relative z-10">
                    Prêt à simplifier votre assurance ?
                </h2>
                <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto relative z-10 font-medium">
                    Rejoignez la première assurance qui vous écoute vraiment. <br/>Sans engagement, annulation en 1 clic.
                </p>
                <div className="relative z-10">
                  <Link to="/login">
                    <Button size="lg" className="h-16 px-12 text-lg rounded-full bg-white text-blue-600 hover:bg-blue-50 font-bold shadow-xl transition-transform hover:scale-105 border-0">
                        Assurer mon futur <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
            </div>
         </div>
      </section>

      <footer className="py-12 border-t border-slate-200 bg-white">
         <div className="container mx-auto px-6 text-center text-slate-400 text-sm flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4 opacity-50">
                <Bot className="w-5 h-5" />
                <span className="font-bold">AssurBot.ai</span>
            </div>
            <p>© 2024 AssurBot.ai - L'assurance intelligente. Tous droits réservés.</p>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;