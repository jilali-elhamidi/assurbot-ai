import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Save,
  Camera,
  Bell,
  Lock,
  CreditCard,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const ProfilePage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "06 12 34 56 78",
    address: "15 Rue de la Paix",
    city: "Paris",
    postalCode: "75002",
    birthDate: "1985-06-15",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    newsletter: false,
  });

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès.",
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 bg-slate-50/50 min-h-screen p-6 md:p-8 font-['Outfit'] selection:bg-blue-100 selection:text-blue-900">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-slate-900">Mon Profil</h1>
        <p className="text-slate-500 mt-1">
          Gérez vos informations personnelles et vos préférences.
        </p>
      </motion.div>

      {/* Profile Card Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
          {/* BANNIÈRE BLEUE (Hauteur réduite pour éviter les conflits : h-32) */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90" />
          
          <CardContent className="px-6 pb-6 md:px-8 md:pb-8 relative">
            {/* Conteneur avec z-index pour rester au-dessus */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end -mt-12 gap-4 sm:gap-6">
              
              {/* Avatar (Taille ajustée : w-24 h-24) */}
              <div className="relative group flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-white p-1.5 shadow-lg">
                    <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden relative">
                        <User className="h-10 w-10 text-slate-400" />
                    </div>
                </div>
                <button className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 text-white m-1.5">
                  <Camera className="h-6 w-6" />
                </button>
              </div>

              {/* Info - Avec marge supérieure (mt-4) pour bien descendre dans le blanc */}
              <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0 sm:mb-2">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {formData.firstName} {formData.lastName}
                </h2>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-1 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        {formData.email}
                    </span>
                    <span className="hidden sm:inline text-slate-300">|</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-medium bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                        <Shield className="h-3 w-3" /> Client Premium
                    </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-8 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-8 mt-2 sm:mt-0 w-full sm:w-auto justify-center sm:justify-start">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">2</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contrats</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">1</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sinistre</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs & Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="bg-slate-100 p-1 border border-slate-200 rounded-xl w-full sm:w-auto flex h-auto overflow-x-auto">
            <TabsTrigger
              value="personal"
              className="flex-1 sm:flex-none data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-lg py-2.5 px-6 transition-all font-medium whitespace-nowrap"
            >
              <User className="h-4 w-4 mr-2" />
              Informations
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex-1 sm:flex-none data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-lg py-2.5 px-6 transition-all font-medium whitespace-nowrap"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex-1 sm:flex-none data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-lg py-2.5 px-6 transition-all font-medium whitespace-nowrap"
            >
              <Lock className="h-4 w-4 mr-2" />
              Sécurité
            </TabsTrigger>
          </TabsList>

          {/* --- TAB 1: INFORMATIONS --- */}
          <TabsContent value="personal">
            <Card className="border-slate-200 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Informations personnelles</CardTitle>
                <CardDescription className="text-slate-500">
                  Mettez à jour vos informations de contact et d'adresse.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Nom / Prénom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-700">Prénom</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="firstName"
                        className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-700">Nom</Label>
                    <Input
                      id="lastName"
                      className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-700">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="phone"
                        className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Adresse */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-slate-700">Adresse</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="address"
                      className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  <div className="space-y-2 col-span-1">
                    <Label htmlFor="postalCode" className="text-slate-700">Code postal</Label>
                    <Input
                      id="postalCode"
                      className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 col-span-1 sm:col-span-2">
                    <Label htmlFor="city" className="text-slate-700">Ville</Label>
                    <Input
                      id="city"
                      className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-6 flex justify-end border-t border-slate-100">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100"
                    onClick={handleSave}
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
                        <Save className="h-4 w-4 mr-2" />
                        Enregistrer les modifications
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- TAB 2: NOTIFICATIONS --- */}
          <TabsContent value="notifications">
            <Card className="border-slate-200 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Préférences</CardTitle>
                <CardDescription className="text-slate-500">
                  Choisissez comment nous pouvons vous contacter.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {[
                    { key: 'email', label: 'Email', desc: 'Mises à jour sur vos contrats', icon: Mail, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { key: 'sms', label: 'SMS', desc: 'Alertes urgentes et rappels', icon: Phone, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { key: 'push', label: 'Push Mobile', desc: 'Notifications sur l\'application', icon: Bell, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { key: 'newsletter', label: 'Newsletter', desc: 'Conseils et actualités', icon: Mail, color: 'text-amber-600', bg: 'bg-amber-50' }
                ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={cn("p-2.5 rounded-lg", item.bg, item.color)}>
                                <item.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">{item.label}</p>
                                <p className="text-sm text-slate-500">{item.desc}</p>
                            </div>
                        </div>
                        <Switch
                            checked={notifications[item.key as keyof typeof notifications]}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                        />
                    </div>
                ))}

              </CardContent>
            </Card>
          </TabsContent>

          {/* --- TAB 3: SECURITÉ --- */}
          <TabsContent value="security">
            <Card className="border-slate-200 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Sécurité du compte</CardTitle>
                <CardDescription className="text-slate-500">
                  Protégez votre compte et gérez vos accès.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-slate-50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-slate-100 text-slate-600">
                        <Lock className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-slate-900">Mot de passe</p>
                      <p className="text-sm text-slate-500">Dernière modification il y a 3 mois</p>
                    </div>
                  </div>
                  <span className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all">→</span>
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-slate-50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
                        <Shield className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-slate-900">Double authentification (2FA)</p>
                      <p className="text-sm text-emerald-600 font-medium">Activée</p>
                    </div>
                  </div>
                  <span className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all">→</span>
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-slate-50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
                        <CreditCard className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-slate-900">Moyens de paiement</p>
                      <p className="text-sm text-slate-500">Visa •••• 4242</p>
                    </div>
                  </div>
                  <span className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all">→</span>
                </button>

                <div className="pt-6 border-t border-slate-100">
                  <button className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                    <LogOut className="h-4 w-4" />
                    Supprimer mon compte
                  </button>
                </div>

              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default ProfilePage;