# KẾ HOẠCH XÂY DỰNG WEBSITE KẾT CẤU — Roberto Structural

**Cập nhật:** 2026-06-23
**Mục tiêu:** Website chuyên nghiệp về kết cấu công nghiệp (lọc hóa dầu, nhiệt điện, điện khí, điện rác), tích hợp Facebook/YouTube để dẫn traffic, giới thiệu năng lực → bán Tool/phần mềm thiết kế.

## Quyết định đã chốt
| Hạng mục | Lựa chọn |
|---|---|
| Ngôn ngữ | Song ngữ Việt–Anh (VI mặc định, nút chuyển EN) |
| Công nghệ | Static site (HTML/CSS/JS, có thể dùng Astro) + GitHub Pages |
| Phạm vi MVP | Website đầy đủ nhiều trang |
| Inspiration | Có URL mẫu (chờ Roberto gửi link) |

---

## BƯỚC 1 — INSPIRATION DESIGN (Phân tích trang mẫu)
**Mục tiêu:** Rút ra "DNA thiết kế" để áp dụng, không sao chép.

1. Roberto gửi URL trang mẫu.
2. Claude phân tích: bố cục (layout/grid), bảng màu (hex), font chữ, kiểu hero section, cách trình bày dự án/portfolio, micro-interaction.
3. Sưu tầm 2–3 trang structural/engineering tham khảo thêm để so sánh.
4. Output: file `DESIGN_SYSTEM.md` — màu, font, spacing, component (button, card, nav).

**Roberto cần làm ngay:** Gửi link trang mẫu + nói rõ thích điểm gì ở trang đó.

---

## BƯỚC 2 — TẠO FILE CLAUDE.md (Brief dự án cho AI)
**Mục tiêu:** File "luật chơi" để mọi phiên làm việc sau bám đúng định hướng.

Nội dung CLAUDE.md sẽ gồm:
- Định vị thương hiệu, đối tượng khách (chủ đầu tư, nhà thầu EPC, kỹ sư trẻ).
- Design system (link tới `DESIGN_SYSTEM.md`).
- Cấu trúc site (sơ đồ trang).
- Quy ước code (cấu trúc thư mục, đặt tên, song ngữ).
- Quy ước nội dung (giọng văn chuyên nghiệp, thuật ngữ kỹ thuật).
- Định hướng SEO & liên kết Facebook/YouTube.

---

## BƯỚC 3 — BUILD & MODIFY (Xây dựng & tinh chỉnh)
**Cấu trúc site đề xuất:**
```
/ (Trang chủ)        → Hero + lĩnh vực + dự án nổi bật + CTA tới Tool
/about               → Hồ sơ năng lực, kinh nghiệm, lĩnh vực chuyên môn
/services            → Dịch vụ tư vấn thiết kế kết cấu
/projects            → Portfolio dự án (lọc theo loại nhà máy)
/tools               → Showcase + bán Tool/phần mềm thiết kế (Python GUI)
/blog                → Bài viết kỹ thuật (SEO + uy tín chuyên môn)
/contact             → Liên hệ + nhúng Facebook/YouTube feed
```

**Cấu trúc thư mục dự án (static):**
```
WebsiteRobertoStructural/
├─ index.html
├─ pages/        (about, services, projects, tools, blog, contact)
├─ assets/
│  ├─ css/       (style.css, design-tokens.css)
│  ├─ js/         (main.js, i18n.js — chuyển VI/EN)
│  ├─ img/        (logo, ảnh dự án, ảnh tool)
│  └─ fonts/
├─ data/          (projects.json, tools.json — dữ liệu động nhẹ)
├─ i18n/          (vi.json, en.json — nội dung song ngữ)
├─ CLAUDE.md
└─ README.md
```

**Tính năng ưu tiên:**
- Responsive (mobile-first) — đa số khách vào từ Facebook trên điện thoại.
- Chuyển ngôn ngữ VI/EN không reload (JSON i18n).
- SEO cơ bản: meta tags, Open Graph (để link đẹp khi share Facebook), sitemap.
- Nút chia sẻ + nhúng video YouTube + Facebook Page plugin.
- Trang `/tools`: card từng tool, ảnh GUI, mô tả, nút "Tải/Mua".

**Quy trình:** dựng khung trang chủ trước → duyệt → nhân bản sang các trang khác → thêm nội dung → tinh chỉnh.

---

## BƯỚC 4 — DEPLOYMENT (Triển khai)
1. Tạo repo GitHub `roberto-structural`.
2. Bật **GitHub Pages** (nhánh `main` hoặc `/docs`) → có ngay URL `username.github.io`.
3. (Tùy chọn) Mua tên miền riêng (vd `.com`/`.vn`) → trỏ DNS về GitHub Pages.
4. Cài Google Analytics + Google Search Console (theo dõi traffic, SEO).
5. Tạo Facebook Page + kênh YouTube, gắn link 2 chiều với website.
6. Quy trình cập nhật: chỉnh file → push → tự động lên web.

**Về bán Tool sau này:** giai đoạn đầu để "Liên hệ để mua" hoặc form đăng ký; khi có nhu cầu thật mới tích hợp thanh toán (vd Gumroad/Stripe/chuyển khoản) — tránh phức tạp sớm.

---

## VIỆC CẦN LÀM NGAY (theo thứ tự)
1. **Roberto:** Gửi URL trang mẫu + ảnh logo/ảnh dự án (nếu có).
2. **Roberto:** Xác nhận tên thương hiệu hiển thị + slogan ngắn.
3. **Claude:** Phân tích trang mẫu → tạo `DESIGN_SYSTEM.md`.
4. **Claude:** Tạo `CLAUDE.md` dự án.
5. **Claude:** Dựng trang chủ mẫu để Roberto duyệt hướng thiết kế.

> Khi Roberto gửi link mẫu, Claude bắt đầu ngay Bước 1.
