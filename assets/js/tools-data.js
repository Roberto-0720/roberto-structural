/* ============================================================
   Roberto Structural — TOOLS DATA (single source of truth)
   Source of record: Resource/software_list/softwarelist.xlsx (sheet "Python Tool")
   ------------------------------------------------------------
   ⚠️  THIS FILE IS PUBLIC. Anyone can read it in the browser.
       → NEVER put a paid product's download link here.
       → Paid links live in the Licence Generator (data/products.py, private).

   FIELDS
     id           : slug used in the URL  tool.html?id=<id>
     category     : must match one entry in window.TOOL_CATEGORIES
     name/tagline : bilingual { vi, en }
     version, size, updated, os
     host         : host software required, e.g. "SAP2000" / "General"
     priceVnd     : 0  → free  (public download allowed)
                    >0 → paid  (shows price + "Buy licence" button)
     productCode  : licence code, must match the Licence Generator
     status       : "ready" → published · "soon" → in development
     thumb        : card cover; "" uses the branded fallback cover
     screenshots  : gallery on the detail page
     download     : FREE tools only — GitHub "latest" link (never changes
                    when a new version is released)

   HOW TO ADD A TOOL: copy a block, fill it in, keep `download:""` if paid.
   Units convention for all tools: SI (kN, m, mm).
   ============================================================ */

window.PRICE_CURRENCY = "VND";

window.TOOL_CATEGORIES = [
  { vi: "Nền móng & Công trình ngầm", en: "Foundation & Underground" },
  { vi: "Kết cấu thép", en: "Steel Structural Design" },
  { vi: "Kết cấu BTCT", en: "RC Structural Design" },
  { vi: "Tính tải trọng", en: "Loading Calculation" }
];

const CAT_FDN = { vi: "Nền móng & Công trình ngầm", en: "Foundation & Underground" };
const CAT_STEEL = { vi: "Kết cấu thép", en: "Steel Structural Design" };
const CAT_RC = { vi: "Kết cấu BTCT", en: "RC Structural Design" };
const CAT_LOAD = { vi: "Tính tải trọng", en: "Loading Calculation" };

const WIN = "Windows";
const PIC = "Resource/tools/";   // screenshot root

const REQ_STD = { vi: "Windows", en: "Windows" };
const REQ_SAP = { vi: "Windows / SAP2000", en: "Windows / SAP2000" };
const REQ_STAAD = { vi: "Windows / STAAD.Pro", en: "Windows / STAAD.Pro" };
const REQ_CAD = { vi: "Windows / AutoCAD", en: "Windows / AutoCAD" };

window.TOOLS = [
  /* ==========================================================
     PUBLISHED
     ========================================================== */

  /* ---- 01 ---- */
  {
    id: "rc-design-output-sap2000",
    category: CAT_RC,
    name: { vi: "Thiết kế BTCT từ kết quả SAP2000", en: "RC Design Output — SAP2000" },
    tagline: {
      vi: "Kết nối Mô hình SAP2000, đọc kết quả thiết kế bê tông và chuyển thành bảng thống kê thép hoàn chỉnh cho từng nhóm cấu kiện — kèm kiểm tra OK/NG trực tiếp và báo cáo Excel.",
      en: "Connects live to a running SAP2000 model, pulls concrete frame design results and turns them into a complete rebar schedule per member group — with live OK/NG checking and a polished Excel report."
    },
    version: "1.0", size: "~34 MB", updated: "2026-08", os: WIN, host: "SAP2000",
    priceVnd: 250000, productCode: "RCSAP", status: "ready",
    thumb: PIC + "web_description_01/00_cover.webp",
    screenshots: [PIC + "web_description_01/01.webp", PIC + "web_description_01/02.webp", PIC + "web_description_01/03.webp", PIC + "web_description_01/04.webp"],
    features: [
      { vi: "Kết nối trực tiếp SAP2000", en: "Live SAP2000 connection" },
      { vi: "Tự đọc tiết diện, f'c, fy, fyt, lớp bảo vệ...", en: "Section size, f'c, fy, fyt, cover..." },
      { vi: "Kiểm tra nút khung: lực cắt nút và tỉ số khả năng dầm/cột (6/5) cho khung kháng chấn", en: "Joint check: joint shear and (6/5) beam/column capacity ratios for seismic frames" },
      { vi: "<b>Tự đề xuất thép</b> ngay khi có dữ liệu", en: "<b>Auto rebar suggestion</b> the moment data arrives" },
      { vi: "Xuất Excel (.xlsx) theo đúng bố cục bảng tính quen thuộc, kèm dữ liệu thô từng station", en: "Excel export (.xlsx) mirroring the familiar legacy sheet layout, including raw station data" },
      { vi: "Lưu/mở dự án (.rcdproj) — chỉnh thép và xuất lại sau mà <b>không cần mở SAP2000</b>", en: "Save/open project (.rcdproj) — tweak rebar and re-export later <b>without SAP2000 running</b>" }
    ],
    requirements: REQ_SAP, download: "", checksum: "", virustotal: ""
  },

  /* ---- 03 ---- */
  {
    id: "deflection-check",
    category: CAT_STEEL,
    name: { vi: "Kiểm tra độ võng dầm thép", en: "Deflection Check" },
    tagline: {
      vi: "Kiểm tra độ võng dầm kết cấu thép bằng phương pháp chord rotation 3D, kết nối trực tiếp SAP2000. Tự nhận diện dầm console và tự gom Physical Member.",
      en: "Steel beam deflection check using the 3D chord-rotation method, connected live to SAP2000. Automatic cantilever detection and Physical-Member grouping."
    },
    version: "2.5", size: "~23 MB", updated: "2026-08", os: WIN, host: "SAP2000",
    priceVnd: 200000, productCode: "DEFLECT", status: "ready",
    thumb: PIC + "web_description_03/00_cover.webp",
    screenshots: [PIC + "web_description_03/01.webp", PIC + "web_description_03/02.webp"],
    features: [
      { vi: "<b>Kiểm tra tương đối</b> L/δ theo phương pháp chord rotation 3D", en: "<b>Relative check</b> L/δ by the 3D chord-rotation method" },
      { vi: "<b>Kiểm tra tuyệt đối</b> theo U3 (mm) khi cần giới hạn võng theo trị số", en: "<b>Absolute check</b> on U3 (mm) when a fixed deflection limit is required" },
      { vi: "<b>Tự nhận diện dầm console</b>", en: "<b>Automatic cantilever detection</b>" },
      { vi: "<b>Auto Create Groups</b> từ nhận diện Physical Member", en: "<b>Auto Create Groups</b> from Physical-Member detection" },
      { vi: "Đọc cả node auto-mesh nên dầm đã chia nhỏ vẫn kiểm tra đúng", en: "Reads auto-mesh nodes so meshed beams are still checked correctly" },
      { vi: "Chọn nhanh nhiều Load Case/Combo; click Group là SAP2000 tự highlight", en: "Quick selection of many load cases/combos; clicking a group highlights it in SAP2000" },
      { vi: "Lọc <b>Show NG only</b>, tô màu trực tiếp trên bảng kết quả", en: "<b>Show NG only</b> filter with colour coding in the results table" },
      { vi: "Xuất Excel (.xlsx) và TXT vào thư mục mô hình SAP", en: "Exports Excel (.xlsx) and TXT into the SAP model folder" }
    ],
    requirements: REQ_SAP, download: "", checksum: "", virustotal: ""
  },

  /* ---- 07 ---- */
  {
    id: "steel-cad-plugin",
    category: CAT_STEEL,
    name: { vi: "SteelCAD — Plugin vẽ kết cấu cho AutoCAD", en: "SteelCAD Plugin for AutoCAD" },
    tagline: {
      vi: "Plugin AutoCAD triển khai bản vẽ thép và BTCT bằng cấu kiện thông minh — và tự sinh mặt bằng, mặt đứng, mặt cắt thẳng từ mô hình SAP2000.",
      en: "An AutoCAD plug-in for steel and RC detailing with smart members — and plans, elevations and sections generated straight from a SAP2000 model."
    },
    version: "2.0", size: "—", updated: "2026-09", os: WIN, host: "AutoCAD / SAP2000",
    priceVnd: 250000, productCode: "STEELCAD", status: "ready",
    thumb: PIC + "web_description_07/00_cover.webp",
    screenshots: [PIC + "web_description_07/01.webp", PIC + "web_description_07/02.webp", PIC + "web_description_07/03.webp", PIC + "web_description_07/04.webp", PIC + "web_description_07/05.webp", PIC + "web_description_07/06.webp", PIC + "web_description_07/07.webp", PIC + "web_description_07/08.webp"],
    features: [
      { vi: "<b>SAP Link</b>: tự sinh mặt bằng, mặt đứng, mặt cắt từ mô hình SAP2000, kèm lưới trục, kích thước và cao độ", en: "<b>SAP Link</b>: plans, elevations and sections generated from the SAP2000 model, with grids, dimensions and levels" },
      { vi: "<b>Cập nhật khi mô hình đổi</b> (SAPUPDATE) — chỉ sửa phần cần, giữ nguyên phần đã chỉnh tay", en: "<b>Update on model change</b> (SAPUPDATE) — only what changed, your manual edits kept" },
      { vi: "Mặt cắt tuỳ chọn trên mặt bằng, giới hạn theo hai điểm và khoảng cao độ", en: "Custom sections cut on a plan, bounded by two points and a level range" },
      { vi: "<b>Beam thông minh</b>: mỗi cấu kiện mang sẵn tiết diện, điểm làm việc, đoạn cắt, nhãn, liên kết moment — sửa bằng grip, không vẽ lại", en: "<b>Smart members</b> carrying section, working points, cuts, label and moment ends — edited by grips, never redrawn" },
      { vi: "H, C, L, T, hộp, ống — 4 kiểu thể hiện, tự cắt đầu cấu kiện tại gối", en: "H, C, L, T, box and pipe — 4 view types, ends trimmed to supports automatically" },
      { vi: "Thư viện <b>~2.950 tiết diện</b>, mở rộng được", en: "Library of <b>~2,950 sections</b>, extendable" },
      { vi: "Sửa hàng loạt, sao chép thuộc tính, bảng thống kê MARK / SIZE / QTY", en: "Batch edit, match properties, MARK / SIZE / QTY member list" },
      { vi: "<b>BTCT</b>: mặt cắt cột, dầm, móng và bu-lông neo", en: "<b>RC</b>: column, beam and footing sections, anchor bolts" },
      { vi: "Ký hiệu: liên kết, trục, ghi chú, mặt cắt, tên chi tiết", en: "Markup: connections, grids, notes, section marks, titles" }
    ],
    requirements: {
      vi: "Windows 64-bit, AutoCAD bản đầy đủ 2015–2024 (không hỗ trợ AutoCAD LT). SAP Link cần SAP2000 cài trên cùng máy.",
      en: "64-bit Windows, full AutoCAD 2015–2024 (AutoCAD LT not supported). SAP Link needs SAP2000 on the same computer."
    },
    /* Hỏi bắt buộc trên form đặt hàng, THAY cho ô "Ghi chú" (xem purchase.js).
       Mỗi đời AutoCAD cần một bộ cài riêng — bảng khớp lấy từ mục 2 "User manual.docx"
       của tool. `send` là tên thư mục bộ cài cần gửi; nó được ghi thẳng vào email
       Formspree báo đơn, Roberto khỏi phải tra. Chỉ liệt kê bản ĐƯỢC hỗ trợ: AutoCAD
       LT và 2025 trở lên không có trong danh sách, và `hint` cảnh báo khách trước
       khi chuyển khoản. Có bộ cài cho đời AutoCAD mới thì thêm một dòng ở đây. */
    orderPick: {
      key: "autocad_version",
      label: { vi: "Phiên bản AutoCAD của bạn", en: "Your AutoCAD version" },
      hint: {
        vi: "Chỉ hỗ trợ AutoCAD bản đầy đủ 2015–2024 — chưa hỗ trợ AutoCAD LT và bản 2025 trở lên. Xem phiên bản trong AutoCAD: Help ▸ About.",
        en: "Full AutoCAD 2015–2024 only — AutoCAD LT and 2025 or newer are not supported yet. Check yours in AutoCAD: Help ▸ About."
      },
      options: [
        { label: "AutoCAD 2024", send: "SteelCadPlugin-acad2023" },
        { label: "AutoCAD 2023", send: "SteelCadPlugin-acad2023" },
        { label: "AutoCAD 2022", send: "SteelCadPlugin-acad2022" },
        { label: "AutoCAD 2021", send: "SteelCadPlugin-acad2020" },
        { label: "AutoCAD 2020", send: "SteelCadPlugin-acad2020" },
        { label: "AutoCAD 2019", send: "SteelCadPlugin-acad2018" },
        { label: "AutoCAD 2018", send: "SteelCadPlugin-acad2018" },
        { label: "AutoCAD 2017", send: "SteelCadPlugin-acad2015" },
        { label: "AutoCAD 2016", send: "SteelCadPlugin-acad2015" },
        { label: "AutoCAD 2015", send: "SteelCadPlugin-acad2015" }
      ]
    },
    download: "", checksum: "", virustotal: ""
  },

  /* ---- 08 ---- */
  {
    id: "monorail-beam-design",
    category: CAT_STEEL,
    name: { vi: "Thiết kế dầm monorail", en: "Monorail Beam Design" },
    tagline: {
      vi: "Phân tích và thiết kế dầm monorail treo (underhung) theo AISC 9th Edition ASD và CMAA No. 74 (2004).",
      en: "Analysis and design of underhung monorail beams per AISC 9th Edition ASD and CMAA Specification No. 74 (2004)."
    },
    version: "1.2", size: "~45 MB", updated: "2026-08", os: WIN, host: "General",
    priceVnd: 100000, productCode: "MONORAIL", status: "ready",
    thumb: PIC + "web_description_08/01.webp",
    screenshots: [PIC + "web_description_08/01.webp", PIC + "web_description_08/02.webp", PIC + "web_description_08/03.webp", PIC + "web_description_08/04.webp"],
    features: [
      { vi: "<b>Thư viện tiết diện đa dạng</b>: W, H (tổ hợp), I, UB/UC, HE/IPE", en: "<b>Multi-section support</b>: W, H (built-up), I, UB/UC, HE/IPE" },
      { vi: "Kiểm tra uốn kèm<b>ứng suất oằn do xoắn</b>", en: "Bending including <b>warping stress</b>" },
      { vi: "<b>Kiểm tra cánh dưới theo CMAA No. 74</b>", en: "<b>Bottom-flange checks per CMAA No. 74</b>" },
      { vi: "Kể đến<b>phần console</b> (Lo, Lbo, Cbo)", en: "Includes the <b>overhang</b> (Lo, Lbo, Cbo)" },
      { vi: "Kể đến hệ số xung đứng và lực ngang của palăng", en: "Includes vertical impact and horizontal load factors" },
      { vi: "Kiểm tra độ võng Δmax", en: "Deflection check Δmax" },
      { vi: "Lưu/mở dự án", en: "Save/open project" }
    ],
    requirements: REQ_STD, download: "", checksum: "", virustotal: ""
  },

  /* ---- 06 ---- */
  {
    id: "crane-girder-design",
    category: CAT_STEEL,
    name: { vi: "Thiết kế dầm cầu trục", en: "Crane Girder Design" },
    tagline: {
      vi: "Thiết kế dầm đỡ đường ray cầu trục: tổ hợp tải trọng cầu trục theo phương đứng – ngang – dọc, kiểm tra uốn hai phương kèm xoắn, ổn định và độ võng vận hành.",
      en: "Design of crane runway girders: vertical, lateral and longitudinal crane load combinations, biaxial bending with torsion, stability and serviceability deflection checks."
    },
    version: "3.0", size: "—", updated: "2026-08", os: WIN, host: "General",
    priceVnd: 100000, productCode: "CRANEGIRDER", status: "ready",
    thumb: PIC + "web_description_06/01.webp",
    screenshots: [PIC + "web_description_06/01.webp", PIC + "web_description_06/03.webp"],
    features: [
      { vi: "Tổ hợp tải trọng cầu trục: tải đứng có hệ số xung, lực hãm ngang và lực dọc ray", en: "Crane load combinations: vertical loads with impact, lateral surge and longitudinal tractive forces" },
      { vi: "Kiểm tra uốn hai phương kèm ảnh hưởng xoắn của dầm ray", en: "Biaxial bending checks including runway-girder torsion effects" },
      { vi: "Kiểm tra ổn định tổng thể và độ võng theo giới hạn vận hành cầu trục", en: "Overall stability and deflection checks against crane serviceability limits" },
      { vi: "Xuất báo cáo tính toán", en: "Exports a calculation report" },
      { vi: "Đơn vị SI (kN, m, mm)", en: "SI units (kN, m, mm)" }
    ],
    requirements: REQ_STD, download: "", checksum: "", virustotal: ""
  },

  /* ---- 04 ---- */
  {
    id: "pile-capacity-check",
    category: CAT_FDN,
    name: { vi: "Kiểm tra sức chịu tải cọc & lún lệch", en: "Pile Capacity & Settlement Check" },
    tagline: {
      vi: "Kiểm tra khả năng chịu tải của cọc theo từng nhóm tổ hợp Thường xuyên / Gió / Động đất. Kiểm tra lún lệch vi sai giữa các cọc. Lấy phản lực trực tiếp từ SAP2000.",
      en: "Checks pile capacity against Long-term / Wind / Seismic combination groups, plus differential settlement between every pile pair. Reactions taken live from SAP2000."
    },
    version: "1.2", size: "—", updated: "2026-08", os: WIN, host: "SAP2000",
    priceVnd: 200000, productCode: "PILECAP", status: "ready",
    thumb: PIC + "web_description_04/00_cover.webp",
    screenshots: [PIC + "web_description_04/01.webp", PIC + "web_description_04/02.webp", PIC + "web_description_04/03.webp", PIC + "web_description_04/04.webp", PIC + "web_description_04/05.webp"],
    features: [
      { vi: "<b>Nhập dữ liệu tự động</b>", en: "<b>Automatic data input</b>" },
      { vi: "<b>Tự phân loại Load Type</b> (Thường xuyên / Gió / Động đất)", en: "<b>Automatic load-type classification</b> (Long-term / Wind / Seismic)" },
      { vi: "Khai báo nhiều loại cọc; đổi đơn vị kN ↔ Ton tự quy đổi", en: "Multiple pile types; kN ↔ Ton switching converts values automatically" },
      { vi: "<b>Sơ đồ mặt bằng cọc</b> tô màu theo loại cọc hoặc theo tỉ số chịu tải", en: "<b>Piling diagram</b> coloured by pile type or capacity ratio" },
      { vi: "<b>Kiểm tra lún lệch</b>", en: "<b>Differential settlement check</b>" },
      { vi: "Báo cáo Excel sức chịu tải (4 sheet) và báo cáo lún lệch (2 sheet)", en: "Excel capacity report (4 sheets) and settlement report (2 sheets)" },
    ],
    requirements: REQ_SAP, download: "", checksum: "", virustotal: ""
  },

  /* ---- 09 ---- */
  {
    id: "wind-load-vertical-tank",
    category: CAT_LOAD,
    name: { vi: "Tải trọng gió lên bồn đứng", en: "Wind Load on Vertical Tank" },
    tagline: {
      vi: "Tính tải trọng gió thiết kế cho bồn, thiết bị đứng và ống khói đặt trên nền theo ASCE 7-22 Chương 29.",
      en: "Wind design loads for ground-supported vertical tanks, vessels and stacks per ASCE 7-22 Chapter 29."
    },
    version: "2.1", size: "—", updated: "2026-08", os: WIN, host: "General",
    priceVnd: 100000, productCode: "WINDTANK", status: "ready",
    thumb: PIC + "web_description_09/00_cover.webp",
    screenshots: [PIC + "web_description_09/01.webp", PIC + "web_description_09/02.webp"],
    features: [
      { vi: "Theo <b>ASCE 7-22 Chương 29</b> cho kết cấu dạng trụ", en: "Per <b>ASCE 7-22 Chapter 29</b> for cylindrical structures" },
      { vi: "Hỗ trợ mặt cắt <b>Tròn, Lục giác, Bát giác và Vuông</b>", en: "Supports <b>round, hexagonal, octagonal and square</b> shapes" },
      { vi: "<b>Tự phân biệt kết cấu cứng / mềm</b> theo tần số dao động riêng (ngưỡng 1 Hz)", en: "<b>Automatic rigid vs flexible classification</b> from the natural frequency (1 Hz threshold)" },
      { vi: "Hệ số giật G: đơn giản hoá, chi tiết cho kết cấu cứng, và Gf cho kết cấu mềm", en: "Gust effect factor G: simplified, detailed rigid, and Gf for flexible structures" },
      { vi: "<b>Tự chọn hệ số lực Cf</b> theo hình dạng, độ nhám bề mặt và tích D×√qz", en: "<b>Automatic force coefficient Cf</b> based on shape, surface roughness and D×√qz" },
      { vi: "Lập bảng tải gió <b>theo từng cao độ</b> kèm lực cắt và moment tại chân", en: "<b>Elevation-by-elevation</b> wind load table with base shear and overturning moment" },
      { vi: "Xuất Excel và lưu/mở dự án (.json)", en: "Excel export and save/open project (.json)" }
    ],
    requirements: REQ_STD, download: "", checksum: "", virustotal: ""
  },

  /* ---- 11 ---- */
  {
    id: "embedded-plate-design",
    category: CAT_RC,
    name: { vi: "Thiết kế Tấm chôn sẵn (Embedded Plate)", en: "Embedded Plate Design" },
    tagline: {
      vi: "Thiết kế bản thép chôn sẵn trong bê tông: bố trí chốt neo, kiểm tra kéo – cắt – tổ hợp và các dạng phá hoại bê tông theo ACI 318.",
      en: "Design of plates cast into concrete: stud layout, tension–shear–interaction checks and concrete failure modes per ACI 318."
    },
    version: "1.1", size: "—", updated: "2026-08", os: WIN, host: "General",
    priceVnd: 100000, productCode: "EMBPLATE", status: "ready",
    thumb: PIC + "web_description_11/00_cover.webp",
    screenshots: [PIC + "web_description_11/01.webp", PIC + "web_description_11/02.webp", PIC + "web_description_11/03.webp", PIC + "web_description_11/04.webp"],
    features: [
      { vi: "Kết nối trực tiếp <b>mô hình SAP2000</b> để lấy nội lực tự động", en: "Connects to the <b>SAP2000 model</b> to pull member forces automatically" },
      { vi: "<b>13 dạng tấm chôn sẵn</b> điển hình theo tiêu chuẩn, ký hiệu A–T", en: "<b>13 standard embedded-plate types</b>, designated A–T" },
      { vi: "Bố trí chốt neo (stud) theo lưới, kiểm tra khoảng cách", en: "Configurable stud layout with spacing and distance checks" },
      { vi: "Kiểm tra chốt neo chịu <b>kéo, cắt và tổ hợp kéo–cắt</b>", en: "Stud checks in <b>tension, shear and tension–shear interaction</b>" },
      { vi: "Các dạng phá hoại bê tông: <b>nứt vỡ hình nón (breakout), kéo tuột (pullout), nổ hông (side-face blow-out)</b>", en: "Concrete failure modes: <b>breakout, pullout and side-face blow-out</b>" },
      { vi: "Kiểm tra bề dày bản thép chịu uốn cục bộ dưới tải trọng đặt", en: "Plate thickness check for local bending under the applied load" },
      { vi: "Xuất báo cáo tính toán", en: "Exports a calculation report" },
      { vi: "Đơn vị SI (kN, m, mm)", en: "SI units (kN, m, mm)" }
    ],
    requirements: REQ_STD, download: "", checksum: "", virustotal: ""
  },

  /* ---- 12 ---- */
  {
    id: "rc-corbel-design",
    category: CAT_RC,
    name: { vi: "Thiết kế vai cột BTCT", en: "RC Corbel Design" },
    tagline: {
      vi: "Thiết kế vai cột (corbel/bracket) bê tông cốt thép theo mô hình giàn ảo: cốt thép chính chịu kéo, cốt đai ngang, kiểm tra ma sát cắt và ép mặt tại gối.",
      en: "Design of reinforced-concrete corbels and brackets using the strut-and-tie model: primary tension reinforcement, horizontal stirrups, shear-friction and bearing checks."
    },
    version: "1.0", size: "—", updated: "2026-08", os: WIN, host: "General",
    priceVnd: 100000, productCode: "RCCORBEL", status: "ready",
    thumb: PIC + "web_description_12/01.webp",
    screenshots: [PIC + "web_description_12/01.webp", PIC + "web_description_12/02.webp"],
    features: [
      { vi: "Thiết kế theo <b>mô hình giàn ảo (strut-and-tie)</b> cho vai cột chịu tải đứng và ngang", en: "Design by the <b>strut-and-tie model</b> for corbels under vertical and horizontal load" },
      { vi: "Tính cốt thép chính chịu kéo và <b>cốt đai ngang</b> phân bố theo chiều cao vai", en: "Primary tension reinforcement and <b>horizontal stirrups</b> distributed over the corbel depth" },
      { vi: "Kiểm tra <b>ma sát cắt</b> tại mặt tiếp giáp vai – cột", en: "<b>Shear-friction</b> check at the corbel–column interface" },
      { vi: "Kiểm tra <b>ép mặt</b> tại vị trí đặt gối và giới hạn kích thước hình học", en: "<b>Bearing</b> check at the support plate and geometric limit checks" },
      { vi: "Xuất báo cáo tính toán", en: "Exports a calculation report" },
      { vi: "Đơn vị SI (kN, m, mm)", en: "SI units (kN, m, mm)" }
    ],
    requirements: REQ_STD, download: "", checksum: "", virustotal: ""
  },

  /* ---- 02 ---- */
  {
    id: "sidesway-check",
    category: CAT_STEEL,
    name: { vi: "Kiểm tra chuyển vị ngang (Sidesway)", en: "Sidesway Check" },
    tagline: {
      vi: "Kiểm tra chuyển vị ngang giữa các tầng cho kết cấu.",
      en: "Storey-drift check for structures"
    },
    version: "2.3", size: "~23 MB", updated: "2026-08", os: WIN, host: "SAP2000",
    priceVnd: 100000, productCode: "SIDESWAY", status: "ready",
    thumb: PIC + "web_description_02/00_cover.webp",
    screenshots: [PIC + "web_description_02/01.webp", PIC + "web_description_02/02.webp"],
    features: [
      { vi: "Tự gom nút theo trục cột", en: "Auto-group joints by column line" },
      { vi: "Đọc tên trục lưới thật từ SAP2000", en: "Reads real grid names from SAP2000" },
      { vi: "Kiểm tra cả Load Case và Load Combination", en: "Checks both load cases and combinations" },
      { vi: "Tự tìm tổ hợp gây chuyển vị lớn nhất theo phương X và Y cho từng trục cột", en: "Finds the governing combination for X and Y drift on each column line" },
      { vi: "Xuất Excel 2 sheet", en: "Exports a 2-sheet Excel workbook" }
    ],
    requirements: REQ_SAP, download: "", checksum: "", virustotal: ""
  },

  /* ---- 05 · FREE ---- */
  {
    id: "grds-slab-on-grade",
    category: CAT_FDN,
    name: { vi: "Thiết kế sàn nền bê tông (Slab on Grade)", en: "Concrete Slab on Grade Design" },
    tagline: {
      vi: "Kiểm tra, tính toán và thiết kế sàn nền bê tông theo Westergaard / PCA / ACI 360 / TM 5-809-12.",
      en: "Analysis and design of concrete slabs on grade to Westergaard / PCA / ACI 360 / TM 5-809-12."
    },
    version: "1.1", size: "63 MB", updated: "2026-08", os: WIN, host: "General",
    priceVnd: 0, productCode: "GRDS", status: "ready",
    thumb: "Resource/tools/web_description_05/01.webp",
    screenshots: [
      "Resource/tools/web_description_05/01.webp",
      "Resource/tools/web_description_05/04.webp",
      "Resource/tools/web_description_05/05.webp",
      "Resource/tools/web_description_05/03.webp",
      "Resource/tools/web_description_05/02.webp"
    ],
    features: [
      { vi: "3 trường hợp tải: tải tập trung/bánh xe, tải tường liên tục, tải phân bố đều", en: "3 load cases: concentrated/wheel, continuous wall, uniform load" },
      { vi: "Kiểm tra uốn, ép mặt, xuyên thủng và truyền lực qua thanh chốt (dowel)", en: "Flexure, bearing, punching shear and dowel bearing checks" },
      { vi: "Cốt thép co ngót/nhiệt độ và kiểm tra bề rộng vết nứt", en: "Shrinkage/temperature reinforcement and crack-width check" },
      { vi: "Tự động tìm chiều dày sàn tối thiểu cho từng trường hợp tải", en: "Automatic minimum slab-thickness search for each load case" },
      { vi: "Tab tra cứu: k theo loại đất, tải xe nâng, chọn dowel, tính diện tích tiếp xúc Ac", en: "Reference tab: subgrade k by soil, lift-truck loads, dowel selection, contact-area calculator" },
      { vi: "Xuất báo cáo Excel (.xlsx) hoặc HTML", en: "Export printable Excel (.xlsx) or HTML report" },
    ],
    requirements: REQ_STD,
    download: "https://github.com/Roberto-0720/05_GroundFloorDesign_Release/releases/latest/download/GRDS.zip",
    checksum: "", virustotal: ""
  },

  /* ---- 10 · FREE ---- */
  {
    id: "seismic-vertical-tank",
    category: CAT_LOAD,
    name: { vi: "Tải trọng động đất lên bồn đứng", en: "Seismic Load on Vertical Tank" },
    tagline: {
      vi: "Tính tải trọng động đất cho bồn đứng theo ASCE 7-22 và API 650.",
      en: "Seismic design loads for ground-supported vertical tanks per ASCE 7-22 and API 650."
    },
    version: "2.1", size: "—", updated: "2026-08", os: WIN, host: "General",
    priceVnd: 0, productCode: "SEISTANK", status: "ready",
    thumb: PIC + "web_description_10/00_cover.webp",
    screenshots: [PIC + "web_description_10/01.webp", PIC + "web_description_10/02.webp"],
    features: [
      { vi: "Theo <b>ASCE 7-22 Chương 15 §15.7.6</b> và <b>API 650 Phụ lục E</b>", en: "Per <b>ASCE 7-22 Chapter 15 §15.7.6</b> and <b>API 650 Appendix E</b>" },
      { vi: "Tự tra hệ số nền Fa, Fv và tính phổ SMS, SM1, SDS, SD1 từ Ss, S1 và Site Class", en: "Site coefficients Fa, Fv and spectral values SMS, SM1, SDS, SD1 from Ss, S1 and site class" },
      { vi: "Xác định <b>Cấp thiết kế kháng chấn</b> theo Bảng 11.6-1 và 11.6-2", en: "Determines the <b>Seismic Design Category</b> per Tables 11.6-1 and 11.6-2" },
      { vi: "Xác định Chu kỳ T, hệ số R, Ω₀, Cd theo 10 dạng kết cấu (T1–T10)", en: "Fundamental period T, R, Ω₀, Cd factors for 10 structural types (T1–T10)" },
      { vi: "Lực cắt đáy V và moment lật Mo", en: "Base shear V and overturning moment Mo" },
      { vi: "Xuất Excel và lưu/mở dự án (.json)", en: "Excel export and save/open project (.json)" }
    ],
    requirements: REQ_STD,
    download: "https://github.com/Roberto-0720/10_SeismicOnVerTank_Release/releases/latest/download/SLVT.zip",
    checksum: "b779bc54c7bd116dc4a4a18545930eaa60ee4a9fb8c91c6537cca0d8e3f91627", virustotal: ""
  },

  /* ---- 13 ---- */
  {
    id: "base-plate-design",
    category: CAT_STEEL,
    name: { vi: "Thiết kế bản đế cột (liên kết khớp)", en: "Base Plate Design (Hinge Type)" },
    tagline: {
      vi: "Thiết kế bản đế cột thép dạng liên kết khớp theo AISC 360 / ACI 318.",
      en: "Hinged steel column base-plate design per AISC 360 / ACI 318."
    },
    version: "2.3", size: "—", updated: "2026-08", os: WIN, host: "SAP2000",
    priceVnd: 125000, productCode: "BASEPLATE", status: "ready",
    thumb: PIC + "web_description_13/00_cover.webp",
    screenshots: [
      PIC + "web_description_13/01.webp", PIC + "web_description_13/02.webp", PIC + "web_description_13/03.webp",
      PIC + "web_description_13/04.webp", PIC + "web_description_13/05.webp", PIC + "web_description_13/06.webp"
    ],
    features: [
      { vi: "Tự động phát hiện toàn bộ bản đế trong mô hình SAP2000", en: "Auto-discovers every base plate in the SAP2000 model" },
      { vi: "Thiết kế theo <b>AISC 360 / ACI 318M</b> cho liên kết khớp (2 hoặc 4 bulông neo)", en: "Design per <b>AISC 360 / ACI 318M</b> for hinge-type bases (2 or 4 anchor bolts)" },
      { vi: "Sơ đồ mặt bằng bản đế trực quan, tô màu <b>xanh (OK) / đỏ (NG)</b> theo từng nút", en: "Visual base-plate plan view, colour-coded <b>green (OK) / red (NG)</b> per node" },
      { vi: "Bảng tra vật liệu, bulông neo và loại liên kết khớp có thể chỉnh sửa", en: "Editable material, anchor-bolt and hinge-type reference tables" },
      { vi: "Xuất báo cáo tính toán riêng cho từng nút (Calculation Report.xlsx)", en: "Per-node calculation report export (Calculation Report.xlsx)" },
      { vi: "Lưu/mở dự án (.json), thiết kế lại mà không cần mở SAP2000", en: "Save/open project (.json) — recheck later without SAP2000 running" }
    ],
    requirements: REQ_SAP,
    download: "",
    checksum: "", virustotal: ""
  },

  /* ---- 20 ---- */
  {
    id: "eq-anchor-bolt-design",
    category: CAT_FDN,
    name: { vi: "Thiết kế bulông neo chống động đất cho thiết bị đứng", en: "Anchor Bolt Design for Vertical Equipment (Seismic)" },
    tagline: {
      vi: "Thiết kế bulông neo chịu động đất cho bồn/thiết bị đứng trên bệ bát giác theo ACI 318M Chương 17.",
      en: "Seismic anchor-bolt design for vertical vessels on octagonal pedestals per ACI 318M Chapter 17."
    },
    version: "1.1", size: "—", updated: "2026-08", os: WIN, host: "General",
    priceVnd: 100000, productCode: "EQAB", status: "ready",
    thumb: PIC + "web_description_20/01.webp",
    screenshots: [PIC + "web_description_20/01.webp", PIC + "web_description_20/02.webp", PIC + "web_description_20/03.webp", PIC + "web_description_20/04.webp"],
    features: [
      { vi: "Thiết kế theo <b>ACI 318</b> cho bệ bát giác", en: "Design per <b>ACI 318</b> for octagonal pedestals" },
      { vi: "Kiểm tra đầy đủ: kéo, cắt và tổ hợp kéo–cắt", en: "Full checks: tension, shear and tension–shear interaction" },
      { vi: "Áp dụng hệ số giảm động đất 0,75 và kiểm tra dẻo theo §17.2.3", en: "Applies the seismic 0.75 reduction factor and ductility checks per §17.2.3" },
      { vi: "Tùy chọn truyền lực cắt qua ma sát đáy bản đế", en: "Optional shear transfer by base friction" },
      { vi: "Xuất báo cáo Excel chi tiết từng bước tính kèm điều khoản tiêu chuẩn", en: "Detailed Excel export with every calculation step and code clause" }
    ],
    requirements: REQ_STD,
    download: "",
    checksum: "", virustotal: ""
  },

  /* ==========================================================
     IN DEVELOPMENT — shown as "Coming soon"
     ========================================================== */
  {
    id: "shallow-foundation-stability",
    category: CAT_FDN,
    name: { vi: "Thiết kế móng nông", en: "Shallow Foundation Design" },
    tagline: {
      vi: "Thiết kế móng đơn, móng kết hợp và móng bè trên nền đất dưới các cột của mô hình SAP2000 hoặc STAAD.Pro: kiểm tra lật, trượt, đẩy nổi, áp lực nền trên mọi tổ hợp SLS và thiết kế đài móng, cổ móng theo ACI 318-14 trên mọi tổ hợp ULS.",
      en: "Isolated, combined and mat footings on soil under the columns of a SAP2000 or STAAD.Pro model: overturning, sliding, uplift and bearing on every SLS combination, plus footing and pedestal design to ACI 318-14 on every ULS one."
    },
    version: "3.0", size: "—", updated: "2026-10", os: WIN, host: "SAP2000 / STAAD.Pro",
    priceVnd: 250000, productCode: "SHALLOWFDN", status: "ready",
    thumb: PIC + "web_description_16/000_cover.webp",
    screenshots: ["001", "002", "003", "004", "005", "006", "007", "008", "009", "010"].map(n => PIC + "web_description_16/" + n + ".webp"),
    features: [
      { vi: "Đọc trực tiếp mô hình <b>SAP2000</b>/<b>STAAD.Pro</b> đang mở", en: "Reads model directly from open <b>SAP2000</b>/<b>STAAD.Pro</b> model" },
      { vi: "Chọn cột để tạo <b>móng đơn</b>, chọn nhiều cột để tạo <b>móng kết hợp / móng bè</b>", en: "Click a column for an <b>isolated footing</b>, select several columns for a <b>combined footing / mat</b>" },
      { vi: "Tự động đề xuất kích thước và xem kết quả cập nhật tức thì", en: "Automatically proposes dimensions and see results update live" },
      { vi: "Kiểm tra SLS: <b>lật, trượt, đẩy nổi, áp lực nền</b>", en: "SLS checks: <b>overturning, sliding, uplift, gross bearing</b>" },
      { vi: "Sức chịu tải cho phép <b>dài hạn / gió / động đất</b>, có xét mực nước ngầm", en: "Allowable bearing (<b>long term/wind/seismic</b>), with groundwater buoyancy" },
      { vi: "Thiết kế đài theo <b>ACI 318-14</b>: kiểm tra cắt, cốt thép chịu uốn", en: "ULS footing design to <b>ACI 318-14</b>: one-way shear, bending reinforcement" },
      { vi: "Thiết kế <b>cổ móng</b>", en: "<b>Pedestal design</b>" },
      { vi: "Thép thanh hệ mét D hoặc ASTM A615M (#)", en: "Metric D bars or ASTM A615M (#) bars" },
      { vi: "Lưu dự án một file .json (mở lại không cần SAP2000), xuất báo cáo Excel", en: "Saves the project to one .json (reopens without SAP2000) and exports Excel report" }
    ],
    requirements: { vi: "Windows / SAP2000 hoặc STAAD.Pro", en: "Windows / SAP2000 or STAAD.Pro" },
    download: "", checksum: "", virustotal: ""
  },
  {
    id: "piled-foundation-design",
    category: CAT_FDN,
    name: { vi: "Thiết kế móng cọc", en: "Piled Foundation Design" },
    tagline: {
      vi: "Thiết kế đài cọc và phân phối tải lên nhóm cọc, kiểm tra đài chịu uốn và chọc thủng.",
      en: "Pile-cap design with load distribution to the pile group, cap flexure and punching-shear checks."
    },
    version: "2.1", size: "—", updated: "—", os: WIN, host: "SAP2000",
    priceVnd: 250000, productCode: "PILEDFDN", status: "soon",
    thumb: "", screenshots: [], features: [], requirements: REQ_SAP,
    download: "", checksum: "", virustotal: ""
  },
  {
    id: "octagon-eq-foundation",
    category: CAT_FDN,
    name: { vi: "Thiết kế móng bát giác cho thiết bị", en: "Octagonal Equipment Foundation Design" },
    tagline: {
      vi: "Thiết kế móng bát giác cho bồn, tháp và thiết bị đứng: ổn định, áp lực nền, cốt thép bệ và đài móng, kèm phương án móng cọc — theo PIP STE03350, ASCE 7-22 và ACI 318-25.",
      en: "Octagonal foundations for vertical tanks, vessels and stacks: stability, bearing, pedestal and footing reinforcement, plus a piled option — per PIP STE03350, ASCE 7-22 and ACI 318-25."
    },
    version: "1.0", size: "—", updated: "2026-09", os: WIN, host: "General",
    priceVnd: 250000, productCode: "OCTAGONEQ", status: "ready",
    thumb: PIC + "web_description_14/01.webp",
    screenshots: [PIC + "web_description_14/01.webp", PIC + "web_description_14/02.webp", PIC + "web_description_14/03.webp", PIC + "web_description_14/04.webp", PIC + "web_description_14/05.webp"],
    features: [
      { vi: "Kiểm tra <b>lật, trượt, tỷ số ổn định</b> và <b>áp lực nền</b> theo PIP STE03350", en: "<b>Overturning, sliding, stability ratio</b> and <b>bearing pressure</b> per PIP STE03350" },
      { vi: "Nhập trực tiếp tải bồn: rỗng – vận hành – thử nước, gió và động đất", en: "Direct entry of vessel loads: empty, operating and test weights, wind and seismic" },
      { vi: "Tổ hợp tải <b>ASCE 7-22</b> (LRFD và ASD), bảng tổ hợp chỉnh sửa được, có xét đẩy nổi", en: "<b>ASCE 7-22</b> combinations (LRFD and ASD) in an editable table, with buoyancy" },
      { vi: "Thiết kế <b>cốt thép bệ</b>: thép dọc, đai, ép mặt tại chân bệ", en: "<b>Pedestal reinforcement</b>: vertical bars, ties and bearing at the base" },
      { vi: "Thiết kế <b>đài móng</b>: cắt một phương, chọc thủng, uốn, chiều dài neo", en: "<b>Footing design</b>: one-way and punching shear, flexure, development length" },
      { vi: "Phương án <b>móng cọc</b>: bố trí cọc theo vòng tròn, sức chịu tải từng cọc, thiết kế đài cọc", en: "<b>Piled option</b>: piles on a circle, per-pile capacity and pile-cap design" },
      { vi: "Lưu / mở dự án, xuất báo cáo Excel", en: "Save / open projects and export an Excel report" },
      { vi: "Đơn vị SI (kN, m)", en: "SI units (kN, m)" }
    ],
    requirements: REQ_STD, download: "", checksum: "", virustotal: ""
  },
  {
    id: "unbraced-length-calculator",
    category: CAT_LOAD,
    name: { vi: "Tính chiều dài không giằng (SAP2000 / STAAD.Pro)", en: "Unbraced Length Calculator" },
    tagline: {
      vi: "Phân loại phần tử, gom cấu kiện thật (Physical Member) và tính chiều dài không giằng trục mạnh, trục yếu, LTB cho kết cấu thép trong mô hình SAP2000 hoặc STAAD.Pro. Dùng cho mô hình có các phần tử thanh được chia thật tại các nút giao nhau.",
      en: "Classifies elements, groups them into physical members and computes major, minor and LTB unbraced lengths for the steel members of a SAP2000 or STAAD.Pro model. For models whose frame members are actually split at the intersection nodes."
    },
    version: "3.0", size: "—", updated: "2026-10", os: WIN, host: "SAP2000 / STAAD.Pro",
    priceVnd: 125000, productCode: "ULC", status: "ready",
    thumb: PIC + "web_description_15/00_cover.webp",
    screenshots: ["01", "02", "03", "04", "05"].map(n => PIC + "web_description_15/" + n + ".webp"),
    features: [
      { vi: "Quan trọng: dùng cho mô hình có các phần tử thanh được chia thật tại các nút giao nhau — điểm giằng được xác định tại các nút đó", en: "Important: for models whose frame members are actually split at the intersection nodes — brace points are found at those nodes" },
      { vi: "Một công cụ cho cả SAP2000 (kết nối mô hình đang mở) và STAAD.Pro (đọc file .std)", en: "One tool for both SAP2000 (live link to the open model) and STAAD.Pro (reads the .std file)" },
      { vi: "Tự phân loại cột, dầm, giằng ngang, giằng đứng, console; sửa tay ngay trong bảng", en: "Classifies columns, beams, horizontal and vertical bracing and cantilevers; edit any of it in the table" },
      { vi: "Gom phần tử thành Physical Member; với STAAD.Pro có thể dùng lại DEFINE PMEMBER sẵn có", en: "Groups elements into physical members; for STAAD.Pro an existing DEFINE PMEMBER can be reused" },
      { vi: "SAP2000: tính XLMajor / XLMinor / XLLTB và ghi tỷ số thẳng vào Steel Design Overwrites", en: "SAP2000: computes XLMajor / XLMinor / XLLTB and writes the ratios straight into the Steel Design Overwrites" },
      { vi: "STAAD.Pro: tính LZ / LY / UNB / UNT và xuất sẵn các lệnh để dán vào mô hình", en: "STAAD.Pro: computes LZ / LY / UNB / UNT and writes ready-to-paste commands" },
      { vi: "Quy tắc điểm giằng chỉnh được trong Settings, riêng cho từng chương trình", en: "Brace-point rules editable in Settings, separately for each program" }
    ],
    requirements: { vi: "Windows / SAP2000 v17+ hoặc STAAD.Pro", en: "Windows / SAP2000 v17+ or STAAD.Pro" },
    download: "", checksum: "", virustotal: ""
  },
  {
    id: "staad-loading-assignment",
    category: CAT_LOAD,
    name: { vi: "Gán tải trọng tự động (STAAD.Pro)", en: "STAAD.Pro Loading Assignment" },
    tagline: {
      vi: "Từ một bảng tải, tính tải phân bố đều và tải tập trung lên các dầm đã chọn trong mô hình STAAD.Pro, rồi gom thành lệnh MEMBER LOAD sẵn để dán vào mô hình.",
      en: "From one loading table, computes uniform and concentrated loads on the selected beams of a STAAD.Pro model and groups them into ready-to-paste MEMBER LOAD commands."
    },
    version: "2.0", size: "—", updated: "2026-10", os: WIN, host: "STAAD.Pro",
    priceVnd: 100000, productCode: "STAADLOAD", status: "ready",
    thumb: PIC + "web_description_21/00_cover.webp",
    screenshots: ["01", "02", "03", "04", "05", "06", "07", "08"].map(n => PIC + "web_description_21/" + n + ".webp"),
    features: [
      { vi: "Lấy dầm đang chọn trong STAAD.Pro qua OpenSTAAD, hoặc đọc file .std và gõ danh sách dầm (TO, BY, tên group)", en: "Takes the beams selected in STAAD.Pro through OpenSTAAD, or reads the .std file with a typed beam list (TO, BY, group names)" },
      { vi: "Bảng tải gõ trực tiếp hoặc dán từ Excel (Ctrl+V); ô sai được tô đỏ kèm lý do", en: "Loading table typed in or pasted from Excel (Ctrl+V); invalid cells turn red with the reason" },
      { vi: "Tự tính bề rộng chịu tải (loading span) của từng hàng dầm", en: "Computes the loading span of every row of beams" },
      { vi: "Tải phân bố đều (UNI) và tải tập trung (CON), mỗi P là một load case", en: "Uniform (UNI) and concentrated (CON) loads, one load case per P" },
      { vi: "Vị trí tải luôn tính từ node A, đúng cả khi dầm vẽ ngược chiều", en: "Load positions always measured from node A, correct even for beams drawn backwards" },
      { vi: "Xem trước tải trên mặt bằng để kiểm tra trước khi xuất", en: "Plan view of any load row to check it before export" },
      { vi: "Gom lệnh MEMBER LOAD cùng nội dung, sẵn để dán vào STAAD.Pro", en: "Groups identical MEMBER LOAD commands, ready to paste into STAAD.Pro" }
    ],
    requirements: REQ_STAAD,
    download: "", checksum: "", virustotal: ""
  }
];
