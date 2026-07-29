/* ============================================================
   Roberto Structural — purchase page (domestic VN payment)
   Depends on: tools-data.js (window.TOOLS), main.js (window.RS)

   FLOW
     1. Customer lands here from a paid tool  →  purchase.html?id=<tool id>
     2. Page shows an auto-generated order reference, the amount and the
        bank / e-wallet details to transfer to.
     3. Customer submits the order form (name, e-mail, order ref).
     4. Roberto checks the bank app, issues the key with the Licence
        Generator and e-mails the key + download link.

   Edit PAYMENT below with your real account details.
   ============================================================ */

const PAYMENT = {
  bank: {
    name: "Vietcombank (VCB)",
    account: "0451000210168",                 // <-- SỐ TÀI KHOẢN của bạn
    holder: "TRUONG VAN NAM",           // <-- TÊN CHỦ TÀI KHOẢN (không dấu)
    branch: "",                            // tuỳ chọn
    qr: "Resource/payment/vcb-qr.png"      // <-- ảnh QR VietQR (tuỳ chọn)
  },
  momo: {
    phone: "0977200787",                   // <-- SỐ MOMO của bạn
    holder: "TRUONG VAN NAM",
    qr: "Resource/payment/momo-qr.png"     // <-- ảnh QR Momo (tuỳ chọn)
  },
  // Formspree endpoint that receives the order (same account as downloads).
  orderEndpoint: "https://formspree.io/f/xbdnzejn",
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

function renderPurchase() {
  const root = document.getElementById('purchase-root');
  if (!root) return;

  const id = new URLSearchParams(location.search).get('id');
  const t = (window.TOOLS || []).find(x => x.id === id);

  if (!t) {
    root.innerHTML = `<section class="section"><div class="container" style="text-align:center">
      <h2 class="h2" data-vi="Không tìm thấy sản phẩm" data-en="Product not found">Product not found</h2>
      <a class="btn btn-primary" href="tools.html" style="margin-top:1rem" data-vi="Về danh mục phần mềm" data-en="Back to software">Back to software</a>
    </div></section>`;
    window.RS.setLang(window.RS.lang);
    return;
  }

  const ref = makeOrderRef();
  const amount = Number(t.priceVnd || 0);
  const transferNote = ref;                       // keep the note short & unique
  document.title = `${t.name.en} — ${window.RS.lang === 'vi' ? 'Thanh toán' : 'Purchase'} — Roberto Structural`;

  root.innerHTML = `
  <section class="page-hero"><div class="container">
    <p class="breadcrumb"><a href="index.html" data-vi="Trang chủ" data-en="Home">Home</a> / <a href="tools.html" data-vi="Phần mềm" data-en="Software">Software</a> / <a href="tool.html?id=${pesc(t.id)}" ${pbi(t.name)}>${pesc(t.name.en)}</a> / <span data-vi="Thanh toán" data-en="Purchase">Purchase</span></p>
    <p class="eyebrow" data-vi="Mua bản quyền" data-en="Buy licence">Buy licence</p>
    <h1 ${pbi(t.name)}>${pesc(t.name.en)}</h1>
    <p data-vi="Chuyển khoản nội địa, nhận mã bản quyền qua email trong vòng vài giờ làm việc." data-en="Domestic bank transfer — your licence key is e-mailed within a few working hours.">Domestic bank transfer — your licence key is e-mailed within a few working hours.</p>
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
              <p class="muted" data-vi="Mã bản quyền sẽ gắn với email bạn nhập dưới đây — hãy nhập chính xác." data-en="Your licence key is bound to the e-mail below — please enter it correctly.">Your licence key is bound to the e-mail below — please enter it correctly.</p>
              <div id="orderForm">
                <div class="fld"><label data-vi="Họ tên" data-en="Full name">Full name</label><input id="oName" type="text" placeholder="Nguyễn Văn A"/></div>
                <div class="fld"><label data-vi="Email nhận bản quyền" data-en="E-mail for the licence">E-mail for the licence</label><input id="oEmail" type="email" placeholder="ban@congty.com"/></div>
                <div class="fld"><label data-vi="Mã đơn (nội dung đã chuyển khoản)" data-en="Order reference (your transfer note)">Order reference (your transfer note)</label><input id="oRef" type="text" value="${pesc(transferNote)}"/></div>
                <div class="fld"><label data-vi="Ghi chú (tuỳ chọn)" data-en="Note (optional)">Note (optional)</label><input id="oNote" type="text" placeholder=""/></div>
                <button class="btn btn-primary btn-block" onclick="rsSubmitOrder('${pesc(t.id)}')" data-vi="Gửi thông tin đơn hàng" data-en="Submit order">Submit order</button>
                <p class="muted small" data-vi="Sau khi đối soát, chúng tôi gửi mã bản quyền và link tải qua email." data-en="Once the payment is matched we e-mail your licence key and download link.">Once the payment is matched we e-mail your licence key and download link.</p>
              </div>
              <div id="orderThanks" class="hidden order-thanks">
                <h3 data-vi="Đã nhận đơn hàng!" data-en="Order received!">Order received!</h3>
                <p data-vi="Cảm ơn bạn. Chúng tôi sẽ kiểm tra giao dịch và gửi mã bản quyền qua email trong vòng vài giờ làm việc." data-en="Thank you. We will verify the transfer and e-mail your licence key within a few working hours.">Thank you.</p>
                <p class="muted small">${pesc(PAYMENT.supportEmail)}</p>
              </div>
            </div>
          </li>

          <li class="step reveal">
            <div class="step-no">3</div>
            <div class="step-body">
              <h3 data-vi="Kích hoạt phần mềm" data-en="Activate the software">Activate the software</h3>
              <p class="muted" data-vi="Mở phần mềm lần đầu, nhập email và mã bản quyền đã nhận. Kích hoạt offline, chỉ làm một lần, dùng được trên máy khác khi bạn đổi máy." data-en="On first launch, enter your e-mail and licence key. Activation is offline, one-time, and still works if you change computer.">On first launch, enter your e-mail and licence key. Activation is offline and one-time.</p>
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
            <tr><td data-vi="Phiên bản" data-en="Version">Version</td><td>${pesc(t.version)}</td></tr>
            <tr><td data-vi="Dung lượng" data-en="Size">Size</td><td>${pesc(t.size)}</td></tr>
            <tr><td data-vi="Hệ điều hành" data-en="OS">OS</td><td>${pesc(t.os)}</td></tr>
            <tr><td data-vi="Bản quyền" data-en="Licence">Licence</td><td data-vi="Vĩnh viễn" data-en="Perpetual">Perpetual</td></tr>
          </table>
          <div class="order-total">
            <span data-vi="Tổng cộng" data-en="Total">Total</span>
            <b>${pvnd(amount)}</b>
          </div>
          <ul class="feat-list" style="margin-top:1rem">
            <li data-vi="Bản quyền vĩnh viễn, không thuê bao" data-en="Perpetual licence, no subscription">Perpetual licence, no subscription</li>
            <li data-vi="Kích hoạt offline, dùng được khi đổi máy" data-en="Offline activation, works after changing PC">Offline activation, works after changing PC</li>
            <li data-vi="Cập nhật nhỏ miễn phí cùng phiên bản" data-en="Free minor updates within the version">Free minor updates within the version</li>
            <li data-vi="Hỗ trợ qua email" data-en="E-mail support">E-mail support</li>
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

window.rsSubmitOrder = async function (toolId) {
  const name = (document.getElementById('oName').value || '').trim();
  const email = (document.getElementById('oEmail').value || '').trim();
  const ref = (document.getElementById('oRef').value || '').trim();
  const note = (document.getElementById('oNote').value || '').trim();
  const vi = window.RS.lang === 'vi';

  if (!name) { alert(vi ? 'Vui lòng nhập họ tên.' : 'Please enter your name.'); return; }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { alert(vi ? 'Vui lòng nhập email hợp lệ.' : 'Please enter a valid e-mail.'); return; }

  const t = (window.TOOLS || []).find(x => x.id === toolId) || {};
  const when = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false });

  if (PAYMENT.orderEndpoint) {
    try {
      await fetch(PAYMENT.orderEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `ĐƠN HÀNG ${ref} — ${t.name ? t.name.en : toolId}`,
          type: 'ORDER',
          customer_name: name,
          email,
          product: t.name ? t.name.en : toolId,
          product_code: t.productCode || '',
          amount_vnd: t.priceVnd || '',
          order_ref: ref,
          note,
          ordered_at: when + ' (GMT+7)',
          page: location.href
        })
      });
    } catch (err) { /* still show thanks so the customer is not blocked */ }
  }

  document.getElementById('orderForm').classList.add('hidden');
  document.getElementById('orderThanks').classList.remove('hidden');
  window.RS.setLang(window.RS.lang);
};

document.addEventListener('DOMContentLoaded', renderPurchase);
