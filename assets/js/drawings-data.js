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
   6. "priceVnd": 0 → free (public "download" link allowed, delivered instantly
      via the e-mail gate). > 0 → paid: leave "download" EMPTY — same rule as
      tools-data.js (§6 in CLAUDE.md). A paid set routes to purchase.html and
      Roberto e-mails the real GitHub link by hand after checking the transfer,
      exactly like a licence key. NEVER put a paid set's real link here; this
      file is public.
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
    format: "DWG",
    count: { vi: "5×14,5m · 4 tầng", en: "5×14.5m · 4 floors" },
    priceVnd: 125000,
    thumb: "Resource/drawings/townhouse-01/3d.webp",
    screenshots: [
      "Resource/drawings/townhouse-01/3d.webp",
      "Resource/drawings/townhouse-01/elevation.webp",
      "Resource/drawings/townhouse-01/elevation-2.webp",
      "Resource/drawings/townhouse-01/plan.webp"
    ],
    download: ""
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
    format: "DWG",
    count: { vi: "12×20m · 2,5 tầng", en: "12×20m · 2.5 floors" },
    priceVnd: 125000,
    thumb: "Resource/drawings/villa-01/elevation.webp",
    screenshots: [
      "Resource/drawings/villa-01/elevation.webp",
      "Resource/drawings/villa-01/plan.webp",
      "Resource/drawings/villa-01/plan-2.webp"
    ],
    download: ""
  },
  {
    id: "residential-villa-02",
    category: { vi: "Kiến trúc", en: "Architectural" },
    name: { vi: "Biệt thự vườn 2 tầng — 10×10m", en: "Garden Villa 2 Storeys — 10×10m" },
    description: {
      vi: "Bộ hồ sơ kiến trúc cho biệt thự vườn nhỏ gọn, 2 tầng, sân vườn quanh nhà và cầu thang xoắn ốc dẫn lên tầng lửng. Hồ sơ gồm:",
      en: "Architectural set for a compact 2-storey garden villa, garden on all sides and a spiral staircase to the mezzanine. The set includes:"
    },
    contents: [
      { vi: "Kiến trúc", en: "Architecture" },
      { vi: "Phối cảnh nội thất", en: "Interior renders" }
    ],
    format: "DWG",
    count: { vi: "10×10m · 2 tầng", en: "10×10m · 2 floors" },
    priceVnd: 0,
    thumb: "Resource/drawings/villa-02/01.webp",
    screenshots: [
      "Resource/drawings/villa-02/01.webp",
      "Resource/drawings/villa-02/02.webp",
      "Resource/drawings/villa-02/03.webp",
      "Resource/drawings/villa-02/00Living_01.webp",
      "Resource/drawings/villa-02/001Bedroom.webp"
    ],
    download: "https://github.com/Roberto-0720/Villa_02_10x10x2_Release/releases/latest/download/Villa_02_10x10x2.zip"
  },
  {
    id: "residential-townhouse-02",
    category: { vi: "Kiến trúc", en: "Architectural" },
    name: { vi: "Nhà lô phố 4 tầng — 5×19m", en: "4-Storey Townhouse — 5×19m" },
    description: {
      vi: "Bộ hồ sơ thiết kế ĐẦY ĐỦ cho nhà lô phố mái ngói, 4 tầng có gác lửng và sân thượng thờ. Tầng trệt bố trí phòng khách, bếp và phòng ngủ. Hồ sơ nhiều bộ môn:",
      en: "COMPLETE design package for a tiled-roof townhouse, 4 storeys with a mezzanine and a rooftop shrine terrace. Ground floor with living room, kitchen and a bedroom. Multi-discipline set:"
    },
    contents: [
      { vi: "Kiến trúc", en: "Architecture" },
      { vi: "Kết cấu", en: "Structure" },
      { vi: "Điện & Nước (MEP)", en: "Electrical & Plumbing" }
    ],
    format: "DWG",
    count: { vi: "5×19m · 4 tầng", en: "5×19m · 4 floors" },
    priceVnd: 125000,
    thumb: "Resource/drawings/townhouse-02/00.webp",
    screenshots: [
      "Resource/drawings/townhouse-02/00.webp",
      "Resource/drawings/townhouse-02/01.webp",
      "Resource/drawings/townhouse-02/02.webp"
    ],
    download: ""
  },
  {
    id: "residential-townhouse-03",
    category: { vi: "Kiến trúc", en: "Architectural" },
    name: { vi: "Nhà lô phố 4 tầng — 5×20m", en: "4-Storey Townhouse — 5×20m" },
    description: {
      vi: "Bộ hồ sơ thiết kế cho nhà lô phố 4 tầng, tầng trệt để ô tô, phòng khách, kho và bếp ăn thông với sân sau. Hồ sơ gồm:",
      en: "Design set for a 4-storey townhouse; ground floor holds car parking, living room, storage and a kitchen/dining area opening to the back yard. The set includes:"
    },
    contents: [
      { vi: "Kiến trúc", en: "Architecture" },
      { vi: "Kết cấu", en: "Structure" }
    ],
    format: "DWG",
    count: { vi: "5×20m · 4 tầng", en: "5×20m · 4 floors" },
    priceVnd: 0,
    thumb: "Resource/drawings/townhouse-03/01.webp",
    screenshots: [
      "Resource/drawings/townhouse-03/01.webp",
      "Resource/drawings/townhouse-03/02.webp",
      "Resource/drawings/townhouse-03/03.webp"
    ],
    download: "https://github.com/Roberto-0720/Townhouse_03_5x20x4_Release/releases/latest/download/Townhouse_03_5x20x4.zip"
  },
  {
    id: "residential-townhouse-04",
    category: { vi: "Kiến trúc", en: "Architectural" },
    name: { vi: "Nhà lô phố 4 tầng — 6×20m", en: "4-Storey Townhouse — 6×20m" },
    description: {
      vi: "Bộ hồ sơ thiết kế cho nhà lô phố 4 tầng có thông tầng lấy sáng, phòng chơi và phòng giúp việc tầng trệt, sân sau. Hồ sơ nhiều bộ môn:",
      en: "Design set for a 4-storey townhouse with a light-well void, a play room and maid's room at ground level, and a back yard. Multi-discipline set:"
    },
    contents: [
      { vi: "Kiến trúc", en: "Architecture" },
      { vi: "Kết cấu", en: "Structure" },
      { vi: "Điện & Nước (MEP)", en: "Electrical & Plumbing" }
    ],
    format: "DWG",
    count: { vi: "6×20m · 4 tầng", en: "6×20m · 4 floors" },
    priceVnd: 125000,
    thumb: "Resource/drawings/townhouse-04/01.webp",
    screenshots: [
      "Resource/drawings/townhouse-04/01.webp",
      "Resource/drawings/townhouse-04/02.webp",
      "Resource/drawings/townhouse-04/03.webp"
    ],
    download: ""
  },
  {
    id: "residential-townhouse-05",
    category: { vi: "Kiến trúc", en: "Architectural" },
    name: { vi: "Nhà lô phố 4 tầng — 4×21m", en: "4-Storey Townhouse — 4×21m" },
    description: {
      vi: "Bộ hồ sơ thiết kế cho nhà lô phố mặt tiền hẹp 4 tầng, tầng trệt để ô tô, ban công mỗi tầng phía trên. Hồ sơ nhiều bộ môn:",
      en: "Design set for a narrow-frontage 4-storey townhouse; ground-floor car parking, with a balcony on every floor above. Multi-discipline set:"
    },
    contents: [
      { vi: "Kiến trúc", en: "Architecture" },
      { vi: "Kết cấu", en: "Structure" },
      { vi: "Điện & Nước (MEP)", en: "Electrical & Plumbing" }
    ],
    format: "DWG",
    count: { vi: "4×21m · 4 tầng", en: "4×21m · 4 floors" },
    priceVnd: 0,
    thumb: "Resource/drawings/townhouse-05/01.webp",
    screenshots: [
      "Resource/drawings/townhouse-05/01.webp",
      "Resource/drawings/townhouse-05/02.webp",
      "Resource/drawings/townhouse-05/03.webp"
    ],
    download: "https://github.com/Roberto-0720/Townhouse_05_4x21x4_Release/releases/latest/download/Townhouse_05_4x21x4.zip"
  },
  {
    id: "residential-townhouse-06",
    category: { vi: "Kiến trúc", en: "Architectural" },
    name: { vi: "Nhà phố kết hợp kinh doanh 4 tầng — 4×20m", en: "4-Storey Shophouse — 4×20m" },
    description: {
      vi: "Bộ hồ sơ thiết kế cho nhà phố kết hợp kinh doanh, tầng trệt làm mặt bằng kinh doanh, các tầng trên bố trí văn phòng và phòng ngủ. Hồ sơ nhiều bộ môn:",
      en: "Design set for a shop-and-residence townhouse: a business space at ground level, with office and bedroom floors above. Multi-discipline set:"
    },
    contents: [
      { vi: "Kiến trúc", en: "Architecture" },
      { vi: "Kết cấu", en: "Structure" }
    ],
    format: "DWG",
    count: { vi: "4×20m · 4 tầng", en: "4×20m · 4 floors" },
    priceVnd: 0,
    thumb: "Resource/drawings/townhouse-06/02.webp",
    screenshots: [
      "Resource/drawings/townhouse-06/02.webp",
      "Resource/drawings/townhouse-06/01.webp",
      "Resource/drawings/townhouse-06/03.webp"
    ],
    download: "https://github.com/Roberto-0720/Townhouse_06_4x20x4_Release/releases/latest/download/Townhouse_06_4x20x4.zip"
  },
  {
    id: "tuduong-01",
    category: { vi: "Kiến trúc", en: "Architectural" },
    name: { vi: "Từ đường truyền thống — 9×11m", en: "Traditional Ancestral House — 9×11m" },
    description: {
      vi: "Bộ hồ sơ kiến trúc nhà thờ họ (từ đường) phong cách truyền thống: mái ngói cong, cột đồng trụ đá xanh, hoa văn chạm khắc con chồng, kèo, hoành. Hồ sơ gồm:",
      en: "Architectural set for a traditional Vietnamese ancestral worship house: curved tile roof, granite columns, carved timber roof-truss ornamentation. The set includes:"
    },
    contents: [
      { vi: "Kiến trúc", en: "Architecture" },
      { vi: "Chi tiết chạm khắc gỗ", en: "Timber carving details" }
    ],
    format: "DWG",
    count: { vi: "9×11m", en: "9×11m" },
    priceVnd: 0,
    thumb: "Resource/drawings/Tuduong_01/01.webp",
    screenshots: [
      "Resource/drawings/Tuduong_01/01.webp",
      "Resource/drawings/Tuduong_01/02.webp",
      "Resource/drawings/Tuduong_01/03.webp"
    ],
    download: "https://github.com/Roberto-0720/Tuduong_01_09x11/releases/latest/download/Tuduong_01_9x11.zip"
  },
  {
    id: "tuduong-02",
    category: { vi: "Kiến trúc", en: "Architectural" },
    name: { vi: "Từ đường truyền thống — 15×6,5m", en: "Traditional Ancestral House — 15×6.5m" },
    description: {
      vi: "Bộ hồ sơ kiến trúc nhà thờ họ (từ đường) truyền thống, mái ngói, cửa gỗ chạm khắc, kèm chi tiết mặt cắt vì kèo và hoa văn trang trí mái. Hồ sơ gồm:",
      en: "Architectural set for a traditional ancestral house: tiled roof, carved wooden doors, with roof-truss section details and decorative roof ornamentation. The set includes:"
    },
    contents: [
      { vi: "Kiến trúc", en: "Architecture" },
      { vi: "Chi tiết chạm khắc gỗ", en: "Timber carving details" }
    ],
    format: "DWG",
    count: { vi: "15×6,5m", en: "15×6.5m" },
    priceVnd: 0,
    thumb: "Resource/drawings/Tuduong_02/01.webp",
    screenshots: [
      "Resource/drawings/Tuduong_02/01.webp",
      "Resource/drawings/Tuduong_02/02.webp",
      "Resource/drawings/Tuduong_02/03.webp",
      "Resource/drawings/Tuduong_02/04.webp"
    ],
    download: "https://github.com/Roberto-0720/Tuduong_02_15x6.5_Release/releases/latest/download/Tuduong_02_15x6.5.dwg.zip"
  }
];
