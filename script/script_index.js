/* =====================================================================
    SYSTEM_DOCS — Script principal
    - Toggle de tema claro/oscuro
    - Micro-interacción del input de búsqueda
    - Toggle de la barra lateral (drawer) en móvil/tablet
    ===================================================================== */

(function () {
    'use strict';

    /* ----------------------------------------------------------------
        1. Theme toggle (claro / oscuro)
        ---------------------------------------------------------------- */
/* ----------------------------------------------------------------
        1. Theme toggle (claro / oscuro) con LocalStorage
        ---------------------------------------------------------------- */
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;

    if (themeToggle) {
        // 1. Recuperar preferencia del usuario almacenada en LocalStorage
        const currentTheme = localStorage.getItem('theme');
        
        // 2. Aplicar el tema si hay uno guardado
        if (currentTheme === 'dark') {
            root.classList.add('dark');
        } else if (currentTheme === 'light') {
            root.classList.remove('dark');
        }

        // 3. Configurar el ícono inicial dependiendo del estado
        if (root.classList.contains('dark')) {
            themeToggle.textContent = 'light_mode';
        } else {
            themeToggle.textContent = 'contrast';
        }

        // 4. Manejar el evento de click
        themeToggle.addEventListener('click', function () {
            root.classList.toggle('dark');
            const isDark = root.classList.contains('dark');
            
            // Alternar ícono
            themeToggle.textContent = isDark ? 'light_mode' : 'contrast';
            
            // Guardar preferencia para la próxima vez que entre a la web
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
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
        ----------------------------------------------------------------
        - Botón #menuToggle abre/cierra el drawer
        - #navDrawer es el aside
        - #navScrim es el overlay semitransparente
        - Se cierra al: click en scrim, click en un nav-link, o tecla Escape
        - En escritorio (>=1024px) el drawer siempre está visible y el
        botón de menú no existe, por lo que este código no hace nada.
        ---------------------------------------------------------------- */
    const menuToggle = document.getElementById('menuToggle');
    const navDrawer  = document.getElementById('navDrawer');
    const navScrim   = document.getElementById('navScrim');

    // Si no hay botón de menú (escritorio), no hacemos nada.
    if (menuToggle && navDrawer && navScrim) {

        // ¿Está el drawer en modo móvil (deslizable)? Lo comprobamos leyendo
        // el valor computado de transform del botón: en escritorio el botón
        // tiene display:none, así que su offsetWidth es 0.
        const isDesktop = function () {
            return menuToggle.offsetWidth === 0;
        };

        const openDrawer = function () {
            navDrawer.classList.add('is-open');
            navScrim.classList.add('is-visible');
            menuToggle.setAttribute('aria-expanded', 'true');
            menuToggle.textContent = 'close';
            menuToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
            // Bloquear scroll del body mientras el drawer está abierto
            document.body.style.overflow = 'hidden';
        };

        const closeDrawer = function () {
            navDrawer.classList.remove('is-open');
            navScrim.classList.remove('is-visible');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.textContent = 'menu';
            menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
            // Restaurar scroll del body
            document.body.style.overflow = '';
        };

        const toggleDrawer = function () {
            // En escritorio el botón está oculto, por seguridad no hacemos nada.
            if (isDesktop()) return;
            if (navDrawer.classList.contains('is-open')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        };

        // Click en el botón de menú
        menuToggle.addEventListener('click', toggleDrawer);

        // Click en el scrim cierra el drawer
        navScrim.addEventListener('click', closeDrawer);

        // Click en cualquier enlace del drawer lo cierra (comportamiento
        // típico de navegación móvil).
        const navLinks = navDrawer.querySelectorAll('.nav-link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (!isDesktop()) closeDrawer();
            });
        });

        // Tecla Escape cierra el drawer
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navDrawer.classList.contains('is-open')) {
                closeDrawer();
                menuToggle.focus();
            }
        });

        // Si el usuario redimensiona la ventana a escritorio mientras el
        // drawer está abierto, lo cerramos para dejar el estado limpio.
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


