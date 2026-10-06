// Theme toggle, mobile nav, and the scripted terminal demos.
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Theme toggle ──────────────────────────────────────────────────────────
  var toggle = document.querySelector('[data-theme-toggle]');
  if (toggle) {
    var sync = function () {
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      toggle.setAttribute('aria-pressed', String(light));
      toggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    };
    sync();
    toggle.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
      sync();
    });
  }

  // ── Mobile nav ────────────────────────────────────────────────────────────
  var menuBtn = document.querySelector('[data-menu-toggle]');
  var nav = document.getElementById('site-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target instanceof HTMLAnchorElement) {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Terminal demos ────────────────────────────────────────────────────────
  var sleep = function (ms) {
    return new Promise(function (r) {
      setTimeout(r, ms);
    });
  };

  function lineEl(line) {
    var el = document.createElement('div');
    el.className = 'tl' + (line.tone ? ' t-' + line.tone : '');
    if (line.in !== undefined) {
      var p = document.createElement('span');
      p.className = 'prompt';
      p.textContent = '$ ';
      el.appendChild(p);
      var cmd = document.createElement('span');
      cmd.className = 'cmd';
      el.appendChild(cmd);
    } else {
      el.textContent = line.out || '';
    }
    return el;
  }

  function renderStatic(screen, lines) {
    screen.textContent = '';
    lines.forEach(function (line) {
      var el = lineEl(line);
      if (line.in !== undefined) el.querySelector('.cmd').textContent = line.in;
      screen.appendChild(el);
    });
  }

  async function play(term) {
    if (term.dataset.playing === '1') return;
    term.dataset.playing = '1';
    var screen = term.querySelector('.term-screen');
    var lines = JSON.parse(term.getAttribute('data-script') || '[]');
    screen.textContent = '';
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var el = lineEl(line);
      screen.appendChild(el);
      if (line.in !== undefined) {
        var cmd = el.querySelector('.cmd');
        cmd.classList.add('typing');
        await sleep(350);
        for (var c = 0; c < line.in.length; c++) {
          cmd.textContent += line.in[c];
          await sleep(18 + Math.random() * 30);
        }
        await sleep(250);
        cmd.classList.remove('typing');
      } else {
        await sleep(110);
      }
      screen.scrollTop = screen.scrollHeight;
    }
    term.dataset.playing = '0';
  }

  var terms = document.querySelectorAll('[data-terminal]');
  terms.forEach(function (term) {
    var lines = JSON.parse(term.getAttribute('data-script') || '[]');
    var replay = term.querySelector('[data-replay]');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      renderStatic(term.querySelector('.term-screen'), lines);
      if (replay) replay.hidden = true;
      return;
    }
    if (replay) {
      replay.addEventListener('click', function () {
        play(term);
      });
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            play(term);
            io.unobserve(term);
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(term);
  });
})();
