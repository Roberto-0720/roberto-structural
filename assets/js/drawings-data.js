/* ============================================================
   Roberto Structural — DRAWINGS LIBRARY DATA (single source of truth)
   ------------------------------------------------------------
   HOW TO ADD A DRAWING SET:
   1. Copy a { ... } block and paste it into window.DRAWINGS.
   2. Unique "id".
   3. "category.en" must match one of window.DRAWING_CATEGORIES below.
   4. Put preview images in  Resource/drawings/<set>/  and list them in
      "thumb" (card cover) and "screenshots" (lightbox gallery).
   5. "contents" = the disciplines/sheets included (shown as tags on the card).
   6. Upload the drawing pack (.zip of DWG/PDF) to a GitHub Release and put the
      link in "download" (same workflow as software — see HUONG_DAN_TOOLS.md).
      Leave "" while not ready -> card shows "Download soon".
   ============================================================ */

window.DRAWING_CATEGORIES = [
  { vi: "Kết cấu thép",       en: "Steel Structural" },
  { vi: "Kết cấu BTCT",       en: "RC Structure" },
  { vi: "Kiến trúc",          en: "Architectural" },
  { vi: "Chi tiết điển hình", en: "Standard Details" }
];

window.DRAWINGS = [
  {
    id: "residential-townhouse-01",
    category: { vi: "Kiến trúc", en: "Architectural" },
    name: { vi: "Nhà lô phố 4 tầng — 5×14,5m", en: "4-Storey Townhouse — 5×14.5m" },
    description: {
      vi: "Bộ hồ sơ thiết kế ĐẦY ĐỦ cho nhà lô phố hiện đại, lệch tầng (tầng lửng), 4 tầng. Tầng trệt bố trí chỗ để ô tô và bếp. Hồ sơ nhiều bộ môn:",
      en: "COMPLETE design package for a modern split-level townhouse, 4 storeys. Ground floor with car parking and kitchen. Multi-discipline set:"
    },
    contents: [
      { vi: "Phối cảnh 3D", en: "3D perspective" },
      { vi: "Kiến trúc", en: "Architecture" },
      { vi: "Điện & Nước (MEP)", en: "Electrical & Plumbing" },
      { vi: "Kết cấu", en: "Structure" }
    ],
    format: "DWG · PDF",
    count: { vi: "5×14,5m · 4 tầng", en: "5×14.5m · 4 floors" },
    thumb: "Resource/drawings/townhouse-01/3d.webp",
    screenshots: [
      "Resource/drawings/townhouse-01/3d.webp",
      "Resource/drawings/townhouse-01/elevation.webp",
      "Resource/drawings/townhouse-01/elevation-2.webp",
      "Resource/drawings/townhouse-01/plan.webp"
    ],
    download: "https://github.com/Roberto-0720/20260723_Townhouse_01_5x14.5x4/releases/download/townhouse-01/Townhouse_01_5x14.5x4.zip"
  },
  {
    id: "residential-villa-01",
    category: { vi: "Kiến trúc", en: "Architectural" },
    name: { vi: "Biệt thự sân vườn 2,5 tầng — 12×20m", en: "Garden Villa 2.5 Storeys — 12×20m" },
    description: {
      vi: "Bộ hồ sơ thiết kế cho biệt thự sân vườn phong cách cổ điển, mái ngói chống nóng, 2,5 tầng. Có chỗ để ô tô và sân vườn bố trí hợp lý quanh nhà. Hồ sơ gồm:",
      en: "Design set for a classical garden villa with insulated tiled roof, 2.5 storeys. Car parking and a well-planned garden around the house. The set includes:"
    },
    contents: [
      { vi: "Kiến trúc", en: "Architecture" },
      { vi: "Kết cấu", en: "Structure" },
      { vi: "Chi tiết móng cọc", en: "Piling / foundation detail" },
      { vi: "Ghi chú chung", en: "General notes" }
    ],
    format: "DWG · PDF",
    count: { vi: "12×20m · 2,5 tầng", en: "12×20m · 2.5 floors" },
    thumb: "Resource/drawings/villa-01/elevation.webp",
    screenshots: [
      "Resource/drawings/villa-01/elevation.webp",
      "Resource/drawings/villa-01/plan.webp",
      "Resource/drawings/villa-01/plan-2.webp"
    ],
    download: "https://github.com/Roberto-0720/20260723_Villa_01_12x20x2.5/releases/download/villa_01/Villa_01_12x20x2.5.zip"
  }
];
