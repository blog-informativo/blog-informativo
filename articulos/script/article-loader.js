const ASSETS_BASE = 'assets/images/';
const CONFIG_BASE = 'config/';
const PLACEHOLDER = 'placeholder.jpg';

async function loadArticle(slug) {
  const res = await fetch(`${CONFIG_BASE}${slug}.json`);
  if (!res.ok) throw new Error(`No se encontró config: ${slug}`);
  const config = await res.json();
  renderArticle(config);
}

function renderArticle(config) {
  document.getElementById('page-title').textContent = `${config.title} | Blog Informativo`;
  document.getElementById('site-title').textContent = 'Blog Informativo';
  renderNav();
  renderBody(config);
  renderSidebar(config);
  initThemeToggle();
}

function renderNav() {
  const nav = document.getElementById('main-nav');
  nav.innerHTML = `
    <a href="../../index.html#inicio">Inicio</a>
    <a href="../../index.html#articulos">Reseñas</a>
    <a href="../../index.html#articulos">Noticias</a>
    <a href="../../index.html#conceptos">Tutoriales</a>
  `;
}

function renderBody(config) {
  const body = document.getElementById('article-body');
  const heroImg = config.images.find(i => i.type === 'hero') || config.images[0];
  const heroSrc = heroImg ? `${ASSETS_BASE}${config.slug}/${heroImg.src}` : '';
  
  body.innerHTML = `
    <header class="article-title-block">
      <p class="font-label text-dim">${config.category || 'ARTÍCULO TÉCNICO'}</p>
      <h1 class="font-headline-lg">${escapeHtml(config.title)}</h1>
      <div class="metadata-bar font-label text-dim">
        <span>📅 ${config.date || 'Fecha'}</span>
        <span class="separator">|</span>
        <span>👤 ${config.author || 'Autor'}</span>
        <span class="separator">|</span>
        <span>📁 ${config.category || 'Categoría'}</span>
      </div>
    </header>
    ${heroSrc ? `
      <figure class="article-figure article-figure-featured">
        <img src="${heroSrc}" alt="${escapeHtml(heroImg.alt)}" loading="eager" onerror="this.src='${ASSETS_BASE}${config.slug}/${PLACEHOLDER}'">
        <figcaption>${escapeHtml(heroImg.caption || '')}</figcaption>
      </figure>
    ` : ''}
    ${config.sections.map(renderSection).join('')}
  `;
}

function renderSection(section) {
  const headingTag = section.level === 2 ? 'h2' : 'h3';
  const headingClass = section.level === 2 ? 'article-subheading' : '';
  let html = '';
  
  if (section.imageId) {
    const img = config.images.find(i => i.id === section.imageId);
    if (img) {
      html += `
        <figure class="article-figure">
          <img src="${ASSETS_BASE}${config.slug}/${img.src}" alt="${escapeHtml(img.alt)}" loading="lazy" onerror="this.src='${ASSETS_BASE}${config.slug}/${PLACEHOLDER}'">
          <figcaption>${escapeHtml(img.caption || '')}</figcaption>
        </figure>
      `;
    }
  }
  
  if (section.title) {
    html += `<${headingTag} class="${headingClass}">${escapeHtml(section.title)}</${headingTag}>`;
  }
  
  if (section.content) {
    const paragraphs = section.content.split('\n\n').filter(p => p.trim());
    html += `<section class="article-section">${paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}</section>`;
  }
  
  if (section.list) {
    html += `<section class="article-section"><ul class="article-list">${section.list.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>`;
  }
  
  return html;
}

function renderSidebar(config) {
  const sidebar = document.getElementById('article-sidebar');
  sidebar.innerHTML = `
    <div class="wireframe-box aspect-video flex-center" style="border: 2px dashed var(--surface-dim); background: var(--surface-low); border-radius: 4px;">
      <svg class="text-dim" height="40" viewBox="0 0 40 40" width="40"><path d="M0 0 L40 40 M40 0 L0 40" stroke="currentColor" stroke-width="1"></path></svg>
    </div>
    <div class="sidebar-widget bg-lowest">
      <div class="search-box-placeholder font-label uppercase text-dim font-bold text-xs" style="height: 40px; border: 1px solid var(--surface-dim); display: flex; align-items: center; padding: 0 16px;">Barra de Búsqueda</div>
    </div>
    <div class="sidebar-widget bg-lowest">
      <h3 class="font-label uppercase tracking-widest mb-sm">Entradas Recientes</h3>
      <ul class="related-list" id="recent-list"></ul>
    </div>
    <div class="sidebar-widget bg-lowest">
      <h3 class="font-label uppercase tracking-widest mb-sm">Categorías Populares</h3>
      <div class="tags-group" id="tags-group"></div>
    </div>
    <div class="sidebar-widget bg-lowest text-center">
      <h3 class="font-label uppercase tracking-widest mb-sm">Suscripción al Boletín</h3>
      <div class="skeleton-button" style="height: 32px; background: var(--primary); border-radius: 4px; width: 100%; opacity: 0.8;"></div>
    </div>
  `;
  loadRecentArticles();
}

async function loadRecentArticles() {
  try {
    const res = await fetch(`${CONFIG_BASE}index.json`);
    const data = await res.json();
    const list = document.getElementById('recent-list');
    if (list && data.recent) {
      list.innerHTML = data.recent.slice(0, 3).map(r => 
        `<li><a href="plantilla-articulo.html?slug=${r.slug}">${escapeHtml(r.title)}</a></li>`
      ).join('');
    }
  } catch (e) {
    console.warn('No se pudo cargar index.json para artículos recientes');
  }
}

function initThemeToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  
  if (stored === 'dark') root.classList.add('dark');
  else if (stored === 'light') root.classList.remove('dark');
  
  if (toggle) {
    toggle.addEventListener('click', () => {
      const dark = root.classList.toggle('dark');
      localStorage.setItem('theme', dark ? 'dark' : 'light');
      toggle.setAttribute('aria-pressed', String(dark));
    });
    toggle.setAttribute('aria-pressed', String(root.classList.contains('dark')));
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

const params = new URLSearchParams(window.location.search);
const slug = params.get('slug') || 'plantilla';
loadArticle(slug).catch(err => {
  console.error(err);
  document.getElementById('article-body').innerHTML = `
    <div class="wireframe-box text-center py-large" style="border: 2px dashed var(--surface-dim); background: var(--surface-low); border-radius: 4px;">
      <h1 class="font-headline-lg uppercase tracking-tight">Error cargando artículo</h1>
      <p class="text-dim">No se encontró: ${escapeHtml(slug)}.json</p>
    </div>
  `;
});

let config = {};