# Historial de Cambios

## 2026-07-22 (Reversi√≥n de Cambios)
- **Acci√≥n:** `git reset --hard 3f4bddf`
- **Motivo:** A petici√≥n del usuario, se descartaron permanentemente los cambios de los commits m√°s recientes para regresar al estado exacto del commit `3f4bddf`.

## 2026-07-22 (Recuperaci√≥n y Refactorizaci√≥n Post-Reset)
- **Limpieza de Directorios:** Se elimin√≥ la carpeta duplicada `dist` (la carpeta de im√°genes se movi√≥ a la ra√≠z). El `index.html` ya estaba conectado a la carpeta original `articulos`.
- **Modo Oscuro & UI:** Se consolidaron `style_index.css` y `style_articulo.css` en un √∫nico `style_global.css`. Se reemplaz√≥ el uso de Material Symbols (fuente) por SVGs nativos para el toggle de modo oscuro y men√∫. Se mejor√≥ la l√≥gica del JS para guardar la preferencia en localStorage.
- **Formateo de Art√≠culos:** Se reestructuraron las secciones de los blogs 7 y 8, utilizando HTML sem√°ntico (p√°rrafos y tablas).
- **Gesti√≥n de Im√°genes:** Se eliminaron las referencias comentadas a im√°genes escaneadas en el blog 2, y se prepar√≥ el espacio (comentado) en el blog 8 para la infograf√≠a (la imagen se perdi√≥ tras el `git reset --hard`).
- **Reemplazo de Im·genes:** Se eliminÛ la imagen de relleno `ejemplo.webp` y se enlazaron las portadas originales correspondientes para los artÌculos destacados en la p·gina de inicio.
- **CorrecciÛn de Blog 1:** Se reestructurÛ el HTML de `plantilla_articulos_blog1.html` (Mantenimiento de hardware) que tenÌa sus im·genes comentadas y rutas obsoletas. Se aplicaron los tags sem·nticos correspondientes y se enlazaron las im·genes de la carpeta `src/`.
- **CorrecciÛn de Blog 3:** Se reestructurÛ el HTML de `plantilla_articulos_blog3.html` (Conceptos b·sicos) para activar sus im·genes desde la carpeta `src/` y se corrigiÛ el marcado sem·ntico del texto.
- **CorrecciÛn de Modo Oscuro/Claro:** Se actualizaron los scripts (`script_index.js` y `script_articulo.js`) para que el botÛn de tema actualice din·micamente su icono (Sol o Luna) dependiendo del modo activo.
