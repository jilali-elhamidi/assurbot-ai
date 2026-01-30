import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText,
  AlertTriangle,
  Calendar,
  TrendingUp,
  ArrowRight,
  Car,
  Home,
  Shield,
  Clock,
  Euro,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// Mock data
const expenseData = [
  { month: "Jan", montant: 120 },
  { month: "Fév", montant: 120 },
  { month: "Mar", montant: 145 },
  { month: "Avr", montant: 145 },
  { month: "Mai", montant: 145 },
  { month: "Jun", montant: 145 },
  { month: "Jul", montant: 130 },
  { month: "Aoû", montant: 130 },
  { month: "Sep", montant: 130 },
  { month: "Oct", montant: 130 },
  { month: "Nov", montant: 155 },
  { month: "Déc", montant: 155 },
];

const activeContracts = [
  {
    id: 1,
    type: "Auto",
    name: "Peugeot 308",
    icon: Car,
    status: "active",
    nextPayment: "15 Fév 2026",
    amount: "45€/mois",
  },
  {
    id: 2,
    type: "Habitation",
    name: "Appartement Paris 11",
    icon: Home,
    status: "active",
    nextPayment: "1 Mar 2026",
    amount: "28€/mois",
  },
];

const pendingClaims = [
  {
    id: 1,
    type: "Sinistre Auto",
    date: "12 Jan 2026",
    status: "En cours d'analyse",
    progress: 60,
  },
];

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`skeleton-shimmer ${className}`} />
);

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Bonjour, <span className="gradient-text">Jean</span> 👋
          </h1>
          <p className="text-muted-foreground">
            Voici un aperçu de vos assurances
          </p>
        </div>
        <Link to="/claims">
          <Button className="bg-primary hover:bg-primary/90 glow-primary group">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Déclarer un sinistre
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Active Contracts */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card border-white/10 hover:border-primary/30 transition-colors">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Contrats Actifs
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold">2</div>
              )}
              <p className="text-sm text-accent mt-1">Tous à jour</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Payment */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card border-white/10 hover:border-primary/30 transition-colors">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Prochaine Échéance
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-3xl font-bold">15 Fév</div>
              )}
              <p className="text-sm text-muted-foreground mt-1">Auto - 45€</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Claims */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card border-white/10 hover:border-primary/30 transition-colors">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Sinistres en cours
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <div className="text-3xl font-bold text-warning">1</div>
              )}
              <p className="text-sm text-muted-foreground mt-1">En analyse</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Annual Spending */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card border-white/10 hover:border-primary/30 transition-colors">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Euro className="h-4 w-4" />
                Dépenses Annuelles
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-3xl font-bold">1 650€</div>
              )}
              <p className="text-sm text-accent mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                -5% vs 2025
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Évolution des Dépenses
              </CardTitle>
              <CardDescription>Vos cotisations mensuelles en 2026</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <Skeleton className="h-full w-full" />
                </div>
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={expenseData}>
                      <defs>
                        <linearGradient id="colorMontant" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="month"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickFormatter={(value) => `${value}€`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="montant"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorMontant)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Claims Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card border-white/10 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Sinistres en Cours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <Skeleton className="h-24 w-full" />
              ) : pendingClaims.length > 0 ? (
                pendingClaims.map((claim) => (
                  <div key={claim.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{claim.type}</span>
                      <span className="badge-pending text-xs px-2 py-1 rounded-full">
                        {claim.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Déclaré le {claim.date}
                    </p>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${claim.progress}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-full bg-warning rounded-full"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Progression: {claim.progress}%
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun sinistre en cours</p>
                </div>
              )}
              <Link to="/claims">
                <Button variant="outline" className="w-full border-white/10 mt-4">
                  Voir tous les sinistres
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Contracts Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glass-card border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Mes Contrats
              </CardTitle>
              <CardDescription>Vos polices d'assurance actives</CardDescription>
            </div>
            <Link to="/contracts">
              <Button variant="ghost" size="sm" className="text-primary">
                Voir tout
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeContracts.map((contract) => (
                  <div
                    key={contract.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <contract.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{contract.name}</h4>
                          <span className="badge-active text-xs px-2 py-1 rounded-full">
                            Actif
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Assurance {contract.type}
                        </p>
                        <div className="flex items-center justify-between mt-2 text-sm">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {contract.nextPayment}
                          </span>
                          <span className="font-medium text-primary">
                            {contract.amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
