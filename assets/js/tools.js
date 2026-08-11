/* ============================================================
   Roberto Structural — Software catalog + detail
   Depends on: tools-data.js (window.TOOLS, window.TOOL_CATEGORIES),
               main.js (window.RS, window.rsGate)
   Email capture endpoint lives in main.js (window.RS_FORM_ENDPOINT).
   ============================================================ */

function tt(obj){ return (obj && (obj[window.RS.lang] ?? obj.vi)) || ""; }
function bi(obj){ return `data-vi="${(obj.vi||'').replace(/"/g,'&quot;')}" data-en="${(obj.en||'').replace(/"/g,'&quot;')}"`; }
function esc(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
// Escaped text in the page's own language — see the twin helper atxt() in
// articles.js for why hard-coding `.en` here was wrong for anything reading the
// page without running JS.
function ttxt(obj, lang){ return esc((obj && (obj[lang] ?? obj.en)) || ''); }
function isPaid(t){ return Number(t.priceVnd || 0) > 0; }
function isPublished(t){ return (t.status || 'ready') === 'ready'; }
// A free tool can be downloaded only when it is published AND has a real link.
function canDownload(t){ return isPublished(t) && !isPaid(t) && t.download && /^https?:/.test(t.download); }
function fmtVnd(n){ return Number(n).toLocaleString('vi-VN') + ' ₫'; }

/* Cover for cards/detail. Tools without a screenshot get a branded gradient
   block carrying the tool initials — intentional, not a broken image. */
function initialsOf(t){
  return (t.name.en || '').replace(/[^A-Za-z ]/g, '')
    .split(/\s+/).filter(Boolean).slice(0, 3).map(w => w[0].toUpperCase()).join('');
}
/* Catalog order: published first (free → cheapest → dearest), then the
   in-development items (also cheapest → dearest). Alphabetical as tie-break. */
function sortTools(list){
  return list.slice().sort((a, b) => {
    const sa = isPublished(a) ? 0 : 1, sb = isPublished(b) ? 0 : 1;
    if (sa !== sb) return sa - sb;
    const pa = Number(a.priceVnd || 0), pb = Number(b.priceVnd || 0);
    if (pa !== pb) return pa - pb;
    return (a.name.en || '').localeCompare(b.name.en || '');
  });
}

function coverHtml(t, href){
  const inner = `<span class="cat" ${bi(t.category)}>${esc(t.category.en)}</span>` +
                (t.host ? `<span class="host-tag">${esc(t.host)}</span>` : '');
  if(t.thumb){
    return href
      ? `<a class="thumb" href="${href}" style="background-image:url('${esc(t.thumb)}')">${inner}</a>`
      : `<div class="thumb" style="background-image:url('${esc(t.thumb)}')">${inner}</div>`;
  }
  const body = `${inner}<span class="thumb-initials">${esc(initialsOf(t))}</span>`;
  return href
    ? `<a class="thumb thumb-blank" href="${href}">${body}</a>`
    : `<div class="thumb thumb-blank">${body}</div>`;
}

// The one tool-card template — used by the tools.html catalog AND the homepage
// teaser, so both always show the real thumbnail/price/version and never drift
// out of sync the way the old hand-written homepage cards did.
function toolCardHtml(t, i){
  return `
  <article class="tcard reveal${isPublished(t) ? '' : ' tcard-soon'}" style="--i:${i}">
    ${coverHtml(t, window.RS_URL.tool(t.id))}
    <div class="b">
      <h3><a href="${window.RS_URL.tool(t.id)}" ${bi(t.name)}>${esc(t.name.en)}</a></h3>
      <p class="desc" ${bi(t.tagline)}>${esc(t.tagline.en)}</p>
      <div class="meta">
        <span><b>v${esc(t.version)}</b><span data-vi="Phiên bản" data-en="Version">Version</span></span>
        <span><b>${esc(t.host || 'General')}</b><span data-vi="Yêu cầu" data-en="Requires">Requires</span></span>
      </div>
      <div class="foot">
        ${ !isPublished(t)
            ? `<span class="badge-soon" data-vi="Đang phát triển" data-en="In development">In development</span>`
            : ( isPaid(t)
                ? `<span class="badge-price">${fmtVnd(t.priceVnd)}</span>`
                : `<span class="badge-free" data-vi="Miễn phí" data-en="Free">Free</span>` ) }
        <a class="btn btn-ghost" href="${window.RS_URL.tool(t.id)}" style="padding:.5rem 1rem" data-vi="Chi tiết" data-en="Details">Details</a>
      </div>
    </div>
  </article>`;
}

/* ---------------- CATALOG (tools.html) ---------------- */
function renderCatalog(){
  const grid = document.getElementById('tools-grid');
  const filterWrap = document.getElementById('tool-filters');
  if(!grid) return;

  // Master category list (shows all groups even if empty); fall back to categories in data.
  const cats = window.TOOL_CATEGORIES || (function(){
    const a=[]; window.TOOLS.forEach(t=>{ if(!a.find(c=>c.en===t.category.en)) a.push(t.category); }); return a;
  })();

  filterWrap.innerHTML =
    `<button class="filter-btn active" data-cat="all" data-vi="Tất cả" data-en="All">All</button>` +
    cats.map(c=>`<button class="filter-btn" data-cat="${esc(c.en)}" ${bi(c)}>${esc(c.en)}</button>`).join('');

  function draw(cat){
    const base = cat==='all' ? window.TOOLS : window.TOOLS.filter(t=>t.category.en===cat);
    const list = sortTools(base);
    if(list.length===0){
      grid.innerHTML = `<p class="lead reveal" data-vi="Nhóm này sắp có sản phẩm — vui lòng quay lại sau." data-en="Products for this group are coming soon — please check back.">Coming soon.</p>`;
    } else {
      grid.innerHTML = list.map(toolCardHtml).join('');
    }
    window.RS.observeReveal();
    window.RS.setLang(window.RS.lang);
  }

  filterWrap.addEventListener('click', e=>{
    const b = e.target.closest('.filter-btn'); if(!b) return;
    filterWrap.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    draw(b.dataset.cat);
  });

  draw('all');
}

/* ---------------- DETAIL (tool.html) ----------------
   Pure markup builder, shared with scripts/build-pages.mjs so tool-<id>.html can
   ship the detail page as real HTML instead of an empty <main> filled in by JS.
   Must not touch document/window state — see RS_ARTICLE_HTML in articles.js. */
window.RS_TOOL_HTML = function(t, lang){
  const U = window.RS_URL;
  const T = (vi, en) => lang === 'vi' ? vi : en;   // visible copy, page's own language
  const shots = (t.screenshots && t.screenshots.length) ? t.screenshots : (t.thumb ? [t.thumb] : []);

  return `
  <section class="page-hero"><div class="container">
    <p class="breadcrumb"><a href="${U.page('index', lang)}" data-vi="Trang chủ" data-en="Home">${T('Trang chủ','Home')}</a> / <a href="${U.page('tools', lang)}" data-vi="Phần mềm" data-en="Software">${T('Phần mềm','Software')}</a> / <span>${ttxt(t.name, lang)}</span></p>
    <p class="eyebrow" ${bi(t.category)}>${ttxt(t.category, lang)}</p>
    <h1 ${bi(t.name)}>${ttxt(t.name, lang)}</h1>
    <p ${bi(t.tagline)}>${ttxt(t.tagline, lang)}</p>
  </div></section>

  <section class="section" style="padding-top:clamp(2rem,5vw,3.5rem)"><div class="container">
    <div class="detail-grid">
      <div>
        ${ shots.length ? `
        <div class="gallery">
          <img class="main-img" id="mainImg" src="${esc(shots[0])}" alt="${ttxt(t.name, lang)}" onclick="rsOpenShot()" title="Bấm để phóng to | Click to zoom"/>
          <span class="gallery-zoom">⤢</span>
          ${ shots.length > 1 ? `<div class="thumbs">
            ${shots.map((s,i)=>`<img src="${esc(s)}" class="${i===0?'active':''}" onclick="rsSwapShot(this,${i})" alt="screenshot ${i+1}"/>`).join('')}
          </div>` : '' }
        </div>` : `
        <div class="shot-none">
          <span class="shot-none-initials">${esc(initialsOf(t))}</span>
          <p data-vi="Ảnh giao diện sẽ được cập nhật." data-en="Interface screenshots coming soon.">${T('Ảnh giao diện sẽ được cập nhật.','Interface screenshots coming soon.')}</p>
        </div>` }

        ${ t.features && t.features.length ? `
        <p class="block-title" data-vi="Tính năng chính" data-en="Key features">${T('Tính năng chính','Key features')}</p>
        <ul class="feat-list">
          ${t.features.map(f=>`<li ${bi(f)}>${ttxt(f, lang)}</li>`).join('')}
        </ul>` : '' }

        <p class="block-title" data-vi="Yêu cầu hệ thống" data-en="System requirements">${T('Yêu cầu hệ thống','System requirements')}</p>
        <p class="lead" style="margin-top:.3rem" ${bi(t.requirements)}>${ttxt(t.requirements, lang)}</p>
      </div>

      <aside>
        <div class="buybox">
          <div class="price">${ isPaid(t)
              ? `${fmtVnd(t.priceVnd)} <small data-vi="· bản quyền vĩnh viễn" data-en="· perpetual licence">${T('· bản quyền vĩnh viễn','· perpetual licence')}</small>`
              : `<span data-vi="Miễn phí" data-en="Free">${T('Miễn phí','Free')}</span>` }</div>
          <table class="spec">
            <tr><td data-vi="Phiên bản" data-en="Version">${T('Phiên bản','Version')}</td><td>v${esc(t.version)}</td></tr>
            ${ t.size && t.size !== '—' ? `<tr><td data-vi="Dung lượng" data-en="Size">${T('Dung lượng','Size')}</td><td>${esc(t.size)}</td></tr>` : '' }
            <tr><td data-vi="Yêu cầu" data-en="Requires">${T('Yêu cầu','Requires')}</td><td>${esc(t.host || 'General')}</td></tr>
            <tr><td data-vi="Hệ điều hành" data-en="OS">${T('Hệ điều hành','OS')}</td><td>${esc(t.os)}</td></tr>
          </table>

          ${ !isPublished(t)
            ? `<button class="btn btn-primary btn-block" style="margin-top:1.2rem;opacity:.55;cursor:not-allowed" disabled data-vi="Đang phát triển" data-en="In development">${T('Đang phát triển','In development')}</button>
               <p class="muted small" style="margin-top:.7rem;text-align:center;color:var(--steel);font-size:.82rem" data-vi="Đăng ký nhận tin để biết khi phát hành." data-en="Follow us to hear when this is released.">${T('Đăng ký nhận tin để biết khi phát hành.','Follow us to hear when this is released.')}</p>`
            : ( isPaid(t)
                ? `<a class="btn btn-primary btn-block" style="margin-top:1.2rem" href="purchase.html?id=${t.id}" data-vi="Mua bản quyền" data-en="Buy licence">${T('Mua bản quyền','Buy licence')}</a>`
                : ( canDownload(t)
                    ? `<button class="btn btn-primary btn-block" style="margin-top:1.2rem" onclick='rsOpenGate("${t.id}")' data-vi="Tải miễn phí" data-en="Download free">${T('Tải miễn phí','Download free')}</button>`
                    : `<button class="btn btn-primary btn-block" style="margin-top:1.2rem;opacity:.55;cursor:not-allowed" disabled data-vi="Sắp ra mắt" data-en="Coming soon">${T('Sắp ra mắt','Coming soon')}</button>` ) ) }

          ${ !isPaid(t) ? `<div class="trust">
            ${ t.virustotal ? `<a class="chip" href="${esc(t.virustotal)}" target="_blank" rel="noopener">VirusTotal ↗</a>` : '' }
          </div>` : '' }
          ${ t.checksum && !isPaid(t) ? `<p style="margin-top:.9rem;font-size:.75rem;color:var(--steel)"><b>SHA-256</b></p><div class="checksum">${esc(t.checksum)}</div>` : `` }
        </div>
      </aside>
    </div>
  </div></section>`;
};

function renderDetail(){
  const root = document.getElementById('tool-detail');
  if(!root) return;
  // Generated pages (tool-<id>.html) declare RS_PAGE_ID; the legacy
  // tool.html?id= entry point still works for links shared earlier.
  const id = window.RS_PAGE_ID || new URLSearchParams(location.search).get('id');
  const t = (window.TOOLS||[]).find(x=>x.id===id);
  const lang = window.RS.lang;

  if(!t){
    root.innerHTML = `<div class="container section" style="text-align:center">
      <h2 class="h2" data-vi="Không tìm thấy phần mềm" data-en="Software not found">Software not found</h2>
      <p class="lead" style="margin:1rem auto" data-vi="Mục bạn tìm không tồn tại." data-en="The item you requested does not exist.">The item you requested does not exist.</p>
      <a class="btn btn-primary" href="${window.RS_URL.page('tools')}" data-vi="Về danh mục" data-en="Back to catalog">Back to catalog</a></div>`;
    window.RS.setLang(lang);
    return;
  }

  // Follow the page language — see the same fix in articles.js renderArticle.
  document.title = (t.name[lang] || t.name.en) + " — Roberto Structural";
  // Generated pages (RS_PAGE_ID set) already carry the right language via RS_PAGE_LANG,
  // so the canonical can just follow RS.lang. The legacy ?id= entry point declares no
  // language — pin its canonical to 'en' so it doesn't drift with a visitor's localStorage.
  rsSetCanonical(window.RS_URL.tool(t.id, window.RS_PAGE_ID ? undefined : 'en'));

  // Remember the gallery so the lightbox can open at the right image.
  window.RS_SHOTS = (t.screenshots && t.screenshots.length) ? t.screenshots : (t.thumb ? [t.thumb] : []);
  window.RS_SHOT_INDEX = 0;

  root.innerHTML = window.RS_TOOL_HTML(t, lang);

  window.RS.observeReveal();
  window.RS.setLang(lang);
}

// Gallery thumbnail swap
window.rsSwapShot = function(el, index){
  const shots = window.RS_SHOTS || [];
  window.RS_SHOT_INDEX = Number(index) || 0;
  const main = document.getElementById('mainImg');
  if(main && shots[window.RS_SHOT_INDEX]) main.src = shots[window.RS_SHOT_INDEX];
  document.querySelectorAll('.thumbs img').forEach(i=>i.classList.remove('active'));
  el.classList.add('active');
};

// Open the shared zoomable lightbox at the image currently shown
window.rsOpenShot = function(){
  if(window.RSLightbox && (window.RS_SHOTS||[]).length){
    window.RSLightbox.open(window.RS_SHOTS, window.RS_SHOT_INDEX || 0);
  }
};

// Thin wrapper: open the shared email-gate for a tool id
window.rsOpenGate = function(id){
  const t = (window.TOOLS||[]).find(x=>x.id===id);
  if(t) window.rsGate(t);
};

/* ---------------- HOME TEASER (index.html) ---------------- */
// Same 3-per-page order as the catalog (published free → cheapest → dearest),
// so the homepage always features whatever is actually cheapest/newest to try —
// no hand-picked list to go stale next to real prices.
function renderHomeTools(){
  const wrap = document.getElementById('home-tools');
  if(!wrap) return;
  const list = sortTools(window.TOOLS || []).slice(0, 3);
  wrap.innerHTML = list.map(toolCardHtml).join('');
  window.RS.observeReveal();
  window.RS.setLang(window.RS.lang);
}

document.addEventListener('DOMContentLoaded', ()=>{ renderCatalog(); renderDetail(); renderHomeTools(); });
