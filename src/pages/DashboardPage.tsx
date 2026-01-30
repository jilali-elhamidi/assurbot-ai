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

// --- COMPOSANT SKELETON (LOADING) ---
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-200 rounded ${className}`} />
);

// --- PAGE DASHBOARD ---
const DashboardPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
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
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="space-y-8 bg-slate-50/50 min-h-screen p-6 md:p-8 font-['Outfit'] selection:bg-blue-100 selection:text-blue-900">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Bonjour, <span className="text-blue-600">Jean</span> 👋
          </h1>
          <p className="text-slate-500 mt-1">
            Voici ce qui se passe sur votre compte aujourd'hui.
          </p>
        </div>
        
        <div className="flex gap-3">
            <Link to="/contracts">
                <Button variant="outline" className="bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm">
                    <Plus className="mr-2 h-4 w-4" /> Nouveau contrat
                </Button>
            </Link>
            <Link to="/claims">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Déclarer un sinistre
            </Button>
            </Link>
        </div>
      </motion.div>

      {/* Stats Cards (KPIs) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {[
            { label: "Contrats Actifs", value: "2", sub: "Tous à jour", icon: FileText, color: "text-blue-600 bg-blue-50" },
            { label: "Prochaine Échéance", value: "15 Fév", sub: "Auto - 45€", icon: Calendar, color: "text-purple-600 bg-purple-50" },
            { label: "Sinistres en cours", value: "1", sub: "En analyse", icon: Activity, color: "text-amber-600 bg-amber-50" }, // Changed Icon & Color
            { label: "Dépenses Annuelles", value: "1 650€", sub: "-5% vs 2025", icon: Euro, color: "text-emerald-600 bg-emerald-50" }
        ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants}>
                <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white group">
                    <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2.5 rounded-xl ${stat.color} transition-transform group-hover:scale-110`}>
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
                            {loading ? (
                                <Skeleton className="h-8 w-16 mb-1" />
                            ) : (
                                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                            )}
                            <div className="text-sm font-medium text-slate-500">{stat.label}</div>
                            <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="border-slate-200 shadow-sm bg-white h-full">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                Évolution des Dépenses
              </CardTitle>
              <CardDescription className="text-slate-500">Vos cotisations mensuelles en 2026</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-[300px] w-full flex items-end gap-2 pb-2">
                    {[...Array(12)].map((_, i) => (
                        <Skeleton key={i} className="w-full" style={{ height: `${Math.random() * 60 + 20}%` }} />
                    ))}
                </div>
              ) : (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={expenseData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorMontant" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} /> {/* Blue-500 */}
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        stroke="#94a3b8" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        dy={10}
                      />
                      <YAxis 
                        stroke="#94a3b8" 
                        fontSize={12} 
                        tickFormatter={(value) => `${value}€`} 
                        tickLine={false} 
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          fontSize: "12px",
                          color: "#1e293b"
                        }}
                        cursor={{ stroke: "#3b82f6", strokeWidth: 1, strokeDasharray: "4 4" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="montant"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorMontant)"
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column: Claims & Contracts */}
        <div className="space-y-6">
            
            {/* Sinistres */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                        <CardTitle className="text-base font-bold text-slate-900 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-amber-500" /> Sinistres en cours
                            </span>
                            <span className="text-xs font-normal px-2 py-1 bg-white border border-slate-200 rounded-full text-slate-500">
                                {pendingClaims.length} actif(s)
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        {loading ? (
                            <Skeleton className="h-24 w-full rounded-xl" />
                        ) : pendingClaims.length > 0 ? (
                            pendingClaims.map((claim) => (
                                <div key={claim.id} className="relative group">
                                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-slate-200 group-hover:bg-blue-200 transition-colors" />
                                    <div className="ml-6 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-800">{claim.type}</h4>
                                                <p className="text-xs text-slate-500">Déclaré le {claim.date}</p>
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                                                En analyse
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs text-slate-500">
                                                <span>Progression</span>
                                                <span className="font-medium text-blue-600">{claim.progress}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${claim.progress}%` }}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                    className="h-full bg-blue-600 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-6 text-slate-400">
                                <Shield className="h-10 w-10 mx-auto mb-2 opacity-20" />
                                <p className="text-sm">Aucun sinistre en cours</p>
                            </div>
                        )}
                        
                        <Link to="/claims" className="block mt-4">
                            <Button variant="ghost" className="w-full text-xs text-slate-500 hover:text-blue-600 hover:bg-blue-50 h-8">
                                Voir les détails <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Contrats */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
            >
                <Card className="border-slate-200 shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                                <FileText className="h-4 w-4 text-slate-500" /> Mes Contrats
                            </CardTitle>
                            <Link to="/contracts" className="text-xs font-medium text-blue-600 hover:underline">
                                Voir tout
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {loading ? (
                            <>
                                <Skeleton className="h-16 w-full rounded-xl" />
                                <Skeleton className="h-16 w-full rounded-xl" />
                            </>
                        ) : (
                            activeContracts.map((contract) => (
                                <div 
                                    key={contract.id} 
                                    className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
                                >
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${contract.color} group-hover:scale-105 transition-transform`}>
                                        <contract.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <h4 className="text-sm font-semibold text-slate-900 truncate pr-2">{contract.name}</h4>
                                            <span className="text-xs font-bold text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-sm">
                                                {contract.amount}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs text-slate-500">
                                            <Clock className="h-3 w-3 mr-1" /> Échéance : {contract.nextPayment}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </motion.div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;