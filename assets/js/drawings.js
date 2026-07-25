/* ============================================================
   Roberto Structural — Drawings library catalog + lightbox
   Depends on: drawings-data.js (window.DRAWINGS, window.DRAWING_CATEGORIES),
               main.js (window.RS, window.rsGate)
   ============================================================ */

function dbi(obj){ return `data-vi="${(obj.vi||'').replace(/"/g,'&quot;')}" data-en="${(obj.en||'').replace(/"/g,'&quot;')}"`; }
function desc2(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function dReady(d){ return d.download && /^https?:/.test(d.download); }

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
    const list = cat==='all' ? window.DRAWINGS : window.DRAWINGS.filter(d=>d.category.en===cat);
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
            <button class="btn btn-ghost" style="padding:.5rem 1rem" onclick="rsOpenLightbox('${d.id}')" data-vi="Xem bản vẽ" data-en="View drawings">View drawings</button>
            ${ dReady(d)
                ? `<button class="btn btn-primary" style="padding:.5rem 1rem" onclick='rsOpenDrawing("${d.id}")' data-vi="Tải bản vẽ" data-en="Download">Download</button>`
                : `<span class="badge-soon" data-vi="Sắp có bản tải" data-en="Download soon">Download soon</span>` }
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

// Open the shared email-gate for a drawing set id
window.rsOpenDrawing = function(id){
  const d = (window.DRAWINGS||[]).find(x=>x.id===id);
  if(d) window.rsGate(d);
};

/* ---------------- Lightbox gallery ---------------- */
let RS_lbShots = [], RS_lbIndex = 0;

function rsBuildLightbox(){
  if(document.getElementById('lightbox')) return;
  const el = document.createElement('div');
  el.id = 'lightbox'; el.className = 'lb';
  el.innerHTML = `
    <button class="lb-close" onclick="rsCloseLb()" aria-label="Close">×</button>
    <button class="lb-nav lb-prev" onclick="rsLbStep(-1)" aria-label="Previous">‹</button>
    <img id="lbImg" class="lb-img" alt="drawing" />
    <button class="lb-nav lb-next" onclick="rsLbStep(1)" aria-label="Next">›</button>
    <div class="lb-counter" id="lbCounter"></div>`;
  document.body.appendChild(el);
  el.addEventListener('click', e=>{ if(e.target===el) rsCloseLb(); });
}
function rsLbUpdate(){
  const img = document.getElementById('lbImg');
  const ctr = document.getElementById('lbCounter');
  if(img) img.src = RS_lbShots[RS_lbIndex] || '';
  if(ctr) ctr.textContent = (RS_lbIndex+1) + ' / ' + RS_lbShots.length;
}
window.rsOpenLightbox = function(id){
  const d = (window.DRAWINGS||[]).find(x=>x.id===id);
  if(!d) return;
  RS_lbShots = d.screenshots && d.screenshots.length ? d.screenshots : [d.thumb];
  RS_lbIndex = 0;
  rsBuildLightbox();
  rsLbUpdate();
  document.getElementById('lightbox').classList.add('open');
};
window.rsLbStep = function(delta){
  if(!RS_lbShots.length) return;
  RS_lbIndex = (RS_lbIndex + delta + RS_lbShots.length) % RS_lbShots.length;
  rsLbUpdate();
};
window.rsCloseLb = function(){ const l=document.getElementById('lightbox'); if(l) l.classList.remove('open'); };

document.addEventListener('keydown', e=>{
  const lb = document.getElementById('lightbox');
  if(!lb || !lb.classList.contains('open')) return;
  if(e.key==='Escape') rsCloseLb();
  else if(e.key==='ArrowLeft') rsLbStep(-1);
  else if(e.key==='ArrowRight') rsLbStep(1);
});

document.addEventListener('DOMContentLoaded', renderDrawings);
