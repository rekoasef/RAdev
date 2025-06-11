"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { type ISourceOptions, type Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim"; 

const HeroBackground = () => {
    // Esta es la nueva forma correcta de inicializar el motor de partículas.
    // Usamos 'useCallback' para que la función no se recree en cada render.
    const particlesInit = useCallback(async (engine: Engine) => {
        // console.log(engine);
        // Aquí se carga el paquete 'slim' que contiene las animaciones de links.
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: any | undefined) => {
        // await console.log("Particles loaded", container);
    }, []);
    
    // El objeto de opciones de configuración no cambia.
    const options: ISourceOptions = {
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "grab",
                },
                onClick: {
                    enable: true,
                    mode: "push",
                },
            },
            modes: {
                grab: {
                    distance: 140,
                    links: {
                        opacity: 1,
                    }
                },
                push: {
                    quantity: 4,
                },
            },
        },
        particles: {
            color: {
                value: "#A0A0A0",
            },
            links: {
                color: "#A0A0A0",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: true,
                speed: 0.5,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 80,
            },
            opacity: {
                value: 0.3,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={options}
            className="absolute top-0 left-0 w-full h-full z-0"
        />
    );
};

export default HeroBackground;