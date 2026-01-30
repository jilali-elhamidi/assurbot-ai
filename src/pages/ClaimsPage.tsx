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
  Info,
  CheckCircle2 // <--- AJOUTÉ ICI
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  const selectedClaimType = claimTypes.find((t) => t.id === formData.claimType);

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 font-['Outfit'] selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left"
        >
          <h1 className="text-3xl font-bold text-slate-900">Déclarer un Sinistre</h1>
          <p className="text-slate-500 mt-1">
            Suivez les étapes pour déclarer votre sinistre rapidement et en toute sécurité.
          </p>
        </motion.div>

        {/* Progress Stepper (Style Moderne Clair) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between relative">
            {/* Ligne de fond */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10" />
            
            {steps.map((step, index) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center relative z-10 bg-white px-2">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                      isCompleted ? "bg-emerald-500 border-emerald-500 text-white" : 
                      isActive ? "bg-white border-blue-600 text-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.1)]" : 
                      "bg-white border-slate-200 text-slate-300"
                    )}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                  </div>
                  <span
                    className={cn(
                      "text-xs mt-2 font-medium transition-colors hidden sm:block absolute -bottom-6 w-32 text-center",
                      isActive ? "text-blue-600" : isCompleted ? "text-emerald-600" : "text-slate-400"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="h-6 sm:hidden" /> {/* Spacer mobile */}
        </div>

        {/* Form Container */}
        <div className="bg-white p-6 md:p-10 rounded-2xl border border-slate-200 shadow-sm min-h-[450px] flex flex-col">
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
              
              {/* --- STEP 1: TYPE --- */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">Quel type de sinistre souhaitez-vous déclarer ?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {claimTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setFormData({ ...formData, claimType: type.id })}
                        className={cn(
                          "p-4 rounded-xl border transition-all text-left flex items-center gap-4 group",
                          formData.claimType === type.id
                            ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                            : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
                        )}
                      >
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                          formData.claimType === type.id ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-500"
                        )}>
                          <type.icon className="h-6 w-6" />
                        </div>
                        <span className={cn(
                          "font-medium",
                          formData.claimType === type.id ? "text-blue-900" : "text-slate-700"
                        )}>
                          {type.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* --- STEP 2: DATE & LIEU --- */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">Quand et où s'est produit le sinistre ?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-slate-700">Date du sinistre</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="date"
                          type="date"
                          className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-slate-700">Heure approximative</Label>
                      <Input
                        id="time"
                        type="time"
                        className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-slate-700">Lieu du sinistre</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="location"
                        placeholder="Adresse ou description du lieu"
                        className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* --- STEP 3: DESCRIPTION --- */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">Décrivez les circonstances</h2>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-slate-700">Description détaillée</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez ce qui s'est passé avec le plus de détails possible..."
                      className="min-h-[200px] bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <div className="flex justify-between items-center text-xs">
                        <span className={formData.description.length >= 20 ? "text-emerald-600 flex items-center gap-1" : "text-slate-400"}>
                            {formData.description.length >= 20 && <Check className="w-3 h-3" />} 
                            Minimum 20 caractères
                        </span>
                        <span className="text-slate-400">{formData.description.length} car.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* --- STEP 4: PHOTOS --- */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">Ajoutez des photos (optionnel)</h2>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                     <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                     <p className="text-sm text-blue-800">Les photos aident nos experts à analyser votre dossier plus rapidement. Ajoutez des vues d'ensemble et des gros plans des dégâts.</p>
                  </div>

                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      onChange={handlePhotoUpload}
                      disabled={formData.photos.length >= 5}
                    />
                    <div className={cn(
                        "border-2 border-dashed rounded-xl p-10 text-center transition-colors flex flex-col items-center justify-center min-h-[200px]",
                        formData.photos.length >= 5 ? "border-slate-200 bg-slate-50" : "border-blue-200 bg-blue-50/50 hover:border-blue-400 hover:bg-blue-50"
                    )}>
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                         <Upload className="h-8 w-8 text-blue-500" />
                      </div>
                      <p className="font-medium text-slate-900">
                        {formData.photos.length >= 5 ? "Maximum atteint (5 photos)" : "Cliquez ou déposez vos photos ici"}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">PNG, JPG jusqu'à 10MB</p>
                    </div>
                  </div>

                  {formData.photos.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group shadow-sm">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 text-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600 shadow-sm"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- STEP 5: CONFIRMATION --- */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">Récapitulatif</h2>

                  <div className="space-y-4">
                    {/* Type */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                        {selectedClaimType && (
                            <>
                                <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm text-blue-600">
                                    <selectedClaimType.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Sinistre</p>
                                    <p className="font-bold text-slate-900">{selectedClaimType.label}</p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Grid Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Date</p>
                            <p className="font-medium text-slate-900">{formData.date} {formData.time && `à ${formData.time}`}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Lieu</p>
                            <p className="font-medium text-slate-900 truncate">{formData.location}</p>
                        </div>
                    </div>

                    {/* Desc */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Description</p>
                        <p className="text-sm text-slate-700 leading-relaxed italic">"{formData.description}"</p>
                    </div>

                    {/* Photos */}
                    {formData.photos.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Image className="w-4 h-4" />
                            <span>{formData.photos.length} photo(s) jointe(s)</span>
                        </div>
                    )}
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-sm text-emerald-800">
                     <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                     <p>En soumettant, vous certifiez l'exactitude des informations. Un expert analysera votre demande sous 48h.</p>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <Button
              variant="ghost"
              className="text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Précédent
            </Button>

            {currentStep < steps.length ? (
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100 transition-all hover:scale-105"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Suivant
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-100 transition-all hover:scale-105 min-w-[140px]"
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
                    <Check className="h-4 w-4 mr-2" />
                    Soumettre
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClaimsPage;