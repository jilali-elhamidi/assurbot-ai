import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Phone, Volume2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
// Imports LiveKit
import {
  LiveKitRoom,
  RoomAudioRenderer,
  BarVisualizer,
  useLocalParticipant,
  useRoomContext,
  useVoiceAssistant,
} from "@livekit/components-react";
import "@livekit/components-styles";

// Configuration (À adapter selon vos variables d'env)
const LIVEKIT_URL = "wss://mustapha-a5h66n6s.livekit.cloud"; 
const TOKEN_ENDPOINT = "https://jilali21-realtime-multilingual-voice-agent-assurance.hf.space/token?identity=frontend-user";

const VoiceAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer le token quand on ouvre le widget
  const connectToRoom = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const response = await fetch(TOKEN_ENDPOINT);
      if (!response.ok) throw new Error("Erreur serveur");
      const data = await response.json();
      setToken(data.token);
      setIsOpen(true);
    } catch (err) {
      console.error(err);
      setError("Impossible de joindre l'assistant.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsOpen(false);
    setToken(""); // On reset le token pour forcer une nouvelle connexion la prochaine fois
  };

  return (
    <>
      {/* --- Floating Action Button (Déclencheur) --- */}
      <motion.button
        onClick={connectToRoom}
        disabled={isConnecting}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full",
          "flex items-center justify-center",
          "bg-primary shadow-lg transition-all",
          "hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isConnecting ? (
          <Loader2 className="h-7 w-7 text-white animate-spin" />
        ) : (
          <>
            <span className="pulse-ring bg-primary" />
            <Mic className="h-7 w-7 text-white relative z-10" />
          </>
        )}
      </motion.button>

      {/* --- Interface Sheet (Conteneur LiveKit) --- */}
      <Sheet open={isOpen} onOpenChange={(open) => !open && handleDisconnect()}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md glass-card border-l border-white/10 p-0"
        >
          {token && (
            <LiveKitRoom
              serverUrl={LIVEKIT_URL}
              token={token}
              connect={true}
              audio={true} // Active le micro automatiquement
              video={false}
              data-lk-theme="default"
              onDisconnected={handleDisconnect}
              className="h-full flex flex-col"
            >
              {/* Le contenu réel de l'appel est géré dans ce sous-composant */}
              <ActiveCallInterface onClose={handleDisconnect} />
              
              {/* Composant invisible essentiel pour entendre l'audio */}
              <RoomAudioRenderer />
            </LiveKitRoom>
          )}

          {!token && error && (
             <div className="flex flex-col items-center justify-center h-full p-6 text-center text-red-500 gap-4">
                <AlertCircle className="w-12 h-12" />
                <p>{error}</p>
                <Button onClick={() => setIsOpen(false)} variant="outline">Fermer</Button>
             </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

// --- Sous-composant : L'interface active pendant l'appel ---
const ActiveCallInterface = ({ onClose }: { onClose: () => void }) => {
  // Hooks LiveKit pour gérer l'état
  const { state: agentState, audioTrack: agentAudioTrack } = useVoiceAssistant(); 
  const { isMicrophoneEnabled, localParticipant } = useLocalParticipant();
  const room = useRoomContext();

  // Mapping des états LiveKit vers votre Design
  const stateLabels: Record<string, string> = {
    disconnected: "Déconnecté",
    connecting: "Connexion...",
    connected: "En écoute...", // Idle state
    listening: "Je vous écoute...",
    thinking: "Analyse en cours...",
    speaking: "AssurBot parle...",
  };

  const stateColors: Record<string, string> = {
    disconnected: "bg-slate-400",
    connecting: "bg-yellow-400",
    connected: "bg-primary",
    listening: "bg-accent",
    thinking: "bg-warning",
    speaking: "bg-emerald-500",
  };

  // Déterminer l'état actuel pour l'UI
  const currentState = agentState || "connecting"; 

  const toggleMute = () => {
    if (localParticipant.isMicrophoneEnabled) {
      room.localParticipant.setMicrophoneEnabled(false);
    } else {
      room.localParticipant.setMicrophoneEnabled(true);
    }
  };

  return (
    <>
      <SheetHeader className="p-6 border-b border-white/10">
        <SheetTitle className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Volume2 className="h-6 w-6 text-primary" />
            </div>
            {/* Indicateur d'état animé */}
            <motion.div
              className={cn(
                "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                stateColors[currentState] || "bg-primary"
              )}
              animate={{ scale: currentState === "speaking" ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Assistant AssurBot</h3>
            <p className="text-sm text-muted-foreground">
              {stateLabels[currentState] || "Connecté"}
            </p>
          </div>
        </SheetTitle>
      </SheetHeader>

      <div className="flex flex-col h-[calc(100vh-180px)]">
        {/* Zone de Visualisation */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-sm">
            <div className="glass-card p-8 rounded-2xl text-center min-h-[250px] flex flex-col justify-center items-center">
              
              {/* Le Visualizer de LiveKit (réagit au vrai son) */}
              <div className="h-24 w-full flex items-center justify-center gap-1">
                 {/* Si l'agent parle, on visualise sa track, sinon on visualise le micro local (feedback) */}
                 {currentState === 'speaking' && agentAudioTrack ? (
                    <BarVisualizer
                        state="speaking"
                        trackRef={agentAudioTrack}
                        barCount={7}
                        options={{ minHeight: 20, maxHeight: 80 }}
                        className="flex gap-1 h-full items-center justify-center"
                        style={{ backgroundColor: 'transparent' }} // Override styles par défaut
                    />
                 ) : (
                    <div className="flex items-center justify-center h-full text-slate-300 text-sm italic">
                        {currentState === 'listening' ? (
                             <div className="animate-pulse">Je vous écoute...</div>
                        ) : (
                             <div>En attente...</div>
                        )}
                    </div>
                 )}
              </div>

              <motion.div
                className={cn(
                  "mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  currentState === "speaking" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                )}
              >
                <span className={cn("w-2 h-2 rounded-full", stateColors[currentState] || "bg-slate-400")} />
                {stateLabels[currentState] || "En ligne"}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Contrôles */}
        <div className="p-6 border-t border-white/10 pb-10">
          <div className="flex items-center justify-center gap-6">
            
            {/* Bouton Mute */}
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "w-14 h-14 rounded-full border-slate-200 transition-all",
                !isMicrophoneEnabled && "bg-red-50 border-red-200 text-red-500"
              )}
              onClick={toggleMute}
            >
              {!isMicrophoneEnabled ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>

            {/* Bouton Principal (Indicateur visuel seulement ici car auto-connecté) */}
            <div className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all",
                currentState === "speaking" ? "bg-emerald-500 shadow-emerald-200" : "bg-blue-600 shadow-blue-200"
            )}>
               <div className="animate-pulse">
                  <Volume2 className="h-8 w-8 text-white" />
               </div>
            </div>

            {/* Bouton Raccrocher */}
            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full border-red-100 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-200"
              onClick={() => {
                room.disconnect();
                onClose();
              }}
            >
              <Phone className="h-6 w-6 rotate-[135deg]" />
            </Button>
          </div>
          
          <p className="text-center text-xs text-slate-400 mt-6">
             IA Darija v1.0 • Connecté via LiveKit
          </p>
        </div>
      </div>
    </>
  );
};

export default VoiceAssistantWidget;
