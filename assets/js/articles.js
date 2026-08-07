/* ============================================================
   Roberto Structural — Insights (articles) index + reader
   Depends on: articles-data.js (window.ARTICLES, window.ARTICLE_CATEGORIES),
               main.js (window.RS)
   ============================================================ */

function abi(o){ return `data-vi="${(o.vi||'').replace(/"/g,'&quot;')}" data-en="${(o.en||'').replace(/"/g,'&quot;')}"`; }
function aesc(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
// Body text may contain <b>/<i> on purpose → insert as-is.
function araw(o){ return (o && (o[window.RS.lang] ?? o.vi)) || ""; }

/* A figure's "src" is either one path (photo — same in both languages) or
   { vi, en } when the artwork itself carries text, e.g. a labelled diagram.
   In the second case emit data-src-vi/en and let RS.setLang swap the image
   together with the rest of the page. */
function afigSrc(f){
  const s = f.src;
  if(s && typeof s === 'object'){
    const cur = s[window.RS.lang] || s.vi || s.en;
    return `src="${aesc(cur)}" data-src-vi="${aesc(s.vi || s.en)}" data-src-en="${aesc(s.en || s.vi)}"`;
  }
  return `src="${aesc(s)}"`;
}
// Prefer the caption for alt text — it describes the figure; the section
// heading only says where it sits. `s` is absent for mid-section figure blocks.
function afigAlt(f, s){
  return ((f.caption && (f.caption.en || f.caption.vi)) || (s && s.heading.en) || '')
    .replace(/<[^>]+>/g, '');
}
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
        <a class="acard-thumb" href="${window.RS_URL.article(a.id)}" style="background-image:url('${aesc(a.cover)}')">
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
          <h3><a href="${window.RS_URL.article(a.id)}" ${abi(a.title)}>${aesc(a.title.en)}</a></h3>
          <p class="acard-ex" ${abi(a.excerpt)}>${aesc(a.excerpt.en)}</p>
          <a class="acard-more" href="${window.RS_URL.article(a.id)}" data-vi="Đọc bài →" data-en="Read article →">Read article →</a>
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

/* ---------------- Content blocks ----------------
   A section's "body" is an array of blocks:
     { vi, en }                              → paragraph (default)
     { type:"subhead", vi, en }              → sub-heading (h3)
     { type:"list", items:[{vi,en}, ...] }   → bulleted list
     { type:"table", head:[{vi,en}...],
                     rows:[[{vi,en}...]] }   → comparison table
   Text may contain <b> <i> <br> on purpose.
------------------------------------------------- */
function renderBlock(b){
  if(b.type === 'subhead'){
    return `<h3 class="prose-sub reveal" ${abi(b)}>${araw(b)}</h3>`;
  }
  if(b.type === 'list'){
    return `<ul class="prose-list reveal">${b.items.map(it=>`<li ${abi(it)}>${araw(it)}</li>`).join('')}</ul>`;
  }
  if(b.type === 'table'){
    return `<div class="table-wrap reveal"><table class="prose-table">
      <thead><tr>${b.head.map(h=>`<th ${abi(h)}>${araw(h)}</th>`).join('')}</tr></thead>
      <tbody>${b.rows.map(r=>`<tr>${r.map(c=>`<td ${abi(c)}>${araw(c)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>`;
  }
  // Verbatim block: software menu paths, command sequences. Whitespace matters,
  // so it goes in <pre>. Like every other block the text is inserted as HTML on
  // language switch, so a literal "<" must be written &lt; in the data file.
  if(b.type === 'code'){
    return `<pre class="prose-code reveal"><code ${abi(b)}>${araw(b)}</code></pre>`;
  }
  // Highlighted aside — the "Tip N" boxes and key-point callouts.
  if(b.type === 'tip'){
    return `<aside class="prose-tip reveal" ${abi(b)}>${araw(b)}</aside>`;
  }
  // Pre-issue checklist. Rendered as static ticked boxes, not real inputs:
  // it is something to read down, not a form to fill in.
  if(b.type === 'checklist'){
    return `<ul class="prose-check reveal">${b.items.map(it=>`<li ${abi(it)}>${araw(it)}</li>`).join('')}</ul>`;
  }
  // Figure placed mid-section. The section-level "figures" array still works
  // and always renders at the end; use this when a section has several figures
  // that each belong next to their own paragraph.
  if(b.type === 'figure'){
    return `<figure class="art-fig reveal">
      <img ${afigSrc(b)} alt="${aesc(afigAlt(b))}" loading="lazy" onclick="rsArtZoom(this.src)"/>
      ${ b.caption ? `<figcaption ${abi(b.caption)}>${araw(b.caption)}</figcaption>` : '' }
    </figure>`;
  }
  return `<p class="reveal" ${abi(b)}>${araw(b)}</p>`;
}

/* ---------------- READER (article.html) ---------------- */
function renderArticle(){
  const root = document.getElementById('article-root');
  if(!root) return;
  // Generated pages (article-<id>.html) declare RS_PAGE_ID; the legacy
  // article.html?id= entry point still works for links shared earlier.
  const id = window.RS_PAGE_ID || new URLSearchParams(location.search).get('id');
  const a = (window.ARTICLES||[]).find(x=>x.id===id);

  if(!a){
    root.innerHTML = `<div class="container section" style="text-align:center">
      <h2 class="h2" data-vi="Không tìm thấy bài viết" data-en="Article not found">Article not found</h2>
      <a class="btn btn-primary" href="${window.RS_URL.page('insights')}" style="margin-top:1rem" data-vi="Về trang bài viết" data-en="Back to Insights">Back to Insights</a></div>`;
    window.RS.setLang(window.RS.lang);
    return;
  }

  document.title = a.title.en + " — Roberto Structural";
  // See tools.js renderDetail for why the legacy ?id= entry point pins 'en'.
  window.rsSetCanonical(window.RS_URL.article(a.id, window.RS_PAGE_ID ? undefined : 'en'));
  const idx = window.ARTICLES.indexOf(a);
  const prev = window.ARTICLES[idx+1];   // older
  const next = window.ARTICLES[idx-1];   // newer

  root.innerHTML = `
  <section class="page-hero"><div class="container">
    <p class="breadcrumb"><a href="${window.RS_URL.page('index')}" data-vi="Trang chủ" data-en="Home">Home</a> / <a href="${window.RS_URL.page('insights')}" data-vi="Bài viết" data-en="Insights">Insights</a> / <span>No. ${aesc(a.no)}</span></p>
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
        ${s.body.map(b=>renderBlock(b)).join('')}
        ${ (s.figures || (s.figure ? [s.figure] : [])).map(f=>`
        <figure class="art-fig reveal">
          <img ${afigSrc(f)} alt="${aesc(afigAlt(f, s))}" loading="lazy" onclick="rsArtZoom(this.src)"/>
          ${ f.caption ? `<figcaption ${abi(f.caption)}>${aesc(f.caption.en)}</figcaption>` : '' }
        </figure>`).join('') }
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
      ${ prev ? `<a class="art-nav-item" href="${window.RS_URL.article(prev.id)}"><span data-vi="← Bài trước" data-en="← Previous">← Previous</span><b ${abi(prev.title)}>${aesc(prev.title.en)}</b></a>` : `<span></span>` }
      ${ next ? `<a class="art-nav-item art-nav-next" href="${window.RS_URL.article(next.id)}"><span data-vi="Bài sau →" data-en="Next →">Next →</span><b ${abi(next.title)}>${aesc(next.title.en)}</b></a>` : `<span></span>` }
    </nav>

    <div style="text-align:center;margin-top:3rem">
      <a class="btn btn-ghost" href="${window.RS_URL.page('insights')}" data-vi="Xem tất cả bài viết" data-en="View all articles">View all articles</a>
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

/* Article figures — open every figure of the article in the shared lightbox,
   starting at the one that was clicked, so the reader can page through them. */
window.rsArtZoom = function(src){
  if(!window.RSLightbox) return;
  const figs = [...document.querySelectorAll('.art-fig img')];
  const srcs = figs.map(f => f.getAttribute('src'));
  const caps = figs.map(f => {
    const c = f.parentElement.querySelector('figcaption');
    return c ? c.textContent.trim() : '';
  });
  const i = Math.max(0, srcs.indexOf(src));
  window.RSLightbox.open(srcs, i, caps);
};

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
      <a class="acard-thumb" href="${window.RS_URL.article(a.id)}" style="background-image:url('${aesc(a.cover)}')">
        <span class="acard-no">No. ${aesc(a.no)}</span>
      </a>
      <div class="acard-body">
        <div class="acard-meta">
          <span class="acard-cat" ${abi(a.category)}>${aesc(a.category.en)}</span>
          <span class="acard-dot">·</span>
          <span data-date="${a.date}">${afmtDate(a.date, window.RS.lang)}</span>
        </div>
        <h3><a href="${window.RS_URL.article(a.id)}" ${abi(a.title)}>${aesc(a.title.en)}</a></h3>
        <p class="acard-ex" ${abi(a.excerpt)}>${aesc(a.excerpt.en)}</p>
        <a class="acard-more" href="${window.RS_URL.article(a.id)}" data-vi="Đọc bài →" data-en="Read article →">Read article →</a>
      </div>
    </article>`).join('');
  window.RS.observeReveal();
  window.RS.setLang(window.RS.lang);
  refreshDates();
}

document.addEventListener('DOMContentLoaded', ()=>{ renderArticleIndex(); renderArticle(); renderHomeArticles(); });
