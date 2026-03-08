/* Nexell Dox — Site Search (ndx-search.js)
 * Pre-built JSON index, vanilla JS, zero dependencies.
 * Search icon in nav → overlay → dropdown results.
 * Accent-insensitive, multi-word, scored.
 */
(function() {
    'use strict';

    // === CONFIG ===
    var INDEX_URL = '/search-index.json';
    var MIN_QUERY = 2;
    var MAX_RESULTS = 8;
    var DEBOUNCE_MS = 200;

    // === STATE ===
    var searchIndex = null;
    var isOpen = false;
    var debounceTimer = null;
    var activeIdx = -1;
    var currentResults = [];

    // === ICONS (inline SVG) ===
    var ICON_SEARCH = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';

    // === INIT ===
    document.addEventListener('DOMContentLoaded', function() {
        injectAnchors();
        injectSearchUI();
    });

    // === SLUGIFY (same logic used to generate search-index.json) ===
    function ndxSlugify(text) {
        return text
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // === INJECT ANCHOR IDs ON HEADINGS ===
    function injectAnchors() {
        var seen = {};
        var headings = document.querySelectorAll('section h2, section h3, .content-block h2, .content-block h3, main h2, main h3');
        for (var i = 0; i < headings.length; i++) {
            var h = headings[i];
            if (h.id) {
                seen[h.id] = true;
                continue;
            }
            // Skip headings inside nav or footer
            if (h.closest('nav') || h.closest('footer')) continue;

            var slug = ndxSlugify(h.textContent || '');
            if (!slug) continue;

            // Handle collisions
            var finalSlug = slug;
            var count = 1;
            while (seen[finalSlug]) {
                count++;
                finalSlug = slug + '-' + count;
            }
            seen[finalSlug] = true;
            h.id = finalSlug;
        }
    }

    // === INJECT SEARCH UI INTO NAV ===
    function injectSearchUI() {
        // Create search button
        var btn = document.createElement('button');
        btn.className = 'ndx-search-btn';
        btn.setAttribute('aria-label', 'Buscar');
        btn.innerHTML = ICON_SEARCH;
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openSearch();
        });

        // Detect nav variant and inject
        var navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            // Variant A: full nav with hamburger (index.html, analisis-proyectos.html)
            var cta = navLinks.querySelector('.nav-cta');
            if (cta) {
                navLinks.insertBefore(btn, cta);
            } else {
                navLinks.appendChild(btn);
            }
        } else {
            // Variant B: compact nav
            var nav = document.querySelector('nav');
            if (!nav) return;
            var ctaBtn = nav.querySelector('.nav-cta-btn');
            if (ctaBtn) {
                nav.insertBefore(btn, ctaBtn);
            } else {
                nav.appendChild(btn);
            }
        }

        // Create overlay (appended to body)
        var overlay = document.createElement('div');
        overlay.className = 'ndx-search-overlay';
        overlay.innerHTML =
            '<div class="ndx-search-box">' +
                ICON_SEARCH +
                '<input type="text" class="ndx-search-input" placeholder="Buscar en Nexell Dox..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">' +
                '<button class="ndx-search-close" aria-label="Cerrar">\u00d7</button>' +
            '</div>' +
            '<div class="ndx-search-results"></div>';
        document.body.appendChild(overlay);

        // Event: close button
        overlay.querySelector('.ndx-search-close').addEventListener('click', closeSearch);

        // Event: click on overlay background (not on search box/results)
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeSearch();
        });

        // Event: input
        var input = overlay.querySelector('.ndx-search-input');
        input.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(function() {
                doSearch(input.value);
            }, DEBOUNCE_MS);
        });

        // Event: keyboard
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSearch();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                navigateResults(1);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                navigateResults(-1);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                selectResult();
            }
        });

        // Global ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) closeSearch();
        });
    }

    // === OPEN / CLOSE ===
    function openSearch() {
        var overlay = document.querySelector('.ndx-search-overlay');
        if (!overlay) return;
        overlay.classList.add('open');
        isOpen = true;
        activeIdx = -1;
        document.body.style.overflow = 'hidden';

        var input = overlay.querySelector('.ndx-search-input');
        input.value = '';
        var results = overlay.querySelector('.ndx-search-results');
        results.innerHTML = '<div class="ndx-search-hint">Escribe para buscar servicios, normativa, precios...</div>';

        // Focus after a small delay (for mobile keyboards)
        setTimeout(function() { input.focus(); }, 100);

        // Lazy load index
        if (!searchIndex) loadIndex();
    }

    function closeSearch() {
        var overlay = document.querySelector('.ndx-search-overlay');
        if (!overlay) return;
        overlay.classList.remove('open');
        isOpen = false;
        document.body.style.overflow = '';
    }

    // === LOAD INDEX ===
    function loadIndex() {
        fetch(INDEX_URL)
            .then(function(r) {
                if (!r.ok) throw new Error('HTTP ' + r.status);
                return r.json();
            })
            .then(function(data) {
                searchIndex = data.entries || data;
            })
            .catch(function(err) {
                console.warn('ndx-search: no se pudo cargar el índice', err);
            });
    }

    // === NORMALIZE (accent-insensitive) ===
    function normalize(str) {
        return (str || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    // === SEARCH ===
    function doSearch(query) {
        var q = normalize(query.trim());
        var container = document.querySelector('.ndx-search-results');
        if (!container) return;

        if (q.length < MIN_QUERY) {
            container.innerHTML = '<div class="ndx-search-hint">Escribe para buscar servicios, normativa, precios...</div>';
            currentResults = [];
            activeIdx = -1;
            return;
        }

        if (!searchIndex) {
            container.innerHTML = '<div class="ndx-no-results">Cargando \u00edndice...</div>';
            return;
        }

        var words = q.split(/\s+/).filter(function(w) { return w.length > 0; });
        var scored = [];

        for (var i = 0; i < searchIndex.length; i++) {
            var entry = searchIndex[i];
            var hSection = normalize(entry.section);
            var hPage = normalize(entry.pageTitle);
            var hSnippet = normalize(entry.snippet);
            var hKeywords = normalize(entry.keywords);
            var haystack = hSection + ' ' + hPage + ' ' + hSnippet + ' ' + hKeywords;

            var allMatch = true;
            for (var w = 0; w < words.length; w++) {
                if (haystack.indexOf(words[w]) === -1) {
                    allMatch = false;
                    break;
                }
            }
            if (!allMatch) continue;

            // Score
            var score = 0;
            for (var w2 = 0; w2 < words.length; w2++) {
                if (hSection.indexOf(words[w2]) !== -1) score += 3;
                if (hPage.indexOf(words[w2]) !== -1) score += 2;
                if (hKeywords.indexOf(words[w2]) !== -1) score += 2;
                if (hSnippet.indexOf(words[w2]) !== -1) score += 1;
            }
            scored.push({ entry: entry, score: score });
        }

        scored.sort(function(a, b) { return b.score - a.score; });
        currentResults = scored.slice(0, MAX_RESULTS);
        activeIdx = -1;

        renderResults(currentResults, query);
    }

    // === RENDER ===
    function renderResults(results, query) {
        var container = document.querySelector('.ndx-search-results');
        if (!container) return;
        container.innerHTML = '';

        if (results.length === 0) {
            container.innerHTML = '<div class="ndx-no-results">Sin resultados para \u201c' + escapeHtml(query) + '\u201d</div>';
            return;
        }

        for (var i = 0; i < results.length; i++) {
            var entry = results[i].entry;
            var url = entry.page + (entry.anchor ? '#' + entry.anchor : '');

            var item = document.createElement('a');
            item.href = url;
            item.className = 'ndx-result-item';
            item.setAttribute('data-idx', i);
            item.innerHTML =
                '<span class="ndx-result-page">' + escapeHtml(entry.pageTitle) + '</span>' +
                '<span class="ndx-result-heading">' + highlightMatch(entry.section, query) + '</span>' +
                (entry.snippet ? '<span class="ndx-result-snippet">' + highlightMatch(truncate(entry.snippet, 100), query) + '</span>' : '');

            item.addEventListener('click', function() {
                closeSearch();
            });
            container.appendChild(item);
        }
    }

    // === KEYBOARD NAVIGATION ===
    function navigateResults(dir) {
        if (currentResults.length === 0) return;
        var items = document.querySelectorAll('.ndx-result-item');
        if (items.length === 0) return;

        // Remove current active
        if (activeIdx >= 0 && activeIdx < items.length) {
            items[activeIdx].classList.remove('ndx-active');
        }

        activeIdx += dir;
        if (activeIdx < 0) activeIdx = items.length - 1;
        if (activeIdx >= items.length) activeIdx = 0;

        items[activeIdx].classList.add('ndx-active');
        items[activeIdx].scrollIntoView({ block: 'nearest' });
    }

    function selectResult() {
        if (activeIdx < 0 || currentResults.length === 0) return;
        var items = document.querySelectorAll('.ndx-result-item');
        if (activeIdx < items.length) {
            closeSearch();
            window.location.href = items[activeIdx].href;
        }
    }

    // === UTILS ===
    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    function truncate(str, len) {
        if (!str || str.length <= len) return str || '';
        var truncated = str.substring(0, len);
        var lastSpace = truncated.lastIndexOf(' ');
        if (lastSpace > len * 0.6) truncated = truncated.substring(0, lastSpace);
        return truncated + '...';
    }

    function highlightMatch(text, query) {
        if (!text || !query) return escapeHtml(text || '');
        var escaped = escapeHtml(text);
        var words = query.trim().split(/\s+/).filter(function(w) { return w.length >= MIN_QUERY; });
        if (words.length === 0) return escaped;

        // Build regex for highlighting
        var pattern = words.map(function(w) {
            return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }).join('|');

        try {
            // Normalize both for matching, then highlight in original
            var regex = new RegExp('(' + pattern + ')', 'gi');
            return escaped.replace(regex, '<mark>$1</mark>');
        } catch (e) {
            return escaped;
        }
    }

})();
