/* ============================================================
   Roberto Structural — shared site script
   - Injects header & footer (single source of truth)
   - VI/EN language toggle (persisted in localStorage), default EN
   - Mobile menu
   - Scroll-reveal via IntersectionObserver
   - Shared email-gated download (used by Software & Drawings pages)
   All UI notes/comments in English (per project convention).
   ============================================================ */

/* Canonical URL of any page — ONE definition for the whole site.
   Every tool / article has a generated static file per language (tool-<id>.html /
   tool-<id>-vi.html) so that search engines and link previews get a real <head> in
   the right language; see scripts/build-pages.mjs. The 4 hand-written catalog pages
   follow the same "-vi" suffix convention (tools.html / tools-vi.html...).
   `lang` is optional everywhere: omit it and these read the CURRENT page's language
   (window.RS.lang), so every existing call site that doesn't care about language
   already gets the right link with no changes. Pass an explicit lang to pin a link
   to one language regardless of the current page (used for the legacy ?id= entry
   points' canonical tag — see tools.js / articles.js). */
window.RS_URL = {
  tool:    (id, lang) => 'tool-' + id + ((lang || window.RS.lang) === 'vi' ? '-vi' : '') + '.html',
  article: (id, lang) => 'article-' + id + ((lang || window.RS.lang) === 'vi' ? '-vi' : '') + '.html',
  page:    (name, lang) => name + ((lang || window.RS.lang) === 'vi' ? '-vi' : '') + '.html'
};

// ---- Header/footer markup, built per-language so nav links point at the sibling
//      language's pages. Links to the 4 catalog pages carry data-rs-page (+ optional
//      data-rs-hash) so RS.setLang() can re-point them after an in-place toggle. ----
function headerHtml(lang){
  const P = n => window.RS_URL.page(n, lang);
  return `
<div class="container nav">
  <a class="brand" href="${P('index')}" data-rs-page="index">
    <img src="Logo/Roberto_1.webp" alt="Roberto Structural logo" />
    <b>Roberto<br>Structural</b>
  </a>
  <nav class="nav-links">
    <a href="${P('insights')}" data-nav="insights" data-rs-page="insights" data-vi="Bài viết" data-en="Insights">Bài viết</a>
    <a href="${P('tools')}" data-nav="tools" data-rs-page="tools" data-vi="Phần mềm" data-en="Software">Phần mềm</a>
    <a href="${P('drawings')}" data-nav="drawings" data-rs-page="drawings" data-vi="Bản vẽ" data-en="Drawings">Bản vẽ</a>
    <a href="${P('index')}#about" data-rs-page="index" data-rs-hash="#about" data-vi="Giới thiệu" data-en="About">Giới thiệu</a>
    <a href="${P('index')}#contact" data-rs-page="index" data-rs-hash="#contact" data-vi="Liên hệ" data-en="Contact">Liên hệ</a>
  </nav>
  <div class="nav-right">
    <div class="lang">
      <button data-lang="vi">VI</button>
      <button data-lang="en">EN</button>
    </div>
    <button class="menu-toggle" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</div>`;
}

function footerHtml(lang){
  const P = n => window.RS_URL.page(n, lang);
  return `
<div class="container">
  <div class="foot-grid">
    <div>
      <h4>Roberto Structural</h4>
      <p style="color:var(--steel-light);font-size:.9rem;max-width:34ch"><span data-vi="Kiến tạo lõi kỹ thuật cho công nghiệp nặng." data-en="Engineering the Core of Heavy Industry.">Kiến tạo lõi kỹ thuật cho công nghiệp nặng.</span></p>
      <a href="mailto:robertostructural@gmail.com" style="display:inline-block;margin-top:.9rem;font-size:.9rem;color:var(--steel-light)">robertostructural@gmail.com</a>
      <div class="social">
        <a href="https://www.facebook.com/RobertoStructural" target="_blank" rel="noopener" aria-label="Facebook" title="Facebook">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z"/></svg>
        </a>
        <a href="https://www.youtube.com/@RobertoStructural" target="_blank" rel="noopener" aria-label="YouTube" title="YouTube">
          <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.09 0 12 0 12s0 3.91.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.91 24 12 24 12s0-3.91-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>
        </a>
      </div>
    </div>
    <div>
      <h4 data-vi="Liên kết" data-en="Links">Liên kết</h4>
      <a href="${P('index')}#about" data-rs-page="index" data-rs-hash="#about" data-vi="Giới thiệu" data-en="About">Giới thiệu</a>
      <a href="${P('insights')}" data-rs-page="insights" data-vi="Bài viết" data-en="Insights">Bài viết</a>
      <a href="${P('tools')}" data-rs-page="tools" data-vi="Phần mềm" data-en="Software">Phần mềm</a>
      <a href="${P('drawings')}" data-rs-page="drawings" data-vi="Bản vẽ" data-en="Drawings">Bản vẽ</a>
    </div>
    <div>
      <h4 data-vi="Lĩnh vực" data-en="Sectors">Lĩnh vực</h4>
      <a href="${P('index')}#about" data-rs-page="index" data-rs-hash="#about" data-vi="Công nghiệp nặng" data-en="Heavy Industry">Công nghiệp nặng</a>
      <a href="${P('index')}#about" data-rs-page="index" data-rs-hash="#about" data-vi="Công nghiệp nhẹ" data-en="Light Industry">Công nghiệp nhẹ</a>
      <a href="${P('index')}#about" data-rs-page="index" data-rs-hash="#about" data-vi="Lọc hóa dầu" data-en="Petrochemical">Lọc hóa dầu</a>
      <a href="${P('index')}#about" data-rs-page="index" data-rs-hash="#about" data-vi="Năng lượng" data-en="Energy">Năng lượng</a>
    </div>
    <div>
      <h4 data-vi="Nhận bản tin" data-en="Newsletter">Nhận bản tin</h4>
      <p style="font-size:.9rem;color:var(--steel-light)" data-vi="Nhận thông báo khi có Tool mới." data-en="Get notified about new Tools.">Nhận thông báo khi có Tool mới.</p>
      <form class="newsletter" onsubmit="return false">
        <input type="email" placeholder="Email" />
        <button class="btn btn-primary" type="submit" style="padding:.6rem 1rem" data-vi="Gửi" data-en="Send">Gửi</button>
      </form>
    </div>
  </div>
  <div class="foot-bottom">© <span id="yr"></span> Roberto Structural · <span data-vi="Đã đăng ký bản quyền" data-en="All rights reserved">Đã đăng ký bản quyền</span></div>
</div>`;
}

/* Point crawlers at the generated page even when the visitor arrived through a
   legacy ?id= URL, so two addresses serving identical content do not split
   ranking. Generated pages already ship a canonical, where this is a no-op. */
window.rsSetCanonical = function(relUrl){
  if(document.querySelector('link[rel="canonical"]')) return;
  const l = document.createElement('link');
  l.rel = 'canonical';
  l.href = new URL(relUrl, location.href).href;
  document.head.appendChild(l);
};

const RS = {
  // A page declares its own language via window.RS_PAGE_LANG (set inline, before this
  // script loads, by every generated/duplicated page — see scripts/build-pages.mjs and
  // the *-vi.html catalog pages). That always wins: a visitor's past toggle click must
  // never flip a freshly-loaded page into the other language, or every page goes back
  // to serving one language regardless of URL — the exact problem this split fixes.
  // localStorage is the fallback only for pages that don't declare a language (the
  // legacy tool.html?id= / article.html?id= entry points, purchase.html, 404.html).
  lang: window.RS_PAGE_LANG || localStorage.getItem('rs-lang') || 'en',

  setLang(lang){
    this.lang = lang;
    localStorage.setItem('rs-lang', lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-vi]').forEach(el=>{
      const val = el.getAttribute('data-' + lang);
      if(val !== null) el.innerHTML = val;
    });
    // Artwork with text baked in (labelled diagrams) ships as one file per
    // language; swap the image alongside the copy.
    document.querySelectorAll('[data-src-vi]').forEach(el=>{
      const src = el.getAttribute('data-src-' + lang);
      if(src && el.getAttribute('src') !== src) el.setAttribute('src', src);
    });
    // Nav/footer links to the 4 catalog pages point at a specific language's file
    // (built at header/footer injection time) — repoint them so an in-place toggle
    // doesn't leave menu links pointing at the pre-toggle language's pages.
    document.querySelectorAll('[data-rs-page]').forEach(el=>{
      el.setAttribute('href', window.RS_URL.page(el.dataset.rsPage, lang) + (el.dataset.rsHash || ''));
    });
    document.querySelectorAll('.lang button').forEach(b=>{
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  },

  observeReveal(){
    if(!this._io){
      this._io = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); this._io.unobserve(e.target); } });
      }, { threshold:.12, rootMargin:'0px 0px -40px 0px' });
    }
    document.querySelectorAll('.reveal:not(.in)').forEach(el=>this._io.observe(el));
  }
};
window.RS = RS;

document.addEventListener('DOMContentLoaded', ()=>{
  const h = document.getElementById('site-header');
  const f = document.getElementById('site-footer');
  if(h) h.innerHTML = headerHtml(RS.lang);
  if(f) f.innerHTML = footerHtml(RS.lang);

  const yr = document.getElementById('yr'); if(yr) yr.textContent = new Date().getFullYear();

  const page = document.body.dataset.page;
  if(page){ const link = document.querySelector('[data-nav="'+page+'"]'); if(link) link.classList.add('active'); }

  document.querySelectorAll('.lang button').forEach(b=>{
    b.addEventListener('click', ()=>RS.setLang(b.dataset.lang));
  });

  const mt = document.querySelector('.menu-toggle');
  if(mt) mt.addEventListener('click', ()=>document.body.classList.toggle('nav-open'));
  document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click', ()=>document.body.classList.remove('nav-open')));

  RS.observeReveal();
  RS.setLang(RS.lang);
});

/* ============================================================
   Shared email-gated download (used by Software & Drawings pages)
   Call: window.rsGate({ id, name:{vi,en}, download:"https://..." })
   Set RS_FORM_ENDPOINT to a Formspree URL to actually capture emails.
   ============================================================ */
// Endpoint that collects DOWNLOAD leads (free tools & drawing sets).
//
// ⚠️ Keep this a DIFFERENT Formspree form from PAYMENT.orderEndpoint in purchase.js.
//    This gate is unauthenticated and fires on every download, so it will always be
//    the first to exhaust a monthly quota. If orders share the form, a burst of free
//    downloads takes the order channel down with it — and orders are paid money.
//    Losing a download lead is an annoyance; losing an order is lost revenue.
window.RS_FORM_ENDPOINT = "https://formspree.io/f/xbdnzejn";
let RS_gateItem = null;

function rsBuildGate(){
  if(document.getElementById('gate')) return;
  const el = document.createElement('div');
  el.id = 'gate'; el.className = 'modal';
  el.innerHTML = `
    <div class="modal-card">
      <button class="close" onclick="rsCloseGate()" aria-label="Close">×</button>
      <div id="gateForm">
        <h3 data-vi="Nhận link tải" data-en="Get the download link">Nhận link tải</h3>
        <p data-vi="Nhập email của bạn để nhận link tải. Chúng tôi sẽ thông báo khi có phiên bản/cập nhật mới." data-en="Enter your email to get the download link. We'll notify you about new versions and updates.">Nhập email của bạn để nhận link tải.</p>
        <input type="email" id="gateEmail" placeholder="you@example.com" />
        <button class="btn btn-primary btn-block" onclick="rsSubmitGate()" data-vi="Nhận link tải" data-en="Get download link">Nhận link tải</button>
        <p class="modal-note" data-vi="Chúng tôi chỉ dùng email để gửi link tải và thông báo cập nhật. Nếu tải file chương trình, hãy đối chiếu mã SHA-256 trước khi chạy." data-en="We only use your email to send the download link and update notices. For program files, verify the SHA-256 checksum before running.">Chúng tôi chỉ dùng email để gửi link tải và thông báo cập nhật.</p>
      </div>
      <div id="gateThanks" class="hidden" style="text-align:center">
        <h3 data-vi="Cảm ơn bạn!" data-en="Thank you!">Cảm ơn bạn!</h3>
        <p id="gateThanksMsg"></p>
        <a id="gateDownloadBtn" class="btn btn-primary btn-block" href="#" data-vi="Bấm để tải" data-en="Click to download">Bấm để tải</a>
      </div>
    </div>`;
  document.body.appendChild(el);
  el.addEventListener('click', e=>{ if(e.target===el) window.rsCloseGate(); });
}

window.rsGate = function(item){
  RS_gateItem = item || null;
  rsBuildGate();
  document.getElementById('gateForm').classList.remove('hidden');
  document.getElementById('gateThanks').classList.add('hidden');
  document.getElementById('gate').classList.add('open');
  RS.setLang(RS.lang);
};
window.rsCloseGate = function(){ const g=document.getElementById('gate'); if(g) g.classList.remove('open'); };
window.rsSubmitGate = async function(){
  const email = (document.getElementById('gateEmail').value||'').trim();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ alert(RS.lang==='vi'?'Vui lòng nhập email hợp lệ.':'Please enter a valid email.'); return; }
  const it = RS_gateItem;
  if(window.RS_FORM_ENDPOINT){
    // Send a human-readable payload so the notification email is easy to scan.
    const itemName = it && it.name ? (it.name.en || it.name.vi) : '';
    const kind = it && it.screenshots && it.version ? 'Software' : (it ? 'Drawing set' : '');
    const when = new Date().toLocaleString('en-GB', { timeZone:'Asia/Ho_Chi_Minh', hour12:false });
    try{
      const res = await fetch(window.RS_FORM_ENDPOINT, { method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({
          email,
          product: itemName,
          type: kind,
          product_id: it && (it.id||''),
          downloaded_at: when + ' (GMT+7)',
          page: location.href
        }) });
      // A spent quota answers 4xx without rejecting, so the status must be read.
      // Unlike an order, a lost download lead must NOT block the customer — they
      // still get their file; we only surface the failure in the console.
      if(!res.ok) console.warn('[RS] Download lead not captured:', res.status, res.statusText);
    }catch(err){ console.warn('[RS] Download lead not captured:', err); }
  }
  document.getElementById('gateForm').classList.add('hidden');
  document.getElementById('gateThanks').classList.remove('hidden');
  const msg=document.getElementById('gateThanksMsg'), btn=document.getElementById('gateDownloadBtn');
  const url = it && it.download;
  if(url && /^https?:/.test(url)){
    msg.textContent = RS.lang==='vi' ? 'Link tải đã sẵn sàng — bấm nút bên dưới để tải file.' : 'Your download link is ready — click the button below to download.';
    // No `download` attribute: for a cross-origin GitHub release URL it adds no
    // benefit (GitHub already sends Content-Disposition: attachment) and on some
    // browsers a cross-origin download-attribute click is NOT treated as a normal
    // top-level navigation, so a SameSite=Lax session cookie (e.g. a logged-in
    // GitHub session, relevant if a release repo is private) may not be sent —
    // producing a 404 here even though pasting the same URL into the address bar
    // works. A plain link click behaves exactly like the address bar.
    btn.href = url; btn.removeAttribute('download'); btn.target = '_blank'; btn.rel = 'noopener';
    btn.classList.remove('hidden');
    // Close the dialog once the download has been kicked off — leaving it open
    // reads as "nothing happened". The short delay lets the click register and
    // the download start before the panel disappears; closing is only a DOM
    // change here, so it can never cancel a download already under way.
    btn.onclick = () => { setTimeout(window.rsCloseGate, 1200); };
  }else{
    msg.textContent = RS.lang==='vi' ? 'File sẽ sớm được cập nhật — chúng tôi sẽ gửi email cho bạn.' : 'The file will be available soon — we will email you.';
    btn.classList.add('hidden');
    btn.onclick = null;   // drop the handler left over from a previous open
  }
  RS.setLang(RS.lang);
};
