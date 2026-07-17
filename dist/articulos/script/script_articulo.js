(function () {
    'use strict';

    var root = document.documentElement;
    var toggle = document.getElementById('themeToggle');
    var stored = window.localStorage.getItem('theme');

    if (stored === 'dark') {
        root.classList.add('dark');
    } else if (stored === 'light') {
        root.classList.remove('dark');
    }

    if (toggle) {
        toggle.addEventListener('click', function () {
            var dark = root.classList.toggle('dark');
            window.localStorage.setItem('theme', dark ? 'dark' : 'light');
            toggle.setAttribute('aria-pressed', String(dark));
        });
        toggle.setAttribute('aria-pressed', String(root.classList.contains('dark')));
    }
}());
