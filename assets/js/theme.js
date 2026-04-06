/*
    Theme: light / dark + prefers-color-scheme
    Load once in <head> (after <meta name="color-scheme">) so the first paint matches the resolved theme.
*/
(function () {
    'use strict';

    var STORAGE_KEY = 'izenderi-theme';

    function getStored() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function prefersDark() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function resolveTheme() {
        var s = getStored();
        if (s === 'light' || s === 'dark') {
            return s;
        }
        return prefersDark() ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            document.documentElement.style.colorScheme = theme;
        } catch (e) { /* ignore */ }

        var meta = document.querySelector('meta[name="color-scheme"]');
        if (meta) {
            meta.setAttribute('content', theme === 'dark' ? 'dark' : 'light');
        }

        var nextIsDark = theme !== 'dark';
        var label = nextIsDark ? 'Switch to dark mode' : 'Switch to light mode';
        document.querySelectorAll('.theme-toggle').forEach(function (btn) {
            btn.setAttribute('aria-label', label);
            btn.setAttribute('title', label);
        });

        document.querySelectorAll('.theme-toggle-icon').forEach(function (icon) {
            icon.classList.remove('fa-sun', 'fa-moon');
            icon.classList.add(theme === 'dark' ? 'fa-sun' : 'fa-moon');
        });
    }

    function toggleTheme() {
        var next = resolveTheme() === 'dark' ? 'light' : 'dark';
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch (e) { /* ignore */ }
        applyTheme(next);
    }

    function bindThemeUI() {
        applyTheme(resolveTheme());

        document.querySelectorAll('.theme-toggle').forEach(function (btn) {
            btn.addEventListener('click', toggleTheme);
        });

        var mq = window.matchMedia('(prefers-color-scheme: dark)');
        var onChange = function () {
            if (getStored() !== 'light' && getStored() !== 'dark') {
                applyTheme(resolveTheme());
            }
        };
        if (mq.addEventListener) {
            mq.addEventListener('change', onChange);
        } else {
            mq.addListener(onChange);
        }
    }

    /* Before first paint (no .theme-toggle nodes yet — only <html> + meta updated). */
    applyTheme(resolveTheme());

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindThemeUI);
    } else {
        bindThemeUI();
    }
})();
