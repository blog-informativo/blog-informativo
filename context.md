# Contexto del Proyecto

## Tarea Actual
- **Objetivo**: Revertir el estado del repositorio al commit `3f4bddf` de forma destructiva, borrando los commits y cambios posteriores para empezar desde este punto.
- **Acciones Tomadas**: Se consultó al usuario sobre qué tipo de retorno quería, y tras confirmar, se ejecutó `git reset --hard 3f4bddf` devolviendo el proyecto al estado exacto de ese commit.


# Contexto de la tarea

**Objetivo:** El usuario solicita que exista una sola carpeta de `articulos`. Actualmente existen dos: una en la raíz del proyecto y otra dentro de la carpeta `dist`. Se debe conectar la carpeta original con el archivo `index.html` de la raíz ("el verdadero"). Posteriormente, el usuario pidió quitar por completo la carpeta `dist` y ordenarla.

**Estado Actual:**
- Resuelto. Se verificó que el archivo `index.html` de la raíz ya estaba conectado correctamente a la carpeta original `articulos` de la raíz.
- Se le consultó al usuario y se eliminó la carpeta duplicada `dist/articulos` para cumplir con el objetivo de dejar una sola.
- Se movió la carpeta `images` de `dist` a la raíz para que las imágenes (como `ejemplo.webp`) carguen correctamente, y se borró definitivamente el resto del contenido de `dist`.
- Se revisó que todos los enlaces en el `index.html` (`href="articulos/..."` e `images/...`) estuvieran apuntando de forma correcta a sus respectivas carpetas raíz y subcarpetas. Todo funciona perfectamente.
- **Modo Oscuro:** Se reparó el toggle de modo oscuro que no funcionaba en la página principal ni se mantenía. Se agregó `id="themeToggle"` al botón en `index.html`, la lógica en `script_index.js` y las variables CSS de `.dark` en `style_index.css`. Ahora el modo oscuro funciona en toda la página y los artículos, recordando la preferencia del usuario en el navegador.
- **Unificación de CSS:** Se combinaron los archivos `style_index.css` y `style_articulo.css` en un archivo global `style_global.css` dentro de la carpeta `styles/` de la raíz. Todos los HTML del proyecto han sido actualizados para vincular este nuevo y único archivo de estilos.

## Notas sobre el Modo Oscuro
- **Lógica Unificada**: El estado del tema (`dark` / `light`) se guarda en `localStorage` ('theme'). `script_index.js` e `script_articulo.js` lo leen y aplican la clase `.dark` a la etiqueta `<html>`.
- **Botón Estandarizado y Traducido**: Se ha reemplazado cualquier versión antigua del botón del tema en todos los artículos por un único `<span>` con ID `themeToggle` que contiene un gráfico vectorial SVG representando el contraste (mitad relleno, mitad vacío). De esta manera el ícono es universal, no requiere que se cargue una tipografía externa específica, y la lógica de Javascript ya no sobreescribe su contenido para cambiar su texto, evitando problemas de traducción e internacionalización.
- **Icono del Menú Móvil**: Se replicó la solución de SVG para el botón de menú hamburguesa (`#menuToggle`). Se eliminó la clase `material-symbols-outlined` y se insertó directamente un SVG. Además, en `script_index.js` se actualizó la función que alterna su estado para que ahora intercambie el SVG entre las "tres rayas" (menú) y la "X" (cerrar), en lugar de cambiar la propiedad de texto, corrigiendo así también el problema de visualización.
- **Variables Globales y Preferencias de Sistema**: Se mejoró la lógica en `.css` y `.js` para que los botones de alternancia tengan total jerarquía sobre la preferencia de color del sistema operativo (`prefers-color-scheme`), utilizando la clase `.light` y `:root:not(.light)` para anularla de manera efectiva.
- **Limitación en Local**: Si el proyecto se abre directamente como archivo local (`file://`), es posible que navegadores como Chrome no compartan el `localStorage` entre distintos archivos HTML, por lo que cambiar el tema en `index.html` podría no verse reflejado inmediatamente al entrar a un artículo (a menos que se use un servidor local como Live Server).

## Gestión de Imágenes en Artículos
- **Depuración y Habilitación**: Se revisó artículo por artículo. En "articuloMantenimiento de hardware" se habilitaron las imágenes correctas y se eliminaron duplicados. En "conceptos basicos" se eliminó la carpeta duplicada y no se habilitaron imágenes. 
- **Extracción desde Documentos**: En "Cuidado preventivo frente a accidentes y transporte", se extrajo una infografía desde su archivo `.docx` original y se integró correctamente al HTML del artículo.
- **Filtrado**: En "Guía Limpieza de ventiladores", se revisaron y borraron imágenes escaneadas que no servían (texto y logos).

## Corrección de Formato de Artículos
- **Actualizaciones críticas y seguridad del sistema**: Se corrigió un problema severo de organización y estructura en `plantilla_articulos_blog7.html`. El texto original estaba dividido en decenas de etiquetas `<p>` inconexas dentro de etiquetas `<section>`. Se reestructuró la semántica HTML unificando los párrafos en secciones lógicas e insertando `<table>` para mostrar comparativas de tipos de actualizaciones, configuraciones y cuellos de botella de manera tabulada y profesional.
- **Gestión de Despliegue (.assetsignore)**: Se agregaron `context.md`, `hystory.md`, `.vscode/`, `.wrangler/` y `.wrangler/tmp` al archivo `.assetsignore` para ignorar archivos y carpetas de desarrollo y documentación en el despliegue de assets.
