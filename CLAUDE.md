# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Hướng dẫn ngữ cảnh cho Claude (Claude Code / Antigravity / IDE bất kỳ) khi làm việc
với repo này. Đọc file này trước khi sửa bất cứ thứ gì.

> **Gốc repo Git = thư mục `WebsiteRobertoStructural/`** (nơi chứa file này), không phải
> thư mục cha `20260623_WebsiteRobertoStructural/`. Mọi đường dẫn dưới đây tính từ gốc repo.

---

## 1. Dự án là gì

Website song ngữ Việt–Anh của **Roberto Structural** — kỹ sư kết cấu công trình
công nghiệp (lọc hoá dầu, nhiệt điện, điện khí, điện rác). Ba trụ cột:

| Trụ cột | Trang | Mục đích |
|---|---|---|
| **Software** | `tools.html`, `tool.html`, `purchase.html` | Bán phần mềm thiết kế (12 tool đã phát hành) |
| **Drawings** | `drawings.html` | Thư viện bản vẽ CAD |
| **Insights** | `insights.html`, `article.html` | Bài viết kỹ thuật, xây uy tín chuyên môn |

- **Live:** https://roberto-0720.github.io/roberto-structural/
- **Repo:** `Roberto-0720/roberto-structural` (GitHub Pages, nhánh `main`, thư mục gốc)
- **Slogan:** *Engineering Strength Into Every Structure*

---

## 2. Công nghệ & nguyên tắc

- **Static thuần**: HTML + CSS + JS. **Không** framework, **không** npm, không dependency.
  Mở file `.html` bằng trình duyệt là chạy.
- Ngoại lệ duy nhất: một script sinh trang chi tiết tĩnh
  (`node scripts/build-pages.mjs`, chỉ dùng thư viện chuẩn của Node). Nó **không** phải build
  step của website — trang vẫn chạy bình thường nếu không chạy nó; chỉ là trang mới chưa có
  file riêng. Xem mục 11.A.
- **Ngôn ngữ mặc định: EN.** Mọi chuỗi hiển thị dùng `data-vi` / `data-en`,
  `main.js` đổi qua lại và nhớ lựa chọn trong `localStorage` (`rs-lang`).
- **Đơn vị kỹ thuật: SI** (kN, m, mm) — nhất quán với các tool Python.
- **Ghi chú/comment trong code: tiếng Anh.** Tài liệu hướng dẫn cho người dùng: tiếng Việt.
- **Mobile-first**, mọi section có scroll-reveal, nút có hover animation.

---

## 3. Cấu trúc

```
├── index.html            Trang chủ
├── tools.html            Danh mục phần mềm (lọc theo 4 nhóm)
├── tool.html             Chi tiết 1 phần mềm — đọc ?id=
├── purchase.html         Trang thanh toán — đọc ?id=
├── drawings.html         Thư viện bản vẽ
├── insights.html         Danh mục bài viết
├── article.html          Trang đọc bài — đọc ?id=
├── 404.html              Trang lỗi (tự tìm gốc site)
├── favicon.svg           Monogram RS
├── robots.txt
├── sitemap.xml           ⚙ SINH TỰ ĐỘNG — đừng sửa tay
├── tool-<id>.html        ⚙ SINH TỰ ĐỘNG (19 file) — trang chi tiết tool
├── article-<id>.html     ⚙ SINH TỰ ĐỘNG — trang đọc bài
├── scripts/
│   └── build-pages.mjs   ★ Sinh 3 nhóm file ⚙ ở trên. Chạy sau khi sửa file data
│
├── assets/
│   ├── css/style.css     ★ TOÀN BỘ style. Đổi màu ở :root
│   └── js/
│       ├── main.js       ★ Header/footer dùng chung, đổi VI/EN, menu mobile,
│       │                   scroll-reveal, email-gate (RS_FORM_ENDPOINT)
│       ├── lightbox.js   Lightbox dùng chung có zoom/pan (RSLightbox)
│       ├── tools-data.js ★ DỮ LIỆU PHẦN MỀM — sửa file này để thêm tool
│       ├── tools.js      Render danh mục + chi tiết
│       ├── purchase.js   ★ Thông tin chuyển khoản (PAYMENT) + form đơn hàng
│       ├── drawings-data.js  ★ DỮ LIỆU BẢN VẼ
│       ├── drawings.js
│       ├── articles-data.js  ★ NỘI DUNG BÀI VIẾT
│       └── articles.js
│
├── Resource/             Ảnh (xem mục 5)
├── Logo/
└── *.md                  Tài liệu hướng dẫn (xem mục 8)
```

**Quy tắc vàng:** nội dung nằm trong `*-data.js`. Muốn thêm/sửa tool, bản vẽ, bài viết
→ **chỉ sửa file data**, không đụng vào HTML/JS render — rồi chạy
`node scripts/build-pages.mjs`.

File đánh dấu ⚙ là sinh tự động: sửa tay sẽ bị ghi đè ở lần chạy sau. Cần đổi bố cục trang
chi tiết thì sửa `assets/js/tools.js` (phần thân) hoặc `scripts/build-pages.mjs` (phần `<head>`).

---

## 4. Header & footer dùng chung

`main.js` chèn header/footer vào mọi trang qua placeholder:

```html
<header id="site-header"></header>
<footer id="site-footer"></footer>
<body data-page="tools">   <!-- làm sáng mục menu tương ứng -->
```

Sửa menu/footer → sửa `HEADER_HTML` / `FOOTER_HTML` trong `main.js`, áp dụng cho toàn site.

---

## 4b. Cách một trang được dựng — hợp đồng bắt buộc

Không có router, không có template engine. Mỗi trang là một khung HTML rỗng, JS đổ nội dung vào.
Khi tạo trang mới hoặc sửa trang cũ phải giữ đủ **4 điều**:

```html
<body data-page="tools">          <!-- 1. làm sáng mục menu tương ứng (data-nav) -->
<header id="site-header"></header> <!-- 2. placeholder header -->
<main id="tool-detail"></main>     <!-- 3. container do file render đổ vào -->
<footer id="site-footer"></footer>
<!-- 4. THỨ TỰ SCRIPT: main.js → lightbox.js → *-data.js → *.js (renderer) -->
<script src="assets/js/main.js"></script>
<script src="assets/js/lightbox.js"></script>
<script src="assets/js/tools-data.js"></script>
<script src="assets/js/tools.js"></script>
```

Các file data khai báo `window.TOOLS` / `window.DRAWINGS` / `window.ARTICLES` ở global scope
(không phải ES module) — nạp sai thứ tự thì renderer thấy `undefined`.

> Kiến trúc này có cái giá của nó về SEO và preview khi share link — xem **mục 11.A**.

### ⚠️ Bẫy lớn nhất: song ngữ + nội dung render động

`RS.setLang()` duyệt `[data-vi]` rồi **ghi đè `innerHTML`**. Nghĩa là:

1. **Mọi hàm render sau khi gán `innerHTML` PHẢI gọi lại**
   `window.RS.setLang(window.RS.lang)` — nếu không, phần vừa render sẽ kẹt ở text mặc
   định trong template và không đổi được VI/EN. Xem mẫu ở
   [tools.js:92](assets/js/tools.js#L92), [purchase.js:182](assets/js/purchase.js#L182),
   [articles.js:56](assets/js/articles.js#L56).
2. **Tương tự với scroll-reveal:** phần tử `.reveal` tạo động phải được đăng ký lại bằng
   `window.RS.observeReveal()`, nếu không sẽ vô hình vĩnh viễn (opacity 0).
3. Vì là `innerHTML`, giá trị `data-vi`/`data-en` **cho phép HTML** (`<b> <i> <br>`) nhưng
   mọi chuỗi từ file data phải escape khi nhúng — dùng helper `pesc()` / `pbi()` có sẵn
   trong `purchase.js`, `tools.js`, `articles.js`.

---

## 5. Ảnh — QUY TẮC QUAN TRỌNG

Website **chỉ dùng file `.webp`**. Ảnh gốc `.png/.jpg` giữ trên máy để chỉnh sửa
nhưng **không đẩy lên GitHub** (xem `.gitignore`).

```
Resource/01–07,21,22.webp          ảnh nhà máy (trang chủ, CSS)
Resource/tools/Picture/web_description_NN/   ảnh giao diện tool (NN = STT trong softwarelist.xlsx)
Resource/tools/grds/               ảnh tool GRDS (số 05)
Resource/drawings/townhouse-01/    ảnh bản vẽ
Resource/articles/01-deck-slab/    hình minh hoạ bài viết
```

**Cách nén khi thêm ảnh mới** (đã kiểm chứng — quan trọng):

| Loại ảnh | Cách nén | Lý do |
|---|---|---|
| Ảnh chụp thực tế, render 3D | WebP **lossy** q82, rộng tối đa 1600px | giảm ~95% |
| Ảnh chụp giao diện, bản vẽ CAD | WebP **lossless** | lossy làm ảnh màu phẳng **to hơn** PNG gốc và nhoè chữ |

Luôn so sánh dung lượng: nếu `.webp` ≥ ảnh gốc thì đổi sang lossless.

⚠️ **Bài học xương máu:** file `.webp` nằm **cùng thư mục** với ảnh gốc.
Đừng xoá cả thư mục ảnh — sẽ mất luôn bản `.webp` mà website đang dùng.

⚠️ 4 file PNG sau **phải giữ và phải push** (dùng cho `og:image` — ảnh preview khi
share Facebook, nền tảng cũ chưa chắc đọc được WebP):
`Resource/01.png`, `Resource/tools/grds/01.png`,
`Resource/drawings/townhouse-01/3d.png`, `Resource/articles/01-deck-slab/fig1.png`

---

## 6. Bán hàng & bản quyền

**Mô hình:** thanh toán nội địa thủ công (Vietcombank / Momo) → cấp mã bản quyền qua email.

```
Khách bấm "Buy licence" → purchase.html sinh mã đơn RBTyymmddXXX
   → khách chuyển khoản, ghi mã đơn ở nội dung
   → khách điền form → đơn về email qua Formspree
   → Roberto đối soát ngân hàng
   → mở Licence Generator, sinh key, gửi email kèm link tải
```

**Nguyên tắc bảo mật tuyệt đối:**

- `tools-data.js` là file **CÔNG KHAI**. **KHÔNG BAO GIỜ** đặt link tải bản trả phí ở đây.
  Tool trả phí phải để `download: ""`.
- Link tải bản trả phí và khoá bí mật sinh key **chỉ nằm trong Licence Generator**:

  ```
  20260623_WebsiteRobertoStructural\        ← thư mục dự án
  ├── WebsiteRobertoStructural\             ← GỐC REPO GIT (website)
  └── _LicenseSystem\                       ← ★ NGANG HÀNG, NGOÀI REPO
      ├── RobertoLicenseGenerator\          ...\data\products.py  ← secret + link trả phí
      └── integration\                      module nhúng vào tool bán
  ```

  ⚠️ **Vì sao đặt ngoài repo, không đặt trong rồi gitignore:** `.gitignore` chỉ là quy ước —
  `git add -f`, tuỳ chọn "show ignored files" trong GitHub Desktop, hay lỡ sửa `.gitignore`
  đều có thể đẩy secret lên. Nằm ngoài gốc repo thì Git **về mặt vật lý** không commit được.
  Nếu secret lộ: ai cũng sinh được key cho cả 16 tool trả phí, và muốn khắc phục phải đổi
  toàn bộ secret → mọi key đã cấp cho khách đều vô hiệu. Secret vào git history là **vĩnh viễn**.

  → **Không bao giờ** copy `_LicenseSystem/` vào trong `WebsiteRobertoStructural/`.
- Chỉ tool **miễn phí** mới có link công khai, và luôn dùng dạng
  `https://github.com/<user>/<repo>/releases/latest/download/<file>.zip`
  — link `latest` không đổi khi phát hành bản mới.

**Mã bản quyền:** `HMAC-SHA256(secret_sản_phẩm, "email|MÃ_SP")` → base32 →
`RBT-XXXX-XXXX-XXXX-XXXX`. Gắn với **email**, kiểm tra **offline**, **vĩnh viễn không hết hạn**.
Cùng email luôn sinh ra cùng một key → khách mất key thì sinh lại y hệt.

Răn đe chống chia sẻ mạnh nhất **không phải** khoá kỹ thuật, mà là **in tên người mua
lên báo cáo** do phần mềm xuất ra (hồ sơ thiết kế chính thức).

---

## 7. Thêm nội dung mới

> Sau **mọi** thay đổi ở `tools-data.js` / `articles-data.js`:
> `node scripts/build-pages.mjs` — nếu không, tool/bài mới sẽ không có trang riêng
> (link từ catalog sẽ 404) và `sitemap.xml` sẽ sai.

### Thêm phần mềm
Sửa `assets/js/tools-data.js` — copy một khối, điền:
`id, category, name, tagline, version, size, host, priceVnd, productCode, status, thumb, screenshots, features, requirements`
- `priceVnd: 0` → miễn phí (được có link `download`)
- `priceVnd > 0` → trả phí (**bắt buộc** `download: ""`)
- `status: "soon"` → hiện "In development", khoá nút
- Thứ tự hiển thị tự sắp: miễn phí → rẻ → đắt → đang phát triển

### Thêm bài viết
Sửa `assets/js/articles-data.js`, chèn lên **đầu** mảng. Mỗi mục `body` là một khối:
`{vi,en}` đoạn văn · `{type:"subhead"}` · `{type:"list"}` · `{type:"table"}`.
Cho phép `<b> <i> <br>`; ký tự `<` `>` phải viết `&lt;` `&gt;`.
Xem `HUONG_DAN_BAI_VIET.md`.

### Thêm bản vẽ
Sửa `assets/js/drawings-data.js`.

---

## 8. Tài liệu kèm theo

| File | Nội dung |
|---|---|
| `HUONG_DAN_BAN_HANG.md` | Cấu hình thanh toán, quy trình xử lý đơn, checklist ra mắt |
| `HUONG_DAN_BAI_VIET.md` | Cách đăng & sửa bài viết |
| `HUONG_DAN_TOOLS.md` | Phát hành tool qua GitHub Releases, checksum |
| `HUONG_DAN_DEPLOY.md` | Deploy GitHub Pages, cập nhật website |
| `DESIGN_SYSTEM.md` | Bảng màu, font, component |
| `PLAN.md` | Lộ trình tổng thể |

⚠️ **Vài tài liệu đã lỗi thời — code mới là nguồn đúng.** Khi mâu thuẫn, tin code:

| Tài liệu | Chỗ sai | Thực tế trong code |
|---|---|---|
| `HUONG_DAN_TOOLS.md` §3 | bảo sửa `FORM_ENDPOINT` trong `tools.js` | endpoint nằm ở `RS_FORM_ENDPOINT` trong `main.js` |
| `HUONG_DAN_TOOLS.md` §4 | ví dụ dùng field `price: {vi,en}` | schema hiện tại là `priceVnd` + `productCode` + `status` |
| `HUONG_DAN_TOOLS.md` §5 | "sau này bán qua Gumroad/Payhip" | đã có sẵn `purchase.html` + Licence Generator, thanh toán nội địa |
| `DESIGN_SYSTEM.md` §7 | "Mặc định: Tiếng Việt" | mặc định là **EN** ([main.js:81](assets/js/main.js#L81)) |
| `README.md` | sơ đồ thiếu Insights/purchase/lightbox | xem mục 3 của file này |
| `PLAN.md` | lộ trình gốc trước khi build (`/about`, `/services`, `/blog`) | các trang đó không tồn tại — chỉ đọc như tài liệu lịch sử |

---

## 9. Kiểm thử & lệnh hay dùng

**Không có build step, không có test suite, không có linter.** Sửa file → refresh trình duyệt.

```powershell
# ★ SAU KHI SỬA tools-data.js HOẶC articles-data.js — BẮT BUỘC chạy lại:
node scripts/build-pages.mjs      # sinh tool-<id>.html, article-<id>.html + sitemap.xml

# Chạy thử cục bộ (khuyên dùng — sát môi trường thật hơn file://)
python -m http.server 8000        # rồi mở http://localhost:8000

# Tính SHA-256 cho file .zip trước khi phát hành (điền vào field `checksum`)
Get-FileHash .\Tool_v1.0.zip -Algorithm SHA256 | Format-List

# Deploy: chỉ cần push lên main, GitHub Pages tự build (~1 phút)
git add -A; git commit -m "20260802_03"; git push
```

Nén ảnh mới theo chính sách ở mục 5 — nếu dùng `cwebp`:
`cwebp -q 82 -resize 1600 0 in.png -o out.webp` (ảnh chụp/render) ·
`cwebp -lossless in.png -o out.webp` (ảnh giao diện, bản vẽ CAD).

**Mở thẳng file `.html` bằng Chrome** vẫn đủ để kiểm tra bố cục, animation, VI/EN,
lightbox, lọc danh mục, điều hướng.

**Không chạy đúng khi mở bằng `file://`** — phải test trên web thật:
- Gửi email Formspree (bị chặn CORS)
- Ảnh preview khi share Facebook (og:image)
- Trang 404

**Cập nhật web:** GitHub Desktop (hoặc lệnh git ở trên) → Commit → Push → đợi ~1 phút.
Repo: `Roberto-0720/roberto-structural`, nhánh `main`, thư mục gốc.
Code chỉ ~300 KB nên push thoải mái; chỉ cẩn thận khi commit ảnh (mỗi bản ảnh
thay đổi được Git lưu vĩnh viễn).

**Hai điểm tích hợp cần biết:** hai form Formspree **riêng biệt** —
[main.js](assets/js/main.js) `RS_FORM_ENDPOINT` (tải file) và
[purchase.js](assets/js/purchase.js) `PAYMENT.orderEndpoint` (đơn hàng).
⚠️ Không bao giờ gộp lại làm một — đọc mục 11.C trước khi đụng vào.

---

## 10. Những điều TUYỆT ĐỐI tránh

1. **Không** đặt link tải bản trả phí vào bất kỳ file nào trong repo công khai.
2. **Không** copy `_LicenseSystem/` vào trong gốc repo. Nó đã được chuyển ra
   **ngang hàng** với repo (xem mục 6) — giữ nguyên như vậy. Cũng không commit
   `customers.csv` hay `Resource/software_list/` (chứa giá và link trả phí).
   *Đã kiểm tra 2026-08-02: `git log --all` trên `_LicenseSystem`, `products.py`,
   `*.secret`, `customers.csv` → sạch, secret chưa bao giờ vào history.*
3. **Không** xoá thư mục ảnh — file `.webp` website đang dùng nằm chung với ảnh gốc.
4. **Không** đổi thuật toán sinh key trong `license_core.py` — mọi key đã cấp sẽ vô hiệu.
5. **Không** đổi `id` của tool/bài viết đã publish — `id` giờ nằm thẳng trong tên file
   (`tool-<id>.html`), đổi là hỏng link đã chia sẻ, sitemap và thứ hạng đã tích luỹ.
6. **Không** dùng framework/npm — giữ site static thuần để dễ bảo trì lâu dài.
7. **Không** sửa tay file có dấu ⚙ (`sitemap.xml`, `tool-*.html`, `article-*.html`) —
   lần chạy generator sau sẽ ghi đè sạch.
8. **Không** để form tải file và form đơn hàng dùng chung endpoint Formspree (mục 11.C).

---

## 11. Trang chi tiết tĩnh, SEO & đường nhận đơn

Ba rủi ro phát hiện ngày 2026-08-02. A và C **đã xử lý**, B **còn lại một nửa**.

### A. ✅ Trang chi tiết tĩnh cho từng tool / bài viết

Trước đây `tool.html` / `article.html` ship ra `<main>` rỗng và mọi `?id=` dùng chung một
`<head>`. Googlebot chạy JS nên vẫn đọc được nội dung, nhưng **crawler Facebook/Zalo/LinkedIn
thì không** — mọi link tool share ra đều hiện "Chi tiết Tool", không ảnh. Đó là lỗi đắt nhất
của site vì traffic chủ lực đến từ Facebook.

Cách xử lý: [scripts/build-pages.mjs](scripts/build-pages.mjs) sinh **một file phẳng ở gốc
repo cho mỗi tool/bài viết** — `tool-<id>.html`, `article-<id>.html` — mỗi file có
`<title>`, description, `og:*`, `twitter:*`, `canonical` riêng.

- **Phần thân vẫn do JS render** từ chính `*-data.js` cũ. Generator **không** nhân bản nội
  dung → file data vẫn là nguồn duy nhất. Trang tĩnh báo id cho renderer qua
  `window.RS_PAGE_ID`.
- **Vì sao file phẳng ở gốc, không phải `tool/<id>.html`:** mọi đường dẫn trong site đều
  tương đối (`assets/…`, `Resource/…`, `index.html#…`) để chạy được cả ở `/roberto-structural/`
  lẫn `/`. Đặt trong thư mục con sẽ hỏng hết, còn `<base href>` thì hỏng anchor `#`.
- **Tool `status:"soon"` VẪN được sinh trang** (catalog có link tới, thiếu là 404) nhưng gắn
  `noindex` và không vào sitemap.
- URL cũ `tool.html?id=` / `article.html?id=` **vẫn chạy** cho link đã lỡ chia sẻ, và tự gắn
  `canonical` trỏ về trang tĩnh qua `rsSetCanonical()` để không chia đôi thứ hạng.
- `sitemap.xml` giờ **do generator sinh ra** — đừng sửa tay.

⚠️ **Sửa `tools-data.js` / `articles-data.js` xong PHẢI chạy `node scripts/build-pages.mjs`.**
Quên thì tool mới không có trang riêng và sitemap sai. Link URL định nghĩa một chỗ duy nhất:
`window.RS_URL` trong `main.js`.

### B. ⚠️ Song ngữ vẫn chưa có URL riêng — việc còn lại

Một URL duy nhất cho cả VI lẫn EN; `localStorage` quyết định hiển thị. Không `hreflang`,
không `/vi/` `/en/`, không `?lang=`.

- Mặc định EN, nên khi tải trang `setLang('en')` **ghi đè** HTML thô (vốn viết tiếng Việt)
  → Google render xong chỉ thấy **EN**.
- Nội dung tiếng Việt nằm đủ trong `data-vi` nhưng **không URL nào trỏ tới được** → truy vấn
  tiếng Việt gần như không có gì để khớp, dù đó chính là nhóm khách mua tool.
- Đã sửa phần dễ: `<html lang>` giờ thống nhất `"en"` trên mọi trang.
- **Chưa làm:** tách URL theo ngôn ngữ. Việc này nên gộp vào generator ở mục A — sinh thêm
  `tool-<id>.vi.html` với `<head>` tiếng Việt + cặp `hreflang`, chứ đừng dựng cơ chế riêng.

### C. ✅ Formspree — đơn hàng không còn mất im lặng

Rủi ro nặng nhất vì ăn vào tiền thật: khách chuyển khoản xong, thấy "Cảm ơn bạn!", còn Roberto
không nhận được gì.

Nguyên nhân gốc: `fetch` **chỉ** reject khi đứt mạng. Formspree hết quota trả **HTTP 4xx** —
promise vẫn resolve, `catch` không chạy, code cũ đi thẳng tới màn hình cảm ơn.

Đã sửa:
- `rsSubmitOrder` giờ đọc `res.ok`. Thất bại → hiện khối `#orderError` với **mailto điền sẵn
  toàn bộ thông tin đơn**, nút sao chép, nút thử lại. **Không bao giờ** báo thành công khi
  chưa gửi được.
- Nút gửi bị khoá trong lúc chờ — mỗi lần bấm lại tốn một suất quota.
- Email-gate tải file cũng đọc `res.ok`, nhưng **cố ý vẫn cho tải**: mất một lead thì phiền,
  chặn khách tải thì tệ hơn. Chỉ ghi `console.warn`.

✅ **Đã tách hai form Formspree** (2026-08-02):

| Dùng cho | Hằng số | Form |
|---|---|---|
| Đơn hàng | `PAYMENT.orderEndpoint` — purchase.js | `xjgnqlqd` ("Orders") |
| Tải file | `RS_FORM_ENDPOINT` — main.js | `xbdnzejn` |

**Không bao giờ trỏ hai cái này về cùng một form nữa.** Form tải file không có xác thực và
chạy nhiều gấp bội, nó sẽ luôn đốt hết quota trước và kéo sập luôn đường nhận đơn trả tiền.

⚠️ **Bẫy đã gặp — đơn nằm ở tab `Spam` của Formspree.** Submission bị gắn spam thì Formspree
**không gửi email thông báo**, rất dễ tưởng là mất đơn. Nguyên nhân khi thử nghiệm: gửi từ
`localhost` (trường `page` ghi `http://localhost:8000/…`) và nội dung có chữ "TEST".
→ Không thấy email báo đơn thì **kiểm tab Spam trước tiên**, bấm "Not spam" để dạy bộ lọc.
→ Thử nghiệm trên localhost gần như chắc chắn bị gắn spam; phải thử lại **một đơn từ web thật**
sau khi deploy mới kết luận được.

Thông báo đơn về `robertostructural@gmail.com` (email tài khoản Formspree). Formspree đặt
reply-to là email khách → bấm Reply trong email báo đơn là trả lời thẳng cho khách.

### Kiểm thử đã chạy (2026-08-02)

- Render headless Chrome: trang tĩnh, URL `?id=` cũ, catalog, insights, purchase — đều đúng.
- Quét toàn bộ link nội bộ từ 4 trang danh mục → không có 404.
- Test đường tiền với 3 kịch bản (HTTP 429 / mất mạng / HTTP 200) → cả 3 pass.
