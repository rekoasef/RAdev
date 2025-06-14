# RA Dev - Portfolio Personal

Este es el repositorio del portfolio personal de "RA Dev", un desarrollador de software que se especializa en dirigir y entregar proyectos web de alta calidad utilizando una metodología de desarrollo asistida por IA.

El sitio está construido con **Next.js (App Router)**, **TypeScript** y **TailwindCSS**. Está diseñado para ser 100% estático, lo que garantiza un rendimiento, seguridad y SEO óptimos.

## Stack Tecnológico

- **Framework**: [Next.js](https://nextjs.org/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [TailwindCSS](https://tailwindcss.com/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Despliegue**: Optimizado para [Vercel](https://vercel.com/) o cualquier hosting de sitios estáticos.

## Primeros Pasos

Sigue estos pasos para levantar el proyecto en tu entorno local.

### Prerrequisitos

- Node.js (versión 18.x o superior)
- npm, yarn o pnpm

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone [https://github.com/tu-usuario/ra-dev-portfolio.git](https://github.com/tu-usuario/ra-dev-portfolio.git)
    cd ra-dev-portfolio
    ```

2.  Instala las dependencias:
    ```bash
    npm install
    ```

3.  Corre el servidor de desarrollo:
    ```bash
    npm run dev
    ```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Cómo Actualizar el Contenido del Portfolio

**Este sitio es estático y no requiere una base de datos.** Todo el contenido de los proyectos se gestiona directamente desde un archivo en el código. Esto hace que la actualización sea increíblemente simple y segura.

### Para Modificar, Agregar o Eliminar Proyectos:

1.  **Abre el archivo de datos**: Navega hasta `src/data/projects.ts`.

2.  **Estructura de un Proyecto**: Dentro del archivo, verás un array llamado `projects`. Cada objeto dentro de este array representa una tarjeta de proyecto en tu portfolio y sigue esta estructura:

    ```typescript
    {
      id: number;           // Identificador único
      title: string;        // Título del proyecto
      type: string;         // Tipo de proyecto (ej: "E-Commerce")
      imageUrl: string;     // Ruta a la imagen (debe estar en /public/images/)
      objective: string;    // El objetivo del proyecto
      myRole: string;       // Tu rol y el proceso que seguiste
      supervisedTech: string[]; // Un array de las tecnologías
      liveUrl: string;      // URL del proyecto en vivo
      codeUrl: string;      // URL del repositorio de código
    }
    ```

3.  **Para agregar un nuevo proyecto**:
    - Agrega tus imágenes de proyecto a la carpeta `/public/images/`.
    - Copia uno de los objetos existentes dentro del array `projects`.
    - Pega el objeto al final del array (o donde quieras que aparezca).
    - **Asegúrate de darle un `id` único**.
    - Modifica todos los campos (`title`, `imageUrl`, `objective`, etc.) con la información de tu nuevo proyecto.

4.  **Para eliminar un proyecto**:
    - Simplemente borra el objeto completo correspondiente a ese proyecto del array `projects`.

5.  **Guarda el archivo**. El servidor de desarrollo se actualizará automáticamente. Si estás en producción, simplemente haz `commit` y `push` de tus cambios a tu repositorio de Git para que tu hosting (como Vercel) lo despliegue automáticamente.

¡Eso es todo! No necesitas tocar ningún otro archivo para gestionar los proyectos de tu portfolio.#   R A d e v  
 #   R A d e v  
 