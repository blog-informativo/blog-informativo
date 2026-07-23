/* =====================================================================
    SYSTEM_DOCS — Script principal
    - Micro-interacción del input de búsqueda
    - Toggle de la barra lateral (drawer) en móvil/tablet
    - Toggle de Modo Oscuro
    ===================================================================== */

(function () {
    'use strict';

    /* ----------------------------------------------------------------
        1. MODO OSCURO
        ---------------------------------------------------------------- */
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
    } else if (savedTheme === 'light') {
        root.classList.add('light');
        root.classList.remove('dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (root.classList.contains('dark')) {
                root.classList.remove('dark');
                root.classList.add('light');
                localStorage.setItem('theme', 'light');
            } else if (root.classList.contains('light')) {
                root.classList.remove('light');
                root.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    root.classList.add('light');
                    localStorage.setItem('theme', 'light');
                } else {
                    root.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                }
            }
        });
    }

    /* ----------------------------------------------------------------
        2. Micro-interacción del buscador (escala al hacer foco)
        ---------------------------------------------------------------- */
    const searchInput = document.querySelector('.search-input');
    const searchWrapper = document.querySelector('.search-wrapper');

    if (searchInput && searchWrapper) {
        searchInput.addEventListener('focus', function () {
            searchWrapper.classList.add('is-focused');
        });
        searchInput.addEventListener('blur', function () {
            searchWrapper.classList.remove('is-focused');
        });
    }

    /* ----------------------------------------------------------------
        3. Navigation Drawer (barra lateral) en móvil/tablet
        ---------------------------------------------------------------- */
    const menuToggle = document.getElementById('menuToggle');
    const navDrawer  = document.getElementById('navDrawer');
    const navScrim   = document.getElementById('navScrim');

    if (menuToggle && navDrawer && navScrim) {

        const isDesktop = function () {
            return menuToggle.offsetWidth === 0;
        };

        const openDrawer = function () {
            navDrawer.classList.add('is-open');
            navScrim.classList.add('is-visible');
            menuToggle.setAttribute('aria-expanded', 'true');
            menuToggle.innerHTML = '<svg class="menu-icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>';
            menuToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
            document.body.style.overflow = 'hidden';
        };

        const closeDrawer = function () {
            navDrawer.classList.remove('is-open');
            navScrim.classList.remove('is-visible');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.innerHTML = '<svg class="menu-icon" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';
            menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
            document.body.style.overflow = '';
        };

        const toggleDrawer = function () {
            if (isDesktop()) return;
            if (navDrawer.classList.contains('is-open')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        };

        menuToggle.addEventListener('click', toggleDrawer);
        navScrim.addEventListener('click', closeDrawer);

        const navLinks = navDrawer.querySelectorAll('.nav-link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (!isDesktop()) closeDrawer();
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navDrawer.classList.contains('is-open')) {
                closeDrawer();
                menuToggle.focus();
            }
        });

        let resizeTimer = null;
        window.addEventListener('resize', function () {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                if (isDesktop() && navDrawer.classList.contains('is-open')) {
                    closeDrawer();
                }
            }, 150);
        });
    }
})();
