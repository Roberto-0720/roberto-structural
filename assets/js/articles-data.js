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
  { vi: "Kết cấu thép", en: "Steel Structures" },
  { vi: "Kết cấu BTCT", en: "Reinforced Concrete" },
  { vi: "Mô hình & Phân tích", en: "Modelling & Analysis" },
  { vi: "Thi công", en: "Construction" },
  { vi: "Móng thiết bị", en: "Equipment Foundations" }
];

window.ARTICLES = [
  {
    id: "aci318-2nd-order-sap2000",
    no: "03",
    category: { vi: "Kết cấu BTCT", en: "Reinforced Concrete" },
    date: "2026-08-04",
    readmin: 22,
    title: {
      vi: "Thiết kế BTCT theo ACI 318 bằng phân tích đàn hồi bậc hai trong SAP2000",
      en: "RC Design to ACI 318 by Second-Order Elastic Analysis in SAP2000"
    },
    excerpt: {
      vi: "Quy trình 8 bước, 9 cạm bẫy và checklist QC dùng được ngay tại bàn làm việc. Vi phạm một điều kiện, SAP2000 vẫn xuất ra D/C ratio — nhưng con số đó không còn ý nghĩa gì với ACI 318.",
      en: "An eight-step workflow, nine traps and a QC checklist you can use at your desk. Break one condition and SAP2000 still prints a D/C ratio — but that number no longer means anything under ACI 318."
    },
    cover: "Resource/articles/03-aci318-2nd-order/cover.webp",
    sections: [
      {
        heading: { vi: "1. Vì sao chọn phân tích bậc hai thay vì hệ số khuếch đại moment?", en: "1. Why second-order analysis rather than moment magnification?" },
        body: [
          { vi: "ACI 318 mở ra ba con đường để xử lý hiệu ứng bậc hai:", en: "ACI 318-14 opens three routes for handling second-order effects:" },
          {
            type: "table",
            head: [{ vi: "Đường", en: "Route" }, { vi: "Điều khoản", en: "Clause" }, { vi: "Cách làm", en: "Method" }, { vi: "Phù hợp với", en: "Suited to" }],
            rows: [
              [{ vi: "1", en: "1" }, { vi: "§6.6.4", en: "§6.6.4" }, { vi: "Phân tích bậc nhất + khuếch đại moment δ<sub>ns</sub>, δ<sub>s</sub>", en: "First-order analysis + moment magnification δ<sub>ns</sub>, δ<sub>s</sub>" }, { vi: "Nhà khung đều tầng, hình học đơn giản", en: "Regular framed buildings, simple geometry" }],
              [{ vi: "2", en: "2" }, { vi: "§6.7", en: "§6.7" }, { vi: "Phân tích đàn hồi bậc hai", en: "Second-order elastic analysis" }, { vi: "Kết cấu công nghiệp, khung không đều tầng", en: "Industrial structures, irregular framing" }],
              [{ vi: "3", en: "3" }, { vi: "§6.8", en: "§6.8" }, { vi: "Phân tích phi tuyến vật liệu", en: "Material nonlinear analysis" }, { vi: "Đánh giá, cải tạo, nghiên cứu", en: "Assessment, retrofit, research" }]
            ]
          },
          {
            vi: "Với kết cấu nhà máy — khung đỡ thiết bị, sàn thao tác cục bộ, cao trình lệch nhau, cột dài không có dầm giằng, chân cột trên đài cọc — <b>Đường 1 bị loại bỏ ngay từ định nghĩa</b>. Chỉ số ổn định Q, tổng ΣP<sub>u</sub>, ΣP<sub>c</sub> và chiều dài l<sub>u</sub> trong §6.6.4.4.3 đều dựa trên khái niệm “một tầng” mà công trình đó hầu như không có.",
            en: "For plant structures — equipment support frames, local access platforms, staggered levels, long columns with no tie beams, column bases on pile caps — <b>Route 1 is ruled out by its own definition</b>. The stability index Q, the sums ΣP<sub>u</sub> and ΣP<sub>c</sub>, and the length l<sub>u</sub> in §6.6.4.4.3 all rest on a notion of “a storey” that such structures barely possess."
          },
          {
            vi: "Đường 2 chuyển gánh nặng sang mô hình. Đổi lại, kỹ sư phải tuân thủ <b>bốn điều kiện</b>:",
            en: "Route 2 shifts the burden onto the model. In return, the engineer must comply with <b>four conditions</b>:"
          },
          {
            type: "list",
            items: [
              { vi: "Độ cứng tiết diện phải giảm theo §6.6.3.1.1 (được viện dẫn lại tại §6.7.2.1.1);", en: "Section stiffness must be reduced per §6.6.3.1.1 (referenced again in §6.7.2.1.1);" },
              { vi: "Phân tích bao gồm <b>cả P-Δ</b> (chuyển vị nút) <b>và P-δ</b> (độ cong trong lòng cấu kiện) — §6.7.1.2;", en: "The analysis must capture <b>both P-Δ</b> (joint displacement) <b>and P-δ</b> (curvature within the member) — §6.7.1.2;" },
              { vi: "Phần thiết kế phải đặt δ<sub>ns</sub> = δ<sub>s</sub> = 1.0, nếu không hiệu ứng bậc hai bị tính hai lần;", en: "The design side must set δ<sub>ns</sub> = δ<sub>s</sub> = 1.0, otherwise second-order effects are counted twice;" },
              { vi: "M<sub>bậc 2</sub> ≤ 1.4 × M<sub>bậc 1</sub> — §6.2.6.", en: "M<sub>2nd</sub> ≤ 1.4 × M<sub>1st</sub> — §6.2.6." }
            ]
          },
          {
            type: "tip",
            vi: "<b>Điểm mấu chốt:</b> vi phạm một trong bốn điều kiện, SAP2000 vẫn xuất ra kết quả (D/C ratio) — nhưng con số đó không còn ý nghĩa gì với ACI 318.",
            en: "<b>The key point:</b> break any one of the four and SAP2000 still prints a result (a D/C ratio) — but that number no longer means anything under ACI 318."
          },
          {
            type: "figure",
            src: "Resource/articles/03-aci318-2nd-order/H1_Quy-trinh-8-buoc.svg",
            caption: { vi: "<b>Hình 1.</b> Toàn cảnh quy trình 8 bước, chia thành ba giai đoạn: mô hình, phân tích và thiết kế.", en: "<b>Figure 1.</b> The eight-step workflow at a glance, in three stages: modelling, analysis and design." }
          }
        ]
      },
      {
        heading: { vi: "2. Bước 0 — Khai báo vùng cứng (Rigid Zone / End Offsets)", en: "2. Step 0 — Rigid zones (end offsets)" },
        body: [
          { type: "code", vi: "Assign &gt; Frame &gt; End (Length) Offsets…", en: "Assign &gt; Frame &gt; End (Length) Offsets…" },
          {
            vi: "Phần tử thanh trong SAP2000 nối các nút toán học, nhưng dầm và cột thật có bề rộng — vùng giao nhau bị chồng lấn hai lần nếu không khai báo offset.",
            en: "Frame elements in SAP2000 join mathematical nodes, but real beams and columns have width — the intersection zone is counted twice unless offsets are declared."
          },
          {
            type: "list",
            items: [
              { vi: "<b>L<sub>c</sub> = L − (ioff + joff)</b> → chiều dài thông thuỷ. Quyết định <b>vị trí xuất nội lực thiết kế</b>, đúng với yêu cầu tiết diện tới hạn tại mép gối của ACI 318-14 §9.4.2.1.", en: "<b>L<sub>c</sub> = L − (ioff + joff)</b> → clear length. It fixes <b>where design forces are reported</b>, matching the critical-section-at-face-of-support requirement of ACI 318-14 §9.4.2.1." },
              { vi: "<b>L<sub>f</sub> = L − rigid × (ioff + joff)</b> → chiều dài biến dạng. Quyết định <b>độ cứng uốn và cắt</b> của cấu kiện.", en: "<b>L<sub>f</sub> = L − rigid × (ioff + joff)</b> → deformation length. It fixes the member's <b>flexural and shear stiffness</b>." },
              { vi: "<code>Rigid Zone Factor</code> chạy từ 0 đến 1.0. <b>Mặc định của SAP2000 là 0</b> — nghĩa là bạn được lợi về vị trí thiết kế nhưng không được lợi gì về độ cứng.", en: "<code>Rigid Zone Factor</code> runs from 0 to 1.0. <b>SAP2000 defaults to 0</b> — you get the benefit in design location but none in stiffness." }
            ]
          },
          {
            type: "figure",
            src: "Resource/articles/03-aci318-2nd-order/H2_Vung-cung-Lc-Lf.svg",
            caption: { vi: "<b>Hình 2.</b> L<sub>c</sub> quyết định vị trí xuất nội lực, L<sub>f</sub> quyết định độ cứng. Hai chiều dài khác nhau, hai vai trò khác nhau.", en: "<b>Figure 2.</b> L<sub>c</sub> fixes where forces are reported, L<sub>f</sub> fixes stiffness. Two lengths, two different roles." }
          },
          { type: "subhead", vi: "Khuyến nghị thực hành", en: "Practical recommendations" },
          {
            type: "list",
            items: [
              { vi: "Chọn <code>Automatic from Connectivity</code> để SAP tự tính ioff/joff theo tiết diện thật.", en: "Choose <code>Automatic from Connectivity</code> so SAP computes ioff/joff from the real sections." },
              { vi: "Đặt <b>rigid = 0.5</b> cho khung BTCT thông thường. Nút khung BTCT không tuyệt đối cứng: nó biến dạng cắt trong vùng joint.", en: "Use <b>rigid = 0.5</b> for ordinary RC frames. An RC joint is not perfectly rigid: it deforms in shear within the joint region." },
              { vi: "Không dùng rigid = 1.0. Nó làm khung cứng giả tạo → đánh giá thấp chuyển vị ngang → <b>đánh giá thấp luôn hiệu ứng P-Δ</b>.", en: "Do not use rigid = 1.0. It makes the frame artificially stiff → underestimates lateral drift → <b>and therefore underestimates the very P-Δ effect</b>." }
            ]
          }
        ]
      },
      {
        heading: { vi: "3. Bước 1 — Chọn kiểu thiết kế RC (Design Type)", en: "3. Step 1 — Choosing the RC design type" },
        body: [
          { type: "code", vi: "Define &gt; Section Properties &gt; Frame Sections &gt; Concrete Reinforcement…", en: "Define &gt; Section Properties &gt; Frame Sections &gt; Concrete Reinforcement…" },
          {
            type: "table",
            head: [{ vi: "Kiểu", en: "Type" }, { vi: "Ý nghĩa", en: "Meaning" }, { vi: "Dùng cho", en: "Use for" }],
            rows: [
              [{ vi: "<code>Beam (M3 Design Only)</code>", en: "<code>Beam (M3 Design Only)</code>" }, { vi: "Chỉ thiết kế uốn quanh trục 3, <b>bỏ qua lực dọc</b>", en: "Flexure about axis 3 only, <b>axial force ignored</b>" }, { vi: "Dầm chịu uốn thuần", en: "Beams in pure flexure" }],
              [{ vi: "<code>Column (P-M2-M3 Design)</code>", en: "<code>Column (P-M2-M3 Design)</code>" }, { vi: "Thiết kế theo mặt tương tác P-M2-M3", en: "Design on the P-M2-M3 interaction surface" }, { vi: "Cột, cấu kiện có lực dọc đáng kể", en: "Columns and members with significant axial load" }]
            ]
          },
          { type: "subhead", vi: "Ba sai sót dễ mắc phải", en: "Three easy mistakes" },
          {
            type: "list",
            items: [
              { vi: "<code>Concrete Cover</code> trong hộp thoại là <b>khoảng cách tới tâm cốt thép</b> (cốt đai cho cột và cốt dọc cho dầm), không phải lớp bê tông bảo vệ.", en: "<code>Concrete Cover</code> in the dialog is the <b>distance to the centroid of the reinforcement</b> (to the tie for columns, to the longitudinal bar for beams) — not the clear cover." },
              { vi: "Với cột, lần chạy đầu chọn <code>Reinforcement to be Designed</code> để SAP tính A<sub>s</sub> yêu cầu. Lần chạy sau chuyển sang <code>Reinforcement to be Checked</code> với bố trí thép thật (xem Bước 5).", en: "For columns, the first run uses <code>Reinforcement to be Designed</code> so SAP computes the required A<sub>s</sub>. The later run switches to <code>Reinforcement to be Checked</code> with the actual bar layout (see Step 5)." },
              { vi: "<b>Dầm collector, dầm giằng, dầm chuyển</b> trong hệ chịu động đất có lực dọc lớn. Để kiểu <code>Beam</code> là SAP bỏ qua toàn bộ P → sai an toàn. Khai kiểu <code>Column</code> hoặc kiểm tra lại bằng tay.", en: "<b>Collector beams, tie beams and transfer beams</b> in a seismic system carry large axial force. Leaving them as <code>Beam</code> makes SAP discard P entirely → unsafe. Declare them as <code>Column</code>, or check them by hand." }
            ]
          }
        ]
      },
      {
        heading: { vi: "4. Bước 1-1 — Giảm độ cứng (Property Modifiers)", en: "4. Step 1-1 — Stiffness reduction (property modifiers)" },
        body: [
          { vi: "<code>Set Modifiers…</code> trong hộp thoại tiết diện, hoặc <code>Assign &gt; Frame &gt; Property Modifiers</code>.", en: "<code>Set Modifiers…</code> in the section dialog, or <code>Assign &gt; Frame &gt; Property Modifiers</code>." },
          { type: "subhead", vi: "Bảng tra nhanh — ACI 318-14 Bảng 6.6.3.1.1(a) và §6.6.3.2.2", en: "Quick lookup — ACI 318-14 Table 6.6.3.1.1(a) and §6.6.3.2.2" },
          {
            type: "table",
            head: [
              { vi: "Cấu kiện", en: "Member" },
              { vi: "Phân tích tải trọng tính toán (§6.6.3.1.1)", en: "Factored-load analysis (§6.6.3.1.1)" },
              { vi: "Phân tích tải trọng sử dụng (§6.6.3.2.2 — nhân 1.4, không vượt I<sub>g</sub>)", en: "Service-load analysis (§6.6.3.2.2 — ×1.4, not exceeding I<sub>g</sub>)" }
            ],
            rows: [
              [{ vi: "Cột", en: "Column" }, { vi: "0.70 I<sub>g</sub>", en: "0.70 I<sub>g</sub>" }, { vi: "1.00 I<sub>g</sub>", en: "1.00 I<sub>g</sub>" }],
              [{ vi: "Vách chưa nứt", en: "Uncracked wall" }, { vi: "0.70 I<sub>g</sub>", en: "0.70 I<sub>g</sub>" }, { vi: "1.00 I<sub>g</sub>", en: "1.00 I<sub>g</sub>" }],
              [{ vi: "Vách đã nứt", en: "Cracked wall" }, { vi: "0.35 I<sub>g</sub>", en: "0.35 I<sub>g</sub>" }, { vi: "0.49 I<sub>g</sub>", en: "0.49 I<sub>g</sub>" }],
              [{ vi: "Dầm chữ nhật", en: "Rectangular beam" }, { vi: "0.35 I<sub>g</sub>", en: "0.35 I<sub>g</sub>" }, { vi: "0.49 ≈ 0.50 I<sub>g</sub>", en: "0.49 ≈ 0.50 I<sub>g</sub>" }],
              [{ vi: "<b>Dầm chữ T</b> (mô hình bằng tiết diện sườn)", en: "<b>T-beam</b> (modelled as the web section)" }, { vi: "<b>0.70</b> I<sub>g,sườn</sub>", en: "<b>0.70</b> I<sub>g,web</sub>" }, { vi: "1.00 I<sub>g,sườn</sub>", en: "1.00 I<sub>g,web</sub>" }],
              [{ vi: "Sàn phẳng / sàn nấm", en: "Flat plate / flat slab" }, { vi: "0.25 I<sub>g</sub>", en: "0.25 I<sub>g</sub>" }, { vi: "0.35 I<sub>g</sub>", en: "0.35 I<sub>g</sub>" }],
              [{ vi: "Diện tích tiết diện A", en: "Section area A" }, { vi: "1.0 A<sub>g</sub>", en: "1.0 A<sub>g</sub>" }, { vi: "1.0 A<sub>g</sub>", en: "1.0 A<sub>g</sub>" }],
              [{ vi: "Hằng số xoắn J", en: "Torsional constant J" }, { vi: "<i>xem lưu ý bên dưới</i>", en: "<i>see the note below</i>" }, { vi: "<i>xem lưu ý bên dưới</i>", en: "<i>see the note below</i>" }]
            ]
          },
          { type: "subhead", vi: "Vì sao dầm T lại là 0.70 mà không phải 0.35?", en: "Why is a T-beam 0.70 and not 0.35?" },
          {
            vi: "R6.6.3.1.1 cho phép lấy gần đúng I<sub>g</sub> của dầm T bằng <b>2 lần</b> I<sub>g</sub> của phần sườn, tức 2·(b<sub>w</sub>h³/12). Khi bạn khai tiết diện chữ nhật b<sub>w</sub>×h trong SAP2000, hệ số cần nhập là 0.35 × 2 = <b>0.70</b>.",
            en: "R6.6.3.1.1 permits I<sub>g</sub> of a T-beam to be taken as <b>twice</b> the I<sub>g</sub> of the web, i.e. 2·(b<sub>w</sub>h³/12). When you model a rectangular b<sub>w</sub>×h section in SAP2000, the factor to enter is 0.35 × 2 = <b>0.70</b>."
          },
          {
            type: "list",
            items: [
              { vi: "Nếu bạn đã khai đúng tiết diện T (hoặc dầm làm việc liên hợp với sàn shell), <b>không được nhân đôi lần nữa</b> — cánh đã có sẵn trong I<sub>g</sub>.", en: "If you have already modelled a true T-section (or a beam acting compositely with a shell slab), <b>do not double it again</b> — the flange is already in I<sub>g</sub>." }
            ]
          },
          { type: "subhead", vi: "Hằng số xoắn J — điều mà tài liệu gốc bỏ qua", en: "The torsional constant J — what the manuals leave out" },
          {
            vi: "Để J = 1.0 nghĩa là bạn mô hình dầm với độ cứng xoắn <b>chưa nứt</b>. Trong khung BTCT thực, dầm biên nứt xoắn từ rất sớm và tự giải phóng moment xoắn. Giữ J = 1.0 sẽ hút một lượng xoắn ảo vào dầm biên, dẫn tới bố trí đai và thép dọc chống xoắn không cần thiết.",
            en: "Leaving J = 1.0 models the beam with <b>uncracked</b> torsional stiffness. In a real RC frame, spandrel beams crack in torsion very early and shed the torsional moment. Keeping J = 1.0 draws a fictitious torsion into the spandrel, leading to stirrups and longitudinal torsion bars that are not needed."
          },
          {
            type: "list",
            items: [
              { vi: "Khuyến nghị: <b>J modifier = 0.1 ÷ 0.2</b> khi xoắn là <i>xoắn tương thích</i> (compatibility torsion, ACI 318-14 §22.7.3).", en: "Recommendation: <b>J modifier = 0.1 to 0.2</b> where the torsion is <i>compatibility torsion</i> (ACI 318-14 §22.7.3)." },
              { vi: "Giữ J = 1.0 khi xoắn là <i>xoắn cân bằng</i> (equilibrium torsion) — dầm console đỡ sàn một bên, dầm đỡ mái đua.", en: "Keep J = 1.0 where the torsion is <i>equilibrium torsion</i> — a cantilever beam carrying a slab on one side, or a beam supporting an overhanging roof." }
            ]
          },
          {
            type: "figure",
            src: "Resource/articles/03-aci318-2nd-order/H5_Bang-tra-Property-Modifier.svg",
            caption: { vi: "<b>Hình 3.</b> Bảng tra nhanh modifier cho hai mức tải trọng, kèm hai lưu ý dễ sai sót nhất.", en: "<b>Figure 3.</b> Quick modifier lookup for the two load levels, with the two most common mistakes." }
          },
          { type: "subhead", vi: "Hai lưu ý về modifier trong SAP2000", en: "Two notes on modifiers in SAP2000" },
          {
            type: "list",
            items: [
              { vi: "Modifier khai ở <b>cấp tiết diện</b> và modifier gán ở <b>cấp đối tượng</b> sẽ <b>nhân với nhau</b>. Khai 0.35 ở cả hai nơi ra 0.1225 — mô hình mềm gấp 3 lần dự kiến. Chỉ dùng một nơi.", en: "A modifier set at <b>section level</b> and one assigned at <b>object level</b> <b>multiply together</b>. Entering 0.35 in both places gives 0.1225 — a model three times more flexible than intended. Use one place only." },
              { vi: "Ô <code>Mass</code> và <code>Weight</code> (nền xanh) luôn giữ 1.0. Giảm chúng là giảm luôn tải trọng bản thân.", en: "The <code>Mass</code> and <code>Weight</code> fields (green background) stay at 1.0. Reducing them reduces the self weight as well." }
            ]
          }
        ]
      },
      {
        heading: { vi: "5. Bước 2 — Thiết lập phân tích đàn hồi bậc hai", en: "5. Step 2 — Setting up the second-order elastic analysis" },
        body: [
          {
            vi: "SAP2000 chỉ tính P-Delta trong <b>Nonlinear Static Load Case</b>. Mà bài toán phi tuyến <b>không cộng tác dụng được</b>. Hệ quả: mỗi tổ hợp tải trọng tính toán phải trở thành <b>một load case riêng</b>, với đúng hệ số tổ hợp của nó.",
            en: "SAP2000 computes P-Delta only inside a <b>nonlinear static load case</b>. And nonlinear problems <b>do not superpose</b>. The consequence: every factored load combination must become <b>its own load case</b>, carrying that combination's own factors."
          },
          { type: "subhead", vi: "Trình tự bắt buộc — sai thứ tự là mất dữ liệu", en: "The mandatory order — get it wrong and you lose data" },
          {
            type: "list",
            items: [
              { vi: "<b>1.</b> <b>Chọn tổ hợp thiết kế</b> (Strength): tổ hợp lắp dựng, vận hành, thử tải theo spec dự án.", en: "<b>1.</b> <b>Select the design combinations</b> (strength): erection, operating and test combinations per the project spec." },
              { vi: "<b>2.</b> <b>Sao chép toàn bộ tổ hợp</b> thành bộ thứ hai, đặt tiền tố <code>L-</code> (ví dụ <code>L-LC1001</code>). Bộ này giữ nguyên bậc nhất, để so sánh ở Bước 4.", en: "<b>2.</b> <b>Copy the whole set</b> into a second set prefixed <code>L-</code> (e.g. <code>L-LC1001</code>). This set stays first-order, for the comparison in Step 4." },
              { vi: "<b>3.</b> <code>Define &gt; Load Combinations &gt; Convert Combos to Nonlinear Cases…</code> → SAP tạo <code>LC1001-NL</code> và biến <code>LC1001</code> thành tổ hợp <code>Linear Add</code> chỉ chứa <code>LC1001-NL</code> với hệ số 1.0.", en: "<b>3.</b> <code>Define &gt; Load Combinations &gt; Convert Combos to Nonlinear Cases…</code> → SAP creates <code>LC1001-NL</code> and rewrites <code>LC1001</code> as a <code>Linear Add</code> combination containing only <code>LC1001-NL</code> at factor 1.0." },
              { vi: "<b>4.</b> <b>Kiểm tra ngẫu nhiên vài case đã convert</b> (<code>Define &gt; Load Cases &gt; Modify/Show</code>) theo bảng dưới.", en: "<b>4.</b> <b>Spot-check a few converted cases</b> (<code>Define &gt; Load Cases &gt; Modify/Show</code>) against the table below." }
            ]
          },
          {
            type: "tip",
            vi: "⚠️ Phải copy bộ <code>L-</code> <b>trước</b> khi convert. Convert xong là tổ hợp gốc đã bị thay ruột, không lấy lại được.",
            en: "⚠️ The <code>L-</code> set must be copied <b>before</b> converting. Once converted, the original combinations have been gutted and cannot be recovered."
          },
          {
            type: "table",
            head: [{ vi: "Trường", en: "Field" }, { vi: "Giá trị đúng", en: "Correct value" }],
            rows: [
              [{ vi: "<code>Load Case Type</code> / <code>Analysis Type</code>", en: "<code>Load Case Type</code> / <code>Analysis Type</code>" }, { vi: "Static / <b>Nonlinear</b>", en: "Static / <b>Nonlinear</b>" }],
              [{ vi: "<code>Geometric Nonlinearity</code>", en: "<code>Geometric Nonlinearity</code>" }, { vi: "<b>P-Delta</b> — không chọn <i>P-Delta plus Large Displacements</i> (chậm, dễ phân kỳ, không cần cho khung nhà)", en: "<b>P-Delta</b> — not <i>P-Delta plus Large Displacements</i> (slow, prone to divergence, unnecessary for building frames)" }],
              [{ vi: "<code>Initial Conditions</code>", en: "<code>Initial Conditions</code>" }, { vi: "Zero Initial Conditions", en: "Zero Initial Conditions" }],
              [{ vi: "Load Pattern &amp; Scale Factor", en: "Load pattern &amp; scale factor" }, { vi: "đúng bằng hệ số tổ hợp", en: "exactly the combination factors" }],
              [{ vi: "<code>Results Saved</code>", en: "<code>Results Saved</code>" }, { vi: "Final State Only (giảm dung lượng file rất nhiều khi có hơn 100 case)", en: "Final State Only (a large file-size saving once there are more than 100 cases)" }]
            ]
          },
          { type: "subhead", vi: "Chia nhỏ cấu kiện để bắt P-δ", en: "Subdivide members to capture P-δ" },
          { type: "code", vi: "Assign &gt; Frame &gt; Automatic Frame Mesh…\n  Auto Mesh Frame\n  at Intermediate Joints\n  Minimum Number of Segments = 2", en: "Assign &gt; Frame &gt; Automatic Frame Mesh…\n  Auto Mesh Frame\n  at Intermediate Joints\n  Minimum Number of Segments = 2" },
          {
            type: "list",
            items: [
              { vi: "P-Delta trong SAP2000 chỉ tính tại nút. Cột một phần tử = chỉ có P-Δ, <b>không có P-δ</b> → vi phạm §6.7.1.2.", en: "P-Delta in SAP2000 is evaluated at nodes only. A single-element column gives P-Δ alone, <b>no P-δ</b> → a breach of §6.7.1.2." },
              { vi: "Dùng 2 phân đoạn cho cột thường, <b>3–4 phân đoạn</b> cho cột mảnh (kl<sub>u</sub>/r &gt; 60) hoặc cột đỡ thiết bị nặng.", en: "Use 2 segments for ordinary columns, <b>3–4 segments</b> for slender columns (kl<sub>u</sub>/r &gt; 60) or columns supporting heavy equipment." },
              { vi: "<b>Cho phép dùng <code>Automatic Frame Mesh</code>.</b> Auto mesh chỉ chia phần tử phân tích, đối tượng thiết kế vẫn nguyên vẹn.", en: "<b><code>Automatic Frame Mesh</code> is the right tool.</b> Auto mesh subdivides the analysis element only; the design object stays intact." }
            ]
          },
          {
            type: "figure",
            src: "Resource/articles/03-aci318-2nd-order/H3_PDelta-Pdelta-Mesh.svg",
            caption: { vi: "<b>Hình 4.</b> Cột một phần tử chỉ bắt được P-Δ. Phải chia phân đoạn mới có P-δ theo yêu cầu §6.7.1.2.", en: "<b>Figure 4.</b> A single-element column captures P-Δ only. Segments are required before P-δ appears, as §6.7.1.2 demands." }
          },
          { type: "subhead", vi: "Điểm xuất kết quả", en: "Output stations" },
          { type: "code", vi: "Assign &gt; Frame &gt; Output Stations…\n  Minimum Number of Stations = 9\n  ☑ At Intersections with Other Elements\n  ☑ At Concentrated Load Locations", en: "Assign &gt; Frame &gt; Output Stations…\n  Minimum Number of Stations = 9\n  ☑ At Intersections with Other Elements\n  ☑ At Concentrated Load Locations" },
          {
            vi: "Dầm cần nhiều station (nội lực lớn nhất nằm giữa nhịp). Cột chỉ cần hai đầu — có thể để 3–5 stations cho cột để giảm thời gian chạy.",
            en: "Beams need many stations (the peak force sits mid-span). Columns only need their two ends — 3–5 stations per column is enough and shortens the run."
          }
        ]
      },
      {
        heading: { vi: "6. Bước 2-1 — Load Case Type và Dead Load Case cho thiết kế động đất", en: "6. Step 2-1 — Load case type and dead load case for seismic design" },
        body: [
          { vi: "Đây là bước tinh tế nhất và cũng bị bỏ sót nhiều nhất.", en: "This is the subtlest step, and the one most often skipped." },
          {
            vi: "Sau khi convert, SAP2000 <b>không còn biết</b> tổ hợp nào chứa động đất, và cũng không biết đâu là phần tải trọng đứng. Hai thông tin này lại là điều kiện sống còn của Chương 18.",
            en: "After conversion SAP2000 <b>no longer knows</b> which combination contains seismic load, nor which part of it is gravity. Both facts are vital to Chapter 18."
          },
          { type: "subhead", vi: "(a) Để SAP nhận diện tải trọng động đất", en: "(a) Letting SAP recognise the seismic load" },
          { type: "code", vi: "Load Case Data &gt; Load Case Type &gt; Design…\n  User Defined = Quake        (cho mọi case phi tuyến có chứa động đất)", en: "Load Case Data &gt; Load Case Type &gt; Design…\n  User Defined = Quake        (for every nonlinear case containing seismic load)" },
          {
            vi: "Chỉ khi nhìn thấy nhãn <code>Quake</code>, SAP2000 mới kích hoạt các quy định của ACI 318-14 Chương 18: lực cắt thiết kế theo M<sub>pr</sub>, kiểm tra cắt nút, tỷ số 6/5, giới hạn thép tối thiểu hai đầu dầm.",
            en: "Only when it sees the <code>Quake</code> label does SAP2000 activate the ACI 318-14 Chapter 18 provisions: design shear from M<sub>pr</sub>, joint shear check, the 6/5 ratio, and the minimum reinforcement limits at both beam ends."
          },
          { type: "subhead", vi: "(b) Để SAP nhận diện tải trọng đứng — thủ thuật cặp Dead/Balance", en: "(b) Letting SAP recognise the gravity load — the Dead/Balance pair trick" },
          { vi: "ACI 318-14 §18.6.5.1 quy định lực cắt thiết kế của dầm:", en: "ACI 318-14 §18.6.5.1 defines the design shear of a beam:" },
          { type: "code", vi: "Ve = (Mpr1 + Mpr2) / ln  ±  wu · ln / 2", en: "Ve = (Mpr1 + Mpr2) / ln  ±  wu · ln / 2" },
          { vi: "SAP2000 tính được phần M<sub>pr</sub>, nhưng cần biết w<sub>u</sub> là bao nhiêu. Cách làm:", en: "SAP2000 can compute the M<sub>pr</sub> part, but it needs to know w<sub>u</sub>. The method:" },
          {
            type: "list",
            items: [
              { vi: "<b>1.</b> Tạo <b>hai load case Linear Static giống hệt nhau</b>, chứa đúng phần tải trọng đứng của tổ hợp động đất (ví dụ <code>1.2(BL+DL)+1.0LL</code>).", en: "<b>1.</b> Create <b>two identical linear static load cases</b> holding exactly the gravity part of the seismic combination (e.g. <code>1.2(BL+DL)+1.0LL</code>)." },
              { vi: "<b>2.</b> Đặt tên phân biệt: <code>…_dead</code> và <code>…_other</code>.", en: "<b>2.</b> Name them distinctly: <code>…_dead</code> and <code>…_other</code>." },
              { vi: "<b>3.</b> Gán <code>Design Load Type</code>: một case là <b>Dead</b>, case còn lại là <b>Other</b>.", en: "<b>3.</b> Set <code>Design Load Type</code>: one case <b>Dead</b>, the other <b>Other</b>." },
              { vi: "<b>4.</b> Thêm cả hai vào tổ hợp động đất với hệ số <b>+1.0 và −1.0</b>.", en: "<b>4.</b> Add both to the seismic combination with factors <b>+1.0 and −1.0</b>." }
            ]
          },
          {
            type: "figure",
            src: "Resource/articles/03-aci318-2nd-order/H4_Cap-Dead-Balance-Ve.svg",
            caption: { vi: "<b>Hình 5.</b> Cặp gravity case Dead/Balance với hệ số +1/−1 giúp SAP2000 nhận ra phần tải trọng đứng khi dựng V<sub>e</sub>.", en: "<b>Figure 5.</b> The Dead/Balance gravity pair at +1/−1 lets SAP2000 identify the gravity share when building V<sub>e</sub>." }
          },
          {
            vi: "<b>Logic của thủ thuật:</b> hai case triệt tiêu nhau về mặt số học, nội lực tổ hợp không đổi một chút nào. Nhưng SAP2000 đọc được case mang nhãn <code>Dead</code> và dùng nó làm V<sub>g</sub> khi dựng biểu đồ cắt theo M<sub>pr</sub>.",
            en: "<b>Why it works:</b> the two cases cancel arithmetically, so the combination forces do not change at all. But SAP2000 can read the case labelled <code>Dead</code> and uses it as V<sub>g</sub> when building the shear diagram from M<sub>pr</sub>."
          },
          {
            type: "list",
            items: [
              { vi: "Hệ số tải trọng đứng phải khớp với chính tổ hợp đó: <code>1.2D + 1.0L + 0.2S</code> cho tổ hợp ASCE 7-16 số 6, <code>0.9D</code> cho tổ hợp số 7.", en: "The gravity factors must match that specific combination: <code>1.2D + 1.0L + 0.2S</code> for ASCE 7-16 combination 6, <code>0.9D</code> for combination 7." },
              { vi: "Nếu bỏ qua bước này, V<sub>e</sub> chỉ có phần từ M<sub>pr</sub> — <b>thiếu hoàn toàn phần tải trọng đứng</b>, thiên về không an toàn.", en: "Skip this and V<sub>e</sub> carries only the M<sub>pr</sub> part — <b>the entire gravity share is missing</b>, on the unsafe side." }
            ]
          }
        ]
      },
      {
        heading: { vi: "7. Bước 3 — Thiết lập tham số thiết kế", en: "7. Step 3 — Design parameters" },
        body: [
          { type: "subhead", vi: "(a) Preferences", en: "(a) Preferences" },
          { type: "code", vi: "Design &gt; Concrete Frame Design &gt; View/Revise Preferences…", en: "Design &gt; Concrete Frame Design &gt; View/Revise Preferences…" },
          {
            type: "table",
            head: [{ vi: "Mục", en: "Item" }, { vi: "Giá trị", en: "Value" }, { vi: "Ghi chú", en: "Note" }],
            rows: [
              [{ vi: "Design Code", en: "Design Code" }, { vi: "ACI 318-14 / ACI 318-19", en: "ACI 318-14 / ACI 318-19" }, { vi: "Xem mục 13 về khác biệt", en: "See section 13 on the differences" }],
              [{ vi: "Multi-Response Case Design", en: "Multi-Response Case Design" }, { vi: "Envelopes", en: "Envelopes" }, { vi: "", en: "" }],
              [{ vi: "Consider Minimum Eccentricity", en: "Consider Minimum Eccentricity" }, { vi: "<b>Yes</b>", en: "<b>Yes</b>" }, { vi: "Kích hoạt M<sub>2,min</sub> = P<sub>u</sub>(15 + 0.03h) mm, §6.6.4.5.4", en: "Activates M<sub>2,min</sub> = P<sub>u</sub>(15 + 0.03h) mm, §6.6.4.5.4" }],
              [{ vi: "Seismic Design Category", en: "Seismic Design Category" }, { vi: "Theo spec dự án", en: "Per project spec" }, { vi: "Lấy từ ASCE 7, không đoán", en: "Take it from ASCE 7; do not guess" }],
              [{ vi: "Design System Rho (ρ), Sds", en: "Design System Rho (ρ), Sds" }, { vi: "Theo spec", en: "Per spec" }, { vi: "Chỉ dùng khi để SAP tự sinh tổ hợp — ta <b>không</b> dùng", en: "Only used if SAP generates combinations itself — which we do <b>not</b> do" }],
              [{ vi: "Phi (Shear Seismic)", en: "Phi (Shear Seismic)" }, { vi: "0.60", en: "0.60" }, { vi: "§21.2.4.1", en: "§21.2.4.1" }],
              [{ vi: "Phi (Joint Shear)", en: "Phi (Joint Shear)" }, { vi: "0.85", en: "0.85" }, { vi: "§21.2.4.3", en: "§21.2.4.3" }],
              [{ vi: "Utilization Factor Limit", en: "Utilization Factor Limit" }, { vi: "0.95", en: "0.95" }, { vi: "Ngưỡng nội bộ, nên giữ ≤ 1.0", en: "An internal threshold; keep it ≤ 1.0" }]
            ]
          },
          { type: "subhead", vi: "(b) Design Combinations", en: "(b) Design combinations" },
          {
            type: "list",
            items: [
              { vi: "Đưa vào danh sách <b>bộ tổ hợp bậc hai</b> (<code>LC1001</code>, <code>LC1002</code>…), không phải bộ <code>L-</code>.", en: "Feed in the <b>second-order set</b> (<code>LC1001</code>, <code>LC1002</code>…), not the <code>L-</code> set." },
              { vi: "<b>Bỏ tích <code>Automatically Generate Code-Based Design Load Combinations</code>.</b> Nếu tích, SAP2000 tự sinh tổ hợp tuyến tính theo hệ số riêng của nó và <b>toàn bộ công sức phân tích phi tuyến bị vô hiệu</b>.", en: "<b>Untick <code>Automatically Generate Code-Based Design Load Combinations</code>.</b> Leave it ticked and SAP2000 generates its own linear combinations, and <b>the entire nonlinear analysis is wasted</b>." }
            ]
          },
          { type: "subhead", vi: "(c) Overwrites", en: "(c) Overwrites" },
          {
            type: "table",
            head: [{ vi: "Mục", en: "Item" }, { vi: "Giá trị", en: "Value" }, { vi: "Lý do", en: "Reason" }],
            rows: [
              [{ vi: "Framing Type", en: "Framing Type" }, { vi: "<code>Sway Special</code> cho kết cấu theo Chương 18; <code>Sway Ordinary</code> cho trường hợp còn lại", en: "<code>Sway Special</code> for Chapter 18 structures; <code>Sway Ordinary</code> otherwise" }, { vi: "Quyết định toàn bộ nhóm kiểm tra động đất", en: "Determines the whole set of seismic checks" }],
              [{ vi: "Effective Length Factor K", en: "Effective Length Factor K" }, { vi: "Program Determined", en: "Program Determined" }, { vi: "SAP lấy K = 1.0, đúng tinh thần phân tích bậc hai", en: "SAP takes K = 1.0, in keeping with second-order analysis" }],
              [{ vi: "<b>NonSway Moment Factor D<sub>ns</sub></b>", en: "<b>NonSway Moment Factor D<sub>ns</sub></b>" }, { vi: "<b>1.0</b>", en: "<b>1.0</b>" }, { vi: "P-δ đã có nhờ chia phân đoạn", en: "P-δ is already there through the segmentation" }],
              [{ vi: "<b>Sway Moment Factor D<sub>s</sub></b>", en: "<b>Sway Moment Factor D<sub>s</sub></b>" }, { vi: "<b>1.0</b>", en: "<b>1.0</b>" }, { vi: "P-Δ đã có nhờ nonlinear case", en: "P-Δ is already there through the nonlinear case" }]
            ]
          },
          {
            type: "tip",
            vi: "<b>Sai lầm dễ mắc phải số 1 của cả bài:</b> để D<sub>ns</sub>/D<sub>s</sub> ở <code>Program Determined</code> là hiệu ứng bậc hai bị nhân <b>hai lần</b> — một lần trong phân tích, một lần trong thiết kế. Cột sẽ ra thép thừa 20–40% mà không ai hiểu vì sao.",
            en: "<b>The single easiest mistake in this whole article:</b> leaving D<sub>ns</sub>/D<sub>s</sub> at <code>Program Determined</code> counts the second-order effect <b>twice</b> — once in the analysis, once in the design. Columns come out 20–40% over-reinforced and nobody can work out why."
          }
        ]
      },
      {
        heading: { vi: "8. Bước 4 — Kiểm tra M<sub>bậc 2</sub> ≤ 1.4 M<sub>bậc 1</sub>", en: "8. Step 4 — Checking M<sub>2nd</sub> ≤ 1.4 M<sub>1st</sub>" },
        body: [
          {
            vi: "Đây <b>không phải</b> kiểm tra tuỳ chọn theo yêu cầu chủ đầu tư. ACI 318-14 <b>§6.2.6</b> quy định: tổng moment kể cả hiệu ứng bậc hai trong cấu kiện chịu nén, dầm kiềm chế và các cấu kiện khác <b>không được vượt quá 1.4 lần</b> moment bậc nhất. Đây là ngưỡng chặn độ nhạy ổn định của toàn hệ.",
            en: "This is <b>not</b> an optional client-requested check. ACI 318-14 <b>§6.2.6</b> states that the total moment including second-order effects in compression members, restraining beams and other members <b>shall not exceed 1.4 times</b> the first-order moment. It is the limit on the stability sensitivity of the whole system."
          },
          { type: "subhead", vi: "Cách làm", en: "Method" },
          {
            type: "list",
            items: [
              { vi: "<b>1.</b> Chạy phân tích (cả bộ <code>LC</code> và bộ <code>L-LC</code>).", en: "<b>1.</b> Run the analysis (both the <code>LC</code> and <code>L-LC</code> sets)." },
              { vi: "<b>2.</b> <code>Display &gt; Show Tables &gt; Analysis Results &gt; Element Forces – Frames</code>.", en: "<b>2.</b> <code>Display &gt; Show Tables &gt; Analysis Results &gt; Element Forces – Frames</code>." },
              { vi: "<b>3.</b> <code>Select Load Cases</code> → chọn lần lượt bộ bậc nhất và bộ bậc hai.", en: "<b>3.</b> <code>Select Load Cases</code> → take the first-order set, then the second-order set." },
              { vi: "<b>4.</b> <code>File &gt; Export Current Table &gt; To Excel</code>, lập tỷ số M3<sub>NL</sub>/M3<sub>L</sub> và M2<sub>NL</sub>/M2<sub>L</sub>.", en: "<b>4.</b> <code>File &gt; Export Current Table &gt; To Excel</code>, then form the ratios M3<sub>NL</sub>/M3<sub>L</sub> and M2<sub>NL</sub>/M2<sub>L</sub>." }
            ]
          },
          { type: "subhead", vi: "Đọc kết quả", en: "Reading the result" },
          {
            type: "list",
            items: [
              { vi: "Tỷ số &gt; 1.4 tại các cấu kiện có moment đáng kể → <b>hệ kết cấu quá mềm</b>. Phải tăng tiết diện, thêm vách hoặc thêm hệ giằng. Không có cách “chỉnh phần mềm” nào cứu được.", en: "A ratio &gt; 1.4 on members carrying appreciable moment → <b>the structural system is too flexible</b>. Increase sections, add walls or add bracing. No amount of “adjusting the software” will save it." },
              { vi: "Tỷ số &gt; 1.4 nhưng moment tuyệt đối gần bằng 0 (ví dụ 1×10⁻⁵ so với 1×10⁻⁶ kN·m) → nhiễu số học, bỏ qua được. Lọc trong Excel bằng ngưỡng moment tối thiểu.", en: "A ratio &gt; 1.4 where the absolute moment is near zero (say 1×10⁻⁵ against 1×10⁻⁶ kN·m) → numerical noise, safely ignored. Filter it out in Excel with a minimum-moment threshold." },
              { vi: "Nếu phân tích <b>phân kỳ</b> (không hội tụ): kiểm tra bất ổn định trong <code>Modal Analysis</code> (chu kỳ dài bất thường, dạng dao động cục bộ), kiểm tra cấu kiện chưa liên kết, và kiểm tra lại độ cứng hệ.", en: "If the analysis <b>diverges</b>: look for instability in <code>Modal Analysis</code> (an implausibly long period, a local mode shape), look for unconnected members, and re-examine the system stiffness." }
            ]
          }
        ]
      },
      {
        heading: { vi: "9. Bước 5 — Đọc kết quả và vòng lặp thiết kế hai lượt", en: "9. Step 5 — Reading results and the two-pass design loop" },
        body: [
          { type: "subhead", vi: "(a) Xem trực tiếp trên mô hình 3D", en: "(a) Reading straight off the 3D model" },
          { type: "code", vi: "Design &gt; Concrete Frame Design &gt; Display Design Info…", en: "Design &gt; Concrete Frame Design &gt; Display Design Info…" },
          {
            type: "table",
            head: [{ vi: "Hiển thị", en: "Display" }, { vi: "Ý nghĩa", en: "Meaning" }],
            rows: [
              [{ vi: "Longitudinal Reinforcing", en: "Longitudinal Reinforcing" }, { vi: "Dầm: A<sub>s</sub> trên/dưới cho ba đoạn 0–L/4, L/4–3L/4, 3L/4–L. Cột: A<sub>s</sub> cho cả cấu kiện", en: "Beams: top/bottom A<sub>s</sub> for the three zones 0–L/4, L/4–3L/4, 3L/4–L. Columns: A<sub>s</sub> for the whole member" }],
              [{ vi: "Rebar Percentage", en: "Rebar Percentage" }, { vi: "Hàm lượng thép dọc", en: "Longitudinal reinforcement ratio" }],
              [{ vi: "Shear Reinforcing", en: "Shear Reinforcing" }, { vi: "A<sub>v</sub>/s — diện tích đai trên đơn vị chiều dài", en: "A<sub>v</sub>/s — stirrup area per unit length" }]
            ]
          },
          {
            type: "list",
            items: [
              { vi: "<b>Đổi đơn vị hiển thị sang <code>Kgf, cm, C</code></b> để diện tích thép ra cm² — dễ đối chiếu với bản vẽ hơn nhiều so với m².", en: "<b>Switch the display units to <code>Kgf, cm, C</code></b> so steel areas come out in cm² — far easier to compare against drawings than m²." },
              { vi: "<b>Hàm lượng thép cột nên giữ dưới 2%</b>, dù ACI 318-14 §18.7.4.1 cho phép tới 6% (§10.6.1.1 cho phép tới 8% với cột thường).", en: "<b>Keep the column reinforcement ratio below 2%</b>, even though ACI 318-14 §18.7.4.1 allows up to 6% (§10.6.1.1 allows 8% for ordinary columns)." },
              { vi: "Lý do rất thực tế: còn dư chỗ để tăng thép khi tỷ số 6/5 không đạt, mà không phải đổi tiết diện cột.", en: "The reasons are practical: it leaves room to add steel when the 6/5 ratio fails, without changing the column section." },
              { vi: "Đổi tiết diện cột kéo theo đổi thép dầm, đổi bố trí ống HVAC/piping quanh cột — một thay đổi nhỏ lan ra toàn bộ dự án.", en: "Changing a column section drags beam reinforcement with it, and the HVAC/piping routing around the column — one small change ripples across the whole project." },
              { vi: "Trên 2.5–3% thì mật độ thép tại nút gây nhiều khó khăn cho thi công.", en: "Above 2.5–3%, bar congestion at the joints makes construction difficult." }
            ]
          },
          { type: "subhead", vi: "(b) Đọc báo cáo chi tiết (nháy đúp vào cấu kiện → Summary)", en: "(b) Reading the detailed report (double-click a member → Summary)" },
          {
            type: "list",
            items: [
              { vi: "<b>Dầm:</b> nhãn <code>Type: Sway Special</code>, kích thước, φ, moment thiết kế, A<sub>s</sub> yêu cầu và A<sub>s,min</sub>, A<sub>v</sub>/s, <b>V<sub>p</sub></b> (lực cắt từ M<sub>pr</sub> với f<sub>y</sub> nhân 1.25), phần xoắn.", en: "<b>Beams:</b> the <code>Type: Sway Special</code> label, dimensions, φ, design moments, required A<sub>s</sub> and A<sub>s,min</sub>, A<sub>v</sub>/s, <b>V<sub>p</sub></b> (shear from M<sub>pr</sub> with f<sub>y</sub> × 1.25), and the torsion terms." },
              { vi: "<b>Cột:</b> capacity ratio, Δ<sub>ns</sub>/Δ<sub>s</sub> (phải bằng 1.0 — kiểm tra lại ở đây!), K, L, cắt, <b>Joint Shear</b>, và <b>(6/5) Beam/Column Capacity Ratio</b> theo §18.7.3.2.", en: "<b>Columns:</b> capacity ratio, Δ<sub>ns</sub>/Δ<sub>s</sub> (must be 1.0 — verify it here!), K, L, shear, <b>joint shear</b>, and the <b>(6/5) beam/column capacity ratio</b> per §18.7.3.2." },
              { vi: "Nhãn <code>(Sp)</code> sau tên tổ hợp nghĩa là kết quả đã áp dụng hệ số đặc biệt của code, hoặc dựa trên khả năng chịu lực của cấu kiện lân cận — không phải nội lực phân tích thuần tuý.", en: "An <code>(Sp)</code> label after a combination name means the result already carries a code special factor, or derives from the capacity of adjacent members — it is not raw analysis force." }
            ]
          },
          { type: "subhead", vi: "(c) Vòng lặp hai lượt — bắt buộc với kết cấu kháng chấn", en: "(c) The two-pass loop — mandatory for seismic structures" },
          {
            vi: "Lượt 1 cho ra A<sub>s</sub> <b>yêu cầu</b>. Nhưng V<sub>e</sub> và tỷ số 6/5 phải tính từ A<sub>s</sub> <b>thực tế bố trí</b>, luôn lớn hơn yêu cầu. Nếu dừng ở lượt 1, M<sub>pr</sub> bị đánh giá thấp → lực cắt thiết kế thấp → <b>thiên về không an toàn, đúng ở đúng chỗ nguy hiểm nhất</b>.",
            en: "Pass 1 gives the <b>required</b> A<sub>s</sub>. But V<sub>e</sub> and the 6/5 ratio must be computed from the A<sub>s</sub> <b>actually detailed</b>, which is always larger. Stop at pass 1 and M<sub>pr</sub> is underestimated → the design shear is too low → <b>unsafe, and unsafe exactly where it matters most</b>."
          },
          {
            type: "list",
            items: [
              { vi: "<b>Dầm:</b> nhập A<sub>s</sub> thật vào <code>Reinforcement Overrides for Ductile Beams</code> (Top/Bottom × Left/Right).", en: "<b>Beams:</b> enter the real A<sub>s</sub> into <code>Reinforcement Overrides for Ductile Beams</code> (top/bottom × left/right)." },
              { vi: "<b>Cột:</b> nhập số thanh, đường kính, cự ly đai thật, rồi chuyển sang <code>Reinforcement to be Checked</code>.", en: "<b>Columns:</b> enter the real bar count, diameter and tie spacing, then switch to <code>Reinforcement to be Checked</code>." },
              { vi: "Chạy lại thiết kế. Bây giờ V<sub>p</sub>, joint shear và tỷ số 6/5 mới là con số dùng được.", en: "Re-run the design. Only now are V<sub>p</sub>, joint shear and the 6/5 ratio numbers you can use." }
            ]
          },
          { type: "subhead", vi: "(d) Khi Joint Shear hoặc 6/5 hiện “N/A”", en: "(d) When joint shear or 6/5 reads “N/A”" },
          { vi: "SAP2000 chỉ tính hai hạng mục này khi hội đủ <b>sáu</b> điều kiện:", en: "SAP2000 computes these two only when <b>six</b> conditions are met:" },
          {
            type: "list",
            items: [
              { vi: "Station có nút dầm-cột (đỉnh cột);", en: "the station sits at a beam-column joint (top of column);" },
              { vi: "Khung là ductile moment frame;", en: "the frame is a ductile moment frame;" },
              { vi: "Cột phía trên là cột bê tông (nếu tồn tại);", en: "the column above is concrete (where one exists);" },
              { vi: "<b>Mọi</b> dầm quy tụ vào nút đều là dầm bê tông;", en: "<b>every</b> beam framing into the joint is concrete;" },
              { vi: "Kết quả thiết kế cấu kiện liên kết đã có;", en: "design results already exist for the connecting members;" },
              { vi: "Tổ hợp có chứa tải trọng động đất.", en: "the combination contains seismic load." }
            ]
          },
          {
            vi: "Thiếu một điều kiện là N/A. Thường gặp nhất: dầm thép gác vào cột BTCT, hoặc quên gán <code>Quake</code> ở Bước 2-1.",
            en: "Miss one and you get N/A. The usual culprits: a steel beam framing into an RC column, or forgetting the <code>Quake</code> label in Step 2-1."
          }
        ]
      },
      {
        heading: { vi: "10. Bước 6 — Kiểm tra điều kiện sử dụng", en: "10. Step 6 — Serviceability checks" },
        body: [
          {
            type: "list",
            items: [
              { vi: "Dùng <b>tổ hợp tải trọng sử dụng theo spec dự án</b>, không dùng tổ hợp tính toán.", en: "Use the <b>service load combinations from the project spec</b>, not the factored ones." },
              { vi: "Đổi property modifier sang cột giá trị service ở bảng mục 4 (§6.6.3.2.2: nhân 1.4 nhưng không vượt I<sub>g</sub>).", en: "Switch the property modifiers to the service column of the table in section 4 (§6.6.3.2.2: ×1.4 but not exceeding I<sub>g</sub>)." },
              { vi: "Vì SAP2000 <b>không cho phép modifier thay đổi theo load case</b>, thực tế phải <b>tách thành hai file mô hình</b>: một file cường độ, một file sử dụng. Đặt tên rõ ràng và ghi vào bìa tính toán, nếu không người kiểm tra sau sẽ không hiểu vì sao hai file khác nhau.", en: "Because SAP2000 <b>cannot vary modifiers by load case</b>, in practice you must <b>split into two model files</b>: one for strength, one for service. Name them clearly and record it on the calculation cover sheet, or the next reviewer will not understand why two files differ." },
              { vi: "Dầm phải thoả chiều cao tối thiểu Bảng 9.3.1.1: đơn giản ℓ/16, một đầu liên tục ℓ/18.5, hai đầu liên tục ℓ/21, console ℓ/8. Thoả bảng này thì được miễn tính võng chi tiết (§24.2, R24.2).", en: "Beams must satisfy the minimum depths of Table 9.3.1.1: simply supported ℓ/16, one end continuous ℓ/18.5, both ends continuous ℓ/21, cantilever ℓ/8. Satisfy the table and detailed deflection calculation is waived (§24.2, R24.2)." }
            ]
          },
          {
            type: "tip",
            vi: "<b>Lưu ý độ cứng cho kiểm tra chuyển vị ngang:</b> hệ số 1.4 của §6.6.3.2.2 dành cho <b>chuyển vị tức thời ở mức tải trọng sử dụng</b> (chủ yếu là gió). Với kiểm tra drift động đất, ASCE 7 §12.7.3(a) yêu cầu <b>dùng độ cứng tiết diện đã nứt</b> — tức bộ modifier 0.70/0.35, không phải bộ 1.0/0.5. Dùng nhầm là báo cáo drift nhỏ hơn thực tế khoảng 40%.",
            en: "<b>A note on stiffness for drift checks:</b> the 1.4 factor of §6.6.3.2.2 is for <b>immediate deflection at service load</b> (mainly wind). For seismic drift, ASCE 7 §12.7.3(a) requires <b>cracked-section stiffness</b> — the 0.70/0.35 modifiers, not the 1.0/0.5 set. Use the wrong one and the reported drift is roughly 40% below reality."
          }
        ]
      },
      {
        heading: { vi: "11. Bước 7 — Những lưu ý còn lại", en: "11. Step 7 — Remaining notes" },
        body: [
          {
            vi: "<b>Chu kỳ dao động để tính hệ số động đất:</b> dùng chu kỳ tính từ <b>độ cứng đã giảm</b>. Kết cấu BTCT đã xuất hiện vùng nứt ngay khi tháo cốp pha (ASCE 7-10 §12.7.3 mục a, FEMA P-1051 §10.3.1). Nhớ vẫn phải khống chế bằng T ≤ C<sub>u</sub>T<sub>a</sub> theo ASCE 7.",
            en: "<b>The period used for seismic coefficients:</b> take it from the <b>reduced</b> stiffness. RC structures already carry cracked regions the moment the formwork comes off (ASCE 7-10 §12.7.3(a), FEMA P-1051 §10.3.1). And it must still be capped at T ≤ C<sub>u</sub>T<sub>a</sub> per ASCE 7."
          },
          {
            vi: "<b>Kiểm tra lại kiểu load pattern / load case:</b> Dead → <code>Dead</code>, Live → <code>Live</code>, Snow → <code>Snow</code>, động đất → <code>Quake</code>. Đây là dữ liệu SAP2000 dùng để dựng tổ hợp thiết kế cắt theo Chương 18. Sai kiểu ở một load pattern là sai toàn bộ nhánh kháng chấn — mà không có cảnh báo nào.",
            en: "<b>Re-check the load pattern / load case types:</b> dead → <code>Dead</code>, live → <code>Live</code>, snow → <code>Snow</code>, seismic → <code>Quake</code>. This is the data SAP2000 uses to build the Chapter 18 shear design combinations. One wrong type on one load pattern corrupts the entire seismic branch — with no warning at all."
          },
          {
            vi: "<b>Phổ phản ứng (Response Spectrum) không chạy được bên trong nonlinear static case.</b> Nếu dự án dùng RSA thay vì lực tĩnh tương đương, cách xử lý là: tạo một case <code>P-Delta</code> chỉ chứa tải trọng đứng, rồi khai case phổ phản ứng với <code>Stiffness at End of Nonlinear Case</code> cho case đó. Khi ấy P-Δ được xét ở mức độ cứng đã bị tải trọng đứng làm giảm.",
            en: "<b>A response spectrum cannot run inside a nonlinear static case.</b> If the project uses RSA rather than equivalent static forces: create a <code>P-Delta</code> case carrying gravity only, then define the response-spectrum case with <code>Stiffness at End of Nonlinear Case</code> pointing at it. P-Δ is then accounted for at the stiffness the gravity load has already softened."
          },
          {
            vi: "<b>Tải trọng dài hạn (creep):</b> §6.7.1.2 yêu cầu phân tích bậc hai phải xét cả <i>duration of loads</i>, <i>shrinkage and creep</i>. Với tổ hợp mà tải trọng đứng dài hạn chiếm ưu thế, độ cứng nên chia thêm cho (1 + β<sub>dns</sub>) theo tinh thần §6.6.4.4.4. Đây là điểm gần như không tài liệu hướng dẫn phần mềm nào nhắc tới, nhưng nó là điều khoản của code.",
            en: "<b>Sustained load (creep):</b> §6.7.1.2 requires the second-order analysis to account for <i>duration of loads</i>, <i>shrinkage and creep</i>. Where sustained gravity dominates a combination, the stiffness should be further divided by (1 + β<sub>dns</sub>) in the spirit of §6.6.4.4.4. Almost no software guide mentions this, but it is a code provision."
          },
          {
            vi: "<b>Thời gian chạy:</b> 120 tổ hợp phi tuyến là 120 lần giải hệ. Ba cách rút ngắn: <code>Results Saved = Final State Only</code>, giảm số output station cho cột, và loại bỏ các tổ hợp chắc chắn không khống chế trước khi convert.",
            en: "<b>Run time:</b> 120 nonlinear combinations means solving the system 120 times. Three ways to shorten it: <code>Results Saved = Final State Only</code>, fewer output stations on columns, and discarding combinations that certainly do not govern before converting."
          },
          {
            vi: "<b>Những gì SAP2000 KHÔNG làm cho bạn:</b> chiều dài neo và nối chồng, vị trí cắt thép, cấu tạo đai vùng dẻo (§18.6.4), cốt đai ngang trong nút (§18.8.4), cấu tạo chống xoắn, và kiểm tra thi công được. Kết quả SAP2000 là <b>diện tích thép yêu cầu</b>, không phải bản vẽ.",
            en: "<b>What SAP2000 does NOT do for you:</b> development and lap lengths, bar curtailment points, hoop detailing in plastic hinge zones (§18.6.4), transverse reinforcement within joints (§18.8.4), torsion detailing, and buildability. What SAP2000 gives you is a <b>required steel area</b>, not a drawing."
          }
        ]
      },
      {
        heading: { vi: "12. Cẩm nang cho kỹ sư kết cấu", en: "12. A field guide for the structural engineer" },
        body: [
          {
            type: "checklist",
            items: [
              { vi: "End offset <code>Automatic from Connectivity</code>, rigid factor = 0.5", en: "End offsets <code>Automatic from Connectivity</code>, rigid factor = 0.5" },
              { vi: "Design Type đúng: dầm = Beam, cột = Column; cover là <b>tới tâm thép</b>", en: "Correct design type: beams = Beam, columns = Column; cover is <b>to the bar centroid</b>" },
              { vi: "Modifier 0.70 / 0.35 / 0.70(T) — <b>chỉ khai một cấp</b>, Mass &amp; Weight = 1.0", en: "Modifiers 0.70 / 0.35 / 0.70(T) — <b>declared at one level only</b>, Mass &amp; Weight = 1.0" },
              { vi: "Modifier xoắn J đã cân nhắc (0.1–0.2 cho xoắn tương thích)", en: "Torsional modifier J considered (0.1–0.2 for compatibility torsion)" },
              { vi: "Đã <b>copy</b> bộ tổ hợp <code>L-</code> <b>trước khi</b> Convert to Nonlinear", en: "The <code>L-</code> combination set <b>copied before</b> Convert to Nonlinear" },
              { vi: "Nonlinear case: P-Delta, Zero Initial Conditions, hệ số tổ hợp đúng", en: "Nonlinear cases: P-Delta, zero initial conditions, correct combination factors" },
              { vi: "<code>Automatic Frame Mesh</code> ≥ 2 phân đoạn (không dùng Divide Frames)", en: "<code>Automatic Frame Mesh</code> ≥ 2 segments (not Divide Frames)" },
              { vi: "Output stations ≥ 9 cho dầm, có tại giao điểm &amp; tải tập trung", en: "Output stations ≥ 9 on beams, including at intersections &amp; point loads" },
              { vi: "Case động đất gán <code>Design Load Type = Quake</code>", en: "Seismic cases labelled <code>Design Load Type = Quake</code>" },
              { vi: "Cặp gravity case <code>Dead</code> / <code>Other</code> với hệ số +1 / −1 đã thêm vào tổ hợp động đất", en: "The <code>Dead</code> / <code>Other</code> gravity pair at +1 / −1 added to the seismic combinations" },
              { vi: "Design Combos = bộ bậc hai; <b>bỏ tích</b> Auto-Generate Code-Based Combos", en: "Design combos = the second-order set; auto-generate code-based combos <b>unticked</b>" },
              { vi: "Overwrites: Framing Type đúng, <b>D<sub>ns</sub> = D<sub>s</sub> = 1.0</b>", en: "Overwrites: correct framing type, <b>D<sub>ns</sub> = D<sub>s</sub> = 1.0</b>" },
              { vi: "M<sub>bậc 2</sub>/M<sub>bậc 1</sub> ≤ 1.4 (đã lọc nhiễu moment ≈ 0)", en: "M<sub>2nd</sub>/M<sub>1st</sub> ≤ 1.4 (noise at moment ≈ 0 filtered out)" },
              { vi: "Hàm lượng thép cột &lt; 2%", en: "Column reinforcement ratio &lt; 2%" },
              { vi: "Đã nhập thép <b>thực tế</b> và chạy lượt 2 để lấy V<sub>e</sub>, joint shear, tỷ số 6/5", en: "<b>Actual</b> reinforcement entered and pass 2 run to obtain V<sub>e</sub>, joint shear and the 6/5 ratio" },
              { vi: "Joint shear / 6/5 không còn “N/A” ở các nút cần kiểm tra", en: "No remaining “N/A” for joint shear / 6/5 at the joints that need checking" },
              { vi: "File kiểm tra sử dụng dùng modifier 1.0 / 0.5; drift động đất vẫn dùng 0.70 / 0.35", en: "The serviceability file uses modifiers 1.0 / 0.5; seismic drift still uses 0.70 / 0.35" },
              { vi: "Chu kỳ dùng cho hệ số động đất lấy từ mô hình độ cứng đã giảm", en: "The period used for seismic coefficients taken from the reduced-stiffness model" }
            ]
          }
        ]
      },
      {
        heading: { vi: "13. Ghi chú về phiên bản ACI 318", en: "13. A note on ACI 318 editions" },
        body: [
          {
            type: "list",
            items: [
              { vi: "<b>ACI 318-19</b> giữ nguyên Bảng 6.6.3.1.1(a) và toàn bộ logic Chương 6 nói trên, đồng thời bổ sung Bảng 6.6.3.1.1(b) cho phép tính I chi tiết hơn theo mức lực dọc và moment.", en: "<b>ACI 318-19</b> keeps Table 6.6.3.1.1(a) and the whole Chapter 6 logic above, and adds Table 6.6.3.1.1(b) allowing a more detailed I based on the level of axial force and moment." },
              { vi: "Khác biệt lớn nhất của 318-19 nằm ở <b>khả năng chịu cắt của bê tông V<sub>c</sub></b> (§22.5.5.1): xuất hiện hệ số hiệu ứng kích thước λ<sub>s</sub> và hàm lượng thép dọc ρ<sub>w</sub>. Kết quả A<sub>v</sub>/s cho dầm sẽ khác so với 318-14, đặc biệt với dầm chiều cao lớn và ρ<sub>w</sub> thấp.", en: "The largest difference in 318-19 is in the <b>concrete shear strength V<sub>c</sub></b> (§22.5.5.1): a size-effect factor λ<sub>s</sub> and the longitudinal ratio ρ<sub>w</sub> now appear. Beam A<sub>v</sub>/s results will differ from 318-14, particularly for deep beams with low ρ<sub>w</sub>." },
              { vi: "Nếu spec dự án viện dẫn 318-14, hãy giữ 318-14 trong Preferences. Đừng “nâng cấp” code trong phần mềm mà không có chấp thuận bằng văn bản — hai bộ kết quả sẽ không đối chiếu được với nhau ở giai đoạn kiểm tra.", en: "If the project spec cites 318-14, keep 318-14 in the preferences. Do not “upgrade” the code inside the software without written approval — the two sets of results will not reconcile at the review stage." }
            ]
          }
        ]
      }
    ],
    footnote: {
      vi: "Bài viết thuộc series “Hướng dẫn thiết kế kết cấu Công trình Công nghiệp” — Roberto Structural. Nội dung mang tính hướng dẫn kỹ thuật; kỹ sư chịu trách nhiệm kiểm tra và hiệu chỉnh theo điều kiện cụ thể của từng dự án và yêu cầu của tiêu chuẩn áp dụng.",
      en: "Part of the series “Structural design for industrial facilities” — Roberto Structural. The content is technical guidance; the engineer remains responsible for checking and adapting it to the conditions of each project and the requirements of the governing code."
    }
  },
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
      vi: "Quy trình 4 bước, 7 lưu ý và cẩm nang cho kỹ sư kết cấu. DAM không đơn thuần là một Method trong menu Design — nó là phương pháp thiết kế đặt trên ba điều kiện giữa phân tích và thiết kế.",
      en: "A four-step workflow, seven traps and a field guide for the structural engineer. DAM is not simply a method in the Design menu — it is a design method resting on three conditions linking analysis to design."
    },
    cover: "Resource/articles/02-dam-sap2000/cover.webp",
    sections: [
      {
        heading: { vi: "1. Tại sao phải là Direct Analysis Method (DAM)?", en: "1. Why the Direct Analysis Method (DAM)?" },
        body: [
          {
            vi: "Sức bền của một cột thép trong hệ kết cấu thép không chỉ phụ thuộc vào tiết diện của nó, mà còn phụ thuộc vào <b>độ mềm dẻo của toàn hệ</b>. AISC 360 yêu cầu bài toán ổn định phải xét đồng thời ba yếu tố:",
            en: "The strength of a steel column in a steel framing system does not depend on its section alone — it also depends on <b>the flexibility of the whole system</b>. AISC 360 requires stability to account for three factors at once:"
          },
          {
            type: "list",
            items: [
              { vi: "<b>Hiệu ứng bậc hai</b>: P-Δ (chuyển vị của nút) và P-δ (biến dạng uốn trong lòng cấu kiện);", en: "<b>Second-order effects</b>: P-Δ (joint displacement) and P-δ (flexural deformation within the member);" },
              { vi: "<b>Sai lệch hình học ban đầu</b>: cột nghiêng do dựng lắp (thường lấy 1/500).", en: "<b>Initial geometric imperfections</b>: erection out-of-plumb, normally taken as 1/500;" },
              { vi: "<b>Giảm độ cứng do chảy phân bố</b> (partial yielding, ứng suất dư).", en: "<b>Stiffness reduction from partial yielding</b> and residual stresses." }
            ]
          },
          {
            vi: "<b>Phương pháp Chiều dài hiệu dụng (Effective Length Method - ELM)</b> dồn cả ba yếu tố này vào một con số duy nhất — hệ số <b>Effective length factor K</b> — rồi yêu cầu kỹ sư đi tra biểu đồ alignment chart với nhiều giả thiết và các điều kiện biên. K cần thời gian để tính toán &amp; <b>thay đổi trong suốt quá trình thiết kế</b>. Khung có giằng lệch tâm, cột đỡ thiết bị, Pipe rack nhiều cao trình, Cột thép đặt trên trụ RC… đòi hỏi nhiều công sức tính toán và kiểm soát kết quả.",
            en: "The <b>Effective Length Method (ELM)</b> compresses all three into a single number — the <b>effective length factor K</b> — then asks the engineer to read an alignment chart built on numerous assumptions and boundary conditions. K takes time to compute and <b>keeps changing throughout the design</b>. Eccentrically braced frames, equipment support columns, multi-level pipe racks, steel columns on RC pedestals… all demand considerable effort to compute and to keep under control."
          },
          {
            vi: "<b>DAM đảo ngược logic đó</b>: mô hình gánh phần khó — bằng phân tích bậc hai, tải trọng danh nghĩa (notional load) và giảm độ cứng — cấu kiện được kiểm tra với <b>K = 1.0</b>, dùng chính chiều dài thật của nó. Với kết cấu thép, đây không chỉ là lựa chọn “hiện đại”, nó là lựa chọn <b>duy nhất bảo vệ được kỹ sư khi cần giải trình về K</b>.",
            en: "<b>DAM inverts that logic</b>: the model carries the hard part — through second-order analysis, notional loads and stiffness reduction — and members are checked with <b>K = 1.0</b>, using their actual length. For steel structures this is not merely the “modern” choice; it is <b>the only one that protects the engineer when K has to be justified</b>."
          },
          {
            type: "tip",
            vi: "<b>Điểm mấu chốt:</b> DAM không đơn thuần chỉ là một Method trong menu Design. Nó là một <b>Phương pháp Thiết kế ba điều kiện</b> giữa phần phân tích và phần thiết kế. Vi phạm một điều kiện — kết quả D/C ratio trở nên vô nghĩa.",
            en: "<b>The key point:</b> DAM is not simply a method in the Design menu. It is a <b>design method resting on three conditions</b> linking the analysis to the design. Break one condition and the D/C ratios become meaningless."
          },
          {
            type: "figure",
            src: { vi: "Resource/articles/02-dam-sap2000/fig-01-vi.svg", en: "Resource/articles/02-dam-sap2000/fig-01-en.svg" },
            caption: {
              vi: "<b>Hình 1.</b> Ba nguồn ảnh hưởng đến ổn định — Hai Phương pháp xử lý theo AISC 360.",
              en: "<b>Figure 1.</b> Three effects on stability — two methods of handling them under AISC 360."
            }
          },
          { type: "subhead", vi: "Ba điều kiện bắt buộc của DAM", en: "The three mandatory DAM conditions" },
          {
            type: "table",
            head: [
              { vi: "Điều khoản", en: "Clause" },
              { vi: "Yêu cầu", en: "Requirement" },
              { vi: "Công thức", en: "Formula" },
              { vi: "Nơi khai báo trong SAP2000", en: "Where to set it in SAP2000" }
            ],
            rows: [
              [{ vi: "C2.1", en: "C2.1" }, { vi: "Phân tích bậc hai (P-Δ <b>và</b> P-δ)", en: "Second-order analysis (P-Δ <b>and</b> P-δ)" }, { vi: "—", en: "—" }, { vi: "Nonlinear Static + P-Delta; divide frame", en: "Nonlinear Static + P-Delta; divide frame" }],
              [{ vi: "C2.2b", en: "C2.2b" }, { vi: "Notional load ở mỗi cao trình", en: "Notional load at each level" }, { vi: "<i>N<sub>i</sub></i> = 0.002·α·<i>Y<sub>i</sub></i>, α = 1.0 (LRFD) / 1.6 (ASD)", en: "<i>N<sub>i</sub></i> = 0.002·α·<i>Y<sub>i</sub></i>, α = 1.0 (LRFD) / 1.6 (ASD)" }, { vi: "Load Pattern type <b>NOTIONAL</b>", en: "Load Pattern type <b>NOTIONAL</b>" }],
              [{ vi: "C2.3", en: "C2.3" }, { vi: "Giảm độ cứng", en: "Stiffness reduction" }, { vi: "<i>EA*</i> = 0.8<i>EA</i>; <i>EI*</i> = 0.8·τ<sub>b</sub>·<i>EI</i>", en: "<i>EA*</i> = 0.8<i>EA</i>; <i>EI*</i> = 0.8·τ<sub>b</sub>·<i>EI</i>" }, { vi: "Frame Property Modifiers", en: "Frame Property Modifiers" }],
              [{ vi: "C3", en: "C3" }, { vi: "Kiểm tra cấu kiện với <b>K = 1.0</b>", en: "Check members with <b>K = 1.0</b>" }, { vi: "<i>L<sub>c</sub></i> = <i>L</i>", en: "<i>L<sub>c</sub></i> = <i>L</i>" }, { vi: "Steel Frame Design Overwrites", en: "Steel Frame Design Overwrites" }]
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
              vi: "<b>Hình 2.</b> Bản chất của notional load: Thay thế sự biến dạng hình học của Kết cấu bằng lực ngang tương đương.",
              en: "<b>Figure 2.</b> What a notional load really is: the structure's geometric deformation replaced by an equivalent lateral force."
            }
          },
          { type: "subhead", vi: "2.1 Trình tự khai báo", en: "2.1 The order of definition" },
          {
            vi: "<b>(a) Khai báo tổ hợp LRFD đầu tiên.</b> Notional load được yêu cầu trong các tổ hợp: mỗi tổ hợp có một tổ hợp tải đứng riêng, nên phải có danh sách combo hoàn chỉnh trước khi bắt đầu.",
            en: "<b>(a) Define the LRFD combinations first.</b> Notional loads are required within the combinations: each combination carries its own gravity mix, so the full combo list must exist before you start."
          },
          {
            vi: "<b>(b) Lọc ra toàn bộ Load Pattern là “tải trọng đứng”</b> — không chỉ Dead Load. Trong các kết cấu công nghiệp, danh sách này dài hơn ta tưởng: Tải trọng bản thân (BL), tĩnh tải hoàn thiện (DL), tải thiết bị empty (EE), tải vận hành (EOL), tải nước thử áp (ETL), Hoạt tải sàn (LL), Monorail (LLM)… <b>Bỏ sót một pattern nào là thiếu notional load của pattern đó.</b>",
            en: "<b>(b) List every load pattern that is a “gravity load”</b> — not just dead load. In industrial structures this list is longer than expected: self weight (BL), superimposed dead (DL), equipment empty (EE), operating (EOL), hydrotest water (ETL), floor live (LL), monorail (LLM)… <b>Miss one pattern and you are missing its notional load.</b>"
          },
          {
            vi: "<b>(c) Tạo cặp Load Pattern notional cho mỗi tải đứng</b> theo hai phương X, Y (quy ước đặt tên gọn: <code>xDL</code>/<code>yDL</code>, <code>xEE</code>/<code>yEE</code>…):",
            en: "<b>(c) Create a notional load pattern pair for every gravity load</b> in the X and Y directions (a compact naming convention: <code>xDL</code>/<code>yDL</code>, <code>xEE</code>/<code>yEE</code>…):"
          },
          {
            type: "code",
            vi: "Define &gt; Load Patterns\n  Load Pattern Name : xDL\n  Type              : NOTIONAL\n  Self Weight Mult. : 0\n  Auto Lateral Load : Auto\n  → Modify Lateral Load Pattern...\n       Base Load Pattern : DL\n       Load Ratio        : 2.000E-03\n       Direction         : Global X / Global Y",
            en: "Define &gt; Load Patterns\n  Load Pattern Name : xDL\n  Type              : NOTIONAL\n  Self Weight Mult. : 0\n  Auto Lateral Load : Auto\n  → Modify Lateral Load Pattern...\n       Base Load Pattern : DL\n       Load Ratio        : 2.000E-03\n       Direction         : Global X / Global Y"
          },
          {
            type: "tip",
            vi: "<b>Tip 1 — Nhập hàng loạt bằng Interactive Database:</b><br>Dùng <code>Edit &gt; Interactive Database Editing &gt; Load Pattern Definitions</code><br>Xuất ra Excel, điền cột <code>LoadPat / DesignType(NOTIONAL) / NotBasePat / NotRatio / NotDir</code>, rồi import lại.<br>Tương tự cho <code>Load Case Definitions</code>, <code>Load Assignments</code>, <code>Combination Definitions</code>.<br><b>Thao tác này có thể tiết kiệm 80% thời gian của cả quy trình DAM.</b>",
            en: "<b>Tip 1 — Bulk entry through the Interactive Database:</b><br>Use <code>Edit &gt; Interactive Database Editing &gt; Load Pattern Definitions</code><br>Export to Excel, fill the <code>LoadPat / DesignType(NOTIONAL) / NotBasePat / NotRatio / NotDir</code> columns, then import back.<br>Do the same for <code>Load Case Definitions</code>, <code>Load Assignments</code> and <code>Combination Definitions</code>.<br><b>This can save 80% of the time the whole DAM workflow costs.</b>"
          },
          { type: "subhead", vi: "2.2 Kỹ thuật “Repeated Set” — biến 40 pattern thành 8 load case", en: "2.2 The “repeated set” technique — 40 patterns down to 8 load cases" },
          {
            vi: "Nếu cộng notional pattern trực tiếp vào từng combo, ta phải nhập từng dòng hệ số cho mỗi pattern trong mỗi combo. Thay vào đó, <b>hãy nhìn vào cấu trúc ngoặc của tổ hợp</b>:",
            en: "Adding notional patterns straight into each combination means one factor line per pattern per combination. Instead, <b>look at the bracket structure of the combination</b>:"
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
              [{ vi: "D + Dsup + EE", en: "D + Dsup + EE" }, { vi: "<code>NOx</code>", en: "<code>NOx</code>" }, { vi: "xD + xDsup + xEE", en: "xD + xDsup + xEE" }],
              [{ vi: "D + Dsup + EE + EOL", en: "D + Dsup + EE + EOL" }, { vi: "<code>NOPx</code>", en: "<code>NOPx</code>" }, { vi: "xD + xDsup + xEE + xEOL", en: "xD + xDsup + xEE + xEOL" }],
              [{ vi: "L", en: "L" }, { vi: "<code>NLx</code>", en: "<code>NLx</code>" }, { vi: "xL", en: "xL" }],
              [{ vi: "L + Lmono", en: "L + Lmono" }, { vi: "<code>NLMx</code>", en: "<code>NLMx</code>" }, { vi: "xL + xLmono", en: "xL + xLmono" }],
              [{ vi: "L + 1.4·Lmono", en: "L + 1.4·Lmono" }, { vi: "<code>NLM2x</code>", en: "<code>NLM2x</code>" }, { vi: "xL + 1.4·xLmono", en: "xL + 1.4·xLmono" }]
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
          { type: "subhead", vi: "2.3 Chiều của Notional Load", en: "2.3 Direction of the notional load" },
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
              { vi: "Số combo phát sinh", en: "Derived combinations" }
            ],
            rows: [
              [{ vi: "<b>Chỉ có tải đứng</b>", en: "<b>Gravity only</b>" }, { vi: "Cả 4 chiều: +X, −X, +Y, −Y (chưa biết chiều bất lợi)", en: "All four: +X, −X, +Y, −Y (the governing direction is unknown)" }, { vi: "<b>× 4</b>", en: "<b>× 4</b>" }],
              [{ vi: "<b>Có tải ngang</b> (W, E)", en: "<b>With lateral load</b> (W, E)" }, { vi: "Cùng chiều hợp lực ngang của combo đó", en: "Along the resultant lateral force of that combination" }, { vi: "<b>× 1</b>", en: "<b>× 1</b>" }]
            ]
          },
          {
            vi: "Ví dụ với combo có gió <i>1.6·(W<sub>X</sub> + 0.5·W<sub>Y</sub>)</i>: notional cũng phải theo tỷ lệ đó → <i>+1.6·(N<sub>x</sub> + 0.5·N<sub>y</sub>)</i>. Với combo động đất <i>1.0·(V<sub>X</sub> − 0.3·V<sub>Y</sub>)</i> → <i>+1.0·(N<sub>x</sub> − 0.3·N<sub>y</sub>)</i>.",
            en: "For a wind combination <i>1.6·(W<sub>X</sub> + 0.5·W<sub>Y</sub>)</i> the notional loads follow the same ratio → <i>+1.6·(N<sub>x</sub> + 0.5·N<sub>y</sub>)</i>. For a seismic combination <i>1.0·(V<sub>X</sub> − 0.3·V<sub>Y</sub>)</i> → <i>+1.0·(N<sub>x</sub> − 0.3·N<sub>y</sub>)</i>."
          },
          {
            type: "tip",
            vi: "<b>Tip 2 — Giải pháp cho tổ hợp có tải ngang (§C2.2b(4)):</b><br>· Nếu tại <b>mọi tầng</b>, tỷ số Δ<sub>bậc 2</sub>/Δ<sub>bậc 1</sub> (tính với độ cứng đã giảm) <b>≤ 1.7</b>, thì notional load <b>chỉ cần đặt trong các tổ hợp thuần tải đứng</b>.<br>· Với kết cấu có hệ giằng cứng, điều kiện này gần như luôn thoả. Hãy kiểm tra tỷ số này ngay từ đầu: nó có thể xoá bỏ hàng trăm combo. Nếu tỷ số &gt; 1.7, không có lựa chọn — phải đặt notional cho mọi combo.",
            en: "<b>Tip 2 — The escape clause for lateral combinations (§C2.2b(4)):</b><br>· If at <b>every storey</b> the ratio Δ<sub>2nd</sub>/Δ<sub>1st</sub> (computed with reduced stiffness) is <b>≤ 1.7</b>, notional loads <b>need only be applied in gravity-only combinations</b>.<br>· For structures with stiff bracing this is almost always satisfied. Check this ratio at the very start: it can delete hundreds of combinations. If the ratio is &gt; 1.7 there is no choice — notional loads go into every combination."
          },
          {
            type: "tip",
            vi: "<b>Tip 3 — Kiểm tra ngay:</b> <code>Display &gt; Show Tables &gt; Base Reactions</code>.<br>· Với pattern <code>xDL</code>, phải có <b>ΣF<sub>X</sub>(xDL) = 0.002 × ΣF<sub>Z</sub>(DL)</b>.<br>· Nếu lệch, phần tải chưa được chuyển đổi (thường là self-weight hoặc tải trên phần tử area) phải được bù bằng một pattern notional khai báo tay.",
            en: "<b>Tip 3 — Verify immediately:</b> <code>Display &gt; Show Tables &gt; Base Reactions</code>.<br>· For pattern <code>xDL</code> you must get <b>ΣF<sub>X</sub>(xDL) = 0.002 × ΣF<sub>Z</sub>(DL)</b>.<br>· If it does not match, the load that was not converted — usually self weight or load on area elements — must be made up with a hand-defined notional pattern."
          }
        ]
      },
      {
        heading: { vi: "3. BƯỚC 2 — Thiết lập phân tích bậc hai", en: "3. STEP 2 — Setting up the second-order analysis" },
        body: [
          {
            vi: "<b>Nguyên tắc quan trọng: phân tích bậc hai KHÔNG cộng tác dụng được.</b> Không thể chạy P-Delta cho từng pattern rồi cộng tuyến tính trong combo. Mỗi tổ hợp thiết kế phải là <b>một Nonlinear Static case độc lập</b>, mang toàn bộ tải đã nhân hệ số.",
            en: "<b>The important rule: second-order analysis does NOT superpose.</b> You cannot run P-Delta on each pattern and add the results linearly in a combination. Every design combination must be <b>its own independent nonlinear static case</b>, carrying the full factored load."
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
            head: [{ vi: "Trường", en: "Field" }, { vi: "Giá trị đúng", en: "Correct value" }],
            rows: [
              [{ vi: "Load Case Type / Analysis Type", en: "Load Case Type / Analysis Type" }, { vi: "Static / <b>Nonlinear</b>", en: "Static / <b>Nonlinear</b>" }],
              [{ vi: "Geometric Nonlinearity", en: "Geometric Nonlinearity" }, { vi: "<b>P-Delta</b>", en: "<b>P-Delta</b>" }],
              [{ vi: "Initial Conditions", en: "Initial Conditions" }, { vi: "Zero Initial Conditions", en: "Zero Initial Conditions" }],
              [{ vi: "Loads Applied", en: "Loads Applied" }, { vi: "toàn bộ pattern <b>kèm hệ số của combo</b> (0.9, 1.2, 1.6…)", en: "every pattern <b>with the combination factors</b> (0.9, 1.2, 1.6…)" }],
              [{ vi: "Load Application", en: "Load Application" }, { vi: "Full Load", en: "Full Load" }],
              [{ vi: "Results Saved", en: "Results Saved" }, { vi: "Final State Only", en: "Final State Only" }]
            ]
          },
          { type: "subhead", vi: "3.2 Lưu ý Mass Source (Erection vs. Operation)", en: "3.2 A note on mass source (erection vs. operation)" },
          { vi: "Lỗi thường gặp trên model analysis:", en: "A common error on an analysis model:" },
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
            vi: "<b>Tip 4 — Nếu dự án dùng Response Spectrum (RSA) thay vì lực tĩnh tương đương:</b> không thể đưa RSA vào nonlinear static. Cách làm chuẩn:<br>(1) tạo một case nonlinear P-Delta chỉ với tải trọng trọng lực (<code>PD-GRAV</code>);<br>(2) khai báo case Modal và RSA với tuỳ chọn <i>“Stiffness at End of Nonlinear Case = PD-GRAV”</i>.<br>Khi đó dao động và phổ phản ứng được giải trên trạng thái đã có P-Delta. Phải quản lý hai dòng combo song song.",
            en: "<b>Tip 4 — If the project uses a response spectrum (RSA) instead of equivalent static forces:</b> RSA cannot be placed inside a nonlinear static case. The correct route:<br>(1) create one P-Delta nonlinear case carrying gravity only (<code>PD-GRAV</code>);<br>(2) define the modal and RSA cases with <i>“Stiffness at End of Nonlinear Case = PD-GRAV”</i>.<br>Modes and spectra are then solved on a state that already includes P-Delta. You will be running two parallel combination streams."
          },
          {
            type: "tip",
            vi: "<b>Tip 5 — Kiểm soát thời gian chạy:</b><br>120 combo → 120 case nonlinear, model analysis có thể chạy nhiều giờ.<br>Hãy sàng lọc combo bao trùm trước (bằng một lần chạy tuyến tính nhanh + envelope).<br>Chỉ chuyển sang nonlinear những combo thực sự chi phối, và luôn giữ <code>Results Saved = Final State Only</code>.",
            en: "<b>Tip 5 — Keeping run time under control:</b><br>120 combinations become 120 nonlinear cases and the analysis can run for hours.<br>Screen for the governing combinations first (one fast linear run plus an envelope).<br>Convert only those to nonlinear, and always keep <code>Results Saved = Final State Only</code>."
          }
        ]
      },
      {
        heading: { vi: "4. BƯỚC 3 — Giảm độ cứng và K = 1.0", en: "4. STEP 3 — Stiffness reduction and K = 1.0" },
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
            head: [{ vi: "Modifier", en: "Modifier" }, { vi: "Giá trị", en: "Value" }, { vi: "Ghi chú", en: "Note" }],
            rows: [
              [{ vi: "Cross-section (axial) Area", en: "Cross-section (axial) area" }, { vi: "<b>0.8</b>", en: "<b>0.8</b>" }, { vi: "Chủ yếu ảnh hưởng thanh giằng, thanh dàn", en: "Mainly affects braces and truss members" }],
              [{ vi: "Moment of Inertia about 2 &amp; 3 axis", en: "Moment of inertia about axes 2 &amp; 3" }, { vi: "<b>0.8 × τ<sub>b</sub></b>", en: "<b>0.8 × τ<sub>b</sub></b>" }, { vi: "τ<sub>b</sub> phụ thuộc <i>P<sub>u</sub></i> → cần lặp", en: "τ<sub>b</sub> depends on <i>P<sub>u</sub></i> → iteration required" }],
              [{ vi: "Torsional constant, Shear area", en: "Torsional constant, shear area" }, { vi: "1.0", en: "1.0" }, { vi: "AISC không yêu cầu giảm", en: "AISC requires no reduction" }]
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
              [{ vi: "Trụ / cột RC", en: "RC pedestal / column" }, { vi: "<b>0.70·<i>I<sub>g</sub></i></b>", en: "<b>0.70·<i>I<sub>g</sub></i></b>" }, { vi: "1.4 × 0.70 ≈ <b>1.0·<i>I<sub>g</sub></i></b>", en: "1.4 × 0.70 ≈ <b>1.0·<i>I<sub>g</sub></i></b>" }],
              [{ vi: "Dầm giằng RC", en: "RC tie beam" }, { vi: "<b>0.35·<i>I<sub>g</sub></i></b>", en: "<b>0.35·<i>I<sub>g</sub></i></b>" }, { vi: "1.4 × 0.35 ≈ <b>0.5·<i>I<sub>g</sub></i></b>", en: "1.4 × 0.35 ≈ <b>0.5·<i>I<sub>g</sub></i></b>" }],
              [{ vi: "Vách (nứt / không nứt)", en: "Wall (cracked / uncracked)" }, { vi: "0.35 / 0.70·<i>I<sub>g</sub></i>", en: "0.35 / 0.70·<i>I<sub>g</sub></i>" }, { vi: "tương tự", en: "as above" }],
              [{ vi: "Diện tích", en: "Area" }, { vi: "1.0·<i>A<sub>g</sub></i>", en: "1.0·<i>A<sub>g</sub></i>" }, { vi: "1.0·<i>A<sub>g</sub></i>", en: "1.0·<i>A<sub>g</sub></i>" }]
            ]
          },
          {
            vi: "Khai báo tại: <code>Define &gt; Section Properties &gt; Frame Sections &gt; Modify/Show Property &gt; Set Modifiers</code>",
            en: "Set them at: <code>Define &gt; Section Properties &gt; Frame Sections &gt; Modify/Show Property &gt; Set Modifiers</code>"
          },
          {
            type: "tip",
            vi: "<b>Quan điểm cần nói rõ:</b> 0.70 là mức đã “lớn hơn” mức 0.8 của AISC. Điều khoản C2.3(4) yêu cầu <i>áp dụng mức giảm lớn hơn</i> nên sử dụng giá trị 0.70 thay vì 0.8 × 0.70 = 0.56.",
            en: "<b>A point worth stating plainly:</b> 0.70 is already the “larger” reduction compared with AISC's 0.8. Clause C2.3(4) asks you to <i>apply the larger reduction</i>, so use 0.70 rather than 0.8 × 0.70 = 0.56."
          },
          {
            type: "figure",
            src: { vi: "Resource/articles/02-dam-sap2000/fig-06-vi.svg", en: "Resource/articles/02-dam-sap2000/fig-06-en.svg" },
            caption: {
              vi: "<b>Hình 4.</b> Bảng tra nhanh modifier độ cứng: thép theo AISC 360-10 §C2.3, RC theo ACI 318.",
              en: "<b>Figure 4.</b> Quick lookup for stiffness modifiers: steel per AISC 360-10 §C2.3, RC per ACI 318."
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
            vi: "<b>Tip 6 — Cách “một lần chạy” hợp lý, nên dùng cho dự án lớn:</b><br>· AISC 360-10 §C2.3(3) cho phép lấy <b>τ<sub>b</sub> = 1.0 cho mọi cấu kiện</b>, với điều kiện <b>bổ sung notional load 0.001·Y<sub>i</sub></b> vào mọi tổ hợp (tức tổng notional = <b>0.003·Y<sub>i</sub></b>).<br>· Triển khai trong SAP2000: đặt <code>Load Ratio = 3.000E-03</code> ở bước 1, <code>Stiffness Reduction Method = Tau-b Fixed</code> (τ<sub>b</sub>=1.0), và <b>EA = EI = 0.8 cố định cho mọi cấu kiện thép</b>. Vòng lặp biến mất; số lần chạy giảm một nửa; hồ sơ tính đơn giản hơn nhiều.<br>· Đây là lựa chọn khuyến nghị cho hầu hết kết cấu Công trình công nghiệp — chi phí thép tăng không đáng kể so với thời gian và rủi ro sai sót tiết kiệm được.",
            en: "<b>Tip 6 — The sensible “single run”, recommended for large projects:</b><br>· AISC 360-10 §C2.3(3) permits <b>τ<sub>b</sub> = 1.0 for every member</b>, provided <b>an additional notional load of 0.001·Y<sub>i</sub></b> is applied in all combinations (total notional = <b>0.003·Y<sub>i</sub></b>).<br>· In SAP2000: set <code>Load Ratio = 3.000E-03</code> in step 1, <code>Stiffness Reduction Method = Tau-b Fixed</code> (τ<sub>b</sub>=1.0), and <b>EA = EI = 0.8 fixed for all steel members</b>. The iteration disappears, the number of runs halves, and the calculation record is far simpler.<br>· This is the recommended route for most industrial structures — the extra steel tonnage is negligible against the time and the risk of error it removes."
          },
          {
            type: "figure",
            src: { vi: "Resource/articles/02-dam-sap2000/fig-04-vi.svg", en: "Resource/articles/02-dam-sap2000/fig-04-en.svg" },
            caption: {
              vi: "<b>Hình 5.</b> Toàn bộ quy trình 4 bước.",
              en: "<b>Figure 5.</b> The whole four-step workflow."
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
              vi: "<b>Hình 6.</b> P-Δ nắm được bằng chuyển vị nút; P-δ chỉ xuất hiện khi cấu kiện được divided.",
              en: "<b>Figure 6.</b> P-Δ is captured by joint displacement; P-δ only appears once the member is subdivided."
            }
          },
          {
            vi: "<b>Dùng Automatic Frame Mesh là đủ:</b> Auto mesh chỉ chia phần tử <i>bên trong</i> khi phân tích; đối tượng thiết kế, chiều dài không giằng và tiết diện thiết kế vẫn giữ nguyên nguyên trạng.",
            en: "<b>Automatic Frame Mesh is enough:</b> auto mesh subdivides the element <i>internally</i> for analysis only; the design object, its unbraced lengths and its design section stay intact."
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
            vi: "<b>(4) Chu kỳ dao động phải lấy từ độ cứng danh nghĩa.</b> AISC Design Guide 28 §5.1: lực động đất và chu kỳ <i>T</i> tính với tiết diện <b>không giảm độ cứng</b>. Nếu dùng modifier 0.8 để tính T, chu kỳ dài ra giả tạo → lực động đất bị đánh giá thấp. Thực hành: giữ một model/lượt chạy riêng (hoặc bộ modifier riêng) không có giảm độ cứng để trích xuất <i>T</i> và lực địa chấn, sau đó mới áp modifier cho phân tích cường độ.",
            en: "<b>(4) Vibration periods must come from nominal stiffness.</b> AISC Design Guide 28 §5.1: seismic forces and the period <i>T</i> are computed on <b>unreduced</b> sections. Using the 0.8 modifier to find T lengthens the period artificially → seismic forces are underestimated. In practice: keep a separate model or run (or a separate modifier set) with no reduction to extract <i>T</i> and the seismic forces, and only then apply the modifiers for the strength analysis."
          },
          {
            vi: "<b>(5) Độ võng phục vụ ≠ độ cứng suy giảm.</b> Kiểm tra võng dầm, chuyển vị ngang phục vụ, tính toán độ vồng → dùng độ cứng danh nghĩa (với RC: 1.4·<i>I</i>, ≤ <i>I<sub>g</sub></i>).",
            en: "<b>(5) Serviceability deflection ≠ reduced stiffness.</b> Beam deflection checks, service lateral drift and camber calculations all use nominal stiffness (for RC: 1.4·<i>I</i>, ≤ <i>I<sub>g</sub></i>)."
          },
          {
            vi: "<b>(6) Nonlinear case không hội tụ.</b> Đừng vội tăng số bước hay nới dung sai. Divergence trong P-Delta hầu như luôn là <b>vấn đề thường trực</b>. Kiểm tra:<br>(a) hệ có mất ổn định thật không — chạy Modal, tìm mode có chu kỳ bất thường lớn hoặc dạng dao động cục bộ vô lý, tìm cấu kiện thiếu liên kết/release sai;<br>(b) hệ có quá “mềm” không — nếu Δ<sub>bậc 2</sub>/Δ<sub>bậc 1</sub> &gt; 1.7 thì bản thân sơ đồ kết cấu cần thêm giằng, chứ không phải cần thêm iteration.",
            en: "<b>(6) A nonlinear case will not converge.</b> Do not reach for more steps or a looser tolerance. Divergence in P-Delta is almost always <b>a recurring underlying problem</b>. Check:<br>(a) is the system genuinely unstable — run Modal, look for a mode with an implausibly long period or a nonsensical local shape, and find the member with a missing connection or a wrong release;<br>(b) is the system too “flexible” — if Δ<sub>2nd</sub>/Δ<sub>1st</sub> &gt; 1.7, the structural scheme itself needs more bracing, not more iterations."
          },
          {
            vi: "<b>(7) Design combo không tự cập nhật.</b> Sau <code>Convert Combos to Nonlinear Cases</code>, hãy vào <code>Design &gt; Steel Frame Design &gt; Select Design Combos</code> để chắc chắn chương trình đang kiểm tra các combo đã chuyển đổi, không phải một bộ combo mặc định do chương trình tự tạo ra.",
            en: "<b>(7) Design combinations do not update themselves.</b> After <code>Convert Combos to Nonlinear Cases</code>, open <code>Design &gt; Steel Frame Design &gt; Select Design Combos</code> and confirm the program is checking the converted combinations, not a default set it generated on its own."
          }
        ]
      },
      {
        heading: { vi: "7. Cẩm nang cho kỹ sư kết cấu", en: "7. A field guide for the structural engineer" },
        body: [
          {
            vi: "Cách làm nhanh và hợp lý: chọn một member control, <code>Design &gt; Steel Frame Design &gt; Display Design Info</code> → <b>Steel Stress Check Data</b>. Đối chiếu:",
            en: "The fast, sensible check: pick one governing member, <code>Design &gt; Steel Frame Design &gt; Display Design Info</code> → <b>Steel Stress Check Data</b>. Then compare:"
          },
          {
            type: "table",
            head: [{ vi: "Dòng trong output", en: "Line in the output" }, { vi: "Giá trị cần xuất hiện", en: "Value that must appear" }],
            rows: [
              [{ vi: "Design code", en: "Design code" }, { vi: "<code>AISC 360-10</code>", en: "<code>AISC 360-10</code>" }],
              [{ vi: "Provision", en: "Provision" }, { vi: "<code>LRFD</code>", en: "<code>LRFD</code>" }],
              [{ vi: "Analysis", en: "Analysis" }, { vi: "<b><code>Direct Analysis</code></b>", en: "<b><code>Direct Analysis</code></b>" }],
              [{ vi: "2nd Order", en: "2nd Order" }, { vi: "<b><code>General 2nd Order</code></b>", en: "<b><code>General 2nd Order</code></b>" }],
              [{ vi: "Reduction", en: "Reduction" }, { vi: "<code>Tau-b Variable</code> (hoặc <code>Tau-b Fixed</code>)", en: "<code>Tau-b Variable</code> (or <code>Tau-b Fixed</code>)" }],
              [{ vi: "<code>Tau_b</code>", en: "<code>Tau_b</code>" }, { vi: "1.0 nếu α<i>P<sub>r</sub></i>/<i>P<sub>y</sub></i> ≤ 0.5", en: "1.0 if α<i>P<sub>r</sub></i>/<i>P<sub>y</sub></i> ≤ 0.5" }],
              [{ vi: "<code>EA factor</code> / <code>EI factor</code>", en: "<code>EA factor</code> / <code>EI factor</code>" }, { vi: "<b>0.800 / 0.800·τ<sub>b</sub></b>", en: "<b>0.800 / 0.800·τ<sub>b</sub></b>" }],
              [{ vi: "<code>K1</code>, <code>K2</code> (Major &amp; Minor)", en: "<code>K1</code>, <code>K2</code> (major &amp; minor)" }, { vi: "<b>1.000</b>", en: "<b>1.000</b>" }],
              [{ vi: "<code>Kltb</code>", en: "<code>Kltb</code>" }, { vi: "<b>1.000</b>", en: "<b>1.000</b>" }],
              [{ vi: "<code>Length</code>, <code>Lltb</code>", en: "<code>Length</code>, <code>Lltb</code>" }, { vi: "đúng chiều dài không giằng thực tế", en: "the real unbraced length" }]
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
            vi: "DAM chuyển gánh nặng từ <b>tính toán hệ số K</b> sang <b>tính trung thực của mô hình</b>. Đó là một concept có lợi: K cần thời gian để tính toán &amp; <b>thay đổi trong suốt quá trình thiết kế</b>, còn mô hình thì kiểm chứng được từng dòng — bằng phản lực gối tựa, bằng tỷ số chuyển vị, bằng output Steel Stress Check Data.",
            en: "DAM shifts the burden from <b>computing the K factor</b> to <b>the honesty of the model</b>. That is a favourable trade: K takes time to compute and <b>keeps changing throughout the design</b>, whereas a model can be checked line by line — through base reactions, through displacement ratios, through the Steel Stress Check Data output."
          },
          {
            vi: "Ba key point cần nhớ:<br><b>(1)</b> notional load phải phủ <b>đủ</b> mọi tải đứng và <b>đúng chiều</b> bất lợi;<br><b>(2)</b> mỗi tổ hợp là <b>một</b> case nonlinear P-Delta riêng, và cấu kiện phải <b>có nút giữa nhịp</b>;<br><b>(3)</b> K = 1.0 chỉ có ý nghĩa khi phân tích đã chạy với giảm độ cứng — hãy chứng minh điều đó bằng dòng <code>EA factor = 0.800</code> trong output.",
            en: "Three points to carry away:<br><b>(1)</b> notional loads must cover <b>every</b> gravity load and act in the <b>governing direction</b>;<br><b>(2)</b> each combination is <b>its own</b> P-Delta nonlinear case, and members must <b>have intermediate nodes</b>;<br><b>(3)</b> K = 1.0 only means something once the analysis has run on reduced stiffness — prove it with the <code>EA factor = 0.800</code> line in the output."
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
      vi: "Bài viết thuộc series “Hướng dẫn thiết kế kết cấu Công trình Công nghiệp” — Roberto Structural. Nội dung mang tính hướng dẫn kỹ thuật; kỹ sư chịu trách nhiệm kiểm tra và hiệu chỉnh theo điều kiện cụ thể của từng dự án và yêu cầu của tiêu chuẩn áp dụng.",
      en: "Part of the series “Structural design for industrial facilities” — Roberto Structural. The content is technical guidance; the engineer remains responsible for checking and adapting it to the conditions of each project and the requirements of the governing code."
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
            vi: "Sàn deck dùng tấm tôn định hình làm coffa, bê tông đổ lên trên. Có hai loại khác nhau về bản chất:",
            en: "A deck slab uses profiled steel sheeting as permanent formwork with concrete cast on top. Two families differ fundamentally:"
          },
          {
            type: "list",
            items: [
              { vi: "<b>Composite deck:</b> tôn có gân dập (embossment), khóa cơ học với bê tông, tôn <i>chính là</i> cốt chịu kéo.", en: "<b>Composite deck:</b> embossed sheeting mechanically interlocked with the concrete — the sheeting <i>is</i> the tensile reinforcement." },
              { vi: "<b>Form deck:</b> tôn chỉ làm coffa, cốt thép tính toàn/bố trí riêng.", en: "<b>Form deck:</b> sheeting acts as formwork only; reinforcement is placed separately." }
            ]
          },
          {
            vi: "Ưu điểm khi dùng cho công trình sử dụng kết cấu thép:",
            en: "Advantages on steel-framed buildings:"
          },
          {
            type: "list",
            items: [
              { vi: "Giảm tối đa giàn giáo chống đỡ; tấm tôn trở thành mặt bằng thi công an toàn.", en: "Shoring eliminated or minimised; the sheeting becomes a safe working platform immediately after installation." },
              { vi: "Tốc độ thi công nhanh, đồng bộ với tiến độ lắp dựng kết cấu thép; sóng tôn rỗng làm giảm tải trọng bản thân so với sàn đặc cùng nhịp, và là không gian sẵn có để luồn ống, cáp điện.", en: "Erection speed matches the steel programme; hollow ribs reduce self-weight against a solid slab of equal span and provide ready-made routing for conduits and cables." }
            ]
          }
        ],
        figures: [
          {
            src: "Resource/articles/01-deck-slab/fig1.webp",
            caption: { vi: "Cấu tạo sàn deck: tôn định hình, chốt chịu cắt, lưới thép và dầm thép.", en: "Deck slab anatomy: profiled sheeting, shear studs, wire mesh and supporting steel beam." }
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
            vi: "Riêng với Shell và Plate, phần mềm phân tích còn phân biệt theo cách ứng xử biến dạng cắt ngang:",
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
              { vi: "<b>Semi-rigid</b> thì ngược lại, toàn bộ ứng xử dựa vào độ cứng membrane thực của tấm (f11, f22, f12). Semi-rigid chỉ có tác dụng khi Section Type = Shell hoặc Membrane với Stiffness Modifiers &gt; 0.", en: "<b>Semi-rigid</b> is the opposite, behaviour relies entirely on the shell's real membrane stiffness (f11, f22, f12). It takes effect only where Section Type = Shell or Membrane with Stiffness Modifiers &gt; 0." }
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
            caption: { vi: "Mô hình phần tử hữu hạn sàn deck liên hợp — tôn, bê tông và chốt chịu cắt.", en: "Finite-element model of composite deck — sheeting, concrete and shear studs." }
          }
        ]
      },
      {
        heading: { vi: "3. Hai kiểu liên kết thiết bị", en: "3. Two ways to support equipment" },
        body: [
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
                { vi: "", en: "" }
              ],
              [
                { vi: "Giá đỡ ống", en: "Pipe support" },
                { vi: "✓ với support nhỏ<br>✗ với support lớn", en: "✓ small supports<br>✗ large supports" },
                { vi: "–", en: "–" },
                { vi: "", en: "" }
              ]
            ]
          },
          {
            vi: "<i>Bơm & máy nén</i> thoạt nhìn có vẻ ngược với nguyên tắc “tải nặng thì đi thẳng vào dầm”. Lý do không nằm ở độ lớn tải mà ở <b>rung động</b>: bệ bê tông cung cấp khối lượng và cản để hấp thụ dao động từ máy quay, trong khi nối cứng trực tiếp vào dầm thép sẽ truyền rung vào hệ kết cấu.",
            en: "The <i>pump &amp; compressor</i> appears to contradict the “heavy loads go straight to the beam” principle. The reason is not load magnitude but <b>vibration</b>: a concrete pedestal provides mass and damping to absorb rotating-machine excitation, whereas a direct rigid connection would feed that vibration into the steel frame."
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
            caption: { vi: "Giai đoạn thi công: giằng ngang tạm, hệ chống đỡ và mép đổ bê tông.", en: "Construction stage: temporary horizontal bracing, propping system and concrete pouring edge." }
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
