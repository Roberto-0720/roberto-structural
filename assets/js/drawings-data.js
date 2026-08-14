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

/* Tên hằng có tiền tố D- (DCAT_) chứ không phải CAT_ như tools-data.js: cả hai
   file cùng được nạp trong purchase.html, mà `const` trùng tên ở cấp cao nhất là
   SyntaxError — cả trang thanh toán chết ngay, không phải chỉ hỏng một chỗ. */
const DCAT_STEEL = { vi: "Kết cấu thép",       en: "Steel Structural" };
const DCAT_RC    = { vi: "Kết cấu BTCT",       en: "RC Structure" };
const DCAT_ARCH  = { vi: "Kiến trúc",          en: "Architectural" };
const DCAT_STD   = { vi: "Chi tiết điển hình", en: "Standard Details" };

/* Thứ tự ở đây CHÍNH LÀ thứ tự tab trên trang. Kiến trúc (nhà dân) xếp cuối —
   site nói về kết cấu công nghiệp nên chi tiết điển hình phải lên trước. */
window.DRAWING_CATEGORIES = [ DCAT_STEEL, DCAT_RC, DCAT_STD, DCAT_ARCH ];

window.DRAWINGS = [

  /* ==================================================================
     CHI TIẾT ĐIỂN HÌNH — KẾT CẤU CÔNG NGHIỆP
     Mỗi bộ thuộc HAI nhóm: "Chi tiết điển hình" (nhóm chính, hiện trên
     huy hiệu thẻ) + "Kết cấu thép" hoặc "Kết cấu BTCT" để lọc.
     Tất cả miễn phí, giao qua link Drive công khai — không qua trang
     thanh toán. Nguồn: softwarelist.xlsx sheet "Drawing", dòng 14–23.
     ================================================================== */
  {
    id: "std-base-plate",
    category: DCAT_STD, categories: [DCAT_STD, DCAT_STEEL],
    name: { vi: "Chi tiết bản đế cột thép", en: "Steel Column Base Plate Details" },
    description: {
      vi: "Bản đế chân cột thép tra sẵn theo tiết diện cột, kèm bố trí lỗ bu-lông neo và bệ bê tông bên dưới.",
      en: "Column base plates tabulated by column section, with anchor-bolt hole layout and the concrete pedestal below."
    },
    contents: [
      { vi: "Bảng tra theo tiết diện cột", en: "Table by column section" },
      { vi: "Bố trí lỗ bu-lông neo", en: "Anchor-bolt hole layout" },
      { vi: "Bản đệm (plate washer)", en: "Plate washer" },
      { vi: "Bệ bê tông", en: "Concrete pedestal" }
    ],
    format: "DWG",
    count: { vi: "4 nhóm tiết diện", en: "4 section groups" },
    priceVnd: 0,
    thumb: "Resource/drawings/baseplate/01.webp",
    screenshots: ["Resource/drawings/baseplate/01.webp", "Resource/drawings/baseplate/02.webp"],
    download: "https://drive.google.com/file/d/1a-Y1TBswKntRa9guBDLZ7g7m1nF26i59/view?usp=drive_link"
  },
  {
    id: "std-single-shear-connection",
    category: DCAT_STD, categories: [DCAT_STD, DCAT_STEEL],
    name: { vi: "Liên kết chịu cắt một bản mã", en: "Single Plate Shear Connection" },
    description: {
      vi: "Liên kết dầm bằng một bản mã, tra sẵn theo tiết diện dầm, dùng bu-lông cường độ cao M20.",
      en: "Beam shear connection on a single plate, tabulated by beam section, using M20 high-strength bolts."
    },
    contents: [
      { vi: "Bảng tra theo tiết diện dầm", en: "Table by beam section" },
      { vi: "Bu-lông cường độ cao M20", en: "M20 high-strength bolts" },
      { vi: "Bản mã dày 10", en: "10 mm gusset plate" },
      { vi: "Cắt vát bụng dầm (scallop)", en: "Web scallop" }
    ],
    format: "DWG",
    count: { vi: "2 nhóm tiết diện", en: "2 section groups" },
    priceVnd: 0,
    thumb: "Resource/drawings/single_shear_conn/01.webp",
    screenshots: ["Resource/drawings/single_shear_conn/01.webp", "Resource/drawings/single_shear_conn/02.webp"],
    download: "https://drive.google.com/file/d/1CXcVoB5rKRYKF_dpYxR9GO2P4EikteBT/view?usp=drive_link"
  },
  {
    id: "std-welding",
    category: DCAT_STD, categories: [DCAT_STD, DCAT_STEEL],
    name: { vi: "Chi tiết mối hàn & ký hiệu hàn", en: "Welding Details & Symbols" },
    description: {
      vi: "Mối hàn rãnh vát hai phía ngấu hoàn toàn, kèm cách ghi ký hiệu hàn cho mối nối đối đầu và mối nối chữ T.",
      en: "Double-bevel full-penetration groove welds, with the welding symbols for butt joints and T-joints."
    },
    contents: [
      { vi: "Hàn rãnh vát hai phía", en: "Double-bevel groove weld" },
      { vi: "Ngấu hoàn toàn (full penetration)", en: "Full penetration" },
      { vi: "Ký hiệu mối nối đối đầu", en: "Butt-joint symbol" },
      { vi: "Ký hiệu mối nối chữ T", en: "T-joint symbol" }
    ],
    format: "DWG",
    count: { vi: "2 dạng mối nối", en: "2 joint types" },
    priceVnd: 0,
    thumb: "Resource/drawings/Welding/01.webp",
    screenshots: ["Resource/drawings/Welding/01.webp", "Resource/drawings/Welding/02.webp"],
    download: "https://drive.google.com/file/d/1COlxJ7Dl7ZnNoazLUaENaRgE-T-tzJPa/view?usp=drive_link"
  },
  {
    id: "std-rc-deck-on-steel",
    category: DCAT_STD, categories: [DCAT_STD, DCAT_STEEL],
    name: { vi: "Sàn BTCT trên tôn sóng", en: "RC Deck on Steel Decking" },
    description: {
      vi: "Sàn bê tông cốt thép đổ trên tôn sóng: liên kết khớp dầm–cột hai kiểu, đinh chống cắt, khe nối và mát-tít chèn.",
      en: "Reinforced concrete slab on steel decking: two beam-to-column pin connection types, shear studs, joint filler and sealant."
    },
    contents: [
      { vi: "Liên kết khớp dầm–cột kiểu A", en: "Beam–column pin connection type A" },
      { vi: "Liên kết khớp dầm–cột kiểu B", en: "Beam–column pin connection type B" },
      { vi: "Đinh chống cắt", en: "Shear studs" },
      { vi: "Khe nối & mát-tít chèn", en: "Joint filler & sealant" }
    ],
    format: "DWG",
    count: { vi: "2 kiểu liên kết", en: "2 connection types" },
    priceVnd: 0,
    thumb: "Resource/drawings/rc_deck/01.webp",
    screenshots: ["Resource/drawings/rc_deck/01.webp", "Resource/drawings/rc_deck/02.webp"],
    download: "https://drive.google.com/file/d/1kCZKpA2qCIxUr9BNgQwhH-tppIl3H-VL/view?usp=drive_link"
  },
  {
    id: "std-handrail-grating",
    category: DCAT_STD, categories: [DCAT_STD, DCAT_STEEL],
    name: { vi: "Lan can & sàn grating", en: "Handrail & Grating Details" },
    description: {
      vi: "Lan can ống thép DN32/DN25 với cột lan can, tấm chắn chân và sàn grating, kèm chi tiết nối tại hiện trường.",
      en: "DN32/DN25 pipe handrail with posts, toe plate and grating, including the field splice details."
    },
    contents: [
      { vi: "Tay vịn trên & giữa", en: "Top & mid rail" },
      { vi: "Cột lan can", en: "Handrail post" },
      { vi: "Tấm chắn chân", en: "Toe plate" },
      { vi: "Sàn grating", en: "Grating" },
      { vi: "Mối nối tại hiện trường", en: "Field splice" }
    ],
    format: "DWG",
    count: { vi: "Lan can & grating", en: "Handrail & grating" },
    priceVnd: 0,
    thumb: "Resource/drawings/handrail_grating/01.webp",
    screenshots: ["Resource/drawings/handrail_grating/01.webp", "Resource/drawings/handrail_grating/02.webp"],
    download: "https://drive.google.com/file/d/1zr5HMj-OUnu0ESmHT2BLTMtxpTh7r8R-/view?usp=drive_link"
  },
  {
    id: "std-ladder-cage",
    category: DCAT_STD, categories: [DCAT_STD, DCAT_STEEL],
    name: { vi: "Thang leo & lồng bảo hiểm", en: "Ladder & Safety Cage" },
    description: {
      vi: "Thang leo thẳng đứng có lồng bảo hiểm và cổng an toàn, kèm mặt cắt tại chân lồng và tại gối đỡ.",
      en: "Vertical caged ladder with safety gate, including sections at the base of the cage and at the support."
    },
    contents: [
      { vi: "Thang & bậc leo", en: "Ladder & rungs" },
      { vi: "Lồng bảo hiểm", en: "Safety cage" },
      { vi: "Cổng an toàn", en: "Safety gate" },
      { vi: "Mặt cắt chân lồng", en: "Section at cage base" },
      { vi: "Chi tiết gối đỡ", en: "Support detail" }
    ],
    format: "DWG",
    count: { vi: "Thang & lồng", en: "Ladder & cage" },
    priceVnd: 0,
    thumb: "Resource/drawings/ladder_stair/01.webp",
    screenshots: ["Resource/drawings/ladder_stair/01.webp", "Resource/drawings/ladder_stair/02.webp",
                  "Resource/drawings/ladder_stair/03.webp"],
    download: "https://drive.google.com/file/d/1Hs8TRJtQB14x47dqxrEQONvOlG82n7oX/view?usp=drive_link"
  },
  {
    id: "std-anchor-bolt",
    category: DCAT_STD, categories: [DCAT_STD, DCAT_RC],
    name: { vi: "Chi tiết bu-lông neo", en: "Anchor Bolt Details" },
    description: {
      vi: "Bốn kiểu bu-lông neo điển hình cho chân cột và bệ thiết bị, kèm ê-cu, vòng đệm và bản đệm.",
      en: "Four typical anchor-bolt types for column bases and equipment pedestals, with nuts, washers and plate washers."
    },
    contents: [
      { vi: "Bốn kiểu TYPE-1 đến TYPE-4", en: "Four types: TYPE-1 to TYPE-4" },
      { vi: "Ê-cu & vòng đệm", en: "Nuts & washers" },
      { vi: "Bản đệm", en: "Plate washer" },
      { vi: "Chiều dài neo", en: "Embedment length" }
    ],
    format: "DWG",
    count: { vi: "4 kiểu", en: "4 types" },
    priceVnd: 0,
    thumb: "Resource/drawings/anchor_bolt/01.webp",
    screenshots: ["Resource/drawings/anchor_bolt/01.webp", "Resource/drawings/anchor_bolt/02.webp"],
    download: "https://drive.google.com/file/d/1285L_r5iwMohPfvfE0hcpukS2ikysa7J/view?usp=drive_link"
  },
  {
    id: "std-rebar-arrangement",
    category: DCAT_STD, categories: [DCAT_STD, DCAT_RC],
    name: { vi: "Bố trí cốt thép quanh bu-lông neo", en: "Rebar Arrangement at Anchor Bolts" },
    description: {
      vi: "Bố trí cốt đai quanh cụm bu-lông neo, hai kiểu theo đường kính đai, kèm lớp vữa rót dày 25 mm.",
      en: "Tie arrangement around the anchor-bolt group, two types by hoop diameter, with a 25 mm grout bed."
    },
    contents: [
      { vi: "Kiểu 1 — đai D10", en: "Type 1 — D10 hoops" },
      { vi: "Kiểu 2 — đai D13 trở lên", en: "Type 2 — D13 hoops or bigger" },
      { vi: "Vữa rót dày 25 mm", en: "25 mm grout" },
      { vi: "Thanh giằng", en: "Tie bars" }
    ],
    format: "DWG",
    count: { vi: "2 kiểu đai", en: "2 hoop types" },
    priceVnd: 0,
    thumb: "Resource/drawings/rebar_arrangement/01.webp",
    screenshots: ["Resource/drawings/rebar_arrangement/01.webp", "Resource/drawings/rebar_arrangement/02.webp",
                  "Resource/drawings/rebar_arrangement/03.webp"],
    download: "https://drive.google.com/file/d/1Yid_aj_Yh0i6tIKZ90yRIgK07oARE_oL/view?usp=drive_link"
  },
  {
    id: "std-equipment-foundation",
    category: DCAT_STD, categories: [DCAT_STD, DCAT_RC],
    name: { vi: "Chi tiết móng thiết bị", en: "Equipment Foundation Details" },
    description: {
      vi: "Móng đơn đỡ thiết bị: bệ bê tông, cốt thép bệ, thanh hairpin và lớp bê tông bảo vệ.",
      en: "Isolated equipment foundation: concrete pedestal, pedestal reinforcement, hairpin bars and concrete cover."
    },
    contents: [
      { vi: "Bệ & móng", en: "Pedestal & footing" },
      { vi: "Cốt thép bệ", en: "Pedestal reinforcement" },
      { vi: "Thanh hairpin", en: "Hairpin bars" },
      { vi: "Lớp bê tông bảo vệ", en: "Concrete cover" }
    ],
    format: "DWG",
    count: { vi: "Mặt cắt & cốt thép", en: "Section & rebar" },
    priceVnd: 0,
    thumb: "Resource/drawings/equipment_fdn/01.webp",
    screenshots: ["Resource/drawings/equipment_fdn/01.webp", "Resource/drawings/equipment_fdn/02.webp",
                  "Resource/drawings/equipment_fdn/03.webp"],
    download: "https://drive.google.com/file/d/12_CsXvEuJG70WXhiJLqP3txDySCRbq_4/view?usp=drive_link"
  },
  {
    id: "std-paving-joint",
    category: DCAT_STD, categories: [DCAT_STD, DCAT_RC],
    name: { vi: "Khe nối sân đường bê tông", en: "Concrete Paving Joint Details" },
    description: {
      vi: "Bốn loại khe cho sân đường bê tông tải nhẹ: mép tự do, khe thi công, khe co giãn và khe co ngót.",
      en: "Four light-duty concrete paving joints: free edge, construction joint, expansion joint and contraction joint."
    },
    contents: [
      { vi: "Mép tự do", en: "Free edge" },
      { vi: "Khe thi công", en: "Construction joint" },
      { vi: "Khe co giãn", en: "Expansion joint" },
      { vi: "Khe co ngót", en: "Contraction joint" }
    ],
    format: "DWG",
    count: { vi: "4 loại khe", en: "4 joint types" },
    priceVnd: 0,
    thumb: "Resource/drawings/paving_joint/01.webp",
    screenshots: ["Resource/drawings/paving_joint/01.webp", "Resource/drawings/paving_joint/02.webp"],
    download: "https://drive.google.com/file/d/1ix8vYGs4SKSQQ31mi8yw2UbWt5YSrxLz/view?usp=drive_link"
  },

  /* ================= NHÀ DÂN — KIẾN TRÚC ================= */
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
    priceVnd: 50000,
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
    priceVnd: 50000,
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
    priceVnd: 50000,
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
    priceVnd: 50000,
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
