(function () {
    'use strict';

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
})();
