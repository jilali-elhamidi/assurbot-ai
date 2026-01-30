import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Phone, X, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type VoiceState = "idle" | "listening" | "processing" | "speaking";

const VoiceAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);

  const stateLabels: Record<VoiceState, string> = {
    idle: "Appuyez pour parler",
    listening: "En écoute...",
    processing: "Analyse en cours...",
    speaking: "AssurBot parle...",
  };

  const stateColors: Record<VoiceState, string> = {
    idle: "bg-primary",
    listening: "bg-accent",
    processing: "bg-warning",
    speaking: "bg-primary",
  };

  const simulateConversation = () => {
    if (voiceState !== "idle") return;

    setVoiceState("listening");
    setTimeout(() => {
      setTranscript((prev) => [...prev, "Utilisateur: Je voudrais déclarer un sinistre auto"]);
      setVoiceState("processing");
    }, 2000);

    setTimeout(() => {
      setVoiceState("speaking");
      setTranscript((prev) => [
        ...prev,
        "AssurBot: Je vais vous aider à déclarer votre sinistre auto. Pouvez-vous me donner la date de l'accident ?",
      ]);
    }, 3500);

    setTimeout(() => {
      setVoiceState("idle");
    }, 5500);
  };

  const handleEndCall = () => {
    setVoiceState("idle");
    setTranscript([]);
    setIsOpen(false);
  };

  // Visualizer bars animation
  const VisualizerBars = () => {
    const bars = 12;
    return (
      <div className="flex items-center justify-center gap-1 h-24">
        {Array.from({ length: bars }).map((_, i) => (
          <motion.div
            key={i}
            className={cn("voice-bar w-1.5 rounded-full", stateColors[voiceState])}
            animate={{
              height:
                voiceState === "listening" || voiceState === "speaking"
                  ? [12, Math.random() * 60 + 20, 12]
                  : voiceState === "processing"
                  ? [12, 30, 12]
                  : 12,
            }}
            transition={{
              duration: voiceState === "processing" ? 0.5 : 0.3,
              repeat: Infinity,
              delay: i * 0.05,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full",
          "flex items-center justify-center",
          "bg-primary shadow-lg",
          "transition-transform hover:scale-105 active:scale-95"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulse Ring */}
        <span className="pulse-ring bg-primary" />
        <span
          className="pulse-ring bg-primary"
          style={{ animationDelay: "0.5s" }}
        />
        <Mic className="h-7 w-7 text-primary-foreground relative z-10" />
      </motion.button>

      {/* Voice Assistant Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md glass-card border-l border-white/10 p-0"
        >
          <SheetHeader className="p-6 border-b border-white/10">
            <SheetTitle className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Volume2 className="h-6 w-6 text-primary" />
                </div>
                <motion.div
                  className={cn(
                    "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                    stateColors[voiceState]
                  )}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Assistant Vocal</h3>
                <p className="text-sm text-muted-foreground">{stateLabels[voiceState]}</p>
              </div>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-[calc(100vh-180px)]">
            {/* LiveKit Placeholder - Visualizer Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              {/* Placeholder for LiveKitRoom */}
              <div className="w-full max-w-sm">
                <div className="glass-card p-8 rounded-2xl text-center">
                  {/* BarVisualizer Placeholder */}
                  <VisualizerBars />

                  <motion.div
                    className={cn(
                      "mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                      voiceState === "idle" && "bg-muted text-muted-foreground",
                      voiceState === "listening" && "bg-accent/20 text-accent",
                      voiceState === "processing" && "bg-warning/20 text-warning",
                      voiceState === "speaking" && "bg-primary/20 text-primary"
                    )}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full",
                        stateColors[voiceState]
                      )}
                    />
                    {stateLabels[voiceState]}
                  </motion.div>
                </div>

                {/* Transcript Area */}
                <AnimatePresence>
                  {transcript.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="mt-6 glass-card p-4 rounded-xl max-h-48 overflow-y-auto"
                    >
                      <h4 className="text-sm font-medium mb-3 text-muted-foreground">
                        Transcription
                      </h4>
                      <div className="space-y-3">
                        {transcript.map((line, i) => (
                          <motion.p
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={cn(
                              "text-sm",
                              line.startsWith("Utilisateur")
                                ? "text-foreground"
                                : "text-primary"
                            )}
                          >
                            {line}
                          </motion.p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="p-6 border-t border-white/10">
              <div className="flex items-center justify-center gap-4">
                {/* Mute Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "w-14 h-14 rounded-full border-white/20",
                    isMuted && "bg-destructive/20 border-destructive/50"
                  )}
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? (
                    <MicOff className="h-6 w-6 text-destructive" />
                  ) : (
                    <Mic className="h-6 w-6" />
                  )}
                </Button>

                {/* Main Action Button */}
                <Button
                  size="icon"
                  className={cn(
                    "w-20 h-20 rounded-full transition-colors",
                    voiceState === "idle"
                      ? "bg-primary hover:bg-primary/90"
                      : stateColors[voiceState]
                  )}
                  onClick={simulateConversation}
                  disabled={voiceState !== "idle"}
                >
                  <Mic className="h-8 w-8 text-primary-foreground" />
                </Button>

                {/* End Call Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="w-14 h-14 rounded-full border-destructive/50 bg-destructive/20 hover:bg-destructive/30"
                  onClick={handleEndCall}
                >
                  <Phone className="h-6 w-6 text-destructive rotate-[135deg]" />
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Dites "Bonjour AssurBot" pour commencer
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default VoiceAssistantWidget;
