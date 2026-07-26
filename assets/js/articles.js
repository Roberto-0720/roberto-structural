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

      <div class="art-share reveal">
        <span data-vi="Chia sẻ bài viết" data-en="Share this article">Share this article</span>
        <div class="art-share-btns">
          <a href="#" onclick="return rsShare('facebook')" aria-label="Share on Facebook" title="Facebook">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z"/></svg>
          </a>
          <a href="#" onclick="return rsShare('linkedin')" aria-label="Share on LinkedIn" title="LinkedIn">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
          </a>
          <a href="#" onclick="return rsShare('copy')" aria-label="Copy link" title="Copy link">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5"/></svg>
          </a>
        </div>
      </div>
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

/* Share the current article */
window.rsShare = function(where){
  const url = location.href;
  const title = document.title;
  if(where === 'facebook'){
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank', 'width=620,height=520');
  } else if(where === 'linkedin'){
    window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url), '_blank', 'width=620,height=560');
  } else if(where === 'copy'){
    const done = ()=>alert(window.RS.lang==='vi' ? 'Đã sao chép link bài viết.' : 'Article link copied.');
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(url).then(done).catch(()=>{});
    } else {
      const t=document.createElement('textarea'); t.value=url; document.body.appendChild(t); t.select();
      try{ document.execCommand('copy'); done(); }catch(e){}
      document.body.removeChild(t);
    }
  }
  return false;
};

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
