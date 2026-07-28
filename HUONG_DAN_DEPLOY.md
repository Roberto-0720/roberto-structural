# Hướng dẫn Deploy website lên GitHub Pages

Mục tiêu: đưa toàn bộ thư mục `WebsiteRobertoStructural` lên một repo GitHub công khai,
bật GitHub Pages để có **link công khai** (miễn phí, tự động HTTPS).

---

## Bước 1 — Đưa thư mục website thành repo (GitHub Desktop)
1. Mở **GitHub Desktop** → menu **File → Add local repository…**
2. Chọn thư mục: `F:\12 Claude-Cowork\03 Projects\20260623_WebsiteRobertoStructural\WebsiteRobertoStructural`
3. Nó báo *"not a Git repository"* → bấm dòng xanh **"create a repository"** → **Create repository**.
4. Sang tab **Changes** → nhập Summary (vd `Initial website`) → **Commit to main**.

> Thư mục này nhẹ (không chứa file .exe), nên cứ commit tất cả — kể cả ảnh, bản vẽ preview, tài liệu .md.

## Bước 2 — Publish lên GitHub (Public)
1. Bấm **Publish repository** (nút xanh trên cùng).
2. **Bỏ tick** "Keep this code private" → để **Public**.
3. Đặt tên repo:
   - **Cách A (khuyên dùng):** `roberto-structural` → link sẽ là
     `https://roberto-0720.github.io/roberto-structural/`
   - **Cách B (URL đẹp nhất, chỉ được 1 site kiểu này):** đặt đúng tên `roberto-0720.github.io`
     → link sẽ là `https://roberto-0720.github.io/` (gọn hơn).
4. Bấm **Publish repository**.

## Bước 3 — Bật GitHub Pages
1. Trên **github.com**, mở repo vừa publish → tab **Settings**.
2. Menu trái → **Pages**.
3. Mục **Build and deployment → Source**: chọn **Deploy from a branch**.
4. **Branch**: chọn `main`, thư mục **`/ (root)`** → **Save**.
5. Đợi **1–2 phút**, tải lại trang → sẽ hiện dòng:
   *"Your site is live at https://roberto-0720.github.io/roberto-structural/"*

## Bước 4 — Kiểm tra
- Mở link đó trên điện thoại và máy tính.
- Thử: đổi VI/EN, cuộn animation, mở trang **Software** và **Drawings**, bấm **Download** → nhập email.
- Lần tải đầu, kiểm tra hộp thư `robertostructural@gmail.com` xem Formspree gửi email xác nhận kích hoạt form chưa (bấm xác nhận 1 lần).

---

## Cập nhật website sau này
Mỗi khi sửa file (thêm tool, thêm bản vẽ, đổi nội dung):
1. GitHub Desktop → tab **Changes** → nhập Summary → **Commit to main**.
2. Bấm **Push origin**.
3. Đợi ~1 phút, website tự cập nhật.

## (Tùy chọn) Tên miền riêng
Muốn dùng tên miền như `robertostructural.com`:
1. Mua tên miền (Namecheap, GoDaddy, PA Vietnam…).
2. Trong repo → Settings → Pages → **Custom domain** → nhập tên miền → Save.
3. Ở nhà cung cấp tên miền, trỏ **CNAME** về `roberto-0720.github.io` (và 4 bản ghi A của GitHub Pages).
4. Bật **Enforce HTTPS**.

## Ghi chú kỹ thuật
- File `.nojekyll` đã có sẵn để GitHub Pages phục vụ đúng thư mục `assets/`.
- Mọi đường dẫn trong web đều **tương đối**, nên chạy tốt cả ở dạng project site (`/repo/`) lẫn user site (`/`).
- `404.html` tự nhận diện gốc site để nút "Back to home" luôn đúng.
