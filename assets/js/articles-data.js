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
    cover: "Resource/articles/01-deck-slab/fig1.png",
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
            src: "Resource/articles/01-deck-slab/fig1.png",
            caption: { vi: "Cấu tạo sàn deck: tôn định hình, chốt chịu cắt, lưới thép và dầm thép đỡ.", en: "Deck slab anatomy: profiled sheeting, shear studs, wire mesh and supporting steel beam." }
          },
          {
            src: "Resource/articles/01-deck-slab/fig3.png",
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
            src: "Resource/articles/01-deck-slab/fig2.png",
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
            src: "Resource/articles/01-deck-slab/fig4.png",
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
            src: "Resource/articles/01-deck-slab/fig5.png",
            caption: { vi: "Hiện trường: sàn deck đã lắp lưới thép, chờ đổ bê tông — giai đoạn chưa có diaphragm.", en: "On site: deck with mesh in place awaiting the pour — the stage where no diaphragm yet exists." }
          }
        ]
      }
    ]
  }
];
