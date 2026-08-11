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
  /* ============================== No. 08 ==============================
     Pipe Rack gồm 2 phần. Part 2 đặt TRƯỚC Part 1 trong mảng là CỐ Ý:
     articles.js lấy prev = ARTICLES[idx+1] (bài cũ hơn) và next = ARTICLES[idx-1]
     (bài mới hơn). Xếp thế này thì đứng ở Part 1 thấy “Bài sau → Part 2”, đứng ở
     Part 2 thấy “← Bài trước: Part 1”. Đảo lại thì cả hai chiều đều sai.
     ==================================================================== */
  {
    id: "pipe-rack-design-part-2",
    no: "08",
    category: { vi: "Kết cấu thép", en: "Steel Structures" },
    date: "2026-08-11",
    readmin: 12,
    title: {
      vi: "Pipe Rack — Sổ tay thiết kế (Phần 2): Chi tiết liên kết & Checklist",
      en: "Pipe Rack Design Guide (Part 2): Connection Detail & Checklist"
    },
    excerpt: {
      vi: "Từ thiết kế cấu kiện đến chi tiết thi công: liên kết end-plate, base plate và bu-lông neo, giằng, chi tiết cấu tạo, và checklist 6 giai đoạn dùng được ngay tại bàn làm việc.",
      en: "From member design to construction details: end-plate connections, base plates and anchor bolts, bracing, practical detailing, and a six-phase checklist you can use at your desk."
    },
    cover: "Resource/articles/06-pipe-rack/cover_2.webp",
    sections: [
      {
        heading: { vi: "8. Liên kết dầm–cột", en: "8. Beam-to-column connections" },
        body: [
          { type: "subhead", vi: "8.1. Triết lý liên kết cho Pipe Rack", en: "8.1. Connection philosophy for pipe racks" },
          {
            type: "list",
            items: [
              { vi: "<b>Liên kết bu-lông ưu tiên</b> — giảm thiểu hàn công trường để đảm bảo tốc độ và chất lượng.", en: "<b>Bolted connections preferred</b> — minimise field welding for speed and quality." },
              { vi: "Phương ngang: <b>liên kết moment</b> (khung cứng).", en: "Transverse direction: <b>moment connections</b> (rigid frames)." },
              { vi: "Phương dọc: <b>liên kết cắt</b> (dầm đóng vai trò strut hoặc được giằng).", en: "Longitudinal direction: <b>shear connections</b> (beams act as struts or are braced)." },
              { vi: "Mọi liên kết phải truyền: cắt + moment (nếu cứng) + dọc trục (nếu là strut).", en: "All connections must transfer: shear + moment (if rigid) + axial (if strut)." }
            ]
          },
          { type: "subhead", vi: "8.2. Liên kết End-Plate Moment (phổ biến nhất)", en: "8.2. End-plate moment connection (most common)" },
          {
            type: "figure",
            src: "Resource/articles/06-pipe-rack/04_endplate_connection.webp",
            caption: { vi: "<b>Hình 4.</b> Liên kết End-Plate Moment bu-lông.", en: "<b>Figure 4.</b> Bolted end-plate moment connection." }
          },
          {
            type: "list",
            items: [
              { vi: "<b>Loại:</b> Flush hoặc Extended End-Plate.", en: "<b>Type:</b> flush or extended end-plate." },
              { vi: "<b>Tham chiếu:</b> AISC Design Guide 4 / 39.", en: "<b>Reference:</b> AISC Design Guide 4 / 39." }
            ]
          },
          { vi: "<b>Các bước thiết kế:</b>", en: "<b>Design steps:</b>" },
          {
            type: "list",
            items: [
              { vi: "<b>1.</b> Xác định moment (M<sub>u</sub>) và cắt (V<sub>u</sub>) tại liên kết.", en: "<b>1.</b> Determine required moment (M<sub>u</sub>) and shear (V<sub>u</sub>) at the connection." },
              { vi: "<b>2.</b> Chọn cấu hình bu-lông (4-bolt, 8-bolt).", en: "<b>2.</b> Select bolt configuration (4-bolt, 8-bolt)." },
              { vi: "<b>3.</b> Tính chiều dày end-plate (phương pháp yield-line).", en: "<b>3.</b> Calculate end-plate thickness (yield-line method)." },
              { vi: "<b>4.</b> Kiểm tra kéo bu-lông (bao gồm prying action).", en: "<b>4.</b> Check bolt tension (including prying action)." },
              { vi: "<b>5.</b> Kiểm tra uốn cánh cột / chảy bụng cột / crippling bụng cột.", en: "<b>5.</b> Check column flange bending / web yielding / web crippling." },
              { vi: "<b>6.</b> Thêm sườn gia cường nếu cột không đủ.", en: "<b>6.</b> Add stiffeners if the column is inadequate." }
            ]
          },
          { type: "subhead", vi: "Các kiểm tra chính", en: "Key design checks" },
          {
            type: "table",
            head: [{ vi: "Kiểm tra", en: "Check" }, { vi: "Nội dung", en: "What to verify" }],
            rows: [
              [{ vi: "Kéo bu-lông", en: "Bolt tension" }, { vi: "T<sub>b</sub> ≥ T<sub>u</sub> (bao gồm prying)", en: "T<sub>b</sub> ≥ T<sub>u</sub> (including prying)" }],
              [{ vi: "Uốn end-plate", en: "End-plate bending" }, { vi: "t<sub>p</sub> ≥ yêu cầu (yield-line)", en: "t<sub>p</sub> ≥ required (yield-line)" }],
              [{ vi: "Uốn cánh cột", en: "Column flange bending" }, { vi: "t<sub>f</sub> ≥ yêu cầu, hoặc thêm sườn", en: "t<sub>f</sub> ≥ required, or add stiffeners" }],
              [{ vi: "Chảy bụng cột", en: "Column web yielding" }, { vi: "R<sub>n</sub> ≥ lực cánh dầm", en: "R<sub>n</sub> ≥ beam flange force" }],
              [{ vi: "Crippling bụng cột", en: "Column web crippling" }, { vi: "R<sub>n</sub> ≥ lực cánh dầm", en: "R<sub>n</sub> ≥ beam flange force" }],
              [{ vi: "Cắt panel zone cột", en: "Column web panel zone shear" }, { vi: "R<sub>v</sub> ≥ yêu cầu", en: "R<sub>v</sub> ≥ required" }],
              [{ vi: "Cắt nhóm bu-lông", en: "Shear at bolt group" }, { vi: "R<sub>n</sub> ≥ V<sub>u</sub>", en: "R<sub>n</sub> ≥ V<sub>u</sub>" }]
            ]
          },
          { type: "subhead", vi: "8.3. Liên kết cắt (Simple Connection)", en: "8.3. Shear connection (simple connection)" },
          {
            type: "list",
            items: [
              { vi: "Dùng cho: dầm không truyền moment, strut, khung phụ.", en: "Used for: non-moment beams, struts, secondary framing." },
              { vi: "Loại: <b>thép góc đơn/đôi</b>, <b>shear tab</b>, <b>end-plate cắt</b>.", en: "Types: <b>single/double angle</b>, <b>shear tab (single plate)</b>, <b>end-plate shear</b>." },
              { vi: "Tham chiếu: AISC Manual Part 10.", en: "Reference: AISC Manual Part 10." },
              { vi: "Kiểm tra: cắt bu-lông, ép mặt, tiết diện thực, block shear.", en: "Design checks: bolt shear, bearing, net section, block shear." }
            ]
          },
          {
            type: "tip",
            vi: "<b>Mẹo:</b> Strut chịu cả cắt và lực dọc đáng kể (ma sát/gió), liên kết cắt đơn giản có thể không đủ. Dùng <b>liên kết moment</b> hoặc <b>liên kết có bản mã</b> truyền được lực dọc.",
            en: "<b>Tip:</b> For struts that carry both shear and significant axial force (friction/wind), a shear connection may not be sufficient. Use a <b>moment connection</b> or a <b>gusseted connection</b> that can transfer axial force."
          }
        ]
      },
      {
        heading: { vi: "9. Base Plate & bu-lông neo", en: "9. Base plate & anchor bolt design" },
        body: [
          { type: "subhead", vi: "9.1. Thiết kế Base Plate theo AISC Design Guide 1", en: "9.1. Base plate design per AISC Design Guide 1" },
          {
            type: "figure",
            src: "Resource/articles/06-pipe-rack/05_base_plate_types.webp",
            caption: { vi: "<b>Hình 5.</b> Base Plate: chân khớp và chân ngàm.", en: "<b>Figure 5.</b> Base plate: pinned vs fixed configurations." }
          },
          {
            type: "table",
            head: [{ vi: "Loại", en: "Type" }, { vi: "Truyền moment", en: "Moment transfer" }, { vi: "Khi nào dùng", en: "When to use" }],
            rows: [
              [{ vi: "<b>Chân khớp (Pinned)</b>", en: "<b>Pinned base</b>" }, { vi: "Không truyền moment (chỉ cắt + nén)", en: "No moment (shear + axial only)" }, { vi: "Khi đầu cột có liên kết moment với dầm", en: "Top of column has a moment connection to the beam" }],
              [{ vi: "<b>Chân ngàm (Fixed)</b>", en: "<b>Fixed base</b>" }, { vi: "Truyền moment xuống móng", en: "Transfers moment to the foundation" }, { vi: "Cột console, rack cao, tải ngang lớn", en: "Cantilever columns, tall racks, large lateral loads" }]
            ]
          },
          { type: "subhead", vi: "9.2. Thiết kế chân ngàm — các bước", en: "9.2. Fixed base design steps" },
          {
            type: "list",
            items: [
              { vi: "<b>1. Xác định tải:</b> P<sub>u</sub> (dọc trục), M<sub>u</sub> (moment), V<sub>u</sub> (cắt).", en: "<b>1. Determine loads:</b> P<sub>u</sub> (axial), M<sub>u</sub> (moment), V<sub>u</sub> (shear)." },
              { vi: "<b>2. Kích thước base plate (B × N):</b> phải chứa cột + khoảng trống; kiểm tra ép bê tông f<sub>p</sub> ≤ φ(0.85f′<sub>c</sub>)√(A₂/A₁).", en: "<b>2. Base plate size (B × N):</b> must fit within the column footprint + clearance; check concrete bearing f<sub>p</sub> ≤ φ(0.85f′<sub>c</sub>)√(A₂/A₁)." },
              { vi: "<b>3. Chiều dày base plate (t<sub>p</sub>):</b> dựa trên uốn bản thò (kích thước m, n).", en: "<b>3. Base plate thickness (t<sub>p</sub>):</b> based on bending of the plate cantilever (m, n dimensions); simplified t<sub>p</sub> = 2.11 × √(M<sub>u,plate</sub> / (F<sub>y</sub> × B))." },
              { vi: "<b>4. Bu-lông neo:</b> kéo T<sub>u</sub> = M<sub>u</sub>/d − P<sub>u</sub>/n<sub>bolts</sub>; cắt truyền qua ma sát, ép mặt, hoặc shear lug.", en: "<b>4. Anchor bolts:</b> tension T<sub>u</sub> = M<sub>u</sub>/d − P<sub>u</sub>/n<sub>bolts</sub> (for small axial); shear transferred by friction, bearing or shear lugs." },
              { vi: "<b>5. Chiều sâu chôn bu-lông:</b> theo ACI 318 Chương 17.", en: "<b>5. Anchor bolt embedment:</b> per ACI 318 Chapter 17 (anchorage to concrete)." }
            ]
          },
          { type: "subhead", vi: "9.3. Kiểm tra bu-lông neo (ACI 318 Ch.17)", en: "9.3. Anchor bolt checks (ACI 318 Ch.17)" },
          {
            type: "table",
            head: [{ vi: "Dạng phá hoại", en: "Failure mode" }, { vi: "Nội dung kiểm tra", en: "What to check" }],
            rows: [
              [{ vi: "<b>Kéo đứt thép</b>", en: "<b>Steel tension</b>" }, { vi: "Khả năng kéo bu-lông", en: "Bolt tensile capacity" }],
              [{ vi: "<b>Phá vỡ bê tông (kéo)</b>", en: "<b>Concrete breakout (tension)</b>" }, { vi: "Nón phá hoại, ảnh hưởng mép", en: "Cone pullout, edge effects" }],
              [{ vi: "<b>Nhổ bê tông</b>", en: "<b>Concrete pullout</b>" }, { vi: "Ép mặt đầu bu-lông/đai ốc", en: "Bearing on bolt head/nut" }],
              [{ vi: "<b>Cắt thép</b>", en: "<b>Steel shear</b>" }, { vi: "Khả năng cắt bu-lông", en: "Bolt shear capacity" }],
              [{ vi: "<b>Phá vỡ bê tông (cắt)</b>", en: "<b>Concrete breakout (shear)</b>" }, { vi: "Khoảng cách mép, kích thước trụ", en: "Edge distance, pier size" }],
              [{ vi: "<b>Pryout bê tông</b>", en: "<b>Concrete pryout</b>" }, { vi: "Bu-lông ngắn", en: "Short bolts" }]
            ]
          },
          {
            type: "tip",
            vi: "<b>Tối thiểu 4 bu-lông neo</b> mỗi chân cột (OSHA — an toàn lắp dựng). Kể cả chân khớp.",
            en: "<b>Minimum 4 anchor bolts</b> per column base (OSHA erection safety) — even for pinned bases."
          }
        ]
      },
      {
        heading: { vi: "10. Thiết kế giằng", en: "10. Bracing design" },
        body: [
          { type: "subhead", vi: "10.1. Giằng đứng (phương dọc)", en: "10.1. Vertical bracing (longitudinal)" },
          {
            type: "list",
            items: [
              { vi: "<b>Mục đích:</b> chịu tải ngang dọc (ma sát, gió, động đất).", en: "<b>Purpose:</b> resist longitudinal lateral loads (friction, wind, seismic)." },
              { vi: "<b>Loại:</b> X-bracing (phổ biến nhất), V-ngược (chevron), chéo đơn.", en: "<b>Types:</b> X-bracing (most common), inverted V (chevron), single diagonal." },
              { vi: "<b>Vị trí:</b> mỗi 3–5 bay. Phối hợp với vòng lặp giãn nở ống.", en: "<b>Location:</b> every 3–5 bays. Coordinate with piping expansion loops." }
            ]
          },
          { type: "subhead", vi: "10.2. Kiểm tra cấu kiện giằng", en: "10.2. Design checks for bracing members" },
          {
            type: "code",
            vi: "Thanh kéo:    Pn = Fy × Ag   (chảy)\n              Pn = Fu × Ae   (đứt)\n\nThanh nén:    Pn = Fcr × Ag  (mất ổn định — AISC Ch. E)\n\nĐộ mảnh:      KL/r ≤ 200  (nén)\n              L/r  ≤ 300  (kéo — khuyến nghị)",
            en: "Tension member:      Pn = Fy × Ag   (yielding)\n                     Pn = Fu × Ae   (rupture)\n\nCompression member:  Pn = Fcr × Ag  (buckling — AISC Ch. E)\n\nSlenderness:         KL/r ≤ 200  (compression)\n                     L/r  ≤ 300  (tension — recommended)"
          },
          { type: "subhead", vi: "10.3. Thanh giằng ngang (Strut)", en: "10.3. Horizontal struts" },
          {
            type: "list",
            items: [
              { vi: "Nối các bent ở mức dầm theo phương dọc.", en: "Connect bents at beam level in the longitudinal direction." },
              { vi: "Chịu: lực ma sát, gió đại diện, lực strut từ giằng.", en: "Must resist: friction force, tributary wind, strut force from the bracing." },
              { vi: "Thường thiết kế như <b>thanh nén</b> (có thể mất ổn định khi lực ma sát đổi chiều).", en: "Often designed as <b>compression members</b> (they can buckle when the friction load reverses)." },
              { vi: "<b>Chiều dài hiệu dụng:</b> thường KL = toàn bộ chiều dài bay.", en: "<b>Effective length:</b> typically KL = the full bay length between bents." }
            ]
          },
          { type: "subhead", vi: "10.4. Liên kết giằng (bản mã — Gusset Plate)", en: "10.4. Bracing connection (gusset plate)" },
          {
            type: "list",
            items: [
              { vi: "Bản mã truyền lực giằng đến nút dầm–cột.", en: "Gusset plates must transfer the brace force to the beam-column joint." },
              { vi: "<b>Tiết diện Whitmore</b> cho khả năng kéo/nén.", en: "<b>Whitmore section</b> for tension/compression capacity." },
              { vi: "<b>Phương pháp Thornton</b> cho mất ổn định bản mã.", en: "<b>Thornton method</b> for gusset plate buckling." },
              { vi: "Kiểm tra <b>block shear</b> tại nhóm bu-lông.", en: "<b>Block shear</b> check at the bolt group." },
              { vi: "<b>Khoảng trống:</b> đảm bảo khe hở 2t (yêu cầu AISC).", en: "<b>Clearance:</b> ensure the 2t linear clearance (AISC requirement)." }
            ]
          }
        ]
      },
      {
        heading: { vi: "11. Chi tiết cấu tạo — mẹo từ kinh nghiệm", en: "11. Practical detailing — tips from experience" },
        body: [
          { type: "subhead", vi: "11.1. Hướng đặt cấu kiện", en: "11.1. Member orientation" },
          {
            type: "list",
            items: [
              { vi: "<b>Cột:</b> trục mạnh (x-x) đặt theo <b>phương ngang</b> — khung moment phương ngang nên uốn lớn nhất quanh trục mạnh.", en: "<b>Columns:</b> strong axis (x-x) oriented in the <b>transverse</b> direction — moment frame action is transverse, so maximum bending is about the strong axis." },
              { vi: "<b>Dầm:</b> trục mạnh chịu tải trọng đứng (hiển nhiên).", en: "<b>Beams:</b> strong axis resists gravity loads (obvious)." },
              { vi: "<b>Strut:</b> mất ổn định trục yếu phải được kiểm tra — thường chi phối.", en: "<b>Struts:</b> weak-axis buckling must be checked — it often controls." }
            ]
          },
          { type: "subhead", vi: "11.2. Dự phòng mở rộng", en: "11.2. Future expansion" },
          {
            type: "list",
            items: [
              { vi: "Thiết kế dư <b>10–25% tải trọng ống</b> cho tương lai.", en: "Design for <b>10–25% additional pipe load capacity</b>." },
              { vi: "Để trống chỗ cho mức ống bổ sung.", en: "Leave space for future pipe levels." },
              { vi: "Móng phải tính đến khả năng nhổ tăng thêm trong tương lai.", en: "Foundation design should account for potential future uplift." },
              { vi: "Vị trí giằng phải cho phép ống tương lai đi qua.", en: "Bracing locations should allow future piping runs." }
            ]
          },
          { type: "subhead", vi: "11.3. Lối đi & bảo trì", en: "11.3. Access & maintenance" },
          {
            type: "list",
            items: [
              { vi: "Thông thuỷ dưới dầm thấp nhất ≥ <b>4.5 m</b> cho xe cộ.", en: "Clear height under the lowest beam ≥ <b>4.5 m</b> (15 ft) for vehicle access." },
              { vi: "Sàn bảo trì tại mỗi mức dầm (nếu vận hành yêu cầu).", en: "Maintenance platforms at each beam level (if required by operations)." },
              { vi: "Thang/cầu thang theo OSHA hoặc tiêu chuẩn địa phương.", en: "Ladder and stairway access per OSHA/local codes." },
              { vi: "Tránh đặt giằng chắn lối đi.", en: "Avoid placing bracing where it blocks access routes." }
            ]
          },
          { type: "subhead", vi: "11.4. Chống cháy (Fireproofing)", en: "11.4. Fireproofing" },
          {
            type: "list",
            items: [
              { vi: "Yêu cầu theo quy định địa phương hoặc đặc tả dự án.", en: "Required in some jurisdictions or by project specification." },
              { vi: "Thường: sơn chống cháy phồng nở hoặc phun xi măng.", en: "Typically intumescent paint or cementitious spray." },
              { vi: "Tăng tĩnh tải (15–30 kg/m² bề mặt cấu kiện).", en: "Adds dead load (15–30 kg/m² of member surface area)." },
              { vi: "Ảnh hưởng chi tiết liên kết — cần khe hở cho thi công chống cháy.", en: "Affects connection details — clearances are needed for fireproofing application." }
            ]
          }
        ]
      },
      {
        heading: { vi: "12. Tương tác gối đỡ ống", en: "12. Pipe support interaction" },
        body: [
          { type: "subhead", vi: "12.1. Các loại gối đỡ", en: "12.1. Support types" },
          {
            type: "table",
            head: [{ vi: "Loại", en: "Type" }, { vi: "Chuyển vị cho phép", en: "Movement allowed" }, { vi: "Lực truyền", en: "Force transfer" }],
            rows: [
              [{ vi: "<b>Rest (đặt tự do)</b>", en: "<b>Rest</b>" }, { vi: "Tự do mọi phương ngang", en: "Free in all horizontal directions" }, { vi: "Chỉ đứng (+ ma sát)", en: "Vertical only (+ friction)" }],
              [{ vi: "<b>Guide (dẫn hướng)</b>", en: "<b>Guide</b>" }, { vi: "Chỉ dọc trục ống", en: "Axial only" }, { vi: "Đứng + ngang (không giữ dọc)", en: "Vertical + lateral (no axial restraint)" }],
              [{ vi: "<b>Anchor (neo)</b>", en: "<b>Anchor</b>" }, { vi: "Không (cố định)", en: "None (fixed)" }, { vi: "Đứng + ngang + dọc (toàn phần)", en: "Vertical + lateral + axial (full restraint)" }],
              [{ vi: "<b>Spring (lò xo)</b>", en: "<b>Spring</b>" }, { vi: "Chuyển vị đứng", en: "Vertical movement" }, { vi: "Đỡ đứng thay đổi", en: "Variable vertical support" }]
            ]
          },
          { type: "subhead", vi: "12.2. Thông tin cần từ nhóm Piping", en: "12.2. Information required from the piping team" },
          {
            type: "checklist",
            items: [
              { vi: "Kích thước ống, chiều dày cách nhiệt, mật độ dung dịch.", en: "Pipe sizes, insulation thickness, content density." },
              { vi: "Vị trí và loại gối đỡ (rest / guide / anchor).", en: "Support locations and types (rest / guide / anchor)." },
              { vi: "Tải neo (F<sub>x</sub>, F<sub>y</sub>, F<sub>z</sub>) từ phân tích ứng suất ống.", en: "Anchor loads (F<sub>x</sub>, F<sub>y</sub>, F<sub>z</sub>) from piping stress analysis." },
              { vi: "Phạm vi giãn nở nhiệt và hướng di chuyển.", en: "Thermal expansion ranges and movement directions." },
              { vi: "Yêu cầu thử thuỷ lực (ống nào, trình tự).", en: "Hydrotest requirements (which pipes, in what sequence)." },
              { vi: "Ống bổ sung trong tương lai.", en: "Future piping additions." }
            ]
          },
          {
            type: "tip",
            vi: "<b>Phối hợp là tất cả.</b> Thiết kế pipe rack chỉ tốt bằng dữ liệu tải trọng nó nhận được. Thiết lập quy trình trao đổi dữ liệu tải chính thức với nhóm piping.",
            en: "<b>Coordination is everything.</b> A pipe rack design is only as good as the load data it receives. Establish a formal load data exchange process with the piping team."
          }
        ]
      },
      {
        heading: { vi: "13. Giới hạn chuyển vị", en: "13. Deflection limits" },
        body: [
          {
            type: "table",
            head: [{ vi: "Điều kiện", en: "Condition" }, { vi: "Giới hạn", en: "Limit" }, { vi: "Tham chiếu", en: "Reference" }],
            rows: [
              [{ vi: "Võng dầm (TT+HT)", en: "Beam vertical deflection (DL+LL)" }, { vi: "L/240", en: "L/240" }, { vi: "AISC / đặc tả dự án", en: "AISC / project spec" }],
              [{ vi: "Võng dầm (chỉ HT)", en: "Beam vertical deflection (LL only)" }, { vi: "L/360", en: "L/360" }, { vi: "AISC / đặc tả dự án", en: "AISC / project spec" }],
              [{ vi: "Chuyển vị ngang (phương ngang)", en: "Lateral drift (transverse)" }, { vi: "H/100 đến H/200", en: "H/100 to H/200" }, { vi: "Đặc tả dự án / PIP", en: "Project spec / PIP" }],
              [{ vi: "Chuyển vị ngang (phương dọc)", en: "Lateral drift (longitudinal)" }, { vi: "H/200", en: "H/200" }, { vi: "Đặc tả dự án", en: "Project spec" }],
              [{ vi: "Co ngắn cột", en: "Column vertical shortening" }, { vi: "Theo dung sai ống", en: "Per piping tolerance" }, { vi: "Phối hợp với piping", en: "Coordinate with piping" }]
            ]
          },
          {
            type: "tip",
            vi: "<b>Lưu ý thực tế:</b> Kỹ sư piping thường quan tâm <b>chênh lệch võng</b> giữa các gối liền kề hơn là võng tuyệt đối. Thông báo giới hạn sớm.",
            en: "<b>Practical note:</b> Piping engineers are often more concerned about <b>differential deflection</b> between adjacent supports than about absolute deflection. Communicate the limits early."
          }
        ]
      },
      {
        heading: { vi: "14. Checklist thiết kế — quy trình dự án hoàn chỉnh", en: "14. Design checklist — complete project workflow" },
        body: [
          { type: "subhead", vi: "Giai đoạn 1: Thu thập dữ liệu", en: "Phase 1: Input data collection" },
          {
            type: "checklist",
            items: [
              { vi: "Bản vẽ mặt bằng và tuyến pipe rack.", en: "Plot plan and pipe rack routing layout." },
              { vi: "Danh sách ống: kích thước, cách nhiệt, dung dịch, nhiệt độ.", en: "Pipe list with sizes, insulation, content, temperatures." },
              { vi: "Bản vẽ máng cáp và trọng lượng.", en: "Cable tray layouts and weights." },
              { vi: "Báo cáo địa chất (khả năng chịu tải, thông số động đất).", en: "Geotechnical report (bearing capacity, seismic parameters)." },
              { vi: "Tài liệu tiêu chí thiết kế dự án.", en: "Project design criteria document." },
              { vi: "Dữ liệu phân tích ứng suất ống (tải neo / dẫn hướng).", en: "Piping stress analysis data (anchor/guide loads)." }
            ]
          },
          { type: "subhead", vi: "Giai đoạn 2: Thiết kế cấu hình", en: "Phase 2: Configuration design" },
          {
            type: "checklist",
            items: [
              { vi: "Khoảng cách bent đã xác định (phù hợp khoảng cách gối ống).", en: "Bent spacing determined (matching pipe support spacing)." },
              { vi: "Chiều rộng rack đã xác định (từ nghiên cứu tuyến ống).", en: "Rack width determined (from the pipe routing study)." },
              { vi: "Số mức dầm đã xác định.", en: "Number of beam levels determined." },
              { vi: "Chiều cao cột đã xác định (yêu cầu thông thuỷ).", en: "Column height determined (clearance requirements)." },
              { vi: "Vị trí bay giằng đã chọn (phối hợp với piping).", en: "Bracing bay locations selected (coordinated with piping)." },
              { vi: "Dự phòng mở rộng đã tính.", en: "Future expansion allowance incorporated." }
            ]
          },
          { type: "subhead", vi: "Giai đoạn 3: Phân tích kết cấu", en: "Phase 3: Structural analysis" },
          {
            type: "checklist",
            items: [
              { vi: "Tính toán tải trọng hoàn chỉnh (D, D<sub>o</sub>, D<sub>t</sub>, L, F<sub>f</sub>, W, E).", en: "Load calculation complete (D, D<sub>o</sub>, D<sub>t</sub>, L, F<sub>f</sub>, W, E)." },
              { vi: "Tổ hợp tải theo AISC / ASCE 7 đã thiết lập.", en: "Load combinations per AISC/ASCE 7 established." },
              { vi: "Phân tích khung ngang hoàn chỉnh.", en: "Transverse bent analysis complete." },
              { vi: "Phân tích khung giằng dọc hoàn chỉnh.", en: "Longitudinal braced bay analysis complete." },
              { vi: "Hiệu ứng bậc hai (P-Δ) đã tính.", en: "Second-order effects (P-Δ) included." },
              { vi: "Tỷ số thiết kế cấu kiện ≤ 1.0 (mục tiêu 0.7–0.9).", en: "Member design ratios ≤ 1.0 (target 0.7–0.9)." }
            ]
          },
          { type: "subhead", vi: "Giai đoạn 4: Thiết kế liên kết", en: "Phase 4: Connection design" },
          {
            type: "checklist",
            items: [
              { vi: "Liên kết moment dầm–cột đã thiết kế.", en: "Beam-to-column moment connections designed." },
              { vi: "Base plate và bu-lông neo đã thiết kế.", en: "Base plate and anchor bolts designed." },
              { vi: "Liên kết bản mã giằng đã thiết kế.", en: "Bracing gusset connections designed." },
              { vi: "Liên kết strut đã thiết kế (cắt + dọc trục).", en: "Strut connections designed (shear + axial)." },
              { vi: "Gối đỡ ống đã chi tiết.", en: "Pipe support attachments detailed." }
            ]
          },
          { type: "subhead", vi: "Giai đoạn 5: Thiết kế móng", en: "Phase 5: Foundation design" },
          {
            type: "checklist",
            items: [
              { vi: "Phản lực móng đã xuất từ mô hình kết cấu.", en: "Foundation reactions extracted from the structural analysis." },
              { vi: "Kích thước trụ/bệ (trọng lực + moment + cắt).", en: "Pedestal/pier sizing (gravity + moment + shear)." },
              { vi: "Chiều sâu chôn bu-lông theo ACI 318 Ch.17.", en: "Anchor bolt embedment per ACI 318 Ch.17." },
              { vi: "Ổn định móng (chống lật, trượt).", en: "Foundation stability (overturning, sliding)." },
              { vi: "Trường hợp tải thử thuỷ lực đã kiểm tra trên móng.", en: "Hydrotest load case checked on the foundation." }
            ]
          },
          { type: "subhead", vi: "Giai đoạn 6: Bản vẽ & hồ sơ", en: "Phase 6: Drawing & documentation" },
          {
            type: "checklist",
            items: [
              { vi: "Bản vẽ bố trí tổng thể.", en: "General arrangement drawings." },
              { vi: "Bảng thống kê cấu kiện với kích thước và vật liệu.", en: "Member schedule with sizes and materials." },
              { vi: "Chi tiết liên kết (tiêu chuẩn và đặc biệt).", en: "Connection details (standard and special)." },
              { vi: "Bản vẽ mặt bằng và chi tiết móng.", en: "Foundation plan and details." },
              { vi: "Bảng khối lượng.", en: "Bill of materials." },
              { vi: "Thuyết minh tính toán.", en: "Calculation report." }
            ]
          }
        ]
      },
      {
        heading: { vi: "15. Hệ thống tiêu chuẩn liên quan", en: "15. Related standards — quick reference" },
        body: [
          {
            type: "table",
            head: [{ vi: "Tiêu chuẩn", en: "Standard" }, { vi: "Phạm vi", en: "Scope" }, { vi: "Nội dung chính", en: "Key content" }],
            rows: [
              [{ vi: "<b>AISC 360</b>", en: "<b>AISC 360</b>" }, { vi: "Thiết kế thép", en: "Steel design" }, { vi: "Cấu kiện, ổn định, liên kết", en: "Member design, stability, connections" }],
              [{ vi: "<b>AISC 341</b>", en: "<b>AISC 341</b>" }, { vi: "Thiết kế chống động đất", en: "Seismic steel design" }, { vi: "Quy định đặc biệt cho vùng động đất", en: "Special provisions for seismic zones" }],
              [{ vi: "<b>AISC Design Guide 1</b>", en: "<b>AISC Design Guide 1</b>" }, { vi: "Base plate &amp; bu-lông neo", en: "Base plates &amp; anchor rods" }, { vi: "Chiều dày bản, thiết kế bu-lông", en: "Plate thickness, anchor design" }],
              [{ vi: "<b>AISC Design Guide 4/39</b>", en: "<b>AISC Design Guide 4/39</b>" }, { vi: "Liên kết end-plate", en: "End-plate connections" }, { vi: "Thiết kế liên kết moment", en: "Moment connection design" }],
              [{ vi: "<b>ASCE 7</b>", en: "<b>ASCE 7</b>" }, { vi: "Tải trọng và tổ hợp", en: "Loads and load combinations" }, { vi: "Gió, động đất, hệ số tải", en: "Wind, seismic, load factors" }],
              [{ vi: "<b>ASCE Petrochemical</b>", en: "<b>ASCE Petrochemical</b>" }, { vi: "Hướng dẫn kết cấu công nghiệp", en: "Industrial structure guidelines" }, { vi: "Quy định non-building structure", en: "Non-building structure provisions" }],
              [{ vi: "<b>ACI 318</b>", en: "<b>ACI 318</b>" }, { vi: "Thiết kế bê tông", en: "Concrete design" }, { vi: "Móng, chôn bu-lông neo", en: "Foundation, anchor bolt embedment" }],
              [{ vi: "<b>PIP STC01015</b>", en: "<b>PIP STC01015</b>" }, { vi: "Tiêu chí thiết kế pipe rack", en: "Pipe rack design criteria" }, { vi: "Thực hành công nghiệp, định nghĩa tải", en: "Industry practice, load definitions" }]
            ]
          }
        ]
      },
      {
        heading: { vi: "Tóm tắt Part 2", en: "Part 2 summary" },
        body: [
          {
            type: "table",
            head: [{ vi: "#", en: "#" }, { vi: "Nội dung", en: "Content" }, { vi: "Từ khoá", en: "Keyword" }],
            rows: [
              [{ vi: "1", en: "1" }, { vi: "End-plate moment = tiêu chuẩn cho bent pipe rack", en: "End-plate moment connection = standard for pipe rack bents" }, { vi: "<b>End-Plate</b>", en: "<b>End-Plate</b>" }],
              [{ vi: "2", en: "2" }, { vi: "Base plate: khớp hoặc ngàm — luôn tối thiểu 4 bu-lông", en: "Base plate: pinned or fixed — always minimum 4 anchor bolts" }, { vi: "<b>4 Bolts Min</b>", en: "<b>4 Bolts Min</b>" }],
              [{ vi: "3", en: "3" }, { vi: "Giằng đứng mỗi 3–5 bay, phối hợp piping", en: "Vertical bracing every 3–5 bays, coordinate with piping" }, { vi: "<b>Bracing Layout</b>", en: "<b>Bracing Layout</b>" }],
              [{ vi: "4", en: "4" }, { vi: "Bản mã: Whitmore + Thornton + Block Shear", en: "Gusset plate: Whitmore + Thornton + block shear" }, { vi: "<b>Gusset Checks</b>", en: "<b>Gusset Checks</b>" }],
              [{ vi: "5", en: "5" }, { vi: "Trục mạnh cột đặt theo phương ngang", en: "Strong axis of column oriented in the transverse direction" }, { vi: "<b>Column Orientation</b>", en: "<b>Column Orientation</b>" }],
              [{ vi: "6", en: "6" }, { vi: "Thiết kế dư 10–25% cho mở rộng tương lai", en: "Design for 10–25% future expansion capacity" }, { vi: "<b>Future Growth</b>", en: "<b>Future Growth</b>" }],
              [{ vi: "7", en: "7" }, { vi: "Dữ liệu gối đỡ ống từ nhóm piping = đầu vào quyết định", en: "Pipe support data from the piping team = critical input" }, { vi: "<b>Coordination</b>", en: "<b>Coordination</b>" }],
              [{ vi: "8", en: "8" }, { vi: "Checklist hoàn chỉnh từ thu thập dữ liệu đến hồ sơ", en: "Complete checklist from input data to documentation" }, { vi: "<b>6-Phase Workflow</b>", en: "<b>6-Phase Workflow</b>" }]
            ]
          },
          {
            type: "tip",
            vi: "Pipe rack không chỉ là một khung thép giữ ống. Nó là <b>xương sống của nhà máy công nghiệp</b> — kết nối các cụm công nghệ, mang theo tiện ích quan trọng, và chịu những lực mà kỹ sư dân dụng hiếm khi gặp.<br><b>Hiểu tải trọng — Mô hình đúng — Chi tiết cho thi công</b> = Pipe rack thành công.",
            en: "A pipe rack is not just a frame holding pipes. It is the <b>backbone of an industrial plant</b> — connecting process units, carrying critical utilities, and resisting forces that most building engineers never encounter.<br><b>Understand the loads — Model correctly — Detail for construction</b> = successful pipe rack."
          },
          {
            type: "tip",
            vi: "<b>Tiêu chuẩn và đặc tả dự án thay đổi theo thời gian.</b> Luôn kiểm tra phiên bản mới nhất của AISC 360, ASCE 7, và tiêu chí thiết kế dự án trước khi áp dụng. Bài viết này dùng làm <b>tham chiếu nhanh</b> — không thay thế việc đọc và hiểu code gốc.",
            en: "<b>Standards and project specifications evolve.</b> Always verify against the latest editions of AISC 360, ASCE 7 and the project-specific design criteria before applying them. This article is a <b>quick reference</b> — it does not replace reading and understanding the original codes."
          }
        ]
      }
    ],
    footnote: {
      vi: "Bài viết thuộc series “Hướng dẫn thiết kế kết cấu Công trình Công nghiệp” — Roberto Structural. Nội dung mang tính hướng dẫn kỹ thuật; kỹ sư chịu trách nhiệm kiểm tra và hiệu chỉnh theo điều kiện cụ thể của từng dự án và yêu cầu của tiêu chuẩn áp dụng. © Tổng hợp từ AISC 360, ASCE 7, AISC Design Guides, PIP Standards, và kinh nghiệm dự án thực tế.",
      en: "Part of the series “Structural design for industrial facilities” — Roberto Structural. The content is technical guidance; the engineer remains responsible for checking and adapting it to the conditions of each project and the requirements of the governing code. © Compiled from AISC 360, ASCE 7, AISC Design Guides, PIP Standards and practical project experience."
    }
  },

  /* ============================== No. 07 ============================== */
  {
    id: "pipe-rack-design-part-1",
    no: "07",
    category: { vi: "Kết cấu thép", en: "Steel Structures" },
    date: "2026-08-11",
    readmin: 12,
    title: {
      vi: "Pipe Rack — Sổ tay thiết kế (Phần 1): Cấu hình, tải trọng & phân tích",
      en: "Pipe Rack Design Guide (Part 1): Configuration, Loading & Analysis"
    },
    excerpt: {
      vi: "Pipe rack không phải nhà. Tải ngang — ma sát nhiệt, gió, động đất — mới là thứ chi phối thiết kế cột, và ma sát nhiệt là tải trọng đặc trưng không có trong kết cấu dân dụng.",
      en: "A pipe rack is not a building. Lateral loads — thermal friction, wind, seismic — govern the column design, and thermal friction is the signature load that conventional structures never see."
    },
    cover: "Resource/articles/06-pipe-rack/cover_1.webp",
    sections: [
      {
        heading: { vi: "1. Tổng quan — Pipe Rack có gì đặc biệt?", en: "1. Overview — what makes pipe racks special?" },
        body: [
          {
            type: "list",
            items: [
              { vi: "Pipe rack là <b>hệ khung thép</b> đỡ đường ống công nghệ, máng cáp điện, máng thiết bị đo lường trong nhà máy (dầu khí, hoá dầu, nhiệt điện).", en: "A pipe rack is a <b>steel framing system</b> that supports process piping, cable trays and instrument trays in industrial plants (oil &amp; gas, petrochemical, power)." },
              { vi: "<b>Không phải nhà</b> — là <b>non-building structure</b> với đặc điểm tải trọng riêng biệt.", en: "<b>Not a building</b> — it is a <b>non-building structure</b> with unique load characteristics." },
              { vi: "<b>Tải nhiệt/ma sát</b> từ giãn nở ống — thường là tải ngang chi phối thiết kế.", en: "<b>Thermal/friction loads</b> from piping expansion — often the governing lateral load." },
              { vi: "<b>Tải trọng biến thiên lớn</b> — ống rỗng, ống đầy dung dịch, hoặc thử thuỷ lực.", en: "<b>Highly variable loads</b> — pipes can be empty, full, or under test pressure." },
              { vi: "<b>Phối hợp đa ngành</b> — kết cấu, đường ống, điện, đo lường cần thống nhất.", en: "<b>Multi-discipline coordination</b> — structural, piping, electrical and instrument teams must align." },
              { vi: "<b>Thi công lắp ghép</b> — liên kết bu-lông được ưu tiên, hạn chế hàn ngoài công trường.", en: "<b>Modular construction</b> — bolted connections preferred for field erection." },
              { vi: "<b>Dự phòng mở rộng</b> — cân nhắc thiết kế dư 10–25% tải trọng cho tương lai.", en: "<b>Future expansion</b> — consider designing with 10–25% additional capacity." }
            ]
          },
          {
            type: "tip",
            vi: "<b>Thay đổi tư duy:</b> Trong nhà dân dụng, tải trọng đứng chi phối. Trong pipe rack, <b>tải ngang</b> (ma sát, gió, động đất) thường <b>chi phối</b> thiết kế cột.",
            en: "<b>Mindset shift:</b> In buildings, gravity loads dominate. In pipe racks, <b>lateral loads</b> (thermal, wind, seismic) often <b>govern</b> the column design."
          }
        ]
      },
      {
        heading: { vi: "2. Cấu hình kết cấu", en: "2. Structural configuration" },
        body: [
          {
            type: "figure",
            src: "Resource/articles/06-pipe-rack/01_pipe_rack_configuration.webp",
            caption: { vi: "<b>Hình 1.</b> Hệ kết cấu Pipe Rack: khung ngang + giằng dọc.", en: "<b>Figure 1.</b> Pipe rack structural system: transverse bent + longitudinal bracing." }
          },
          { type: "subhead", vi: "2.1. Phương ngang — Khung moment", en: "2.1. Transverse direction — moment frame" },
          {
            type: "list",
            items: [
              { vi: "Mỗi <b>Moment Frame</b> là khung cứng gồm 2 cột + 1 hoặc nhiều dầm.", en: "Each <b>moment frame</b> is a rigid (portal) frame of 2 columns + one or more beams." },
              { vi: "Chịu <b>tải ngang vuông góc</b> với hướng ống (gió, động đất).", en: "Resists <b>transverse lateral loads</b> (wind, seismic perpendicular to the pipe run)." },
              { vi: "Chân cột: thường <b>ngàm</b> hoặc <b>khớp</b> phụ thuộc vào thiết kế.", en: "Column bases: typically <b>fixed</b> or <b>pinned</b>, depending on the design strategy." },
              { vi: "Liên kết dầm–cột: <b>cứng</b> (chịu moment).", en: "Beam-to-column connections: <b>rigid</b> (moment-resisting)." },
              { vi: "Phải giữ <b>thông thoáng bên dưới</b> cho xe cộ, bảo trì, thiết bị.", en: "Must remain <b>open below</b> for access, maintenance and equipment clearance." }
            ]
          },
          { type: "subhead", vi: "2.2. Phương dọc — Khung giằng", en: "2.2. Longitudinal direction — braced frame" },
          {
            type: "list",
            items: [
              { vi: "<b>Giằng đứng</b> (X-bracing hoặc V-ngược) đặt cách quãng dọc pipe rack.", en: "<b>Vertical bracing</b> (X-bracing or inverted V) placed at intervals along the rack." },
              { vi: "Chân cột: thường là <b>khớp</b>.", en: "Column bases: usually <b>pinned</b>." },
              { vi: "<b>Thanh giằng ngang (strut)</b> nối các bent ở mức dầm → truyền lực ngang đến bay giằng.", en: "<b>Longitudinal struts</b> connect bents at beam level to transfer lateral loads to the braced bays." },
              { vi: "Chịu: lực ma sát, gió, động đất song song hướng ống.", en: "Resists friction loads, wind and seismic parallel to the pipe run." }
            ]
          },
          {
            type: "tip",
            vi: "<b>Thực hành:</b> Vị trí bay giằng <b>không được</b> xung đột với điểm neo (anchor) hoặc vòng lặp giãn nở (expansion loop) của ống. Phối hợp với nhóm piping để bố trí hợp lý.",
            en: "<b>Practical rule:</b> The braced bay location should <b>not</b> conflict with major anchor points or expansion loops. Coordinate with the piping team for a workable arrangement."
          }
        ]
      },
      {
        heading: { vi: "3. Tải trọng — bước quan trọng nhất", en: "3. Loading — the most critical step" },
        body: [
          { type: "subhead", vi: "3.1. Tĩnh tải (D)", en: "3.1. Dead load (D)" },
          {
            type: "list",
            items: [
              { vi: "<b>Trọng lượng ống:</b> ống rỗng + bọc cách nhiệt.", en: "<b>Piping weight:</b> empty weight + insulation weight." },
              { vi: "<b>Trọng lượng máng cáp:</b> máng + cáp (thường 20–150 kg/m mỗi máng).", en: "<b>Cable tray weight:</b> tray + cables (typically 20–150 kg/m per tray)." },
              { vi: "<b>Tải trọng bản thân:</b> thép kết cấu, lớp chống cháy.", en: "<b>Self-weight:</b> steel members, fireproofing (if any)." },
              { vi: "<b>Tải dự trữ</b> khi chưa có dữ liệu ống chi tiết: mức ống 10–15 kPa mỗi mức; mức máng cáp 2.5–5 kPa.", en: "<b>Preliminary design load</b> if pipe data is not yet available: piping level 10–15 kPa (200–300 psf) per level; cable tray level 2.5–5 kPa (50–100 psf)." }
            ]
          },
          { type: "subhead", vi: "3.2. Hoạt tải (L)", en: "3.2. Live load (L)" },
          {
            type: "list",
            items: [
              { vi: "Sàn thao tác: <b>2.5–5.0 kPa</b>.", en: "Platform: <b>2.5–5.0 kPa</b> (50–100 psf)." },
              { vi: "Tải thi công/lắp dựng: theo yêu cầu dự án.", en: "Construction/erection loads: per project specification." }
            ]
          },
          { type: "subhead", vi: "3.3. Tải vận hành (Do)", en: "3.3. Operating load (Do)" },
          {
            vi: "Tĩnh tải <b>+ trọng lượng dung dịch</b> trong điều kiện vận hành bình thường. Đây là <b>tải trọng đứng chính</b> cho hầu hết kiểm tra thiết kế.",
            en: "Dead load <b>+ fluid content</b> weight under normal operation. This is the <b>primary gravity load</b> for most design checks."
          },
          { type: "subhead", vi: "3.4. Tải thử thuỷ lực (Dt)", en: "3.4. Test load (Dt)" },
          {
            type: "list",
            items: [
              { vi: "Tĩnh tải + <b>trọng lượng nước thử</b> (nước nặng hơn hầu hết dung dịch công nghệ).", en: "Dead load + <b>hydrotest water weight</b> (water is heavier than most process fluids)." },
              { vi: "Áp dụng <b>từng ống một</b> — không phải tất cả ống cùng lúc.", en: "Applied <b>one pipe at a time</b> — not all pipes simultaneously." },
              { vi: "Có thể là <b>tải trọng đứng chi phối</b> cho ống đường kính lớn.", en: "Can be the <b>governing gravity load</b> for large-diameter pipes." }
            ]
          },
          { type: "subhead", vi: "3.5. Tải nhiệt / ma sát (Ff)", en: "3.5. Thermal / friction load (Ff)" },
          {
            type: "figure",
            src: "Resource/articles/06-pipe-rack/02_friction_thermal_loads.webp",
            caption: { vi: "<b>Hình 2.</b> Giãn nở nhiệt và lực ma sát trên Pipe Rack.", en: "<b>Figure 2.</b> Thermal expansion and friction forces on a pipe rack." }
          },
          {
            vi: "Đây là <b>tải trọng đặc trưng</b> của pipe rack — không có trong nhà dân dụng.",
            en: "This is <b>the signature load</b> of pipe rack design — absent in conventional buildings."
          },
          {
            type: "list",
            items: [
              { vi: "<b>Nguyên nhân:</b> ống giãn/co theo nhiệt độ → trượt trên gối đỡ → lực ma sát.", en: "<b>Cause:</b> pipes expand/contract with temperature → slide on supports → friction force." },
              { vi: "<b>Phương:</b> chủ yếu <b>dọc</b> theo hướng ống.", en: "<b>Direction:</b> primarily <b>longitudinal</b> (along the pipe run)." },
              { vi: "<b>Hệ số ma sát (μ):</b> thép–thép ≈ 0.3; thép–PTFE ≈ 0.05–0.10.", en: "<b>Friction coefficient (μ):</b> steel-on-steel ≈ 0.3; steel-on-PTFE ≈ 0.05–0.10." }
            ]
          },
          {
            type: "code",
            vi: "Ff = MAX của:\n  (a) μ × 10% tổng trọng lượng ống trên bent\n  (b) μ × 40% trọng lượng ống lớn nhất trên bent",
            en: "Ff = MAX of:\n  (a) μ × 10% of total piping weight on the bent\n  (b) μ × 40% of the heaviest single pipe weight on the bent"
          },
          {
            type: "list",
            items: [
              { vi: "<b>Tải neo (Anchor):</b> tại điểm neo, toàn bộ lực giãn nở truyền trực tiếp — có thể <b>rất lớn</b> (hàng trăm kN).", en: "<b>Anchor loads:</b> where pipes are anchored, the full thermal expansion force is transferred directly — this can be <b>very large</b> (hundreds of kN)." },
              { vi: "<b>Tải dẫn hướng (Guide):</b> lực ngang tại vị trí dẫn hướng — ống di chuyển dọc trục nhưng bị giữ ngang.", en: "<b>Guide loads:</b> lateral forces at guide locations — the pipe can move axially but is restrained laterally." }
            ]
          },
          {
            type: "tip",
            vi: "<b>Lưu ý quan trọng:</b> Kỹ sư thường đánh giá thấp tải ma sát/neo. Các tải này có thể <b>chi phối thiết kế</b> theo phương dọc. Luôn yêu cầu dữ liệu phân tích ứng suất ống đầy đủ.",
            en: "<b>Common trap:</b> Engineers often underestimate friction and anchor loads. These can <b>govern the design</b> in the longitudinal direction. Always request the full piping stress analysis data."
          },
          { type: "subhead", vi: "3.6. Tải gió (W)", en: "3.6. Wind load (W)" },
          {
            type: "list",
            items: [
              { vi: "Tính theo <b>ASCE 7</b> (hoặc tiêu chuẩn địa phương).", en: "Calculated per <b>ASCE 7</b> (or the local code)." },
              { vi: "Áp dụng lên: diện tích đón gió của cột, dầm, ống, máng cáp, bọc cách nhiệt.", en: "Applied on the projected area of columns, beams, pipes, cable trays and insulation." },
              { vi: "<b>Diện tích ống:</b> dùng đường kính toàn bộ (bao gồm cách nhiệt).", en: "<b>Pipe area:</b> use the total projected diameter (including insulation)." },
              { vi: "<b>Hiệu ứng che chắn:</b> một số tiêu chuẩn cho phép giảm khi có nhiều hàng ống.", en: "<b>Shielding effect:</b> some codes allow a reduction for multiple pipe rows." },
              { vi: "Gió trên pipe rack thường theo <b>phương ngang</b> (vuông góc hướng ống).", en: "Wind on a pipe rack is typically <b>transverse</b> (perpendicular to the pipe run)." }
            ]
          },
          {
            type: "figure",
            src: "Resource/articles/06-pipe-rack/06_wind_load_on_pipes.webp",
            caption: { vi: "<b>Hình 6.</b> Tải gió tác dụng lên hệ ống trên pipe rack — diện tích đón gió và hiệu ứng che chắn giữa các hàng ống.", en: "<b>Figure 6.</b> Wind load on the pipe bundle — projected area and the shielding effect between pipe rows." }
          },
          { type: "subhead", vi: "3.7. Tải động đất (E)", en: "3.7. Seismic load (E)" },
          {
            type: "list",
            items: [
              { vi: "Theo <b>ASCE 7</b> và thông số động đất dự án.", en: "Per <b>ASCE 7</b> and the project seismic parameters." },
              { vi: "Pipe rack là non-building structure → dùng R-factor và hệ số tầm quan trọng riêng.", en: "For non-building structures: use the specific R-factors and importance factors." },
              { vi: "Giá trị điển hình tham khảo: <b>R = 3.5–8.0</b> cho khung moment (phương ngang); <b>R = 8</b> cho khung giằng thường (phương dọc).", en: "Typical pipe rack values: <b>R = 3.5-8.0</b> for ordinary moment frames (transverse); <b>R = 8</b> for ordinary braced frames (longitudinal). Higher values may apply to special or intermediate frames." },
              { vi: "Trọng lượng động đất: trọng lượng kết cấu + trọng lượng ống vận hành.", en: "Seismic weight includes the structure weight + the operating piping weight." }
            ]
          },
          { type: "subhead", vi: "3.8. Bảng tóm tắt tải trọng", en: "3.8. Load summary table" },
          {
            type: "table",
            head: [{ vi: "Tải trọng", en: "Load" }, { vi: "Ký hiệu", en: "Symbol" }, { vi: "Phương", en: "Direction" }, { vi: "Ghi chú", en: "Notes" }],
            rows: [
              [{ vi: "Tĩnh tải", en: "Dead" }, { vi: "D", en: "D" }, { vi: "Đứng ↓", en: "Vertical ↓" }, { vi: "Kết cấu + ống rỗng + cách nhiệt", en: "Structure + empty pipe + insulation" }],
              [{ vi: "Vận hành", en: "Operating" }, { vi: "Do", en: "Do" }, { vi: "Đứng ↓", en: "Vertical ↓" }, { vi: "D + dung dịch", en: "D + fluid content" }],
              [{ vi: "Thử thuỷ lực", en: "Test" }, { vi: "Dt", en: "Dt" }, { vi: "Đứng ↓", en: "Vertical ↓" }, { vi: "D + nước thử (từng ống)", en: "D + hydrotest water (one pipe at a time)" }],
              [{ vi: "Hoạt tải", en: "Live" }, { vi: "L", en: "L" }, { vi: "Đứng ↓", en: "Vertical ↓" }, { vi: "Sàn thao tác", en: "Platform" }],
              [{ vi: "Ma sát", en: "Friction" }, { vi: "Ff", en: "Ff" }, { vi: "Dọc ← →", en: "Longitudinal ← →" }, { vi: "Giãn nở nhiệt ống", en: "Thermal pipe expansion" }],
              [{ vi: "Tải neo", en: "Anchor" }, { vi: "Fa", en: "Fa" }, { vi: "Dọc / Ngang", en: "Longitudinal / lateral" }, { vi: "Phân tích ứng suất ống", en: "Piping stress analysis" }],
              [{ vi: "Gió", en: "Wind" }, { vi: "W", en: "W" }, { vi: "Ngang / Dọc", en: "Transverse / longitudinal" }, { vi: "ASCE 7, diện tích đón gió", en: "ASCE 7, on projected area" }],
              [{ vi: "Động đất", en: "Seismic" }, { vi: "E", en: "E" }, { vi: "Cả 2 phương", en: "Both directions" }, { vi: "ASCE 7, khối lượng vận hành", en: "ASCE 7, operating weight" }]
            ]
          }
        ]
      },
      {
        heading: { vi: "4. Tổ hợp tải trọng — AISC 360 / ASCE 7", en: "4. Load combinations — AISC 360 / ASCE 7" },
        body: [
          { type: "subhead", vi: "4.1. Tổ hợp LRFD (chính)", en: "4.1. LRFD load combinations (primary)" },
          {
            type: "code",
            vi: "1)  1.4D\n2)  1.2D  + 1.6L\n3)  1.2Do + 1.0L + 1.6W\n4)  1.2Do + 1.0E\n5)  0.9D  + 1.6W      (kiểm tra nhổ/lật)\n6)  0.9D  + 1.0E      (kiểm tra nhổ/lật)\n7)  1.2D  + 1.6Ff     (ma sát là tải ngang chính)\n8)  1.2Dt             (thử thuỷ lực — trường hợp đặc biệt)",
            en: "1)  1.4D\n2)  1.2D  + 1.6L\n3)  1.2Do + 1.0L + 1.6W\n4)  1.2Do + 1.0E\n5)  0.9D  + 1.6W      (uplift / overturning check)\n6)  0.9D  + 1.0E      (uplift / overturning check)\n7)  1.2D  + 1.6Ff     (friction as the primary lateral load)\n8)  1.2Dt             (hydrotest — special case)"
          },
          { type: "subhead", vi: "4.2. Lưu ý quan trọng", en: "4.2. Key notes on combinations" },
          {
            type: "list",
            items: [
              { vi: "<b>Ma sát (Ff)</b> là tải ngang <b>riêng biệt</b> — không tổ hợp đồng thời với gió hoặc động đất.", en: "<b>Friction (Ff)</b> is a <b>separate lateral load</b> — not combined with wind or seismic simultaneously (they do not occur together)." },
              { vi: "<b>Tải thử (Dt)</b> là điều kiện đặc biệt — chỉ tổ hợp với tĩnh tải.", en: "<b>Test load (Dt)</b> is a special condition — combined only with dead load; no live, wind or seismic." },
              { vi: "Luôn kiểm tra cả <b>nhổ</b> (0.9D + W hoặc E) và <b>tải trọng đứng lớn nhất</b>.", en: "Always check <b>both uplift</b> (0.9D + W or E) and <b>maximum gravity</b> (1.2Do + 1.6L)." },
              { vi: "Dùng <b>tải danh nghĩa (notional loads)</b> nếu sử dụng Direct Analysis Method.", en: "Use <b>notional loads</b> if using the Direct Analysis Method." }
            ]
          },
          {
            type: "tip",
            vi: "<b>Lưu ý:</b> Tổ hợp tải ma sát thường <b>chi phối</b> thiết kế cột theo phương dọc. Gió/động đất có thể chi phối phương ngang.",
            en: "<b>Tip:</b> Friction load combinations often <b>govern</b> the column design in the longitudinal direction, while wind/seismic may govern the transverse direction."
          }
        ]
      },
      {
        heading: { vi: "5. Phương pháp phân tích", en: "5. Analysis approach" },
        body: [
          { type: "subhead", vi: "5.1. Phân tích tách biệt (khuyến nghị cho rack tiêu chuẩn)", en: "5.1. Separated analysis (recommended for standard racks)" },
          {
            vi: "Hầu hết pipe rack có thể phân tích hiệu quả bằng cách tách hai phương vuông góc:",
            en: "Most pipe racks can be efficiently analysed by separating the two orthogonal directions:"
          },
          {
            type: "list",
            items: [
              { vi: "<b>① Khung ngang (2D Frame):</b> mô hình khung moment 2 cột + dầm; tải trọng lực + gió/động đất ngang; kết quả là kích thước cột, dầm, tỷ số tương tác.", en: "<b>① Transverse moment frame (2D):</b> portal frame with 2 columns + beams; gravity + transverse wind/seismic; output is column sizes, beam sizes and interaction ratios." },
              { vi: "<b>② Khung giằng dọc (2D Truss):</b> mô hình khung giằng với strut + giằng + cột đại diện; tải ma sát + gió/động đất dọc; kết quả là kích thước giằng, strut, kiểm tra cột phương dọc.", en: "<b>② Longitudinal braced bay (2D truss):</b> braced frame with struts + bracing + tributary columns; friction + longitudinal wind/seismic; output is bracing sizes, strut sizes and the longitudinal column check." },
              { vi: "<b>③ Kết hợp kết quả:</b> tỷ số cột chi phối = MAX (kiểm tra ngang, kiểm tra dọc, tương tác hai trục).", en: "<b>③ Combine results:</b> the governing column ratio = MAX (transverse check, longitudinal check, biaxial interaction)." }
            ]
          },
          { type: "subhead", vi: "5.2. Phân tích 3D đầy đủ (cho rack phức tạp)", en: "5.2. Full 3D analysis (for complex racks)" },
          {
            type: "list",
            items: [
              { vi: "Hình học không đều (chiều cao thay đổi, offset).", en: "Non-uniform geometry (varying heights, offsets)." },
              { vi: "Thiết bị nặng đặt trên rack.", en: "Heavy equipment mounted on the rack." },
              { vi: "Tải neo lớn từ phân tích ứng suất ống.", en: "Large anchor loads from piping stress analysis." },
              { vi: "Thiết kế động đất yêu cầu phân tích modal.", en: "Seismic design requiring modal or response spectrum analysis." }
            ]
          },
          { type: "subhead", vi: "5.3. Hiệu ứng bậc hai (P-Δ)", en: "5.3. Second-order effects (P-Δ)" },
          {
            type: "list",
            items: [
              { vi: "<b>AISC 360 yêu cầu</b> xét hiệu ứng bậc hai.", en: "<b>AISC 360 requires</b> consideration of second-order effects." },
              { vi: "<b>Direct Analysis Method (DAM):</b> ưu tiên — áp dụng tải danh nghĩa, giảm độ cứng, K = 1.0.", en: "<b>Direct Analysis Method (DAM):</b> preferred — apply notional loads, use reduced stiffness, K = 1.0." },
              { vi: "<b>Effective Length Method (ELM):</b> tính K-factor cho sway frame.", en: "<b>Effective Length Method (ELM):</b> calculate the K-factor for sway frames." },
              { vi: "Pipe rack chiều cao vừa phải: <b>hệ số khuếch đại B₂</b> thường 1.05–1.15.", en: "For most pipe racks of moderate height, the <b>B₂ amplifier</b> is typically 1.05–1.15." }
            ]
          }
        ]
      },
      {
        heading: { vi: "6. Thiết kế dầm", en: "6. Beam design" },
        body: [
          { type: "subhead", vi: "6.1. Tải trọng trên dầm", en: "6.1. Loading on beams" },
          {
            type: "list",
            items: [
              { vi: "Dầm đỡ ống tại <b>các điểm rời rạc</b> — không phải tải phân bố đều.", en: "Beams support pipes at <b>discrete points</b>, not as a uniform load." },
              { vi: "Mỗi gối đỡ ống = <b>tải tập trung</b> trên dầm.", en: "Each pipe support is a <b>point load</b> on the beam." },
              { vi: "Máng cáp: xử lý như <b>tải phân bố đều (UDL)</b>.", en: "For cable trays: treat as a <b>uniform distributed load (UDL)</b>." },
              { vi: "Trọng lượng bản thân dầm: kể như tải phân bố đều.", en: "Beam self-weight: include as a UDL." }
            ]
          },
          { type: "subhead", vi: "6.2. Các kiểm tra thiết kế", en: "6.2. Design checks" },
          {
            type: "table",
            head: [{ vi: "Kiểm tra", en: "Check" }, { vi: "Công thức / tham chiếu", en: "Formula / reference" }, { vi: "Ghi chú", en: "Notes" }],
            rows: [
              [{ vi: "<b>Uốn</b>", en: "<b>Flexure</b>" }, { vi: "M<sub>n</sub> = M<sub>p</sub> = F<sub>y</sub> × Z<sub>x</sub> (compact)", en: "M<sub>n</sub> = M<sub>p</sub> = F<sub>y</sub> × Z<sub>x</sub> (compact)" }, { vi: "AISC 360 Chương F", en: "AISC 360 Chapter F" }],
              [{ vi: "<b>Cắt</b>", en: "<b>Shear</b>" }, { vi: "V<sub>n</sub> = 0.6F<sub>y</sub> × A<sub>w</sub> × C<sub>v</sub>", en: "V<sub>n</sub> = 0.6F<sub>y</sub> × A<sub>w</sub> × C<sub>v</sub>" }, { vi: "AISC 360 Chương G", en: "AISC 360 Chapter G" }],
              [{ vi: "<b>Võng</b>", en: "<b>Deflection</b>" }, { vi: "δ ≤ L/240 (TT+HT) hoặc L/360 (HT)", en: "δ ≤ L/240 (DL+LL) or L/360 (LL)" }, { vi: "Khả năng sử dụng", en: "Serviceability" }],
              [{ vi: "<b>Mất ổn định xoắn ngang (LTB)</b>", en: "<b>Lateral-torsional buckling (LTB)</b>" }, { vi: "Kiểm tra L<sub>b</sub> so với L<sub>p</sub>, L<sub>r</sub>", en: "Check L<sub>b</sub> against L<sub>p</sub>, L<sub>r</sub>" }, { vi: "Chiều dài không giằng quan trọng", en: "Unbraced length is critical" }],
              [{ vi: "<b>Oằn cục bộ bụng</b>", en: "<b>Web local buckling</b>" }, { vi: "Giới hạn h/t<sub>w</sub>", en: "h/t<sub>w</sub> limit" }, { vi: "Ưu tiên tiết diện compact", en: "Compact section preferred" }]
            ]
          },
          { type: "subhead", vi: "6.3. Chiều dài không giằng (Lb)", en: "6.3. Unbraced length (Lb) for beams" },
          {
            type: "list",
            items: [
              { vi: "<b>Cánh trên chịu nén:</b> L<sub>b</sub> = khoảng cách giữa các điểm giằng ngang.", en: "<b>Top flange in compression:</b> L<sub>b</sub> = the distance between lateral braces." },
              { vi: "<b>Cánh dưới chịu nén</b> (moment âm tại liên kết): L<sub>b</sub> = toàn bộ nhịp dầm trừ khi có giằng riêng.", en: "<b>Bottom flange in compression</b> (negative moment at connections): L<sub>b</sub> = the full beam span unless specifically braced." }
            ]
          },
          {
            type: "tip",
            vi: "<b>Câu hỏi then chốt:</b> Gối đỡ ống có tạo giằng ngang cho dầm không? Chỉ khi gối <b>giữ chặt</b> cánh nén. Ống đặt tự do thường <b>KHÔNG</b> giằng dầm.",
            en: "<b>Key question:</b> Do the pipe supports laterally brace the beam? Only if the support <b>positively restrains</b> the compression flange. Resting pipes generally do <b>NOT</b> brace the beam."
          }
        ]
      },
      {
        heading: { vi: "7. Thiết kế cột — tương tác dầm–cột", en: "7. Column design — beam-column interaction" },
        body: [
          {
            vi: "Đây là kiểm tra thiết kế <b>quan trọng nhất</b> trong pipe rack.",
            en: "This is the <b>most critical</b> member design in a pipe rack."
          },
          { type: "subhead", vi: "7.1. Thiết kế cột thép", en: "7.1. Steel column design" },
          {
            type: "list",
            items: [
              { vi: "<b>Nén dọc trục</b> (trọng lực từ các mức).", en: "<b>Axial compression</b> (gravity from all levels)." },
              { vi: "<b>Uốn trục mạnh</b> (tải ngang — khung moment).", en: "<b>Bending about the strong axis</b> (transverse lateral loads — moment frame action)." },
              { vi: "<b>Uốn trục yếu</b> (ma sát/gió dọc — nếu không giằng).", en: "<b>Bending about the weak axis</b> (longitudinal friction/wind — if unbraced longitudinally)." },
              { vi: "→ Phải thoả mãn phương trình tương tác <b>AISC 360 Chương H</b>.", en: "→ Must satisfy the <b>AISC 360 Chapter H</b> interaction equations." }
            ]
          },
          { type: "subhead", vi: "7.2. Phương trình tương tác AISC H1-1", en: "7.2. AISC H1-1 interaction equations" },
          {
            type: "figure",
            src: "Resource/articles/06-pipe-rack/03_beam_column_interaction.webp",
            caption: { vi: "<b>Hình 3.</b> Biểu đồ tương tác Beam-Column (AISC H1-1).", en: "<b>Figure 3.</b> Beam-column interaction diagram (AISC H1-1)." }
          },
          {
            type: "code",
            vi: "Khi Pr/Pc ≥ 0.2:\n  Pr/Pc + (8/9)(Mrx/Mcx + Mry/Mcy) ≤ 1.0    — Eq. H1-1a\n\nKhi Pr/Pc &lt; 0.2:\n  Pr/(2Pc) + (Mrx/Mcx + Mry/Mcy) ≤ 1.0      — Eq. H1-1b",
            en: "When Pr/Pc ≥ 0.2:\n  Pr/Pc + (8/9)(Mrx/Mcx + Mry/Mcy) ≤ 1.0    — Eq. H1-1a\n\nWhen Pr/Pc &lt; 0.2:\n  Pr/(2Pc) + (Mrx/Mcx + Mry/Mcy) ≤ 1.0      — Eq. H1-1b"
          },
          {
            type: "table",
            head: [{ vi: "Ký hiệu", en: "Symbol" }, { vi: "Ý nghĩa", en: "Meaning" }],
            rows: [
              [{ vi: "P<sub>r</sub>", en: "P<sub>r</sub>" }, { vi: "Lực dọc yêu cầu (đã nhân hệ số)", en: "Required axial strength (factored)" }],
              [{ vi: "P<sub>c</sub>", en: "P<sub>c</sub>" }, { vi: "Khả năng chịu nén cho phép (φP<sub>n</sub>)", en: "Available axial strength (φP<sub>n</sub>)" }],
              [{ vi: "M<sub>rx</sub>, M<sub>ry</sub>", en: "M<sub>rx</sub>, M<sub>ry</sub>" }, { vi: "Moment yêu cầu (trục mạnh, trục yếu)", en: "Required flexural strength (strong, weak axis)" }],
              [{ vi: "M<sub>cx</sub>, M<sub>cy</sub>", en: "M<sub>cx</sub>, M<sub>cy</sub>" }, { vi: "Khả năng chịu uốn cho phép (φM<sub>n</sub>)", en: "Available flexural strength (φM<sub>n</sub>)" }]
            ]
          },
          { type: "subhead", vi: "7.3. Chiều dài không giằng cột", en: "7.3. Critical unbraced lengths for columns" },
          {
            type: "table",
            head: [{ vi: "Phương", en: "Direction" }, { vi: "Trục mạnh", en: "Major axis" }, { vi: "Trục yếu", en: "Minor axis" }],
            rows: [
              [{ vi: "<b>Ngang</b>", en: "<b>Transverse</b>" }, { vi: "Chân cột đến dầm (khung moment)", en: "Base to beam (moment frame)" }, { vi: "Chân cột đến strut/dầm đầu tiên", en: "Base to first strut or beam" }],
              [{ vi: "<b>Dọc</b>", en: "<b>Longitudinal</b>" }, { vi: "Chân cột đến dầm", en: "Base to beam" }, { vi: "Chân cột đến strut/dầm đầu tiên", en: "Base to first strut or beam" }],
              [{ vi: "<b>K (DAM)</b>", en: "<b>K-factor (DAM)</b>" }, { vi: "K = 1.0", en: "K = 1.0" }, { vi: "K = 1.0", en: "K = 1.0" }],
              [{ vi: "<b>K (ELM, lắc)</b>", en: "<b>K-factor (ELM, sway)</b>" }, { vi: "K &gt; 1.0 (abacus)", en: "K &gt; 1.0 (alignment chart)" }, { vi: "K &gt; 1.0 (nếu không giằng)", en: "K &gt; 1.0 (if unbraced)" }]
            ]
          },
          {
            type: "tip",
            vi: "<b>Mẹo:</b> <b>Chiều dài không giằng trục yếu</b> thường chi phối khả năng chịu lực cột. Thêm strut ngang tại giữa chiều cao có thể giảm KL/r đáng kể → giảm được tiết diện cột.",
            en: "<b>Practical tip:</b> The <b>weak-axis unbraced length</b> often controls the column capacity. Adding a horizontal strut at mid-height can dramatically reduce KL/r and shrink the column size."
          },
          { type: "subhead", vi: "7.4. Quy trình thiết kế cột từng bước", en: "7.4. Step-by-step column design" },
          {
            type: "list",
            items: [
              { vi: "<b>1.</b> Xác định tải: P<sub>r</sub>, M<sub>rx</sub>, M<sub>ry</sub> (bao gồm hiệu ứng bậc hai).", en: "<b>1.</b> Determine loads: P<sub>r</sub>, M<sub>rx</sub>, M<sub>ry</sub> from the analysis (including second-order effects)." },
              { vi: "<b>2.</b> Chọn tiết diện thử: H-shape, trục khoẻ theo phương ngang.", en: "<b>2.</b> Select a trial section: H-shape with the strong axis oriented transversely." },
              { vi: "<b>3.</b> Tính P<sub>c</sub>: dựa trên KL<sub>x</sub>/r<sub>x</sub> và KL<sub>y</sub>/r<sub>y</sub> — dùng P<sub>n</sub> nhỏ hơn.", en: "<b>3.</b> Calculate P<sub>c</sub>: based on KL<sub>x</sub>/r<sub>x</sub> and KL<sub>y</sub>/r<sub>y</sub> — use the smaller P<sub>n</sub>." },
              { vi: "<b>4.</b> Tính M<sub>cx</sub>: dựa trên L<sub>b</sub> (chiều dài không giằng cho LTB).", en: "<b>4.</b> Calculate M<sub>cx</sub>: based on L<sub>b</sub> (the unbraced length for LTB)." },
              { vi: "<b>5.</b> Tính M<sub>cy</sub>: khả năng uốn trục yếu.", en: "<b>5.</b> Calculate M<sub>cy</sub>: the weak-axis bending capacity." },
              { vi: "<b>6.</b> Kiểm tra H1-1a hoặc H1-1b: tỷ số tương tác ≤ 1.0.", en: "<b>6.</b> Check H1-1a or H1-1b: interaction ratio ≤ 1.0." },
              { vi: "<b>7.</b> Lặp lại nếu tỷ số &gt; 1.0 hoặc &lt; 0.6 (tối ưu).", en: "<b>7.</b> Iterate if the ratio is &gt; 1.0 or &lt; 0.6 (optimise)." }
            ]
          }
        ]
      },
      {
        heading: { vi: "Tóm tắt Part 1", en: "Part 1 summary" },
        body: [
          {
            type: "table",
            head: [{ vi: "#", en: "#" }, { vi: "Nội dung", en: "Content" }, { vi: "Từ khoá", en: "Keyword" }],
            rows: [
              [{ vi: "1", en: "1" }, { vi: "Pipe rack = non-building, tải ngang thường chi phối", en: "Pipe rack = non-building structure, lateral loads often govern" }, { vi: "<b>Non-Building</b>", en: "<b>Non-Building</b>" }],
              [{ vi: "2", en: "2" }, { vi: "Ngang = khung moment, Dọc = khung giằng", en: "Transverse = moment frame, longitudinal = braced frame" }, { vi: "<b>Two Systems</b>", en: "<b>Two Systems</b>" }],
              [{ vi: "3", en: "3" }, { vi: "Ma sát nhiệt là tải trọng ĐẶC TRƯNG của pipe rack", en: "Thermal friction is THE signature load of pipe racks" }, { vi: "<b>Ff = μ × W</b>", en: "<b>Ff = μ × W</b>" }],
              [{ vi: "4", en: "4" }, { vi: "Ma sát và gió/động đất KHÔNG tổ hợp đồng thời", en: "Friction and wind/seismic are NOT combined simultaneously" }, { vi: "<b>Exclusive Lateral</b>", en: "<b>Exclusive Lateral</b>" }],
              [{ vi: "5", en: "5" }, { vi: "Gối ống có thể KHÔNG giằng dầm", en: "Pipe supports may NOT brace the beam" }, { vi: "<b>Lb Caution</b>", en: "<b>Lb Caution</b>" }],
              [{ vi: "6", en: "6" }, { vi: "Cột = beam-column, kiểm tra AISC H1-1", en: "Column = beam-column, check AISC H1-1 interaction" }, { vi: "<b>Interaction</b>", en: "<b>Interaction</b>" }],
              [{ vi: "7", en: "7" }, { vi: "Chiều dài không giằng trục yếu thường chi phối", en: "Weak-axis unbraced length often controls" }, { vi: "<b>Weak Axis KL/r</b>", en: "<b>Weak Axis KL/r</b>" }]
            ]
          },
          {
            type: "tip",
            vi: "<b>→ Xem tiếp Phần 2:</b> thiết kế liên kết, base plate, giằng, chi tiết cấu tạo và checklist.",
            en: "<b>→ Continue to Part 2:</b> connection design, base plate, bracing, detailing and the design checklist."
          }
        ]
      }
    ],
    footnote: {
      vi: "Bài viết thuộc series “Hướng dẫn thiết kế kết cấu Công trình Công nghiệp” — Roberto Structural. Nội dung mang tính hướng dẫn kỹ thuật; kỹ sư chịu trách nhiệm kiểm tra và hiệu chỉnh theo điều kiện cụ thể của từng dự án và yêu cầu của tiêu chuẩn áp dụng.",
      en: "Part of the series “Structural design for industrial facilities” — Roberto Structural. The content is technical guidance; the engineer remains responsible for checking and adapting it to the conditions of each project and the requirements of the governing code."
    }
  },

  /* ============================== No. 06 ============================== */
  {
    id: "concrete-slab-on-grade",
    no: "06",
    category: { vi: "Kết cấu BTCT", en: "Reinforced Concrete" },
    date: "2026-08-07",
    readmin: 20,
    title: {
      vi: "Sàn bê tông trên nền đất — Sổ tay thiết kế cho kỹ sư kết cấu",
      en: "Concrete Slab on Grade — A Structural Engineer's Design Handbook"
    },
    excerpt: {
      vi: "Mô hình nền Winkler, bán kính độ cứng tương đối Lr, ba trường hợp tải Westergaard, thiết kế chiều dày, mối nối, dowel và kiểm soát nứt — cẩm nang tra cứu theo ACI 360R, PCA IS195 và TM 5-809-12.",
      en: "The Winkler subgrade model, the radius of relative stiffness, Westergaard's three loading positions, thickness design, joints, dowels and crack control — a reference handbook to ACI 360R, PCA IS195 and TM 5-809-12."
    },
    cover: "Resource/articles/05-slab-on-grade/cover.webp",
    sections: [
      /* ---------- 1 ---------- */
      {
        heading: { vi: "1. Sàn bê tông trên nền đất là gì?", en: "1. What is a concrete slab on grade?" },
        body: [
          {
            type: "list",
            items: [
              { vi: "Bản sàn bê tông đặt <b>trực tiếp trên nền đất</b> (subgrade / subbase).", en: "A concrete slab placed <b>directly on the ground</b> (subgrade / subbase)." },
              { vi: "<b>Không phải</b> thành phần kết cấu chịu lực của toà nhà — là cấu kiện phi kết cấu theo ACI 360.", en: "<b>Not</b> a structural element of the building — it is non-structural per ACI 360." },
              { vi: "Mục đích: tạo bề mặt phẳng, chịu tải trọng vận hành như xe nâng, kệ hàng, tường ngăn.", en: "Its purpose is to provide a flat surface carrying operational loads such as forklifts, racks and partition walls." },
              { vi: "Thiết kế tập trung vào <b>khả năng sử dụng</b>: kiểm soát nứt, cong vênh và độ phẳng mặt.", en: "Design focuses on <b>serviceability</b>: crack control, curling and flatness." }
            ]
          },
          {
            type: "tip",
            vi: "<b>Khác biệt cốt lõi:</b> sàn trên nền đất <b>không phải</b> móng bè. Sàn trên nền đất thiết kế theo ACI 360R, còn móng bè theo ACI 318. Đừng nhầm lẫn hai thứ này.",
            en: "<b>Key distinction:</b> a slab on grade is <b>not</b> a mat foundation. Slabs on grade follow ACI 360R; mat foundations follow ACI 318. Do not confuse the two."
          }
        ]
      },

      /* ---------- 2 ---------- */
      {
        heading: { vi: "2. Mô hình nền Winkler", en: "2. The Winkler subgrade model" },
        body: [
          {
            type: "list",
            items: [
              { vi: "Nền đất được mô hình hoá như <b>hệ lò xo độc lập</b> (dense liquid foundation).", en: "The subgrade is modelled as a <b>system of independent springs</b> (dense liquid foundation)." },
              { vi: "Mỗi điểm trên nền phản ứng tỷ lệ tuyến tính với độ lún: <b>q = k × δ</b>.", en: "Each point reacts linearly with settlement: <b>q = k × δ</b>." },
              { vi: "Mô hình đơn giản nhưng đủ chính xác cho thiết kế thực hành.", en: "The model is simple yet accurate enough for practical design." }
            ]
          },
          { type: "subhead", vi: "Hệ số nền k", en: "Modulus of subgrade reaction, k" },
          {
            vi: "<b>k</b> là áp lực cần thiết để gây ra một đơn vị biến dạng, đơn vị pci (lb/in³) hoặc MN/m³. Xác định bằng thí nghiệm bàn nén hiện trường (tấm Ø750 mm) hoặc ước lượng sơ bộ qua tương quan CBR. Cần nhớ <b>k không phải hằng số</b> — nó phụ thuộc loại đất, độ ẩm và kích thước tấm nén.",
            en: "<b>k</b> is the pressure required to cause one unit of deformation, in pci (lb/in³) or MN/m³. It is measured by a field plate load test (Ø750 mm plate) or estimated from a CBR correlation. Remember that <b>k is not a constant</b> — it depends on soil type, moisture content and plate size."
          },
          {
            type: "table",
            head: [
              { vi: "Loại đất (USCS)", en: "Soil type (USCS)" },
              { vi: "k (pci)", en: "k (pci)" },
              { vi: "k (MN/m³)", en: "k (MN/m³)" },
              { vi: "Ghi chú", en: "Notes" }
            ],
            rows: [
              [{ vi: "Đất hữu cơ (OL, OH, Pt)", en: "Organic soils (OL, OH, Pt)" }, { vi: "25–100", en: "25–100" }, { vi: "7–27", en: "7–27" }, { vi: "Rất yếu, cần cải tạo", en: "Very weak, improvement needed" }],
              [{ vi: "Sét, bùn dẻo cao (CH, MH)", en: "High-plasticity clays/silts (CH, MH)" }, { vi: "50–150", en: "50–150" }, { vi: "14–41", en: "14–41" }, { vi: "Nhạy ẩm, k thay đổi lớn", en: "Moisture-sensitive, k varies widely" }],
              [{ vi: "Sét, bùn dẻo thấp (CL, ML)", en: "Low-plasticity clays/silts (CL, ML)" }, { vi: "50–200", en: "50–200" }, { vi: "14–54", en: "14–54" }, { vi: "Phổ biến nhất", en: "Most common" }],
              [{ vi: "Cát pha sét/bùn (SM, SC)", en: "Silty/clayey sands (SM, SC)" }, { vi: "50–250", en: "50–250" }, { vi: "14–68", en: "14–68" }, { vi: "—", en: "—" }],
              [{ vi: "Cát (SW, SP)", en: "Sands (SW, SP)" }, { vi: "150–400", en: "150–400" }, { vi: "41–109", en: "41–109" }, { vi: "Tốt", en: "Good" }],
              [{ vi: "Sỏi pha sét/bùn (GC, GM)", en: "Silty/clayey gravels (GC, GM)" }, { vi: "200–500", en: "200–500" }, { vi: "54–136", en: "54–136" }, { vi: "—", en: "—" }],
              [{ vi: "Sỏi (GW, GP)", en: "Gravels (GW, GP)" }, { vi: "300–500", en: "300–500" }, { vi: "82–136", en: "82–136" }, { vi: "Rất tốt", en: "Very good" }]
            ]
          },
          {
            type: "tip",
            vi: "<b>Thực hành:</b> luôn chọn k ở điều kiện <b>bão hoà ẩm</b> — trường hợp bất lợi nhất. Đất sét có thể mất 50–70% giá trị k khi bão hoà so với khi khô.",
            en: "<b>In practice:</b> always take k at the <b>saturated</b> condition — the worst case. Clays can lose 50–70% of their k-value when saturated compared with dry."
          }
        ]
      },

      /* ---------- 3 ---------- */
      {
        heading: { vi: "3. Bán kính độ cứng tương đối — thông số then chốt", en: "3. Radius of relative stiffness — the key parameter" },
        body: [
          {
            type: "code",
            vi: "Lr = ⁴√[ E·t³ / ( 12·k·(1 − μ²) ) ]",
            en: "Lr = ⁴√[ E·t³ / ( 12·k·(1 − μ²) ) ]"
          },
          {
            type: "table",
            head: [{ vi: "Ký hiệu", en: "Symbol" }, { vi: "Ý nghĩa", en: "Meaning" }, { vi: "Đơn vị", en: "Unit" }],
            rows: [
              [{ vi: "Lr", en: "Lr" }, { vi: "Bán kính độ cứng tương đối", en: "Radius of relative stiffness" }, { vi: "mm (in)", en: "mm (in)" }],
              [{ vi: "E", en: "E" }, { vi: "Mô đun đàn hồi bê tông", en: "Concrete modulus of elasticity" }, { vi: "MPa (psi)", en: "MPa (psi)" }],
              [{ vi: "t", en: "t" }, { vi: "Chiều dày sàn", en: "Slab thickness" }, { vi: "mm (in)", en: "mm (in)" }],
              [{ vi: "k", en: "k" }, { vi: "Hệ số nền", en: "Modulus of subgrade reaction" }, { vi: "MN/m³ (pci)", en: "MN/m³ (pci)" }],
              [{ vi: "μ", en: "μ" }, { vi: "Hệ số Poisson (≈ 0.15–0.20)", en: "Poisson's ratio (≈ 0.15–0.20)" }, { vi: "—", en: "—" }]
            ]
          },
          {
            vi: "Lr đại diện cho <b>phạm vi ảnh hưởng</b> của tải trọng trên sàn. Lr <b>lớn</b> nghĩa là sàn cứng hơn so với nền, tải phân bố rộng hơn và ứng suất nhỏ hơn. Lr <b>nhỏ</b> nghĩa là sàn mềm so với nền, tải tập trung và ứng suất lớn.",
            en: "Lr represents the <b>zone of influence</b> of a load on the slab. A <b>large</b> Lr means the slab is stiff relative to the subgrade, the load spreads further and stresses are lower. A <b>small</b> Lr means the slab is flexible relative to the subgrade, the load concentrates and stresses are higher."
          },
          {
            type: "tip",
            vi: "<b>Ghi nhớ:</b> tăng chiều dày sàn thì Lr tăng theo luỹ thừa 3/4; tăng k thì Lr giảm. <b>Mọi công thức ứng suất Westergaard đều phụ thuộc vào Lr.</b>",
            en: "<b>Remember:</b> increasing slab thickness raises Lr to the 3/4 power; increasing k lowers it. <b>Every Westergaard stress equation depends on Lr.</b>"
          }
        ]
      },

      /* ---------- 4 ---------- */
      {
        heading: { vi: "4. Lý thuyết Westergaard — ba vị trí tải", en: "4. Westergaard theory — three loading positions" },
        body: [
          {
            type: "figure",
            src: "Resource/articles/05-slab-on-grade/01_westergaard_load_positions.svg",
            caption: { vi: "<b>Hình 1.</b> Ba vị trí đặt tải theo Westergaard: giữa sàn, mép sàn và góc sàn.", en: "<b>Figure 1.</b> Westergaard's three loading positions: interior, edge and corner." }
          },
          { type: "subhead", vi: "Tải giữa sàn (Interior)", en: "Interior loading" },
          {
            type: "list",
            items: [
              { vi: "Tải đặt xa mọi mép và góc sàn.", en: "The load sits far from any edge or corner." },
              { vi: "Ứng suất kéo lớn nhất ở <b>đáy sàn</b>, ngay dưới tải.", en: "Maximum tensile stress is at the <b>bottom</b> of the slab, directly under the load." },
              { vi: "Đây là trường hợp <b>phổ biến nhất</b> trong nhà xưởng — xe nâng, chân kệ hàng.", en: "This is the <b>most common</b> case in industrial buildings — forklifts and rack posts." }
            ]
          },
          {
            type: "code",
            vi: "fb = [ 3P(1+μ) / (2π·t²) ] × [ ln(2Lr/b) + 0.5 − γ ]\n\nP = tải tập trung          γ ≈ 0.5772 (hằng số Euler)\nb = bán kính tương đương vùng chịu lực\n  khi a &lt; 1.724t :  b = √(1.6a² + t²) − 0.675t\n  khi a ≥ 1.724t :  b = a",
            en: "fb = [ 3P(1+μ) / (2π·t²) ] × [ ln(2Lr/b) + 0.5 − γ ]\n\nP = concentrated load      γ ≈ 0.5772 (Euler's constant)\nb = equivalent radius of the resisting section\n  when a &lt; 1.724t :  b = √(1.6a² + t²) − 0.675t\n  when a ≥ 1.724t :  b = a"
          },
          { type: "subhead", vi: "Tải mép và tải góc", en: "Edge and corner loading" },
          {
            type: "list",
            items: [
              { vi: "<b>Tải mép:</b> đặt trên mép sàn nhưng xa góc. Ứng suất kéo <b>lớn hơn</b> tải giữa sàn vì mất gối đỡ một phía — cần kiểm tra riêng.", en: "<b>Edge loading:</b> on the slab edge but away from corners. Tensile stress is <b>higher</b> than interior loading because support is lost on one side — check it separately." },
              { vi: "<b>Tải góc:</b> ứng suất kéo lớn nhất nằm ở <b>mặt trên</b> sàn — ngược với hai trường hợp kia.", en: "<b>Corner loading:</b> the maximum tensile stress is at the <b>top</b> of the slab — the opposite of the other two cases." }
            ]
          },
          {
            type: "code",
            vi: "Tải góc:   fc = [ 3P / t² ] × [ 1 − (a√2 / Lr)^0.6 ]",
            en: "Corner:    fc = [ 3P / t² ] × [ 1 − (a√2 / Lr)^0.6 ]"
          },
          {
            type: "tip",
            vi: "<b>Lưu ý thiết kế:</b> tải giữa sàn thường là trường hợp khống chế cho sàn nhà xưởng. Nhưng đừng bỏ qua tải mép và tải góc — đặc biệt khi mối nối <b>không có dowel</b> truyền tải.",
            en: "<b>Design note:</b> interior loading usually governs for industrial slabs. But do not skip the edge and corner checks — especially where joints have <b>no dowels</b> to transfer load."
          }
        ]
      },

      /* ---------- 5 ---------- */
      {
        heading: { vi: "5. Thiết kế chiều dày sàn — phương pháp PCA / ACI 360", en: "5. Slab thickness design — the PCA / ACI 360 method" },
        body: [
          {
            vi: "Phương pháp <b>ứng suất cho phép</b>: tính ứng suất do tải rồi so sánh với ứng suất cho phép, trong đó ứng suất cho phép bằng cường độ kéo uốn chia cho hệ số an toàn.",
            en: "This is an <b>allowable stress</b> approach: compute the applied stress and compare it with the allowable stress, which is the modulus of rupture divided by a factor of safety."
          },
          {
            type: "code",
            vi: "MR = 9 × √f'c      (f'c tính bằng psi)\nMR = 0.75 × √f'c   (f'c tính bằng MPa)\n\nỨng suất cho phép  WS = MR / FoS",
            en: "MR = 9 × √f'c      (f'c in psi)\nMR = 0.75 × √f'c   (f'c in MPa)\n\nAllowable stress   WS = MR / FoS"
          },
          {
            type: "table",
            head: [{ vi: "Điều kiện tải trọng", en: "Loading condition" }, { vi: "FoS khuyến nghị", en: "Recommended FoS" }],
            rows: [
              [{ vi: "Tải không lặp, ít giao thông", en: "Non-repetitive, light traffic" }, { vi: "1.7", en: "1.7" }],
              [{ vi: "Tải lặp vừa phải", en: "Moderate repetition" }, { vi: "1.7–2.0", en: "1.7–2.0" }],
              [{ vi: "Tải nặng, giao thông dày đặc", en: "Heavy loads, dense traffic" }, { vi: "2.0", en: "2.0" }],
              [{ vi: "Tải trọng đặc biệt / quan trọng", en: "Special or critical loads" }, { vi: "&gt; 2.0", en: "&gt; 2.0" }]
            ]
          },
          {
            type: "figure",
            src: "Resource/articles/05-slab-on-grade/02_three_load_cases.svg",
            caption: { vi: "<b>Hình 2.</b> Ba trường hợp tải thiết kế: tải tập trung, tải tường liên tục và tải phân bố đều.", en: "<b>Figure 2.</b> The three design load cases: concentrated, continuous wall and uniform load." }
          },
          { type: "subhead", vi: "Trường hợp 1 — tải tập trung / tải bánh xe", en: "Case 1 — concentrated or wheel load" },
          {
            type: "list",
            items: [
              { vi: "<b>Nguồn:</b> chân kệ hàng, bánh xe nâng, chân máy.", en: "<b>Sources:</b> rack posts, forklift wheels, equipment legs." },
              { vi: "<b>Kiểm tra:</b> uốn theo Westergaard, xuyên thủng, ép cục bộ, và ép mặt dowel nếu gần mối nối.", en: "<b>Checks:</b> Westergaard flexure, punching shear, bearing, and dowel bearing if near a joint." },
              { vi: "<b>Đầu vào:</b> P, diện tích tiếp xúc Ac, f'c, t, k và FoS — trong đó Ac = P / p với p là áp lực lốp hoặc áp lực chân kệ.", en: "<b>Inputs:</b> P, contact area Ac, f'c, t, k and FoS — where Ac = P / p, with p the tyre or post pressure." }
            ]
          },
          { type: "subhead", vi: "Trường hợp 2 — tải tường liên tục", en: "Case 2 — continuous wall load" },
          {
            vi: "Nguồn tải là tường xây trên sàn hoặc vách ngăn. Phương pháp tính là <b>dầm trên nền đàn hồi</b> theo TM 5-809-12, kiểm tra ở hai vị trí: tải gần giữa sàn (hoặc gần mối nối) và tải gần mép tự do.",
            en: "The load comes from masonry or partition walls built on the slab. It is analysed as a <b>beam on elastic foundation</b> per TM 5-809-12, checked at two positions: near the centre (or a joint) and near a free edge."
          },
          { type: "subhead", vi: "Trường hợp 3 — tải phân bố đều", en: "Case 3 — uniform load" },
          {
            vi: "Nguồn tải là hàng hoá xếp chồng hoặc vật liệu tập kết. Điều kiện nguy hiểm nằm ở <b>chiều rộng lối đi</b> giữa hai vùng chất tải: ứng suất lớn nhất xảy ra khi lối đi <b>hẹp</b>, lúc đó sàn chịu uốn ngược.",
            en: "The load comes from stacked goods or stored materials. The critical condition is the <b>aisle width</b> between loaded areas: the maximum stress occurs when the aisle is <b>narrow</b>, where the slab bends in the opposite direction."
          },
          { type: "subhead", vi: "Kiểm tra xuyên thủng và tìm chiều dày tối thiểu", en: "Punching shear and finding the minimum thickness" },
          {
            type: "code",
            vi: "fv = P / (b₀ × t)\n\nb₀ = chu vi mặt cắt nguy hiểm, lấy tại d/2 từ mép tải\nỨng suất cho phép  Fv = 4√f'c (psi)  hoặc  0.33√f'c (MPa)",
            en: "fv = P / (b₀ × t)\n\nb₀ = perimeter of the critical section, taken at d/2 from the load edge\nAllowable stress  Fv = 4√f'c (psi)  or  0.33√f'c (MPa)"
          },
          {
            type: "list",
            items: [
              { vi: "Giả định chiều dày thử t.", en: "Assume a trial thickness t." },
              { vi: "Tính Lr, fb và fv cho từng trường hợp tải.", en: "Compute Lr, fb and fv for each load case." },
              { vi: "So sánh fb ≤ MR/FoS và fv ≤ Fv cho phép.", en: "Check fb ≤ MR/FoS and fv ≤ the allowable Fv." },
              { vi: "Nếu không đạt thì tăng t và lặp lại; <b>t_min</b> là chiều dày nhỏ nhất mà mọi kiểm tra đều đạt.", en: "If a check fails, increase t and repeat; <b>t_min</b> is the smallest thickness at which every check passes." }
            ]
          }
        ]
      },

      /* ---------- 6 ---------- */
      {
        heading: { vi: "6. Thiết kế mối nối", en: "6. Joint design" },
        body: [
          {
            type: "figure",
            src: "Resource/articles/05-slab-on-grade/03_joint_types.svg",
            caption: { vi: "<b>Hình 3.</b> Các loại mối nối trong sàn trên nền đất.", en: "<b>Figure 3.</b> Joint types in a slab on grade." }
          },
          {
            type: "table",
            head: [{ vi: "Loại mối nối", en: "Joint type" }, { vi: "Mục đích", en: "Purpose" }, { vi: "Vị trí", en: "Location" }],
            rows: [
              [{ vi: "<b>Mối co</b> (contraction)", en: "<b>Contraction joint</b>" }, { vi: "Tạo mặt phẳng yếu để kiểm soát vết nứt", en: "Creates a weakened plane to control cracking" }, { vi: "Cắt rãnh sâu 1/4–1/3 chiều dày sàn", en: "Saw cut 1/4–1/3 of the slab depth" }],
              [{ vi: "<b>Mối thi công</b> (construction)", en: "<b>Construction joint</b>" }, { vi: "Ranh giới đổ bê tông theo ngày", en: "Boundary of a day's concrete pour" }, { vi: "Cuối ngày đổ hoặc khi ngắt quãng", en: "End of the pour or a planned break" }],
              [{ vi: "<b>Mối cách ly</b> (isolation)", en: "<b>Isolation joint</b>" }, { vi: "Tách sàn khỏi kết cấu cố định", en: "Separates the slab from fixed structures" }, { vi: "Quanh cột, tường, bệ máy", en: "Around columns, walls and equipment bases" }]
            ]
          },
          { type: "subhead", vi: "Khoảng cách mối nối", en: "Joint spacing" },
          {
            type: "list",
            items: [
              { vi: "Quy tắc kinh nghiệm: <b>L = (24 đến 36) × chiều dày sàn</b>. Sàn 150 mm cho L = 3.6–5.4 m; sàn 200 mm cho L = 4.8–7.2 m.", en: "Rule of thumb: <b>L = (24 to 36) × slab thickness</b>. A 150 mm slab gives L = 3.6–5.4 m; a 200 mm slab gives L = 4.8–7.2 m." },
              { vi: "Ưu tiên panel <b>vuông</b>; nếu chữ nhật thì tỷ lệ dài/rộng không quá 1.5.", en: "Prefer <b>square</b> panels; if rectangular, keep the length-to-width ratio below 1.5." },
              { vi: "Nên căn mối nối trùng với tim cột khi có thể.", en: "Align joints with the column grid where possible." }
            ]
          },
          {
            type: "tip",
            vi: "<b>Sai lầm phổ biến:</b> khoảng cách mối nối quá lớn khiến sàn nứt ngẫu nhiên, không kiểm soát được. Mối nối co phải <b>đủ sâu</b> (≥ t/4) mới tạo được mặt phẳng yếu hiệu quả.",
            en: "<b>A common mistake:</b> joint spacing that is too wide leads to random, uncontrolled cracking. A contraction joint must be <b>deep enough</b> (≥ t/4) to form an effective weakened plane."
          },
          { type: "subhead", vi: "Thanh truyền tải (dowel bar)", en: "Dowel bars" },
          {
            type: "list",
            items: [
              { vi: "<b>Mục đích:</b> truyền tải trọng đứng qua mối nối và chống chênh lệch cao độ giữa hai tấm.", en: "<b>Purpose:</b> transfer vertical load across the joint and prevent faulting between panels." },
              { vi: "Dùng thanh <b>tròn, trơn</b>; <b>một nửa</b> thanh phải bọc chống dính để mối nối co giãn được.", en: "Use a <b>smooth round</b> bar; <b>one half</b> must be debonded so the joint can open and close." },
              { vi: "Đường kính thường lấy ≈ t/8 (khoảng 20–25 mm cho sàn 150–200 mm).", en: "The diameter is typically ≈ t/8 (about 20–25 mm for a 150–200 mm slab)." },
              { vi: "Chiều dài 400–500 mm, mỗi bên nhô ra 200–250 mm; khoảng cách 300 mm.", en: "Length 400–500 mm with 200–250 mm projecting each side; spacing 300 mm." }
            ]
          },
          {
            type: "code",
            vi: "Ứng suất ép mặt dowel:  fb,dowel = P_dowel / (d × t_eff)\nCho phép (Friberg/PCA):  Fb,allow = (4/3 − d/3t) × f'c",
            en: "Dowel bearing stress:   fb,dowel = P_dowel / (d × t_eff)\nAllowable (Friberg/PCA): Fb,allow = (4/3 − d/3t) × f'c"
          }
        ]
      },

      /* ---------- 7 ---------- */
      {
        heading: { vi: "7. Cốt thép và kiểm soát nứt", en: "7. Reinforcement and crack control" },
        body: [
          {
            type: "tip",
            vi: "<b>Điều quan trọng nhất cần hiểu:</b> cốt thép trong sàn trên nền đất <b>không ngăn được nứt</b> — nó chỉ <b>giữ vết nứt khít lại</b>. Sàn không cốt thép hoàn toàn hợp lệ nếu bố trí đủ mối nối.",
            en: "<b>The most important thing to understand:</b> reinforcement in a slab on grade <b>does not prevent cracking</b> — it only <b>keeps cracks tight</b>. An unreinforced slab is perfectly valid when enough joints are provided."
          },
          {
            vi: "Cốt thép trở nên cần thiết khi khoảng cách mối nối lớn, khi có yêu cầu kiểm soát bề rộng vết nứt, hoặc khi chênh lệch nhiệt độ lớn.",
            en: "Reinforcement becomes necessary when joint spacing is large, when crack width must be controlled, or when the temperature differential is significant."
          },
          { type: "subhead", vi: "Cốt thép co ngót và nhiệt độ", en: "Shrinkage and temperature reinforcement" },
          {
            type: "code",
            vi: "As = ( f × L × W × t × γ ) / ( 2 × fs )",
            en: "As = ( f × L × W × t × γ ) / ( 2 × fs )"
          },
          {
            type: "table",
            head: [{ vi: "Ký hiệu", en: "Symbol" }, { vi: "Ý nghĩa", en: "Meaning" }],
            rows: [
              [{ vi: "f", en: "f" }, { vi: "Hệ số ma sát sàn – nền (1.0–2.5, thường ≈ 1.5)", en: "Slab-to-subgrade friction coefficient (1.0–2.5, typically ≈ 1.5)" }],
              [{ vi: "L", en: "L" }, { vi: "Khoảng cách giữa hai mối nối", en: "Distance between joints" }],
              [{ vi: "W", en: "W" }, { vi: "Trọng lượng riêng bê tông (≈ 2400 kg/m³)", en: "Concrete unit weight (≈ 2400 kg/m³)" }],
              [{ vi: "t", en: "t" }, { vi: "Chiều dày sàn", en: "Slab thickness" }],
              [{ vi: "γ", en: "γ" }, { vi: "Hệ số, bằng 1 nếu bố trí một lớp thép giữa sàn", en: "Factor, equal to 1 for a single layer at mid-depth" }],
              [{ vi: "fs", en: "fs" }, { vi: "Ứng suất cho phép của cốt thép (thường 0.67fy)", en: "Allowable steel stress (typically 0.67fy)" }]
            ]
          },
          {
            type: "list",
            items: [
              { vi: "Cốt thép kiểm soát nứt đặt ở <b>1/3 trên</b> chiều dày sàn.", en: "Crack-control reinforcement is placed in the <b>upper third</b> of the slab depth." },
              { vi: "<b>Không</b> cho thép có gờ xuyên qua mối nối co — nó sẽ ngăn mối nối hoạt động và làm sàn nứt ở chỗ khác.", en: "<b>Do not</b> run deformed bars through a contraction joint — it stops the joint working and moves the crack elsewhere." },
              { vi: "Bề rộng vết nứt ước tính theo <b>w = ε × L_joint / 2</b>, trong đó ε gồm co ngót khô và co do nhiệt.", en: "Crack width is estimated as <b>w = ε × L_joint / 2</b>, where ε combines drying shrinkage and thermal contraction." }
            ]
          }
        ]
      },

      /* ---------- 8 ---------- */
      {
        heading: { vi: "8. Chuẩn bị nền và hiện tượng cong vênh", en: "8. Subgrade preparation and curling" },
        body: [
          {
            type: "figure",
            src: "Resource/articles/05-slab-on-grade/04_subgrade_system.svg",
            caption: { vi: "<b>Hình 4.</b> Hệ thống các lớp nền dưới sàn bê tông.", en: "<b>Figure 4.</b> The layer system beneath a concrete slab on grade." }
          },
          {
            type: "list",
            items: [
              { vi: "<b>Subgrade:</b> phải đầm chặt và đồng đều; loại bỏ đất yếu và đất hữu cơ.", en: "<b>Subgrade:</b> must be compacted and uniform; remove weak and organic soils." },
              { vi: "<b>Subbase:</b> lớp cát hoặc đá dăm dày 100–150 mm để phân bố tải, thoát nước và tạo mặt bằng thi công.", en: "<b>Subbase:</b> 100–150 mm of sand or crushed stone to spread load, drain water and provide a working platform." },
              { vi: "<b>Màng chắn ẩm:</b> lớp PE dày ≥ 0.15 mm dưới sàn để ngăn ẩm từ đất lên.", en: "<b>Vapour barrier:</b> a PE film ≥ 0.15 mm beneath the slab to stop moisture rising from the ground." },
              { vi: "<b>Lớp giảm ma sát:</b> giảm ma sát sàn – nền, qua đó giảm ứng suất co ngót.", en: "<b>Slip membrane:</b> reduces slab-to-subgrade friction and therefore shrinkage stress." }
            ]
          },
          {
            type: "tip",
            vi: "<b>Mẹo thực hành:</b> nền không đều là sàn nứt. Đầu tư vào chuẩn bị nền <b>luôn rẻ hơn</b> sửa sàn bị nứt hoặc lún sau này.",
            en: "<b>Practical tip:</b> an uneven subgrade means a cracked slab. Investing in subgrade preparation is <b>always cheaper</b> than repairing a cracked or settled slab later."
          },
          { type: "subhead", vi: "Cong vênh (curling) và cách giảm thiểu", en: "Curling and how to reduce it" },
          {
            vi: "Mép sàn <b>cong lên</b> do chênh lệch ẩm và nhiệt giữa mặt trên và đáy: mặt trên khô nhanh rồi co ngót trong khi mặt dưới còn ẩm. Hậu quả là mất tiếp xúc với nền ở mép và góc, tải dồn về đó và gây nứt.",
            en: "Slab edges <b>curl upward</b> because of moisture and temperature gradients between top and bottom: the top dries and shrinks faster while the underside stays damp. The slab then loses contact with the subgrade at edges and corners, load concentrates there and cracking follows."
          },
          {
            type: "list",
            items: [
              { vi: "Giảm tỷ lệ nước / xi măng để giảm co ngót.", en: "Reduce the water–cement ratio to reduce shrinkage." },
              { vi: "Dùng cốt liệu thô kích thước lớn nhất có thể để giảm lượng nước.", en: "Use the largest practical aggregate size to reduce water demand." },
              { vi: "Bảo dưỡng đúng cách, tối thiểu 7 ngày, để giảm chênh lệch ẩm.", en: "Cure properly for at least seven days to reduce the moisture gradient." },
              { vi: "Bố trí khoảng cách mối nối hợp lý để giảm kích thước panel.", en: "Keep joint spacing sensible so panels stay small." },
              { vi: "Bố trí cốt thép mặt trên để kiểm soát nứt do cong vênh.", en: "Provide top reinforcement to control curling cracks." }
            ]
          }
        ]
      },

      /* ---------- 9 ---------- */
      {
        heading: { vi: "9. Bảng tra nhanh", en: "9. Quick reference tables" },
        body: [
          { type: "subhead", vi: "Tính chất bê tông", en: "Concrete properties" },
          {
            type: "table",
            head: [{ vi: "Thông số", en: "Property" }, { vi: "Công thức", en: "Formula" }, { vi: "Ví dụ f'c = 35 MPa", en: "Example, f'c = 35 MPa" }],
            rows: [
              [{ vi: "Cường độ kéo uốn (MR)", en: "Modulus of rupture (MR)" }, { vi: "0.75√f'c (MPa)", en: "0.75√f'c (MPa)" }, { vi: "4.44 MPa", en: "4.44 MPa" }],
              [{ vi: "Mô đun đàn hồi (Ec)", en: "Elastic modulus (Ec)" }, { vi: "4700√f'c (MPa)", en: "4700√f'c (MPa)" }, { vi: "27 800 MPa", en: "27,800 MPa" }],
              [{ vi: "Hệ số Poisson (μ)", en: "Poisson's ratio (μ)" }, { vi: "0.15–0.20", en: "0.15–0.20" }, { vi: "0.15", en: "0.15" }]
            ]
          },
          { type: "subhead", vi: "Hệ số an toàn và ứng suất làm việc", en: "Factor of safety and working stress" },
          {
            type: "table",
            head: [{ vi: "Tình huống", en: "Scenario" }, { vi: "FoS", en: "FoS" }, { vi: "WS = MR/FoS", en: "WS = MR/FoS" }],
            rows: [
              [{ vi: "Kệ hàng nhẹ, ít xe nâng", en: "Light racking, few forklifts" }, { vi: "1.7", en: "1.7" }, { vi: "2.61 MPa", en: "2.61 MPa" }],
              [{ vi: "Nhà xưởng tiêu chuẩn", en: "Standard warehouse" }, { vi: "1.8", en: "1.8" }, { vi: "2.47 MPa", en: "2.47 MPa" }],
              [{ vi: "Kho hàng nặng, xe nâng liên tục", en: "Heavy warehouse, continuous forklift traffic" }, { vi: "2.0", en: "2.0" }, { vi: "2.22 MPa", en: "2.22 MPa" }]
            ]
          },
          { type: "subhead", vi: "Chiều dày sàn điển hình", en: "Typical slab thickness" },
          {
            type: "table",
            head: [{ vi: "Ứng dụng", en: "Application" }, { vi: "Chiều dày (mm)", en: "Thickness (mm)" }, { vi: "Chiều dày (in)", en: "Thickness (in)" }],
            rows: [
              [{ vi: "Sàn nhà ở, tải nhẹ", en: "Residential, light use" }, { vi: "100–125", en: "100–125" }, { vi: "4–5", en: "4–5" }],
              [{ vi: "Sàn thương mại, văn phòng", en: "Commercial, office" }, { vi: "125–150", en: "125–150" }, { vi: "5–6", en: "5–6" }],
              [{ vi: "Nhà xưởng nhẹ", en: "Light industrial" }, { vi: "150–175", en: "150–175" }, { vi: "6–7", en: "6–7" }],
              [{ vi: "Nhà xưởng nặng", en: "Heavy industrial" }, { vi: "175–250", en: "175–250" }, { vi: "7–10", en: "7–10" }],
              [{ vi: "Kho hàng, xe nâng nặng", en: "Warehouse, heavy forklifts" }, { vi: "200–300", en: "200–300" }, { vi: "8–12", en: "8–12" }]
            ]
          }
        ]
      },

      /* ---------- 10 ---------- */
      {
        heading: { vi: "10. Checklist thiết kế từ A đến Z", en: "10. Design checklist from A to Z" },
        body: [
          { type: "subhead", vi: "Khảo sát và dữ liệu đầu vào", en: "Survey and input data" },
          {
            type: "checklist",
            items: [
              { vi: "Có báo cáo địa chất: loại đất, giá trị k, mực nước ngầm?", en: "Geotechnical report available: soil type, k-value, groundwater level?" },
              { vi: "Đã xác định tải trọng vận hành: xe nâng (P, Ac), kệ hàng, tường?", en: "Operational loads defined: forklifts (P, Ac), rack posts, walls?" },
              { vi: "Có yêu cầu độ phẳng (FF/FL)?", en: "Flatness requirements (FF/FL) specified?" },
              { vi: "Đã xét điều kiện môi trường: chênh lệch nhiệt độ, độ ẩm?", en: "Environmental conditions considered: temperature differential, moisture?" }
            ]
          },
          { type: "subhead", vi: "Giai đoạn thiết kế", en: "Design phase" },
          {
            type: "checklist",
            items: [
              { vi: "Đã chọn f'c và tính MR, Ec?", en: "f'c selected and MR, Ec calculated?" },
              { vi: "Đã xác định giá trị k bằng thí nghiệm hoặc bảng tra?", en: "k-value determined by test or lookup table?" },
              { vi: "Đã tính bán kính độ cứng tương đối Lr?", en: "Radius of relative stiffness Lr calculated?" },
              { vi: "Đã kiểm tra uốn cho cả ba trường hợp tải?", en: "Flexure checked for all three load cases?" },
              { vi: "Đã kiểm tra xuyên thủng và ép cục bộ?", en: "Punching shear and bearing checked?" },
              { vi: "Đã xác định chiều dày tối thiểu t_min?", en: "Minimum thickness t_min determined?" },
              { vi: "Đã thiết kế mối nối: vị trí, khoảng cách, loại?", en: "Joints designed: location, spacing, type?" },
              { vi: "Đã thiết kế dowel nếu cần?", en: "Dowel bars designed where needed?" },
              { vi: "Đã tính cốt thép co ngót / nhiệt độ và kiểm tra bề rộng vết nứt?", en: "Shrinkage/temperature reinforcement calculated and crack width checked?" }
            ]
          },
          { type: "subhead", vi: "Giai đoạn thi công", en: "Construction phase" },
          {
            type: "checklist",
            items: [
              { vi: "Nền đã đầm chặt và đồng đều?", en: "Subgrade compacted and uniform?" },
              { vi: "Lớp subbase đã thi công đúng chiều dày?", en: "Subbase placed to the correct thickness?" },
              { vi: "Đã trải màng chắn ẩm?", en: "Vapour barrier installed?" },
              { vi: "Cốt thép hoặc lưới thép đặt đúng vị trí 1/3 trên?", en: "Reinforcement or mesh placed correctly in the upper third?" },
              { vi: "Dowel đặt đúng và đã bọc chống dính một phía?", en: "Dowels placed correctly and debonded on one side?" },
              { vi: "Bê tông đổ đúng độ sụt và đúng cấp f'c?", en: "Concrete placed at the correct slump and grade?" },
              { vi: "Mối nối co cắt đúng thời điểm (4–12 giờ sau khi đổ)?", en: "Contraction joints cut at the right time (4–12 hours after placement)?" },
              { vi: "Đã bảo dưỡng tối thiểu 7 ngày?", en: "Cured for at least seven days?" }
            ]
          }
        ]
      },

      /* ---------- 11 ---------- */
      {
        heading: { vi: "11. Hệ thống tiêu chuẩn liên quan", en: "11. Related standards" },
        body: [
          {
            type: "table",
            head: [{ vi: "Tiêu chuẩn", en: "Standard" }, { vi: "Phạm vi", en: "Scope" }, { vi: "Kỹ sư cần biết", en: "What engineers need to know" }],
            rows: [
              [{ vi: "<b>ACI 360R</b>", en: "<b>ACI 360R</b>" }, { vi: "Thiết kế sàn trên nền đất", en: "Slab on grade design" }, { vi: "Tài liệu chính — phương pháp, công thức, chi tiết cấu tạo", en: "The primary reference — methods, formulas and detailing" }],
              [{ vi: "<b>ACI 318</b>", en: "<b>ACI 318</b>" }, { vi: "Thiết kế kết cấu bê tông", en: "Structural concrete design" }, { vi: "Chỉ áp dụng khi sàn là cấu kiện chịu lực", en: "Applies only when the slab is a structural element" }],
              [{ vi: "<b>ACI 302.1R</b>", en: "<b>ACI 302.1R</b>" }, { vi: "Thi công sàn bê tông", en: "Concrete floor construction" }, { vi: "Yêu cầu thi công, bảo dưỡng và độ phẳng", en: "Construction, curing and flatness requirements" }],
              [{ vi: "<b>PCA IS195</b>", en: "<b>PCA IS195</b>" }, { vi: "Thiết kế chiều dày sàn công nghiệp", en: "Industrial floor thickness design" }, { vi: "Biểu đồ tra và bảng tính PCA", en: "PCA design charts and tables" }],
              [{ vi: "<b>TM 5-809-12</b>", en: "<b>TM 5-809-12</b>" }, { vi: "Sàn bê tông chịu tải nặng", en: "Heavy-load concrete floor slabs" }, { vi: "Tải tường, tải phân bố đều và bảng tra", en: "Wall load, uniform load and lookup tables" }],
              [{ vi: "<b>Westergaard (1926)</b>", en: "<b>Westergaard (1926)</b>" }, { vi: "Lý thuyết bản trên nền đàn hồi", en: "Elastic plate on elastic foundation" }, { vi: "Công thức gốc cho tải giữa, mép và góc sàn", en: "The original equations for interior, edge and corner loading" }]
            ]
          }
        ]
      },

      /* ---------- Công cụ hỗ trợ ---------- */
      {
        heading: { vi: "Công cụ tính toán hỗ trợ", en: "Supporting design tools" },
        body: [
          {
            type: "tip",
            vi: "<b>GRDS — Concrete Slab on Grade Design</b> là phần mềm tính toán chuyên dụng giúp kỹ sư thiết kế sàn nền bê tông theo lý thuyết Westergaard. Công cụ này tự động hoá các bước tính toán nặng (Lr, ứng suất bending, độ võng) cho ba vị trí tải điển hình, từ đó giúp bạn nhanh chóng tìm ra chiều dày sàn, kích thước joint và bố trí cốt thép phù hợp.",
            en: "<b>GRDS — Concrete Slab on Grade Design</b> is a specialized design software that helps engineers compute slab thickness, stress and deflection using Westergaard theory. It automates the heavy lifting for interior, edge and corner loading positions, allowing you to quickly converge on thickness, joint spacing and reinforcement layout."
          },
          {
            type: "tip",
            vi: "Xem chi tiết phần mềm: <a href=\"tool-grds-slab-on-grade.html\" style=\"font-weight:600;text-decoration:underline;color:var(--accent)\">tại đây</a>",
            en: "See details software: <a href=\"tool-grds-slab-on-grade.html\" style=\"font-weight:600;text-decoration:underline;color:var(--accent)\">here</a>"
          }
        ]
      },

      /* ---------- Kết ---------- */
      {
        heading: { vi: "Kết — mười điều cần nhớ", en: "Closing — ten things to remember" },
        body: [
          {
            type: "table",
            head: [{ vi: "Nội dung", en: "Content" }, { vi: "Từ khoá", en: "Keyword" }],
            rows: [
              [{ vi: "Nền là hệ lò xo Winkler, q = k × δ", en: "The subgrade is a Winkler spring system, q = k × δ" }, { vi: "<b>Winkler k</b>", en: "<b>Winkler k</b>" }],
              [{ vi: "Lr là thông số then chốt của mọi công thức", en: "Lr is the key parameter behind every formula" }, { vi: "<b>Lr</b>", en: "<b>Lr</b>" }],
              [{ vi: "Ba vị trí tải: giữa sàn, mép sàn, góc sàn", en: "Three loading positions: interior, edge, corner" }, { vi: "<b>3 Positions</b>", en: "<b>3 Positions</b>" }],
              [{ vi: "Tải giữa sàn thường là trường hợp khống chế", en: "Interior loading usually governs" }, { vi: "<b>Interior Governs</b>", en: "<b>Interior Governs</b>" }],
              [{ vi: "Ứng suất làm việc bằng MR chia hệ số an toàn 1.7–2.0", en: "Working stress is MR divided by a factor of 1.7–2.0" }, { vi: "<b>Working Stress</b>", en: "<b>Working Stress</b>" }],
              [{ vi: "MR = 9√f'c (psi) hoặc 0.75√f'c (MPa)", en: "MR = 9√f'c (psi) or 0.75√f'c (MPa)" }, { vi: "<b>MR</b>", en: "<b>MR</b>" }],
              [{ vi: "Mối nối cách nhau 24–36 lần chiều dày, panel vuông", en: "Joints at 24–36 times the thickness, square panels" }, { vi: "<b>Joint Spacing</b>", en: "<b>Joint Spacing</b>" }],
              [{ vi: "Dowel phải tròn, trơn và bọc chống dính một phía", en: "Dowels must be round, smooth and debonded on one side" }, { vi: "<b>Dowel Bar</b>", en: "<b>Dowel Bar</b>" }],
              [{ vi: "Cốt thép không ngăn nứt, chỉ giữ vết nứt khít", en: "Reinforcement does not prevent cracks, it only keeps them tight" }, { vi: "<b>Crack Control</b>", en: "<b>Crack Control</b>" }],
              [{ vi: "Nền đều là sàn tốt — đầu tư vào nền luôn xứng đáng", en: "A uniform subgrade makes a good slab — investing there always pays" }, { vi: "<b>Subgrade First</b>", en: "<b>Subgrade First</b>" }]
            ]
          }
        ]
      }
    ],
    footnote: {
      vi: "Bài viết thuộc series \"Hướng dẫn thiết kế kết cấu Công trình Công nghiệp\" — Roberto Structural. Nội dung mang tính hướng dẫn kỹ thuật; kỹ sư chịu trách nhiệm kiểm tra và hiệu chỉnh theo điều kiện cụ thể của từng dự án và yêu cầu của tiêu chuẩn áp dụng.",
      en: "Part of the series \"Structural design for industrial facilities\" — Roberto Structural. The content is technical guidance; the engineer remains responsible for checking and adapting it to the conditions of each project and the requirements of the governing code."
    }
  },

  /* ===================== No. 04 — Welding, part 1 of 2 ===================== */
  {
    id: "welding-structural-steel",
    no: "04",
    category: { vi: "Kết cấu thép", en: "Steel Structures" },
    date: "2026-08-07",
    readmin: 13,
    title: {
      vi: "Đường hàn trong kết cấu thép — Phần 1: Phân loại, ký hiệu và yêu cầu thiết kế",
      en: "Welding in Structural Steel — Part 1: Classification, Symbols and Design Requirements"
    },
    excerpt: {
      vi: "Phần 1 của sổ tay đường hàn: phân biệt fillet — groove — plug/slot, đọc và ghi ký hiệu theo AWS A2.4, tra giới hạn kích thước tối thiểu và tối đa theo AISC 360 và AWS D1.1.",
      en: "Part 1 of the welding handbook: telling fillet, groove and plug/slot welds apart, reading and writing AWS A2.4 symbols, and the minimum and maximum size limits of AISC 360 and AWS D1.1."
    },
    cover: "Resource/articles/04-welding/cover.webp",
    sections: [
      /* ---------- 1 ---------- */
      {
        heading: { vi: "1. Tại sao kỹ sư cần hiểu về đường hàn?", en: "1. Why must engineers understand welding?" },
        body: [
          {
            type: "list",
            items: [
              { vi: "Đường hàn là <b>mắt xích truyền lực</b> giữa các cấu kiện thép.", en: "Welds are the <b>load-transfer links</b> between structural steel members." },
              { vi: "Một mối hàn sai — toàn bộ liên kết có thể mất khả năng chịu lực.", en: "One defective weld and the entire connection may lose its capacity." }
            ]
          },
          {
            vi: "Kỹ sư thiết kế <b>không cần biết hàn</b>, nhưng <b>bắt buộc phải biết</b>: chọn đúng loại đường hàn, ghi đúng ký hiệu trên bản vẽ, xác định đúng kích thước và chiều dài hiệu dụng, và hiểu các giới hạn cho phép của tiêu chuẩn.",
            en: "Design engineers <b>don't need to know how to weld</b>, but they <b>must know how to</b>: select the right weld type, specify correct symbols on drawings, determine proper size and effective length, and understand the code limits and acceptance criteria."
          },
          {
            type: "tip",
            vi: "<b>Nguyên tắc:</b> bản vẽ thiết kế phải truyền đạt <b>100% ý đồ</b> của kỹ sư — không để thợ hàn phải “đoán”. Mọi thông tin cần thiết đều nằm trong <b>ký hiệu hàn (Welding Symbol)</b>.",
            en: "<b>Principle:</b> design drawings must convey <b>100% of the engineer's intent</b> — never leave the welder guessing. All necessary information belongs in the <b>Welding Symbol</b>."
          }
        ]
      },

      /* ---------- 2 ---------- */
      {
        heading: { vi: "2. Phân loại các loại đường hàn", en: "2. Weld type classification" },
        body: [
          { type: "subhead", vi: "2.1 Đường hàn góc (Fillet Weld) — phổ biến nhất", en: "2.1 Fillet weld — the most common" },
          {
            type: "list",
            items: [
              { vi: "Tiết diện <b>tam giác</b>, nối hai bề mặt vuông góc hoặc gần vuông góc.", en: "<b>Triangular</b> cross-section, joining two surfaces at or near right angles." },
              { vi: "Ứng dụng: mối nối chữ T, mối nối chồng (lap joint), mối nối góc.", en: "Applications: T-joints, lap joints, corner joints." },
              { vi: "<b>Ưu điểm:</b> dễ thi công, không cần vát mép, chi phí thấp.", en: "<b>Advantages:</b> easy to fabricate, no edge preparation, low cost." },
              { vi: "<b>Nhược điểm:</b> khả năng chịu lực phụ thuộc vào chiều cao throat hiệu dụng.", en: "<b>Disadvantage:</b> capacity depends on the effective throat dimension." }
            ]
          },
          {
            type: "code",
            vi: "Chiều cao throat hiệu dụng  te  = 0.707 × kích thước cạnh hàn (w)\nDiện tích hiệu dụng        Awe = te × chiều dài hiệu dụng (L)",
            en: "Effective throat  te  = 0.707 × leg size (w)\nEffective area    Awe = te × effective length (L)"
          },
          {
            type: "figure",
            src: "Resource/articles/04-welding/01_fillet_weld_anatomy.svg",
            caption: { vi: "<b>Hình 1.</b> Giải phẫu đường hàn góc — phân biệt kích thước cạnh (leg) và throat hiệu dụng.", en: "<b>Figure 1.</b> Fillet weld anatomy — leg size versus effective throat." }
          },
          {
            type: "tip",
            vi: "<b>Ghi nhớ:</b> với đường hàn góc, <b>kích thước cạnh hàn</b> là thứ ghi trên bản vẽ, nhưng <b>throat hiệu dụng</b> mới là thông số dùng để tính cường độ.",
            en: "<b>Remember:</b> for fillet welds the <b>leg size</b> is what you specify on drawings, but the <b>effective throat</b> is what governs strength calculations."
          },

          { type: "subhead", vi: "2.2 Đường hàn rãnh (Groove Weld)", en: "2.2 Groove weld" },
          {
            vi: "Nối hai cấu kiện <b>trong cùng mặt phẳng</b> (butt joint), yêu cầu vát mép.",
            en: "Joins two members <b>in the same plane</b> (butt joint) and requires edge preparation."
          },
          {
            type: "list",
            items: [
              { vi: "<b>CJP — hàn ngấu hoàn toàn:</b> kim loại hàn xuyên suốt toàn bộ chiều dày. Dùng cho liên kết moment, nối cột, kết cấu chịu động đất. <b>Cường độ thiết kế = cường độ kim loại cơ bản</b> → không cần kiểm tra đường hàn riêng nếu dùng que hàn phù hợp.", en: "<b>CJP — complete joint penetration:</b> weld metal penetrates the full thickness. Used for moment connections, column splices and seismic detailing. <b>Design strength = base metal strength</b> → no separate weld check with matching filler metal." },
              { vi: "<b>PJP — hàn ngấu một phần:</b> kim loại hàn không xuyên hết chiều dày. Chiều sâu hiệu dụng phụ thuộc góc vát, quy trình và vị trí hàn. Dùng cho liên kết chịu nén, liên kết không cần phát triển toàn bộ cường độ.", en: "<b>PJP — partial joint penetration:</b> weld metal does not penetrate the full thickness. Effective depth depends on groove angle, process and position. Used for compression connections and non-critical joints." }
            ]
          },
          {
            type: "table",
            head: [
              { vi: "Ký hiệu", en: "Symbol" },
              { vi: "Dạng rãnh", en: "Groove type" },
              { vi: "Ghi chú", en: "Notes" }
            ],
            rows: [
              [{ vi: "V", en: "V" }, { vi: "Chữ V", en: "V-groove" }, { vi: "Vát 2 phía, phổ biến nhất", en: "Both sides beveled, most common" }],
              [{ vi: "Bevel", en: "Bevel" }, { vi: "Vát 1 phía", en: "Single bevel" }, { vi: "Một tấm vát, tấm kia thẳng", en: "One plate beveled, the other square" }],
              [{ vi: "U", en: "U" }, { vi: "Chữ U", en: "U-groove" }, { vi: "Giảm lượng kim loại hàn cho tấm dày", en: "Reduces weld volume for thick plates" }],
              [{ vi: "J", en: "J" }, { vi: "Chữ J", en: "J-groove" }, { vi: "Tương tự U nhưng 1 phía", en: "Similar to U, single side" }],
              [{ vi: "Square", en: "Square" }, { vi: "Vuông", en: "Square" }, { vi: "Không vát, dùng cho tấm mỏng", en: "No preparation, thin plates only" }],
              [{ vi: "Flare-V", en: "Flare-V" }, { vi: "V loe", en: "Flare-V" }, { vi: "Cho tiết diện tròn/cong", en: "For round or curved sections" }],
              [{ vi: "Flare-Bevel", en: "Flare-Bevel" }, { vi: "Bevel loe", en: "Flare-bevel" }, { vi: "Cho 1 mặt cong + 1 mặt phẳng", en: "One curved and one flat surface" }]
            ]
          },
          {
            type: "figure",
            src: "Resource/articles/04-welding/02_groove_weld_types.svg",
            caption: { vi: "<b>Hình 2.</b> So sánh CJP và PJP, cùng các dạng rãnh hàn phổ biến.", en: "<b>Figure 2.</b> CJP versus PJP, and the common groove types." }
          },

          { type: "subhead", vi: "2.3 Hàn nút (Plug) và hàn rãnh dài (Slot)", en: "2.3 Plug and slot welds" },
          {
            type: "list",
            items: [
              { vi: "<b>Plug weld:</b> hàn qua lỗ tròn trên tấm phủ, nối với tấm bên dưới.", en: "<b>Plug weld:</b> welding through a circular hole in the cover plate to the plate below." },
              { vi: "<b>Slot weld:</b> tương tự nhưng lỗ hình chữ nhật.", en: "<b>Slot weld:</b> the same concept with a rectangular, elongated hole." },
              { vi: "Mục đích chính là <b>truyền lực cắt</b>, chống tách lớp — <b>không</b> dùng để chịu kéo trực tiếp.", en: "Their purpose is <b>shear transfer</b> and preventing separation — they are <b>not</b> used for direct tension." }
            ]
          }
        ]
      },

      /* ---------- 3 ---------- */
      {
        heading: { vi: "3. Ký hiệu đường hàn theo AWS A2.4", en: "3. Welding symbols per AWS A2.4" },
        body: [
          {
            type: "table",
            head: [{ vi: "Thuật ngữ", en: "Term" }, { vi: "Ý nghĩa", en: "Meaning" }],
            rows: [
              [{ vi: "<b>Weld Symbol</b>", en: "<b>Weld Symbol</b>" }, { vi: "Biểu tượng nhỏ thể hiện <b>loại hàn</b> (tam giác = fillet, chữ V = groove…)", en: "The small graphic showing the <b>weld type</b> (triangle = fillet, V = groove…)" }],
              [{ vi: "<b>Welding Symbol</b>", en: "<b>Welding Symbol</b>" }, { vi: "<b>Toàn bộ ký hiệu</b>: đường tham chiếu, mũi tên, biểu tượng hàn, kích thước, đuôi, ký hiệu bổ sung", en: "The <b>complete symbol</b>: reference line, arrow, weld symbol, dimensions, tail and supplementary symbols" }]
            ]
          },
          {
            type: "tip",
            vi: "<b>Sai lầm phổ biến:</b> nhầm “Weld Symbol” với “Welding Symbol”. Hai khái niệm khác nhau hoàn toàn — Weld Symbol chỉ là một phần nhỏ nằm trong Welding Symbol.",
            en: "<b>Common mistake:</b> confusing “Weld Symbol” with “Welding Symbol”. They are entirely different — a Weld Symbol is just one small part of the complete Welding Symbol."
          },
          {
            type: "figure",
            src: "Resource/articles/04-welding/04_basic_weld_symbols.svg",
            caption: { vi: "<b>Hình 3.</b> Bảng ký hiệu cơ bản của các loại đường hàn.", en: "<b>Figure 3.</b> Basic weld symbols chart." }
          },

          { type: "subhead", vi: "Tám thành phần của một Welding Symbol", en: "The eight components of a welding symbol" },
          {
            type: "list",
            items: [
              { vi: "<b>Reference Line</b> — nền tảng, mọi thông tin đặt trên hoặc dưới đường này.", en: "<b>Reference line</b> — the foundation; all information sits above or below it." },
              { vi: "<b>Arrow</b> — chỉ đến vị trí mối nối cần hàn.", en: "<b>Arrow</b> — points to the joint to be welded." },
              { vi: "<b>Weld Symbol</b> — biểu tượng loại hàn.", en: "<b>Weld symbol</b> — the graphic for the weld type." },
              { vi: "<b>Dimensions</b> — bên <b>trái</b> là kích thước, bên <b>phải</b> là chiều dài và bước hàn.", en: "<b>Dimensions</b> — size on the <b>left</b>, length and pitch on the <b>right</b>." },
              { vi: "<b>Tail</b> — ghi quy trình hàn (SMAW, GMAW…) hoặc số WPS.", en: "<b>Tail</b> — process (SMAW, GMAW…) or WPS number." },
              { vi: "<b>Supplementary Symbols</b> — ký hiệu biên dạng và hoàn thiện.", en: "<b>Supplementary symbols</b> — contour and finish." },
              { vi: "<b>Finish Symbol</b> — G = mài, M = gia công cơ, C = đục.", en: "<b>Finish symbol</b> — G = grinding, M = machining, C = chipping." },
              { vi: "<b>Contour Symbol</b> — phẳng (flush), lồi (convex), lõm (concave).", en: "<b>Contour symbol</b> — flush, convex or concave." }
            ]
          },
          {
            type: "figure",
            src: "Resource/articles/04-welding/03_welding_symbol_anatomy.svg",
            caption: { vi: "<b>Hình 4.</b> Tám thành phần của Welding Symbol theo AWS A2.4-2007.", en: "<b>Figure 4.</b> The eight components of a welding symbol per AWS A2.4-2007." }
          },

          { type: "subhead", vi: "Quy tắc Arrow Side / Other Side", en: "The Arrow Side / Other Side rule" },
          {
            type: "list",
            items: [
              { vi: "<b>Arrow Side</b> — phía mũi tên chỉ vào → ký hiệu đặt <b>DƯỚI</b> đường tham chiếu.", en: "<b>Arrow side</b> — the side the arrow points to → symbol placed <b>BELOW</b> the reference line." },
              { vi: "<b>Other Side</b> — phía đối diện mũi tên → ký hiệu đặt <b>TRÊN</b> đường tham chiếu.", en: "<b>Other side</b> — the side opposite the arrow → symbol placed <b>ABOVE</b> the reference line." },
              { vi: "<b>Both Sides</b> — ký hiệu đặt cả trên và dưới.", en: "<b>Both sides</b> — symbols placed above and below." }
            ]
          },
          {
            type: "tip",
            vi: "<b>Lỗi thường gặp nhất trên bản vẽ:</b> đặt sai vị trí ký hiệu so với đường tham chiếu → thợ hàn sẽ hàn <b>sai phía</b>. Luôn kiểm tra trước khi phát hành.",
            en: "<b>The most common drawing error:</b> placing the symbol on the wrong side of the reference line → the welder welds the <b>wrong side</b>. Always verify before issuing."
          },
          {
            type: "table",
            head: [{ vi: "Ký hiệu", en: "Symbol" }, { vi: "Tên gọi", en: "Name" }, { vi: "Ý nghĩa", en: "Meaning" }],
            rows: [
              [{ vi: "○ trên giao điểm", en: "○ at the intersection" }, { vi: "Weld-All-Around", en: "Weld-all-around" }, { vi: "Hàn vòng quanh toàn bộ chu vi", en: "Weld the entire perimeter" }],
              [{ vi: "⚑ (cờ)", en: "⚑ (flag)" }, { vi: "Field Weld", en: "Field weld" }, { vi: "Hàn tại công trường, không phải tại xưởng", en: "Welded on site, not in the shop" }],
              [{ vi: "▬ (chữ nhật)", en: "▬ (rectangle)" }, { vi: "Backing", en: "Backing" }, { vi: "Dùng tấm lót phía sau mối hàn", en: "A backing bar is used behind the weld" }],
              [{ vi: "◑ (bán nguyệt đen)", en: "◑ (half-filled circle)" }, { vi: "Melt-Through", en: "Melt-through" }, { vi: "Yêu cầu hàn ngấu xuyên, nhìn thấy phía sau", en: "The weld must penetrate and be visible from the back" }],
              [{ vi: "─── (gạch ngang)", en: "─── (dash)" }, { vi: "Spacer", en: "Spacer" }, { vi: "Miếng đệm giữa hai tấm", en: "A spacer plate between the members" }]
            ]
          }
        ]
      },

      /* ---------- 4 ---------- */
      {
        heading: { vi: "4. Yêu cầu kích thước theo AISC 360 & AWS D1.1", en: "4. Size requirements per AISC 360 & AWS D1.1" },
        body: [
          { type: "subhead", vi: "Kích thước tối thiểu đường hàn góc", en: "Minimum fillet weld size" },
          {
            vi: "Theo <b>AISC 360, Bảng J2.4</b> — tra theo chiều dày tấm <b>mỏng hơn</b>:",
            en: "Per <b>AISC 360, Table J2.4</b> — based on the <b>thinner</b> plate:"
          },
          {
            type: "table",
            head: [{ vi: "Chiều dày tấm mỏng hơn (t)", en: "Thinner plate thickness (t)" }, { vi: "Kích thước hàn góc tối thiểu", en: "Minimum fillet size" }],
            rows: [
              [{ vi: "t ≤ 6 mm (1/4\")", en: "t ≤ 6 mm (1/4\")" }, { vi: "3 mm (1/8\")", en: "3 mm (1/8\")" }],
              [{ vi: "6 &lt; t ≤ 13 mm (1/2\")", en: "6 &lt; t ≤ 13 mm (1/2\")" }, { vi: "5 mm (3/16\")", en: "5 mm (3/16\")" }],
              [{ vi: "13 &lt; t ≤ 19 mm (3/4\")", en: "13 &lt; t ≤ 19 mm (3/4\")" }, { vi: "6 mm (1/4\")", en: "6 mm (1/4\")" }],
              [{ vi: "t &gt; 19 mm (3/4\")", en: "t &gt; 19 mm (3/4\")" }, { vi: "8 mm (5/16\")", en: "8 mm (5/16\")" }]
            ]
          },
          {
            type: "figure",
            src: "Resource/articles/04-welding/05_min_fillet_size_table.svg",
            caption: { vi: "<b>Hình 5.</b> Bảng tra kích thước tối thiểu của đường hàn góc.", en: "<b>Figure 5.</b> Minimum fillet weld size lookup table." }
          },
          {
            type: "tip",
            vi: "<b>Mẹo thực hành:</b> kích thước hàn tối thiểu <b>không cần vượt quá</b> chiều dày tấm mỏng hơn. Tấm 5 mm nối tấm 25 mm → hàn tối thiểu 3 mm (theo t = 5 mm), không phải 8 mm.",
            en: "<b>Practical tip:</b> the minimum weld size <b>need not exceed</b> the thinner plate. A 5 mm plate to a 25 mm plate → minimum weld 3 mm (based on t = 5 mm), not 8 mm."
          },

          { type: "subhead", vi: "Kích thước tối đa và chiều dài hiệu dụng", en: "Maximum size and effective length" },
          {
            type: "list",
            items: [
              { vi: "<b>Kích thước tối đa:</b> tấm &lt; 6 mm → bằng chiều dày tấm; tấm ≥ 6 mm → chiều dày tấm trừ 2 mm. Lý do: tránh nung chảy và khía mép tấm thép.", en: "<b>Maximum size:</b> plate &lt; 6 mm → equal to the plate thickness; plate ≥ 6 mm → thickness minus 2 mm. The reason is to avoid melting or notching the plate edge." },
              { vi: "<b>Chiều dài tối thiểu:</b> ≥ 4 lần kích thước cạnh hàn (4w) và không nhỏ hơn 38 mm.", en: "<b>Minimum length:</b> ≥ 4 × leg size (4w) and not less than 38 mm." },
              { vi: "<b>Hàn gián đoạn:</b> mỗi đoạn ≥ 4w, bước hàn phải ghi rõ trên bản vẽ.", en: "<b>Intermittent welds:</b> each segment ≥ 4w, and the pitch must be noted on the drawing." },
              { vi: "<b>Hàn quay đầu (return/boxing):</b> bắt buộc cho mối nối chồng chịu kéo — quấn quanh đầu tấm ≥ 2w.", en: "<b>Return/boxing:</b> required for lap joints in tension — wrap around the end ≥ 2w." }
            ]
          },

          { type: "subhead", vi: "Throat hiệu dụng của đường hàn rãnh PJP", en: "Effective throat for PJP groove welds" },
          {
            vi: "Chiều sâu hiệu dụng của PJP phụ thuộc vào góc vát rãnh, quy trình hàn và vị trí hàn.",
            en: "The effective depth of a PJP weld depends on the groove angle, the welding process and the welding position."
          },
          {
            type: "table",
            head: [{ vi: "Góc vát rãnh (θ)", en: "Groove angle (θ)" }, { vi: "Effective throat", en: "Effective throat" }],
            rows: [
              [{ vi: "θ ≥ 60°", en: "θ ≥ 60°" }, { vi: "Bằng chiều sâu rãnh (D)", en: "Groove depth (D)" }],
              [{ vi: "45° ≤ θ &lt; 60° (SMAW/GMAW)", en: "45° ≤ θ &lt; 60° (SMAW/GMAW)" }, { vi: "D − 3 mm (1/8\")", en: "D − 3 mm (1/8\")" }],
              [{ vi: "θ &lt; 45°", en: "θ &lt; 45°" }, { vi: "Phải qualification bằng PQR", en: "Must be qualified by PQR" }]
            ]
          }
        ]
      },

      /* ---------- 5 ---------- */
      {
        heading: { vi: "5. Chọn nhanh loại đường hàn", en: "5. Weld type selection guide" },
        body: [
          {
            type: "table",
            head: [{ vi: "Tình huống thiết kế", en: "Design scenario" }, { vi: "Loại hàn đề xuất", en: "Recommended weld" }],
            rows: [
              [{ vi: "Dầm – cột (liên kết moment)", en: "Beam–column (moment connection)" }, { vi: "CJP groove ở cánh, fillet ở bụng", en: "CJP groove at the flanges, fillet at the web" }],
              [{ vi: "Bản mã (gusset plate) – dầm/cột", en: "Gusset plate to beam or column" }, { vi: "Fillet weld", en: "Fillet weld" }],
              [{ vi: "Nối cột — chịu nén", en: "Column splice — compression" }, { vi: "PJP groove weld", en: "PJP groove weld" }],
              [{ vi: "Nối cột — vùng động đất", en: "Column splice — seismic zone" }, { vi: "CJP groove weld", en: "CJP groove weld" }],
              [{ vi: "Sườn gia cường (stiffener)", en: "Stiffener" }, { vi: "Fillet weld", en: "Fillet weld" }],
              [{ vi: "Bản đế cột (base plate)", en: "Base plate" }, { vi: "Fillet weld hoặc PJP", en: "Fillet weld or PJP" }],
              [{ vi: "Liên kết ống HSS", en: "HSS tube connection" }, { vi: "CJP hoặc PJP tùy tải trọng", en: "CJP or PJP depending on the load" }],
              [{ vi: "Chống tách lớp tấm chồng", en: "Preventing delamination in a lap" }, { vi: "Plug hoặc slot weld", en: "Plug or slot weld" }]
            ]
          },
          { type: "subhead", vi: "Checklist trước khi phát hành bản vẽ", en: "Pre-issue drawing checklist" },
          {
            type: "checklist",
            items: [
              { vi: "Đã ghi <b>loại đường hàn</b> (fillet / groove / plug)?", en: "<b>Weld type</b> specified (fillet / groove / plug)?" },
              { vi: "Đã ghi <b>kích thước</b> (leg size hoặc groove depth)?", en: "<b>Size</b> noted (leg size or groove depth)?" },
              { vi: "Đã ghi <b>chiều dài</b> — liên tục hay gián đoạn?", en: "<b>Length</b> indicated — continuous or intermittent?" },
              { vi: "Ký hiệu đặt đúng <b>Arrow Side / Other Side</b>?", en: "Symbol placed on the correct <b>arrow side / other side</b>?" },
              { vi: "Kích thước hàn ≥ giá trị tối thiểu và ≤ giá trị tối đa?", en: "Size ≥ the minimum and ≤ the maximum?" },
              { vi: "Đã chỉ định <b>CJP hay PJP</b> cho groove weld?", en: "<b>CJP or PJP</b> specified for groove welds?" },
              { vi: "Đã phân biệt <b>hàn xưởng / hàn công trường</b>?", en: "<b>Shop weld or field weld</b> clearly identified?" },
              { vi: "<b>Tail</b> có ghi chú WPS hoặc quy trình đặc biệt?", en: "Does the <b>tail</b> carry the WPS or special process note?" },
              { vi: "Đã review với nhóm chế tạo / lắp dựng trước khi phát hành?", en: "Reviewed with the fabrication and erection team before release?" }
            ]
          }
        ]
      },

      /* ---------- Tóm tắt phần 1 ---------- */
      {
        heading: { vi: "Tóm tắt Phần 1", en: "Part 1 summary" },
        body: [
          {
            type: "table",
            head: [{ vi: "Nội dung", en: "Content" }, { vi: "Từ khoá", en: "Keyword" }],
            rows: [
              [{ vi: "Fillet weld phổ biến nhất, throat = 0.707 × cạnh hàn", en: "Fillet weld is the most common; throat = 0.707 × leg" }, { vi: "<b>te = 0.707w</b>", en: "<b>te = 0.707w</b>" }],
              [{ vi: "CJP phát triển toàn bộ cường độ, PJP chỉ một phần", en: "CJP develops full strength, PJP only partial" }, { vi: "<b>CJP vs PJP</b>", en: "<b>CJP vs PJP</b>" }],
              [{ vi: "Dưới đường tham chiếu là Arrow Side, trên là Other Side", en: "Below the reference line is arrow side, above is other side" }, { vi: "<b>Arrow / Other</b>", en: "<b>Arrow / Other</b>" }],
              [{ vi: "Kích thước tối thiểu tra theo tấm mỏng hơn (Table J2.4)", en: "Minimum size follows the thinner plate (Table J2.4)" }, { vi: "<b>Min Size</b>", en: "<b>Min Size</b>" }],
              [{ vi: "Kích thước tối đa = chiều dày − 2 mm (tấm ≥ 6 mm)", en: "Maximum size = thickness − 2 mm (plate ≥ 6 mm)" }, { vi: "<b>Max Size</b>", en: "<b>Max Size</b>" }],
              [{ vi: "Chiều dài tối thiểu ≥ 4w và ≥ 38 mm", en: "Minimum length ≥ 4w and ≥ 38 mm" }, { vi: "<b>Min Length</b>", en: "<b>Min Length</b>" }],
              [{ vi: "Phân biệt Weld Symbol ≠ Welding Symbol", en: "Weld symbol ≠ welding symbol" }, { vi: "<b>Symbol ≠ Full Symbol</b>", en: "<b>Symbol ≠ Full Symbol</b>" }],
              [{ vi: "Luôn chạy checklist trước khi phát hành bản vẽ", en: "Always run the checklist before issuing drawings" }, { vi: "<b>QA / QC</b>", en: "<b>QA / QC</b>" }]
            ]
          },
          {
            type: "tip",
            vi: "<b>Đọc tiếp Phần 2</b> — <a href='article-welding-procedures-inspection-vi.html'>Quy trình hàn, kiểm tra nghiệm thu &amp; mẹo thực hành</a>: WPS / PQR / WPQ, bốn phương pháp NDT, mười lỗi phổ biến nhất và checklist tổng hợp cho dự án.",
            en: "<b>Continue to Part 2</b> — <a href='article-welding-procedures-inspection.html'>Procedures, Inspection &amp; Practical Tips</a>: WPS / PQR / WPQ, the four NDT methods, the ten most common errors and a full project checklist."
          }
        ]
      }
    ],
    footnote: {
      vi: "Bài viết thuộc series \"Hướng dẫn thiết kế kết cấu Công trình Công nghiệp\" — Roberto Structural. Nội dung mang tính hướng dẫn kỹ thuật; kỹ sư chịu trách nhiệm kiểm tra và hiệu chỉnh theo điều kiện cụ thể của từng dự án và yêu cầu của tiêu chuẩn áp dụng. Tiêu chuẩn thay đổi theo thời gian — luôn kiểm tra phiên bản mới nhất của AWS D1.1, AISC 360 và AWS A2.4 trước khi áp dụng.",
      en: "Part of the series \"Structural design for industrial facilities\" — Roberto Structural. The content is technical guidance; the engineer remains responsible for checking and adapting it to the conditions of each project and the requirements of the governing code. Standards evolve — always check the latest editions of AWS D1.1, AISC 360 and AWS A2.4 before applying them."
    }
  },

  /* ===================== No. 05 — Welding, part 2 of 2 ===================== */
  {
    id: "welding-procedures-inspection",
    no: "05",
    category: { vi: "Kết cấu thép", en: "Steel Structures" },
    date: "2026-08-07",
    readmin: 12,
    title: {
      vi: "Đường hàn trong kết cấu thép — Phần 2: Quy trình hàn, kiểm tra nghiệm thu và mẹo thực hành",
      en: "Welding in Structural Steel — Part 2: Procedures, Inspection and Practical Tips"
    },
    excerpt: {
      vi: "Phần 2 của sổ tay đường hàn: WPS — PQR — WPQ là gì và ai chịu trách nhiệm, bốn phương pháp kiểm tra không phá huỷ, mười lỗi phổ biến nhất và checklist nghiệm thu cho dự án.",
      en: "Part 2 of the welding handbook: what WPS, PQR and WPQ are and who owns them, the four non-destructive testing methods, the ten most common errors and a project acceptance checklist."
    },
    cover: "Resource/articles/04-welding/cover-part2.webp",
    sections: [
      /* ---------- mở đầu ---------- */
      {
        heading: { vi: "Trước khi bắt đầu", en: "Before you start" },
        body: [
          {
            type: "tip",
            vi: "Đây là <b>Phần 2</b> của sổ tay đường hàn. Nếu bạn chưa nắm phân loại đường hàn, ký hiệu AWS A2.4 và giới hạn kích thước theo AISC 360, hãy đọc <a href='article-welding-structural-steel-vi.html'><b>Phần 1 — Phân loại, ký hiệu &amp; yêu cầu thiết kế</b></a> trước.",
            en: "This is <b>Part 2</b> of the welding handbook. If weld classification, AWS A2.4 symbols and the AISC 360 size limits are not yet familiar, read <a href='article-welding-structural-steel.html'><b>Part 1 — Classification, Symbols &amp; Design Requirements</b></a> first."
          },
          {
            vi: "Phần 1 trả lời câu hỏi <b>“ghi gì lên bản vẽ”</b>. Phần 2 trả lời câu hỏi khó hơn: <b>“làm sao biết mối hàn ngoài công trường đúng như bản vẽ”</b> — từ hồ sơ quy trình, năng lực thợ hàn, cho tới kiểm tra và nghiệm thu.",
            en: "Part 1 answers the question <b>“what do I put on the drawing?”</b>. Part 2 answers the harder one: <b>“how do I know the weld in the field matches the drawing?”</b> — from procedure records and welder qualification through to inspection and acceptance."
          }
        ]
      },

      /* ---------- 1 ---------- */
      {
        heading: { vi: "1. Quy trình hàn — WPS, PQR và WPQ", en: "1. Welding procedures — WPS, PQR and WPQ" },
        body: [
          {
            type: "table",
            head: [{ vi: "Viết tắt", en: "Abbreviation" }, { vi: "Tên đầy đủ", en: "Full name" }, { vi: "Vai trò", en: "Role" }],
            rows: [
              [{ vi: "<b>WPS</b>", en: "<b>WPS</b>" }, { vi: "Welding Procedure Specification", en: "Welding Procedure Specification" }, { vi: "<b>“Công thức nấu ăn”</b> — hướng dẫn chi tiết cách hàn", en: "<b>“The recipe”</b> — detailed instructions on how to weld" }],
              [{ vi: "<b>PQR</b>", en: "<b>PQR</b>" }, { vi: "Procedure Qualification Record", en: "Procedure Qualification Record" }, { vi: "<b>“Bài kiểm tra”</b> — chứng minh WPS hoạt động đúng", en: "<b>“The test”</b> — proves the WPS actually works" }],
              [{ vi: "<b>WPQ</b>", en: "<b>WPQ</b>" }, { vi: "Welder Performance Qualification", en: "Welder Performance Qualification" }, { vi: "<b>“Bằng lái”</b> — chứng nhận thợ hàn đủ năng lực", en: "<b>“The licence”</b> — certifies the welder is capable" }]
            ]
          },
          {
            type: "tip",
            vi: "<b>Quy tắc bất di bất dịch:</b> không có WPS → không được hàn. Không có ngoại lệ.",
            en: "<b>Absolute rule:</b> no WPS → no welding. No exceptions."
          },
          {
            type: "figure",
            src: "Resource/articles/04-welding/06_wps_pqr_wpq_relationship.svg",
            caption: { vi: "<b>Hình 6.</b> Quan hệ giữa WPS, PQR và WPQ.", en: "<b>Figure 6.</b> The relationship between WPS, PQR and WPQ." }
          },

          { type: "subhead", vi: "Prequalified WPS — đường tắt hợp lệ", en: "Prequalified WPS — the legal shortcut" },
          {
            vi: "AWS D1.1 cho phép dùng <b>Prequalified WPS</b> mà <b>không cần</b> thử nghiệm PQR, nếu thỏa mãn <b>TẤT CẢ</b> năm điều kiện sau:",
            en: "AWS D1.1 allows a <b>prequalified WPS</b> <b>without</b> PQR testing, provided <b>ALL</b> five conditions are met:"
          },
          {
            type: "list",
            items: [
              { vi: "<b>Quy trình hàn được phép:</b> SMAW, GMAW (chỉ chế độ Spray Transfer), FCAW, SAW. GMAW-Short Circuit <b>không</b> được prequalify.", en: "<b>Approved processes:</b> SMAW, GMAW (spray transfer only), FCAW, SAW. GMAW short-circuit is <b>not</b> prequalifiable." },
              { vi: "<b>Vật liệu cơ bản</b> thuộc nhóm prequalified (Group I–IV, Bảng 5.3).", en: "<b>Base metal</b> in a prequalified group (Groups I–IV, Table 5.3)." },
              { vi: "<b>Que hàn / dây hàn phù hợp</b> theo Bảng 5.4.", en: "<b>Matching filler metal</b> per Table 5.4." },
              { vi: "<b>Chi tiết mối nối</b> đúng theo hình prequalified (Figures 5.1–5.4).", en: "<b>Joint details</b> complying with the prequalified figures (5.1–5.4)." },
              { vi: "<b>Thông số</b> nằm trong giới hạn: nhiệt độ gia nhiệt trước, nhiệt độ giữa các lớp, dòng, áp và tốc độ hàn.", en: "<b>Parameters</b> within limits: preheat, interpass temperature, current, voltage and travel speed." }
            ]
          },
          {
            type: "tip",
            vi: "<b>Prequalified ≠ “thoải mái làm gì cũng được”.</b> Vi phạm <b>bất kỳ điều kiện nào</b> → WPS phải được qualification bằng PQR. Ví dụ sai phổ biến: dùng GMAW-Short Circuit rồi ghi “Prequalified”.",
            en: "<b>Prequalified ≠ “anything goes”.</b> Break <b>any single condition</b> and the WPS must be qualified by PQR. A common violation: using GMAW short-circuit and labelling it “prequalified”."
          },
          {
            vi: "Phải qualification bằng PQR khi: mối nối không nằm trong danh sách prequalified; dùng quy trình ngoài bốn loại trên (EGW, ESW…); thông số vượt giới hạn; vật liệu không thuộc nhóm prequalified; hoặc kỹ sư thiết kế yêu cầu.",
            en: "A PQR is required when: the joint is not in the prequalified list; the process is outside those four (EGW, ESW…); parameters exceed the limits; the base metal is not in a prequalified group; or the design engineer requires it."
          }
        ]
      },

      /* ---------- 7 ---------- */
      {
        heading: { vi: "2. Kiểm tra và nghiệm thu đường hàn", en: "2. Weld inspection and acceptance" },
        body: [
          {
            type: "table",
            head: [{ vi: "Phương pháp", en: "Method" }, { vi: "Viết tắt", en: "Abbrev." }, { vi: "Phát hiện", en: "Detects" }, { vi: "Khi nào dùng", en: "When to use" }],
            rows: [
              [{ vi: "Kiểm tra bằng mắt", en: "Visual inspection" }, { vi: "VT", en: "VT" }, { vi: "Khuyết tật bề mặt", en: "Surface defects" }, { vi: "<b>Bắt buộc</b> cho mọi mối hàn", en: "<b>Mandatory</b> for all welds" }],
              [{ vi: "Siêu âm", en: "Ultrasonic testing" }, { vi: "UT", en: "UT" }, { vi: "Khuyết tật bên trong", en: "Internal defects" }, { vi: "CJP groove, tấm dày", en: "CJP groove welds, thick plates" }],
              [{ vi: "Chụp phim", en: "Radiographic testing" }, { vi: "RT", en: "RT" }, { vi: "Khuyết tật bên trong (hình ảnh)", en: "Internal defects (image)" }, { vi: "CJP groove, thay thế UT", en: "CJP groove welds, alternative to UT" }],
              [{ vi: "Bột từ", en: "Magnetic particle" }, { vi: "MT", en: "MT" }, { vi: "Bề mặt và gần bề mặt", en: "Surface and near-surface" }, { vi: "Vật liệu từ tính (thép carbon)", en: "Ferromagnetic materials (carbon steel)" }],
              [{ vi: "Thẩm thấu", en: "Liquid penetrant" }, { vi: "PT", en: "PT" }, { vi: "Khuyết tật bề mặt mở", en: "Open surface defects" }, { vi: "Vật liệu không từ tính (inox)", en: "Non-magnetic materials (stainless)" }]
            ]
          },
          {
            type: "tip",
            vi: "<b>VT là “người gác cổng”:</b> nếu mối hàn không đạt kiểm tra bằng mắt thì <b>không cần</b> kiểm tra thêm bằng UT/RT. Sửa trước, rồi mới tiến hành NDT.",
            en: "<b>VT is the gatekeeper:</b> if a weld fails visual inspection there is <b>no need</b> for UT or RT. Repair first, then proceed with NDT."
          },
          {
            type: "figure",
            src: "Resource/articles/04-welding/08_ndt_methods_flow.svg",
            caption: { vi: "<b>Hình 7.</b> Các phương pháp NDT và trình tự kiểm tra.", en: "<b>Figure 7.</b> NDT methods and the inspection sequence." }
          },

          { type: "subhead", vi: "Tiêu chí nghiệm thu bằng mắt (AWS D1.1, Clause 8)", en: "Visual acceptance criteria (AWS D1.1, Clause 8)" },
          {
            type: "table",
            head: [{ vi: "Khuyết tật", en: "Defect" }, { vi: "Giới hạn cho phép", en: "Allowable limit" }],
            rows: [
              [{ vi: "<b>Nứt (crack)</b>", en: "<b>Crack</b>" }, { vi: "<b>Không chấp nhận</b> — bất kỳ kích thước nào", en: "<b>Not acceptable</b> — any size" }],
              [{ vi: "Chảy tràn (overlap)", en: "Overlap" }, { vi: "Không chấp nhận", en: "Not acceptable" }],
              [{ vi: "Rỗ xốp bề mặt", en: "Surface porosity" }, { vi: "CJP chịu kéo ngang: không cho phép rỗ xốp ống", en: "CJP in transverse tension: no piping porosity allowed" }],
              [{ vi: "Lẹm chân (undercut)", en: "Undercut" }, { vi: "t &lt; 25 mm: ≤ 1 mm · t ≥ 25 mm: ≤ 2 mm", en: "t &lt; 25 mm: ≤ 1 mm · t ≥ 25 mm: ≤ 2 mm" }],
              [{ vi: "Thiếu kích thước / thiếu chiều dài", en: "Undersized or short" }, { vi: "Không chấp nhận", en: "Not acceptable" }]
            ]
          },
          {
            vi: "Với <b>siêu âm (UT)</b>, AWS D1.1 phân loại chỉ thị theo Class A–D dựa trên biên độ tín hiệu và chiều dài chỉ thị: Class A là khuyết tật nghiêm trọng phải loại bỏ, Class D là chỉ thị nhỏ chấp nhận được — tra Bảng 8.2. Với <b>chụp phim (RT)</b>, ưu điểm lớn là tạo được <b>hồ sơ vĩnh viễn</b> bằng phim hoặc ảnh số.",
            en: "For <b>ultrasonic testing</b>, AWS D1.1 classifies indications as Class A–D based on signal amplitude and indication length: Class A is a severe defect and is rejected, Class D is a small acceptable indication — see Table 8.2. For <b>radiography</b>, the key advantage is the <b>permanent record</b> on film or in digital form."
          },
          {
            type: "tip",
            vi: "<b>Bẫy nguy hiểm — quy tắc 48 giờ:</b> thép cường độ cao (A514 và tương đương) phải <b>chờ 48 giờ</b> sau khi hàn mới kiểm tra. Nứt trễ do hydro có thể xuất hiện sau 24–48 giờ; kiểm tra ngay sẽ cho kết quả “Đạt” trong khi thực tế mối hàn sẽ nứt sau đó.",
            en: "<b>A dangerous trap — the 48-hour rule:</b> high-strength steels (A514 and equivalent) must <b>wait 48 hours</b> after welding before inspection. Hydrogen-induced delayed cracking can appear 24–48 hours later; inspecting immediately gives a “pass” for a weld that later cracks."
          },
          {
            type: "figure",
            src: "Resource/articles/04-welding/07_common_weld_defects.svg",
            caption: { vi: "<b>Hình 8.</b> Sáu khuyết tật hàn thường gặp và tiêu chí nghiệm thu.", en: "<b>Figure 8.</b> Six common weld defects and their acceptance criteria." }
          }
        ]
      },

      /* ---------- 8 ---------- */
      {
        heading: { vi: "3. Mười lỗi phổ biến nhất và cách tránh", en: "3. The ten most common errors and how to avoid them" },
        body: [
          { type: "subhead", vi: "Lỗi trong thiết kế", en: "Design errors" },
          {
            type: "table",
            head: [{ vi: "Lỗi", en: "Error" }, { vi: "Hậu quả", en: "Consequence" }, { vi: "Cách tránh", en: "Prevention" }],
            rows: [
              [{ vi: "Không ghi kích thước hàn", en: "No weld size specified" }, { vi: "Thợ hàn tự quyết, mất kiểm soát chất lượng", en: "The welder decides; no quality control" }, { vi: "Luôn ghi size và length trên ký hiệu", en: "Always note size and length on the symbol" }],
              [{ vi: "Nhầm Arrow Side / Other Side", en: "Arrow side and other side reversed" }, { vi: "Hàn sai phía", en: "Weld on the wrong side" }, { vi: "Review bản vẽ bằng checklist", en: "Review drawings against a checklist" }],
              [{ vi: "Ghi CJP nhưng không chỉ định backing", en: "CJP specified without backing information" }, { vi: "Tranh cãi tại công trường, chậm tiến độ", en: "Disputes on site and delays" }, { vi: "Luôn ghi rõ có backing hay không", en: "Always state whether backing is used" }],
              [{ vi: "Bỏ qua giới hạn min/max size", en: "Ignoring the min/max size limits" }, { vi: "Vi phạm tiêu chuẩn, phải làm lại", en: "Code violation and rework" }, { vi: "Tra Bảng J2.4 của AISC 360", en: "Use AISC 360 Table J2.4" }],
              [{ vi: "Không phân biệt hàn xưởng / công trường", en: "No shop or field weld distinction" }, { vi: "Đơn vị lắp dựng không biết trình tự", en: "The erector does not know the sequence" }, { vi: "Dùng ký hiệu Field Weld (⚑)", en: "Use the field weld symbol (⚑)" }]
            ]
          },
          { type: "subhead", vi: "Lỗi trong chế tạo và thi công", en: "Fabrication and erection errors" },
          {
            type: "table",
            head: [{ vi: "Lỗi", en: "Error" }, { vi: "Hậu quả", en: "Consequence" }, { vi: "Cách tránh", en: "Prevention" }],
            rows: [
              [{ vi: "Không vệ sinh bề mặt", en: "No surface cleaning" }, { vi: "Rỗ xốp, thiếu ngấu", en: "Porosity and lack of fusion" }, { vi: "Quy trình làm sạch bắt buộc", en: "A mandatory cleaning procedure" }],
              [{ vi: "Hàn theo “cảm giác”", en: "Welding by feel" }, { vi: "Thông số không ổn định, tỷ lệ loại bỏ cao", en: "Unstable parameters and a high reject rate" }, { vi: "Tuân thủ WPS, kiểm tra trước mỗi mối hàn", en: "Follow the WPS and check before each weld" }],
              [{ vi: "Gia nhiệt trước không đều", en: "Uneven preheat" }, { vi: "Nứt do hydro, vùng HAZ cứng giòn", en: "Hydrogen cracking and a hard HAZ" }, { vi: "Dùng thiết bị gia nhiệt có kiểm soát", en: "Use controlled heating equipment" }],
              [{ vi: "Sai que hàn / dây hàn", en: "Wrong filler metal" }, { vi: "Mối hàn yếu hơn thiết kế", en: "A weld weaker than designed" }, { vi: "Kiểm tra filler metal trước khi phát", en: "Verify the filler metal before issue" }],
              [{ vi: "Fit-up sai", en: "Poor fit-up" }, { vi: "Khe hở gốc quá lớn hoặc quá nhỏ → thiếu ngấu hoặc biến dạng", en: "Root opening too large or too small → lack of fusion or distortion" }, { vi: "Dùng dưỡng kiểm tra, tuân thủ dung sai", en: "Use gauges and comply with tolerances" }]
            ]
          }
        ]
      },

      /* ---------- 9 ---------- */
      {
        heading: { vi: "4. Mẹo thực hành cho kỹ sư thiết kế", en: "4. Practical tips for design engineers" },
        body: [
          { type: "subhead", vi: "Nguyên tắc KISS — Keep It Simple, Structural", en: "The KISS principle — Keep It Simple, Structural" },
          {
            type: "list",
            items: [
              { vi: "<b>Ưu tiên fillet weld</b> bất cứ khi nào có thể — rẻ, dễ và nhanh.", en: "<b>Prefer fillet welds</b> whenever possible — cheaper, easier and faster." },
              { vi: "<b>Chỉ dùng CJP</b> khi thực sự cần phát triển toàn bộ cường độ cấu kiện.", en: "<b>Use CJP</b> only when full member strength is genuinely required." },
              { vi: "<b>PJP</b> là lựa chọn trung gian tốt cho liên kết chịu nén.", en: "<b>PJP</b> is a good mid-range option for compression connections." },
              { vi: "<b>Tránh hàn thừa</b> — tốn vật liệu, tăng biến dạng và ứng suất dư.", en: "<b>Avoid over-welding</b> — it wastes material and increases distortion and residual stress." }
            ]
          },
          { type: "subhead", vi: "Tối ưu chi phí hàn", en: "Weld cost optimisation" },
          {
            vi: "Chi phí hàn góc tỷ lệ với <b>bình phương kích thước cạnh</b>: tăng gấp đôi kích thước hàn là <b>tăng gấp bốn lần</b> lượng vật liệu. Khi cần thêm cường độ, hãy <b>tăng chiều dài</b> thay vì tăng kích thước.",
            en: "Fillet weld cost scales with the <b>square of the leg size</b>: doubling the size means <b>four times</b> the filler material. When more capacity is needed, <b>increase the length</b> rather than the size."
          },
          {
            type: "code",
            vi: "Hàn 1 phía:  w = 12 mm  →  A = 0.5 × 12²     = 72 mm²\nHàn 2 phía:  w = 8 mm × 2 →  A = 2 × (0.5 × 8²) = 64 mm²\n→ tiết kiệm ~11% vật liệu, cường độ tương đương hoặc tốt hơn",
            en: "One side:  w = 12 mm    →  A = 0.5 × 12²     = 72 mm²\nTwo sides: w = 8 mm × 2 →  A = 2 × (0.5 × 8²) = 64 mm²\n→ about 11% material saved, equal or better capacity"
          },
          { type: "subhead", vi: "Lưu ý riêng cho kết cấu chịu động đất", en: "Special attention for seismic design" },
          {
            type: "list",
            items: [
              { vi: "<b>AISC 341</b> khắt khe hơn AISC 360; <b>CJP bắt buộc</b> cho liên kết cánh dầm – cột trong khung moment.", en: "<b>AISC 341</b> is stricter than AISC 360; <b>CJP is mandatory</b> for beam-flange-to-column connections in moment frames." },
              { vi: "<b>Demand Critical Weld</b> yêu cầu: filler metal đạt thử nghiệm độ dai va đập CVN, WPS phải qualified bằng PQR, và NDT 100%.", en: "<b>Demand critical welds</b> require: filler metal passing the CVN toughness test, a WPS qualified by PQR, and 100% NDT." },
              { vi: "<b>Protected Zone</b> — vùng không được hàn bất kỳ chi tiết nào lên đó.", en: "<b>Protected zone</b> — no attachments or welding are permitted within it." }
            ]
          },
          {
            type: "tip",
            vi: "<b>Cảnh báo:</b> dùng Prequalified WPS cho Demand Critical Weld là <b>vi phạm AISC 341</b>. Bắt buộc phải có PQR riêng.",
            en: "<b>Warning:</b> using a prequalified WPS for a demand critical weld <b>violates AISC 341</b>. A separate PQR is mandatory."
          }
        ]
      },

      /* ---------- 10 ---------- */
      {
        heading: { vi: "5. Hệ thống tiêu chuẩn liên quan", en: "5. Related standards" },
        body: [
          {
            type: "table",
            head: [{ vi: "Tiêu chuẩn", en: "Standard" }, { vi: "Phạm vi", en: "Scope" }, { vi: "Kỹ sư cần biết", en: "What engineers need to know" }],
            rows: [
              [{ vi: "<b>AISC 360</b>", en: "<b>AISC 360</b>" }, { vi: "Thiết kế kết cấu thép", en: "Structural steel design" }, { vi: "Chapter J — yêu cầu thiết kế liên kết hàn", en: "Chapter J — welded connection design requirements" }],
              [{ vi: "<b>AISC 341</b>", en: "<b>AISC 341</b>" }, { vi: "Thiết kế chống động đất", en: "Seismic design" }, { vi: "Demand Critical Weld, Protected Zone", en: "Demand critical welds, protected zone" }],
              [{ vi: "<b>AWS D1.1</b>", en: "<b>AWS D1.1</b>" }, { vi: "Quy trình hàn kết cấu thép", en: "Structural steel welding" }, { vi: "WPS/PQR, prequalified, kiểm tra, nghiệm thu", en: "WPS/PQR, prequalified procedures, inspection, acceptance" }],
              [{ vi: "<b>AWS A2.4</b>", en: "<b>AWS A2.4</b>" }, { vi: "Ký hiệu hàn trên bản vẽ", en: "Welding symbols on drawings" }, { vi: "Cách đọc và viết welding symbol", en: "How to read and write welding symbols" }],
              [{ vi: "<b>AWS D1.8</b>", en: "<b>AWS D1.8</b>" }, { vi: "Hàn cho kết cấu chống động đất", en: "Seismic welding supplement" }, { vi: "Bổ sung cho D1.1 trong vùng động đất", en: "Supplements D1.1 for seismic applications" }],
              [{ vi: "<b>ASTM A6</b>", en: "<b>ASTM A6</b>" }, { vi: "Thép hình", en: "Structural steel shapes" }, { vi: "Dung sai, tính chất cơ lý", en: "Tolerances and mechanical properties" }],
              [{ vi: "<b>ASTM A36, A992, A572</b>", en: "<b>ASTM A36, A992, A572</b>" }, { vi: "Mác thép phổ biến", en: "Common steel grades" }, { vi: "Cường độ và khả năng hàn", en: "Strength and weldability" }]
            ]
          }
        ]
      },

      /* ---------- 11 ---------- */
      {
        heading: { vi: "6. Checklist tổng hợp cho dự án", en: "6. Comprehensive project checklist" },
        body: [
          { type: "subhead", vi: "Giai đoạn thiết kế", en: "Design phase" },
          {
            type: "checklist",
            items: [
              { vi: "Đã chọn loại hàn phù hợp cho từng liên kết?", en: "Appropriate weld type selected for each connection?" },
              { vi: "Đã tính kích thước và chiều dài đường hàn?", en: "Weld size and length calculated?" },
              { vi: "Đã kiểm tra min/max size theo AISC 360 Bảng J2.4?", en: "Min/max size verified per AISC 360 Table J2.4?" },
              { vi: "Ký hiệu hàn đầy đủ theo AWS A2.4?", en: "Complete welding symbols per AWS A2.4?" },
              { vi: "Đã phân biệt rõ hàn xưởng và hàn công trường?", en: "Shop and field welds clearly distinguished?" },
              { vi: "Đã xác định yêu cầu NDT (VT, UT, RT, MT, PT)?", en: "NDT requirements specified (VT, UT, RT, MT, PT)?" },
              { vi: "Đã xác định Demand Critical Weld nếu có?", en: "Demand critical welds identified where applicable?" }
            ]
          },
          { type: "subhead", vi: "Giai đoạn chế tạo tại xưởng", en: "Fabrication phase (shop)" },
          {
            type: "checklist",
            items: [
              { vi: "WPS đã được chuẩn bị và phê duyệt?", en: "WPS prepared and approved?" },
              { vi: "Thợ hàn đã có WPQ phù hợp?", en: "Welder holds a valid WPQ?" },
              { vi: "Vật liệu cơ bản và filler metal đúng chủng loại?", en: "Base metal and filler metal verified?" },
              { vi: "Fit-up đạt dung sai?", en: "Fit-up within tolerance?" },
              { vi: "Nhiệt độ gia nhiệt trước và giữa các lớp đúng WPS?", en: "Preheat and interpass temperatures per the WPS?" },
              { vi: "Đã kiểm tra bằng mắt sau mỗi lớp hàn với CJP nhiều lớp?", en: "Visual inspection after each pass for multi-pass CJP?" },
              { vi: "Đã thực hiện NDT sau khi hoàn thành?", en: "NDT performed upon completion?" }
            ]
          },
          { type: "subhead", vi: "Giai đoạn lắp dựng tại công trường", en: "Erection phase (field)" },
          {
            type: "checklist",
            items: [
              { vi: "Hàn công trường có WPS riêng?", en: "Field welds have their own WPS?" },
              { vi: "Điều kiện môi trường cho phép hàn (gió, mưa, nhiệt độ)?", en: "Environmental conditions acceptable (wind, rain, temperature)?" },
              { vi: "Thợ hàn công trường có WPQ cho vị trí hàn yêu cầu?", en: "Field welders hold a WPQ for the required positions?" },
              { vi: "NDT theo đúng tỷ lệ quy định?", en: "NDT carried out at the specified rate?" },
              { vi: "Hồ sơ nghiệm thu đầy đủ?", en: "Acceptance records complete?" }
            ]
          }
        ]
      },

      /* ---------- Kết ---------- */
      {
        heading: { vi: "Kết", en: "Closing" },
        body: [
          {
            vi: "Đường hàn không chỉ là một đường kim loại nóng chảy trên bản vẽ. Nó là <b>ngôn ngữ giao tiếp</b> giữa kỹ sư thiết kế, nhà chế tạo, thợ hàn và thanh tra viên. <b>Hiểu đúng — ghi đúng — kiểm tra đúng</b> chính là kết cấu an toàn.",
            en: "A weld is not just a line of molten metal on a drawing. It is the <b>language of communication</b> between the design engineer, the fabricator, the welder and the inspector. <b>Understand correctly, specify correctly, inspect correctly</b> — that is a safe structure."
          },
          {
            type: "table",
            head: [{ vi: "Điểm cốt lõi", en: "Key point" }, { vi: "Từ khoá", en: "Keyword" }],
            rows: [
              [{ vi: "Fillet phổ biến nhất, throat = 0.707 × cạnh hàn", en: "Fillet is the most common; throat = 0.707 × leg" }, { vi: "<b>te = 0.707w</b>", en: "<b>te = 0.707w</b>" }],
              [{ vi: "CJP phát triển toàn bộ cường độ, PJP chỉ một phần", en: "CJP develops full strength, PJP only part of it" }, { vi: "<b>CJP vs PJP</b>", en: "<b>CJP vs PJP</b>" }],
              [{ vi: "Dưới đường tham chiếu là Arrow Side, trên là Other Side", en: "Below the reference line is arrow side, above is other side" }, { vi: "<b>Arrow / Other</b>", en: "<b>Arrow / Other</b>" }],
              [{ vi: "Kích thước tối thiểu tra theo tấm mỏng hơn", en: "Minimum size follows the thinner plate" }, { vi: "<b>Table J2.4</b>", en: "<b>Table J2.4</b>" }],
              [{ vi: "Không có WPS thì không được hàn", en: "No WPS means no welding" }, { vi: "<b>No WPS = No Weld</b>", en: "<b>No WPS = No Weld</b>" }],
              [{ vi: "Kiểm tra bằng mắt bắt buộc 100% mối hàn", en: "Visual inspection is mandatory on 100% of welds" }, { vi: "<b>VT = Gatekeeper</b>", en: "<b>VT = Gatekeeper</b>" }],
              [{ vi: "Nứt là loại bỏ ngay, mọi trường hợp", en: "A crack is an immediate reject, in every case" }, { vi: "<b>Zero Crack</b>", en: "<b>Zero Crack</b>" }],
              [{ vi: "Thép cường độ cao chờ 48 giờ mới kiểm tra", en: "High-strength steel waits 48 hours before inspection" }, { vi: "<b>48h Rule</b>", en: "<b>48h Rule</b>" }],
              [{ vi: "Chi phí hàn tỷ lệ bình phương kích thước cạnh", en: "Weld cost scales with the square of the leg size" }, { vi: "<b>Cost ∝ w²</b>", en: "<b>Cost ∝ w²</b>" }],
              [{ vi: "Demand Critical Weld phải có PQR riêng", en: "Demand critical welds need their own PQR" }, { vi: "<b>No Prequalified for DCW</b>", en: "<b>No Prequalified for DCW</b>" }]
            ]
          },
          {
            type: "tip",
            vi: "Cần tra lại phân loại đường hàn, ký hiệu AWS A2.4 hay giới hạn kích thước? Xem <a href='article-welding-structural-steel-vi.html'><b>Phần 1 — Phân loại, ký hiệu &amp; yêu cầu thiết kế</b></a>.",
            en: "Need to look up weld classification, AWS A2.4 symbols or the size limits again? See <a href='article-welding-structural-steel.html'><b>Part 1 — Classification, Symbols &amp; Design Requirements</b></a>."
          }
        ]
      }
    ],
    footnote: {
      vi: "Bài viết thuộc series \"Hướng dẫn thiết kế kết cấu Công trình Công nghiệp\" — Roberto Structural. Nội dung mang tính hướng dẫn kỹ thuật; kỹ sư chịu trách nhiệm kiểm tra và hiệu chỉnh theo điều kiện cụ thể của từng dự án và yêu cầu của tiêu chuẩn áp dụng. Tiêu chuẩn thay đổi theo thời gian — luôn kiểm tra phiên bản mới nhất của AWS D1.1, AISC 360 và AWS A2.4 trước khi áp dụng.",
      en: "Part of the series \"Structural design for industrial facilities\" — Roberto Structural. The content is technical guidance; the engineer remains responsible for checking and adapting it to the conditions of each project and the requirements of the governing code. Standards evolve — always check the latest editions of AWS D1.1, AISC 360 and AWS A2.4 before applying them."
    }
  },

  {
    id: "aci318-2nd-order-sap2000",
    no: "03",
    category: { vi: "Mô hình & Phân tích", en: "Modelling & Analysis" },
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

      /* ---------- Công cụ hỗ trợ ---------- */
      {
        heading: { vi: "Công cụ tính toán hỗ trợ", en: "Supporting design tools" },
        body: [
          {
            type: "tip",
            vi: "<b>RC Design Output — SAP2000</b> giúp kỹ sư trích xuất và tổng hợp kết quả thiết kế BTCT từ SAP2000 một cách nhanh chóng, từ đó tạo bảng tính toán chuẩn mực cho hồ sơ dự án. Công cụ này tự động hoá quá trình tính toán các thông số thiết kế từ lực cắt, moment, lực dọc và trích xuất thép dọc + thép cắt theo các tiêu chuẩn phổ biến.",
            en: "<b>RC Design Output — SAP2000</b> helps engineers extract and synthesize RC design results from SAP2000 quickly, producing a standardized calculation sheet for the project documentation. This tool automates the process of computing design parameters from shear, moment, axial force and extracting longitudinal and transverse reinforcement per common codes."
          },
          {
            type: "tip",
            vi: "Xem chi tiết phần mềm: <a href=\"tool-rc-design-output-sap2000.html\" style=\"font-weight:600;text-decoration:underline;color:var(--accent)\">tại đây</a>",
            en: "See details software: <a href=\"tool-rc-design-output-sap2000.html\" style=\"font-weight:600;text-decoration:underline;color:var(--accent)\">here</a>"
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
    ],
    footnote: {
      vi: "Bài viết thuộc series \"Hướng dẫn thiết kế kết cấu Công trình Công nghiệp\" — Roberto Structural. Nội dung mang tính hướng dẫn kỹ thuật; kỹ sư chịu trách nhiệm kiểm tra và hiệu chỉnh theo điều kiện cụ thể của từng dự án và yêu cầu của tiêu chuẩn áp dụng.",
      en: "Part of the series \"Structural design for industrial facilities\" — Roberto Structural. The content is technical guidance; the engineer remains responsible for checking and adapting it to the conditions of each project and the requirements of the governing code."
    }
  }
];
