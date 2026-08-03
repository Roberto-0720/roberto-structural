/* ============================================================
   Roberto Structural — ARTICLES / INSIGHTS DATA (single source of truth)
   ------------------------------------------------------------
   HOW TO ADD AN ARTICLE  (see HUONG_DAN_BAI_VIET.md for the full guide)
   1. Copy an { ... } block and paste it at the TOP of window.ARTICLES
      (newest first — the list is displayed in this order).
   2. "id"      : short slug, becomes the URL  article.html?id=YOUR-ID
      "no"      : article number shown as "No. 01"
      "category": must match one entry in window.ARTICLE_CATEGORIES below
      "date"    : "YYYY-MM-DD" (used for display and sorting)
      "readmin" : estimated reading time in minutes
   3. Put figures in  Resource/articles/<slug>/  and reference them in
      the section's "figures" array.
   4. Each section = one heading + a "body" array of BLOCKS:
        { vi, en }                            → paragraph
        { type:"subhead", vi, en }            → sub-heading
        { type:"list", items:[{vi,en},...] }  → bulleted list
        { type:"table", head:[...], rows:[[...]] } → table
      Optional "figures": [ { src, caption:{vi,en} }, ... ]  (one or many)
   5. Text may contain <b> <i> <br> for formatting.
   6. To EDIT an article later, just change the text here — nothing else to touch.
   ============================================================ */

window.ARTICLE_CATEGORIES = [
  { vi: "Kết cấu thép",        en: "Steel Structures" },
  { vi: "Kết cấu BTCT",        en: "Reinforced Concrete" },
  { vi: "Mô hình & Phân tích", en: "Modelling & Analysis" },
  { vi: "Thi công",            en: "Construction" },
  { vi: "Móng thiết bị",       en: "Equipment Foundations" }
];

window.ARTICLES = [
  {
    id: "dam-aisc360-sap2000",
    no: "02",
    category: { vi: "Mô hình & Phân tích", en: "Modelling & Analysis" },
    date: "2026-08-03",
    readmin: 18,
    title: {
      vi: "Phương pháp Phân tích Trực tiếp (DAM) theo AISC 360-10 trong SAP2000",
      en: "The Direct Analysis Method (AISC 360-10) in SAP2000"
    },
    excerpt: {
      vi: "Quy trình 4 bước, 7 lưu ý và cẩm nang đọc ngược từ output. DAM không phải một tuỳ chọn trong menu Design — nó là hợp đồng ba điều kiện giữa phân tích và thiết kế.",
      en: "A four-step workflow, seven traps and a way to read the output backwards. DAM is not a menu option in Design — it is a three-clause contract between analysis and design."
    },
    cover: "Resource/articles/02-dam-sap2000/cover.webp",
    sections: [
      {
        heading: { vi: "1. Tại sao phải là DAM?", en: "1. Why the Direct Analysis Method?" },
        body: [
          {
            vi: "Sức bền của một cột thép trong nhà máy không chỉ phụ thuộc vào tiết diện của nó, mà phụ thuộc vào <b>độ mềm của toàn hệ</b>. AISC 360-10 Chương C yêu cầu bài toán ổn định phải xét đồng thời ba nguồn:",
            en: "The strength of a steel column in a plant does not depend on its section alone — it depends on <b>the flexibility of the whole system</b>. AISC 360-10 Chapter C requires stability to account for three sources at once:"
          },
          {
            type: "list",
            items: [
              { vi: "<b>Hiệu ứng bậc hai</b>: P-Δ (chuyển vị của nút) và P-δ (biến dạng uốn trong lòng cấu kiện);", en: "<b>Second-order effects</b>: P-Δ (joint displacement) and P-δ (flexural deformation within the member);" },
              { vi: "<b>Sai lệch hình học ban đầu</b>: cột nghiêng do dựng lắp, thường lấy 1/500;", en: "<b>Initial geometric imperfections</b>: erection out-of-plumb, normally taken as 1/500;" },
              { vi: "<b>Suy giảm độ cứng do chảy phân bố</b> (partial yielding, ứng suất dư).", en: "<b>Stiffness reduction from partial yielding</b> and residual stresses." }
            ]
          },
          {
            vi: "<b>Phương pháp Chiều dài hiệu dụng (Effective Length Method — ELM)</b> dồn cả ba yếu tố này vào một con số duy nhất — hệ số <b>K</b> — rồi bắt kỹ sư đi tra biểu đồ alignment chart với vô số giả thiết mà kết cấu công nghiệp thực tế (khung có giằng lệch tâm, cột đỡ thiết bị, pipe rack nhiều cao trình, chân cột trên trụ RC) rất khó thoả mãn.",
            en: "The <b>Effective Length Method (ELM)</b> compresses all three into a single number — the <b>K</b> factor — then asks the engineer to read an alignment chart built on assumptions that real industrial structures (eccentrically braced frames, equipment support columns, multi-level pipe racks, column bases on RC pedestals) rarely satisfy."
          },
          {
            vi: "<b>DAM đảo ngược logic đó</b>: mô hình gánh phần khó — bằng phân tích bậc hai, tải trọng danh nghĩa (notional load) và độ cứng suy giảm — để rồi cấu kiện được kiểm tra với <b>K = 1.0</b>, dùng chính chiều dài thật của nó. Với kết cấu nhà máy, đây không chỉ là lựa chọn “hiện đại”, nó là lựa chọn <b>duy nhất bảo vệ được kỹ sư khi cần giải trình về K</b>.",
            en: "<b>DAM inverts that logic</b>: the model carries the hard part — through second-order analysis, notional loads and reduced stiffness — so that members are then checked with <b>K = 1.0</b>, using their actual length. For plant structures this is not merely the “modern” choice; it is <b>the only one that protects the engineer when K has to be justified</b>."
          },
          {
            type: "tip",
            vi: "<b>Điểm mấu chốt:</b> DAM không phải một tuỳ chọn trong menu Design. Nó là một <b>hợp đồng ba điều kiện</b> giữa phần phân tích và phần thiết kế. Vi phạm một điều kiện — kết quả D/C ratio trở nên vô nghĩa.",
            en: "<b>The key point:</b> DAM is not an option in the Design menu. It is a <b>three-clause contract</b> between the analysis and the design. Break one clause and the D/C ratios become meaningless."
          },
          {
            type: "figure",
            src: { vi: "Resource/articles/02-dam-sap2000/fig-01-vi.svg", en: "Resource/articles/02-dam-sap2000/fig-01-en.svg" },
            caption: {
              vi: "<b>Hình 1.</b> Cùng ba nguồn ảnh hưởng ổn định — hai lộ trình xử lý theo AISC 360-10 Chương C.",
              en: "<b>Figure 1.</b> The same three stability effects — two routes through AISC 360-10 Chapter C."
            }
          },
          { type: "subhead", vi: "Ba điều kiện bắt buộc của DAM (AISC 360-10 §C2)", en: "The three mandatory DAM conditions (AISC 360-10 §C2)" },
          {
            type: "table",
            head: [
              { vi: "Điều khoản", en: "Clause" },
              { vi: "Yêu cầu", en: "Requirement" },
              { vi: "Công thức", en: "Formula" },
              { vi: "Nơi khai báo trong SAP2000", en: "Where to set it in SAP2000" }
            ],
            rows: [
              [ { vi: "C2.1", en: "C2.1" }, { vi: "Phân tích bậc hai (P-Δ <b>và</b> P-δ)", en: "Second-order analysis (P-Δ <b>and</b> P-δ)" }, { vi: "—", en: "—" }, { vi: "Nonlinear Static + P-Delta; divide frame", en: "Nonlinear Static + P-Delta; divide frame" } ],
              [ { vi: "C2.2b", en: "C2.2b" }, { vi: "Notional load ở mọi cao trình", en: "Notional load at every level" }, { vi: "<i>N<sub>i</sub></i> = 0.002·α·<i>Y<sub>i</sub></i>, α = 1.0 (LRFD) / 1.6 (ASD)", en: "<i>N<sub>i</sub></i> = 0.002·α·<i>Y<sub>i</sub></i>, α = 1.0 (LRFD) / 1.6 (ASD)" }, { vi: "Load Pattern type <b>NOTIONAL</b>", en: "Load Pattern type <b>NOTIONAL</b>" } ],
              [ { vi: "C2.3", en: "C2.3" }, { vi: "Suy giảm độ cứng", en: "Stiffness reduction" }, { vi: "<i>EA*</i> = 0.8<i>EA</i>; <i>EI*</i> = 0.8·τ<sub>b</sub>·<i>EI</i>", en: "<i>EA*</i> = 0.8<i>EA</i>; <i>EI*</i> = 0.8·τ<sub>b</sub>·<i>EI</i>" }, { vi: "Frame Property Modifiers", en: "Frame Property Modifiers" } ],
              [ { vi: "C3", en: "C3" }, { vi: "Kiểm tra cấu kiện với <b>K = 1.0</b>", en: "Check members with <b>K = 1.0</b>" }, { vi: "<i>L<sub>c</sub></i> = <i>L</i>", en: "<i>L<sub>c</sub></i> = <i>L</i>" }, { vi: "Steel Frame Design Overwrites", en: "Steel Frame Design Overwrites" } ]
            ]
          },
          {
            vi: "với τ<sub>b</sub> = 1.0 khi α<i>P<sub>r</sub></i>/<i>P<sub>y</sub></i> ≤ 0.5, và τ<sub>b</sub> = 4(α<i>P<sub>r</sub></i>/<i>P<sub>y</sub></i>)[1 − α<i>P<sub>r</sub></i>/<i>P<sub>y</sub></i>] khi α<i>P<sub>r</sub></i>/<i>P<sub>y</sub></i> &gt; 0.5.",
            en: "where τ<sub>b</sub> = 1.0 when α<i>P<sub>r</sub></i>/<i>P<sub>y</sub></i> ≤ 0.5, and τ<sub>b</sub> = 4(α<i>P<sub>r</sub></i>/<i>P<sub>y</sub></i>)[1 − α<i>P<sub>r</sub></i>/<i>P<sub>y</sub></i>] when α<i>P<sub>r</sub></i>/<i>P<sub>y</sub></i> &gt; 0.5."
          }
        ]
      },
      {
        heading: { vi: "2. BƯỚC 1 — Khai báo Notional Load", en: "2. STEP 1 — Defining the notional loads" },
        body: [
          {
            vi: "Notional load là <b>lực ngang tương đương</b> mô phỏng cột nghiêng 1/500, bằng 0.002 lần tải trọng đứng tại cao trình đang xét, và <b>phân bố theo đúng cách tải trọng đứng phân bố</b> (§C2.2b(3)).",
            en: "A notional load is an <b>equivalent lateral force</b> standing in for a 1/500 out-of-plumb column: 0.002 times the gravity load at the level considered, <b>distributed the same way that gravity load is distributed</b> (§C2.2b(3))."
          },
          {
            type: "figure",
            src: { vi: "Resource/articles/02-dam-sap2000/fig-02-vi.svg", en: "Resource/articles/02-dam-sap2000/fig-02-en.svg" },
            caption: {
              vi: "<b>Hình 2.</b> Bản chất của notional load: thay hình học nghiêng bằng lực ngang tương đương.",
              en: "<b>Figure 2.</b> What a notional load really is: out-of-plumb geometry replaced by an equivalent lateral force."
            }
          },
          { type: "subhead", vi: "2.1 Trình tự khai báo", en: "2.1 The order of definition" },
          {
            vi: "<b>(a) Chốt bộ tổ hợp LRFD trước tiên.</b> Notional load “ký sinh” trên tổ hợp: mỗi tổ hợp có một tổ hợp tải đứng riêng, nên phải có danh sách combo hoàn chỉnh trước khi bắt đầu.",
            en: "<b>(a) Fix the LRFD combination set first.</b> Notional loads are parasitic on combinations: each combination carries its own gravity mix, so the full combo list must exist before you start."
          },
          {
            vi: "<b>(b) Lọc ra toàn bộ Load Pattern mang tính “tải trọng đứng”</b> — không chỉ DL. Trong dự án nhà máy, danh sách này dài hơn ta tưởng: tải trọng bản thân (BL), tĩnh tải hoàn thiện (DL), tải thiết bị empty (EE), tải vận hành (EOL), tải nước thử áp (ETL), hoạt tải sàn (LL), hoạt tải sàn công tác/monorail (LLM)… <b>Bỏ sót một pattern nào là thiếu notional load của pattern đó.</b>",
            en: "<b>(b) List every load pattern that is a “gravity load”</b> — not just DL. On a plant project this list is longer than expected: self weight (BL), superimposed dead (DL), equipment empty (EE), operating (EOL), hydrotest water (ETL), floor live (LL), platform/monorail live (LLM)… <b>Miss one pattern and you are missing its notional load.</b>"
          },
          {
            vi: "<b>(c) Tạo cặp Load Pattern notional cho mỗi tải đứng</b> theo hai phương X, Y (quy ước đặt tên gọn: <code>xDL</code>/<code>yDL</code>, <code>xEE</code>/<code>yEE</code>…):",
            en: "<b>(c) Create a notional load pattern pair for every gravity load</b> in the X and Y directions (a compact naming convention: <code>xDL</code>/<code>yDL</code>, <code>xEE</code>/<code>yEE</code>…):"
          },
          {
            type: "code",
            vi: "Define &gt; Load Patterns\n  Load Pattern Name : xDL\n  Type              : NOTIONAL\n  Self Weight Mult. : 0            ← BẮT BUỘC = 0\n  Auto Lateral Load : Auto\n  → Modify Lateral Load Pattern...\n       Base Load Pattern : DL\n       Load Ratio        : 2.000E-03      (xem Tip 6 để dùng 3.000E-03)\n       Direction         : Global X / Global Y",
            en: "Define &gt; Load Patterns\n  Load Pattern Name : xDL\n  Type              : NOTIONAL\n  Self Weight Mult. : 0            ← MUST be 0\n  Auto Lateral Load : Auto\n  → Modify Lateral Load Pattern...\n       Base Load Pattern : DL\n       Load Ratio        : 2.000E-03      (see Tip 6 for using 3.000E-03)\n       Direction         : Global X / Global Y"
          },
          {
            type: "tip",
            vi: "<b>Tip 1 — Nhập hàng loạt bằng Interactive Database:</b> với 10–20 tải đứng, khai báo tay 40 pattern là cực hình. Dùng <code>Edit &gt; Interactive Database Editing &gt; Load Pattern Definitions</code>, xuất ra Excel, điền cột <code>LoadPat / DesignType(NOTIONAL) / NotBasePat / NotRatio / NotDir</code>, rồi import lại. Tương tự cho <code>Load Case Definitions</code>, <code>Load Assignments</code>, <code>Combination Definitions</code>. <b>Thao tác có thể tiết kiệm 80% thời gian của cả quy trình DAM.</b>",
            en: "<b>Tip 1 — Bulk entry through the Interactive Database:</b> with 10–20 gravity loads, defining 40 patterns by hand is punishment. Use <code>Edit &gt; Interactive Database Editing &gt; Load Pattern Definitions</code>, export to Excel, fill the <code>LoadPat / DesignType(NOTIONAL) / NotBasePat / NotRatio / NotDir</code> columns, then import back. Do the same for <code>Load Case Definitions</code>, <code>Load Assignments</code> and <code>Combination Definitions</code>. <b>This one habit can save 80% of the time the whole DAM workflow costs.</b>"
          },
          { type: "subhead", vi: "2.2 Kỹ thuật “Repeated Set” — biến 40 pattern thành 8 load case", en: "2.2 The “repeated set” technique — 40 patterns down to 8 load cases" },
          {
            vi: "Nếu cộng notional pattern trực tiếp vào từng combo, ta phải nhập từng dòng hệ số cho mỗi pattern trong mỗi combo — hàng nghìn dòng. Thay vào đó, <b>hãy nhìn vào cấu trúc ngoặc của tổ hợp</b>:",
            en: "Adding notional patterns straight into each combination means one factor line per pattern per combination — thousands of lines. Instead, <b>look at the bracket structure of the combination</b>:"
          },
          {
            type: "code",
            vi: "1.2·(D + Dsup + EE + EOL) + 1.6·(L + Lmono)\n      └──── nhóm lặp lại ────┘   └── nhóm lặp lại ──┘",
            en: "1.2·(D + Dsup + EE + EOL) + 1.6·(L + Lmono)\n      └──── repeated set ────┘   └─ repeated set ─┘"
          },
          {
            vi: "Mỗi <b>nhóm trong ngoặc</b> xuất hiện lại ở nhiều combo với cùng hệ số. Vậy hãy gom notional của cả nhóm thành <b>một Load Case tuyến tính duy nhất</b>:",
            en: "Each <b>bracketed set</b> reappears in many combinations with the same factor. So collapse the notional loads of the whole set into <b>a single linear load case</b>:"
          },
          {
            type: "table",
            head: [
              { vi: "Nhóm tải đứng lặp lại", en: "Repeated gravity set" },
              { vi: "Load Case notional (X)", en: "Notional load case (X)" },
              { vi: "Nội dung Load Case", en: "Load case content" }
            ],
            rows: [
              [ { vi: "D + Dsup + EE", en: "D + Dsup + EE" }, { vi: "<code>NOx</code>", en: "<code>NOx</code>" }, { vi: "xD + xDsup + xEE", en: "xD + xDsup + xEE" } ],
              [ { vi: "D + Dsup + EE + EOL", en: "D + Dsup + EE + EOL" }, { vi: "<code>NOPx</code>", en: "<code>NOPx</code>" }, { vi: "xD + xDsup + xEE + xEOL", en: "xD + xDsup + xEE + xEOL" } ],
              [ { vi: "L", en: "L" }, { vi: "<code>NLx</code>", en: "<code>NLx</code>" }, { vi: "xL", en: "xL" } ],
              [ { vi: "L + Lmono", en: "L + Lmono" }, { vi: "<code>NLMx</code>", en: "<code>NLMx</code>" }, { vi: "xL + xLmono", en: "xL + xLmono" } ],
              [ { vi: "L + 1.4·Lmono", en: "L + 1.4·Lmono" }, { vi: "<code>NLM2x</code>", en: "<code>NLM2x</code>" }, { vi: "xL + 1.4·xLmono", en: "xL + 1.4·xLmono" } ]
            ]
          },
          {
            vi: "Khai báo mỗi Load Case: <code>Static / Linear / Zero Initial Conditions</code>, gộp các notional pattern với Scale Factor bằng đúng tỷ lệ bên trong ngoặc. Khi đó combo chỉ cần thêm <b>2 dòng</b> thay vì 20:",
            en: "Define each load case as <code>Static / Linear / Zero Initial Conditions</code>, combining the notional patterns with scale factors matching the ratios inside the bracket. The combination then needs <b>2 extra lines</b> instead of 20:"
          },
          {
            type: "code",
            vi: "Combo:  1.2·(D+Dsup+EE+EOL) + 1.6·(L+Lmono)  +  1.2·NOPx + 1.6·NLMx",
            en: "Combo:  1.2·(D+Dsup+EE+EOL) + 1.6·(L+Lmono)  +  1.2·NOPx + 1.6·NLMx"
          },
          { type: "subhead", vi: "2.3 Chiều của Notional Load — chỗ 90% kỹ sư làm sai", en: "2.3 Notional load direction — where 90% of engineers go wrong" },
          {
            vi: "§C2.2b(3): notional load phải đặt theo <b>chiều làm tăng hiệu ứng mất ổn định</b> của tổ hợp đang xét.",
            en: "§C2.2b(3): the notional load must act in the direction that <b>increases the destabilising effect</b> of the combination being considered."
          },
          {
            type: "figure",
            src: { vi: "Resource/articles/02-dam-sap2000/fig-03-vi.svg", en: "Resource/articles/02-dam-sap2000/fig-03-en.svg" },
            caption: {
              vi: "<b>Hình 3.</b> Quy tắc chiều đặt notional load trên mặt bằng.",
              en: "<b>Figure 3.</b> Rules for notional load direction in plan."
            }
          },
          {
            type: "table",
            head: [
              { vi: "Loại tổ hợp", en: "Combination type" },
              { vi: "Chiều notional", en: "Notional direction" },
              { vi: "Số combo phái sinh", en: "Derived combinations" }
            ],
            rows: [
              [ { vi: "<b>Chỉ có tải đứng</b>", en: "<b>Gravity only</b>" }, { vi: "Cả 4 chiều: +X, −X, +Y, −Y (chưa biết chiều bất lợi)", en: "All four: +X, −X, +Y, −Y (the governing direction is unknown)" }, { vi: "<b>× 4</b>", en: "<b>× 4</b>" } ],
              [ { vi: "<b>Có tải ngang</b> (W, E)", en: "<b>With lateral load</b> (W, E)" }, { vi: "Cùng chiều hợp lực ngang của combo đó", en: "Along the resultant lateral force of that combination" }, { vi: "<b>× 1</b>", en: "<b>× 1</b>" } ]
            ]
          },
          {
            vi: "Ví dụ với combo có gió <i>1.6·(W<sub>X</sub> + 0.5·W<sub>Y</sub>)</i>: notional cũng phải theo tỷ lệ đó → <i>+1.6·(N<sub>x</sub> + 0.5·N<sub>y</sub>)</i>. Với combo động đất <i>1.0·(V<sub>X</sub> − 0.3·V<sub>Y</sub>)</i> → <i>+1.0·(N<sub>x</sub> − 0.3·N<sub>y</sub>)</i>. Dấu trừ phải giữ nguyên dấu trừ.",
            en: "For a wind combination <i>1.6·(W<sub>X</sub> + 0.5·W<sub>Y</sub>)</i> the notional loads follow the same ratio → <i>+1.6·(N<sub>x</sub> + 0.5·N<sub>y</sub>)</i>. For a seismic combination <i>1.0·(V<sub>X</sub> − 0.3·V<sub>Y</sub>)</i> → <i>+1.0·(N<sub>x</sub> − 0.3·N<sub>y</sub>)</i>. A minus sign stays a minus sign."
          },
          {
            type: "tip",
            vi: "<b>Tip 2 — Giải pháp cho tổ hợp có tải ngang (§C2.2b(4)):</b> nếu tại <b>mọi tầng</b>, tỷ số Δ<sub>bậc 2</sub>/Δ<sub>bậc 1</sub> (tính với độ cứng đã suy giảm) <b>≤ 1.7</b>, thì notional load <b>chỉ cần đặt trong các tổ hợp thuần tải đứng</b>. Với hệ giằng công nghiệp cứng, điều kiện này gần như luôn thoả. Hãy kiểm tra tỷ số này ngay từ đầu: nó có thể xoá bỏ hàng trăm combo. Nếu tỷ số &gt; 1.7, không có lựa chọn — phải đặt notional cho mọi combo.",
            en: "<b>Tip 2 — The escape clause for lateral combinations (§C2.2b(4)):</b> if at <b>every storey</b> the ratio Δ<sub>2nd</sub>/Δ<sub>1st</sub> (computed with reduced stiffness) is <b>≤ 1.7</b>, notional loads <b>need only be applied in gravity-only combinations</b>. For stiff industrial braced systems this is almost always satisfied. Check this ratio at the very start: it can delete hundreds of combinations. If the ratio is &gt; 1.7 there is no choice — notional loads go into every combination."
          },
          {
            type: "tip",
            vi: "<b>Tip 3 — Kiểm tra ngay:</b> <code>Display &gt; Show Tables &gt; Base Reactions</code>. Với pattern <code>xDL</code>, phải có <b>ΣF<sub>X</sub>(xDL) = 0.002 × ΣF<sub>Z</sub>(DL)</b>. Nếu lệch, phần tải chưa được chuyển đổi (thường là self-weight hoặc tải trên phần tử area) phải được bù bằng một pattern notional khai báo tay.",
            en: "<b>Tip 3 — Verify immediately:</b> <code>Display &gt; Show Tables &gt; Base Reactions</code>. For pattern <code>xDL</code> you must get <b>ΣF<sub>X</sub>(xDL) = 0.002 × ΣF<sub>Z</sub>(DL)</b>. If it does not match, the load that was not converted — usually self weight or load on area elements — must be made up with a hand-defined notional pattern."
          }
        ]
      },
      {
        heading: { vi: "3. BƯỚC 2 — Thiết lập phân tích bậc hai", en: "3. STEP 2 — Setting up the second-order analysis" },
        body: [
          {
            vi: "<b>Nguyên tắc bất khả xâm phạm: phân tích bậc hai KHÔNG cộng tác dụng được.</b> Không thể chạy P-Delta cho từng pattern rồi cộng tuyến tính trong combo. Mỗi tổ hợp thiết kế phải là <b>một Nonlinear Static case độc lập</b>, mang toàn bộ tải đã nhân hệ số.",
            en: "<b>The inviolable rule: second-order analysis does NOT superpose.</b> You cannot run P-Delta on each pattern and add the results linearly in a combination. Every design combination must be <b>its own independent nonlinear static case</b>, carrying the full factored load."
          },
          { type: "subhead", vi: "3.1 Chuyển combo thành Nonlinear Case", en: "3.1 Converting combinations into nonlinear cases" },
          {
            type: "code",
            vi: "Define &gt; Load Combinations &gt; Convert Combos to Nonlinear Cases...\n  → chọn toàn bộ combo LRFD → OK\n  (SAP2000 sinh ra LCxxxx-NL, và combo LCxxxx được ghi lại thành: 1.0 × LCxxxx-NL)",
            en: "Define &gt; Load Combinations &gt; Convert Combos to Nonlinear Cases...\n  → select every LRFD combination → OK\n  (SAP2000 creates LCxxxx-NL, and rewrites combo LCxxxx as: 1.0 × LCxxxx-NL)"
          },
          {
            vi: "Sau khi chuyển, <b>mở kiểm tra 2–3 case bất kỳ</b>:",
            en: "After converting, <b>open two or three cases at random and check them</b>:"
          },
          {
            type: "table",
            head: [ { vi: "Trường", en: "Field" }, { vi: "Giá trị đúng", en: "Correct value" } ],
            rows: [
              [ { vi: "Load Case Type / Analysis Type", en: "Load Case Type / Analysis Type" }, { vi: "Static / <b>Nonlinear</b>", en: "Static / <b>Nonlinear</b>" } ],
              [ { vi: "Geometric Nonlinearity", en: "Geometric Nonlinearity" }, { vi: "<b>P-Delta</b>", en: "<b>P-Delta</b>" } ],
              [ { vi: "Initial Conditions", en: "Initial Conditions" }, { vi: "Zero Initial Conditions", en: "Zero Initial Conditions" } ],
              [ { vi: "Loads Applied", en: "Loads Applied" }, { vi: "toàn bộ pattern <b>kèm hệ số của combo</b> (0.9, 1.2, 1.6…)", en: "every pattern <b>with the combination factors</b> (0.9, 1.2, 1.6…)" } ],
              [ { vi: "Load Application", en: "Load Application" }, { vi: "Full Load", en: "Full Load" } ],
              [ { vi: "Results Saved", en: "Results Saved" }, { vi: "Final State Only", en: "Final State Only" } ]
            ]
          },
          { type: "subhead", vi: "3.2 Cạm bẫy Mass Source (Erection vs. Operation)", en: "3.2 The mass source trap (erection vs. operation)" },
          { vi: "Lỗi kinh điển trên model analysis:", en: "The classic error on an analysis model:" },
          {
            type: "code",
            vi: "Load Case LC1009-NL reset not to run.\nConflicting mass sources for included Load Pattern VX(E).",
            en: "Load Case LC1009-NL reset not to run.\nConflicting mass sources for included Load Pattern VX(E)."
          },
          {
            vi: "Nguyên nhân: một case nonlinear chứa pattern động đất tĩnh tương đương gắn với Mass Source “Erection”, trong khi case lại đang dùng Mass Source “Operation” (hoặc ngược lại). <b>Giải pháp:</b> với các case nonlinear tĩnh, khối lượng không tham gia tính toán → đặt <code>Mass Source = Empty</code> cho case đó. Lực động đất đã là lực tĩnh đã tính sẵn, không cần mass.",
            en: "The cause: a nonlinear case contains an equivalent-static seismic pattern tied to the “Erection” mass source while the case itself uses “Operation” (or the reverse). <b>The fix:</b> mass plays no part in a static nonlinear case → set <code>Mass Source = Empty</code> for it. The seismic force is already a pre-computed static force; no mass is needed."
          },
          {
            type: "tip",
            vi: "<b>Tip 4 — Nếu dự án dùng Response Spectrum (RSA) thay vì lực tĩnh tương đương:</b> không thể nhét RSA vào nonlinear static. Cách làm chuẩn: (1) tạo một case nonlinear P-Delta chỉ với tải trọng trọng lực (<code>PD-GRAV</code>); (2) khai báo case Modal và RSA với tuỳ chọn <i>“Stiffness at End of Nonlinear Case = PD-GRAV”</i>. Khi đó dao động và phổ phản ứng được giải trên trạng thái đã có P-Delta. Phải quản lý hai dòng combo song song.",
            en: "<b>Tip 4 — If the project uses a response spectrum (RSA) instead of equivalent static forces:</b> RSA cannot be pushed into a nonlinear static case. The correct route: (1) create one P-Delta nonlinear case carrying gravity only (<code>PD-GRAV</code>); (2) define the modal and RSA cases with <i>“Stiffness at End of Nonlinear Case = PD-GRAV”</i>. Modes and spectra are then solved on a state that already includes P-Delta. You will be running two parallel combination streams."
          },
          {
            type: "tip",
            vi: "<b>Tip 5 — Kiểm soát thời gian chạy:</b> 120 combo → 120 case nonlinear, model analysis có thể chạy nhiều giờ. Hãy sàng lọc combo bao trùm trước (bằng một lần chạy tuyến tính nhanh + envelope), chỉ chuyển sang nonlinear những combo thực sự chi phối, và luôn giữ <code>Results Saved = Final State Only</code>.",
            en: "<b>Tip 5 — Keeping run time under control:</b> 120 combinations become 120 nonlinear cases and the analysis can run for hours. Screen for the governing combinations first (one fast linear run plus an envelope), convert only those to nonlinear, and always keep <code>Results Saved = Final State Only</code>."
          }
        ]
      },
      {
        heading: { vi: "4. BƯỚC 3 — Suy giảm độ cứng và K = 1.0", en: "4. STEP 3 — Stiffness reduction and K = 1.0" },
        body: [
          { type: "subhead", vi: "4.1 Design Preferences", en: "4.1 Design preferences" },
          {
            type: "code",
            vi: "Design &gt; Steel Frame Design &gt; View/Revise Preferences\n  Design Code                : AISC 360-10\n  Design Provision           : LRFD\n  Multi-Response Case Design : Envelopes\n  Analysis Method            : Direct Analysis        ← cốt lõi\n  Second Order Method        : General 2nd Order      ← cốt lõi\n  Stiffness Reduction Method : Tau-b Variable  (hoặc Tau-b Fixed = 1.0, xem Tip 6)",
            en: "Design &gt; Steel Frame Design &gt; View/Revise Preferences\n  Design Code                : AISC 360-10\n  Design Provision           : LRFD\n  Multi-Response Case Design : Envelopes\n  Analysis Method            : Direct Analysis        ← essential\n  Second Order Method        : General 2nd Order      ← essential\n  Stiffness Reduction Method : Tau-b Variable  (or Tau-b Fixed = 1.0, see Tip 6)"
          },
          { type: "subhead", vi: "4.2 Overwrites: buộc K = 1.0", en: "4.2 Overwrites: forcing K = 1.0" },
          {
            type: "code",
            vi: "Design &gt; Steel Frame Design &gt; View/Revise Overwrites  (chọn toàn bộ beam-column)\n  Effective Length Factor K1 Major / K1 Minor : 1.0\n  Effective Length Factor K2 Major / K2 Minor : 1.0\n  Effective Length Factor K (LTB)             : 1.0",
            en: "Design &gt; Steel Frame Design &gt; View/Revise Overwrites  (select all beam-columns)\n  Effective Length Factor K1 Major / K1 Minor : 1.0\n  Effective Length Factor K2 Major / K2 Minor : 1.0\n  Effective Length Factor K (LTB)             : 1.0"
          },
          {
            vi: "K<sub>LTB</sub> = 1.0 là lựa chọn thiên về an toàn theo AISC 360-10 Commentary E4 (mặc định chương trình lấy 1.0 cho dầm, nhưng nên khai báo tường minh để hồ sơ tính minh bạch).",
            en: "K<sub>LTB</sub> = 1.0 is the conservative choice per AISC 360-10 Commentary E4 (the program already defaults to 1.0 for beams, but state it explicitly so the calculation record is transparent)."
          },
          { type: "subhead", vi: "4.3 Property Modifiers cho cấu kiện thép", en: "4.3 Property modifiers for steel members" },
          {
            vi: "<code>Assign &gt; Frame &gt; Property Modifiers</code> cho toàn bộ cấu kiện tham gia hệ chịu lực ngang:",
            en: "<code>Assign &gt; Frame &gt; Property Modifiers</code> for every member participating in the lateral system:"
          },
          {
            type: "table",
            head: [ { vi: "Modifier", en: "Modifier" }, { vi: "Giá trị", en: "Value" }, { vi: "Ghi chú", en: "Note" } ],
            rows: [
              [ { vi: "Cross-section (axial) Area", en: "Cross-section (axial) area" }, { vi: "<b>0.8</b>", en: "<b>0.8</b>" }, { vi: "Chủ yếu ảnh hưởng thanh giằng, thanh dàn", en: "Mainly affects braces and truss members" } ],
              [ { vi: "Moment of Inertia about 2 &amp; 3 axis", en: "Moment of inertia about axes 2 &amp; 3" }, { vi: "<b>0.8 × τ<sub>b</sub></b>", en: "<b>0.8 × τ<sub>b</sub></b>" }, { vi: "τ<sub>b</sub> phụ thuộc <i>P<sub>u</sub></i> → cần lặp", en: "τ<sub>b</sub> depends on <i>P<sub>u</sub></i> → iteration required" } ],
              [ { vi: "Torsional constant, Shear area", en: "Torsional constant, shear area" }, { vi: "1.0", en: "1.0" }, { vi: "AISC không yêu cầu giảm", en: "AISC requires no reduction" } ]
            ]
          },
          {
            vi: "Lưu ý: hệ số giảm là <b>để phân tích cường độ</b>. Không dùng cho kiểm tra độ võng phục vụ (serviceability), không dùng cho tính chu kỳ dao động (§4.4).",
            en: "Note: these reductions are <b>for strength analysis</b>. Do not use them for serviceability deflection checks, and do not use them to compute vibration periods (§4.4)."
          },
          { type: "subhead", vi: "4.4 Trụ RC và dầm giằng RC trong cùng model", en: "4.4 RC pedestals and tie beams in the same model" },
          {
            vi: "AISC 360-10 §C2.3(4): khi cấu kiện <b>vật liệu khác Steel</b> tham gia vào ổn định hệ và tiêu chuẩn chi phối vật liệu đó yêu cầu <b>mức giảm lớn hơn</b>, thì áp dụng mức giảm lớn hơn đó. Theo ACI 318-14 Bảng 6.6.3.1.1(a) (không đổi trong 318-19/318-25):",
            en: "AISC 360-10 §C2.3(4): where members of <b>a material other than steel</b> contribute to system stability and the governing code for that material requires <b>a larger reduction</b>, the larger reduction applies. Per ACI 318-14 Table 6.6.3.1.1(a) (unchanged in 318-19/318-25):"
          },
          {
            type: "table",
            head: [
              { vi: "Cấu kiện", en: "Member" },
              { vi: "Cường độ (factored)", en: "Strength (factored)" },
              { vi: "Chuyển vị ngang tức thời — §6.6.3.2.2 (1.4·<i>I</i>, ≤ <i>I<sub>g</sub></i>)", en: "Immediate lateral deflection — §6.6.3.2.2 (1.4·<i>I</i>, ≤ <i>I<sub>g</sub></i>)" }
            ],
            rows: [
              [ { vi: "Trụ / cột RC", en: "RC pedestal / column" }, { vi: "<b>0.70·<i>I<sub>g</sub></i></b>", en: "<b>0.70·<i>I<sub>g</sub></i></b>" }, { vi: "1.4 × 0.70 ≈ <b>1.0·<i>I<sub>g</sub></i></b>", en: "1.4 × 0.70 ≈ <b>1.0·<i>I<sub>g</sub></i></b>" } ],
              [ { vi: "Dầm giằng RC", en: "RC tie beam" }, { vi: "<b>0.35·<i>I<sub>g</sub></i></b>", en: "<b>0.35·<i>I<sub>g</sub></i></b>" }, { vi: "1.4 × 0.35 ≈ <b>0.5·<i>I<sub>g</sub></i></b>", en: "1.4 × 0.35 ≈ <b>0.5·<i>I<sub>g</sub></i></b>" } ],
              [ { vi: "Vách (nứt / không nứt)", en: "Wall (cracked / uncracked)" }, { vi: "0.35 / 0.70·<i>I<sub>g</sub></i>", en: "0.35 / 0.70·<i>I<sub>g</sub></i>" }, { vi: "tương tự", en: "as above" } ],
              [ { vi: "Diện tích", en: "Area" }, { vi: "1.0·<i>A<sub>g</sub></i>", en: "1.0·<i>A<sub>g</sub></i>" }, { vi: "1.0·<i>A<sub>g</sub></i>", en: "1.0·<i>A<sub>g</sub></i>" } ]
            ]
          },
          {
            vi: "Khai báo tại: <code>Define &gt; Section Properties &gt; Frame Sections &gt; Modify/Show Property &gt; Set Modifiers</code> (đặt ở cấp <b>section</b> thay vì cấp phần tử, để không bị mất khi copy/paste đối tượng).",
            en: "Set them at: <code>Define &gt; Section Properties &gt; Frame Sections &gt; Modify/Show Property &gt; Set Modifiers</code> — at <b>section</b> level rather than element level, so they survive copy/paste of objects."
          },
          {
            type: "tip",
            vi: "<b>Quan điểm cần nói rõ:</b> 0.70 là mức đã “lớn hơn” mức 0.8 của AISC, nên <b>không nhân chồng</b> 0.8 × 0.70 = 0.56. Điều khoản C2.3(4) yêu cầu <i>áp dụng mức giảm lớn hơn</i>, không phải cộng dồn hai mức giảm.",
            en: "<b>A point worth stating plainly:</b> 0.70 is already the “larger” reduction compared with AISC's 0.8, so <b>do not compound them</b> into 0.8 × 0.70 = 0.56. Clause C2.3(4) asks you to <i>apply the larger reduction</i>, not to stack two reductions."
          },
          {
            type: "figure",
            src: { vi: "Resource/articles/02-dam-sap2000/fig-06-vi.svg", en: "Resource/articles/02-dam-sap2000/fig-06-en.svg" },
            caption: {
              vi: "<b>Hình 6.</b> Bảng tra nhanh modifier độ cứng: thép theo AISC 360-10 §C2.3, RC theo ACI 318 — kèm cảnh báo không nhân chồng hai mức giảm.",
              en: "<b>Figure 6.</b> Quick lookup for stiffness modifiers: steel per AISC 360-10 §C2.3, RC per ACI 318 — with the warning not to compound the two reductions."
            }
          }
        ]
      },
      {
        heading: { vi: "5. BƯỚC 4 — Analyze &amp; Design hai lần", en: "5. STEP 4 — Analyse &amp; design twice" },
        body: [
          {
            vi: "τ<sub>b</sub> phụ thuộc <i>P<sub>u</sub></i>, mà <i>P<sub>u</sub></i> lại phụ thuộc độ cứng của model → <b>bài toán vòng lặp</b>:",
            en: "τ<sub>b</sub> depends on <i>P<sub>u</sub></i>, and <i>P<sub>u</sub></i> depends on the stiffness of the model → <b>an iterative problem</b>:"
          },
          {
            type: "code",
            vi: "   [1] Run Analysis  (chưa/đã có modifier ước lượng)\n            ↓  lấy Pu của từng cấu kiện\n   [2] Run Steel Design  → chương trình xuất τb yêu cầu\n            ↓  Assign lại EA = 0.8 ; EI = 0.8·τb\n   [3] Run Analysis lần 2   ← phân tích thật sự dùng độ cứng suy giảm\n            ↓\n   [4] Run Steel Design lần 2  → kết quả D/C hợp lệ để xuất hồ sơ",
            en: "   [1] Run Analysis  (with no modifiers, or estimated ones)\n            ↓  read Pu for each member\n   [2] Run Steel Design  → the program reports the required τb\n            ↓  re-assign EA = 0.8 ; EI = 0.8·τb\n   [3] Run Analysis, 2nd pass   ← the real analysis, on reduced stiffness\n            ↓\n   [4] Run Steel Design, 2nd pass  → D/C ratios valid for issue"
          },
          {
            vi: "Nếu ở vòng 2 có cấu kiện đổi tiết diện hoặc τ<sub>b</sub> thay đổi đáng kể (&gt; ~5%), lặp thêm một vòng.",
            en: "If the second pass changes any section or shifts τ<sub>b</sub> appreciably (&gt; ~5%), run one more cycle."
          },
          {
            type: "tip",
            vi: "<b>Tip 6 — Cách “một lần chạy” hợp lý, nên dùng cho dự án lớn:</b> AISC 360-10 §C2.3(3) cho phép lấy <b>τ<sub>b</sub> = 1.0 cho mọi cấu kiện</b>, với điều kiện <b>bổ sung notional load 0.001·Y<sub>i</sub></b> vào mọi tổ hợp (tức tổng notional = <b>0.003·Y<sub>i</sub></b>). Triển khai trong SAP2000: đặt <code>Load Ratio = 3.000E-03</code> ở bước 1, <code>Stiffness Reduction Method = Tau-b Fixed</code> (τ<sub>b</sub>=1.0), và <b>EA = EI = 0.8 cố định cho mọi cấu kiện thép</b>. Vòng lặp biến mất; số lần chạy giảm một nửa; hồ sơ tính đơn giản hơn nhiều. Đây là lựa chọn tôi khuyến nghị cho hầu hết kết cấu nhà máy — chi phí thép tăng không đáng kể so với thời gian và rủi ro sai sót tiết kiệm được.",
            en: "<b>Tip 6 — The sensible “single run”, recommended for large projects:</b> AISC 360-10 §C2.3(3) permits <b>τ<sub>b</sub> = 1.0 for every member</b>, provided <b>an additional notional load of 0.001·Y<sub>i</sub></b> is applied in all combinations (total notional = <b>0.003·Y<sub>i</sub></b>). In SAP2000: set <code>Load Ratio = 3.000E-03</code> in step 1, <code>Stiffness Reduction Method = Tau-b Fixed</code> (τ<sub>b</sub>=1.0), and <b>EA = EI = 0.8 fixed for all steel members</b>. The iteration disappears, the number of runs halves, and the calculation record is far simpler. This is my recommendation for most plant structures — the extra steel tonnage is negligible against the time and the risk of error it removes."
          },
          {
            type: "figure",
            src: { vi: "Resource/articles/02-dam-sap2000/fig-04-vi.svg", en: "Resource/articles/02-dam-sap2000/fig-04-en.svg" },
            caption: {
              vi: "<b>Hình 4.</b> Toàn bộ quy trình 4 bước — in ra dán cạnh màn hình khi làm model.",
              en: "<b>Figure 4.</b> The whole four-step workflow — print it and pin it beside the screen while modelling."
            }
          }
        ]
      },
      {
        heading: { vi: "6. Bảy lưu ý quan trọng phải biết trước khi bấm Run", en: "6. Seven things to know before pressing Run" },
        body: [
          {
            vi: "<b>(1) Không có nút giữa nhịp → mất hoàn toàn hiệu ứng P-δ.</b> Công thức P-Delta của phần tử frame chỉ nắm được P-Δ giữa hai đầu nút. Bắt buộc divide frame:",
            en: "<b>(1) No intermediate node → the P-δ effect is lost entirely.</b> The frame element P-Delta formulation only captures P-Δ between its two end nodes. Dividing the frame is mandatory:"
          },
          {
            type: "code",
            vi: "Assign &gt; Frame &gt; Automatic Frame Mesh...\n  ◉ Auto Mesh Frame\n  ☑ at Intermediate Joints\n  ☑ Minimum Number of Segments : 2   (khuyến nghị 2–4 cho cột chịu nén lớn)",
            en: "Assign &gt; Frame &gt; Automatic Frame Mesh...\n  ◉ Auto Mesh Frame\n  ☑ at Intermediate Joints\n  ☑ Minimum Number of Segments : 2   (2–4 recommended for heavily loaded columns)"
          },
          {
            type: "figure",
            src: { vi: "Resource/articles/02-dam-sap2000/fig-05-vi.svg", en: "Resource/articles/02-dam-sap2000/fig-05-en.svg" },
            caption: {
              vi: "<b>Hình 5.</b> P-Δ nắm được bằng chuyển vị nút; P-δ chỉ xuất hiện khi cấu kiện được chia đốt.",
              en: "<b>Figure 5.</b> P-Δ is captured by joint displacement; P-δ only appears once the member is subdivided."
            }
          },
          {
            vi: "<b>Dùng Automatic Frame Mesh — tuyệt đối không dùng <code>Edit &gt; Divide Frames</code>.</b> Auto mesh chỉ chia phần tử <i>bên trong</i> khi phân tích; đối tượng thiết kế, chiều dài không giằng và tiết diện thiết kế vẫn giữ nguyên nguyên trạng. Divide Frames sẽ băm nhỏ đối tượng thiết kế và làm chiều dài không giằng sai theo hướng <b>không an toàn</b>.",
            en: "<b>Use Automatic Frame Mesh — never <code>Edit &gt; Divide Frames</code>.</b> Auto mesh subdivides the element <i>internally</i> for analysis only; the design object, its unbraced lengths and its design section stay intact. Divide Frames chops up the design object and corrupts the unbraced lengths <b>on the unsafe side</b>."
          },
          {
            vi: "<b>(2) K = 1.0 không có nghĩa là chiều dài đúng.</b> DAM giải phóng ta khỏi K, chứ không khỏi <i>L</i>. <code>Unbraced Length Ratio (Major / Minor / LTB)</code> vẫn là <b>trách nhiệm của kỹ sư</b>: purlin có giằng cánh nén không? Thanh chống ngang cột ở cao trình nào? Đây là nơi sai số lớn nhất của mọi bài toán thép, DAM hay không DAM.",
            en: "<b>(2) K = 1.0 does not mean the length is right.</b> DAM frees you from K, not from <i>L</i>. The <code>Unbraced Length Ratio (Major / Minor / LTB)</code> remains <b>the engineer's responsibility</b>: does the purlin actually brace the compression flange? At what level does the column get a lateral strut? This is the largest source of error in any steel problem, DAM or not."
          },
          {
            vi: "<b>(3) SAP2000 không tính B2.</b> Phương pháp “Amplified First Order” cần B<sub>1</sub>, B<sub>2</sub>; SAP2000 hiện luôn lấy <b>B2 = 1.0</b>. Vì vậy chỉ chọn <code>Second Order Method = General 2nd Order</code>. Nếu ai đó chọn “Amplified 1st Order” trong preferences, kết quả sẽ <b>thiếu hoàn toàn hiệu ứng bậc hai toàn hệ</b>.",
            en: "<b>(3) SAP2000 does not compute B2.</b> The “amplified first order” method needs B<sub>1</sub> and B<sub>2</sub>; SAP2000 currently always takes <b>B2 = 1.0</b>. So choose only <code>Second Order Method = General 2nd Order</code>. If someone selects “Amplified 1st Order” in the preferences, the results will <b>omit the global second-order effect entirely</b>."
          },
          {
            vi: "<b>(4) Chu kỳ dao động phải lấy từ độ cứng danh nghĩa.</b> AISC Design Guide 28 §5.1: lực động đất và chu kỳ <i>T</i> tính với tiết diện <b>không giảm độ cứng</b>. Nếu dùng modifier 0.8 để tính T, chu kỳ dài ra giả tạo → lực động đất bị đánh giá thấp. Thực hành: giữ một model/lượt chạy riêng (hoặc bộ modifier riêng) không có suy giảm để trích xuất <i>T</i> và lực địa chấn, sau đó mới áp modifier cho phân tích cường độ.",
            en: "<b>(4) Vibration periods must come from nominal stiffness.</b> AISC Design Guide 28 §5.1: seismic forces and the period <i>T</i> are computed on <b>unreduced</b> sections. Using the 0.8 modifier to find T lengthens the period artificially → seismic forces are underestimated. In practice: keep a separate model or run (or a separate modifier set) with no reduction to extract <i>T</i> and the seismic forces, and only then apply the modifiers for the strength analysis."
          },
          {
            vi: "<b>(5) Độ võng phục vụ ≠ độ cứng suy giảm.</b> Kiểm tra võng dầm, chuyển vị ngang phục vụ, tính toán độ vồng → dùng độ cứng danh nghĩa (với RC: 1.4·<i>I</i>, ≤ <i>I<sub>g</sub></i>).",
            en: "<b>(5) Serviceability deflection ≠ reduced stiffness.</b> Beam deflection checks, service lateral drift and camber calculations all use nominal stiffness (for RC: 1.4·<i>I</i>, ≤ <i>I<sub>g</sub></i>)."
          },
          {
            vi: "<b>(6) Nonlinear case không hội tụ.</b> Đừng vội tăng số bước hay nới dung sai. Divergence trong P-Delta hầu như luôn là <b>triệu chứng</b>, không phải lỗi số học. Kiểm tra: (a) hệ có mất ổn định thật không — chạy Modal, tìm mode có chu kỳ bất thường lớn hoặc dạng dao động cục bộ vô lý, tìm cấu kiện thiếu liên kết/release sai; (b) hệ có quá mềm không — nếu Δ<sub>bậc 2</sub>/Δ<sub>bậc 1</sub> &gt; 1.7 thì bản thân sơ đồ kết cấu cần thêm giằng, chứ không phải cần thêm iteration.",
            en: "<b>(6) A nonlinear case will not converge.</b> Do not reach for more steps or a looser tolerance. Divergence in P-Delta is almost always <b>a symptom</b>, not a numerical fault. Check: (a) is the system genuinely unstable — run Modal, look for a mode with an implausibly long period or a nonsensical local shape, and find the member with a missing connection or a wrong release; (b) is the system too flexible — if Δ<sub>2nd</sub>/Δ<sub>1st</sub> &gt; 1.7, the structural scheme itself needs more bracing, not more iterations."
          },
          {
            vi: "<b>(7) Design combo không tự cập nhật.</b> Sau <code>Convert Combos to Nonlinear Cases</code>, hãy vào <code>Design &gt; Steel Frame Design &gt; Select Design Combos</code> để chắc chắn chương trình đang kiểm tra các combo đã chuyển đổi, không phải một bộ combo mặc định do chương trình tự sinh.",
            en: "<b>(7) Design combinations do not update themselves.</b> After <code>Convert Combos to Nonlinear Cases</code>, open <code>Design &gt; Steel Frame Design &gt; Select Design Combos</code> and confirm the program is checking the converted combinations, not a default set it generated on its own."
          }
        ]
      },
      {
        heading: { vi: "7. Cẩm nang cho kỹ sư kết cấu — đọc ngược từ output", en: "7. A field guide — reading the output backwards" },
        body: [
          {
            vi: "Cách làm nhanh và hợp lý: chọn một member control, <code>Design &gt; Steel Frame Design &gt; Display Design Info</code> → <b>Steel Stress Check Data</b>. Đối chiếu:",
            en: "The fast, sensible check: pick one governing member, <code>Design &gt; Steel Frame Design &gt; Display Design Info</code> → <b>Steel Stress Check Data</b>. Then compare:"
          },
          {
            type: "table",
            head: [ { vi: "Dòng trong output", en: "Line in the output" }, { vi: "Giá trị cần xuất hiện", en: "Value that must appear" } ],
            rows: [
              [ { vi: "Design code", en: "Design code" }, { vi: "<code>AISC 360-10</code>", en: "<code>AISC 360-10</code>" } ],
              [ { vi: "Provision", en: "Provision" }, { vi: "<code>LRFD</code>", en: "<code>LRFD</code>" } ],
              [ { vi: "Analysis", en: "Analysis" }, { vi: "<b><code>Direct Analysis</code></b>", en: "<b><code>Direct Analysis</code></b>" } ],
              [ { vi: "2nd Order", en: "2nd Order" }, { vi: "<b><code>General 2nd Order</code></b>", en: "<b><code>General 2nd Order</code></b>" } ],
              [ { vi: "Reduction", en: "Reduction" }, { vi: "<code>Tau-b Variable</code> (hoặc <code>Tau-b Fixed</code>)", en: "<code>Tau-b Variable</code> (or <code>Tau-b Fixed</code>)" } ],
              [ { vi: "<code>Tau_b</code>", en: "<code>Tau_b</code>" }, { vi: "1.0 nếu α<i>P<sub>r</sub></i>/<i>P<sub>y</sub></i> ≤ 0.5", en: "1.0 if α<i>P<sub>r</sub></i>/<i>P<sub>y</sub></i> ≤ 0.5" } ],
              [ { vi: "<code>EA factor</code> / <code>EI factor</code>", en: "<code>EA factor</code> / <code>EI factor</code>" }, { vi: "<b>0.800 / 0.800·τ<sub>b</sub></b>", en: "<b>0.800 / 0.800·τ<sub>b</sub></b>" } ],
              [ { vi: "<code>K1</code>, <code>K2</code> (Major &amp; Minor)", en: "<code>K1</code>, <code>K2</code> (major &amp; minor)" }, { vi: "<b>1.000</b>", en: "<b>1.000</b>" } ],
              [ { vi: "<code>Kltb</code>", en: "<code>Kltb</code>" }, { vi: "<b>1.000</b>", en: "<b>1.000</b>" } ],
              [ { vi: "<code>Length</code>, <code>Lltb</code>", en: "<code>Length</code>, <code>Lltb</code>" }, { vi: "đúng chiều dài không giằng thực tế", en: "the real unbraced length" } ]
            ]
          },
          { type: "subhead", vi: "Checklist trước khi Issue thiết kế", en: "Checklist before issuing the design" },
          {
            type: "checklist",
            items: [
              { vi: "Đã liệt kê <b>đủ</b> mọi load pattern tải đứng và có notional pattern cặp X/Y tương ứng", en: "<b>Every</b> gravity load pattern listed, each with its matching X/Y notional pair" },
              { vi: "<code>Self Weight Multiplier</code> của mọi notional pattern = 0", en: "<code>Self Weight Multiplier</code> = 0 on every notional pattern" },
              { vi: "ΣF<sub>X</sub>(notional) = 0.002 (hoặc 0.003) × ΣF<sub>Z</sub>(pattern gốc) — đã kiểm bằng Base Reactions", en: "ΣF<sub>X</sub>(notional) = 0.002 (or 0.003) × ΣF<sub>Z</sub>(source pattern) — verified through Base Reactions" },
              { vi: "Combo tải đứng thuần: đủ <b>4 chiều</b> notional; combo có tải ngang: notional theo <b>hợp lực</b>, đúng dấu", en: "Gravity-only combinations: all <b>four</b> notional directions; lateral combinations: notional along the <b>resultant</b>, with the correct sign" },
              { vi: "Mọi combo thiết kế đã là Nonlinear Static + P-Delta; Mass Source xử lý xong xung đột Erection/Operation", en: "Every design combination is Nonlinear Static + P-Delta; the erection/operation mass source conflict is resolved" },
              { vi: "Auto Mesh Frame ≥ 2 đoạn cho mọi cấu kiện chịu nén", en: "Auto Mesh Frame ≥ 2 segments on every compression member" },
              { vi: "Modifier: thép EA=0.8, EI=0.8τ<sub>b</sub>; RC trụ 0.70<i>I<sub>g</sub></i>, dầm giằng 0.35<i>I<sub>g</sub></i>", en: "Modifiers: steel EA=0.8, EI=0.8τ<sub>b</sub>; RC pedestals 0.70<i>I<sub>g</sub></i>, tie beams 0.35<i>I<sub>g</sub></i>" },
              { vi: "K1 = K2 = K<sub>LTB</sub> = 1.0; <b>unbraced length đã rà soát bằng mắt trên mô hình 3D</b>", en: "K1 = K2 = K<sub>LTB</sub> = 1.0; <b>unbraced lengths reviewed visually on the 3D model</b>" },
              { vi: "Chu kỳ <i>T</i> và lực địa chấn lấy từ độ cứng danh nghĩa", en: "Period <i>T</i> and seismic forces taken from nominal stiffness" },
              { vi: "Đã chạy Analyze → Design <b>hai lần</b> (hoặc dùng phương án 0.003 + τ<sub>b</sub>=1.0)", en: "Analyse → Design run <b>twice</b> (or the 0.003 + τ<sub>b</sub>=1.0 route used)" },
              { vi: "Δ<sub>bậc 2</sub>/Δ<sub>bậc 1</sub> đã kiểm tra; nếu ≤ 1.7 đã ghi nhận trong báo cáo để biện luận việc lược bỏ notional ở combo có tải ngang", en: "Δ<sub>2nd</sub>/Δ<sub>1st</sub> checked; if ≤ 1.7, recorded in the report to justify omitting notional loads from lateral combinations" },
              { vi: "Không còn warning trong Analysis Log; mọi case đều hội tụ", en: "No warnings left in the analysis log; every case converged" }
            ]
          }
        ]
      },
      {
        heading: { vi: "8. Kết luận", en: "8. Closing" },
        body: [
          {
            vi: "DAM chuyển gánh nặng từ <b>phán đoán của kỹ sư về K</b> sang <b>tính trung thực của mô hình</b>. Đó là một concept có lợi: K là con số không thể kiểm chứng, còn mô hình thì kiểm chứng được từng dòng — bằng phản lực gối tựa, bằng tỷ số chuyển vị, bằng output Steel Stress Check Data.",
            en: "DAM shifts the burden from <b>the engineer's judgement about K</b> to <b>the honesty of the model</b>. That is a favourable trade: K is a number nobody can verify, whereas a model can be checked line by line — through base reactions, through displacement ratios, through the Steel Stress Check Data output."
          },
          {
            vi: "Ba key point cần nhớ: <b>(1)</b> notional load phải phủ <b>đủ</b> mọi tải đứng và <b>đúng chiều</b> bất lợi; <b>(2)</b> mỗi tổ hợp là <b>một</b> case nonlinear P-Delta riêng, và cấu kiện phải <b>có nút giữa nhịp</b>; <b>(3)</b> K = 1.0 chỉ có ý nghĩa khi phân tích đã chạy với độ cứng suy giảm — hãy chứng minh điều đó bằng dòng <code>EA factor = 0.800</code> trong output.",
            en: "Three points to carry away: <b>(1)</b> notional loads must cover <b>every</b> gravity load and act in the <b>governing direction</b>; <b>(2)</b> each combination is <b>its own</b> P-Delta nonlinear case, and members must <b>have intermediate nodes</b>; <b>(3)</b> K = 1.0 only means something once the analysis has run on reduced stiffness — prove it with the <code>EA factor = 0.800</code> line in the output."
          }
        ]
      },
      {
        heading: { vi: "Tài liệu tham khảo", en: "References" },
        body: [
          {
            type: "list",
            items: [
              { vi: "AISC 360-10, <i>Specification for Structural Steel Buildings</i>, Chapter C &amp; Commentary, American Institute of Steel Construction, Chicago, 2010.", en: "AISC 360-10, <i>Specification for Structural Steel Buildings</i>, Chapter C &amp; Commentary, American Institute of Steel Construction, Chicago, 2010." },
              { vi: "AISC Design Guide 28, <i>Stability Design of Steel Buildings</i>, §5.1.", en: "AISC Design Guide 28, <i>Stability Design of Steel Buildings</i>, §5.1." },
              { vi: "ACI 318-14, <i>Building Code Requirements for Structural Concrete</i>, §6.6.3.1.1 &amp; §6.6.3.2.2.", en: "ACI 318-14, <i>Building Code Requirements for Structural Concrete</i>, §6.6.3.1.1 &amp; §6.6.3.2.2." },
              { vi: "CSI, <i>Practical How-To Guide Technical Note — AISC Direct Analysis Method</i>, Computers and Structures, Inc., California.", en: "CSI, <i>Practical How-To Guide Technical Note — AISC Direct Analysis Method</i>, Computers and Structures, Inc., California." },
              { vi: "CSI, <i>Steel Frame Design Manual — AISC 360-10 / IBC 2012 for SAP2000</i>.", en: "CSI, <i>Steel Frame Design Manual — AISC 360-10 / IBC 2012 for SAP2000</i>." }
            ]
          }
        ]
      }
    ],
    footnote: {
      vi: "Bài viết thuộc series “Hướng dẫn thiết kế kết cấu thép theo AISC 360-10” — Roberto Structural. Nội dung mang tính hướng dẫn kỹ thuật; kỹ sư chịu trách nhiệm kiểm tra và hiệu chỉnh theo điều kiện cụ thể của từng dự án và yêu cầu của tiêu chuẩn áp dụng.",
      en: "Part of the series “Designing steel structures to AISC 360-10” — Roberto Structural. The content is technical guidance; the engineer remains responsible for checking and adapting it to the conditions of each project and the requirements of the governing code."
    }
  },
  {
    id: "rc-deck-on-steel-structures",
    no: "01",
    category: { vi: "Kết cấu thép", en: "Steel Structures" },
    date: "2026-07-25",
    readmin: 9,
    title: {
      vi: "Sàn Deck trên kết cấu thép — Bốn góc nhìn dễ bị bỏ qua",
      en: "RC Deck on Steel Structures — Four Overlooked Perspectives"
    },
    excerpt: {
      vi: "Sàn deck trông đơn giản, nhưng phần lớn sai sót không nằm ở chiều dày hay cấp bê tông — mà ở giả định mô hình và đường truyền lực.",
      en: "Deck slabs look simple, but most errors do not lie in thickness or concrete grade — they lie in modelling assumptions and in the load path."
    },
    cover: "Resource/articles/01-deck-slab/fig1.webp",
    sections: [
      {
        heading: { vi: "1. Sàn Deck là gì?", en: "1. What is a deck slab?" },
        body: [
          {
            vi: "Sàn deck dùng tấm tôn định hình làm coffa lưu, bê tông đổ lên trên. Có hai loại khác nhau về bản chất:",
            en: "A deck slab uses profiled steel sheeting as permanent formwork with concrete cast on top. Two families differ fundamentally:"
          },
          {
            type: "list",
            items: [
              { vi: "<b>Composite deck:</b> tôn có gân dập (embossment), khóa cơ học với bê tông, tôn <i>chính là</i> cốt chịu kéo.", en: "<b>Composite deck:</b> embossed sheeting mechanically interlocked with the concrete — the sheeting <i>is</i> the tensile reinforcement." },
              { vi: "<b>Form deck:</b> tôn chỉ làm coffa, cốt thép bố trí riêng.", en: "<b>Form deck:</b> sheeting acts as formwork only; reinforcement is placed separately." }
            ]
          },
          {
            vi: "Ưu điểm khi dùng cho công trình sử dụng kết cấu thép:",
            en: "Advantages on steel-framed buildings:"
          },
          {
            type: "list",
            items: [
              { vi: "Giảm tối đa giàn giáo chống đỡ; tấm tôn trở thành mặt bằng thi công an toàn ngay khi lắp xong.", en: "Shoring eliminated or minimised; the sheeting becomes a safe working platform immediately after installation." },
              { vi: "Tốc độ thi công nhanh, đồng bộ với tiến độ lắp dựng kết cấu thép; sóng tôn rỗng làm giảm tải trọng bản thân so với sàn đặc cùng nhịp, và là không gian sẵn có để luồn ống, cáp điện.", en: "Erection speed matches the steel programme; hollow ribs reduce self-weight against a solid slab of equal span and provide ready-made routing for conduits and cables." }
            ]
          }
        ],
        figures: [
          {
            src: "Resource/articles/01-deck-slab/fig1.webp",
            caption: { vi: "Cấu tạo sàn deck: tôn định hình, chốt chịu cắt, lưới thép và dầm thép đỡ.", en: "Deck slab anatomy: profiled sheeting, shear studs, wire mesh and supporting steel beam." }
          },
          {
            src: "Resource/articles/01-deck-slab/fig3.webp",
            caption: { vi: "Hai cơ chế truyền lực cắt: chốt chịu cắt đầu mũ (trái) và khóa cơ học của gân dập trên tôn (phải).", en: "The two shear-transfer mechanisms: headed shear stud (left) and mechanical embossment interlock (right)." }
          }
        ]
      },
      {
        heading: { vi: "2. Mô hình hoá trong phần mềm phân tích", en: "2. Modelling in analysis software" },
        body: [
          {
            vi: "Ba loại tiết diện tấm (Area Section Type) cung cấp ba cách ứng xử khác nhau:",
            en: "The three area-section types supply three different behaviours:"
          },
          {
            type: "list",
            items: [
              { vi: "<b>Plate:</b> chịu uốn và cắt ngoài mặt phẳng.", en: "<b>Plate:</b> out-of-plane bending and shear." },
              { vi: "<b>Membrane:</b> chịu kéo nén <b>trong mặt phẳng</b> (f11, f22, f12).", en: "<b>Membrane:</b> in-plane axial (f11, f22, f12)." },
              { vi: "<b>Shell:</b> kết hợp cả Plate và Membrane.", en: "<b>Shell:</b> both Plate and Membrane combined." }
            ]
          },
          {
            vi: "Riêng với Shell và Plate, phần mềm phân tích còn phân biệt theo cách xử lý biến dạng cắt ngang:",
            en: "For Shell and Plate only, the software further distinguishes how transverse shear is treated:"
          },
          {
            type: "list",
            items: [
              { vi: "<b>Thin:</b> bỏ qua biến dạng cắt ngang ngoài mặt phẳng (tỷ lệ chiều dày/nhịp cạnh ngắn của sàn &lt; 1/10–1/20).", en: "<b>Thin:</b> transverse shear deformation ignored — use where t/L (short span) &lt; 1/10–1/20." },
              { vi: "<b>Thick:</b> có kể đến biến dạng cắt ngang (tỷ lệ chiều dày/nhịp cạnh ngắn của sàn &gt; 1/5–1/10).", en: "<b>Thick:</b> transverse shear included — use where t/L &gt; 1/5–1/10." }
            ]
          },
          {
            vi: "Tùy chọn này <b>không áp dụng cho Membrane</b>.",
            en: "This option <b>does not apply to Membrane</b>."
          },
          {
            vi: "Điểm ít được để ý: <b>sàn dày 200 mm không có 200 mm bê tông đặc</b> — phần sóng tôn là rỗng, và độ cứng trong mặt phẳng chỉ do lớp bê tông phủ trên đỉnh sóng đảm nhiệm. Sàn deck <b>dị hướng</b>: độ cứng theo phương song song sóng tôn nhỏ hơn hẳn phương vuông góc, nên f11 ≠ f22.",
            en: "An often-missed point: <b>a 200 mm slab does not contain 200 mm of solid concrete</b> — the ribs are voided, and in-plane stiffness comes only from the topping above the rib crest. Deck is <b>orthotropic</b>: stiffness parallel to the ribs is markedly lower than perpendicular to them, so f11 ≠ f22."
          },
          {
            vi: "Về diaphragm, khác biệt cốt lõi:",
            en: "On diaphragms, the essential distinction:"
          },
          {
            type: "list",
            items: [
              { vi: "<b>Rigid</b> là một <i>ràng buộc động học</i>, hoạt động độc lập với độ cứng của tấm. Rigid vẫn ảnh hưởng ngay cả khi Stiffness Modifiers = 0 hoặc Section Properties = None.", en: "<b>Rigid</b> is a <i>kinematic constraint</i> that works independently of shell stiffness. It remains effective even with Stiffness Modifiers = 0 or Section Properties = None." },
              { vi: "<b>Semi-rigid</b> thì ngược lại — nó chỉ là một <i>nhãn</i>, và toàn bộ ứng xử dựa vào độ cứng membrane thực của tấm (f11, f22, f12). Semi-rigid chỉ có tác dụng khi Section Type = Shell hoặc Membrane với Stiffness Modifiers &gt; 0.", en: "<b>Semi-rigid</b> is the opposite — it is only a <i>label</i>, and behaviour relies entirely on the shell's real membrane stiffness (f11, f22, f12). It takes effect only where Section Type = Shell or Membrane with Stiffness Modifiers &gt; 0." }
            ]
          },
          {
            vi: "Semi-rigid <b>mất ý nghĩa</b> nếu Section Type = Plate, hoặc Properties = None, hoặc Stiffness Modifiers = 0: không có đường truyền lực ngang, và yêu cầu lệch tâm ngẫu nhiên 5% cũng không được áp đặt đúng.",
            en: "Semi-rigid becomes <b>meaningless</b> where Section Type = Plate, or Properties = None, or Stiffness Modifiers = 0: there is no lateral load path, and the 5% accidental eccentricity requirement is not genuinely enforced."
          }
        ],
        figures: [
          {
            src: "Resource/articles/01-deck-slab/fig2.webp",
            caption: { vi: "Mô hình phần tử hữu hạn sàn deck liên hợp — tôn, bê tông và chốt chịu cắt khai báo riêng.", en: "Finite-element model of composite deck — sheeting, concrete and shear studs defined separately." }
          }
        ]
      },
      {
        heading: { vi: "3. Hai kiểu liên kết thiết bị", en: "3. Two ways to support equipment" },
        body: [
          {
            vi: "Câu hỏi quyết định không phải “chi tiết nào đẹp hơn” mà là <b>“tải trọng nên đi vào đâu”</b>.",
            en: "The decisive question is not “which detail looks better” but <b>“where should the load go?”</b>"
          },
          {
            vi: "<b>Qua bệ RC trên sàn</b> (anchor bolt hoặc embedded part đặt trong bệ): tải đi vào sàn. Sàn deck có chiều dày hữu hiệu mỏng và bị chi phối bởi chọc thủng, nên hướng này phù hợp với <b>support nhỏ và trung bình</b> — pipe support cho ống nhỏ, bệ máy bơm, bệ máy nén. Lắp đặt phải chờ bệ đủ cường độ, tức là bị ràng buộc trình tự.",
            en: "<b>Via an RC pedestal on the slab</b> (anchor bolts or embedded plate cast into the pedestal): the load enters the slab. Deck slabs have a thin effective depth and are punching-shear governed, so this route suits <b>small to medium supports</b> — pipe supports, pump and compressor bases. Installation must wait for the pedestal to gain strength, which constrains the erection sequence."
          },
          {
            vi: "<b>Trực tiếp vào dầm thép bên dưới</b>, xuyên qua sàn: tải <b>bỏ qua sàn</b> và đi thẳng vào cấu kiện vốn được thiết kế để chịu nó. Đây là hướng cho <b>thiết bị nặng</b> — bồn đứng, bồn ngang, thiết bị có tải ngang lớn. Đổi lại: phải lắp trước khi đổ bê tông, và cần chi tiết mối nối riêng — cốt thép gia cường quanh lỗ mở, xử lý chống thấm và khe co giãn tại mặt tiếp giáp.",
            en: "<b>Directly to the steel beam below</b>, penetrating the slab: the load <b>bypasses the slab</b> and enters a member actually designed to carry it. This is the route for <b>heavy equipment</b> — vertical and horizontal vessels, items with significant horizontal reactions. The trade-off: it must be erected before the concrete pour, and it needs dedicated joint detailing — trimming bars around the opening, plus waterproofing and movement provision at the interface."
          },
          { type: "subhead", vi: "So sánh hai kiểu", en: "Comparison" },
          {
            type: "table",
            head: [
              { vi: "", en: "" },
              { vi: "Có bệ RC", en: "With RC Pedestal" },
              { vi: "Không bệ RC", en: "Without RC Pedestal" },
              { vi: "Ghi chú", en: "Remark" }
            ],
            rows: [
              [
                { vi: "Đặc tính kết cấu", en: "Structural characteristic" },
                { vi: "Gối tựa trên sàn", en: "Slab support" },
                { vi: "Gối tựa kết cấu", en: "Structural support" },
                { vi: "", en: "" }
              ],
              [
                { vi: "Truyền tải", en: "Load transfer" },
                { vi: "Hạn chế", en: "Limited" },
                { vi: "Ít ràng buộc hơn", en: "Less restricted" },
                { vi: "", en: "" }
              ],
              [
                { vi: "Trình tự lắp dựng", en: "Erection sequence" },
                { vi: "Sau khi rót vữa bệ", en: "After pedestal grouting" },
                { vi: "Trước khi đổ sàn", en: "Before slab pour" },
                { vi: "Cần chi tiết mối nối đặc biệt; không bệ RC thì không ràng buộc trình tự", en: "Special joint consideration; without pedestal, no sequence restriction" }
              ]
            ]
          },
          { type: "subhead", vi: "Phạm vi áp dụng", en: "Applicability" },
          {
            type: "table",
            head: [
              { vi: "", en: "" },
              { vi: "Có bệ RC", en: "With RC Pedestal" },
              { vi: "Không bệ RC", en: "Without RC Pedestal" },
              { vi: "Ghi chú", en: "Remark" }
            ],
            rows: [
              [
                { vi: "Thiết bị đứng", en: "Vertical equipment" },
                { vi: "✗", en: "✗" }, { vi: "✓", en: "✓" }, { vi: "", en: "" }
              ],
              [
                { vi: "Thiết bị nằm ngang", en: "Horizontal equipment" },
                { vi: "✗", en: "✗" }, { vi: "✓", en: "✓" }, { vi: "", en: "" }
              ],
              [
                { vi: "Bơm & máy nén", en: "Pump & compressor" },
                { vi: "✓", en: "✓" }, { vi: "✗", en: "✗" },
                { vi: "Không áp dụng cho máy nén kiểu khung", en: "Frame-type compressor not applicable" }
              ],
              [
                { vi: "Kết cấu thép", en: "Steel structure" },
                { vi: "✓ với support nhỏ<br>✗ với support lớn", en: "✓ small supports<br>✗ large supports" },
                { vi: "✓", en: "✓" },
                { vi: "Xem như đặt trên nền", en: "Consider same as on-paving" }
              ],
              [
                { vi: "Giá đỡ ống", en: "Pipe support" },
                { vi: "✓ với support nhỏ<br>✗ với support lớn", en: "✓ small supports<br>✗ large supports" },
                { vi: "–", en: "–" },
                { vi: "Xem như đặt trên nền", en: "Consider same as on-paving" }
              ]
            ]
          },
          {
            vi: "Hàng <i>Bơm & máy nén</i> thoạt nhìn có vẻ ngược với nguyên tắc “tải nặng thì đi thẳng vào dầm”. Lý do không nằm ở độ lớn tải mà ở <b>rung động</b>: bệ bê tông cung cấp khối lượng và cản để hấp thụ dao động từ máy quay, trong khi nối cứng trực tiếp vào dầm thép sẽ truyền rung vào hệ kết cấu.",
            en: "The <i>pump &amp; compressor</i> row appears to contradict the “heavy loads go straight to the beam” principle. The reason is not load magnitude but <b>vibration</b>: a concrete pedestal provides mass and damping to absorb rotating-machine excitation, whereas a direct rigid connection would feed that vibration into the steel frame."
          }
        ]
      },
      {
        heading: { vi: "4. Giai đoạn thi công và giằng ngang tạm", en: "4. Construction stage and temporary bracing" },
        body: [
          {
            vi: "Trước khi bê tông đạt cường độ, <b>diaphragm chưa tồn tại</b>. Đây là điều dễ bị bỏ sót nhất, và nó lấy đi cùng lúc hai thứ:",
            en: "Before the concrete gains strength, <b>the diaphragm does not yet exist</b>. This is the most commonly missed point, and it removes two things at once:"
          },
          {
            type: "list",
            items: [
              { vi: "<b>Đường truyền lực ngang:</b> sàn chưa có độ cứng trong mặt phẳng để phân phối tải ngang về hệ chịu lực chính.", en: "<b>The lateral load path:</b> the slab has no in-plane stiffness to distribute lateral load back to the primary system." },
              { vi: "<b>Giằng chống oằn ngang cho dầm:</b> cánh nén của dầm thép mất điểm tựa ngang, khả năng chịu uốn bị chi phối bởi mất ổn định ngang.", en: "<b>Lateral restraint to the beams:</b> the compression flange loses its bracing, and beam capacity becomes governed by lateral-torsional buckling rather than the plastic moment." }
            ]
          },
          {
            vi: "Kỹ sư thiết kế cần kể đến sự không làm việc của tấm sàn trong giai đoạn này. Thiết kế một <b>hệ giằng ngang tạm thời</b> hoặc hệ giằng vĩnh viễn là cần thiết.",
            en: "Engineers need to take into account the non-working state of the slab during this phase. Designing a <b>temporary or permanent horizontal bracing system</b> is necessary."
          }
        ],
        figures: [
          {
            src: "Resource/articles/01-deck-slab/fig4.webp",
            caption: { vi: "Giai đoạn thi công: giằng ngang tạm, hệ chống đỡ và mép đổ bê tông.", en: "Construction stage: temporary transverse bracing, propping system and concrete pouring edge." }
          }
        ]
      },
      {
        heading: { vi: "Kết", en: "Closing" },
        body: [
          {
            vi: "Sàn deck trông đơn giản, nhưng phần lớn sai sót không nằm ở chiều dày hay cấp bê tông — mà ở <b>giả định mô hình</b> và ở <b>đường truyền lực</b>. Bốn điểm trên đều xuất phát từ một câu hỏi duy nhất: <i>lực này thực sự đi đâu?</i>",
            en: "Deck slabs look simple, but most errors do not lie in thickness or concrete grade — they lie in <b>modelling assumptions</b> and in the <b>load path</b>. All four points above stem from a single question: <i>where does this force actually go?</i>"
          }
        ],
        figures: [
          {
            src: "Resource/articles/01-deck-slab/fig5.webp",
            caption: { vi: "Hiện trường: sàn deck đã lắp lưới thép, chờ đổ bê tông — giai đoạn chưa có diaphragm.", en: "On site: deck with mesh in place awaiting the pour — the stage where no diaphragm yet exists." }
          }
        ]
      }
    ]
  }
];
