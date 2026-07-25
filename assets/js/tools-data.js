/* ============================================================
   Roberto Structural — TOOLS DATA (single source of truth)
   ------------------------------------------------------------
   HOW TO ADD A NEW TOOL:
   1. Copy one { ... } block below and paste it into the array.
   2. Change "id" to a unique short slug (used in the URL: tool.html?id=YOUR_ID).
   3. Fill in name / tagline / features (both vi + en).
   4. Put screenshots in  Resource/tools/  and list their paths in "screenshots".
   5. Upload the .exe/.zip to a GitHub Release, copy the asset link into "download".
      (See HUONG_DAN_TOOLS.md for the full release + checksum workflow.)
   6. Leave "download" as "" while the file is not ready -> the card shows "Coming soon".
   Units convention for all tools: SI (kN, m, mm).
   ============================================================ */

// Master category list — controls the filter buttons and their order.
// Every tool's "category" below must match one of these (by the English name).
window.TOOL_CATEGORIES = [
  { vi: "Nền móng & Công trình ngầm", en: "Foundation & Underground" },
  { vi: "Kết cấu thép",               en: "Steel Structural Design" },
  { vi: "Kết cấu BTCT",               en: "RC Structural Design" },
  { vi: "Tính tải trọng",             en: "Loading Calculation" }
];

window.TOOLS = [
  {
    id: "grds-slab-on-grade",
    category: { vi: "Nền móng & Công trình ngầm", en: "Foundation & Underground" },
    name: { vi: "Thiết kế sàn nền bê tông (Slab on Grade)", en: "Concrete Slab on Grade Design" },
    tagline: {
      vi: "Kiểm tra, tính toán và thiết kế sàn nền bê tông (ground floor on grade) theo Westergaard / PCA / ACI 360 / TM 5-809-12. Giao diện trực quan, đơn vị SI, xuất báo cáo Excel & HTML.",
      en: "Analysis and design of concrete slabs on grade to Westergaard / PCA / ACI 360 / TM 5-809-12. Intuitive interface, SI units, Excel & HTML report export."
    },
    version: "1.0",
    size: "63 MB",
    updated: "2026-07",
    os: "Windows 10/11 (64-bit)",
    price: { vi: "Miễn phí dùng thử", en: "Free trial" },
    thumb: "Resource/tools/grds/01.png",
    screenshots: [
      "Resource/tools/grds/01.png",
      "Resource/tools/grds/04.png",
      "Resource/tools/grds/05.png",
      "Resource/tools/grds/03.png",
      "Resource/tools/grds/02.png"
    ],
    features: [
      { vi: "3 trường hợp tải: tải tập trung/bánh xe, tải tường liên tục, tải phân bố đều", en: "3 load cases: concentrated/wheel, continuous wall, uniform load" },
      { vi: "Kiểm tra uốn, ép mặt, xuyên thủng và truyền lực qua thanh chốt (dowel)", en: "Flexure, bearing, punching shear and dowel bearing checks" },
      { vi: "Cốt thép co ngót/nhiệt độ và kiểm tra bề rộng vết nứt", en: "Shrinkage/temperature reinforcement and crack-width check" },
      { vi: "Tự động tìm chiều dày sàn tối thiểu cho từng trường hợp tải", en: "Automatic minimum slab-thickness search for each load case" },
      { vi: "Tab tra cứu: k theo loại đất, tải xe nâng, chọn dowel, tính diện tích tiếp xúc Ac", en: "Reference tab: subgrade k by soil, lift-truck loads, dowel selection, contact-area calculator" },
      { vi: "Xuất báo cáo Excel (.xlsx) hoặc HTML in được", en: "Export printable Excel (.xlsx) or HTML report" },
      { vi: "Đơn vị SI (kN, mm, MPa, kPa, MN/m³) — đối chiếu khớp bảng tính GRDSLAB gốc", en: "SI units (kN, mm, MPa, kPa, MN/m³) — verified against the original GRDSLAB sheet" },
      { vi: "Chạy trực tiếp trên Windows — chỉ cần mở file, không cần cài đặt gì thêm", en: "Runs directly on Windows — just open the file, no installation required" }
    ],
    requirements: {
      vi: "Windows 10/11 64-bit · Không cần cài đặt phần mềm hỗ trợ · ~150 MB dung lượng trống.",
      en: "Windows 10/11 64-bit · No extra software to install · ~150 MB free space."
    },
    download: "https://github.com/Roberto-0720/20260710_GRDSV1.0/releases/download/grds-v1.0/GRDS_v1.0.zip",
    checksum: "A323F0D3C3C2F25F7464D5F4CD433FE678DA735F2D6D1167CFA39C81D22EB04A",
    virustotal: ""
  },
  {
    id: "steel-member-check",
    category: { vi: "Kết cấu thép", en: "Steel Structural Design" },
    name: { vi: "Thiết kế kết cấu thép", en: "Steel Member Check" },
    tagline: {
      vi: "Kiểm tra dầm, cột và thanh giàn theo AISC / Eurocode 3 với thư viện tiết diện thép.",
      en: "Check beams, columns and truss members to AISC / Eurocode 3 with a steel section library."
    },
    version: "1.0.0",
    size: "42 MB",
    updated: "2026-06",
    os: "Windows 10/11 (64-bit)",
    price: { vi: "Miễn phí dùng thử", en: "Free trial" },
    thumb: "Resource/07.png",
    screenshots: ["Resource/07.png", "Resource/03.png", "Resource/02.png"],
    features: [
      { vi: "Kiểm tra dầm, cột, thanh giàn", en: "Beam, column, truss member checks" },
      { vi: "Theo AISC 360 / Eurocode 3", en: "To AISC 360 / Eurocode 3" },
      { vi: "Thư viện tiết diện thép có sẵn", en: "Built-in steel section library" },
      { vi: "Kiểm tra ổn định & độ mảnh", en: "Stability & slenderness checks" },
      { vi: "Chạy trực tiếp trên Windows, không cần cài đặt gì thêm", en: "Runs directly on Windows, no installation required" }
    ],
    requirements: {
      vi: "Windows 10/11 64-bit · Không cần cài đặt phần mềm hỗ trợ · ~110 MB dung lượng trống.",
      en: "Windows 10/11 64-bit · No extra software to install · ~110 MB free space."
    },
    download: "",
    checksum: "",
    virustotal: ""
  },
  {
    id: "load-combinator",
    category: { vi: "Tính tải trọng", en: "Loading Calculation" },
    name: { vi: "Tải trọng & tổ hợp", en: "Load Combinator" },
    tagline: {
      vi: "Tự động sinh tổ hợp tải trọng (gió, động đất, nhiệt độ) và xuất sang phần mềm phân tích.",
      en: "Auto-generate load combinations (wind, seismic, thermal) and export to analysis software."
    },
    version: "1.0.0",
    size: "26 MB",
    updated: "2026-06",
    os: "Windows 10/11 (64-bit)",
    price: { vi: "Miễn phí dùng thử", en: "Free trial" },
    thumb: "Resource/01.png",
    screenshots: ["Resource/01.png", "Resource/05.png", "Resource/06.png"],
    features: [
      { vi: "Tự động sinh tổ hợp tải trọng", en: "Automatic load-combination generator" },
      { vi: "Gió, động đất, nhiệt độ, tĩnh/hoạt tải", en: "Wind, seismic, thermal, dead/live loads" },
      { vi: "Theo TCVN & ASCE 7", en: "To TCVN & ASCE 7" },
      { vi: "Chạy trực tiếp trên Windows, không cần cài đặt gì thêm", en: "Runs directly on Windows, no installation required" }
    ],
    requirements: {
      vi: "Windows 10/11 64-bit · Không cần cài đặt phần mềm hỗ trợ · ~80 MB dung lượng trống.",
      en: "Windows 10/11 64-bit · No extra software to install · ~80 MB free space."
    },
    download: "",
    checksum: "",
    virustotal: ""
  }
];
