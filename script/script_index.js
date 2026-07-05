    /* =====================================================================
    SYSTEM_DOCS — Script principal
    - Toggle de tema claro/oscuro
    - Micro-interacción del input de búsqueda
    ===================================================================== */

    (function () {
    'use strict';

    /* ----------------------------------------------------------------
        1. Theme toggle (claro / oscuro)
        ---------------------------------------------------------------- */
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;

    if (themeToggle) {
        // Estado inicial: si ya está en dark, mostrar el icono de "light_mode"
        if (root.classList.contains('dark')) {
        themeToggle.textContent = 'light_mode';
        } else {
        themeToggle.textContent = 'contrast';
        }

        themeToggle.addEventListener('click', function () {
        root.classList.toggle('dark');
        const isDark = root.classList.contains('dark');
        themeToggle.textContent = isDark ? 'light_mode' : 'contrast';
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
    })();
