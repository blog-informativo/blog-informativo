(function () {
    'use strict';

    // 1. Theme toggle protegido (Igual al principal para que haya continuidad)
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;

    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme === 'dark') {
            root.classList.add('dark');
        } else if (currentTheme === 'light') {
            root.classList.remove('dark');
        }

        themeToggle.addEventListener('click', function () {
            root.classList.toggle('dark');
            const isDark = root.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
})();