import type { IconName } from '@/lib/iconMap';

export interface Project {
  id: string;
  title: string;
  type: string;
  icon: IconName;
  objective: string;
  myRole?: string;
  techStack: string[];
  liveUrl?: string;
  /** Captura del sitio (16:10) en /public. */
  image?: string;
  /** Mockups 4:5 con su propio dispositivo y fondo: reemplazan a la captura en /proyectos. */
  gallery?: { src: string; alt: string }[];
  /** Se muestra en la home (Proyectos Destacados). */
  featured: boolean;
}

// Orden de aparición = orden del array. Para sumar un proyecto, agregarlo acá.
export const projects: Project[] = [
  {
    id: "lumus",
    title: "Lumus - Gestor de Gastos con IA",
    type: "Producto SaaS Propio",
    icon: "BarChart3",
    objective: "Darle a cualquier persona en Argentina una forma simple de entender su plata: registrar gastos en segundos y recibir cada mes un informe en lenguaje claro que explica en qué se fue el dinero y cuánto poder adquisitivo se perdió frente al dólar.",
    myRole: "Fundador y desarrollador integral. Diseñé el producto de punta a punta: registro rápido desde el celular, doble moneda peso/dólar, alertas de presupuesto e informes mensuales generados con la API de Claude (Anthropic). Arquitectura en Next.js con Supabase, monitoreo con Sentry y suscripción paga con 30 días de prueba.",
    techStack: ["Next.js", "Supabase", "Claude API", "TailwindCSS"],
    liveUrl: "https://gestorlumus.site",
    image: "/images/projects/lumus.webp",
    featured: true,
  },
  {
    id: "bossio-monteresino",
    title: "Bossio Monteresino - Estudio Jurídico",
    type: "Web Corporativa Profesional",
    icon: "Scale",
    objective: "Digitalizar la presencia de un prestigioso estudio jurídico, estableciendo un canal de comunicación formal y transmitiendo solidez y confianza a través de un diseño sobrio y profesional.",
    myRole: "Dirigí el diseño UX/UI enfocándome en la seriedad institucional. Utilicé herramientas de IA para estructurar el contenido legal y optimizar el SEO. La arquitectura en Next.js garantiza tiempos de carga inmediatos, vitales para la retención de clientes corporativos.",
    techStack: ["Next.js", "TailwindCSS", "Framer Motion", "EmailJS"],
    liveUrl: "https://www.bossiomonteresino.com/",
    image: "/images/projects/bossio-monteresino.webp",
    featured: true,
  },
  {
    id: "dinfes",
    title: "Dinfes - Máquinas Hidráulicas",
    type: "Web Corporativa Industrial",
    icon: "Wrench",
    objective: "Presentar a un fabricante de prensas hidráulicas, máquinas especiales y recipientes a presión bajo Norma ASME VIII con un sitio a la altura de su ingeniería, y un catálogo claro para que la industria encuentre la solución que necesita.",
    myRole: "Diseño y desarrollo completo: catálogo de 9 categorías de productos, secciones de empresa e ingeniería y un recorrido de scroll fluido con animaciones cuidadas, construido sobre Next.js para cargar rápido en cualquier dispositivo.",
    techStack: ["Next.js", "TailwindCSS", "Framer Motion", "Lenis"],
    liveUrl: "https://dinfes.vercel.app/",
    image: "/images/projects/dinfes.webp",
    featured: true,
  },
  {
    id: "mimate-bien",
    title: "Mimate Bien - Tienda de Mates",
    type: "Catálogo & E-commerce",
    icon: "Coffee",
    objective: "Crear una plataforma visual para exhibir un stock variado de productos regionales, facilitando la consulta de disponibilidad y cerrando ventas de forma directa y personalizada vía WhatsApp.",
    myRole: "Implementé un catálogo autogestionable ligero. La integración estratégica con la API de WhatsApp agilizó el embudo de ventas. Utilicé generación de código asistida para crear rápidamente componentes de galería responsivos.",
    techStack: ["React", "Vite", "TailwindCSS", "WhatsApp Business API"],
    liveUrl: "https://www.mimatebien.com/",
    image: "/images/projects/mimate-bien.webp",
    featured: true,
  },
  {
    id: "seve",
    title: "Sève - Tienda de Skincare",
    type: "Proyecto de muestra · E-commerce",
    icon: "ShoppingCart",
    objective: "E-commerce para una marca ficticia de skincare, haircare y body care con estética editorial y cálida. El cliente arma su pedido en el sitio y lo envía por WhatsApp con el mensaje ya escrito: sin pasarela de pago, todo se coordina por chat.",
    myRole: "Diseño de identidad y desarrollo completo. Catálogo de 14 productos con filtros por colección, tipo, momento del día, precio y novedades: cada opción muestra cuántos resultados da, los filtros quedan en la URL y la búsqueda funciona sin tildes. Vista rápida, bolsa que se guarda en el navegador, navegación por teclado y respeto por la preferencia de menos animaciones.",
    techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4"],
    gallery: [
      { src: "/images/projects/seve-catalogo.webp", alt: "Catálogo de Sève con filtros y productos en un monitor" },
      { src: "/images/projects/seve-carrito.webp", alt: "Carrito de Sève en el celular con pedido por WhatsApp" },
      { src: "/images/projects/seve-portada.webp", alt: "Portada de Sève en una laptop" },
    ],
    featured: true,
  },
  {
    id: "maison-elan",
    title: "Maison Élan - Tienda de Moda Femenina",
    type: "Proyecto de muestra · E-commerce",
    icon: "ShoppingCart",
    objective: "Tienda online para una marca ficticia de moda femenina contemporánea: básicos elegantes, sastrería, tejidos, carteras y accesorios con una estética editorial en tonos marfil, arena y espresso. El pedido se arma en el sitio y se envía por WhatsApp con todos los datos, sin pasarela de pago.",
    myRole: "Diseño y desarrollo completo. Catálogo de 26 prendas con filtros por categoría, colección, precio, talle y color, y cinco formas de ordenar. Ficha de producto con selección de color y talle, guía de talles y productos relacionados. Bolsa y favoritos que se guardan en el navegador, checkout con validación que arma el mensaje de WhatsApp y alternativa si el navegador bloquea la ventana. Todo en español rioplatense y respetando la preferencia de menos animaciones.",
    techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "Zustand"],
    liveUrl: "https://maison-elan-peach.vercel.app",
    image: "/images/projects/maison-elan.webp",
    featured: true,
  },
  {
    id: "ra-dev",
    title: "RAdev - Mi Marca Personal",
    type: "Caso de Estudio: Plataforma de Marca",
    icon: "Code",
    objective: "Construir la plataforma digital para mi propia marca, demostrando mi metodología de desarrollo ágil asistida por IA.",
    myRole: "Desarrollo integral, estrategia de contenido y copywriting. Arquitectura estática con Next.js para máximo rendimiento.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "Vercel"],
    image: "/images/projects/ra-dev.webp",
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
