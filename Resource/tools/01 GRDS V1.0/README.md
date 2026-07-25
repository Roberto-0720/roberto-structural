# CONCRETE SLAB ON GRADE DESIGN

> Professional Python / PyQt5 desktop tool for the design and analysis of
> concrete slabs on grade.
> A SI-unit re-implementation of the classic *GRDSLAB v1.4* spreadsheet,
> faithful to its empirical formulas (Westergaard, PCA, ACI 360, TM 5-809-12).

![status: stable](https://img.shields.io/badge/status-stable-green)
![python: 3.9%2B](https://img.shields.io/badge/python-3.9%2B-blue)
![ui: PyQt5](https://img.shields.io/badge/ui-PyQt5-informational)
![units: SI](https://img.shields.io/badge/units-SI-orange)

---

## 1. What this tool does

Three independent design cases — each on its own tab — plus a fourth
**Reference & Input Helper** tab that consolidates the look-up tables and
typical-value charts users need to populate the design tabs:

| Tab | Load case / purpose | Reference |
|-----|---------------------|-----------|
| **1. Concentrated / Wheel Load** | Interior post or wheel load — flexure, bearing, punching shear, dowel-bar bearing, shrinkage/temperature reinforcement, crack width, minimum thickness | Westergaard (1926); MN/DOT report 2002; Yoder & Witczak; Winter et al.; ACI 360R-92; PCA IS195; Porter (Iowa State, 2001) |
| **2. Continuous Wall Load**      | Slab under a line load near centre/joint and near free edge (beam on elastic foundation) | Army TM 5-809-12 / AFM 88-3 Ch.15 (1987) |
| **3. Uniform Load**              | Stationary, uniformly distributed load — critical aisle-width condition | TM 5-809-12; PCA IS195 |
| **4. Reference & Input Helper**  | Subgrade k by soil type, lift-truck axle/wheel-load table, contact-area calculator (Ac = P/p), dowel selection, joint spacing, FoS / ΔT / 2nd-wheel guidance | TM 5-809-12; PCA IS195 |

Each of the three design tabs has a three-column layout: **Inputs** (left),
an explanatory **Diagram** (centre, with the GRDSLAB figure), and the
**Results** dashboard (right). Tab 4 is a two-column layout (tables / 
interactive calculator + guidance cards).

The tool performs *every* check in the original GRDSLAB worksheet, plus an
iterative minimum-thickness search for each load condition, and exports a
printable HTML or styled XLSX report.

> The original GRDSLAB spreadsheet (`Ground Slab Design.xls`) is kept in the
> root folder as a calculation reference. All Python results have been
> verified to match it to ≥ 4 significant digits.

---

## 2. Units convention

All user-facing inputs and outputs are in **SI**:

| Quantity              | Unit       |
|-----------------------|------------|
| Length / thickness    | mm, m      |
| Concrete strength f′c | MPa        |
| Modulus E             | MPa        |
| Force / line load     | kN, kN/m   |
| Surface load          | kPa        |
| Subgrade modulus k    | MN/m³      |
| Steel area per metre  | mm²/m      |
| Temperature range     | °C         |

Internally each core converts to imperial (lb, in, psi, pci) because the
empirical coefficients (e.g. `MR = 9√f′c`, `Ec = 57000√f′c`,
`Lr = (E·t³/(12(1-μ²)k))^¼`) are calibrated in imperial units. Conversion
factors live in `data/constants.py`.

---

## 3. Quick start

```powershell
# 1) clone / copy this folder, then create and activate a venv
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# 2) install dependencies
pip install -r requirements.txt

# 3) run
python main.py
```

The window opens with four tabs. The first three (Concentrated, Wall,
Uniform) each show an **Inputs** panel on the left, an explanatory
**Diagram** in the middle, and a **Results** dashboard on the right with a
status banner (OK / NG), derived parameters, check tables, reinforcement,
dowel bearing, and the minimum required slab thickness for that load
condition. The fourth tab gathers reference tables and a contact-area
calculator (`Ac = P / p`) to help select realistic inputs — it does not
modify any calculation.

> **Licence**: the tool is gated by a soft expiry date set in `main.py`
> (`EXPIRY_DATE`, default 20 May 2030). After that date the app shows a
> "License Expired — please contact Roberto" dialog and exits without
> opening the main window. Edit the constant to extend.

Click **📄 Report** to export the analysis. In the Save dialog, pick the
format via the *file-type* drop-down:

| Filter                  | Output                                          |
|-------------------------|-------------------------------------------------|
| **Excel Workbook (*.xlsx)** *(default)* | Styled `.xlsx` workbook — one sheet per design case, OK/NG status highlighted, ready to drop into reports |
| **HTML Report (*.html)** | Self-contained printable HTML page             |

The extension is auto-appended if you forget it.

---

## 4. Project layout

```
21 Ground Slab Design/
├── main.py                     # entry point (PyQt5 QApplication)
├── requirements.txt
├── README.md                   # ← you are here
├── CLAUDE.md                   # working notes for Claude Code / contributors
├── Ground Slab Design.xls      # original GRDSLAB v1.4 — reference only
├── logo.png  /  rbt.ico        # source images (copied into resource/)
│
├── .claude/                    # Claude Code settings (gitignored if desired)
│
├── data/                       # constants, tables, code lookups
│   ├── __init__.py             #   re-exports public symbols
│   ├── constants.py            #   SI ↔ imperial factors, material defaults
│   ├── pca_fig5.py             #   PCA Fig 5 effective contact area + interpolator
│   └── reference_tables.py     #   subgrade k, lift-truck axle, dowel, joint-spacing tables
│
├── core/                       # pure calculation engine (no GUI imports)
│   ├── __init__.py             #   exports analyze_concentrated / wall / uniform
│   ├── concentrated_load.py    #   Westergaard interior load + dowel + reinforcement
│   ├── wall_load.py            #   TM 5-809-12 wall (line) load
│   └── uniform_load.py         #   TM 5-809-12 / PCA stationary uniform load
│
├── ui/                         # PyQt5 dashboard
│   ├── __init__.py
│   ├── main_window.py          #   tabbed main window with header / status bar
│   ├── tab_concentrated.py     #   tab 1 — concentrated / wheel
│   ├── tab_wall.py             #   tab 2 — continuous wall load
│   ├── tab_uniform.py          #   tab 3 — uniform load
│   ├── tab_reference.py        #   tab 4 — reference tables + Ac calculator
│   ├── widgets.py              #   FloatInput, RatioBar, DiagramPanel, helpers
│   └── styles.py               #   single source of truth for QSS palette
│
├── util/                       # formatters & report exporters
│   ├── __init__.py
│   ├── formatters.py
│   ├── report.py               #   HTML report generator
│   └── xlsx_report.py          #   styled .xlsx workbook generator (openpyxl)
│
├── resource/                   # icons, logos and diagrams used at runtime
│   ├── logo.png
│   ├── rbt.ico
│   ├── Slab on Grade_1.png     #   diagram for tab 1 — post/wheel + dowels
│   ├── Slab on Grade_2.png     #   diagram for tab 1 — dowel load-transfer
│   ├── Continous Wall Load.png #   diagram for tab 2
│   └── Uniform Load.png        #   diagram for tab 3
│
└── Output/                     # default folder for exported reports
```

### Where to look for what

* **Adding a new design check** → edit the appropriate file in `core/`,
  add a new field to its dataclass, then surface it in the matching
  `ui/tab_*.py` and `util/report.py`.
* **Adding a new code / standard** → drop a JSON or `.py` table into
  `data/` and re-export from `data/__init__.py`.
* **Changing the look-and-feel** → only edit `ui/styles.py`.
* **Building a separate sub-tool** (e.g. just the wall-load module) →
  `core/wall_load.py` has no UI / data dependencies beyond `data.constants`
  and can be imported as a standalone library.

---

## 5. Verification against the original spreadsheet

The default Excel example (`t=8 in, f′c=5000 psi, k=100 pci, P=12500 lb,
Ac=114 in²`) is reproduced **exactly**:

| Quantity                       | Excel        | Python (SI ↔ Imperial round-trip) |
|--------------------------------|-------------:|----------------------------------:|
| `a` (load radius)              | 6.024 in     | 153.01 mm  (= 6.024 in) |
| `Ec`                           | 4,286,825 psi| 29,556 MPa (= 4,286,825 psi) |
| `MR`                           | 636.4 psi    | 4.388 MPa  (= 636.4 psi) |
| `Lr`                           | 36.985 in    | 939.42 mm  (= 36.985 in) |
| `fb1` interior                 | 267.58 psi   | 1.845 MPa  (= 267.6 psi) |
| `Fb,allow`                     | 318.20 psi   | 2.194 MPa  (= 318.2 psi) |
| Punching `fv`                  | 20.91 psi    | 0.1442 MPa (= 20.91 psi) |
| `t_min` interior               | 7.25 in      | 184.1 mm   (= 7.25 in) |
| Crack width                    | 0.1284 in    | 3.261 mm   (= 0.1284 in) |

---

## 6. Packaging into a single .exe (PowerShell)

The fastest path uses **PyInstaller onefile** mode, bundling the resources
and giving the binary a custom Windows icon. Run these from the project
root in PowerShell.

### One-time installation

```powershell
pip install pyinstaller
```

### Build command (onefile, windowed, custom icon, bundled resources)

```powershell
pyinstaller --noconfirm --clean --onefile --windowed `
    --name "ConcreteSlabOnGradeDesign" `
    --icon "resource\rbt.ico" `
    --add-data "resource;resource" `
    --add-data "data;data" `
    main.py
```

Notes:
* PowerShell uses backtick (`` ` ``) for line continuation, not backslash.
* On Windows, `--add-data` uses **`;`** as the separator between *source*
  and *destination* (Linux/Mac use `:`).
* The resulting binary is placed at `dist\ConcreteSlabOnGradeDesign.exe`.
* Add `--noconsole` (alias for `--windowed`) is already included so the
  CMD window does not pop up.

### Optional one-liner you can paste

```powershell
pyinstaller --noconfirm --clean --onefile --windowed --name "ConcreteSlabOnGradeDesign" --icon "resource\rbt.ico" --add-data "resource;resource" --add-data "data;data" main.py
```

### Cleanup after build

```powershell
Remove-Item -Recurse -Force build, ConcreteSlabOnGradeDesign.spec -ErrorAction SilentlyContinue
```

The portable .exe will be in `dist\`. Double-click to launch.

---

## 7. Extending / contributing

* Calculation modules in `core/` are pure functions over dataclasses —
  they have **zero** PyQt dependencies and can be imported by:
  * a Jupyter notebook for parametric studies,
  * a CLI wrapper, or
  * another GUI front-end.
* The HTML report (`util/report.py`) is a string-template generator — no
  external template engine is required.
* Every check produces a `ratio` and a `"OK"/"NG"` `status`; reuse
  `ui/widgets.RatioBar` to show progress bars in custom views.
* New static look-up tables (extra soil types, joint-spacing variants…)
  go in `data/reference_tables.py` with one-time imperial→SI conversion,
  and surface in `ui/tab_reference.py`. No `core/` change needed for the
  Reference tab — it is purely display-driven.
* New diagrams for an existing tab → drop the PNG into `resource/` and
  add its path to that tab's `_build_diagram*()` method. The
  `DiagramPanel` widget handles aspect-preserving rescale automatically.

### Multi-monitor / HiDPI

If you fork or copy this codebase, **keep these three pieces of code
together** — omitting any one of them re-introduces a known
tab-label-clipping bug on monitors with different DPI scaling. See the
detailed note in `CLAUDE.md` under "HiDPI / multi-monitor tab-text
clipping fix":

* `main.py` — `Qt.AA_EnableHighDpiScaling` + `AA_UseHighDpiPixmaps`
  set **before** `QApplication(...)`.
* `ui/main_window.py` — `tabBar().setElideMode(Qt.ElideNone)` and
  `setExpanding(False)` on the tab bar.
* `ui/styles.py` — `min-width: 200px` on `QTabBar::tab`.

---

## 8. References

1. *Load Testing of Instrumented Pavement Sections — Improved Techniques
   for Applying the Finite Element Method to Strain Prediction in PCC
   Pavement Structures.* Univ. of Minnesota, Dept. of Civil Engineering.
   (Submitted to MN/DOT, March 24 2002.)
2. *Principles of Pavement Design* — E. J. Yoder and M. W. Witczak.
   Wiley, 1975.
3. *Design of Concrete Structures* — Winter, Urquhart, O'Rourke and Nilson.
   McGraw-Hill, 1962.
4. *Dowel Bar Optimization: Phases I and II — Final Report* — Max L. Porter.
   Iowa State University, 2001.
5. *Design of Slabs on Grade — ACI 360R-92.* ACI Manual of Concrete
   Practice, 1999.
6. *Slab Thickness Design for Industrial Concrete Floors on Grade*
   (IS195.01D) — R. G. Packard. Portland Cement Association, 1976.
7. *Concrete Floor Slabs on Grade Subjected to Heavy Loads.* Army
   Technical Manual TM 5-809-12 / AFM 88-3 Chapter 15, 1987.

---

## 9. License & credits

* Original spreadsheet *GRDSLAB v1.4* © Alex Tomanovich (public domain).
* This Python re-implementation: free for engineering and educational use.
* Built with PyQt5 — © Riverbank Computing.
