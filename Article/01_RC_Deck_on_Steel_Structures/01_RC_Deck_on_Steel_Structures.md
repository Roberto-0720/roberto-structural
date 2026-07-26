# Sàn Deck trên kết cấu thép — Bốn góc nhìn dễ bị bỏ qua
# RC Deck on Steel Structures — Four Overlooked Perspectives

*Structural Notes — Bài số 01 / Article No. 01*

---

## 1. Sàn Deck là gì? | What is a deck slab?

**VI —** Sàn deck dùng tấm tôn định hình làm coffa lưu, bê tông đổ lên trên. Có hai loại khác nhau về bản chất: 
**- Composite Deck:** Tôn có gân dập embossment, khóa cơ học với bê tông, tôn *chính là* cốt chịu kéo.
**- Form deck:** Tôn chỉ làm coffa, cốt thép bố trí riêng. 
Ưu điểm khi dùng cho nhà thép: 
- Không cần hoặc giảm tối đa giàn giáo chống đỡ; 
- Tấm tôn trở thành mặt bằng thi công an toàn ngay khi lắp xong; 
- Tốc độ lắp dựng nhanh, đồng bộ với tiến độ dựng kết cấuthép; sóng tôn rỗng làm giảm tải trọng bản thân so với sàn đặc cùng nhịp;
- Và là không gian sẵn có để luồn ống, cáp điện...

**EN —** A deck slab uses profiled steel sheeting as permanent formwork with concrete cast on top. Two families differ fundamentally: **composite deck** (embossed sheeting mechanically interlocked with the concrete, where the sheeting *is* the tensile reinforcement) and **form deck** (sheeting as formwork only, with separate rebar). Advantages on steel-framed buildings: shoring eliminated or minimised; the sheeting becomes a safe working platform immediately after installation; erection speed matches the steel programme; hollow ribs reduce self-weight against a solid slab of equal span and provide ready-made routing for conduits and cables.

---

## 2. Mô hình hoá trong phần mềm phân tích | Modelling in analysis software

**VI —** Ba loại tiết diện tấm (Area Section Type) cung cấp 3 kiểu ứng xử khác nhau:
**- Plate:** chịu cắt, chịu uốn ngoài mặt phẳng; 
**- Membrane** chịu kéo nén trong mặt phẳng tấm; 
**- Shell:** bao gồm cả Plate & Membrane. 

Phần mềm phân tích kết cấu cung cấp thêm hai loại ứng xử nữa cho phần tử tấm:
- Thin: bỏ qua biến dạng cắt ngang ngoài mặt phẳng tấm: (Đề xuất khi tỷ lệ chiều dày/nhịp ngắn <= 1/10-1/20)
- Thick: kế đến biến dạng cắt ngang ngoài mặt phẳng tấm: (Đề xuất khi tỷ lệ chiều dày/nhịp ngắn > 1/10)

Điểm ít được để ý: sàn deck **dị hướng**. Sàn dày 200 mm không có 200 mm bê tông đặc — phần sóng tôn là rỗng, và độ cứng trong mặt phẳng chỉ do lớp bê tông phủ trên đỉnh sóng đảm nhiệm. Vì vậy f11 ≠ f22, và các hệ số này nên được suy ra từ giá trị G′ trong catalog tôn theo SDI DDM4 / AISI S310 — **không phải chọn ngược** để ra một tỷ số ứng suất trông vừa mắt.

Về diaphragm, khác biệt cốt lõi: **Rigid** là một *ràng buộc động học*, hoạt động độc lập với độ cứng của tấm — kể cả khi tấm là None. **Semi-rigid** thì ngược lại, nó chỉ là một *nhãn*, và toàn bộ ứng xử dựa vào độ cứng membrane thực của tấm. Hệ quả trực tiếp: cấu hình **None + Semi-rigid không truyền được lực ngang** — không có đường truyền lực, và yêu cầu lệch tâm ngẫu nhiên 5% cũng không được áp đặt đúng. Nếu muốn bỏ qua đóng góp của sàn, phải dùng None + **Rigid**.

**EN —** The three area-section types differ in which stiffness they supply: **Plate** gives out-of-plane bending only; **Membrane** gives in-plane stiffness only; **Shell** gives both. For one-way deck, **Membrane** is usually cleaner than Shell — Shell introduces two-way bending stiffness that *does not physically exist*, and it siphons moment away from the supporting girder, under-estimating the beam.

An often-missed point: deck is **orthotropic**. A 200 mm slab does not contain 200 mm of solid concrete — the ribs are voided, and in-plane stiffness comes only from the topping above the rib crest. Hence f11 ≠ f22, and these modifiers should be derived from the manufacturer's G′ per SDI DDM4 / AISI S310 — **not reverse-tuned** to produce a comfortable-looking utilisation ratio.

On diaphragms, the essential distinction: **Rigid** is a *kinematic constraint* that works independently of shell stiffness — even with the slab set to None. **Semi-rigid** is the opposite: it is only a *label*, and behaviour relies entirely on the shell's real membrane stiffness. The direct consequence: **None + Semi-rigid transfers no lateral load** — there is no load path, and the 5% accidental eccentricity requirement is not genuinely enforced. To neglect the slab's contribution, use None + **Rigid**.

---

## 3. Hai kiểu liên kết thiết bị | Two ways to support equipment

**VI —** Câu hỏi quyết định không phải "chi tiết nào đẹp hơn" mà là **"tải trọng nên đi vào đâu"**.

**Qua bệ RC trên sàn** (anchor bolt hoặc embedded part đặt trong bệ): tải đi vào sàn. Sàn deck có chiều dày hữu hiệu mỏng và bị chi phối bởi chọc xuyên, nên hướng này phù hợp với **support nhỏ và trung bình** — giá đỡ ống, bơm, máy nén đặt trên bệ. Lắp đặt phải chờ bệ đủ cường độ sau khi rót vữa, tức là bị ràng buộc trình tự.

**Trực tiếp vào dầm thép bên dưới**, xuyên qua sàn: tải **bỏ qua sàn** và đi thẳng vào cấu kiện vốn được thiết kế để chịu nó. Đây là hướng cho **thiết bị nặng** — bồn đứng, bồn ngang, thiết bị có tải ngang lớn. Đổi lại: phải lắp trước khi đổ bê tông, và cần chi tiết mối nối riêng — cốt thép gia cường quanh lỗ xuyên, xử lý chống thấm và khe co giãn tại mặt tiếp giáp.

**EN —** The decisive question is not "which detail looks better" but **"where should the load go?"**

**Via an RC pedestal on the slab** (anchor bolts or embedded plate cast into the pedestal): the load enters the slab. Deck slabs have a thin effective depth and are punching-shear governed, so this route suits **small to medium supports** — pipe supports, pumps, compressors seated on a pedestal. Installation must wait for the pedestal grout to gain strength, which constrains the erection sequence.

**Directly to the steel beam below**, penetrating the slab: the load **bypasses the slab** and enters a member actually designed to carry it. This is the route for **heavy equipment** — vertical and horizontal vessels, items with significant horizontal reactions. The trade-off: it must be erected before the concrete pour, and it needs dedicated joint detailing — trimming bars around the penetration, plus waterproofing and movement provision at the interface.

---

## 4. Giai đoạn thi công và giằng ngang tạm | Construction stage and temporary bracing

**VI —** Trước khi bê tông đạt cường độ, **diaphragm chưa tồn tại**. Đây là điều dễ bị bỏ sót nhất: liên kết dầm chịu cắt chỉ truyền phản lực thẳng đứng, không tạo được đường truyền lực ngang; các thanh chéo nhỏ tại liên kết chỉ ổn định cục bộ, không phải giằng mặt bằng. Lực gió thi công và lực lắp dựng phải đi qua **hệ giằng ngang tạm thời** thực sự, hoặc hệ giằng vĩnh viễn đã lắp xong và đủ khả năng.

Về tải trọng thi công: ACI 347 yêu cầu tối thiểu **2,4 kN/m²**, và **3,6 kN/m²** khi có xe rùa cơ giới, cộng với tải tập trung của thiết bị. Con số 150 kg/m² thường thấy trong các kiểm tra nhanh **thấp hơn cả ngưỡng tối thiểu** — không phản ánh được máy đầm, chân chống bơm bê tông hay vật liệu chất tạm. Và khi mô hình hoá giai đoạn này, đừng gán diaphragm sàn: hãy đưa vào hệ giằng tạm đang thực có trên công trường.

**EN —** Before the concrete gains strength, **the diaphragm does not yet exist**. This is the most commonly missed point: shear connections transfer vertical reactions only and create no lateral load path; the small diagonals at connections stabilise the connection locally and are not plan bracing. Construction wind and erection forces must pass through genuine **temporary plan bracing**, or through permanent bracing already installed and verified.

On construction loading: ACI 347 requires a minimum of **2.4 kN/m²**, rising to **3.6 kN/m²** where motorised buggies are used, plus concentrated equipment loads. The 150 kg/m² figure often seen in quick checks sits **below even that minimum** — it captures neither vibrators, nor concrete-pump outrigger loads, nor stockpiled materials. And when modelling this stage, do not assign a slab diaphragm: model the temporary bracing that actually exists on site.

---

## Kết | Closing

**VI —** Sàn deck trông đơn giản, nhưng phần lớn sai sót không nằm ở chiều dày hay cấp bê tông — mà ở **giả định mô hình** và ở **đường truyền lực**. Bốn điểm trên đều xuất phát từ một câu hỏi duy nhất: *lực này thực sự đi đâu?*

**EN —** Deck slabs look simple, but most errors do not lie in thickness or concrete grade — they lie in **modelling assumptions** and in the **load path**. All four points above stem from a single question: *where does this force actually go?*

---

*Bài tiếp theo trong series sẽ đi vào lỗ mở trên sàn deck và cách gia cường quanh lỗ. | The next article in this series looks at openings in deck slabs and trimming around them.*
