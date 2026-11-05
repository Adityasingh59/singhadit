/* ============================================================
   Motion layer. Runs on every page load, including client-side
   navigations (astro:page-load), and tears itself down before the
   next page swaps in. Everything here is progressive enhancement:
   with no JS, or with reduced motion, the page is already complete.
   ============================================================ */

const still = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

let cleanups: Array<() => void> = [];
function listen<K extends keyof WindowEventMap>(
  target: Window | HTMLElement,
  type: K | string,
  fn: (e: any) => void,
  opts?: AddEventListenerOptions,
) {
  target.addEventListener(type, fn, opts);
  cleanups.push(() => target.removeEventListener(type, fn, opts));
}

/* ---------- Theme toggle ---------- */
function initTheme() {
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
}

/* ---------- Index helpers so CSS can stagger ---------- */
function indexChildren() {
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    [...group.children].forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i)));
  });
  document.querySelectorAll<HTMLElement>('.job ul, .chips').forEach((list) => {
    [...list.children].forEach((c, j) => (c as HTMLElement).style.setProperty('--j', String(j)));
  });
  // Case-study prose reveals paragraph by paragraph
  document.querySelectorAll<HTMLElement>('.prose > h2, .prose > p, .prose > ul, .prose > blockquote').forEach((el) => {
    el.classList.add('rise');
  });
}

/* ---------- Scroll reveals ---------- */
function initReveal() {
  if (still() || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  document.querySelectorAll('.rise, [data-stagger], .section-head').forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());
}

/* ---------- Numbers count up when they come into view ----------
   Works on any text: "~$40M", "7 days → 24 hrs", "1.7%", "<500ms".
   Every number in the element animates from 0 to its real value,
   keeping its decimal places. The real text is restored at the end. */
function countUp(el: HTMLElement, duration = 1500) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: { node: Text; src: string }[] = [];
  while (walker.nextNode()) {
    const n = walker.currentNode as Text;
    if (/\d/.test(n.data)) nodes.push({ node: n, src: n.data });
  }
  if (!nodes.length) return;
  const t0 = performance.now();
  const ease = (t: number) => 1 - Math.pow(1 - t, 4);
  const frame = (now: number) => {
    const t = Math.min(1, (now - t0) / duration);
    const k = ease(t);
    nodes.forEach(({ node, src }) => {
      node.data = t >= 1
        ? src
        : src.replace(/\d+(?:\.\d+)?/g, (m) => {
            const dec = (m.split('.')[1] || '').length;
            return (parseFloat(m) * k).toFixed(dec);
          });
    });
    if (t < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

function initCounters() {
  if (still() || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target as HTMLElement;
        // impact numbers wait for the hero entrance to reach them
        const delay = el.closest('.impact') ? 900 : 150;
        setTimeout(() => countUp(el), delay);
      });
    },
    { threshold: 0.2 },
  );
  document.querySelectorAll('.impact-n, .figure-n').forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());
}

/* ---------- Cards tilt toward the cursor, with a spotlight ---------- */
function initTilt() {
  if (still() || !finePointer()) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
      card.style.setProperty('--rx', `${(0.5 - y) * 5}deg`);
      card.style.setProperty('--ry', `${(x - 0.5) * 6}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

/* ---------- Buttons lean toward the cursor ---------- */
function initMagnetic() {
  if (still() || !finePointer()) return;
  document.querySelectorAll<HTMLElement>('.btn').forEach((b) => {
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      b.style.transform = `translate(${dx * 0.18}px, ${dy * 0.28}px)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
}

/* ---------- Hero glow follows the cursor ---------- */
function initAurora() {
  const band = document.querySelector<HTMLElement>('.hero-band');
  const glow = band?.querySelector<HTMLElement>('.a3');
  if (!band || !glow || still() || !finePointer()) return;
  listen(band, 'pointermove', (e: PointerEvent) => {
    const r = band.getBoundingClientRect();
    glow.style.setProperty('--ax', `${(e.clientX - r.left - r.width / 2) * 0.35}px`);
    glow.style.setProperty('--ay', `${(e.clientY - r.top - r.height / 2) * 0.35}px`);
  });
}

/* ---------- Everything tied to scroll position ---------- */
function initScroll() {
  const bar = document.getElementById('progress');
  const nav = document.querySelector<HTMLElement>('.nav');
  const timeline = document.querySelector<HTMLElement>('.exp-list');
  const portrait = document.querySelector<HTMLElement>('.hero-portrait');
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.nav-links a')];
  const sections = links
    .map((a) => ({ a, el: a.hash ? document.getElementById(a.hash.slice(1)) : null }))
    .filter((s) => s.el);
  const moving = !still();

  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    bar?.style.setProperty('--p', String(max > 0 ? y / max : 0));
    nav?.classList.toggle('scrolled', y > 8);

    if (timeline && moving) {
      const r = timeline.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / r.height));
      timeline.style.setProperty('--line', p.toFixed(3));
    }
    if (portrait && moving) portrait.style.setProperty('--py', `${Math.min(y, 700) * 0.1}px`);

    let current: HTMLAnchorElement | null = null;
    sections.forEach(({ a, el }) => { if (el!.getBoundingClientRect().top < vh * 0.4) current = a; });
    links.forEach((a) => a.classList.toggle('active', a === current));
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  listen(window, 'scroll', onScroll, { passive: true });
  listen(window, 'resize', onScroll, { passive: true });
  update();
}

/* ---------- Case-study diagrams draw like a pen on paper ---------- */
function initFigures() {
  if (still() || !('IntersectionObserver' in window)) return;
  const draw = (svg: SVGSVGElement) => {
    const nodes = [...svg.querySelectorAll<SVGGraphicsElement>('line, rect, path, circle, text')];
    const measured = nodes.map((el) => {
      let y = 0;
      try { y = el.getBBox().y; } catch (e) {}
      return { el, y };
    });
    measured.sort((a, b) => a.y - b.y);
    const span = 900;
    measured.forEach(({ el }, i) => {
      el.style.setProperty('--d', Math.round((i / Math.max(measured.length - 1, 1)) * span) + 'ms');
      const filled = el.classList.contains('sig-fill') || el.classList.contains('rule-fill');
      const dashed = el.hasAttribute('stroke-dasharray') && el.getAttribute('stroke-dasharray') !== '0';
      if (filled || dashed) {
        el.classList.add('stamp');
      } else if (el.tagName !== 'text') {
        let len = 0;
        try { len = (el as unknown as SVGGeometryElement).getTotalLength(); } catch (e) {}
        if (len > 0) {
          el.style.setProperty('--len', String(Math.ceil(len)));
          el.style.strokeDasharray = String(Math.ceil(len));
        }
      }
    });
    svg.classList.add('fig', 'drawn');
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        draw(e.target as SVGSVGElement);
      });
    },
    { threshold: 0.25 },
  );
  document.querySelectorAll<SVGSVGElement>('.cs-fig svg').forEach((s) => io.observe(s));
  cleanups.push(() => io.disconnect());
}

function init() {
  initTheme();
  indexChildren();
  initReveal();
  initCounters();
  initTilt();
  initMagnetic();
  initAurora();
  initScroll();
  initFigures();
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', () => {
  cleanups.forEach((fn) => fn());
  cleanups = [];
});
