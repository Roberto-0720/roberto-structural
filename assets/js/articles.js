/* ============================================================
   Roberto Structural — Insights (articles) index + reader
   Depends on: articles-data.js (window.ARTICLES, window.ARTICLE_CATEGORIES),
               main.js (window.RS)
   ============================================================ */

function abi(o){ return `data-vi="${(o.vi||'').replace(/"/g,'&quot;')}" data-en="${(o.en||'').replace(/"/g,'&quot;')}"`; }
function aesc(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
// Body text may contain <b>/<i> on purpose → insert as-is.
function araw(o){ return (o && (o[window.RS.lang] ?? o.vi)) || ""; }
function afmtDate(iso, lang){
  const d = new Date(iso + 'T00:00:00');
  if(isNaN(d)) return iso;
  return d.toLocaleDateString(lang==='vi' ? 'vi-VN' : 'en-GB', { day:'2-digit', month:'short', year:'numeric' });
}

/* ---------------- INDEX (insights.html) ---------------- */
function renderArticleIndex(){
  const grid = document.getElementById('art-grid');
  const filterWrap = document.getElementById('art-filters');
  if(!grid) return;

  // Only show categories that actually have articles, in master order.
  const master = window.ARTICLE_CATEGORIES || [];
  const used = master.filter(c => window.ARTICLES.some(a => a.category.en === c.en));

  filterWrap.innerHTML =
    `<button class="filter-btn active" data-cat="all" data-vi="Tất cả" data-en="All">All</button>` +
    used.map(c=>`<button class="filter-btn" data-cat="${aesc(c.en)}" ${abi(c)}>${aesc(c.en)}</button>`).join('');

  function draw(cat){
    const list = cat==='all' ? window.ARTICLES : window.ARTICLES.filter(a=>a.category.en===cat);
    if(!list.length){
      grid.innerHTML = `<p class="lead reveal" data-vi="Chưa có bài trong mục này." data-en="No articles in this category yet.">No articles in this category yet.</p>`;
    } else {
      grid.innerHTML = list.map((a,i)=>`
      <article class="acard reveal" style="--i:${i}">
        <a class="acard-thumb" href="article.html?id=${a.id}" style="background-image:url('${aesc(a.cover)}')">
          <span class="acard-no">No. ${aesc(a.no)}</span>
        </a>
        <div class="acard-body">
          <div class="acard-meta">
            <span class="acard-cat" ${abi(a.category)}>${aesc(a.category.en)}</span>
            <span class="acard-dot">·</span>
            <span data-date="${a.date}">${afmtDate(a.date, window.RS.lang)}</span>
            <span class="acard-dot">·</span>
            <span>${a.readmin} min</span>
          </div>
          <h3><a href="article.html?id=${a.id}" ${abi(a.title)}>${aesc(a.title.en)}</a></h3>
          <p class="acard-ex" ${abi(a.excerpt)}>${aesc(a.excerpt.en)}</p>
          <a class="acard-more" href="article.html?id=${a.id}" data-vi="Đọc bài →" data-en="Read article →">Read article →</a>
        </div>
      </article>`).join('');
    }
    window.RS.observeReveal();
    window.RS.setLang(window.RS.lang);
    refreshDates();
  }

  filterWrap.addEventListener('click', e=>{
    const b = e.target.closest('.filter-btn'); if(!b) return;
    filterWrap.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    draw(b.dataset.cat);
  });

  draw('all');
}

// Re-localise any [data-date] element after a language switch
function refreshDates(){
  document.querySelectorAll('[data-date]').forEach(el=>{
    el.textContent = afmtDate(el.getAttribute('data-date'), window.RS.lang);
  });
}

/* ---------------- READER (article.html) ---------------- */
function renderArticle(){
  const root = document.getElementById('article-root');
  if(!root) return;
  const id = new URLSearchParams(location.search).get('id');
  const a = (window.ARTICLES||[]).find(x=>x.id===id);

  if(!a){
    root.innerHTML = `<div class="container section" style="text-align:center">
      <h2 class="h2" data-vi="Không tìm thấy bài viết" data-en="Article not found">Article not found</h2>
      <a class="btn btn-primary" href="insights.html" style="margin-top:1rem" data-vi="Về trang bài viết" data-en="Back to Insights">Back to Insights</a></div>`;
    window.RS.setLang(window.RS.lang);
    return;
  }

  document.title = a.title.en + " — Roberto Structural";
  const idx = window.ARTICLES.indexOf(a);
  const prev = window.ARTICLES[idx+1];   // older
  const next = window.ARTICLES[idx-1];   // newer

  root.innerHTML = `
  <section class="page-hero"><div class="container">
    <p class="breadcrumb"><a href="index.html" data-vi="Trang chủ" data-en="Home">Home</a> / <a href="insights.html" data-vi="Bài viết" data-en="Insights">Insights</a> / <span>No. ${aesc(a.no)}</span></p>
    <p class="eyebrow" ${abi(a.category)}>${aesc(a.category.en)}</p>
    <h1 ${abi(a.title)}>${aesc(a.title.en)}</h1>
    <div class="art-meta">
      <span>Structural Notes · No. ${aesc(a.no)}</span>
      <span class="acard-dot">·</span>
      <span data-date="${a.date}">${afmtDate(a.date, window.RS.lang)}</span>
      <span class="acard-dot">·</span>
      <span>${a.readmin} min read</span>
    </div>
  </div></section>

  <section class="section" style="padding-top:clamp(2rem,5vw,3.5rem)"><div class="container">
    <article class="prose">
      ${a.sections.map(s=>`
        <h2 class="reveal" ${abi(s.heading)}>${aesc(s.heading.en)}</h2>
        ${s.body.map(p=>`<p class="reveal" ${abi(p)}>${araw(p)}</p>`).join('')}
        ${ s.figure ? `
        <figure class="art-fig reveal">
          <img src="${aesc(s.figure.src)}" alt="${aesc(s.heading.en)}" loading="lazy" onclick="rsArtZoom('${aesc(s.figure.src)}')"/>
          ${ s.figure.caption ? `<figcaption ${abi(s.figure.caption)}>${aesc(s.figure.caption.en)}</figcaption>` : '' }
        </figure>` : '' }
      `).join('')}
      ${ a.footnote ? `<p class="art-note reveal" ${abi(a.footnote)}>${aesc(a.footnote.en)}</p>` : '' }
    </article>

    <nav class="art-nav">
      ${ prev ? `<a class="art-nav-item" href="article.html?id=${prev.id}"><span data-vi="← Bài trước" data-en="← Previous">← Previous</span><b ${abi(prev.title)}>${aesc(prev.title.en)}</b></a>` : `<span></span>` }
      ${ next ? `<a class="art-nav-item art-nav-next" href="article.html?id=${next.id}"><span data-vi="Bài sau →" data-en="Next →">Next →</span><b ${abi(next.title)}>${aesc(next.title.en)}</b></a>` : `<span></span>` }
    </nav>

    <div style="text-align:center;margin-top:3rem">
      <a class="btn btn-ghost" href="insights.html" data-vi="Xem tất cả bài viết" data-en="View all articles">View all articles</a>
    </div>
  </div></section>`;

  window.RS.observeReveal();
  window.RS.setLang(window.RS.lang);
  refreshDates();
}

/* Simple image zoom for article figures (reuses the .lb lightbox styles) */
window.rsArtZoom = function(src){
  let el = document.getElementById('artZoom');
  if(!el){
    el = document.createElement('div');
    el.id = 'artZoom'; el.className = 'lb';
    el.innerHTML = `<button class="lb-close" onclick="rsArtZoomClose()" aria-label="Close">×</button><img id="artZoomImg" class="lb-img" alt="figure"/>`;
    document.body.appendChild(el);
    el.addEventListener('click', e=>{ if(e.target===el) rsArtZoomClose(); });
  }
  document.getElementById('artZoomImg').src = src;
  el.classList.add('open');
};
window.rsArtZoomClose = function(){ const e=document.getElementById('artZoom'); if(e) e.classList.remove('open'); };
document.addEventListener('keydown', e=>{ if(e.key==='Escape') window.rsArtZoomClose(); });

// Keep dates localised when the language is switched
document.addEventListener('click', e=>{ if(e.target.closest('.lang button')) setTimeout(refreshDates, 0); });

/* ---------------- HOME TEASER (index.html) ---------------- */
function renderHomeArticles(){
  const wrap = document.getElementById('home-articles');
  if(!wrap) return;
  const list = (window.ARTICLES||[]).slice(0,3);
  if(!list.length){ wrap.innerHTML=''; return; }
  wrap.innerHTML = list.map((a,i)=>`
    <article class="acard reveal" style="--i:${i}">
      <a class="acard-thumb" href="article.html?id=${a.id}" style="background-image:url('${aesc(a.cover)}')">
        <span class="acard-no">No. ${aesc(a.no)}</span>
      </a>
      <div class="acard-body">
        <div class="acard-meta">
          <span class="acard-cat" ${abi(a.category)}>${aesc(a.category.en)}</span>
          <span class="acard-dot">·</span>
          <span data-date="${a.date}">${afmtDate(a.date, window.RS.lang)}</span>
        </div>
        <h3><a href="article.html?id=${a.id}" ${abi(a.title)}>${aesc(a.title.en)}</a></h3>
        <p class="acard-ex" ${abi(a.excerpt)}>${aesc(a.excerpt.en)}</p>
        <a class="acard-more" href="article.html?id=${a.id}" data-vi="Đọc bài →" data-en="Read article →">Read article →</a>
      </div>
    </article>`).join('');
  window.RS.observeReveal();
  window.RS.setLang(window.RS.lang);
  refreshDates();
}

document.addEventListener('DOMContentLoaded', ()=>{ renderArticleIndex(); renderArticle(); renderHomeArticles(); });
