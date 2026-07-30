/* ============================================================
   Roberto Structural — TOOLS DATA (single source of truth)
   ------------------------------------------------------------
   ⚠️  THIS FILE IS PUBLIC. Anyone can read it in the browser.
       → NEVER put a paid product's download link here.
       → Paid links live in the Licence Generator (data/products.py, private).

   FIELDS
     id           : slug used in the URL  tool.html?id=<id>
     category     : must match one entry in window.TOOL_CATEGORIES
     name/tagline : bilingual { vi, en }
     version,size,updated,os
     host         : host software required, e.g. "SAP2000" / "General"
     priceVnd     : 0  → free  (public download allowed)
                    >0 → paid  (shows price + "Buy licence" button)
     productCode  : licence code, must match the Licence Generator (paid only)
     status       : "ready"  → published, buyable/downloadable
                    "soon"   → in development, card shows "Coming soon"
     thumb        : cover image; leave "" to use the branded fallback cover
     download     : FREE tools only — GitHub "latest" release link
                    (latest link never changes when you publish a new version)
     checksum     : SHA-256 of the free download (optional, builds trust)

   HOW TO ADD A TOOL: copy a block, fill it in, keep `download:""` if paid.
   Units convention for all tools: SI (kN, m, mm).
   ============================================================ */

window.PRICE_CURRENCY = "VND";

// Master category list — controls the filter buttons and their order.
window.TOOL_CATEGORIES = [
  { vi: "Nền móng & Công trình ngầm", en: "Foundation & Underground" },
  { vi: "Kết cấu thép",               en: "Steel Structural Design" },
  { vi: "Kết cấu BTCT",               en: "RC Structural Design" },
  { vi: "Tính tải trọng",             en: "Loading Calculation" }
];

const CAT_FDN   = { vi: "Nền móng & Công trình ngầm", en: "Foundation & Underground" };
const CAT_STEEL = { vi: "Kết cấu thép",               en: "Steel Structural Design" };
const CAT_RC    = { vi: "Kết cấu BTCT",               en: "RC Structural Design" };
const CAT_LOAD  = { vi: "Tính tải trọng",             en: "Loading Calculation" };

const WIN = "Windows 10/11 (64-bit)";
const REQ_STD = {
  vi: "Windows 10/11 64-bit · Không cần cài đặt phần mềm hỗ trợ · chạy trực tiếp file .exe.",
  en: "Windows 10/11 64-bit · No extra software to install · runs the .exe directly."
};
const REQ_SAP = {
  vi: "Windows 10/11 64-bit · Cần có SAP2000 để xuất/đọc dữ liệu · chạy trực tiếp file .exe.",
  en: "Windows 10/11 64-bit · Requires SAP2000 for data exchange · runs the .exe directly."
};
const REQ_STAAD = {
  vi: "Windows 10/11 64-bit · Cần có STAAD.Pro CONNECT · chạy trực tiếp file .exe.",
  en: "Windows 10/11 64-bit · Requires STAAD.Pro CONNECT · runs the .exe directly."
};
const REQ_CAD = {
  vi: "Windows 10/11 64-bit · Cần AutoCAD hoặc ZWCAD · nạp plugin (.dll) vào CAD.",
  en: "Windows 10/11 64-bit · Requires AutoCAD or ZWCAD · load the plugin (.dll) into CAD."
};

window.TOOLS = [
  /* ==========================================================
     READY — published
     ========================================================== */
  {
    id: "rc-design-output-sap2000",
    category: CAT_RC,
    name: { vi: "Thiết kế BTCT từ kết quả SAP2000", en: "RC Design from SAP2000 Output" },
    tagline: {
      vi: "Đọc nội lực xuất từ SAP2000 và thiết kế cấu kiện bê tông cốt thép, tự động tổng hợp thành bảng tính và báo cáo.",
      en: "Reads member forces exported from SAP2000 and designs reinforced-concrete members, compiling results into tables and a report."
    },
    version: "1.0", size: "—", updated: "2026-07", os: WIN, host: "SAP2000",
    priceVnd: 350000, productCode: "RCSAP", status: "ready",
    thumb: "", screenshots: [],
    features: [
      { vi: "Đọc trực tiếp bảng nội lực xuất từ SAP2000", en: "Reads force tables exported from SAP2000" },
      { vi: "Thiết kế dầm, cột BTCT theo nội lực từng tổ hợp", en: "Designs RC beams and columns for each load combination" },
      { vi: "Tổng hợp kết quả và bố trí thép theo cấu kiện", en: "Summarises results and reinforcement per member" },
      { vi: "Xuất báo cáo tính toán", en: "Exports a calculation report" },
      { vi: "Đơn vị SI (kN, m, mm)", en: "SI units (kN, m, mm)" }
    ],
    requirements: REQ_SAP, download: "", checksum: "", virustotal: ""
  },
  {
    id: "deflection-check",
    category: CAT_STEEL,
    name: { vi: "Kiểm tra độ võng kết cấu", en: "Deflection Check" },
    tagline: {
      vi: "Kiểm tra độ võng cấu kiện và hệ kết cấu từ kết quả SAP2000, đối chiếu với giới hạn cho phép theo tiêu chuẩn.",
      en: "Checks member and system deflections from SAP2000 results against code-permitted limits."
    },
    version: "2.5", size: "—", updated: "2026-07", os: WIN, host: "SAP2000",
    priceVnd: 350000, productCode: "DEFLECT", status: "ready",
    thumb: "", screenshots: [],
    features: [
      { vi: "Kiểm tra độ võng theo từng cấu kiện và từng tổ hợp", en: "Checks deflection per member and per load combination" },
      { vi: "Tự so sánh với giới hạn L/xxx theo tiêu chuẩn", en: "Compares against L/xxx code limits automatically" },
      { vi: "Lọc nhanh cấu kiện không đạt", en: "Quickly filters members that fail" },
      { vi: "Xuất bảng tổng hợp kết quả", en: "Exports a summary table" }
    ],
    requirements: REQ_SAP, download: "", checksum: "", virustotal: ""
  },
  {
    id: "steel-cad-plugin",
    category: CAT_STEEL,
    name: { vi: "Plugin CAD cho kết cấu thép", en: "Steel CAD Plugin" },
    tagline: {
      vi: "Plugin cho AutoCAD/ZWCAD giúp dựng nhanh chi tiết kết cấu thép: tiết diện, liên kết, ký hiệu và thống kê vật liệu.",
      en: "An AutoCAD/ZWCAD plugin that speeds up steel detailing: sections, connections, annotation and material take-off."
    },
    version: "1.0", size: "—", updated: "2026-07", os: WIN, host: "AutoCAD / ZWCAD",
    priceVnd: 350000, productCode: "STEELCAD", status: "ready",
    thumb: "", screenshots: [],
    features: [
      { vi: "Chèn tiết diện thép từ thư viện có sẵn", en: "Inserts steel sections from a built-in library" },
      { vi: "Dựng nhanh chi tiết liên kết điển hình", en: "Draws typical connection details quickly" },
      { vi: "Ghi chú và ký hiệu tự động", en: "Automatic annotation and marking" },
      { vi: "Thống kê khối lượng vật liệu", en: "Material take-off" }
    ],
    requirements: REQ_CAD, download: "", checksum: "", virustotal: ""
  },
  {
    id: "monorail-beam-design",
    category: CAT_STEEL,
    name: { vi: "Thiết kế dầm monorail", en: "Monorail Beam Design" },
    tagline: {
      vi: "Thiết kế và kiểm tra dầm monorail (đường ray treo palăng): uốn, xoắn, ứng suất cục bộ tại cánh dưới và độ võng.",
      en: "Design and check of monorail beams (underhung hoist runways): bending, torsion, local bottom-flange stresses and deflection."
    },
    version: "1.2", size: "—", updated: "2026-07", os: WIN, host: "General",
    priceVnd: 250000, productCode: "MONORAIL", status: "ready",
    thumb: "", screenshots: [],
    features: [
      { vi: "Kiểm tra uốn, cắt và xoắn của dầm ray", en: "Bending, shear and torsion checks of the runway beam" },
      { vi: "Ứng suất cục bộ tại cánh dưới do bánh xe palăng", en: "Local bottom-flange stresses from hoist wheels" },
      { vi: "Kiểm tra độ võng theo giới hạn vận hành", en: "Deflection check against serviceability limits" },
      { vi: "Xuất báo cáo tính toán", en: "Exports a calculation report" }
    ],
    requirements: REQ_STD, download: "", checksum: "", virustotal: ""
  },
  {
    id: "pile-capacity-check",
    category: CAT_FDN,
    name: { vi: "Kiểm tra sức chịu tải cọc", en: "Pile Capacity Check" },
    tagline: {
      vi: "Kiểm tra sức chịu tải dọc trục và ngang của cọc, đối chiếu với phản lực chân cột lấy từ SAP2000.",
      en: "Checks axial and lateral pile capacity against column base reactions taken from SAP2000."
    },
    version: "1.2", size: "—", updated: "2026-07", os: WIN, host: "SAP2000",
    priceVnd: 250000, productCode: "PILECAP", status: "ready",
    thumb: "", screenshots: [],
    features: [
      { vi: "Sức chịu tải cọc theo ma sát thành và mũi cọc", en: "Pile capacity from shaft friction and end bearing" },
      { vi: "Kiểm tra cọc chịu nén, kéo và tải ngang", en: "Checks piles in compression, tension and lateral load" },
      { vi: "Đối chiếu với phản lực từ mô hình SAP2000", en: "Compares against reactions from the SAP2000 model" },
      { vi: "Đơn vị SI (kN, m, mm)", en: "SI units (kN, m, mm)" }
    ],
    requirements: REQ_SAP, download: "", checksum: "", virustotal: ""
  },
  {
    id: "wind-load-vertical-tank",
    category: CAT_LOAD,
    name: { vi: "Tải trọng gió lên bồn đứng", en: "Wind Load on Vertical Tank" },
    tagline: {
      vi: "Tính tải trọng gió tác dụng lên bồn/thiết bị đứng dạng trụ, phân bố theo cao độ và tổng hợp lực chân bồn.",
      en: "Computes wind load on vertical cylindrical tanks and vessels, distributed by elevation with resulting base forces."
    },
    version: "2.1", size: "—", updated: "2026-07", os: WIN, host: "General",
    priceVnd: 250000, productCode: "WINDTANK", status: "ready",
    thumb: "", screenshots: [],
    features: [
      { vi: "Áp lực gió phân bố theo cao độ thân bồn", en: "Wind pressure distributed along the shell height" },
      { vi: "Kể đến hệ số hình dạng và hệ số địa hình", en: "Includes shape and terrain factors" },
      { vi: "Tổng hợp lực cắt và moment tại chân bồn", en: "Base shear and overturning moment" },
      { vi: "Xuất tải trọng để đưa vào mô hình phân tích", en: "Exports loads for the analysis model" }
    ],
    requirements: REQ_STD, download: "", checksum: "", virustotal: ""
  },
  {
    id: "sidesway-check",
    category: CAT_STEEL,
    name: { vi: "Kiểm tra chuyển vị ngang", en: "Sidesway Check" },
    tagline: {
      vi: "Kiểm tra chuyển vị ngang (drift) của khung từ kết quả SAP2000, đối chiếu giới hạn theo tầng và toàn nhà.",
      en: "Checks frame lateral drift from SAP2000 results against storey and overall limits."
    },
    version: "2.3", size: "—", updated: "2026-07", os: WIN, host: "SAP2000",
    priceVnd: 125000, productCode: "SIDESWAY", status: "ready",
    thumb: "", screenshots: [],
    features: [
      { vi: "Chuyển vị ngang theo tầng và toàn bộ chiều cao", en: "Storey drift and overall building drift" },
      { vi: "Đối chiếu giới hạn H/xxx theo tiêu chuẩn", en: "Checks against H/xxx code limits" },
      { vi: "Lọc nhanh tổ hợp/tầng không đạt", en: "Quickly filters failing storeys and combinations" },
      { vi: "Xuất bảng tổng hợp", en: "Exports a summary table" }
    ],
    requirements: REQ_SAP, download: "", checksum: "", virustotal: ""
  },

  /* ---------- FREE tools (public download) ---------- */
  {
    id: "grds-slab-on-grade",
    category: CAT_FDN,
    name: { vi: "Thiết kế sàn nền bê tông (Slab on Grade)", en: "Concrete Slab on Grade Design" },
    tagline: {
      vi: "Kiểm tra, tính toán và thiết kế sàn nền bê tông theo Westergaard / PCA / ACI 360 / TM 5-809-12. Giao diện trực quan, đơn vị SI, xuất báo cáo Excel & HTML.",
      en: "Analysis and design of concrete slabs on grade to Westergaard / PCA / ACI 360 / TM 5-809-12. Intuitive interface, SI units, Excel & HTML report export."
    },
    version: "1.1", size: "63 MB", updated: "2026-07", os: WIN, host: "General",
    priceVnd: 0, productCode: "GRDS", status: "ready",
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
      { vi: "Chạy trực tiếp trên Windows — chỉ cần mở file, không cần cài đặt gì thêm", en: "Runs directly on Windows — just open the file, no installation required" }
    ],
    requirements: REQ_STD,
    // "latest" link — stays valid when a new version is released
    download: "https://github.com/Roberto-0720/05_GroundFloorDesign/releases/latest/download/GRDS.zip",
    checksum: "", virustotal: ""
  },
  {
    id: "seismic-vertical-tank",
    category: CAT_LOAD,
    name: { vi: "Tải trọng động đất lên bồn đứng", en: "Seismic Load on Vertical Tank" },
    tagline: {
      vi: "Tính tải trọng động đất cho bồn/thiết bị đứng: khối lượng impulsive & convective, lực cắt và moment tại chân bồn.",
      en: "Seismic load calculation for vertical tanks and vessels: impulsive and convective masses, base shear and overturning moment."
    },
    version: "2.1", size: "—", updated: "2026-07", os: WIN, host: "General",
    priceVnd: 0, productCode: "SEISTANK", status: "ready",
    thumb: "", screenshots: [],
    features: [
      { vi: "Phân tách khối lượng impulsive và convective của chất lỏng", en: "Separates impulsive and convective liquid masses" },
      { vi: "Phổ phản ứng theo tiêu chuẩn, hệ số vùng và loại đất", en: "Code response spectrum with zone and soil factors" },
      { vi: "Lực cắt và moment lật tại chân bồn", en: "Base shear and overturning moment" },
      { vi: "Xuất tải trọng để đưa vào mô hình phân tích", en: "Exports loads for the analysis model" },
      { vi: "Chạy trực tiếp trên Windows, không cần cài đặt", en: "Runs directly on Windows, no installation" }
    ],
    requirements: REQ_STD,
    download: "https://github.com/Roberto-0720/10_SeismicOnVerTank/releases/latest/download/SeismicOnVerticalTank.zip",
    checksum: "", virustotal: ""
  },

  /* ==========================================================
     IN DEVELOPMENT — shown as "Coming soon"
     When ready: set status:"ready", fill version/size, and either
     add the free `download` latest-link or keep it "" for paid.
     ========================================================== */
  {
    id: "base-plate-design",
    category: CAT_STEEL,
    name: { vi: "Thiết kế bản đế cột (liên kết khớp)", en: "Base Plate Design (Hinge Type)" },
    tagline: {
      vi: "Thiết kế bản đế cột thép dạng liên kết khớp: kích thước bản đế, bulông neo và kiểm tra ép mặt bê tông.",
      en: "Design of hinged steel column base plates: plate sizing, anchor bolts and concrete bearing checks."
    },
    version: "2.2", size: "—", updated: "—", os: WIN, host: "SAP2000",
    priceVnd: 350000, productCode: "BASEPLATE", status: "soon",
    thumb: "", screenshots: [], features: [], requirements: REQ_SAP,
    download: "", checksum: "", virustotal: ""
  },
  {
    id: "crane-girder-design",
    category: CAT_STEEL,
    name: { vi: "Thiết kế dầm cầu trục", en: "Crane Girder Design" },
    tagline: {
      vi: "Thiết kế dầm đỡ cầu trục: tổ hợp tải trọng cầu trục, kiểm tra uốn – xoắn, mỏi và độ võng.",
      en: "Design of crane runway girders: crane load combinations, bending–torsion, fatigue and deflection checks."
    },
    version: "2.0", size: "—", updated: "—", os: WIN, host: "General",
    priceVnd: 250000, productCode: "CRANEGIRDER", status: "soon",
    thumb: "", screenshots: [], features: [], requirements: REQ_STD,
    download: "", checksum: "", virustotal: ""
  },
  {
    id: "rc-corbel-design",
    category: CAT_RC,
    name: { vi: "Thiết kế vai cột BTCT", en: "RC Corbel Design" },
    tagline: {
      vi: "Thiết kế vai cột (corbel) bê tông cốt thép theo mô hình giàn ảo: cốt thép chính, cốt ngang và kiểm tra ép mặt.",
      en: "Strut-and-tie design of reinforced-concrete corbels: main and horizontal reinforcement, bearing checks."
    },
    version: "1.0", size: "—", updated: "—", os: WIN, host: "General",
    priceVnd: 250000, productCode: "RCCORBEL", status: "soon",
    thumb: "", screenshots: [], features: [], requirements: REQ_STD,
    download: "", checksum: "", virustotal: ""
  },
  {
    id: "embedded-plate-design",
    category: CAT_RC,
    name: { vi: "Thiết kế bản thép chờ (embedded plate)", en: "Embedded Plate Design" },
    tagline: {
      vi: "Thiết kế bản thép chôn trong bê tông: bố trí chốt neo, kiểm tra kéo/cắt và phá hoại bê tông theo ACI 318 Phụ lục D.",
      en: "Design of plates embedded in concrete: stud layout, tension/shear checks and concrete breakout per ACI 318 App. D."
    },
    version: "1.0", size: "—", updated: "—", os: WIN, host: "General",
    priceVnd: 250000, productCode: "EMBPLATE", status: "soon",
    thumb: "", screenshots: [], features: [], requirements: REQ_STD,
    download: "", checksum: "", virustotal: ""
  },
  {
    id: "shallow-foundation-stability",
    category: CAT_FDN,
    name: { vi: "Kiểm tra ổn định móng nông", en: "Shallow Foundation Stability" },
    tagline: {
      vi: "Kiểm tra ổn định móng nông: sức chịu tải nền, chống lật, chống trượt và áp lực đáy móng.",
      en: "Stability checks for shallow foundations: bearing capacity, overturning, sliding and base pressure."
    },
    version: "2.1", size: "—", updated: "—", os: WIN, host: "SAP2000",
    priceVnd: 0, productCode: "SHALLOWFDN", status: "soon",
    thumb: "", screenshots: [], features: [], requirements: REQ_SAP,
    download: "", checksum: "", virustotal: ""
  },
  {
    id: "piled-foundation-design",
    category: CAT_FDN,
    name: { vi: "Thiết kế móng cọc", en: "Piled Foundation Design" },
    tagline: {
      vi: "Thiết kế đài cọc và phân phối tải lên nhóm cọc, kiểm tra đài chịu uốn và chọc xuyên.",
      en: "Pile-cap design with load distribution to the pile group, cap flexure and punching-shear checks."
    },
    version: "2.1", size: "—", updated: "—", os: WIN, host: "SAP2000",
    priceVnd: 125000, productCode: "PILEDFDN", status: "soon",
    thumb: "", screenshots: [], features: [], requirements: REQ_SAP,
    download: "", checksum: "", virustotal: ""
  },
  {
    id: "octagon-eq-foundation",
    category: CAT_FDN,
    name: { vi: "Thiết kế móng bát giác cho thiết bị", en: "Octagonal Equipment Foundation Design" },
    tagline: {
      vi: "Thiết kế móng bát giác cho bồn/thiết bị đứng: kiểm tra ổn định, áp lực đáy móng và cốt thép đài móng.",
      en: "Design of octagonal foundations for vertical vessels: stability, base pressure and mat reinforcement."
    },
    version: "1.0", size: "—", updated: "—", os: WIN, host: "SAP2000",
    priceVnd: 125000, productCode: "OCTAGONEQ", status: "soon",
    thumb: "", screenshots: [], features: [], requirements: REQ_SAP,
    download: "", checksum: "", virustotal: ""
  },
  {
    id: "staad-unbraced-length",
    category: CAT_LOAD,
    name: { vi: "Tính chiều dài tính toán (STAAD.Pro)", en: "STAAD Unbraced Length Calculator" },
    tagline: {
      vi: "Xác định chiều dài không giằng và hệ số chiều dài tính toán cho cấu kiện trong mô hình STAAD.Pro.",
      en: "Determines unbraced lengths and effective-length factors for members in a STAAD.Pro model."
    },
    version: "2.1", size: "—", updated: "—", os: WIN, host: "STAAD.Pro CONNECT",
    priceVnd: 150000, productCode: "STAADUL", status: "soon",
    thumb: "", screenshots: [], features: [], requirements: REQ_STAAD,
    download: "", checksum: "", virustotal: ""
  },
  {
    id: "sap-unbraced-length",
    category: CAT_LOAD,
    name: { vi: "Tính chiều dài tính toán (SAP2000)", en: "SAP Unbraced Length Calculator" },
    tagline: {
      vi: "Xác định chiều dài không giằng và gán tham số thiết kế cho cấu kiện trong mô hình SAP2000.",
      en: "Determines unbraced lengths and assigns design parameters for members in a SAP2000 model."
    },
    version: "2.0", size: "—", updated: "—", os: WIN, host: "SAP2000",
    priceVnd: 125000, productCode: "SAPUL", status: "soon",
    thumb: "", screenshots: [], features: [], requirements: REQ_SAP,
    download: "", checksum: "", virustotal: ""
  },
  {
    id: "staad-loading-assignment",
    category: CAT_LOAD,
    name: { vi: "Gán tải trọng tự động (STAAD.Pro)", en: "STAAD.Pro Loading Assignment" },
    tagline: {
      vi: "Gán tải trọng hàng loạt vào mô hình STAAD.Pro và sinh tổ hợp tải trọng tự động.",
      en: "Batch-assigns loads to a STAAD.Pro model and generates load combinations automatically."
    },
    version: "1.0", size: "—", updated: "—", os: WIN, host: "STAAD.Pro CONNECT",
    priceVnd: 250000, productCode: "STAADLOAD", status: "soon",
    thumb: "", screenshots: [], features: [], requirements: REQ_STAAD,
    download: "", checksum: "", virustotal: ""
  }
];
