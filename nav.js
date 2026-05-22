/* nav.js — single source of truth for sidebar + all nav behaviour
   1. Inject sidebar HTML (edit NAV_GROUPS to change nav)
   2. Inject top nav HTML (edit TOP_NAV_LINKS to change top nav)
   3. Collapsible nav groups with localStorage persistence
   4. Mark active link by URL — directory hrefs use exact match only
   5. Scroll active link into view in sidebar
   6. Scroll-spy
   7. Mobile sidebar open/close
   8. Contact page tab routing
*/

(function () {

  var path = window.location.pathname.replace(/\/$/, '') || '/';

  // ══════════════════════════════════════════════════════════════════
  // NAV DEFINITIONS — edit here only, never in .html files
  // ══════════════════════════════════════════════════════════════════

  var NAV_GROUPS = [
    {
      label: 'Services',
      id:    'nav-services',
      links: [
        { href: '/consulting/ai-readiness.html',         icon: '◈', text: 'AI Fluency' },
        { href: '/consulting/audit.html',                icon: '◦', text: 'Knowledge System Audit' },
        { href: '/consulting/architecture.html',         icon: '◦', text: 'Content Architecture' },
        { href: '/consulting/legacy-modernization.html', icon: '◦', text: 'Legacy Modernization' },
        { href: '/consulting/advisory.html',             icon: '◦', text: 'Strategic Advisory' },
        { href: '/consulting/production.html',           icon: '◦', text: 'Production Modernization' },
        { href: '/consulting/',                          icon: '◎', text: 'Consulting Overview' },
        { href: '/speaking/',                            icon: '◎', text: 'Speaking' },
      ]
    },
    {
      label: 'AI Fluency',
      id:    'nav-ai',
      links: [
        { href: '/ai-enablement/',                          icon: '◈', text: 'Programs Overview' },
        { href: '/ai-enablement/clarity-session.html',      icon: '◆', text: 'Clarity Session' },
        { href: '/ai-enablement/individual-programs.html',  icon: '◦', text: 'Individual' },
        { href: '/ai-enablement/team-enterprise.html',      icon: '◦', text: 'Team & Enterprise' },
        { href: '/ai-enablement/intensive.html',            icon: '◦', text: 'Intensive & Embedded' },
        { href: '/ai-enablement/the-full-monty.html',       icon: '◇', text: 'Deep AI Transformation' },
      ]
    },
    {
      label: 'Work',
      id:    'nav-work',
      links: [
        { href: '/work/',                  icon: '◻', text: 'Work Overview' },
        { href: '/work/case-studies.html', icon: '◼', text: 'Case Studies' },
        { href: '/work/methodology.html',  icon: '◇', text: 'Methodology' },
        { href: '/samples/',               icon: '◦', text: 'Examples' },
        { href: '/knowledge.html',         icon: '◈', text: 'SKA Framework' },
      ]
    },
    {
      label: 'Connect',
      id:    'nav-connect',
      links: [
        { href: '/contact.html', icon: '✉', text: 'Contact' },
      ]
    },
    {
      label: 'Resources',
      id:    'nav-resources',
      links: [
        { href: '/resources/', icon: '⚿', text: 'Client Resources' },
      ]
    },
  ];

  var TOP_NAV_LINKS = [
    { href: '/',                 text: 'Home' },
    { href: '/about.html',       text: 'About' },
    { href: '/consulting/',      text: 'Consulting' },
    { href: '/ai-enablement/',   text: 'AI Fluency' },
    { href: '/speaking/',        text: 'Speaking' },
    { href: '/work/',            text: 'Work' },
    { href: '/contact.html',     text: 'Contact' },
  ];


  // ══════════════════════════════════════════════════════════════════
  // HELPERS
  // ══════════════════════════════════════════════════════════════════

  // Is a given href an exact match for the current path?
  // Directory hrefs (ending /) use exact match only.
  // File hrefs fall back to startsWith for sub-path detection.
  function isActive(href) {
    var normalized = href.replace(/\/$/, '') || '/';
    var isDir = href.slice(-1) === '/';
    if (path === normalized) return true;
    if (!isDir && normalized !== '/' && path.startsWith(normalized)) return true;
    return false;
  }


  // ══════════════════════════════════════════════════════════════════
  // 1. BUILD & INJECT SIDEBAR
  // ══════════════════════════════════════════════════════════════════

  function buildSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    var html = '<a class="sidebar-logo" href="/">'
             +   '<span class="name">Joshua Bechtel</span>'
             +   '<span class="role">Knowledge Architecture &amp; AI Strategy</span>'
             + '</a>'
             + '<nav class="sidebar-nav">';

    NAV_GROUPS.forEach(function (group) {
      html += '<button class="sidebar-group-toggle" data-group="' + group.id + '" aria-expanded="false">'
            +   '<span class="sidebar-section-label">' + group.label + '</span>'
            +   '<span class="sidebar-chevron">&#8250;</span>'
            + '</button>'
            + '<div class="sidebar-group" id="' + group.id + '">';

      group.links.forEach(function (link) {
        html += '<a href="' + link.href + '">'
              +   '<span class="icon">' + link.icon + '</span> ' + link.text
              + '</a>';
      });

      html += '</div>';
    });

    html += '</nav>'
          + '<div class="sidebar-cta">'
          +   '<a href="/contact.html">Start a Conversation</a>'
          + '</div>';

    // Inject resource sub-links if client has unlocked them
    var resUnlocked = false;
    try { resUnlocked = localStorage.getItem('jb_res_unlocked') === '1'; } catch (e) {}
    if (resUnlocked) {
      html = html.replace(
        '<a href="/resources/"><span class="icon">⚿</span> Client Resources</a></div>',
        '<a href="/resources/"><span class="icon">⚿</span> Client Resources</a>'
        + '<a href="/ai-enablement/essentials-guide.html"><span class="icon">◦</span> AI Essentials Guide</a>'
        + '<a href="/ai-enablement/prompt-library.html"><span class="icon">◦</span> Prompt Library</a>'
        + '</div>'
      );
    }

    sidebar.innerHTML = html;
  }

  buildSidebar();


  // ══════════════════════════════════════════════════════════════════
  // 2. BUILD & INJECT TOP NAV
  // ══════════════════════════════════════════════════════════════════

  function buildTopNav() {
    var nav = document.querySelector('.top-nav');
    if (!nav) return;
    var html = '';
    TOP_NAV_LINKS.forEach(function (link) {
      html += '<a href="' + link.href + '">' + link.text + '</a>';
    });
    nav.innerHTML = html;
  }

  buildTopNav();


  // ══════════════════════════════════════════════════════════════════
  // 3. COLLAPSIBLE GROUPS
  // ══════════════════════════════════════════════════════════════════

  var STORAGE_KEY = 'jb_nav_open';

  function getOpenGroups() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { return []; }
  }

  function saveOpenGroups(ids) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); }
    catch (e) {}
  }

  function setGroupOpen(groupId, open) {
    var group = document.getElementById(groupId);
    var btn   = document.querySelector('[data-group="' + groupId + '"]');
    if (!group || !btn) return;
    if (open) {
      group.classList.add('open');
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    } else {
      group.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  }

  // Find which group contains the current page
  var activeGroupId = null;

  NAV_GROUPS.forEach(function (group) {
    group.links.forEach(function (link) {
      if (isActive(link.href)) activeGroupId = group.id;
    });
  });

  // Also check injected resource links if unlocked
  try {
    if (localStorage.getItem('jb_res_unlocked') === '1') {
      ['/ai-enablement/essentials-guide.html', '/ai-enablement/prompt-library.html']
        .forEach(function (href) {
          if (isActive(href)) activeGroupId = 'nav-resources';
        });
    }
  } catch (e) {}

  // Open active group only — everything else starts closed
  NAV_GROUPS.forEach(function (group) {
    setGroupOpen(group.id, group.id === activeGroupId);
  });

  // Wire click handlers
  document.querySelectorAll('.sidebar-group-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var groupId = this.getAttribute('data-group');
      var group   = document.getElementById(groupId);
      var isOpen  = group.classList.contains('open');
      setGroupOpen(groupId, !isOpen);

      var nowOpen = [];
      NAV_GROUPS.forEach(function (g) {
        var el = document.getElementById(g.id);
        if (el && el.classList.contains('open')) nowOpen.push(g.id);
      });
      saveOpenGroups(nowOpen);
    });
  });


  // ══════════════════════════════════════════════════════════════════
  // 4. MARK ACTIVE LINKS
  // ══════════════════════════════════════════════════════════════════

  var sidebarLinks = Array.prototype.slice.call(
    document.querySelectorAll('#sidebar .sidebar-nav a')
  );

  sidebarLinks.forEach(function (a) {
    if (isActive(a.getAttribute('href') || '')) a.classList.add('active');
  });

  document.querySelectorAll('.top-nav a').forEach(function (a) {
    if (isActive(a.getAttribute('href') || '')) a.classList.add('active');
  });


  // ══════════════════════════════════════════════════════════════════
  // 5. SCROLL ACTIVE LINK INTO VIEW
  // ══════════════════════════════════════════════════════════════════

  function centerActiveInSidebar() {
    var nav        = document.querySelector('#sidebar .sidebar-nav');
    var activeLink = document.querySelector('#sidebar .sidebar-nav a.active');
    if (!nav || !activeLink) return;
    var linkTop    = activeLink.offsetTop;
    var linkHeight = activeLink.offsetHeight;
    var navHeight  = nav.clientHeight;
    var target     = linkTop - (navHeight / 2) + (linkHeight / 2);
    nav.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
  }

  centerActiveInSidebar();


  // ══════════════════════════════════════════════════════════════════
  // 6. SCROLL-SPY
  // ══════════════════════════════════════════════════════════════════

  var sectionMap = {};

  sidebarLinks.forEach(function (a) {
    var href      = a.getAttribute('href') || '';
    var hashMatch = href.match(/#([^?#]+)$/);
    if (hashMatch) {
      var el = document.getElementById(hashMatch[1]);
      if (el) sectionMap[hashMatch[1]] = a;
    }
  });

  var pageSections = Array.prototype.slice.call(
    document.querySelectorAll('section[id], div[id]')
  );

  pageSections.forEach(function (section) {
    var id = section.id;
    sidebarLinks.forEach(function (a) {
      var href = (a.getAttribute('href') || '').replace(/\/$/, '');
      if (href === '/' + id || href.endsWith('/' + id)) sectionMap[id] = a;
    });
  });

  var watchedSections = pageSections.filter(function (s) { return sectionMap[s.id]; });

  if (watchedSections.length > 0) {
    var scrollSpyActive = null;
    var scrollSpyTimer  = null;

    function updateScrollSpy() {
      var threshold = window.innerHeight * 0.35;
      var current   = null;
      watchedSections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= threshold) current = section;
      });
      if (!current) return;
      var newLink = sectionMap[current.id];
      if (!newLink || newLink === scrollSpyActive) return;
      sidebarLinks.forEach(function (a) { a.classList.remove('active'); });
      newLink.classList.add('active');
      scrollSpyActive = newLink;
      centerActiveInSidebar();
    }

    window.addEventListener('scroll', function () {
      clearTimeout(scrollSpyTimer);
      scrollSpyTimer = setTimeout(updateScrollSpy, 80);
    }, { passive: true });
  }


  // ══════════════════════════════════════════════════════════════════
  // 7. MOBILE SIDEBAR OPEN/CLOSE
  // ══════════════════════════════════════════════════════════════════

  var sidebar  = document.getElementById('sidebar');
  var toggle   = document.getElementById('sidebarToggle');
  var overlay  = document.getElementById('sidebarOverlay');

  function openSidebar()  { sidebar.classList.add('open');    overlay.classList.add('open'); }
  function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('open'); }

  if (toggle)  toggle.addEventListener('click', openSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);


  // ══════════════════════════════════════════════════════════════════
  // 8. CONTACT PAGE TAB ROUTING
  // ══════════════════════════════════════════════════════════════════

  var params = new URLSearchParams(window.location.search);
  var type   = params.get('type');

  if (type) {
    var targetTab = document.querySelector('.contact-tab[data-tab="' + type + '"]');
    if (targetTab) activateTab(targetTab.dataset.tab);
  }

  document.querySelectorAll('.contact-tab').forEach(function (tab) {
    tab.addEventListener('click', function () { activateTab(this.dataset.tab); });
  });

  function activateTab(name) {
    document.querySelectorAll('.contact-tab').forEach(function (t) {
      t.classList.toggle('active', t.dataset.tab === name);
    });
    document.querySelectorAll('.contact-form-panel').forEach(function (p) {
      p.classList.toggle('active', p.id === 'panel-' + name);
    });
  }

}());
