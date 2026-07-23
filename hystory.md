# Historial de Cambios

## 2026-07-22 (Reversión de Cambios)
- **Acción:** `git reset --hard 3f4bddf`
- **Motivo:** A petición del usuario, se descartaron permanentemente los cambios de los commits más recientes para regresar al estado exacto del commit `3f4bddf`.

## 2026-07-22 (Recuperación y Refactorización Post-Reset)
- **Limpieza de Directorios:** Se eliminó la carpeta duplicada `dist` (la carpeta de imágenes se movió a la raíz). El `index.html` ya estaba conectado a la carpeta original `articulos`.
- **Modo Oscuro & UI:** Se consolidaron `style_index.css` y `style_articulo.css` en un único `style_global.css`. Se reemplazó el uso de Material Symbols (fuente) por SVGs nativos para el toggle de modo oscuro y menú. Se mejoró la lógica del JS para guardar la preferencia en localStorage.
- **Formateo de Artículos:** Se reestructuraron las secciones de los blogs 7 y 8, utilizando HTML semántico (párrafos y tablas).
- **Gestión de Imágenes:** Se eliminaron las referencias comentadas a imágenes escaneadas en el blog 2, y se preparó el espacio (comentado) en el blog 8 para la infografía (la imagen se perdió tras el `git reset --hard`).
