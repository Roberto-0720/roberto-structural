# Hướng dẫn phát hành & quản lý Tool trên website

Tài liệu này mô tả quy trình đưa một Tool (`.exe`) lên website để người dùng tải dùng thử.
Mô hình: **người dùng nhập email → nhận link tải**; file `.exe` lưu trên **GitHub Releases** (không nằm trong repo website).

---

## 1. Cấu trúc liên quan đến Tool
```
WebsiteRobertoStructural/
├─ tools.html                 # Trang danh mục (tự sinh từ dữ liệu)
├─ tool.html                  # Trang chi tiết 1 tool (đọc ?id=...)
├─ assets/js/tools-data.js    # ★ DỮ LIỆU TOOL — chỉ cần sửa file này để thêm tool
├─ assets/js/tools.js         # Logic hiển thị + email-gate (ít khi cần sửa)
└─ Resource/tools/            # Nơi để ảnh chụp giao diện (screenshots) của tool
```

Muốn thêm/sửa tool: **chỉ sửa `assets/js/tools-data.js`**. Không cần đụng vào HTML.

---

## 2. Quy trình đưa 1 Tool mới lên (5 bước)

### Bước 1 — Đóng gói & nén file
- Build tool thành `.exe` (PyInstaller).
- Nén thành `.zip` (khuyến nghị) để giảm cảnh báo antivirus, ví dụ: `FoundationDesigner_v1.0.0.zip`.

### Bước 2 — Tính mã kiểm tra SHA-256 (tạo niềm tin)
Mở PowerShell tại thư mục chứa file:
```powershell
Get-FileHash .\FoundationDesigner_v1.0.0.zip -Algorithm SHA256 | Format-List
```
Copy chuỗi `Hash` — sẽ dán vào `checksum` ở Bước 4.

### Bước 3 — Tải file lên GitHub Releases
1. Vào repo GitHub của website → tab **Releases** → **Draft a new release**.
2. Đặt **Tag** (vd `foundation-v1.0.0`), tiêu đề, mô tả ngắn.
3. Kéo-thả file `.zip` vào mục **Attach binaries**.
4. Bấm **Publish release**.
5. Chuột phải vào file vừa đính kèm → **Copy link address**. Link có dạng:
   `https://github.com/<user>/<repo>/releases/download/foundation-v1.0.0/FoundationDesigner_v1.0.0.zip`
   → đây là giá trị `download` ở Bước 4.

> GitHub Releases: miễn phí, tối đa 2 GB/file, không làm nặng website.

### Bước 4 — Khai báo tool trong `assets/js/tools-data.js`
Copy 1 khối `{ ... }` có sẵn, sửa lại và dán vào mảng `window.TOOLS`:
```js
{
  id: "foundation-designer",            // slug duy nhất → URL: tool.html?id=foundation-designer
  category: { vi: "Nền móng", en: "Foundation" },
  name: { vi: "Tính toán nền móng", en: "Foundation Designer" },
  tagline: { vi: "…", en: "…" },
  version: "1.0.0",
  size: "48 MB",
  updated: "2026-07",
  os: "Windows 10/11 (64-bit)",
  price: { vi: "Miễn phí dùng thử", en: "Free trial" },
  thumb: "Resource/tools/foundation-cover.png",
  screenshots: ["Resource/tools/foundation-1.png", "Resource/tools/foundation-2.png"],
  features: [ { vi: "…", en: "…" } ],
  requirements: { vi: "…", en: "…" },
  download: "https://github.com/…/FoundationDesigner_v1.0.0.zip",   // ← link ở Bước 3
  checksum: "A1B2C3…",                                              // ← SHA-256 ở Bước 2
  virustotal: "https://www.virustotal.com/…"                       // ← tùy chọn
}
```
- **Để `download: ""`** khi file chưa sẵn sàng → thẻ hiển thị "Sắp ra mắt", nút tải bị khóa.
- Khi có `download` hợp lệ → thẻ hiện "Miễn phí dùng thử", nút tải mở hộp nhập email.

### Bước 5 — Thêm ảnh giao diện
- Chụp màn hình GUI của tool, để vào `Resource/tools/`.
- Ảnh ngang tỉ lệ ~16:10 hiển thị đẹp nhất. Ảnh đầu trong `screenshots` là ảnh lớn mặc định.

Xong. Lưu file, refresh trang → tool xuất hiện.

---

## 3. Thu email người tải (email-gate)
Mặc định form chỉ hiển thị và cho tải ngay (để xem thử). Để **thực sự nhận được email** người tải:

1. Tạo tài khoản miễn phí tại **https://formspree.io** → tạo 1 form → copy endpoint dạng `https://formspree.io/f/xxxxxxx`.
2. Mở `assets/js/tools.js`, sửa dòng đầu:
   ```js
   const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxx";
   ```
3. Từ đó mỗi lượt tải sẽ gửi email + tên tool về hộp thư của bạn.

> Có thể thay Formspree bằng Mailchimp/Google Form nếu muốn — chỉ cần một endpoint nhận POST JSON `{ email, tool, ts }`.

---

## 4. Lưu ý cảnh báo bảo mật của Windows
File `.exe` chưa ký số sẽ bị **SmartScreen** cảnh báo. Cách giảm ma sát cho người dùng:
- Luôn công bố **SHA-256** (đã có sẵn ô hiển thị trên trang chi tiết).
- Kèm link **VirusTotal** (quét file tại virustotal.com rồi dán link vào `virustotal`).
- Hướng dẫn người dùng: "More info → Run anyway".
- Về lâu dài: cân nhắc mua **code signing certificate** để mất hẳn cảnh báo.

---

## 5. Bán bản đầy đủ (giai đoạn sau)
Khi muốn bán bản trả phí: dùng **Gumroad** hoặc **Payhip** (hỗ trợ license key, thanh toán quốc tế, thuế). Thêm nút "Mua bản đầy đủ" trỏ tới link sản phẩm trên các nền tảng đó — mình sẽ bổ sung khi bạn cần.
