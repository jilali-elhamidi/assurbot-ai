import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const PublicLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </div>
            <span className="text-xl font-bold gradient-text">AssurBot.AI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Fonctionnalités
            </Link>
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Tarifs
            </Link>
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              À propos
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Connexion
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-primary hover:bg-primary/90 glow-primary">
                Commencer
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link to="/" className="py-2 text-muted-foreground hover:text-foreground">
                Fonctionnalités
              </Link>
              <Link to="/" className="py-2 text-muted-foreground hover:text-foreground">
                Tarifs
              </Link>
              <Link to="/" className="py-2 text-muted-foreground hover:text-foreground">
                À propos
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
                <Link to="/login">
                  <Button variant="ghost" className="w-full">Connexion</Button>
                </Link>
                <Link to="/login">
                  <Button className="w-full bg-primary">Commencer</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="glass-card border-t border-white/10 mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold gradient-text">AssurBot.AI</span>
              </Link>
              <p className="text-muted-foreground max-w-sm">
                L'assurance intelligente propulsée par l'IA. Gérez vos contrats et déclarez vos sinistres en parlant.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/" className="hover:text-foreground transition-colors">Fonctionnalités</Link></li>
                <li><Link to="/" className="hover:text-foreground transition-colors">Tarifs</Link></li>
                <li><Link to="/" className="hover:text-foreground transition-colors">Sécurité</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/" className="hover:text-foreground transition-colors">Mentions légales</Link></li>
                <li><Link to="/" className="hover:text-foreground transition-colors">Confidentialité</Link></li>
                <li><Link to="/" className="hover:text-foreground transition-colors">CGU</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-muted-foreground">
            <p>© 2026 AssurBot.AI. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
