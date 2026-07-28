# Sàn Deck trên kết cấu thép — Bốn góc nhìn dễ bị bỏ qua
# RC Deck on Steel Structures — Four Overlooked Perspectives

*Structural Notes — Bài số 01 / Article No. 01*

---

## 1. Sàn Deck là gì? | What is a deck slab?

**VI —** Sàn deck dùng tấm tôn định hình làm coffa lưu, bê tông đổ lên trên. Có hai loại khác nhau về bản chất:

- **Composite deck:** tôn có gân dập (embossment), khóa cơ học với bê tông, tôn *chính là* cốt chịu kéo.
- **Form deck:** tôn chỉ làm coffa, cốt thép bố trí riêng.

Ưu điểm khi dùng cho công trình sử dụng kết cấu thép:

- Giảm tối đa giàn giáo chống đỡ; tấm tôn trở thành mặt bằng thi công an toàn ngay khi lắp xong.
- Tốc độ thi công nhanh, đồng bộ với tiến độ lắp dựng kết cấu thép, sóng tôn rỗng làm giảm tải trọng bản thân so với sàn đặc cùng nhịp, và là không gian sẵn có để luồn ống, cáp điện.

**EN —** A deck slab uses profiled steel sheeting as permanent formwork with concrete cast on top. Two families differ fundamentally:

- **Composite deck:** embossed sheeting mechanically interlocked with the concrete — the sheeting *is* the tensile reinforcement.
- **Form deck:** sheeting acts as formwork only; reinforcement is placed separately.

Advantages on steel-framed buildings:

- Shoring eliminated or minimised; the sheeting becomes a safe working platform immediately after installation.
- Erection speed matches the steel programme; hollow ribs reduce self-weight against a solid slab of equal span and provide ready-made routing for conduits and cables.

---

## 2. Mô hình hoá trong phần mềm phân tích | Modelling in analysis software

**VI —** Ba loại tiết diện tấm (Area Section Type) cung cấp ba cách ứng xử khác nhau:

- **Plate:** chịu uốn và cắt ngoài mặt phẳng.
- **Membrane:** chịu kéo nén **trong mặt phẳng** (f11, f22, f12).
- **Shell:** kết hợp cả Plate và Membrane.

Riêng với Shell và Plate, phần mềm phân tích còn phân biệt theo cách xử lý biến dạng cắt ngang:

- **Thin:** bỏ qua biến dạng cắt ngang ngoài mặt phẳng (tỷ lệ chiều dày/nhịp ngắn của sàn <1/10-1/20).
- **Thick:** có kể đến biến dạng cắt ngang (tỷ lệ chiều dày/nhịp cạnh ngắn của sàn >1/5-1/10).

Tùy chọn này **không áp dụng cho Membrane**.

Điểm ít được để ý: **sàn dày 200 mm không có 200 mm bê tông đặc** — phần sóng tôn là rỗng, và độ cứng trong mặt phẳng chỉ do lớp bê tông phủ trên đỉnh sóng đảm nhiệm. Sàn deck **dị hướng**: độ cứng theo phương song song sóng tôn nhỏ hơn hẳn phương vuông góc, nên f11 ≠ f22.

Về diaphragm, khác biệt cốt lõi:

- **Rigid** là một *ràng buộc động học*, hoạt động độc lập với độ cứng của tấm. Rigid vẫn ảnh hưởng ngay cả khi Stiffness Modifiers = 0 hoặc Section Properties = None.
- **Semi-rigid** thì ngược lại — nó chỉ là một *nhãn*, và toàn bộ ứng xử dựa vào độ cứng membrane thực của tấm (f11, f22, f12). Semi-rigid chỉ có tác dụng khi Section Type = Shell hoặc Membrane với Stiffness Modifiers > 0.

Semi-rigid **mất ý nghĩa** nếu Section Type = Plate, hoặc Properties = None, hoặc Stiffness Modifiers = 0: không có đường truyền lực ngang, và yêu cầu lệch tâm ngẫu nhiên 5% cũng không được áp đặt đúng.

**EN —** The three area-section types supply three different behaviours:

- **Plate:** out-of-plane bending and shear.
- **Membrane:** in-plane axial (f11, f22, f12).
- **Shell:** both Plate and Membrane combined.

For Shell and Plate only, the software further distinguishes how transverse shear is treated:

- **Thin:** transverse shear deformation ignored — use where t/L (short span) <1/10-1/20.
- **Thick:** transverse shear included — use where t/L >1/5-1/10.

This option **does not apply to Membrane**.

An often-missed point: **a 200 mm slab does not contain 200 mm of solid concrete** — the ribs are voided, and in-plane stiffness comes only from the topping above the rib crest.
Deck is **orthotropic**: stiffness parallel to the ribs is markedly lower than perpendicular to them, so f11 ≠ f22.

On diaphragms, the essential distinction:

- **Rigid** is a *kinematic constraint* that works independently of shell stiffness. It remains effective even with Stiffness Modifiers = 0 or Section Properties = None.
- **Semi-rigid** is the opposite — it is only a *label*, and behaviour relies entirely on the shell's real membrane stiffness (f11, f22, f12). It takes effect only where Section Type = Shell or Membrane with Stiffness Modifiers > 0.

Semi-rigid becomes **meaningless** where Section Type = Plate, or Properties = None, or Stiffness Modifiers = 0: there is no lateral load path, and the 5% accidental eccentricity requirement is not genuinely enforced.

---

## 3. Hai kiểu liên kết thiết bị | Two ways to support equipment

**VI —** Câu hỏi quyết định không phải "chi tiết nào đẹp hơn" mà là **"tải trọng nên đi vào đâu"**.

**Qua bệ RC trên sàn** (anchor bolt hoặc embedded part đặt trong bệ): tải đi vào sàn. Sàn deck có chiều dày hữu hiệu mỏng và bị chi phối bởi chọc thủng, nên hướng này phù hợp với **support nhỏ và trung bình** — pipe support cho ống nhỏ, bệ máy bơm, bệ máy nén. Lắp đặt phải chờ bệ đủ cường độ, tức là bị ràng buộc trình tự.

**Trực tiếp vào dầm thép bên dưới**, xuyên qua sàn: tải **bỏ qua sàn** và đi thẳng vào cấu kiện vốn được thiết kế để chịu nó. Đây là hướng cho **thiết bị nặng** — bồn đứng, bồn ngang, thiết bị có tải ngang lớn. Đổi lại: phải lắp trước khi đổ bê tông, và cần chi tiết mối nối riêng — cốt thép gia cường quanh lỗ mở, xử lý chống thấm và khe co giãn tại mặt tiếp giáp.

**EN —** The decisive question is not "which detail looks better" but **"where should the load go?"**

**Via an RC pedestal on the slab** (anchor bolts or embedded plate cast into the pedestal): the load enters the slab. Deck slabs have a thin effective depth and are punching-shear governed, so this route suits **small to medium supports** — pipe supports, pump and compressor bases. Installation must wait for the pedestal to gain strength, which constrains the erection sequence.

**Directly to the steel beam below**, penetrating the slab: the load **bypasses the slab** and enters a member actually designed to carry it. This is the route for **heavy equipment** — vertical and horizontal vessels, items with significant horizontal reactions. The trade-off: it must be erected before the concrete pour, and it needs dedicated joint detailing — trimming bars around the opening, plus waterproofing and movement provision at the interface.

### So sánh hai kiểu | Comparison

| | Có bệ RC<br>*With RC Pedestal* | Không bệ RC<br>*Without RC Pedestal* | Ghi chú \| *Remark* |
|---|---|---|---|
| **Đặc tính kết cấu**<br>*Structural characteristic* | Gối tựa trên sàn<br>*Slab support* | Gối tựa kết cấu<br>*Structural support* | |
| **Truyền tải**<br>*Load transfer* | Hạn chế<br>*Limited* | Ít ràng buộc hơn<br>*Less restricted* | |
| **Trình tự lắp dựng**<br>*Erection sequence* | Sau khi rót vữa bệ<br>*After pedestal grouting* | Trước khi đổ sàn<br>*Before slab pour* | Cần chi tiết mối nối đặc biệt; không bệ RC thì không ràng buộc trình tự<br>*Special joint consideration; without pedestal, no sequence restriction* |

### Phạm vi áp dụng | Applicability

| | Có bệ RC<br>*With RC Pedestal* | Không bệ RC<br>*Without RC Pedestal* | Ghi chú \| *Remark* |
|---|---|---|---|
| **Thiết bị đứng** \| *Vertical equipment* | ✗ | ✓ | |
| **Thiết bị nằm ngang** \| *Horizontal equipment* | ✗ | ✓ | |
| **Bơm & máy nén** \| *Pump & compressor* | ✓ | ✗ | Không áp dụng cho máy nén kiểu khung<br>*Frame-type compressor not applicable* |
| **Kết cấu thép** \| *Steel structure* | ✓ với support nhỏ<br>✗ với support lớn | ✓ | Xem như đặt trên nền<br>*Consider same as on-paving* |
| **Giá đỡ ống** \| *Pipe support* | ✓ với support nhỏ<br>✗ với support lớn | – | Xem như đặt trên nền<br>*Consider same as on-paving* |

**VI —** Hàng *Bơm & máy nén* thoạt nhìn có vẻ ngược với nguyên tắc "tải nặng thì đi thẳng vào dầm". Lý do không nằm ở độ lớn tải mà ở **rung động**: bệ bê tông cung cấp khối lượng và cản để hấp thụ dao động từ máy quay, trong khi nối cứng trực tiếp vào dầm thép sẽ truyền rung vào hệ kết cấu.

**EN —** The *pump & compressor* row appears to contradict the "heavy loads go straight to the beam" principle. The reason is not load magnitude but **vibration**: a concrete pedestal provides mass and damping to absorb rotating-machine excitation, whereas a direct rigid connection would feed that vibration into the steel frame.

---

## 4. Giai đoạn thi công và giằng ngang tạm | Construction stage and temporary bracing

**VI —** Trước khi bê tông đạt cường độ, **diaphragm chưa tồn tại**. Đây là điều dễ bị bỏ sót nhất, và nó lấy đi cùng lúc hai thứ:

- **Đường truyền lực ngang**: sàn chưa có độ cứng trong mặt phẳng để phân phối tải ngang về hệ chịu lực chính.
- **Giằng chống oằn ngang cho dầm**: cánh nén của dầm thép mất điểm tựa ngang, khả năng chịu uốn bị chi phối bởi mất ổn định ngang.
Kỹ sư thiết kế cần kể đến sự không làm việc của tấm sàn trong giai đoạn này. Thiết kế một **hệ giằng ngang tạm thời** hoặc hệ giằng vĩnh viễn là cần thiết.

**EN —** Before the concrete gains strength, **the diaphragm does not yet exist**. This is the most commonly missed point, and it removes two things at once:

- **The lateral load path**: the slab has no in-plane stiffness to distribute lateral load back to the primary system.
- **Lateral restraint to the beams**: the compression flange loses its bracing, and beam capacity becomes governed by lateral-torsional buckling rather than the plastic moment.
Engineers need to take into account the non-working state of slab during this phase. Designing a **temporary or permanent horizontal bracing system** is necessary.

---

## Kết | Closing

**VI —** Sàn deck trông đơn giản, nhưng phần lớn sai sót không nằm ở chiều dày hay cấp bê tông — mà ở **giả định mô hình** và ở **đường truyền lực**. Bốn điểm trên đều xuất phát từ một câu hỏi duy nhất: *lực này thực sự đi đâu?*

**EN —** Deck slabs look simple, but most errors do not lie in thickness or concrete grade — they lie in **modelling assumptions** and in the **load path**. All four points above stem from a single question: *where does this force actually go?*

---
