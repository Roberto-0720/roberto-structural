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
  { vi: "Kết cấu thép",               en: "Steel Structural Design" },
  { vi: "Kết cấu BTCT",               en: "RC Structural Design" },
  { vi: "Tính tải trọng",             en: "Loading Calculation" }
];

const CAT_FDN   = { vi: "Nền móng & Công trình ngầm", en: "Foundation & Underground" };
const CAT_STEEL = { vi: "Kết cấu thép",               en: "Steel Structural Design" };
const CAT_RC    = { vi: "Kết cấu BTCT",               en: "RC Structural Design" };
const CAT_LOAD  = { vi: "Tính tải trọng",             en: "Loading Calculation" };

const WIN = "Windows 10/11 (64-bit)";
const PIC = "Resource/tools/Picture/";   // screenshot root

const REQ_STD = {
  vi: "Windows 10/11 64-bit · Không cần cài đặt phần mềm hỗ trợ · chạy trực tiếp file .exe.",
  en: "Windows 10/11 64-bit · No extra software to install · runs the .exe directly."
};
const REQ_SAP = {
  vi: "Windows 10/11 64-bit · Cần có SAP2000 đang mở và đã chạy phân tích · chạy trực tiếp file .exe.",
  en: "Windows 10/11 64-bit · Requires SAP2000 open with the analysis run · runs the .exe directly."
};
const REQ_STAAD = {
  vi: "Windows 10/11 64-bit · Cần có STAAD.Pro CONNECT · chạy trực tiếp file .exe.",
  en: "Windows 10/11 64-bit · Requires STAAD.Pro CONNECT · runs the .exe directly."
};
const REQ_CAD = {
  vi: "Windows 10/11 64-bit · Cần AutoCAD 2023 (hoặc ZWCAD) · nạp plugin (.dll) bằng lệnh NETLOAD.",
  en: "Windows 10/11 64-bit · Requires AutoCAD 2023 (or ZWCAD) · load the plugin (.dll) with NETLOAD."
};

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
      vi: "Kết nối trực tiếp SAP2000 đang mở qua COM API, đọc kết quả thiết kế bê tông (ACI 318-14) và chuyển thành bảng thống kê thép hoàn chỉnh cho từng nhóm cấu kiện — kèm kiểm tra OK/NG trực tiếp và báo cáo Excel.",
      en: "Connects live to a running SAP2000 model via COM API, pulls concrete frame design results (ACI 318-14) and turns them into a complete rebar schedule per member group — with live OK/NG checking and a polished Excel report."
    },
    version: "1.0", size: "~34 MB", updated: "2026-08", os: WIN, host: "SAP2000",
    priceVnd: 350000, productCode: "RCSAP", status: "ready",
    thumb: PIC + "web_description_01/01.png",
    screenshots: [PIC+"web_description_01/01.png", PIC+"web_description_01/02.png", PIC+"web_description_01/03.png", PIC+"web_description_01/04.png"],
    features: [
      { vi: "Kết nối trực tiếp SAP2000 (COM API, v17 → v26+) — không cần xuất file .txt, không cần thiết lập đơn vị thủ công", en: "Live SAP2000 connection (COM API, v17 → v26+) — no .txt export, no manual unit setup" },
      { vi: "Kết quả thép: <b>số thanh × đường kính</b> (thép dọc) và <b>số nhánh × đường kính @ khoảng cách</b> (đai)", en: "Rebar output: <b>number of bars × diameter</b> (longitudinal) and <b>legs × diameter @ spacing</b> (stirrups)" },
      { vi: "Bao nội lực theo <b>nhóm cấu kiện</b> (mark C2, RGX1…) — cột (PMM, Av/sv) và dầm (As trên/dưới, cắt, xoắn)", en: "Envelopes results <b>per member group</b> (marks C2, RGX1…) — columns (PMM, Av/sv) and beams (top/bottom As, shear, torsion)" },
      { vi: "Tự đọc tiết diện, f'c, fy, fyt, lớp bảo vệ, cỡ đai <b>từ mô hình</b> — ít nhập tay, ít sai sót", en: "Section size, f'c, fy, fyt, cover and tie size read <b>from the model</b> — fewer manual inputs, fewer mistakes" },
      { vi: "Chế độ <b>kháng chấn</b>: nhu cầu đai vùng tới hạn Ash/s theo ACI 318-14 §18.7.5.4 (tách riêng đai vùng confine / non-confine)", en: "<b>Seismic mode</b>: confine-zone hoop demand Ash/s per ACI 318-14 §18.7.5.4 (confine / non-confine stirrups picked separately)" },
      { vi: "Dầm chia vùng Đầu/Giữa, đai = Av/sv + 2At/st, thép bụng chịu xoắn có kể phần dư uốn", en: "Beam End/Center zones, stirrup demand = Av/sv + 2At/st, torsional web bars with flexural-surplus credit" },
      { vi: "Kiểm tra nút khung: lực cắt nút và tỉ số khả năng dầm/cột (6/5) cho khung kháng chấn", en: "Joint check: joint shear and (6/5) beam/column capacity ratios for seismic frames" },
      { vi: "<b>Tự đề xuất thép</b> ngay khi có dữ liệu — mọi giá trị vẫn sửa được, kiểm tra cập nhật tức thì", en: "<b>Auto rebar suggestion</b> the moment data arrives — every value stays editable, checks update live" },
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
      vi: "Kiểm tra độ võng dầm kết cấu thép bằng phương pháp chord rotation 3D, kết nối trực tiếp SAP2000 qua COM API. Tự nhận diện dầm console và tự gom Physical Member.",
      en: "Steel beam deflection check using the 3D chord-rotation method, connected live to SAP2000 via COM API. Automatic cantilever detection and Physical-Member grouping."
    },
    version: "2.5", size: "~23 MB", updated: "2026-08", os: WIN, host: "SAP2000",
    priceVnd: 350000, productCode: "DEFLECT", status: "ready",
    thumb: PIC + "web_description_03/01.png",
    screenshots: [PIC+"web_description_03/01.png", PIC+"web_description_03/02.png"],
    features: [
      { vi: "<b>Kiểm tra tương đối</b> L/δ theo phương pháp chord rotation 3D — tách chuyển vị thực khỏi chuyển động cứng của hai đầu dầm", en: "<b>Relative check</b> L/δ by the 3D chord-rotation method — separates true deformation from rigid-body motion of the two ends" },
      { vi: "<b>Kiểm tra tuyệt đối</b> theo U3 (mm) khi cần giới hạn võng theo trị số", en: "<b>Absolute check</b> on U3 (mm) when a fixed deflection limit is required" },
      { vi: "<b>Tự nhận diện dầm console</b> (degree = 1 → đầu tự do) và áp giới hạn L/180", en: "<b>Automatic cantilever detection</b> (node degree = 1 → free end) applying the L/180 limit" },
      { vi: "<b>Auto Create Groups</b> từ nhận diện Physical Member — gom các phần tử thành cấu kiện thật, dừng đúng tại cột và khi đổi tiết diện", en: "<b>Auto Create Groups</b> from Physical-Member detection — chains elements into real members, stopping at columns and section changes" },
      { vi: "Đọc cả node auto-mesh (~xxx) nên dầm đã chia nhỏ vẫn kiểm tra đúng", en: "Reads auto-mesh nodes (~xxx) so meshed beams are still checked correctly" },
      { vi: "Chọn nhanh nhiều Load Case/Combo bằng prefix; click Group là SAP2000 tự highlight", en: "Quick prefix selection of many load cases/combos; clicking a group highlights it in SAP2000" },
      { vi: "Lọc <b>Show NG only</b>, tô màu xanh/đỏ trực tiếp trên bảng kết quả", en: "<b>Show NG only</b> filter with green/red colour coding in the results table" },
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
      vi: "Plugin .NET cho AutoCAD giúp vẽ cấu kiện thép thông minh: mỗi dầm là một đối tượng có 7 grip, đổi được 4 kiểu hình chiếu và 6 dạng tiết diện — kèm module ghi chú bản vẽ, module BTCT và bulông neo.",
      en: "A .NET plugin for AutoCAD that draws parametric steel members: each beam is a smart object with 7 grips, 4 switchable view types and 6 section shapes — plus drawing-markup, RC detailing and anchor-bolt modules."
    },
    version: "1.0", size: "—", updated: "2026-08", os: WIN, host: "AutoCAD 2023",
    priceVnd: 350000, productCode: "STEELCAD", status: "ready",
    thumb: PIC + "web_description_07/01.png",
    screenshots: [PIC+"web_description_07/01.png", PIC+"web_description_07/02.png", PIC+"web_description_07/03.png", PIC+"web_description_07/04.png"],
    features: [
      { vi: "<b>Cấu kiện thép tham số</b>: 7 grip kéo trực tiếp, đổi tiết diện/nhãn/cắt vát mà không vẽ lại", en: "<b>Parametric steel members</b>: 7 draggable grips; change section, label or cuts without redrawing" },
      { vi: "<b>4 kiểu hình chiếu</b> chuyển đổi tức thì: Mặt bằng, Mặt đứng, Mặt đứng nhìn sau (cánh nét khuất), Mặt cắt", en: "<b>4 view types</b> switched instantly: Plan, Elevation, Elevation-back (hidden flanges), Section" },
      { vi: "<b>6 dạng tiết diện</b>: H/W/I, Box, Pipe, T, C… đọc từ thư viện Section Data (12 sheet)", en: "<b>6 section shapes</b>: H/W/I, Box, Pipe, T, C… read from a 12-sheet section database" },
      { vi: "Liên kết cứng (Moment Connection), đường tim làm việc (Working Line), nhãn tiết diện đầy đủ/rút gọn", en: "Moment connections, working-line control, full/short section labels" },
      { vi: "<b>Module ghi chú bản vẽ</b>: liên kết, lưới trục, ghi chú, ký hiệu mặt cắt, khung tên chi tiết", en: "<b>Markup module</b>: connections, grids, notes, section symbols, detail/section titles" },
      { vi: "<b>Module bê tông cốt thép</b>: cột, dầm, móng và mặt cắt đứng móng (RCCOLUMN, RCBEAM, RCFOUND)", en: "<b>RC drawing module</b>: columns, beams, foundations and foundation elevations (RCCOLUMN, RCBEAM, RCFOUND)" },
      { vi: "<b>Bulông neo</b> (STEELBOLT) cho chi tiết chân cột", en: "<b>Anchor bolts</b> (STEELBOLT) for base-plate details" },
      { vi: "<b>Bảng điều khiển neo được</b> (palette) — chọn tiết diện, tỉ lệ bản vẽ, chiều cao chữ, kiểu chữ RBTCAD", en: "<b>Dockable palette</b> — section browser, drawing scale, text height, RBTCAD text style" }
    ],
    requirements: REQ_CAD, download: "", checksum: "", virustotal: ""
  },

  /* ---- 08 ---- */
  {
    id: "monorail-beam-design",
    category: CAT_STEEL,
    name: { vi: "Thiết kế dầm monorail", en: "Monorail Beam Design" },
    tagline: {
      vi: "Phân tích và thiết kế dầm monorail treo (underhung) theo AISC 9th Edition ASD và CMAA No. 74 (2004): uốn hai phương, xoắn – vênh, ứng suất cánh dưới, console và độ võng. Đơn vị SI, có sơ đồ dầm tự sinh.",
      en: "Analysis and design of underhung monorail beams per AISC 9th Edition ASD and CMAA Specification No. 74 (2004): biaxial bending, torsion–warping, bottom-flange stresses, overhang and deflection. SI units with an auto-generated beam diagram."
    },
    version: "1.2", size: "~45 MB", updated: "2026-08", os: WIN, host: "General",
    priceVnd: 250000, productCode: "MONORAIL", status: "ready",
    thumb: PIC + "web_description_08/01.png",
    screenshots: [PIC+"web_description_08/01.png", PIC+"web_description_08/02.png", PIC+"web_description_08/03.png", PIC+"web_description_08/04.png"],
    features: [
      { vi: "<b>Thư viện tiết diện đa dạng</b>: W, H (tổ hợp), I, UB/UC, HE/IPE — chọn theo 2 cấp", en: "<b>Multi-section support</b>: W, H (built-up), I, UB/UC, HE/IPE — two-level selection" },
      { vi: "Kiểm tra uốn trục X (AISC Chương F), uốn trục Y kèm <b>ứng suất vênh do xoắn</b>, và tỉ số ứng suất tổ hợp ≤ 1.0", en: "X-axis bending (AISC Chapter F), Y-axis bending including <b>warping stress</b>, and combined stress ratio ≤ 1.0" },
      { vi: "<b>Kiểm tra cánh dưới theo CMAA No. 74</b>: fto, ft1, ft2 ≤ 0.66·Fy — phần dễ bỏ sót nhất khi thiết kế monorail", en: "<b>Bottom-flange checks per CMAA No. 74</b>: fto, ft1, ft2 ≤ 0.66·Fy — the most commonly missed part of monorail design" },
      { vi: "Tính riêng cho <b>đoạn console</b> (Lo, Lbo, Cbo) khi dầm có phần vươn", en: "Separate checks for the <b>overhang</b> (Lo, Lbo, Cbo) when the beam cantilevers" },
      { vi: "Kể đến hệ số xung đứng và lực ngang của palăng, số bánh xe (2/4/8) và khoảng cách bánh", en: "Includes vertical impact and horizontal load factors, wheel count (2/4/8) and wheel spacing" },
      { vi: "Kiểm tra độ võng Δmax ≤ L/450", en: "Deflection check Δmax ≤ L/450" },
      { vi: "<b>Sơ đồ dầm tự sinh</b> kèm tải, gối và kích thước; hình mặt cắt tự co giãn theo khung", en: "<b>Auto-generated beam diagram</b> with loads, supports and dimensions; cross-section figures rescale with the panel" },
      { vi: "Kết quả tô màu Đạt/Không đạt và chỉ rõ <b>trường hợp khống chế</b>", en: "Colour-coded pass/fail results identifying the <b>governing check</b>" },
      { vi: "Lưu/mở dự án (.mbdproj) — mở lại là tự chạy lại phân tích, không bao giờ lưu số liệu cũ", en: "Save/open project (.mbdproj) — reopening re-runs the analysis, so a project can never hold stale numbers" }
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
    version: "2.0", size: "—", updated: "2026-08", os: WIN, host: "General",
    priceVnd: 250000, productCode: "CRANEGIRDER", status: "ready",
    thumb: PIC + "web_description_06/01.png",
    screenshots: [PIC+"web_description_06/01.png", PIC+"web_description_06/03.png"],
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
      vi: "Kiểm tra khả năng chịu tải của cọc (nén, nhổ, cắt ngang) theo từng nhóm tổ hợp Thường xuyên / Gió / Động đất, kèm kiểm tra lún lệch vi sai giữa mọi cặp cọc. Lấy phản lực trực tiếp từ SAP2000.",
      en: "Checks pile capacity (compression, uplift, lateral) against Long-term / Wind / Seismic combination groups, plus differential settlement between every pile pair. Reactions taken live from SAP2000."
    },
    version: "1.2", size: "—", updated: "2026-08", os: WIN, host: "SAP2000",
    priceVnd: 250000, productCode: "PILECAP", status: "ready",
    thumb: PIC + "web_description_04/01.png",
    screenshots: [PIC+"web_description_04/01.png", PIC+"web_description_04/02.png", PIC+"web_description_04/03.png", PIC+"web_description_04/04.png", PIC+"web_description_04/05.png"],
    features: [
      { vi: "<b>Nhập dữ liệu tự động</b>: chọn node cọc trong SAP2000 → tool tự trích tọa độ, phản lực, chuyển vị", en: "<b>Automatic data input</b>: select pile nodes in SAP2000 → the tool extracts coordinates, reactions and displacements" },
      { vi: "<b>Tự phân loại Load Type</b> (Thường xuyên / Gió / Động đất) từ Load Pattern khai báo trong SAP2000", en: "<b>Automatic load-type classification</b> (Long-term / Wind / Seismic) from the load patterns declared in SAP2000" },
      { vi: "Khai báo nhiều loại cọc với sức chịu tải riêng cho từng nhóm tổ hợp; đổi đơn vị kN ↔ Ton tự quy đổi", en: "Multiple pile types with separate allowables per combination group; kN ↔ Ton switching converts values automatically" },
      { vi: "<b>Sơ đồ mặt bằng cọc</b> tô màu theo loại cọc hoặc theo tỉ số chịu tải; click vào cọc xem chi tiết", en: "<b>Piling diagram</b> coloured by pile type or capacity ratio; click a pile for details" },
      { vi: "<b>Kiểm tra lún lệch vi sai</b> — vector hoá numpy nên kiểm đủ 100% số cặp cọc (6,4 triệu cặp ~0,3 giây)", en: "<b>Differential settlement check</b> — numpy-vectorised, so 100% of pile pairs are checked (6.4 million pairs in ~0.3 s)" },
      { vi: "Báo cáo Excel sức chịu tải (4 sheet) và báo cáo lún lệch (2 sheet) kèm thống kê toàn cục", en: "Excel capacity report (4 sheets) and settlement report (2 sheets) with global statistics" },
      { vi: "<b>Một dự án = một file .json</b> — không sinh file CSV trung gian", en: "<b>One project = one .json file</b> — no intermediate CSV files" }
    ],
    requirements: REQ_SAP, download: "", checksum: "", virustotal: ""
  },

  /* ---- 09 ---- */
  {
    id: "wind-load-vertical-tank",
    category: CAT_LOAD,
    name: { vi: "Tải trọng gió lên bồn đứng", en: "Wind Load on Vertical Tank" },
    tagline: {
      vi: "Tính tải trọng gió thiết kế cho bồn, thiết bị đứng và ống khói đặt trên nền theo ASCE 7-22 Chương 29 — tự phân biệt kết cấu cứng/mềm, chọn hệ số lực Cf tự động và lập bảng tải theo từng cao độ.",
      en: "Wind design loads for ground-supported vertical tanks, vessels and stacks per ASCE 7-22 Chapter 29 — automatic rigid/flexible classification, automatic force coefficient Cf, and an elevation-by-elevation load table."
    },
    version: "2.1", size: "—", updated: "2026-08", os: WIN, host: "General",
    priceVnd: 250000, productCode: "WINDTANK", status: "ready",
    thumb: PIC + "web_description_09/01.png",
    screenshots: [PIC+"web_description_09/01.png", PIC+"web_description_09/02.png"],
    features: [
      { vi: "Theo <b>ASCE 7-22 Chương 29</b> cho kết cấu dạng trụ đặt trên nền", en: "Per <b>ASCE 7-22 Chapter 29</b> for ground-supported cylindrical structures" },
      { vi: "Hỗ trợ mặt cắt <b>Tròn, Lục giác, Bát giác và Vuông</b>", en: "Supports <b>round, hexagonal, octagonal and square</b> shapes" },
      { vi: "<b>Tự phân biệt kết cấu cứng / mềm</b> theo tần số dao động riêng (ngưỡng 1 Hz)", en: "<b>Automatic rigid vs flexible classification</b> from the natural frequency (1 Hz threshold)" },
      { vi: "Hệ số giật G: đơn giản hoá (0,85), chi tiết cho kết cấu cứng, và Gf cho kết cấu mềm", en: "Gust effect factor G: simplified (0.85), detailed rigid, and Gf for flexible structures" },
      { vi: "<b>Tự chọn hệ số lực Cf</b> theo hình dạng, độ nhám bề mặt và tích D×√qz", en: "<b>Automatic force coefficient Cf</b> based on shape, surface roughness and D×√qz" },
      { vi: "Lập bảng tải gió <b>theo từng cao độ</b> kèm lực cắt và moment tại chân", en: "<b>Elevation-by-elevation</b> wind load table with base shear and overturning moment" },
      { vi: "Xuất Excel định dạng sẵn và lưu/mở dự án (.json)", en: "Formatted Excel export and save/open project (.json)" }
    ],
    requirements: REQ_STD, download: "", checksum: "", virustotal: ""
  },

  /* ---- 11 ---- */
  {
    id: "embedded-plate-design",
    category: CAT_RC,
    name: { vi: "Thiết kế bản thép chờ (Embedded Plate)", en: "Embedded Plate Design" },
    tagline: {
      vi: "Thiết kế bản thép chôn sẵn trong bê tông: bố trí chốt neo, kiểm tra kéo – cắt – tổ hợp và các dạng phá hoại bê tông (kéo tuột, phá hoại nón, bung mép) theo ACI 318.",
      en: "Design of plates cast into concrete: stud layout, tension–shear–interaction checks and concrete failure modes (pull-out, breakout, edge blow-out) per ACI 318."
    },
    version: "1.0", size: "—", updated: "2026-08", os: WIN, host: "General",
    priceVnd: 250000, productCode: "EMBPLATE", status: "ready",
    thumb: PIC + "web_description_11/01.png",
    screenshots: [PIC+"web_description_11/01.png", PIC+"web_description_11/02.png", PIC+"web_description_11/03.jpg", PIC+"web_description_11/04.png"],
    features: [
      { vi: "Bố trí chốt neo (stud) theo lưới tuỳ chọn, kiểm tra khoảng cách và khoảng cách mép", en: "Configurable stud layout with spacing and edge-distance checks" },
      { vi: "Kiểm tra chốt neo chịu <b>kéo, cắt và tổ hợp kéo–cắt</b>", en: "Stud checks in <b>tension, shear and tension–shear interaction</b>" },
      { vi: "Các dạng phá hoại bê tông: <b>phá hoại nón (breakout), kéo tuột (pullout), bung mép (blow-out)</b>", en: "Concrete failure modes: <b>breakout, pullout and side-face blow-out</b>" },
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
    priceVnd: 250000, productCode: "RCCORBEL", status: "ready",
    thumb: PIC + "web_description_12/01.png",
    screenshots: [PIC+"web_description_12/01.png", PIC+"web_description_12/02.png"],
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
      vi: "Kiểm tra chuyển vị ngang giữa các tầng cho kết cấu thép, kết nối trực tiếp SAP2000 qua COM API. Tự gom các nút theo trục cột và đọc được tên trục lưới từ mô hình.",
      en: "Storey-drift check for steel structures, connected live to SAP2000 via COM API. Groups joints by column line automatically and reads real grid names from the model."
    },
    version: "2.3", size: "~23 MB", updated: "2026-08", os: WIN, host: "SAP2000 v26",
    priceVnd: 125000, productCode: "SIDESWAY", status: "ready",
    thumb: PIC + "web_description_02/01.png",
    screenshots: [PIC+"web_description_02/01.png", PIC+"web_description_02/02.png"],
    features: [
      { vi: "<b>Tự gom nút theo trục cột</b> (cùng X, Y) rồi kiểm tra từng cặp nút dưới–trên: Δ = |U_trên − U_dưới| so với H/200 (đặt được)", en: "<b>Groups joints by column line</b> (same X, Y) then checks each lower–upper pair: Δ = |U_top − U_bot| against H/200 (configurable)" },
      { vi: "<b>Đọc tên trục lưới thật</b> từ SAP2000 (ví dụ A-1, C-2) thay vì chỉ hiện toạ độ", en: "<b>Reads real grid names</b> from SAP2000 (e.g. A-1, C-2) instead of showing bare coordinates" },
      { vi: "Lấy nút theo 3 cách: nút đang chọn trong SAP, toàn bộ nút, hoặc từ một Group", en: "Three ways to pick joints: current SAP selection, all joints, or from a group" },
      { vi: "Kiểm tra cả Load Case và Load Combination; chọn nhanh nhiều LC bằng prefix", en: "Checks both load cases and combinations; quick prefix selection of many cases" },
      { vi: "Tự tìm tổ hợp gây chuyển vị lớn nhất theo phương X và Y cho từng trục cột", en: "Finds the governing combination for X and Y drift on each column line" },
      { vi: "Xuất Excel 2 sheet (Tổng hợp + Chi tiết từng cặp nút) và file .DISP", en: "Exports a 2-sheet Excel workbook (Summary + Detailed) and a .DISP file" }
    ],
    requirements: REQ_SAP, download: "", checksum: "", virustotal: ""
  },

  /* ---- 05 · FREE ---- */
  {
    id: "grds-slab-on-grade",
    category: CAT_FDN,
    name: { vi: "Thiết kế sàn nền bê tông (Slab on Grade)", en: "Concrete Slab on Grade Design" },
    tagline: {
      vi: "Kiểm tra, tính toán và thiết kế sàn nền bê tông theo Westergaard / PCA / ACI 360 / TM 5-809-12. Giao diện trực quan, đơn vị SI, xuất báo cáo Excel & HTML.",
      en: "Analysis and design of concrete slabs on grade to Westergaard / PCA / ACI 360 / TM 5-809-12. Intuitive interface, SI units, Excel & HTML report export."
    },
    version: "1.1", size: "63 MB", updated: "2026-08", os: WIN, host: "General",
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
    download: "https://github.com/Roberto-0720/05_GroundFloorDesign/releases/latest/download/GRDS.zip",
    checksum: "", virustotal: ""
  },

  /* ---- 10 · FREE ---- */
  {
    id: "seismic-vertical-tank",
    category: CAT_LOAD,
    name: { vi: "Tải trọng động đất lên bồn đứng", en: "Seismic Load on Vertical Tank" },
    tagline: {
      vi: "Tính tải trọng động đất cho bồn đứng đặt trên nền (thép hoặc bê tông) theo ASCE 7-22 Chương 15 §15.7.6 và API 650 Phụ lục E — từ phổ thiết kế đến lực cắt và moment lật tại chân bồn.",
      en: "Seismic design loads for ground-supported vertical tanks (steel or concrete) per ASCE 7-22 Chapter 15 §15.7.6 and API 650 Appendix E — from design spectra to base shear and overturning moment."
    },
    version: "2.1", size: "—", updated: "2026-08", os: WIN, host: "General",
    priceVnd: 0, productCode: "SEISTANK", status: "ready",
    thumb: PIC + "web_description_10/01.png",
    screenshots: [PIC+"web_description_10/01.png", PIC+"web_description_10/02.png"],
    features: [
      { vi: "Theo <b>ASCE 7-22 Chương 15 §15.7.6</b> (kết cấu không phải nhà) và <b>API 650 Phụ lục E</b>", en: "Per <b>ASCE 7-22 Chapter 15 §15.7.6</b> (nonbuilding structures) and <b>API 650 Appendix E</b>" },
      { vi: "Tự tra hệ số nền Fa, Fv và tính phổ SMS, SM1, SDS, SD1 từ Ss, S1 và Site Class", en: "Site coefficients Fa, Fv and spectral values SMS, SM1, SDS, SD1 from Ss, S1 and site class" },
      { vi: "Xác định <b>Cấp thiết kế kháng chấn</b> theo Bảng 11.6-1 và 11.6-2", en: "Determines the <b>Seismic Design Category</b> per Tables 11.6-1 and 11.6-2" },
      { vi: "Chu kỳ dao động cơ bản T và phân loại cứng/mềm; hệ số R, Ω₀, Cd theo 10 dạng kết cấu (T1–T10)", en: "Fundamental period T with rigid/flexible classification; R, Ω₀, Cd for 10 structural types (T1–T10)" },
      { vi: "Lực cắt đáy V và moment lật Mo; nhập riêng trọng lượng mái, thân, đáy và chất chứa", en: "Base shear V and overturning moment Mo; separate roof, shell, bottom and contents weights" },
      { vi: "Bảng tra ASCE 7-22 đóng gói sẵn trong phần mềm, có thể tự cập nhật", en: "ASCE 7-22 reference tables shipped with the tool and user-updatable" },
      { vi: "Xuất Excel và lưu/mở dự án (.json)", en: "Excel export and save/open project (.json)" }
    ],
    requirements: REQ_STD,
    download: "https://github.com/Roberto-0720/10_SeismicOnVerTank/releases/latest/download/SLVT.zip",
    checksum: "", virustotal: ""
  },

  /* ==========================================================
     IN DEVELOPMENT — shown as "Coming soon"
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
    thumb: PIC + "web_description_13/01.png",
    screenshots: [PIC+"web_description_13/01.png", PIC+"web_description_13/02.png", PIC+"web_description_13/03.png"],
    features: [], requirements: REQ_SAP, download: "", checksum: "", virustotal: ""
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
      vi: "Thiết kế đài cọc và phân phối tải lên nhóm cọc, kiểm tra đài chịu uốn và chọc thủng.",
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
