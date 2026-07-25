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
      the section's "figure" field.
   4. Each section = one heading + paragraphs (vi + en).
      - "heading": { vi, en }
      - "body"   : array of paragraphs; each paragraph is { vi, en }
      - "figure" : optional { src, caption:{vi,en} }  shown after the text
      Use <b>...</b> inside text for bold. Plain text otherwise.
   5. To EDIT an article later, just change the text here — nothing else to touch.
   ============================================================ */

window.ARTICLE_CATEGORIES = [
  { vi: "Kết cấu thép",      en: "Steel Structures" },
  { vi: "Kết cấu BTCT",      en: "Reinforced Concrete" },
  { vi: "Mô hình & Phân tích", en: "Modelling & Analysis" },
  { vi: "Thi công",          en: "Construction" },
  { vi: "Móng thiết bị",     en: "Equipment Foundations" }
];

window.ARTICLES = [
  {
    id: "rc-deck-on-steel-structures",
    no: "01",
    category: { vi: "Kết cấu thép", en: "Steel Structures" },
    date: "2026-07-25",
    readmin: 8,
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
            vi: "Sàn deck dùng tấm tôn định hình làm coffa lưu, bê tông đổ lên trên. Có hai họ khác nhau về bản chất: <b>composite deck</b> (tôn có gân dập embossment, khóa cơ học với bê tông, tôn <i>chính là</i> cốt chịu kéo) và <b>form deck</b> (tôn chỉ làm coffa, cốt thép bố trí riêng).",
            en: "A deck slab uses profiled steel sheeting as permanent formwork with concrete cast on top. Two families differ fundamentally: <b>composite deck</b> (embossed sheeting mechanically interlocked with the concrete, where the sheeting <i>is</i> the tensile reinforcement) and <b>form deck</b> (sheeting as formwork only, with separate rebar)."
          },
          {
            vi: "Ưu điểm khi dùng cho nhà thép: không cần hoặc giảm tối đa giàn giáo chống đỡ; tấm tôn trở thành mặt bằng thi công an toàn ngay khi lắp xong; tốc độ lắp dựng nhanh, đồng bộ với tiến độ dựng thép; sóng tôn rỗng làm giảm tự trọng so với sàn đặc cùng nhịp, và là không gian sẵn có để luồn ống, cáp điện.",
            en: "Advantages on steel-framed buildings: shoring eliminated or minimised; the sheeting becomes a safe working platform immediately after installation; erection speed matches the steel programme; hollow ribs reduce self-weight against a solid slab of equal span and provide ready-made routing for conduits and cables."
          }
        ],
        figure: {
          src: "Resource/articles/01-deck-slab/fig1.png",
          caption: { vi: "Cấu tạo sàn deck: tôn định hình, chốt chịu cắt, lưới thép và dầm thép đỡ.", en: "Deck slab anatomy: profiled sheeting, shear studs, wire mesh and supporting steel beam." }
        }
      },
      {
        heading: { vi: "2. Mô hình hoá trong phần mềm phân tích", en: "2. Modelling in analysis software" },
        body: [
          {
            vi: "Ba loại tiết diện tấm khác nhau ở thành phần độ cứng mà chúng cung cấp: <b>Plate</b> chỉ có uốn ngoài mặt phẳng; <b>Membrane</b> chỉ có độ cứng trong mặt phẳng; <b>Shell</b> có cả hai. Với sàn deck làm việc một phương, <b>Membrane</b> thường là lựa chọn sạch hơn Shell — vì Shell tạo độ cứng uốn hai phương <i>không tồn tại</i> trên thực tế, và sẽ “chia” bớt moment của dầm chính, khiến dầm bị đánh giá thiếu.",
            en: "The three area-section types differ in which stiffness they supply: <b>Plate</b> gives out-of-plane bending only; <b>Membrane</b> gives in-plane stiffness only; <b>Shell</b> gives both. For one-way deck, <b>Membrane</b> is usually cleaner than Shell — Shell introduces two-way bending stiffness that <i>does not physically exist</i>, and it siphons moment away from the supporting girder, under-estimating the beam."
          },
          {
            vi: "Điểm ít được để ý: sàn deck <b>dị hướng</b>. Sàn dày 200 mm không có 200 mm bê tông đặc — phần sóng tôn là rỗng, và độ cứng trong mặt phẳng chỉ do lớp bê tông phủ trên đỉnh sóng đảm nhiệm. Vì vậy f11 ≠ f22, và các hệ số này nên được suy ra từ giá trị G′ trong catalog tôn theo SDI DDM4 / AISI S310 — <b>không phải chọn ngược</b> để ra một tỷ số ứng suất trông vừa mắt.",
            en: "An often-missed point: deck is <b>orthotropic</b>. A 200 mm slab does not contain 200 mm of solid concrete — the ribs are voided, and in-plane stiffness comes only from the topping above the rib crest. Hence f11 ≠ f22, and these modifiers should be derived from the manufacturer's G′ per SDI DDM4 / AISI S310 — <b>not reverse-tuned</b> to produce a comfortable-looking utilisation ratio."
          },
          {
            vi: "Về diaphragm, khác biệt cốt lõi: <b>Rigid</b> là một <i>ràng buộc động học</i>, hoạt động độc lập với độ cứng của tấm — kể cả khi tấm là None. <b>Semi-rigid</b> thì ngược lại, nó chỉ là một <i>nhãn</i>, và toàn bộ ứng xử dựa vào độ cứng membrane thực của tấm. Hệ quả trực tiếp: cấu hình <b>None + Semi-rigid không truyền được lực ngang</b> — không có đường truyền lực, và yêu cầu lệch tâm ngẫu nhiên 5% cũng không được áp đặt đúng. Nếu muốn bỏ qua đóng góp của sàn, phải dùng None + <b>Rigid</b>.",
            en: "On diaphragms, the essential distinction: <b>Rigid</b> is a <i>kinematic constraint</i> that works independently of shell stiffness — even with the slab set to None. <b>Semi-rigid</b> is the opposite: it is only a <i>label</i>, and behaviour relies entirely on the shell's real membrane stiffness. The direct consequence: <b>None + Semi-rigid transfers no lateral load</b> — there is no load path, and the 5% accidental eccentricity requirement is not genuinely enforced. To neglect the slab's contribution, use None + <b>Rigid</b>."
          }
        ],
        figure: {
          src: "Resource/articles/01-deck-slab/fig2.png",
          caption: { vi: "Mô hình phần tử hữu hạn sàn deck liên hợp — tôn, bê tông và chốt chịu cắt khai báo riêng.", en: "Finite-element model of composite deck — sheeting, concrete and shear studs defined separately." }
        }
      },
      {
        heading: { vi: "3. Hai kiểu liên kết thiết bị", en: "3. Two ways to support equipment" },
        body: [
          {
            vi: "Câu hỏi quyết định không phải “chi tiết nào đẹp hơn” mà là <b>“tải trọng nên đi vào đâu”</b>.",
            en: "The decisive question is not “which detail looks better” but <b>“where should the load go?”</b>"
          },
          {
            vi: "<b>Qua bệ RC trên sàn</b> (anchor bolt hoặc embedded part đặt trong bệ): tải đi vào sàn. Sàn deck có chiều dày hữu hiệu mỏng và bị chi phối bởi chọc xuyên, nên hướng này phù hợp với <b>support nhỏ và trung bình</b> — giá đỡ ống, bơm, máy nén đặt trên bệ. Lắp đặt phải chờ bệ đủ cường độ sau khi rót vữa, tức là bị ràng buộc trình tự.",
            en: "<b>Via an RC pedestal on the slab</b> (anchor bolts or embedded plate cast into the pedestal): the load enters the slab. Deck slabs have a thin effective depth and are punching-shear governed, so this route suits <b>small to medium supports</b> — pipe supports, pumps, compressors seated on a pedestal. Installation must wait for the pedestal grout to gain strength, which constrains the erection sequence."
          },
          {
            vi: "<b>Trực tiếp vào dầm thép bên dưới</b>, xuyên qua sàn: tải <b>bỏ qua sàn</b> và đi thẳng vào cấu kiện vốn được thiết kế để chịu nó. Đây là hướng cho <b>thiết bị nặng</b> — bồn đứng, bồn ngang, thiết bị có tải ngang lớn. Đổi lại: phải lắp trước khi đổ bê tông, và cần chi tiết mối nối riêng — cốt thép gia cường quanh lỗ xuyên, xử lý chống thấm và khe co giãn tại mặt tiếp giáp.",
            en: "<b>Directly to the steel beam below</b>, penetrating the slab: the load <b>bypasses the slab</b> and enters a member actually designed to carry it. This is the route for <b>heavy equipment</b> — vertical and horizontal vessels, items with significant horizontal reactions. The trade-off: it must be erected before the concrete pour, and it needs dedicated joint detailing — trimming bars around the penetration, plus waterproofing and movement provision at the interface."
          }
        ],
        figure: {
          src: "Resource/articles/01-deck-slab/fig3.png",
          caption: { vi: "Chốt chịu cắt đầu mũ (trái) và khóa cơ học của gân dập trên tôn (phải) — hai cơ chế truyền lực cắt.", en: "Headed shear stud (left) and mechanical embossment interlock (right) — the two shear-transfer mechanisms." }
        }
      },
      {
        heading: { vi: "4. Giai đoạn thi công và giằng ngang tạm", en: "4. Construction stage and temporary bracing" },
        body: [
          {
            vi: "Trước khi bê tông đạt cường độ, <b>diaphragm chưa tồn tại</b>. Đây là điều dễ bị bỏ sót nhất: liên kết dầm chịu cắt chỉ truyền phản lực thẳng đứng, không tạo được đường truyền lực ngang; các thanh chéo nhỏ tại liên kết chỉ ổn định cục bộ, không phải giằng mặt bằng. Lực gió thi công và lực lắp dựng phải đi qua <b>hệ giằng ngang tạm thời</b> thực sự, hoặc hệ giằng vĩnh viễn đã lắp xong và đủ khả năng.",
            en: "Before the concrete gains strength, <b>the diaphragm does not yet exist</b>. This is the most commonly missed point: shear connections transfer vertical reactions only and create no lateral load path; the small diagonals at connections stabilise the connection locally and are not plan bracing. Construction wind and erection forces must pass through genuine <b>temporary plan bracing</b>, or through permanent bracing already installed and verified."
          },
          {
            vi: "Về tải trọng thi công: ACI 347 yêu cầu tối thiểu <b>2,4 kN/m²</b>, và <b>3,6 kN/m²</b> khi có xe rùa cơ giới, cộng với tải tập trung của thiết bị. Con số 150 kg/m² thường thấy trong các kiểm tra nhanh <b>thấp hơn cả ngưỡng tối thiểu</b> — không phản ánh được máy đầm, chân chống bơm bê tông hay vật liệu chất tạm. Và khi mô hình hoá giai đoạn này, đừng gán diaphragm sàn: hãy đưa vào hệ giằng tạm đang thực có trên công trường.",
            en: "On construction loading: ACI 347 requires a minimum of <b>2.4 kN/m²</b>, rising to <b>3.6 kN/m²</b> where motorised buggies are used, plus concentrated equipment loads. The 150 kg/m² figure often seen in quick checks sits <b>below even that minimum</b> — it captures neither vibrators, nor concrete-pump outrigger loads, nor stockpiled materials. And when modelling this stage, do not assign a slab diaphragm: model the temporary bracing that actually exists on site."
          }
        ],
        figure: {
          src: "Resource/articles/01-deck-slab/fig4.png",
          caption: { vi: "Giai đoạn thi công: giằng ngang tạm, hệ chống đỡ và mép đổ bê tông.", en: "Construction stage: temporary transverse bracing, propping system and concrete pouring edge." }
        }
      },
      {
        heading: { vi: "Kết", en: "Closing" },
        body: [
          {
            vi: "Sàn deck trông đơn giản, nhưng phần lớn sai sót không nằm ở chiều dày hay cấp bê tông — mà ở <b>giả định mô hình</b> và ở <b>đường truyền lực</b>. Bốn điểm trên đều xuất phát từ một câu hỏi duy nhất: <i>lực này thực sự đi đâu?</i>",
            en: "Deck slabs look simple, but most errors do not lie in thickness or concrete grade — they lie in <b>modelling assumptions</b> and in the <b>load path</b>. All four points above stem from a single question: <i>where does this force actually go?</i>"
          }
        ],
        figure: {
          src: "Resource/articles/01-deck-slab/fig5.png",
          caption: { vi: "Hiện trường: sàn deck đã lắp lưới thép, chờ đổ bê tông — giai đoạn chưa có diaphragm.", en: "On site: deck with mesh in place awaiting the pour — the stage where no diaphragm yet exists." }
        }
      }
    ],
    footnote: {
      vi: "Bài tiếp theo trong series sẽ đi vào lỗ mở trên sàn deck và cách gia cường quanh lỗ.",
      en: "The next article in this series looks at openings in deck slabs and trimming around them."
    }
  }
];
