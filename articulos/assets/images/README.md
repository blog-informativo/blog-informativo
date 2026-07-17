# Guía de Assets - Imágenes de Artículos

## Estructura Recomendada

```
articulos/
├── assets/
│   └── images/
│       ├── conceptos-basicos/
│       │   ├── 01-hardware.jpg
│       │   ├── 02-software.jpg
│       │   ├── 03-relacion.jpg
│       │   └── placeholder.jpg
│       ├── mantenimiento-hardware/
│       │   ├── 01-disk-fragmentation.jpg
│       │   ├── 02-bookshelf-analogy.jpg
│       │   ├── 03-defrag-process.jpg
│       │   └── placeholder.jpg
│       └── ergonomia-salud-digital/
│           ├── 01-workspace-setup.png
│           ├── 02-posture.png
│           └── placeholder.jpg
├── config/
│   ├── conceptos-basicos.json
│   ├── mantenimiento-hardware.json
│   └── ergonomia-salud-digital.json
└── plantilla-articulo.html (plantilla base única)
```

## Convención de Nombres

```
{numero:02d}-{descripcion-corta}.{ext}
```

Ejemplos:
- `01-hero-image.jpg` (imagen destacada)
- `02-hardware-components.jpg`
- `03-software-diagram.png`
- `04-comparison-table.jpg`
- `placeholder.jpg` (fallback genérico)

## Config JSON por Artículo

```json
{
  "slug": "conceptos-basicos",
  "title": "Conceptos básicos",
  "category": "ARTÍCULO TÉCNICO",
  "date": "2026-01-15",
  "author": "Blog Informativo",
  "heroImage": "01-hero-image.jpg",
  "images": [
    { "id": "01", "src": "01-hero-image.jpg", "alt": "Computadora moderna", "caption": "Figura 1: Computadora moderna", "type": "hero" },
    { "id": "02", "src": "02-hardware-components.jpg", "alt": "Componentes de hardware", "caption": "Figura 2: Componentes principales", "type": "content" },
    { "id": "03", "src": "03-software-diagram.png", "alt": "Diagrama de software", "caption": "Figura 3: Capas de software", "type": "content" }
  ],
  "sections": [
    { "id": "intro", "title": "Introducción", "level": 2, "content": "..." },
    { "id": "hardware", "title": "Hardware", "level": 2, "content": "...", "imageId": "02" },
    { "id": "software", "title": "Software", "level": 2, "content": "...", "imageId": "03" }
  ]
}
```

## Plantilla Base Unificada (`plantilla-articulo.html`)

Una sola plantilla que lee el JSON y renderiza dinámicamente:

```html
<script type="module">
  import { loadArticle } from './script/article-loader.js';
  loadArticle('config/conceptos-basicos.json');
</script>
```

## Ventajas

| Antes | Después |
|-------|---------|
| 15+ archivos HTML duplicados | 1 plantilla + 1 JSON por artículo |
| Rutas relativas frágiles | Assets centralizados en `/assets/images/` |
| Nombres `0.jpg`, `1.jpg` | Nombres descriptivos `01-hero-image.jpg` |
| Cambiar imagen = editar HTML | Cambiar imagen = editar JSON o reemplazar archivo |
| Sin fallback si falta imagen | `placeholder.jpg` automático |
| Mezcla .jpg/.png | Extensión en JSON, flexible |

## Migración Rápida

1. Crear `assets/images/{slug}/` por artículo
2. Renombrar imágenes con convención `NN-descripcion.ext`
3. Crear `config/{slug}.json` con metadatos
4. Usar `plantilla-articulo.html` + `script/article-loader.js`
5. Eliminar HTMLs duplicados antiguos