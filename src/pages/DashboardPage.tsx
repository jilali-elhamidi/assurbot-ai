import React, { useState, useEffect } from "react";
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
  Plus,
  Activity
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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- MOCK DATA ---
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
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: 2,
    type: "Habitation",
    name: "Appartement Paris 11",
    icon: Home,
    status: "active",
    nextPayment: "1 Mar 2026",
    amount: "28€/mois",
    color: "text-emerald-600 bg-emerald-100",
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
  <div className={`animate-pulse bg-slate-200 rounded ${className}`} />
);

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 md:p-8 font-['Outfit'] selection:bg-blue-100 selection:text-blue-900">
      
      {/* Header - Responsive stack on small mobile */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Bonjour, <span className="text-blue-600">Jean</span> 👋
          </h1>
          <p className="text-sm md:text-base text-slate-500 mt-1">
            Voici l'état de votre compte aujourd'hui.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link to="/contracts" className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full bg-white border-slate-200 text-slate-700 shadow-sm">
                    <Plus className="mr-2 h-4 w-4" /> <span className="whitespace-nowrap">Nouveau contrat</span>
                </Button>
            </Link>
            <Link to="/claims" className="flex-1 sm:flex-none">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    <span className="whitespace-nowrap">Déclarer un sinistre</span>
                </Button>
            </Link>
        </div>
      </motion.div>

      {/* Stats Cards (KPIs) - Responsive grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8"
      >
        {[
            { label: "Contrats Actifs", value: "2", sub: "Tous à jour", icon: FileText, color: "text-blue-600 bg-blue-50" },
            { label: "Prochaine Échéance", value: "15 Fév", sub: "Auto - 45€", icon: Calendar, color: "text-purple-600 bg-purple-50" },
            { label: "Sinistres en cours", value: "1", sub: "En analyse", icon: Activity, color: "text-amber-600 bg-amber-50" },
            { label: "Dépenses Annuelles", value: "1 650€", sub: "-5% vs 2025", icon: Euro, color: "text-emerald-600 bg-emerald-50" }
        ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants}>
                <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all bg-white group">
                    <CardContent className="p-4 md:p-5">
                        <div className="flex justify-between items-start mb-3">
                            <div className={`p-2 rounded-xl ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                            {stat.label === "Sinistres en cours" && (
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                </span>
                            )}
                        </div>
                        <div>
                            {loading ? <Skeleton className="h-8 w-16 mb-1" /> : <div className="text-xl md:text-2xl font-bold text-slate-900">{stat.value}</div>}
                            <div className="text-xs md:text-sm font-medium text-slate-500">{stat.label}</div>
                            <p className="text-[10px] md:text-xs text-slate-400 mt-1">{stat.sub}</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid - Stacked on Tablet/Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Section - Takes full width on mobile/tablet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="border-slate-200 shadow-sm bg-white">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                Évolution des Dépenses
              </CardTitle>
              <CardDescription className="text-sm">Cotisations mensuelles 2026</CardDescription>
            </CardHeader>
            <CardContent className="p-2 md:p-6 pt-0">
              {loading ? (
                <div className="h-[250px] md:h-[300px] w-full flex items-end gap-1 pb-2">
                    {[...Array(12)].map((_, i) => (
                        <Skeleton key={i} className="flex-1" style={{ height: `${Math.random() * 60 + 20}%` }} />
                    ))}
                </div>
              ) : (
                <div className="h-[250px] md:h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={expenseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorMontant" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} tickFormatter={(v) => `${v}€`} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} />
                      <Area type="monotone" dataKey="montant" stroke="#3b82f6" strokeWidth={3} fill="url(#colorMontant)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column: Claims & Contracts */}
        <div className="space-y-6">
            
            {/* --- SECTION SINISTRES (Modifiée en Noir) --- */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50 p-4">
                        <CardTitle className="text-sm md:text-base font-bold text-black flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-amber-500" /> Sinistres
                            </span>
                            <span className="text-[10px] font-normal px-2 py-0.5 bg-white border border-slate-200 rounded-full text-black">
                                {pendingClaims.length} actif
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        {loading ? <Skeleton className="h-20 w-full rounded-xl" /> : (
                            pendingClaims.map((claim) => (
                                <div key={claim.id} className="relative group">
                                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 rounded-full" />
                                    <div className="ml-4 space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                {/* Modification ici : text-black */}
                                                <h4 className="text-sm font-bold text-black">{claim.type}</h4>
                                                <p className="text-[10px] text-black/70 font-medium">{claim.date}</p>
                                            </div>
                                            <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                                Analyse
                                            </span>
                                        </div>
                                        <div className="w-full h-1 bg-slate-200 rounded-full">
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${claim.progress}%` }} className="h-full bg-blue-600 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        <Link to="/claims" className="block mt-4">
                            <Button variant="ghost" className="w-full text-xs font-semibold text-black hover:bg-slate-100 h-8">
                                Voir détails <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </motion.div>

            {/* --- SECTION CONTRATS (Modifiée en Noir) --- */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <Card className="border-slate-200 shadow-sm bg-white p-4">
                    <div className="flex items-center justify-between mb-4">
                        {/* Modification ici : text-black */}
                        <CardTitle className="text-sm md:text-base font-bold text-black flex items-center gap-2">
                            <FileText className="h-4 w-4 text-black" /> Contrats
                        </CardTitle>
                        <Link to="/contracts" className="text-xs font-bold text-blue-700">Voir tout</Link>
                    </div>
                    <div className="space-y-3">
                        {loading ? <Skeleton className="h-16 w-full rounded-xl" /> : activeContracts.map((contract) => (
                            <div key={contract.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${contract.color}`}>
                                    <contract.icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    {/* Modification ici : text-black */}
                                    <h4 className="text-xs font-bold text-black truncate">{contract.name}</h4>
                                    <p className="text-[10px] text-black/70 font-medium flex items-center mt-0.5">
                                        <Clock className="h-2.5 w-2.5 mr-1" /> {contract.nextPayment}
                                    </p>
                                </div>
                                {/* Modification ici : text-black */}
                                <span className="text-[10px] font-bold text-black">{contract.amount}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;