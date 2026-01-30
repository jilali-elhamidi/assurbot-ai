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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold">
          <span className="gradient-text">Mon Profil</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Gérez vos informations personnelles et préférences
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card border-white/10">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <button className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-6 w-6 text-white" />
                </button>
              </div>
              {/* Info */}
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-xl font-semibold">
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-muted-foreground">{formData.email}</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                  <span className="badge-active text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Client Premium
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-muted-foreground">
                    Membre depuis 2023
                  </span>
                </div>
              </div>
              {/* Quick Stats */}
              <div className="hidden md:flex gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">2</p>
                  <p className="text-xs text-muted-foreground">Contrats</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-warning">1</p>
                  <p className="text-xs text-muted-foreground">Sinistre</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="glass-card border-white/10 p-1">
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <User className="h-4 w-4 mr-2" />
              Informations
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Lock className="h-4 w-4 mr-2" />
              Sécurité
            </TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  Mettez à jour vos informations de contact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="firstName"
                        className="pl-10 input-glass"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      className="input-glass"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10 input-glass"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        className="pl-10 input-glass"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="address"
                      className="pl-10 input-glass"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-2 col-span-1">
                    <Label htmlFor="postalCode">Code postal</Label>
                    <Input
                      id="postalCode"
                      className="input-glass"
                      value={formData.postalCode}
                      onChange={(e) =>
                        setFormData({ ...formData, postalCode: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2 col-span-1 sm:col-span-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input
                      id="city"
                      className="input-glass"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Date de naissance</Label>
                  <div className="relative max-w-xs">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="birthDate"
                      type="date"
                      className="pl-10 input-glass"
                      value={formData.birthDate}
                      onChange={(e) =>
                        setFormData({ ...formData, birthDate: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Button
                    className="bg-primary hover:bg-primary/90"
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

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle>Préférences de notification</CardTitle>
                <CardDescription>
                  Choisissez comment vous souhaitez être contacté
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Notifications par email</p>
                        <p className="text-sm text-muted-foreground">
                          Recevez des mises à jour sur vos contrats
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, email: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Notifications SMS</p>
                        <p className="text-sm text-muted-foreground">
                          Alertes urgentes par SMS
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, sms: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Notifications push</p>
                        <p className="text-sm text-muted-foreground">
                          Notifications sur l'application
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, push: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Newsletter</p>
                        <p className="text-sm text-muted-foreground">
                          Conseils et actualités assurance
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.newsletter}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, newsletter: checked })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle>Sécurité du compte</CardTitle>
                <CardDescription>
                  Gérez la sécurité de votre compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-colors group">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-primary" />
                      <div className="text-left">
                        <p className="font-medium">Changer le mot de passe</p>
                        <p className="text-sm text-muted-foreground">
                          Dernière modification il y a 3 mois
                        </p>
                      </div>
                    </div>
                    <span className="text-primary group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>

                  <button className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-colors group">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-accent" />
                      <div className="text-left">
                        <p className="font-medium">Authentification à deux facteurs</p>
                        <p className="text-sm text-accent">Activée</p>
                      </div>
                    </div>
                    <span className="text-primary group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>

                  <button className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-colors group">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div className="text-left">
                        <p className="font-medium">Moyens de paiement</p>
                        <p className="text-sm text-muted-foreground">
                          Visa •••• 4242
                        </p>
                      </div>
                    </div>
                    <span className="text-primary group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button className="text-destructive hover:text-destructive/80 text-sm font-medium transition-colors">
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
