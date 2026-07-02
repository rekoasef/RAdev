"use client";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type PointerRef = MutableRefObject<{ x: number; y: number }>;
type Seg = { t: string; c: string };

/* ─────────────────────────────────────────────────────────────
   Escena 3D "de programador": editor de código que se tipea
   solo + terminal corriendo comandos, flotando con parallax.
   Las ventanas son CanvasTextures (2D) sobre planos 3D.
   ───────────────────────────────────────────────────────────── */

// Paleta sintaxis (naranja de marca como keyword)
const C = {
  bg: "#0d0d10",
  chrome: "#141419",
  border: "rgba(255,101,0,0.28)",
  lineNr: "#3a3a42",
  text: "#e6e6ea",
  keyword: "#FF6500",
  string: "#7ee787",
  prop: "#79c0ff",
  comment: "#6e7681",
  punct: "#9a9aa5",
  title: "#8a8a94",
  green: "#3fb950",
};

const CODE_LINES: Seg[][] = [
  [{ t: "const", c: C.keyword }, { t: " dev ", c: C.text }, { t: "= {", c: C.punct }],
  [{ t: "  nombre", c: C.prop }, { t: ": ", c: C.punct }, { t: "'RA Dev'", c: C.string }, { t: ",", c: C.punct }],
  [{ t: "  stack", c: C.prop }, { t: ": [", c: C.punct }, { t: "'Next.js'", c: C.string }, { t: ", ", c: C.punct }, { t: "'React'", c: C.string }, { t: "],", c: C.punct }],
  [{ t: "  foco", c: C.prop }, { t: ": ", c: C.punct }, { t: "'resultados'", c: C.string }, { t: ",", c: C.punct }],
  [{ t: "  disponible", c: C.prop }, { t: ": ", c: C.punct }, { t: "true", c: C.keyword }, { t: ",", c: C.punct }],
  [{ t: "};", c: C.punct }],
  [{ t: "", c: C.text }],
  [{ t: "// Webs rápidas, modernas y escalables", c: C.comment }],
  [{ t: "export default", c: C.keyword }, { t: " function ", c: C.keyword }, { t: "TuProyecto", c: C.prop }, { t: "() {", c: C.punct }],
  [{ t: "  return ", c: C.keyword }, { t: "<", c: C.punct }, { t: "Experiencia", c: C.keyword }, { t: " unica ", c: C.prop }, { t: "/>;", c: C.punct }],
  [{ t: "}", c: C.punct }],
];

const TERMINAL_LINES = [
  { t: "$ npm run build", c: C.text },
  { t: "✓ Compilado en 1.2s", c: C.green },
  { t: "$ deploy --prod", c: C.text },
  { t: "▲ Sitio online ✦", c: C.keyword },
];

/* Chrome de ventana: fondo redondeado + semáforo + título */
function drawWindow(ctx: CanvasRenderingContext2D, w: number, h: number, title: string) {
  ctx.clearRect(0, 0, w, h);
  const r = 22;
  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, r);
  ctx.fillStyle = C.bg;
  ctx.fill();
  ctx.strokeStyle = C.border;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Barra superior
  ctx.beginPath();
  ctx.roundRect(0, 0, w, 52, [r, r, 0, 0]);
  ctx.fillStyle = C.chrome;
  ctx.fill();

  const lights = ["#ff5f57", "#febc2e", "#28c840"];
  lights.forEach((color, i) => {
    ctx.beginPath();
    ctx.arc(34 + i * 30, 26, 7, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  });

  ctx.font = "500 17px ui-monospace, monospace";
  ctx.fillStyle = C.title;
  ctx.fillText(title, 130, 32);
}

/* ── Ventana de editor con tipeo progresivo ── */
const EditorPanel = ({ reduced }: { reduced: boolean }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const typed = useRef(0);
  const lastTick = useRef(0);

  const { texture, ctx, canvas } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 820;
    canvas.height = 560;
    const ctx = canvas.getContext("2d")!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 4;
    return { texture, ctx, canvas };
  }, []);

  const totalChars = useMemo(
    () => CODE_LINES.reduce((acc, line) => acc + line.reduce((a, s) => a + s.t.length, 0), 0),
    []
  );

  const draw = (chars: number, cursorOn: boolean) => {
    const w = canvas.width, h = canvas.height;
    drawWindow(ctx, w, h, "portfolio.tsx");

    ctx.font = "500 22px ui-monospace, monospace";
    let remaining = chars;
    let cursorX = 0, cursorY = 0;

    CODE_LINES.forEach((line, li) => {
      const y = 100 + li * 38;
      ctx.fillStyle = C.lineNr;
      ctx.fillText(String(li + 1).padStart(2, " "), 24, y);

      let x = 88;
      for (const seg of line) {
        if (remaining <= 0) break;
        const visible = seg.t.slice(0, remaining);
        remaining -= seg.t.length;
        ctx.fillStyle = seg.c;
        ctx.fillText(visible, x, y);
        x += ctx.measureText(visible).width;
      }
      if (remaining >= 0) { cursorX = x; cursorY = y; }
    });

    if (cursorOn) {
      ctx.fillStyle = C.keyword;
      ctx.fillRect(cursorX + 4, cursorY - 20, 11, 26);
    }
    texture.needsUpdate = true;
  };

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (reduced) {
      if (typed.current !== totalChars) {
        typed.current = totalChars;
        draw(totalChars, false);
      }
    } else if (typed.current < totalChars) {
      // ~40 caracteres por segundo
      if (t - lastTick.current > 0.025) {
        lastTick.current = t;
        typed.current += 1;
        draw(typed.current, true);
      }
    } else {
      // Cursor titilando al terminar
      const on = Math.floor(t * 2) % 2 === 0;
      if (Math.floor(t * 2) !== Math.floor(lastTick.current * 2)) {
        lastTick.current = t;
        draw(typed.current, on);
      }
    }

    if (mesh.current && !reduced) {
      mesh.current.position.y = 0.25 + Math.sin(t * 0.8) * 0.07;
    }
  });

  return (
    <mesh ref={mesh} position={[0.35, 0.25, 0]} rotation={[0, -0.12, 0]}>
      <planeGeometry args={[3.4, 2.32]} />
      <meshBasicMaterial map={texture} transparent side={THREE.FrontSide} />
    </mesh>
  );
};

/* ── Terminal con comandos en loop ── */
const TerminalPanel = ({ reduced }: { reduced: boolean }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const shown = useRef(-1);

  const { texture, ctx, canvas } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 560;
    canvas.height = 300;
    const ctx = canvas.getContext("2d")!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 4;
    return { texture, ctx, canvas };
  }, []);

  const draw = (count: number, cursorOn: boolean) => {
    const w = canvas.width, h = canvas.height;
    drawWindow(ctx, w, h, "terminal");

    ctx.font = "500 21px ui-monospace, monospace";
    TERMINAL_LINES.slice(0, count).forEach((line, i) => {
      ctx.fillStyle = line.c;
      ctx.fillText(line.t, 28, 100 + i * 40);
    });

    if (cursorOn) {
      const y = 100 + count * 40;
      ctx.fillStyle = C.keyword;
      ctx.fillRect(28, y - 19, 11, 24);
    }
    texture.needsUpdate = true;
  };

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Ciclo de 8s: una línea nueva por segundo, pausa y reinicio
    const cycle = reduced ? TERMINAL_LINES.length : Math.floor(t % 8);
    const count = Math.min(cycle, TERMINAL_LINES.length);
    const cursorOn = Math.floor(t * 2) % 2 === 0;

    const key = count * 2 + (cursorOn ? 1 : 0);
    if (key !== shown.current) {
      shown.current = key;
      draw(count, count < TERMINAL_LINES.length && cursorOn);
    }

    if (mesh.current && !reduced) {
      mesh.current.position.y = -1.05 + Math.sin(t * 0.8 + 1.4) * 0.06;
    }
  });

  return (
    <mesh ref={mesh} position={[-1.15, -1.05, 0.55]} rotation={[0.02, 0.18, 0.015]}>
      <planeGeometry args={[2.1, 1.13]} />
      <meshBasicMaterial map={texture} transparent side={THREE.FrontSide} />
    </mesh>
  );
};

/* ── Acento geométrico: octaedro wireframe girando despacio ── */
const CodeGlyph = () => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.35;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.15;
  });
  return (
    <mesh ref={mesh} position={[1.85, 1.15, -0.5]} scale={0.35}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={C.keyword} wireframe transparent opacity={0.35} />
    </mesh>
  );
};

/* ── Partículas orbitando la composición ── */
const OrbitParticles = ({ reduced }: { reduced: boolean }) => {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 200;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) - 0.5;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const speed = reduced ? 0.008 : 0.03;
    points.current.rotation.y = state.clock.elapsedTime * speed;
    points.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#FF9350" size={0.02} transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
};

/* ── Grupo con parallax hacia el mouse ── */
const Composition = ({ reduced, pointer }: { reduced: boolean; pointer: PointerRef }) => {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!group.current) return;
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, pointer.current.x, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, pointer.current.y, 0.05);
    group.current.rotation.y = mouse.current.x * 0.22;
    group.current.rotation.x = -mouse.current.y * 0.12;
  });

  return (
    <group ref={group}>
      <EditorPanel reduced={reduced} />
      <TerminalPanel reduced={reduced} />
      <CodeGlyph />
      <OrbitParticles reduced={reduced} />
    </group>
  );
};

const CodeScene = () => {
  const pointer = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Tracking global del mouse: la escena reacciona aunque el cursor
  // esté sobre el texto del hero, no solo sobre el canvas.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Pausa total del render loop cuando la escena sale del viewport:
  // scrollear el resto de la página no compite con el canvas.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <Composition reduced={reduced} pointer={pointer} />
      </Canvas>
    </div>
  );
};

export default CodeScene;
