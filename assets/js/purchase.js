/* ============================================================
   Roberto Structural — purchase page (domestic VN payment)
   Depends on: tools-data.js (window.TOOLS), drawings-data.js (window.DRAWINGS),
               main.js (window.RS)

   FLOW
     1. Customer lands here from a paid tool OR a paid drawing set →
        purchase.html?id=<tool id | drawing id>. The id is looked up in
        both TOOLS and DRAWINGS (findProduct) — ids never collide between
        the two lists, so a plain search is enough.
     2. Page shows an auto-generated order reference, the amount and the
        bank / e-wallet details to transfer to.
     3. Customer submits the order form (name, e-mail, order ref).
     4. Roberto checks the bank app, then delivers by hand:
          · Tool     → licence key from the Licence Generator + download link.
          · Drawing  → the real GitHub Release link, kept OUTSIDE the repo in
                        _LicenseSystem/DrawingDownloadLinks.md (drawings have
                        no licence key — the link itself is what's withheld
                        until payment, same reasoning as products.py).

   Edit PAYMENT below with your real account details.
   ============================================================ */

const PAYMENT = {
  bank: {
    name: "Vietcombank (VCB)",
    account: "0451000210168",                 // <-- SỐ TÀI KHOẢN của bạn
    holder: "TRUONG VAN NAM",           // <-- TÊN CHỦ TÀI KHOẢN (không dấu)
    branch: "",                            // tuỳ chọn
    qr: "Resource/payment/vcb-qr.png.png"      // <-- ảnh QR VietQR (tuỳ chọn)
  },
  momo: {
    phone: "0977200787",                   // <-- SỐ MOMO của bạn
    holder: "TRUONG VAN NAM",
    qr: "Resource/payment/momo-qr.png"     // <-- ảnh QR Momo (tuỳ chọn)
  },
  // Formspree endpoint that receives the ORDER — form "Orders".
  //
  // ⚠️ MUST STAY A DIFFERENT FORM FROM `RS_FORM_ENDPOINT` IN main.js.
  //    The download e-mail gate is unauthenticated and fires far more often than
  //    orders do. Sharing one form would let free downloads eat the monthly quota
  //    that paid orders depend on — and an order that cannot be delivered is lost
  //    money. Never point these two at the same endpoint again.
  orderEndpoint: "https://formspree.io/f/xjgnqlqd",
  supportEmail: "robertostructural@gmail.com"
};

function pesc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function pbi(o) { return `data-vi="${(o.vi || '').replace(/"/g, '&quot;')}" data-en="${(o.en || '').replace(/"/g, '&quot;')}"`; }
function pvnd(n) { return Number(n).toLocaleString('vi-VN') + ' ₫'; }

// Short, human-readable order reference: RBT + yymmdd + 3 random chars.
function makeOrderRef() {
  const d = new Date();
  const p = n => String(n).padStart(2, '0');
  const stamp = `${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}`;
  const rnd = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `RBT${stamp}${rnd}`;
}

// Looks up an id in both catalogs. Ids never collide (tools use plain slugs
// like "deflection-check", drawings use "residential-*" / "tuduong-*"), so a
// simple sequential search is enough — no "type=" query param needed.
function findProduct(id) {
  const t = (window.TOOLS || []).find(x => x.id === id);
  if (t) return { kind: 'tool', item: t };
  const d = (window.DRAWINGS || []).find(x => x.id === id);
  if (d) return { kind: 'drawing', item: d };
  return null;
}

function renderPurchase() {
  const root = document.getElementById('purchase-root');
  if (!root) return;

  const id = new URLSearchParams(location.search).get('id');
  const found = findProduct(id);

  if (!found) {
    root.innerHTML = `<section class="section"><div class="container" style="text-align:center">
      <h2 class="h2" data-vi="Không tìm thấy sản phẩm" data-en="Product not found">Product not found</h2>
      <a class="btn btn-primary" href="${window.RS_URL.page('tools')}" style="margin-top:1rem" data-vi="Về danh mục phần mềm" data-en="Back to software">Back to software</a>
    </div></section>`;
    window.RS.setLang(window.RS.lang);
    return;
  }

  const { kind, item: t } = found;
  const isDraw = kind === 'drawing';

  const ref = makeOrderRef();
  const amount = Number(t.priceVnd || 0);
  const transferNote = ref;                       // keep the note short & unique
  const pname = t.name[window.RS.lang] || t.name.en;
  document.title = `${pname} — ${window.RS.lang === 'vi' ? 'Thanh toán' : 'Purchase'} — Roberto Structural`;

  // Everything that differs between a tool purchase and a drawing purchase
  // is decided once here, so the markup below reads the same for both.
  const catalogUrl = isDraw ? window.RS_URL.page('drawings') : window.RS_URL.page('tools');
  const catalogCrumb = isDraw
    ? `<a href="${catalogUrl}" data-vi="Bản vẽ" data-en="Drawings">Drawings</a>`
    : `<a href="${catalogUrl}" data-vi="Phần mềm" data-en="Software">Software</a> / <a href="${window.RS_URL.tool(t.id)}" ${pbi(t.name)}>${pesc(t.name.en)}</a>`;
  const eyebrow = isDraw
    ? { vi: 'Mua bản vẽ', en: 'Buy drawing' }
    : { vi: 'Mua bản quyền', en: 'Buy licence' };
  const introP = isDraw
    ? { vi: 'Chuyển khoản nội địa, nhận link tải bản vẽ qua email trong vòng vài giờ làm việc.', en: 'Domestic bank transfer — your drawing download link is e-mailed within a few working hours.' }
    : { vi: 'Chuyển khoản nội địa, nhận mã bản quyền qua email trong vòng vài giờ làm việc.', en: 'Domestic bank transfer — your licence key is e-mailed within a few working hours.' };
  const step2Body = isDraw
    ? { vi: 'Link tải bản vẽ sẽ gửi tới email bạn nhập dưới đây — hãy nhập chính xác.', en: 'Your download link is sent to the e-mail below — please enter it correctly.' }
    : { vi: 'Mã bản quyền sẽ gắn với email bạn nhập dưới đây — hãy nhập chính xác.', en: 'Your licence key is bound to the e-mail below — please enter it correctly.' };
  const step2Note = isDraw
    ? { vi: 'Sau khi đối soát, chúng tôi gửi link tải bản vẽ (DWG) qua email.', en: 'Once the payment is matched we e-mail your drawing (DWG) download link.' }
    : { vi: 'Sau khi đối soát, chúng tôi gửi mã bản quyền và link tải qua email.', en: 'Once the payment is matched we e-mail your licence key and download link.' };
  const step3 = isDraw
    ? {
        h: { vi: 'Nhận file bản vẽ', en: 'Receive your files' },
        p: { vi: 'File DWG được gửi qua email đính kèm hoặc link tải. Dùng ngay trong AutoCAD / ZWCAD, không cần kích hoạt.', en: 'DWG files arrive as an e-mail attachment or download link. Open directly in AutoCAD / ZWCAD — no activation needed.' }
      }
    : {
        h: { vi: 'Kích hoạt phần mềm', en: 'Activate the software' },
        p: { vi: 'Mở phần mềm lần đầu, nhập email và mã bản quyền đã nhận. Kích hoạt offline, chỉ làm một lần, dùng được trên máy khác khi bạn đổi máy.', en: 'On first launch, enter your e-mail and licence key. Activation is offline, one-time, and still works if you change computer.' }
      };
  const licenceRow = isDraw
    ? { vi: 'Sử dụng', en: 'Usage' }
    : { vi: 'Bản quyền', en: 'Licence' };
  const licenceVal = isDraw ? { vi: 'Không giới hạn dự án', en: 'Unlimited projects' } : { vi: 'Vĩnh viễn', en: 'Perpetual' };
  const rightFeatures = isDraw
    ? [
        { vi: 'Trọn bộ file DWG gốc, chỉnh sửa tự do', en: 'Full editable native DWG files' },
        { vi: 'Giao file qua email sau khi xác nhận thanh toán', en: 'Delivered by e-mail once payment is confirmed' },
        { vi: 'Dùng được cho nhiều dự án', en: 'Usable across multiple projects' },
        { vi: 'Hỗ trợ qua email', en: 'E-mail support' }
      ]
    : [
        { vi: 'Bản quyền vĩnh viễn, không thuê bao', en: 'Perpetual licence, no subscription' },
        { vi: 'Kích hoạt offline, dùng được khi đổi máy', en: 'Offline activation, works after changing PC' },
        { vi: 'Cập nhật nhỏ miễn phí cùng phiên bản', en: 'Free minor updates within the version' },
        { vi: 'Hỗ trợ qua email', en: 'E-mail support' }
      ];
  const specRows = isDraw
    ? `<tr><td data-vi="Định dạng" data-en="Format">Format</td><td>${pesc(t.format)}</td></tr>
       <tr><td data-vi="Quy mô" data-en="Scope">Scope</td><td ${pbi(t.count)}>${pesc(t.count.en)}</td></tr>
       <tr><td ${pbi(licenceRow)}>${pesc(licenceRow.en)}</td><td ${pbi(licenceVal)}>${pesc(licenceVal.en)}</td></tr>`
    : `<tr><td data-vi="Phiên bản" data-en="Version">Version</td><td>${pesc(t.version)}</td></tr>
       <tr><td data-vi="Dung lượng" data-en="Size">Size</td><td>${pesc(t.size)}</td></tr>
       <tr><td data-vi="Hệ điều hành" data-en="OS">OS</td><td>${pesc(t.os)}</td></tr>
       <tr><td ${pbi(licenceRow)}>${pesc(licenceRow.en)}</td><td ${pbi(licenceVal)}>${pesc(licenceVal.en)}</td></tr>`;

  root.innerHTML = `
  <section class="page-hero"><div class="container">
    <p class="breadcrumb"><a href="${window.RS_URL.page('index')}" data-vi="Trang chủ" data-en="Home">Home</a> / ${catalogCrumb} / <span data-vi="Thanh toán" data-en="Purchase">Purchase</span></p>
    <p class="eyebrow" ${pbi(eyebrow)}>${pesc(eyebrow.en)}</p>
    <h1 ${pbi(t.name)}>${pesc(t.name.en)}</h1>
    <p ${pbi(introP)}>${pesc(introP.en)}</p>
  </div></section>

  <section class="section" style="padding-top:clamp(2rem,5vw,3rem)"><div class="container">
    <div class="buy-grid">

      <!-- ================= LEFT: how to pay ================= -->
      <div>
        <ol class="steps">
          <li class="step reveal">
            <div class="step-no">1</div>
            <div class="step-body">
              <h3 data-vi="Chuyển khoản đúng số tiền và nội dung" data-en="Transfer the exact amount and note">Transfer the exact amount and note</h3>
              <div class="pay-summary">
                <div><span data-vi="Số tiền" data-en="Amount">Amount</span><b>${pvnd(amount)}</b></div>
                <div><span data-vi="Nội dung chuyển khoản" data-en="Transfer note">Transfer note</span><b class="ref">${pesc(transferNote)}</b></div>
              </div>
              <p class="warn" data-vi="⚠ Bắt buộc ghi đúng nội dung chuyển khoản để đối soát đơn hàng của bạn." data-en="⚠ You must include this exact note so we can match your payment.">⚠ You must include this exact note so we can match your payment.</p>

              <div class="pay-methods">
                <div class="pay-card">
                  <div class="pay-head">
                    <span class="pay-tag">Bank</span>
                    <b>${pesc(PAYMENT.bank.name)}</b>
                  </div>
                  <table class="pay-table">
                    <tr><td data-vi="Số tài khoản" data-en="Account no.">Account no.</td><td><b id="accNo">${pesc(PAYMENT.bank.account)}</b> <button class="copy-mini" onclick="rsCopy('${pesc(PAYMENT.bank.account)}')" title="Copy">⧉</button></td></tr>
                    <tr><td data-vi="Chủ tài khoản" data-en="Account name">Account name</td><td>${pesc(PAYMENT.bank.holder)}</td></tr>
                    ${PAYMENT.bank.branch ? `<tr><td data-vi="Chi nhánh" data-en="Branch">Branch</td><td>${pesc(PAYMENT.bank.branch)}</td></tr>` : ''}
                  </table>
                  <img class="pay-qr" src="${pesc(PAYMENT.bank.qr)}" alt="Bank QR" onerror="this.style.display='none'"/>
                </div>

                <div class="pay-card">
                  <div class="pay-head">
                    <span class="pay-tag momo">Momo</span>
                    <b data-vi="Ví điện tử" data-en="E-wallet">E-wallet</b>
                  </div>
                  <table class="pay-table">
                    <tr><td data-vi="Số điện thoại" data-en="Phone">Phone</td><td><b>${pesc(PAYMENT.momo.phone)}</b> <button class="copy-mini" onclick="rsCopy('${pesc(PAYMENT.momo.phone)}')" title="Copy">⧉</button></td></tr>
                    <tr><td data-vi="Chủ ví" data-en="Account name">Account name</td><td>${pesc(PAYMENT.momo.holder)}</td></tr>
                  </table>
                  <img class="pay-qr" src="${pesc(PAYMENT.momo.qr)}" alt="Momo QR" onerror="this.style.display='none'"/>
                </div>
              </div>
            </div>
          </li>

          <li class="step reveal">
            <div class="step-no">2</div>
            <div class="step-body">
              <h3 data-vi="Điền thông tin để nhận bản quyền" data-en="Send us your details">Send us your details</h3>
              <p class="muted" ${pbi(step2Body)}>${pesc(step2Body.en)}</p>
              <div id="orderForm">
                <div class="fld"><label data-vi="Họ tên" data-en="Full name">Full name</label><input id="oName" type="text" placeholder="Nguyễn Văn A"/></div>
                <div class="fld"><label data-vi="Email nhận bản quyền" data-en="E-mail for the licence">E-mail for the licence</label><input id="oEmail" type="email" placeholder="ban@congty.com"/></div>
                <div class="fld"><label data-vi="Mã đơn (nội dung đã chuyển khoản)" data-en="Order reference (your transfer note)">Order reference (your transfer note)</label><input id="oRef" type="text" value="${pesc(transferNote)}"/></div>
                <div class="fld"><label data-vi="Ghi chú (tuỳ chọn)" data-en="Note (optional)">Note (optional)</label><input id="oNote" type="text" placeholder=""/></div>
                <button class="btn btn-primary btn-block" onclick="rsSubmitOrder('${pesc(t.id)}')" data-vi="Gửi thông tin đơn hàng" data-en="Submit order">Submit order</button>
                <p class="muted small" ${pbi(step2Note)}>${pesc(step2Note.en)}</p>
              </div>
              <div id="orderThanks" class="hidden order-thanks">
                <h3 data-vi="Đã nhận đơn hàng!" data-en="Order received!">Order received!</h3>
                <p data-vi="Cảm ơn bạn. Chúng tôi sẽ kiểm tra giao dịch và gửi mã bản quyền qua email trong vòng vài giờ làm việc." data-en="Thank you. We will verify the transfer and e-mail your licence key within a few working hours.">Thank you.</p>
                <p class="muted small">${pesc(PAYMENT.supportEmail)}</p>
              </div>
              <!-- Shown ONLY when the order could not be delivered. Never claim success here. -->
              <div id="orderError" class="hidden order-error" role="alert" aria-live="assertive">
                <h3 data-vi="⚠ Chưa gửi được đơn hàng" data-en="⚠ We could not submit your order">⚠ We could not submit your order</h3>
                <p data-vi="Đơn của bạn <b>chưa</b> tới chúng tôi. Nếu bạn đã chuyển khoản, tiền vẫn an toàn — chỉ cần gửi thông tin đơn cho chúng tôi bằng một trong hai cách dưới đây, mã bản quyền sẽ được cấp bình thường." data-en="Your order has <b>not</b> reached us. If you already transferred, your money is safe — just send us the order details one of the two ways below and your licence will be issued as normal.">Your order has not reached us.</p>
                <a id="oMailto" class="btn btn-primary btn-block" href="#" data-vi="Gửi đơn qua email (đã điền sẵn)" data-en="Send the order by e-mail (pre-filled)">Send the order by e-mail (pre-filled)</a>
                <button class="btn btn-ghost btn-block" style="margin-top:.5rem" onclick="rsCopyOrder()" data-vi="Sao chép thông tin đơn" data-en="Copy the order details">Copy the order details</button>
                <button class="btn btn-ghost btn-block" style="margin-top:.5rem" onclick="rsRetryOrder('${pesc(t.id)}')" data-vi="Thử gửi lại" data-en="Try again">Try again</button>
                <p class="muted small" style="margin-top:.75rem" data-vi="Hoặc nhắn tin trang Facebook Roberto Structural kèm mã đơn." data-en="Or message the Roberto Structural Facebook page with your order reference.">Or message us on Facebook with your order reference.</p>
              </div>
            </div>
          </li>

          <li class="step reveal">
            <div class="step-no">3</div>
            <div class="step-body">
              <h3 ${pbi(step3.h)}>${pesc(step3.h.en)}</h3>
              <p class="muted" ${pbi(step3.p)}>${pesc(step3.p.en)}</p>
            </div>
          </li>
        </ol>
      </div>

      <!-- ================= RIGHT: order summary ================= -->
      <aside>
        <div class="buybox">
          <div class="order-thumb" style="background-image:url('${pesc(t.thumb)}')"></div>
          <h3 style="margin-top:1rem;font-size:1.05rem" ${pbi(t.name)}>${pesc(t.name.en)}</h3>
          <table class="spec">
            ${specRows}
          </table>
          <div class="order-total">
            <span data-vi="Tổng cộng" data-en="Total">Total</span>
            <b>${pvnd(amount)}</b>
          </div>
          <ul class="feat-list" style="margin-top:1rem">
            ${rightFeatures.map(f => `<li ${pbi(f)}>${pesc(f.en)}</li>`).join('')}
          </ul>
          <p class="muted small" style="margin-top:1rem" data-vi="Cần xuất hoá đơn hoặc mua nhiều bản? Liên hệ email." data-en="Need an invoice or a volume licence? Contact us by e-mail.">Need an invoice or a volume licence? Contact us.</p>
          <a class="btn btn-ghost btn-block" href="mailto:${pesc(PAYMENT.supportEmail)}" style="margin-top:.5rem">${pesc(PAYMENT.supportEmail)}</a>
        </div>
      </aside>

    </div>
  </div></section>`;

  window.RS.observeReveal();
  window.RS.setLang(window.RS.lang);
}

window.rsCopy = function (text) {
  const done = () => { /* silent */ };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => { });
  } else {
    const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); } catch (e) { }
    document.body.removeChild(t);
  }
};

/* ------------------------------------------------------------------
   Order submission.

   ⚠️ MONEY PATH — read before changing.
   The customer has usually ALREADY transferred by the time this runs, so a
   failure we hide is a paid order that silently never reaches Roberto.
   Two failure modes must both be caught:
     · network down          → fetch() rejects  → catch
     · quota exceeded / 4xx  → fetch() RESOLVES → must inspect res.ok
   The second one is the dangerous one: Formspree answers HTTP 4xx when the
   monthly quota is spent, and `await fetch()` treats that as a normal result.
   Never show the thank-you panel unless the POST truly succeeded.
   ------------------------------------------------------------------ */

// Keeps the last attempt so the fallback panel can re-send / copy / mailto it.
let RS_lastOrder = null;

function rsOrderText(o) {
  return [
    'ĐƠN HÀNG / ORDER',
    'Mã đơn / Order ref : ' + o.order_ref,
    'Sản phẩm / Product : ' + o.product + ' (' + o.product_code + ')',
    'Số tiền / Amount   : ' + o.amount_vnd,
    'Họ tên / Name      : ' + o.customer_name,
    'Email              : ' + o.email,
    'Ghi chú / Note     : ' + (o.note || '-'),
    'Thời điểm / Time   : ' + o.ordered_at
  ].join('\n');
}

function rsShowOrderFallback(o) {
  RS_lastOrder = o;
  const box = document.getElementById('orderError');
  const mail = document.getElementById('oMailto');
  if (mail) {
    mail.href = 'mailto:' + PAYMENT.supportEmail
      + '?subject=' + encodeURIComponent('ĐƠN HÀNG ' + o.order_ref + ' — ' + o.product)
      + '&body=' + encodeURIComponent(rsOrderText(o));
  }
  if (box) {
    box.classList.remove('hidden');
    // The panel renders below the submit button, so on a small screen it can
    // appear off-view — the customer would read "nothing happened" and keep
    // clicking, burning a quota slot per click. Bring it to them.
    if (box.scrollIntoView) box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  window.RS.setLang(window.RS.lang);
}

window.rsCopyOrder = function () { if (RS_lastOrder) window.rsCopy(rsOrderText(RS_lastOrder)); };
window.rsRetryOrder = function (toolId) {
  const box = document.getElementById('orderError');
  if (box) box.classList.add('hidden');
  window.rsSubmitOrder(toolId);
};

window.rsSubmitOrder = async function (toolId) {
  const name = (document.getElementById('oName').value || '').trim();
  const email = (document.getElementById('oEmail').value || '').trim();
  const ref = (document.getElementById('oRef').value || '').trim();
  const note = (document.getElementById('oNote').value || '').trim();
  const vi = window.RS.lang === 'vi';

  if (!name) { alert(vi ? 'Vui lòng nhập họ tên.' : 'Please enter your name.'); return; }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { alert(vi ? 'Vui lòng nhập email hợp lệ.' : 'Please enter a valid e-mail.'); return; }

  const found = findProduct(toolId);
  const t = found ? found.item : {};
  // Drawings have no licence "productCode" — fall back to the id itself so
  // Roberto can still tell which GitHub Release link to send (see
  // _LicenseSystem/DrawingDownloadLinks.md).
  const code = t.productCode || (found && found.kind === 'drawing' ? toolId : '');
  const when = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false });

  const payload = {
    _subject: `ĐƠN HÀNG ${ref} — ${t.name ? t.name.en : toolId}`,
    type: 'ORDER',
    customer_name: name,
    email,
    product: t.name ? t.name.en : toolId,
    product_code: code,
    amount_vnd: t.priceVnd || '',
    order_ref: ref,
    note,
    ordered_at: when + ' (GMT+7)',
    page: location.href
  };

  // Block double submits — every retry burns a slot of the monthly quota.
  const btn = document.querySelector('#orderForm .btn-primary');
  const btnHtml = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.innerHTML = vi ? 'Đang gửi…' : 'Sending…'; }

  let delivered = false;
  if (PAYMENT.orderEndpoint) {
    try {
      const res = await fetch(PAYMENT.orderEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      delivered = res.ok;               // 4xx (quota spent, form disabled) is NOT success
      if (!res.ok) console.warn('[RS] Order POST rejected:', res.status, res.statusText);
    } catch (err) {
      console.warn('[RS] Order POST failed:', err);
    }
  }

  if (btn) { btn.disabled = false; btn.innerHTML = btnHtml; }

  if (!delivered) { rsShowOrderFallback(payload); return; }

  document.getElementById('orderForm').classList.add('hidden');
  document.getElementById('orderError').classList.add('hidden');
  document.getElementById('orderThanks').classList.remove('hidden');
  window.RS.setLang(window.RS.lang);
};

document.addEventListener('DOMContentLoaded', renderPurchase);
