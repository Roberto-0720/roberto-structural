/* ============================================================
   Roberto Structural — Drawings library catalog + lightbox
   Depends on: drawings-data.js (window.DRAWINGS, window.DRAWING_CATEGORIES),
               main.js (window.RS, window.rsGate)
   ============================================================ */

function dbi(obj){ return `data-vi="${(obj.vi||'').replace(/"/g,'&quot;')}" data-en="${(obj.en||'').replace(/"/g,'&quot;')}"`; }
function desc2(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function dIsPaid(d){ return Number(d.priceVnd || 0) > 0; }
// A free set can be downloaded only when it has a real public link.
function dReady(d){ return !dIsPaid(d) && d.download && /^https?:/.test(d.download); }
function dFmtVnd(n){ return Number(n).toLocaleString('vi-VN') + ' ₫'; }

/* Một bản vẽ có thể thuộc NHIỀU nhóm — chi tiết điển hình công nghiệp vừa là
   "Chi tiết điển hình" vừa thuộc "Kết cấu thép" hoặc "Kết cấu BTCT".
     category    = nhóm CHÍNH, hiện trên huy hiệu của thẻ (luôn có)
     categories  = đủ các nhóm, chỉ dùng để LỌC (tuỳ chọn)
   Bỏ trống `categories` thì rơi về `category` — nên 10 bộ nhà dân cũ không phải sửa. */
function dCats(d){ return (d.categories && d.categories.length) ? d.categories : [d.category]; }
function dInCat(d, cat){ return dCats(d).some(c => c.en === cat); }

/* Trong mục "Tất cả", bản vẽ kiến trúc (nhà dân) luôn xếp sau cùng: site này nói
   về kết cấu công nghiệp, nên chi tiết điển hình phải là thứ khách thấy trước.
   sort() của JS ổn định nên trong mỗi nhóm thứ tự vẫn giữ nguyên như trong file data. */
function dSorted(list){
  const isArch = d => dCats(d).some(c => c.en === 'Architectural');
  return list.slice().sort((a, b) => (isArch(a) ? 1 : 0) - (isArch(b) ? 1 : 0));
}

function renderDrawings(){
  const grid = document.getElementById('draw-grid');
  const filterWrap = document.getElementById('draw-filters');
  if(!grid) return;

  const cats = window.DRAWING_CATEGORIES || (function(){
    const a=[]; window.DRAWINGS.forEach(d=>{ if(!a.find(c=>c.en===d.category.en)) a.push(d.category); }); return a;
  })();

  filterWrap.innerHTML =
    `<button class="filter-btn active" data-cat="all" data-vi="Tất cả" data-en="All">All</button>` +
    cats.map(c=>`<button class="filter-btn" data-cat="${desc2(c.en)}" ${dbi(c)}>${desc2(c.en)}</button>`).join('');

  function draw(cat){
    const list = dSorted(cat==='all' ? window.DRAWINGS : window.DRAWINGS.filter(d=>dInCat(d, cat)));
    if(list.length===0){
      grid.innerHTML = `<p class="lead reveal" data-vi="Nhóm này sắp có bản vẽ — vui lòng quay lại sau." data-en="Drawings for this group are coming soon — please check back.">Coming soon.</p>`;
    } else {
      grid.innerHTML = list.map((d,i)=>`
      <article class="tcard reveal" style="--i:${i}">
        <div class="thumb thumb-click" style="background-image:url('${desc2(d.thumb)}')" onclick="rsOpenLightbox('${d.id}')" title="Xem bản vẽ / View drawings">
          <span class="cat" ${dbi(d.category)}>${desc2(d.category.en)}</span>
          <span class="thumb-zoom">⤢</span>
        </div>
        <div class="b">
          <h3 ${dbi(d.name)}>${desc2(d.name.en)}</h3>
          <p class="desc" ${dbi(d.description)}>${desc2(d.description.en)}</p>
          ${ d.contents && d.contents.length ? `<ul class="dw-inc">${d.contents.map(c=>`<li ${dbi(c)}>${desc2(c.en)}</li>`).join('')}</ul>` : '' }
          <div class="meta">
            <span><b>${desc2(d.format)}</b><span data-vi="Định dạng" data-en="Format">Format</span></span>
            <span><b ${dbi(d.count)}>${desc2(d.count.en)}</b><span data-vi="Quy mô" data-en="Scope">Scope</span></span>
          </div>
          <div class="foot">
            ${ dIsPaid(d)
                ? `<span class="badge-price">${dFmtVnd(d.priceVnd)}</span>`
                : `<span class="badge-free" data-vi="Miễn phí" data-en="Free">Free</span>` }
            <button class="btn btn-ghost" style="padding:.5rem 1rem" onclick="rsOpenLightbox('${d.id}')" data-vi="Xem bản vẽ" data-en="View drawings">View drawings</button>
          </div>
          ${ dIsPaid(d)
              ? `<a class="btn btn-primary btn-block" href="purchase.html?id=${encodeURIComponent(d.id)}" data-vi="Mua bản vẽ" data-en="Buy drawing">Buy drawing</a>`
              : ( dReady(d)
                  ? `<button class="btn btn-primary btn-block" onclick='rsOpenDrawing("${d.id}")' data-vi="Tải bản vẽ" data-en="Download">Download</button>`
                  : `<span class="badge-soon" data-vi="Sắp có bản tải" data-en="Download soon">Download soon</span>` ) }
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

// Open the shared email-gate for a drawing set id
window.rsOpenDrawing = function(id){
  const d = (window.DRAWINGS||[]).find(x=>x.id===id);
  if(d) window.rsGate(d);
};

/* ---------------- Gallery (shared zoomable lightbox) ---------------- */
window.rsOpenLightbox = function(id){
  const d = (window.DRAWINGS||[]).find(x=>x.id===id);
  if(!d || !window.RSLightbox) return;
  const shots = (d.screenshots && d.screenshots.length) ? d.screenshots : [d.thumb].filter(Boolean);
  const name = (d.name && (d.name[window.RS.lang] || d.name.vi)) || '';
  window.RSLightbox.open(shots, 0, shots.map(()=>name));
};

document.addEventListener('DOMContentLoaded', renderDrawings);
