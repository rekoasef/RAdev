"use client";

// Fondo ambiental liviano (CSS puro): grilla técnica + orbes de glow.
// Reemplaza a tsparticles sin costo de JS en runtime.
const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {/* Grilla técnica sutil */}
    <div
      className="absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
      }}
    />

    {/* Orbes de glow */}
    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-accent/[0.07] rounded-full blur-[160px]" />
    <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-brand-accent/[0.05] rounded-full blur-[140px]" />

    {/* Fade inferior */}
    <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-brand-dark to-transparent" />
  </div>
);

export default HeroBackground;
