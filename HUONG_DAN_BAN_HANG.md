# Hướng dẫn bán phần mềm (thanh toán nội địa VN)

Toàn bộ hệ thống bán hàng gồm 3 phần:

| Phần | Ở đâu | Dùng để |
|---|---|---|
| **Website** | `purchase.html` + `assets/js/purchase.js` | Khách xem giá, chuyển khoản, gửi thông tin đơn |
| **Licence Generator** | `_LicenseSystem/RobertoLicenseGenerator/` | Bạn sinh mã bản quyền, lưu khách hàng |
| **Module trong tool** | `_LicenseSystem/integration/` | Phần mềm kiểm tra mã, in tên khách lên báo cáo |

> ⚠️ **Vị trí Licence Generator:** đặt **ngang hàng** với repo, không nằm trong:
> ```
> 20260623_WebsiteRobertoStructural\
> ├── WebsiteRobertoStructural\   ← repo Git (website)
> └── _LicenseSystem\             ← ★ ở đây
> ```
> Nằm ngoài gốc repo nên Git không thể commit — an toàn tuyệt đối, không phụ thuộc `.gitignore`.
> **Không bao giờ** copy thư mục này vào trong `WebsiteRobertoStructural\`.

---

## 1. Cấu hình một lần

### 1.1 Điền thông tin thanh toán
Mở `assets/js/purchase.js`, sửa khối `PAYMENT` ở đầu file:

```js
const PAYMENT = {
  bank: {
    name: "Vietcombank (VCB)",
    account: "0123456789",              // ← SỐ TÀI KHOẢN THẬT
    holder: "NGUYEN NAM TRUONG",        // ← tên chủ TK, viết HOA không dấu
    branch: "",
    qr: "Resource/payment/vcb-qr.png"   // ← ảnh QR (tuỳ chọn)
  },
  momo: {
    phone: "0977200787",                // ← SỐ MOMO THẬT
    holder: "NGUYEN NAM TRUONG",
    qr: "Resource/payment/momo-qr.png"
  },
  ...
};
```

### 1.2 Thêm ảnh QR (tuỳ chọn nhưng nên có)
- Tạo thư mục `Resource/payment/`
- Lưu ảnh QR VietQR của VCB thành `vcb-qr.png`
- Lưu ảnh QR Momo thành `momo-qr.png`
- Không có ảnh thì trang tự ẩn phần QR, khách vẫn chuyển khoản thủ công được.

> **Mẹo:** VietQR cho phép nhúng sẵn số tiền và nội dung. Nhưng vì mỗi đơn có mã riêng,
> nên dùng QR **không kèm số tiền** rồi để khách tự nhập theo hướng dẫn trên trang.

---

## 2. Đặt giá cho một tool

Mở `assets/js/tools-data.js`, thêm 2 trường vào tool muốn bán:

```js
{
  id: "grds-slab-on-grade",
  ...
  priceVnd: 500000,          // 0 = miễn phí; > 0 = bán, tự hiện nút "Mua bản quyền"
  productCode: "GRDS",       // phải khớp Licence Generator
  download: "",              // ← BẮT BUỘC để rỗng với tool trả phí
  ...
}
```

**Quan trọng:** tool trả phí **không được** có link `download` công khai. Để rỗng thì
website chỉ hiện nút "Mua bản quyền", không lộ file.

Website tự động:
- Thẻ trong danh mục hiện **giá** thay vì nhãn "Free"
- Trang chi tiết hiện nút **"Mua bản quyền"** → dẫn tới `purchase.html`
- Ẩn mã SHA-256 (chỉ dùng cho bản miễn phí)

---

## 3. Quy trình xử lý một đơn hàng

```
Khách bấm "Mua bản quyền"
   ↓
purchase.html sinh MÃ ĐƠN tự động (vd RBT260729BL6)
   ↓
Khách chuyển khoản VCB/Momo, ghi nội dung = mã đơn
   ↓
Khách điền form (tên, email, mã đơn) → bạn nhận email "ĐƠN HÀNG RBT..."
   ↓
Bạn mở app ngân hàng, đối chiếu số tiền + nội dung
   ↓
Mở Licence Generator → nhập tên/email/sản phẩm → SINH MÃ
   ↓
Dán link tải bản trả phí → Copy email giao hàng → gửi Gmail
   ↓
Bấm "Lưu khách hàng" (ghi customers.csv)
```

Thời gian xử lý: **~3 phút/đơn**.

---

## 4. Lưu file bản trả phí ở đâu?

**Không** dùng GitHub Release công khai cho bản trả phí (Google sẽ index).

Chọn một trong hai:
- **Google Drive**: upload file `.zip` → Share → *Anyone with the link* → copy link.
  Dán link đó vào ô "Link tải gửi khách" trong Licence Generator.
- **GitHub Release ở repo Private**: an toàn hơn nhưng khách phải đăng nhập GitHub → bất tiện.

> Nhắc lại: link nào cũng có thể bị chia sẻ. Bảo vệ thật nằm ở **mã bản quyền** và
> **tên khách in trên báo cáo**, không phải ở độ bí mật của link.

---

## 5. Lộ trình triển khai đề xuất

| Giai đoạn | Việc làm | Mục tiêu |
|---|---|---|
| **1. Ra mắt** | 2 tool **miễn phí** mạnh, link GitHub Release công khai | Xây uy tín, thu email |
| **2. Bán thử** | 3 tool **giá thấp** (vd 200k–500k) | Kiểm chứng luồng thanh toán với rủi ro thấp |
| **3. Mở rộng** | 3 tool **giá cao** (vd 1–3 triệu) | Tăng doanh thu khi luồng đã trơn tru |

**Lời khuyên:** đừng tung cả 8 tool cùng lúc. Chạy giai đoạn 1+2 trước để phát hiện
vướng mắc thực tế (khách hỏi gì, chuyển khoản sai ra sao) rồi mới đưa tool giá cao lên.

---

## 6. Checklist trước khi bung web

- [ ] Điền số tài khoản VCB + số Momo thật vào `purchase.js`
- [ ] Thêm ảnh QR vào `Resource/payment/` (nếu có)
- [ ] Đặt `priceVnd` cho các tool trả phí, để `download: ""`
- [ ] Nhúng module license vào từng tool trả phí (xem `_LicenseSystem/integration/README.md`)
- [ ] Build lại `.exe` các tool trả phí (đã có license)
- [ ] Upload file trả phí lên Google Drive, lấy link
- [ ] Cập nhật `products.py` trong Licence Generator: đúng `code`, `secret`, `price`
- [ ] Build Licence Generator thành `.exe` để dùng nhanh
- [ ] **Chuyển `_LicenseSystem/` ra ngoài thư mục website**
- [ ] Test thử một đơn hàng giả từ đầu đến cuối
- [ ] Commit + Push website

---

## 7. Khi có tranh chấp / khách mất mã

- **Mất mã bản quyền** → mở Licence Generator, nhập lại đúng email → ra **đúng mã cũ**.
- **Khách đổi email** → sinh mã mới cho email mới, ghi chú vào `customers.csv`.
- **Nghi ngờ mã bị chia sẻ** → tab *Kiểm tra* để xác nhận mã có phải do mình cấp;
  đối chiếu với `customers.csv` xem cấp cho ai.
