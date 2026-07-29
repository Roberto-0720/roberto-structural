/* ============================================================
   Roberto Structural — Software catalog + detail
   Depends on: tools-data.js (window.TOOLS, window.TOOL_CATEGORIES),
               main.js (window.RS, window.rsGate)
   Email capture endpoint lives in main.js (window.RS_FORM_ENDPOINT).
   ============================================================ */

function tt(obj){ return (obj && (obj[window.RS.lang] ?? obj.vi)) || ""; }
function bi(obj){ return `data-vi="${(obj.vi||'').replace(/"/g,'&quot;')}" data-en="${(obj.en||'').replace(/"/g,'&quot;')}"`; }
function esc(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function isReady(t){ return t.download && /^https?:/.test(t.download); }
function isPaid(t){ return Number(t.priceVnd || 0) > 0; }
function fmtVnd(n){ return Number(n).toLocaleString('vi-VN') + ' ₫'; }

// Price label shown on cards and in the buy box.
function priceLabel(t){
  if(isPaid(t)) return fmtVnd(t.priceVnd);
  return window.RS.lang === 'vi' ? 'Miễn phí' : 'Free';
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
    const list = cat==='all' ? window.TOOLS : window.TOOLS.filter(t=>t.category.en===cat);
    if(list.length===0){
      grid.innerHTML = `<p class="lead reveal" data-vi="Nhóm này sắp có sản phẩm — vui lòng quay lại sau." data-en="Products for this group are coming soon — please check back.">Coming soon.</p>`;
    } else {
      grid.innerHTML = list.map((t,i)=>`
      <article class="tcard reveal" style="--i:${i}">
        <a class="thumb" href="tool.html?id=${t.id}" style="background-image:url('${esc(t.thumb)}')">
          <span class="cat" ${bi(t.category)}>${esc(t.category.en)}</span>
        </a>
        <div class="b">
          <h3><a href="tool.html?id=${t.id}" ${bi(t.name)}>${esc(t.name.en)}</a></h3>
          <p class="desc" ${bi(t.tagline)}>${esc(t.tagline.en)}</p>
          <div class="meta">
            <span><b>${esc(t.version)}</b><span data-vi="Phiên bản" data-en="Version">Version</span></span>
            <span><b>${esc(t.size)}</b><span data-vi="Dung lượng" data-en="Size">Size</span></span>
            <span><b>Windows</b><span data-vi="Chạy ngay" data-en="Runs on">Runs on</span></span>
          </div>
          <div class="foot">
            ${ isPaid(t)
                ? `<span class="badge-price">${fmtVnd(t.priceVnd)}</span>`
                : ( isReady(t)
                    ? `<span class="badge-free" data-vi="Miễn phí" data-en="Free">Free</span>`
                    : `<span class="badge-soon" data-vi="Sắp ra mắt" data-en="Coming soon">Coming soon</span>` ) }
            <a class="btn btn-ghost" href="tool.html?id=${t.id}" style="padding:.5rem 1rem" data-vi="Chi tiết" data-en="Details">Details</a>
          </div>
        </div>
      </article>`).join('');
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

/* ---------------- DETAIL (tool.html) ---------------- */
function renderDetail(){
  const root = document.getElementById('tool-detail');
  if(!root) return;
  const id = new URLSearchParams(location.search).get('id');
  const t = (window.TOOLS||[]).find(x=>x.id===id);

  if(!t){
    root.innerHTML = `<div class="container section" style="text-align:center">
      <h2 class="h2" data-vi="Không tìm thấy phần mềm" data-en="Software not found">Software not found</h2>
      <p class="lead" style="margin:1rem auto" data-vi="Mục bạn tìm không tồn tại." data-en="The item you requested does not exist.">The item you requested does not exist.</p>
      <a class="btn btn-primary" href="tools.html" data-vi="Về danh mục" data-en="Back to catalog">Back to catalog</a></div>`;
    window.RS.setLang(window.RS.lang);
    return;
  }

  document.title = t.name.en + " — Roberto Structural";
  const ready = isReady(t);

  root.innerHTML = `
  <section class="page-hero"><div class="container">
    <p class="breadcrumb"><a href="index.html" data-vi="Trang chủ" data-en="Home">Home</a> / <a href="tools.html" data-vi="Phần mềm" data-en="Software">Software</a> / <span>${esc(t.name.en)}</span></p>
    <p class="eyebrow" ${bi(t.category)}>${esc(t.category.en)}</p>
    <h1 ${bi(t.name)}>${esc(t.name.en)}</h1>
    <p ${bi(t.tagline)}>${esc(t.tagline.en)}</p>
  </div></section>

  <section class="section" style="padding-top:clamp(2rem,5vw,3.5rem)"><div class="container">
    <div class="detail-grid">
      <div>
        <div class="gallery">
          <img class="main-img" id="mainImg" src="${esc(t.screenshots[0]||t.thumb)}" alt="${esc(t.name.en)}"/>
          <div class="thumbs">
            ${t.screenshots.map((s,i)=>`<img src="${esc(s)}" class="${i===0?'active':''}" onclick="rsSwapShot(this,'${esc(s)}')" alt="screenshot ${i+1}"/>`).join('')}
          </div>
        </div>

        <p class="block-title" data-vi="Tính năng chính" data-en="Key features">Key features</p>
        <ul class="feat-list">
          ${t.features.map(f=>`<li ${bi(f)}>${esc(f.en)}</li>`).join('')}
        </ul>

        <p class="block-title" data-vi="Yêu cầu hệ thống" data-en="System requirements">System requirements</p>
        <p class="lead" style="margin-top:.3rem" ${bi(t.requirements)}>${esc(t.requirements.en)}</p>
      </div>

      <aside>
        <div class="buybox">
          <div class="price">${ isPaid(t)
              ? `${fmtVnd(t.priceVnd)} <small data-vi="· bản quyền vĩnh viễn" data-en="· perpetual licence">· perpetual licence</small>`
              : `<span data-vi="Miễn phí" data-en="Free">Free</span>` }</div>
          <table class="spec">
            <tr><td data-vi="Phiên bản" data-en="Version">Version</td><td>${esc(t.version)}</td></tr>
            <tr><td data-vi="Dung lượng" data-en="Size">Size</td><td>${esc(t.size)}</td></tr>
            <tr><td data-vi="Cập nhật" data-en="Updated">Updated</td><td>${esc(t.updated)}</td></tr>
            <tr><td data-vi="Hệ điều hành" data-en="OS">OS</td><td>${esc(t.os)}</td></tr>
          </table>

          ${ isPaid(t)
            ? `<a class="btn btn-primary btn-block" style="margin-top:1.2rem" href="purchase.html?id=${t.id}" data-vi="Mua bản quyền" data-en="Buy licence">Buy licence</a>`
            : ( ready
                ? `<button class="btn btn-primary btn-block" style="margin-top:1.2rem" onclick='rsOpenGate("${t.id}")' data-vi="Tải miễn phí" data-en="Download free">Download free</button>`
                : `<button class="btn btn-primary btn-block" style="margin-top:1.2rem;opacity:.55;cursor:not-allowed" disabled data-vi="Sắp ra mắt" data-en="Coming soon">Coming soon</button>` ) }

          <div class="trust">
            <span class="chip" data-vi="Chạy ngay, không cần cài đặt" data-en="Runs instantly, no install">Runs instantly, no install</span>
            ${ isPaid(t)
              ? `<span class="chip" data-vi="Kích hoạt offline, không giới hạn máy" data-en="Offline activation, any PC">Offline activation, any PC</span>`
              : ( t.virustotal ? `<a class="chip" href="${esc(t.virustotal)}" target="_blank" rel="noopener">VirusTotal ↗</a>` : `<span class="chip" data-vi="An toàn, đã kiểm tra" data-en="Safe, scanned">Safe, scanned</span>` ) }
          </div>
          ${ t.checksum && !isPaid(t) ? `<p style="margin-top:.9rem;font-size:.75rem;color:var(--steel)"><b>SHA-256</b></p><div class="checksum">${esc(t.checksum)}</div>` : `` }
        </div>
      </aside>
    </div>
  </div></section>`;

  window.RS.observeReveal();
  window.RS.setLang(window.RS.lang);
}

// Gallery thumbnail swap
window.rsSwapShot = function(el, src){
  const main = document.getElementById('mainImg'); if(main) main.src = src;
  document.querySelectorAll('.thumbs img').forEach(i=>i.classList.remove('active'));
  el.classList.add('active');
};

// Thin wrapper: open the shared email-gate for a tool id
window.rsOpenGate = function(id){
  const t = (window.TOOLS||[]).find(x=>x.id===id);
  if(t) window.rsGate(t);
};

document.addEventListener('DOMContentLoaded', ()=>{ renderCatalog(); renderDetail(); });
