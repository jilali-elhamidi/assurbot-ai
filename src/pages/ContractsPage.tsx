import { useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
  Home,
  Download,
  Eye,
  Calendar,
  Euro,
  Shield,
  Search,
  CheckCircle2,
  FileCheck,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const contracts = [
  {
    id: 1,
    type: "Auto",
    name: "Peugeot 308 - AB-123-CD",
    icon: Car,
    status: "active",
    startDate: "15 Jan 2024",
    endDate: "14 Jan 2027",
    premium: "45€/mois",
    annualPremium: "540€/an",
    coverage: ["Tous risques", "Assistance 24/7", "Véhicule de remplacement"],
    policyNumber: "AUTO-2024-001234",
    deductible: "300€",
    color: "text-blue-600 bg-blue-50",
    borderColor: "border-blue-100"
  },
  {
    id: 2,
    type: "Habitation",
    name: "Appartement Paris 11ème",
    icon: Home,
    status: "active",
    startDate: "1 Mar 2023",
    endDate: "28 Fév 2026",
    premium: "28€/mois",
    annualPremium: "336€/an",
    coverage: ["Incendie", "Dégât des eaux", "Vol", "Responsabilité civile"],
    policyNumber: "HAB-2023-005678",
    deductible: "150€",
    color: "text-emerald-600 bg-emerald-50",
    borderColor: "border-emerald-100"
  },
  {
    id: 3,
    type: "Auto",
    name: "Renault Clio - EF-456-GH",
    icon: Car,
    status: "expired",
    startDate: "10 Avr 2022",
    endDate: "9 Avr 2025",
    premium: "35€/mois",
    annualPremium: "420€/an",
    coverage: ["Tiers étendu", "Bris de glace"],
    policyNumber: "AUTO-2022-009876",
    deductible: "500€",
    color: "text-slate-500 bg-slate-100",
    borderColor: "border-slate-200"
  },
];

type Contract = typeof contracts[0];

const ContractsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "expired">("all");
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.policyNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || contract.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDownload = (contract: Contract) => {
    toast({
      title: "Téléchargement en cours",
      description: `Attestation ${contract.policyNumber} en cours de génération...`,
    });
    setTimeout(() => {
      toast({
        title: "Téléchargement terminé",
        description: "Votre attestation a été téléchargée avec succès.",
      });
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-8 bg-slate-50/50 min-h-screen p-6 md:p-8 font-['Outfit'] selection:bg-blue-100 selection:text-blue-900">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold text-slate-900">Mes Contrats</h1>
        <p className="text-slate-500">
          Gérez vos polices d'assurance et téléchargez vos attestations en un clic.
        </p>
      </motion.div>

      {/* Search and Filters Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
      >
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Rechercher (nom, n° police)..."
            className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto p-1 bg-slate-100 rounded-lg">
          <button
            className={cn(
              "flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all",
              filterStatus === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
            onClick={() => setFilterStatus("all")}
          >
            Tous
          </button>
          <button
            className={cn(
              "flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all",
              filterStatus === "active" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
            onClick={() => setFilterStatus("active")}
          >
            Actifs
          </button>
          <button
            className={cn(
              "flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all",
              filterStatus === "expired" ? "bg-white text-red-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
            onClick={() => setFilterStatus("expired")}
          >
            Expirés
          </button>
        </div>
      </motion.div>

      {/* Contracts Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4"
      >
        {filteredContracts.map((contract) => (
          <motion.div key={contract.id} variants={itemVariants}>
            <Card 
                className={cn(
                    "border shadow-sm hover:shadow-md transition-all duration-300 group bg-white cursor-pointer",
                    contract.status === "active" ? "hover:border-blue-200" : "hover:border-slate-300 opacity-80 hover:opacity-100"
                )}
                onClick={() => setSelectedContract(contract)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  
                  {/* Left: Icon & Main Info */}
                  <div className="flex items-start gap-5 flex-1">
                    <div
                      className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm",
                        contract.color
                      )}
                    >
                      <contract.icon className="h-8 w-8" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {contract.name}
                        </h3>
                        <span
                          className={cn(
                            "text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border",
                            contract.status === "active"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : "bg-slate-100 text-slate-500 border-slate-200"
                          )}
                        >
                          {contract.status === "active" ? "Actif" : "Expiré"}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-500 font-mono">
                        POL: {contract.policyNumber}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 mt-3 text-sm">
                        <span className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          {contract.startDate} — {contract.endDate}
                        </span>
                        <span className="flex items-center gap-1.5 font-semibold text-slate-900 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                          <Euro className="h-3.5 w-3.5 text-slate-400" />
                          {contract.premium}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Coverage Preview */}
                  <div className="hidden xl:flex flex-col gap-2 min-w-[200px]">
                     <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Garanties</p>
                     <div className="flex flex-wrap gap-2">
                        {contract.coverage.slice(0, 2).map((item, i) => (
                            <span key={i} className="text-xs px-2 py-1 rounded-md bg-slate-50 text-slate-600 border border-slate-100">
                                {item}
                            </span>
                        ))}
                        {contract.coverage.length > 2 && (
                            <span className="text-xs px-2 py-1 rounded-md bg-slate-50 text-slate-400 border border-slate-100">
                                +{contract.coverage.length - 2}
                            </span>
                        )}
                     </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-3 w-full lg:w-auto mt-4 lg:mt-0 border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0">
                    <Button
                      variant="outline"
                      className="flex-1 lg:flex-none border-slate-200 hover:bg-slate-50 text-slate-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedContract(contract);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Détails
                    </Button>
                    
                    {contract.status === "active" && (
                      <Button
                        className="flex-1 lg:flex-none bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100 transition-all hover:scale-105"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(contract);
                        }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Attestation
                      </Button>
                    )}
                  </div>

                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Empty State */}
        {filteredContracts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed"
          >
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Aucun contrat trouvé</h3>
            <p className="text-slate-500">Essayez de modifier vos filtres de recherche.</p>
          </motion.div>
        )}
      </motion.div>

      {/* --- MODAL DÉTAILS CONTRAT --- */}
      <Dialog open={!!selectedContract} onOpenChange={() => setSelectedContract(null)}>
        <DialogContent className="bg-white border-slate-200 max-w-lg shadow-2xl p-0 overflow-hidden font-['Outfit']">
          {selectedContract && (
            <>
              {/* Header Modal */}
              <div className={`p-6 border-b border-slate-100 ${selectedContract.status === 'active' ? 'bg-blue-50/50' : 'bg-slate-50'}`}>
                 <div className="flex items-start gap-4">
                    <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shadow-sm",
                        selectedContract.color
                    )}>
                        <selectedContract.icon className="h-6 w-6" />
                    </div>
                    <div>
                        <DialogTitle className="text-xl font-bold text-slate-900 mb-1">
                            {selectedContract.name}
                        </DialogTitle>
                        <DialogDescription className="text-slate-500 font-mono text-xs">
                            POLICE : {selectedContract.policyNumber}
                        </DialogDescription>
                    </div>
                 </div>
              </div>

              <div className="p-6 space-y-6">
                
                {/* Status Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl border border-slate-100 bg-slate-50">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Statut</p>
                        <div className="flex items-center gap-2">
                            {selectedContract.status === "active" ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                                <AlertCircle className="w-4 h-4 text-slate-400" />
                            )}
                            <span className={cn(
                                "font-bold text-sm",
                                selectedContract.status === "active" ? "text-emerald-600" : "text-slate-500"
                            )}>
                                {selectedContract.status === "active" ? "Actif" : "Expiré"}
                            </span>
                        </div>
                    </div>
                    <div className="p-3 rounded-xl border border-slate-100 bg-slate-50">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Franchise</p>
                        <p className="font-bold text-slate-900 text-sm">{selectedContract.deductible}</p>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative pl-4 border-l-2 border-slate-100 space-y-6">
                    <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white bg-blue-500 shadow-sm" />
                        <p className="text-xs text-slate-400 mb-0.5">Date de début</p>
                        <p className="text-sm font-medium text-slate-900">{selectedContract.startDate}</p>
                    </div>
                    <div className="relative">
                        <div className={cn(
                            "absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white shadow-sm",
                            selectedContract.status === "active" ? "bg-slate-300" : "bg-red-400"
                        )} />
                        <p className="text-xs text-slate-400 mb-0.5">Date de fin</p>
                        <p className="text-sm font-medium text-slate-900">{selectedContract.endDate}</p>
                    </div>
                </div>

                {/* Financials (STYLE FORCÉ POUR GARANTIR L'AFFICHAGE CLAIR) */}
                <div 
                  className="p-5 rounded-2xl border flex justify-between items-center shadow-sm"
                  style={{ backgroundColor: '#eff6ff', borderColor: '#dbeafe' }} // Force bleu clair (blue-50)
                >
                    <div>
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Mensualité</p>
                        <p className="text-3xl font-bold text-slate-900">{selectedContract.premium}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Annuel</p>
                        <p className="text-sm font-bold text-slate-700">{selectedContract.annualPremium}</p>
                    </div>
                </div>

                {/* Coverage List */}
                <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" /> Garanties incluses
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {selectedContract.coverage.map((item, i) => (
                            <span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-medium">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer Actions */}
                {selectedContract.status === "active" && (
                    <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-100 mt-2"
                        onClick={() => handleDownload(selectedContract)}
                    >
                        <FileCheck className="mr-2 h-4 w-4" /> Télécharger l'attestation
                    </Button>
                )}

              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContractsPage;