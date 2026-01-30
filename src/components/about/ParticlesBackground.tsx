import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";
import type { Engine } from "tsparticles-engine"; // Optionnel : pour le typage correct

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles" // C'est une bonne pratique d'ajouter un ID
      init={particlesInit}
      options={{
        fullScreen: { enable: false }, // Important pour que ça reste dans le div
        background: { color: "transparent" },
        particles: {
          number: {
            value: 45,
            density: { enable: true, area: 800 },
          },
          color: {
            value: ["#1e3a8a", "#3b82f6", "#94a3b8"],
          },
          shape: {
            type: "circle", // Assurez-vous d'avoir une forme définie
          },
          opacity: {
            value: 0.35,
          },
          size: {
            value: { min: 1, max: 3 },
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            outModes: "out",
          },
          links: {
            enable: true,
            distance: 120,
            color: "#1e3a8a",
            opacity: 0.2,
            width: 1,
          },
        },
        detectRetina: true,
      }}
      // CORRECTION ICI : On retire '-z-10' et on met 'z-0' ou rien.
      // 'absolute inset-0' suffit à le placer en fond du parent, 
      // car le contenu texte a un z-index supérieur.
      className="absolute inset-0 w-full h-full" 
    />
  );
};

export default ParticlesBackground;