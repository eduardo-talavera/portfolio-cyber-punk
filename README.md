# Portafolio — Edgar Talavera

Portafolio cinético y bilingüe para un perfil de Software Engineer, AI Engineer y SRE. Construido con Next.js 15, React, TypeScript y Lenis.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Compilación

```bash
npm run typecheck
npm run build
```

El proyecto usa exportación estática de Next.js. El resultado listo para desplegar se genera en `out/`.

## Dependencias de producción

- `next`, `react` y `react-dom`: aplicación y renderizado.
- `lenis`: desplazamiento suave y sincronización de las animaciones con el scroll.

La internacionalización, los temas, el campo visual de canvas y las animaciones de interfaz están implementados sin librerías adicionales.

## Arquitectura

- `app/`: composición de rutas y estilos globales.
- `components/`: componentes visuales; `components/portfolio/` agrupa las secciones del portafolio.
- `content/`: contenido bilingüe y configuración de la terminal, sin estado de interfaz.
- `hooks/`: preferencias persistidas, animaciones de scroll y revelado progresivo.

La página principal funciona como capa de composición: conecta contenido, referencias y componentes, mientras cada hook encapsula un efecto del navegador con su propia limpieza.
