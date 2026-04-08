"use client";

import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine); // ✅ correct for new version
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: { value: "transparent" } },
        particles: {
          number: { value: 40 },
          color: { value: ["#ff0080", "#ff8c00", "#40e0d0"] },
          move: { enable: true, speed: 1 },
          opacity: { value: 0.5 },
          size: { value: { min: 2, max: 6 } },
        },
      }}
    />
  );
}