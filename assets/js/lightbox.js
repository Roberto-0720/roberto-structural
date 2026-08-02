/* ============================================================
   Roberto Structural — shared image lightbox with zoom & pan
   Used by: tool.html (screenshots), drawings.html (drawing sets),
            article.html (figures)

   API
     RSLightbox.open(images, startIndex, captions)
        images   : array of image URLs
        startIndex : 0-based, optional
        captions : optional array of caption strings (same length)

   Controls
     • Scroll wheel / pinch  → zoom around the pointer
     • Double-click / tap    → toggle 1× ↔ 2.5×
     • Drag                  → pan when zoomed in
     • ← →                   → previous / next image
     • + −  0                → zoom in / out / reset
     • Esc, ✕, backdrop      → close
   ============================================================ */

(function () {
  const MIN_SCALE = 1;
  const MAX_SCALE = 6;
  const STEP = 0.35;

  const S = {
    images: [], captions: [], index: 0,
    scale: 1, tx: 0, ty: 0,
    dragging: false, moved: false, startX: 0, startY: 0,
    pinchDist: 0,
    el: null, img: null, stage: null, counter: null, cap: null, zoomLabel: null
  };

  /* ---------------------------------------------------------- build once */
  function build() {
    if (S.el) return;
    const el = document.createElement('div');
    el.id = 'rsLightbox';
    el.className = 'rslb';
    el.innerHTML = `
      <div class="rslb-bar">
        <span class="rslb-counter" id="rslbCounter"></span>
        <div class="rslb-tools">
          <button class="rslb-btn" data-act="out"   title="Thu nhỏ (−)">−</button>
          <span class="rslb-zoom" id="rslbZoom">100%</span>
          <button class="rslb-btn" data-act="in"    title="Phóng to (+)">+</button>
          <button class="rslb-btn" data-act="reset" title="Về kích thước gốc (0)">⤢</button>
          <button class="rslb-btn rslb-close" data-act="close" title="Đóng (Esc)">✕</button>
        </div>
      </div>
      <button class="rslb-nav rslb-prev" data-act="prev" aria-label="Previous">‹</button>
      <div class="rslb-stage" id="rslbStage">
        <img class="rslb-img" id="rslbImg" alt="" draggable="false"/>
      </div>
      <button class="rslb-nav rslb-next" data-act="next" aria-label="Next">›</button>
      <div class="rslb-caption" id="rslbCap"></div>
      <div class="rslb-hint" data-vi="Cuộn chuột để phóng to · kéo để di chuyển · ← → đổi ảnh"
           data-en="Scroll to zoom · drag to pan · ← → to change image">Scroll to zoom · drag to pan · ← → to change image</div>`;
    document.body.appendChild(el);

    S.el = el;
    S.img = el.querySelector('#rslbImg');
    S.stage = el.querySelector('#rslbStage');
    S.counter = el.querySelector('#rslbCounter');
    S.cap = el.querySelector('#rslbCap');
    S.zoomLabel = el.querySelector('#rslbZoom');

    // Toolbar / navigation buttons
    el.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-act]');
      if (btn) {
        e.stopPropagation();
        const a = btn.dataset.act;
        if (a === 'close') close();
        else if (a === 'prev') step(-1);
        else if (a === 'next') step(1);
        else if (a === 'in') zoomBy(STEP * 2);
        else if (a === 'out') zoomBy(-STEP * 2);
        else if (a === 'reset') resetView();
        return;
      }
      // click on the empty backdrop closes (but not after a drag)
      if (!S.moved && (e.target === el || e.target === S.stage)) close();
    });

    // ---- wheel zoom, anchored at the pointer ----
    S.stage.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = S.img.getBoundingClientRect();
      const cx = e.clientX - (rect.left + rect.width / 2);
      const cy = e.clientY - (rect.top + rect.height / 2);
      zoomAt(e.deltaY < 0 ? STEP : -STEP, cx, cy);
    }, { passive: false });

    // ---- double click toggles zoom ----
    S.stage.addEventListener('dblclick', (e) => {
      e.preventDefault();
      if (S.scale > 1.05) resetView();
      else {
        const rect = S.img.getBoundingClientRect();
        zoomAt(1.5, e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
      }
    });

    // ---- mouse drag to pan ----
    S.stage.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      S.dragging = true; S.moved = false;
      S.startX = e.clientX - S.tx; S.startY = e.clientY - S.ty;
      S.el.classList.add('is-grabbing');
    });
    window.addEventListener('mousemove', (e) => {
      if (!S.dragging) return;
      const nx = e.clientX - S.startX, ny = e.clientY - S.startY;
      if (Math.abs(nx - S.tx) > 2 || Math.abs(ny - S.ty) > 2) S.moved = true;
      S.tx = nx; S.ty = ny; apply();
    });
    window.addEventListener('mouseup', () => {
      if (!S.dragging) return;
      S.dragging = false;
      S.el.classList.remove('is-grabbing');
      setTimeout(() => { S.moved = false; }, 0);
    });

    // ---- touch: 1 finger pan / swipe, 2 fingers pinch ----
    let swipeX = 0, swipeY = 0, swiping = false;
    S.stage.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        if (S.scale > 1.05) {
          S.dragging = true;
          S.startX = t.clientX - S.tx; S.startY = t.clientY - S.ty;
        } else {
          swiping = true; swipeX = t.clientX; swipeY = t.clientY;
        }
      } else if (e.touches.length === 2) {
        S.dragging = false; swiping = false;
        S.pinchDist = dist(e.touches[0], e.touches[1]);
      }
    }, { passive: true });

    S.stage.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const d = dist(e.touches[0], e.touches[1]);
        if (S.pinchDist) zoomBy(((d - S.pinchDist) / 200));
        S.pinchDist = d;
      } else if (S.dragging && e.touches.length === 1) {
        e.preventDefault();
        const t = e.touches[0];
        S.tx = t.clientX - S.startX; S.ty = t.clientY - S.startY; apply();
      }
    }, { passive: false });

    S.stage.addEventListener('touchend', (e) => {
      if (swiping && e.changedTouches.length) {
        const t = e.changedTouches[0];
        const dx = t.clientX - swipeX, dy = t.clientY - swipeY;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
      }
      swiping = false; S.dragging = false; S.pinchDist = 0;
    }, { passive: true });

    // ---- keyboard ----
    document.addEventListener('keydown', (e) => {
      if (!S.el || !S.el.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === '+' || e.key === '=') zoomBy(STEP * 2);
      else if (e.key === '-' || e.key === '_') zoomBy(-STEP * 2);
      else if (e.key === '0') resetView();
    });
  }

  function dist(a, b) {
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  }

  /* ---------------------------------------------------------- transform */
  function apply() {
    S.img.style.transform = `translate(${S.tx}px, ${S.ty}px) scale(${S.scale})`;
    S.el.classList.toggle('is-zoomed', S.scale > 1.05);
    if (S.zoomLabel) S.zoomLabel.textContent = Math.round(S.scale * 100) + '%';
  }

  function clampScale(v) { return Math.min(MAX_SCALE, Math.max(MIN_SCALE, v)); }

  function zoomBy(delta) { zoomAt(delta, 0, 0); }

  function zoomAt(delta, cx, cy) {
    const prev = S.scale;
    const next = clampScale(prev + delta * prev);   // proportional feels natural
    if (next === prev) return;
    const k = next / prev;
    // keep the point under the cursor stationary
    S.tx = (S.tx - cx) * k + cx;
    S.ty = (S.ty - cy) * k + cy;
    S.scale = next;
    if (S.scale <= 1.001) { S.tx = 0; S.ty = 0; S.scale = 1; }
    apply();
  }

  function resetView() { S.scale = 1; S.tx = 0; S.ty = 0; apply(); }

  /* ---------------------------------------------------------- navigation */
  function show(i) {
    if (!S.images.length) return;
    S.index = (i + S.images.length) % S.images.length;
    S.img.src = S.images[S.index];
    resetView();
    S.counter.textContent = `${S.index + 1} / ${S.images.length}`;
    const c = S.captions[S.index] || '';
    S.cap.textContent = c;
    S.cap.style.display = c ? 'block' : 'none';
    const many = S.images.length > 1;
    S.el.querySelector('.rslb-prev').style.display = many ? '' : 'none';
    S.el.querySelector('.rslb-next').style.display = many ? '' : 'none';
    S.counter.style.display = many ? '' : 'none';
  }

  function step(d) { show(S.index + d); }

  function close() {
    if (!S.el) return;
    S.el.classList.remove('open');
    document.body.classList.remove('rslb-lock');
  }

  /* ---------------------------------------------------------- public API */
  window.RSLightbox = {
    open(images, startIndex, captions) {
      const list = Array.isArray(images) ? images.filter(Boolean) : [images].filter(Boolean);
      if (!list.length) return;
      build();
      S.images = list;
      S.captions = Array.isArray(captions) ? captions : [];
      show(Number(startIndex) || 0);
      S.el.classList.add('open');
      document.body.classList.add('rslb-lock');
      if (window.RS && window.RS.setLang) window.RS.setLang(window.RS.lang);
    },
    close
  };
})();
