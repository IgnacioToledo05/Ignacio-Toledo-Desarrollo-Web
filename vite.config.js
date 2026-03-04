/**
 * Configuración de Vite (bundler de desarrollo y producción).
 * Define opciones del servidor de desarrollo y rutas base.
 */
import { defineConfig } from 'vite'

export default defineConfig({
  // Ruta base relativa para que funcione en cualquier subdirectorio (ej: Cloudflare Pages)
  base: './',

  // Opciones del servidor de desarrollo local
  server: {
    port: 3000, // Puerto donde se ejecuta el servidor de desarrollo
  },
})
