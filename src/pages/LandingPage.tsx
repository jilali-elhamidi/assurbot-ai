import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield,
  Mic,
  FileText,
  Zap,
  Clock,
  Lock,
  ChevronRight,
  Star,
  Users,
  TrendingUp,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Mic,
    title: "Assistant Vocal IA",
    description: "Déclarez vos sinistres en parlant naturellement. Notre IA comprend et vous guide.",
    gradient: "from-primary to-blue-400",
    span: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    icon: FileText,
    title: "Gestion Simplifiée",
    description: "Tous vos contrats en un seul endroit.",
    gradient: "from-accent to-emerald-400",
    span: "col-span-1 row-span-1",
  },
  {
    icon: Zap,
    title: "Instantané",
    description: "Attestations générées en temps réel.",
    gradient: "from-warning to-orange-400",
    span: "col-span-1 row-span-1",
  },
  {
    icon: Clock,
    title: "24/7",
    description: "Disponible à tout moment, même la nuit. L'IA ne dort jamais.",
    gradient: "from-purple-500 to-pink-500",
    span: "col-span-1 row-span-1",
  },
  {
    icon: Lock,
    title: "Sécurisé",
    description: "Vos données sont chiffrées et protégées selon les normes bancaires.",
    gradient: "from-slate-400 to-slate-600",
    span: "col-span-1 md:col-span-2 row-span-1",
  },
];

const stats = [
  { value: "50K+", label: "Utilisateurs actifs", icon: Users },
  { value: "98%", label: "Satisfaction client", icon: Star },
  { value: "2min", label: "Temps moyen déclaration", icon: Clock },
  { value: "+40%", label: "Économies réalisées", icon: TrendingUp },
];

const testimonials = [
  {
    quote: "J'ai déclaré mon sinistre en 2 minutes depuis ma voiture. Incroyable !",
    author: "Marie L.",
    role: "Cliente depuis 2024",
  },
  {
    quote: "L'assistant vocal comprend tout, même avec mon accent du Sud.",
    author: "Pierre M.",
    role: "Client depuis 2023",
  },
  {
    quote: "Plus besoin d'appeler pendant des heures. Un vrai gain de temps.",
    author: "Sophie D.",
    role: "Cliente depuis 2024",
  },
];

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            >
              <Bot className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Propulsé par l'Intelligence Artificielle
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              L'assurance{" "}
              <span className="gradient-text">intelligente</span>
              <br />
              qui vous écoute
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Gérez vos contrats, déclarez vos sinistres et obtenez vos attestations
              simplement en parlant à notre assistant vocal IA.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 glow-primary text-lg px-8 py-6 group"
                >
                  Commencer gratuitement
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 backdrop-blur text-lg px-8 py-6"
              >
                <Mic className="mr-2 h-5 w-5" />
                Voir la démo vocale
              </Button>
            </div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-16 relative"
            >
              <div className="glass-card p-4 md:p-8 rounded-2xl max-w-3xl mx-auto">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute inset-0 bg-hero-glow" />
                  
                  {/* Voice Visualization Placeholder */}
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center">
                        <Mic className="h-8 w-8 text-primary" />
                      </div>
                    </motion.div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 bg-primary rounded-full"
                          animate={{ height: [12, 40, 12] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-muted-foreground text-sm">
                      "Bonjour, je voudrais déclarer un sinistre..."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Tout ce dont vous avez <span className="gradient-text">besoin</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Une plateforme complète pour gérer votre assurance de manière moderne et efficace.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className={`glass-card-hover p-6 ${feature.span}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-hero-glow opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ils nous font <span className="gradient-text">confiance</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-16 rounded-3xl text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
            <div className="relative z-10">
              <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Prêt à simplifier votre assurance ?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Rejoignez plus de 50 000 utilisateurs qui ont déjà adopté l'assurance du futur.
              </p>
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 glow-primary text-lg px-10 py-6"
                >
                  Démarrer maintenant
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
