import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Phone, Volume2, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  BarVisualizer,
  useLocalParticipant,
  useRoomContext,
  useVoiceAssistant,
} from "@livekit/components-react";
import "@livekit/components-styles";

// --- CONFIGURATION ---
const LIVEKIT_URL = "wss://mustapha-a5h66n6s.livekit.cloud"; 
const TOKEN_ENDPOINT = "https://jilali21-realtime-multilingual-voice-agent-assurance.hf.space/token?identity=demo-user";

export default function AgentDemoPage() {
  const [token, setToken] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const connectToRoom = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const response = await fetch(TOKEN_ENDPOINT);
      if (!response.ok) throw new Error("Erreur serveur lors de la récupération du token");
      const data = await response.json();
      setToken(data.token);
    } catch (err) {
      console.error(err);
      setError("Impossible de joindre l'agent. Vérifiez l'URL du token.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setToken(""); 
  };

  return (
    // MODIFICATION ICI : 'fixed inset-0 z-[9999]' force la page à passer par-dessus le Sidebar et le Header
    <div className="fixed inset-0 z-[9999] w-screen h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4 font-['Outfit'] text-slate-900 overflow-hidden">
      
      {/* Header Simple */}
      <header className="absolute top-6 left-6 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity z-10">
        <span className="font-semibold tracking-tight">AssurBot AI Demo</span>
      </header>

      <AnimatePresence mode="wait">
        {!token ? (
          /* --- ÉCRAN D'ACCUEIL --- */
          <motion.div 
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center max-w-lg z-10"
          >
            <div className="w-24 h-24 bg-white rounded-3xl shadow-xl mx-auto flex items-center justify-center mb-8 border border-slate-100">
              <Volume2 className="h-10 w-10 text-blue-600" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4 text-slate-900">
              Assistant Vocal Assurance
            </h1>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Discutez avec notre agent IA en temps réel. Il peut gérer les sinistres, répondre aux questions sur les contrats et parler toutes les langues.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center justify-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4" /> {error}
              </div>
            )}

            <Button 
              size="lg" 
              onClick={connectToRoom} 
              disabled={isConnecting}
              className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
            >
              {isConnecting ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Connexion...</>
              ) : (
                <><Mic className="mr-2 h-5 w-5" /> Démarrer la conversation</>
              )}
            </Button>
          </motion.div>
        ) : (
          /* --- ÉCRAN DE L'AGENT (LIVEKIT) --- */
          <motion.div
            key="room"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-4xl h-[80vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200 relative z-10"
          >
             <LiveKitRoom
              serverUrl={LIVEKIT_URL}
              token={token}
              connect={true}
              audio={true}
              video={false}
              onDisconnected={handleDisconnect}
              className="h-full w-full"
            >
              <AgentInterface onClose={handleDisconnect} />
              <RoomAudioRenderer />
            </LiveKitRoom>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- INTERFACE INTERNE DE L'AGENT ---
const AgentInterface = ({ onClose }) => {
  const { state: agentState, audioTrack: agentAudioTrack } = useVoiceAssistant(); 
  const { isMicrophoneEnabled, localParticipant } = useLocalParticipant();
  const room = useRoomContext();

  const toggleMute = () => {
    room.localParticipant.setMicrophoneEnabled(!localParticipant.isMicrophoneEnabled);
  };

  const stateLabels = {
    disconnected: "Déconnecté",
    connecting: "Connexion en cours...",
    connected: "Prêt",
    listening: "Je vous écoute...",
    thinking: "Réflexion...",
    speaking: "L'agent parle...",
  };

  const currentState = agentState || "connecting";

  return (
    <div className="flex flex-col h-full relative">
      
      {/* Barre supérieure */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-start z-10">
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-100 shadow-sm">
          <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${
            currentState === 'speaking' ? 'bg-green-500' : 
            currentState === 'thinking' ? 'bg-amber-400' : 
            currentState === 'listening' ? 'bg-blue-500' : 'bg-slate-300'
          }`} />
          <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">
            {stateLabels[currentState]}
          </span>
        </div>
        
        <Button 
          variant="ghost" 
          onClick={() => room.disconnect()}
          className="text-slate-400 hover:text-red-500 hover:bg-red-50"
        >
          Quitter
        </Button>
      </div>

      {/* Zone Centrale : Visualisation */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white via-blue-50/30 to-white">
        
        {/* Cercle principal avec effet de respiration */}
        <div className="relative">
          {/* Cercles décoratifs animés */}
          {currentState === 'speaking' && (
            <>
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-20"
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="absolute inset-0 bg-blue-300 rounded-full blur-xl opacity-30"
              />
            </>
          )}

          <div className="w-48 h-48 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-slate-50 relative z-10">
            {/* Visualizer intégré */}
            <div className="h-16 flex items-center gap-1.5">
               {currentState === 'speaking' && agentAudioTrack ? (
                 <BarVisualizer
                    state="speaking"
                    trackRef={agentAudioTrack}
                    barCount={5}
                    options={{ minHeight: 30, maxHeight: 80 }}
                    className="flex gap-1.5 items-center justify-center h-full"
                    style={{ backgroundColor: 'transparent' }} 
                 />
               ) : (
                  // Logo statique quand l'agent ne parle pas
                  <Volume2 className={`h-16 w-16 transition-colors duration-500 ${
                    currentState === 'listening' ? 'text-blue-500' : 
                    currentState === 'thinking' ? 'text-amber-400' : 'text-slate-300'
                  }`} />
               )}
            </div>
          </div>
        </div>

        {/* Texte de transcription ou d'état (Optionnel) */}
        <p className="mt-12 text-slate-400 font-medium text-lg animate-pulse">
           {currentState === 'listening' ? "Parlez maintenant..." : ""}
        </p>

      </div>

      {/* Footer : Contrôles */}
      <div className="h-32 bg-white border-t border-slate-100 flex items-center justify-center gap-8">
        
        <Button
          variant="outline"
          size="lg"
          onClick={toggleMute}
          className={cn(
            "h-16 w-16 rounded-full border-2 transition-all duration-300",
            !isMicrophoneEnabled 
              ? "border-red-100 bg-red-50 text-red-500 hover:border-red-200 hover:bg-red-100" 
              : "border-slate-200 hover:bg-slate-50 text-slate-600"
          )}
        >
          {!isMicrophoneEnabled ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>

        <Button
          size="lg"
          onClick={() => room.disconnect()}
          className="h-20 w-20 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 transition-transform hover:scale-105"
        >
          <Phone className="h-8 w-8 rotate-[135deg]" />
        </Button>

      </div>
    </div>
  );
};