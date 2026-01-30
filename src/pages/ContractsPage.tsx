import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Car,
  Home,
  Download,
  Eye,
  ChevronRight,
  Calendar,
  Euro,
  Shield,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
      >
        <h1 className="text-2xl md:text-3xl font-bold">
          <span className="gradient-text">Mes Contrats</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Gérez et consultez vos polices d'assurance
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Rechercher un contrat..."
            className="pl-10 input-glass"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            className={cn(
              filterStatus === "all"
                ? "bg-primary"
                : "border-white/10 bg-white/5"
            )}
            onClick={() => setFilterStatus("all")}
          >
            Tous
          </Button>
          <Button
            variant={filterStatus === "active" ? "default" : "outline"}
            className={cn(
              filterStatus === "active"
                ? "bg-accent text-accent-foreground"
                : "border-white/10 bg-white/5"
            )}
            onClick={() => setFilterStatus("active")}
          >
            Actifs
          </Button>
          <Button
            variant={filterStatus === "expired" ? "default" : "outline"}
            className={cn(
              filterStatus === "expired"
                ? "bg-destructive"
                : "border-white/10 bg-white/5"
            )}
            onClick={() => setFilterStatus("expired")}
          >
            Expirés
          </Button>
        </div>
      </motion.div>

      {/* Contracts List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {filteredContracts.map((contract) => (
          <motion.div key={contract.id} variants={itemVariants}>
            <Card className="glass-card border-white/10 hover:border-primary/30 transition-all group">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Icon and Basic Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                        contract.status === "active"
                          ? "bg-primary/20"
                          : "bg-destructive/20"
                      )}
                    >
                      <contract.icon
                        className={cn(
                          "h-7 w-7",
                          contract.status === "active"
                            ? "text-primary"
                            : "text-destructive"
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold">{contract.name}</h3>
                        <span
                          className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            contract.status === "active"
                              ? "badge-active"
                              : "badge-expired"
                          )}
                        >
                          {contract.status === "active" ? "Actif" : "Expiré"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Police N° {contract.policyNumber}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {contract.startDate} - {contract.endDate}
                        </span>
                        <span className="flex items-center gap-1 text-primary font-medium">
                          <Euro className="h-4 w-4" />
                          {contract.premium}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Coverage Tags */}
                  <div className="hidden md:flex flex-wrap gap-2 max-w-xs">
                    {contract.coverage.slice(0, 3).map((item, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10"
                      >
                        {item}
                      </span>
                    ))}
                    {contract.coverage.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        +{contract.coverage.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 bg-white/5"
                      onClick={() => setSelectedContract(contract)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Détails
                    </Button>
                    {contract.status === "active" && (
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => handleDownload(contract)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Attestation
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {filteredContracts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Shield className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun contrat trouvé</h3>
            <p className="text-muted-foreground">
              Modifiez vos critères de recherche ou filtres
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Contract Details Dialog */}
      <Dialog open={!!selectedContract} onOpenChange={() => setSelectedContract(null)}>
        <DialogContent className="glass-card border-white/10 max-w-lg">
          {selectedContract && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      selectedContract.status === "active"
                        ? "bg-primary/20"
                        : "bg-destructive/20"
                    )}
                  >
                    <selectedContract.icon
                      className={cn(
                        "h-6 w-6",
                        selectedContract.status === "active"
                          ? "text-primary"
                          : "text-destructive"
                      )}
                    />
                  </div>
                  <div>
                    <DialogTitle>{selectedContract.name}</DialogTitle>
                    <DialogDescription>
                      Police N° {selectedContract.policyNumber}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Status and Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="text-xs text-muted-foreground mb-1">Statut</p>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        selectedContract.status === "active"
                          ? "text-accent"
                          : "text-destructive"
                      )}
                    >
                      {selectedContract.status === "active" ? "Actif" : "Expiré"}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="text-xs text-muted-foreground mb-1">Franchise</p>
                    <span className="text-sm font-medium">{selectedContract.deductible}</span>
                  </div>
                </div>

                {/* Dates */}
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Période de couverture</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Début</p>
                      <p className="font-medium">{selectedContract.startDate}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground self-center" />
                    <div className="text-right">
                      <p className="text-muted-foreground">Fin</p>
                      <p className="font-medium">{selectedContract.endDate}</p>
                    </div>
                  </div>
                </div>

                {/* Premium */}
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Euro className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Prime d'assurance</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {selectedContract.premium}
                    </span>
                    <span className="text-sm text-muted-foreground self-end">
                      ({selectedContract.annualPremium})
                    </span>
                  </div>
                </div>

                {/* Coverage */}
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-accent" />
                    Garanties incluses
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedContract.coverage.map((item, i) => (
                      <span
                        key={i}
                        className="text-sm px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {selectedContract.status === "active" && (
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => {
                      handleDownload(selectedContract);
                      setSelectedContract(null);
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger l'attestation
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
