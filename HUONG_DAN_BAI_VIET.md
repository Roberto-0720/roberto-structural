# Hướng dẫn đăng & sửa bài viết (Insights)

Chuyên mục **Insights / Structural Notes** dùng để đăng bài báo, ghi chép kỹ thuật và nghiên cứu.
Mọi bài đều **song ngữ Việt–Anh**, tự đổi theo nút VI/EN của website.

---

## 1. Các file liên quan
```
├─ insights.html                  # Trang danh mục bài viết (tự sinh)
├─ article.html                   # Trang đọc 1 bài (đọc ?id=...)
├─ assets/js/articles-data.js     # ★ NỘI DUNG BÀI VIẾT — chỉ sửa file này
├─ assets/js/articles.js          # Logic hiển thị (hiếm khi cần sửa)
└─ Resource/articles/<slug>/      # Ảnh minh họa của từng bài
```
> Thêm bài mới hay sửa bài cũ: **chỉ đụng vào `articles-data.js`** và thư mục ảnh.

---

## 2. Quy trình gửi bài cho Claude (cách nhanh nhất)
1. Tạo thư mục mới trong `Article/`, ví dụ `Article/02_Openings_in_Deck/`.
2. Bỏ vào đó: file `.md` nội dung (song ngữ) + các ảnh minh họa (đặt tên theo thứ tự `1. ...`, `2. ...`).
3. Nhắn Claude: *"Bài mới ở thư mục Article/02_..., đưa lên web giúp mình"*.
4. Claude sẽ: copy ảnh sang `Resource/articles/<slug>/`, chuyển nội dung vào `articles-data.js`, đặt số bài, phân loại, ước lượng thời gian đọc.

**Muốn sửa bài đã đăng?** Chỉ cần nói: *"Sửa bài 01, mục 3, đổi đoạn ... thành ..."* hoặc *"Thêm ảnh này vào mục 2 bài 01"*.

---

## 3. Tự thêm bài bằng tay (nếu muốn)
Mở `assets/js/articles-data.js`, copy một khối `{ ... }` và dán vào **ĐẦU** mảng `window.ARTICLES`
(bài mới nhất nằm trên cùng — danh sách hiển thị theo đúng thứ tự này).

```js
{
  id: "openings-in-deck-slabs",       // slug → URL: article.html?id=openings-in-deck-slabs
  no: "02",                            // số bài, hiện dạng "No. 02"
  category: { vi: "Kết cấu thép", en: "Steel Structures" },   // phải khớp danh sách bên dưới
  date: "2026-08-10",                  // YYYY-MM-DD
  readmin: 7,                          // phút đọc ước lượng
  title:   { vi: "…", en: "…" },
  excerpt: { vi: "…", en: "…" },       // tóm tắt hiện trên thẻ ngoài danh mục
  cover: "Resource/articles/02-openings/fig1.png",
  sections: [
    {
      heading: { vi: "1. …", en: "1. …" },
      body: [
        { vi: "Đoạn văn 1 …", en: "Paragraph 1 …" },
        { vi: "Đoạn văn 2 …", en: "Paragraph 2 …" }
      ],
      figure: {                        // TÙY CHỌN — bỏ nếu mục không có ảnh
        src: "Resource/articles/02-openings/fig1.png",
        caption: { vi: "Chú thích …", en: "Caption …" }
      }
    }
  ],
  footnote: { vi: "…", en: "…" }       // TÙY CHỌN — ghi chú cuối bài (khung màu cam)
}
```

### Định dạng chữ trong nội dung
- **In đậm**: `<b>chữ đậm</b>`
- *In nghiêng*: `<i>chữ nghiêng</i>`
- Mỗi phần tử trong `body` là **một đoạn văn** (tự xuống dòng, không cần thẻ `<p>`).

### Danh mục hiện có (`window.ARTICLE_CATEGORIES`)
| VI | EN |
|---|---|
| Kết cấu thép | Steel Structures |
| Kết cấu BTCT | Reinforced Concrete |
| Mô hình & Phân tích | Modelling & Analysis |
| Thi công | Construction |
| Móng thiết bị | Equipment Foundations |

> Muốn thêm danh mục mới: thêm 1 dòng vào `window.ARTICLE_CATEGORIES`. Nút lọc chỉ hiện danh mục **đã có bài**.

---

## 4. Ảnh minh họa
- Đặt trong `Resource/articles/<slug>/`, tên gọn: `fig1.png`, `fig2.png`…
- Ảnh **ngang** hiển thị đẹp nhất. Ảnh đầu tiên thường dùng làm `cover` (ảnh bìa thẻ).
- Người đọc **bấm vào ảnh** để phóng to toàn màn hình (đã có sẵn).
- Nên nén ảnh dưới ~800 KB để trang tải nhanh.

---

## 5. Đăng lên website
Sau khi sửa xong:
1. **GitHub Desktop** → tab Changes → Summary (vd `Add article 02`) → **Commit to main**
2. Bấm **Push origin**
3. Đợi ~1 phút → bài xuất hiện tại `https://roberto-0720.github.io/roberto-structural/insights.html`

---

## 6. Bài viết hiện có
| No. | Bài | Danh mục | Ngày |
|-----|-----|----------|------|
| 01 | Sàn Deck trên kết cấu thép — Bốn góc nhìn dễ bị bỏ qua | Kết cấu thép | 2026-07-25 |
