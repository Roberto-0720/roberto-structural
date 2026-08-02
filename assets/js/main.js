/* ============================================================
   Roberto Structural — shared site script
   - Injects header & footer (single source of truth)
   - VI/EN language toggle (persisted in localStorage), default EN
   - Mobile menu
   - Scroll-reveal via IntersectionObserver
   - Shared email-gated download (used by Software & Drawings pages)
   All UI notes/comments in English (per project convention).
   ============================================================ */

// ---- Header markup. Nav links use index.html#anchor so they work from any page. ----
const HEADER_HTML = `
<div class="container nav">
  <a class="brand" href="index.html">
    <img src="Logo/Roberto_1.webp" alt="Roberto Structural logo" />
    <b>Roberto<br>Structural</b>
  </a>
  <nav class="nav-links">
    <a href="index.html#industries" data-vi="Lĩnh vực" data-en="Expertise">Lĩnh vực</a>
    <a href="insights.html" data-nav="insights" data-vi="Bài viết" data-en="Insights">Bài viết</a>
    <a href="tools.html" data-nav="tools" data-vi="Phần mềm" data-en="Software">Phần mềm</a>
    <a href="drawings.html" data-nav="drawings" data-vi="Bản vẽ" data-en="Drawings">Bản vẽ</a>
    <a href="index.html#projects" data-vi="Dự án" data-en="Projects">Dự án</a>
    <a href="index.html#contact" data-vi="Liên hệ" data-en="Contact">Liên hệ</a>
  </nav>
  <div class="nav-right">
    <div class="lang">
      <button data-lang="vi">VI</button>
      <button data-lang="en">EN</button>
    </div>
    <a href="index.html#contact" class="btn btn-primary" style="padding:.6rem 1.1rem" data-vi="Tư vấn" data-en="Get a quote">Tư vấn</a>
    <button class="menu-toggle" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</div>`;

const FOOTER_HTML = `
<div class="container">
  <div class="foot-grid">
    <div>
      <h4>Roberto Structural</h4>
      <p style="color:var(--steel-light);font-size:.9rem;max-width:34ch">Engineering Strength Into Every Structure. <span data-vi="Kết cấu công nghiệp & nhà máy." data-en="Industrial & plant structures.">Kết cấu công nghiệp & nhà máy.</span></p>
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
      <a href="index.html#industries" data-vi="Lĩnh vực" data-en="Industries">Lĩnh vực</a>
      <a href="index.html#about" data-vi="Giới thiệu" data-en="About">Giới thiệu</a>
      <a href="insights.html" data-vi="Bài viết" data-en="Insights">Bài viết</a>
      <a href="tools.html" data-vi="Phần mềm" data-en="Software">Phần mềm</a>
      <a href="drawings.html" data-vi="Bản vẽ" data-en="Drawings">Bản vẽ</a>
      <a href="index.html#projects" data-vi="Dự án" data-en="Projects">Dự án</a>
    </div>
    <div>
      <h4 data-vi="Lĩnh vực" data-en="Sectors">Lĩnh vực</h4>
      <a href="index.html#industries" data-vi="Lọc hóa dầu" data-en="Petrochemical">Lọc hóa dầu</a>
      <a href="index.html#industries" data-vi="Nhiệt điện" data-en="Thermal power">Nhiệt điện</a>
      <a href="index.html#industries" data-vi="Điện khí" data-en="Gas power">Điện khí</a>
      <a href="index.html#industries" data-vi="Điện rác" data-en="Waste-to-energy">Điện rác</a>
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

const RS = {
  lang: localStorage.getItem('rs-lang') || 'en',   // default language = English

  setLang(lang){
    this.lang = lang;
    localStorage.setItem('rs-lang', lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-vi]').forEach(el=>{
      const val = el.getAttribute('data-' + lang);
      if(val !== null) el.innerHTML = val;
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
  if(h) h.innerHTML = HEADER_HTML;
  if(f) f.innerHTML = FOOTER_HTML;

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
      await fetch(window.RS_FORM_ENDPOINT, { method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({
          email,
          product: itemName,
          type: kind,
          product_id: it && (it.id||''),
          downloaded_at: when + ' (GMT+7)',
          page: location.href
        }) });
    }catch(err){ /* ignore network errors */ }
  }
  document.getElementById('gateForm').classList.add('hidden');
  document.getElementById('gateThanks').classList.remove('hidden');
  const msg=document.getElementById('gateThanksMsg'), btn=document.getElementById('gateDownloadBtn');
  const url = it && it.download;
  if(url && /^https?:/.test(url)){
    msg.textContent = RS.lang==='vi' ? 'Link tải đã sẵn sàng — bấm nút bên dưới để tải file.' : 'Your download link is ready — click the button below to download.';
    btn.href = url; btn.setAttribute('download',''); btn.classList.remove('hidden');
  }else{
    msg.textContent = RS.lang==='vi' ? 'File sẽ sớm được cập nhật — chúng tôi sẽ gửi email cho bạn.' : 'The file will be available soon — we will email you.';
    btn.classList.add('hidden');
  }
  RS.setLang(RS.lang);
};
