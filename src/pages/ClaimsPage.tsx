import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  MapPin,
  FileText,
  Upload,
  Camera,
  ChevronLeft,
  ChevronRight,
  Check,
  Car,
  Home,
  X,
  Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Type de sinistre", icon: AlertTriangle },
  { id: 2, title: "Date et Lieu", icon: Calendar },
  { id: 3, title: "Description", icon: FileText },
  { id: 4, title: "Photos", icon: Camera },
  { id: 5, title: "Confirmation", icon: Check },
];

const claimTypes = [
  { id: "auto-accident", label: "Accident de voiture", icon: Car, category: "auto" },
  { id: "auto-theft", label: "Vol de véhicule", icon: Car, category: "auto" },
  { id: "auto-glass", label: "Bris de glace", icon: Car, category: "auto" },
  { id: "home-water", label: "Dégât des eaux", icon: Home, category: "home" },
  { id: "home-fire", label: "Incendie", icon: Home, category: "home" },
  { id: "home-theft", label: "Cambriolage", icon: Home, category: "home" },
];

const ClaimsPage = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    claimType: "",
    date: "",
    time: "",
    location: "",
    description: "",
    photos: [] as File[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setFormData({
        ...formData,
        photos: [...formData.photos, ...newPhotos].slice(0, 5),
      });
    }
  };

  const removePhoto = (index: number) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Déclaration envoyée !",
        description: "Votre sinistre a été enregistré. Vous recevrez un email de confirmation.",
      });
      setIsSubmitting(false);
      // Reset form
      setCurrentStep(1);
      setFormData({
        claimType: "",
        date: "",
        time: "",
        location: "",
        description: "",
        photos: [],
      });
    }, 2000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!formData.claimType;
      case 2:
        return !!formData.date && !!formData.location;
      case 3:
        return formData.description.length >= 20;
      case 4:
        return true; // Photos are optional
      default:
        return true;
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const selectedClaimType = claimTypes.find((t) => t.id === formData.claimType);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold">
          <span className="gradient-text">Déclarer un Sinistre</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Suivez les étapes pour déclarer votre sinistre rapidement
        </p>
      </motion.div>

      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-xl"
      >
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "wizard-step",
                    currentStep === step.id && "wizard-step-active",
                    currentStep > step.id && "wizard-step-completed"
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 hidden sm:block",
                    currentStep >= step.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-8 sm:w-16 md:w-24 mx-2",
                    currentStep > step.id ? "bg-accent" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Form Steps */}
      <div className="glass-card p-6 md:p-8 rounded-xl min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait" custom={currentStep}>
          <motion.div
            key={currentStep}
            custom={currentStep}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {/* Step 1: Claim Type */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">
                  Quel type de sinistre souhaitez-vous déclarer ?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {claimTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() =>
                        setFormData({ ...formData, claimType: type.id })
                      }
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all text-left",
                        "hover:border-primary/50 hover:bg-white/5",
                        formData.claimType === type.id
                          ? "border-primary bg-primary/10"
                          : "border-white/10 bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            formData.claimType === type.id
                              ? "bg-primary/20"
                              : "bg-white/10"
                          )}
                        >
                          <type.icon
                            className={cn(
                              "h-5 w-5",
                              formData.claimType === type.id
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                          />
                        </div>
                        <span className="font-medium">{type.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Date and Location */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">
                  Quand et où s'est produit le sinistre ?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date du sinistre</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        className="pl-10 input-glass"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Heure approximative</Label>
                    <Input
                      id="time"
                      type="time"
                      className="input-glass"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Lieu du sinistre</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Adresse ou description du lieu"
                      className="pl-10 input-glass"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Description */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">
                  Décrivez les circonstances du sinistre
                </h2>
                <div className="space-y-2">
                  <Label htmlFor="description">Description détaillée</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez ce qui s'est passé avec le plus de détails possible..."
                    className="min-h-[200px] input-glass"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    {formData.description.length}/20 caractères minimum
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Photos */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">
                  Ajoutez des photos (optionnel)
                </h2>
                <p className="text-muted-foreground">
                  Les photos aident à accélérer le traitement de votre dossier.
                </p>

                {/* Upload Zone */}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    onChange={handlePhotoUpload}
                    disabled={formData.photos.length >= 5}
                  />
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-xl p-8 text-center transition-colors",
                      formData.photos.length >= 5
                        ? "border-muted-foreground/20 bg-muted/5"
                        : "border-primary/30 bg-primary/5 hover:border-primary/50"
                    )}
                  >
                    <Upload className="h-12 w-12 mx-auto text-primary/50 mb-4" />
                    <p className="font-medium">
                      {formData.photos.length >= 5
                        ? "Maximum atteint (5 photos)"
                        : "Cliquez ou déposez vos photos ici"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      PNG, JPG jusqu'à 10MB
                    </p>
                  </div>
                </div>

                {/* Photo Preview */}
                {formData.photos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {formData.photos.map((photo, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-lg overflow-hidden bg-white/5 group"
                      >
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Confirmation */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">
                  Récapitulatif de votre déclaration
                </h2>

                <div className="space-y-4">
                  {/* Claim Type */}
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      {selectedClaimType && (
                        <>
                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                            <selectedClaimType.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Type de sinistre</p>
                            <p className="font-medium">{selectedClaimType.label}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Date and Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-sm text-muted-foreground">Date et heure</p>
                      <p className="font-medium">
                        {formData.date} {formData.time && `à ${formData.time}`}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-sm text-muted-foreground">Lieu</p>
                      <p className="font-medium">{formData.location}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-muted-foreground mb-2">Description</p>
                    <p className="text-sm">{formData.description}</p>
                  </div>

                  {/* Photos */}
                  {formData.photos.length > 0 && (
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-sm text-muted-foreground mb-2">
                        Photos jointes ({formData.photos.length})
                      </p>
                      <div className="flex gap-2">
                        {formData.photos.map((_, index) => (
                          <div
                            key={index}
                            className="w-12 h-12 rounded bg-primary/20 flex items-center justify-center"
                          >
                            <Image className="h-5 w-5 text-primary" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm text-accent">
                    En soumettant cette déclaration, vous certifiez que les informations
                    fournies sont exactes. Un conseiller vous contactera sous 48h.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <Button
            variant="outline"
            className="border-white/10 bg-white/5"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Précédent
          </Button>

          {currentStep < steps.length ? (
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Suivant
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button
              className="bg-accent hover:bg-accent/90"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Soumettre la déclaration
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimsPage;
