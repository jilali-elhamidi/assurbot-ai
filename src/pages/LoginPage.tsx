import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Connexion réussie !",
        description: "Bienvenue sur AssurBot.AI",
      });
      navigate("/dashboard");
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleDemoLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-8 rounded-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4"
            >
              <Shield className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="text-2xl font-bold gradient-text">AssurBot.AI</h1>
            <p className="text-muted-foreground mt-2">
              Connectez-vous à votre espace
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  className="pl-10 input-glass"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 input-glass"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-white/5"
                />
                <span className="text-muted-foreground">Se souvenir de moi</span>
              </label>
              <a
                href="#"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Mot de passe oublié ?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 glow-primary group"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">ou</span>
            </div>
          </div>

          {/* Demo Button */}
          <Button
            variant="outline"
            className="w-full border-accent/50 bg-accent/10 hover:bg-accent/20 text-accent"
            onClick={handleDemoLogin}
            disabled={isLoading}
          >
            <Shield className="mr-2 h-4 w-4" />
            Connexion Démo
          </Button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Pas encore de compte ?{" "}
            <a
              href="#"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Créer un compte
            </a>
          </p>
        </div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground"
        >
          <Lock className="h-4 w-4" />
          Connexion sécurisée SSL 256-bit
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
