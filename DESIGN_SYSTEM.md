# DESIGN SYSTEM — Roberto Structural

**Phong cách:** Tối giản · Hiện đại · Chuyên nghiệp · Công nghiệp nặng
**Nguồn màu:** trích trực tiếp từ logo `Roberto_1.png` (chữ R + giàn thép, tông xám thép + cam đồng).

---

## 1. Bảng màu (Color Tokens)
| Token | Hex | Dùng cho |
|---|---|---|
| `--charcoal` | `#1C1F22` | Nền tối (hero, footer), chữ tiêu đề |
| `--charcoal-2` | `#2A2E33` | Nền section tối thứ cấp, card tối |
| `--steel` | `#6B7177` | Chữ phụ, viền, icon |
| `--steel-light` | `#9AA0A6` | Chữ mô tả trên nền tối |
| `--silver` | `#C5C9CE` | Đường kẻ, nền nhạt |
| `--paper` | `#F5F6F7` | Nền sáng chính |
| `--white` | `#FFFFFF` | Nền card sáng, chữ trên nền tối |
| `--accent` | `#D97B34` | Màu nhấn (nút, link, highlight) — cam đồng |
| `--accent-hover` | `#C2651F` | Trạng thái hover của nút nhấn |
| `--accent-soft` | `rgba(217,123,52,0.12)` | Nền nhạt cho badge/icon |

**Nguyên tắc:** nền sáng (`--paper`) là chính, xen kẽ section tối (`--charcoal`) để tạo nhịp. Màu cam `--accent` chỉ dùng điểm xuyết (CTA, số liệu, gạch chân) — không lạm dụng.

## 2. Font chữ (Typography)
- **Body & UI:** `Be Vietnam Pro` — hỗ trợ ĐẦY ĐỦ tiếng Việt có dấu (yêu cầu bắt buộc).
- **Heading:** `Space Grotesk` cho tiêu đề tiếng Anh; tiêu đề tiếng Việt fallback về `Be Vietnam Pro` để đảm bảo dấu.
- Tải qua Google Fonts. Fallback: `system-ui, "Segoe UI", sans-serif`.
- Tiêu đề lớn: IN HOA, letter-spacing nhẹ, weight 700–800 (học từ trang mẫu).

```
Scale (clamp responsive):
h1: clamp(2.2rem, 5vw, 4rem)
h2: clamp(1.6rem, 3.5vw, 2.6rem)
h3: 1.25rem
body: 1rem (16px), line-height 1.7
small: 0.85rem
```

## 3. Layout & Spacing
- Mobile-first, breakpoint chính: `768px` (tablet), `1024px` (desktop).
- Container tối đa: `1200px`, padding ngang `clamp(1rem, 5vw, 4rem)`.
- Khoảng cách giữa section: `clamp(4rem, 10vw, 8rem)`.
- Grid: 1 cột (mobile) → 2 cột (tablet) → 3–4 cột (desktop).

## 4. Component
**Button**
- `.btn-primary`: nền `--accent`, chữ trắng. Hover: nền `--accent-hover` + nhích lên 2px + đổ bóng (subtle animation — yêu cầu bắt buộc).
- `.btn-ghost`: viền `--steel`, nền trong suốt. Hover: viền `--accent`, chữ `--accent`.
- Bo góc: `8px`. Transition: `all .25s ease`.

**Card** (dự án / tool / lĩnh vực)
- Nền `--white`, bo góc `12px`, viền `1px --silver`, bóng nhẹ.
- Hover: nhích lên 4px, bóng đậm hơn, ảnh zoom nhẹ (scale 1.05).

## 5. Animation (bắt buộc)
- **Scroll reveal:** mọi section fade-up khi vào viewport (IntersectionObserver, dịch 24px + mờ→rõ, .6s ease-out, stagger cho item trong grid).
- **Button hover:** nhích + đổi màu + bóng (xem trên).
- **Card hover:** nâng + zoom ảnh.
- Tôn trọng `prefers-reduced-motion`: tắt animation cho người dùng cần.

## 6. Icon & Hình ảnh
- Icon: dạng line (SVG inline), màu `--steel`, nhấn `--accent`.
- Ảnh hero/dự án: tông công nghiệp (nhà máy, giàn thép, lọc hóa dầu). Hiện dùng gradient + pattern tạm cho đến khi có ảnh thật.
- Favicon: monogram **RS** trên nền `--charcoal`.

## 7. Nguyên tắc song ngữ (VI/EN)
- Nội dung gắn `data-vi` / `data-en`; JS đổi text theo nút toggle, lưu lựa chọn, không reload.
- Mặc định: Tiếng Việt.
