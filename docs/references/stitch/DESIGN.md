---
name: Precision Slate
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
  tertiary: '#7e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a44100'
  on-tertiary-container: '#ffd2be'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system embodies a minimalist enterprise SaaS aesthetic tailored for technical operators, platform administrators, and engineering leads managing AI agents and automated workflows. The interface should evoke clarity, speed, and operational trust—eliminating visual noise so complex telemetry, agent states, and configuration controls remain effortless to scan.

The visual language draws from **Minimalism** and **Corporate / Modern** principles:
- **High-craft restraint:** Generous whitespace, disciplined typographic hierarchy, and a restrained neutral canvas ensure data tables, logs, and status indicators take center stage.
- **Tactile precision:** Subtle 1px hairline borders, crisp linear iconography, and soft ambient elevation give interactive surfaces a sharp, engineered feel without heavy skeuomorphism.
- **Focused energy:** Saturated indigo accents are reserved strictly for primary actions, active navigation states, and key interactive highlights, keeping the workspace calm during extended operational sessions.

## Colors

The palette is anchored in a clean, light-mode neutral foundation with a focused indigo accent pair:
- **Primary (`#4f46e5`)**: Used for primary CTA buttons, active sidebar indicators, focus rings, and primary links.
- **Secondary (`#6366f1`)**: Used for hover states on primary elements, secondary highlights, and subtle interactive accents.
- **Neutral (`#64748b`)**: Governs secondary text, metadata, muted icons, and structural hierarchy.

### Surface & Border Roles
- **Canvas Background**: `#f8fafc` provides a soft, low-glare backdrop for the main dashboard workspace.
- **Elevated Surface**: `#ffffff` is used for cards, data tables, modals, and the primary navigation rail.
- **Hairline Borders**: `#e2e8f0` defines crisp 1px structural boundaries between cards, table rows, and input fields.
- **Semantic States**: Use emerald (`#10b981`) for active/healthy agents, amber (`#f59e0b`) for warnings or rate limits, and rose (`#ef4444`) for errors or failed runs, always paired with high-contrast text on soft tinted backgrounds.

## Typography

`Inter` is used across all typographic roles to maintain a unified, utilitarian, and highly legible interface.

- **Headlines**: Use semi-bold (`600`) weights with tight negative letter-spacing (`-0.01em` to `-0.02em`) for page headers and section titles. On mobile viewports, `headline-lg` scales down to `headline-lg-mobile` (`24px`) to preserve vertical space.
- **Body**: `body-md` (`14px`) is the default for dashboard copy, table cells, and form descriptions. Use `tabular-nums` (`font-variant-numeric: tabular-nums`) on all numeric metrics, timestamps, and table columns to ensure vertical alignment.
- **Labels**: `label-md` (`12px`) and `label-sm` (`11px`, uppercase with `0.04em` tracking) are used for table column headers, status badges, and form labels.

## Layout & Spacing

The dashboard uses a **Fluid grid** paired with a persistent left-hand navigation rail (`240px`–`260px` on desktop) and a fluid main content area capped at a comfortable reading/scanning width (`1440px` max-width) for ultra-wide monitors.

### Grid & Breakpoints
- **Desktop (`>= 1024px`)**: 12-column fluid grid with `1.5rem` (`24px`) gutters and `2rem` (`32px`) outer canvas margins. KPI summary cards typically span 3 or 4 columns; primary data tables span 12 columns.
- **Tablet (`768px – 1023px`)**: 8-column fluid grid with `1.25rem` (`20px`) gutters and `1.5rem` (`24px`) margins. The navigation rail collapses into a slide-over drawer.
- **Mobile (`< 768px`)**: 4-column fluid grid with `1rem` (`16px`) gutters and `1rem` (`16px`) margins. Multi-column card rows stack vertically, and data tables enable horizontal scrolling with a sticky first column.

### Spacing Rhythm
- Use `space-xs` (`4px`) and `space-sm` (`8px`) for tight internal element gaps (e.g., icon-to-label spacing, badge padding).
- Use `space-md` (`16px`) and `space-lg` (`24px`) for card internal padding and vertical stacking between related controls.
- Use `space-xl` (`32px`) to separate major dashboard sections.

## Elevation & Depth

This design system combines **Low-contrast outlines** with subtle **Ambient shadows** to establish hierarchy without visual clutter:

- **Primary Surfaces (Cards, Tables, Sidebar)**: Rest on the `#f8fafc` canvas using a `#ffffff` fill, a crisp `1px solid #e2e8f0` border, and a minimal ambient shadow (`0 1px 2px 0 rgba(15, 23, 42, 0.04)`).
- **Interactive Hover**: Cards or clickable rows slightly deepen their border to `#cbd5e1` or transition to a `#f8fafc` background tint rather than relying on heavy drop shadows.
- **Floating Layers (Dropdowns, Popovers, Modals)**: Use elevated ambient shadows (`0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 4px 10px -6px rgba(15, 23, 42, 0.04)`) paired with a `1px solid #e2e8f0` border to clearly separate overlays from the underlying workspace.

## Shapes

A **Soft (`1`)** roundedness scale provides a modern, engineered feel—clean and structured without appearing harsh or overly playful:
- **Standard (`0.25rem` / `4px`)**: Used for checkboxes, compact badges, and small inline tags.
- **Medium (`0.375rem`–`0.5rem` / `6px`–`8px`, `rounded-lg`)**: Used for buttons, input fields, dropdown menus, and standard cards.
- **Large (`0.75rem` / `12px`, `rounded-xl`)**: Used for primary modal dialogs and large feature containers.
- **Pill (`9999px`)**: Reserved exclusively for status indicator dots and compact pill badges.

## Components

All components use crisp `1.5px` stroke linear icons (e.g., Lucide or Heroicons) sized at `16px` for inline controls and `20px` for navigation.

- **Buttons**:
  - *Primary*: Solid `#4f46e5` background, `#ffffff` text, `rounded-lg`, `space-sm` vertical and `space-md` horizontal padding. Hover transitions to `#4338ca` or `#6366f1`.
  - *Secondary*: `#ffffff` background, `1px solid #e2e8f0` border, `#0f172a` text, subtle shadow. Hover shifts background to `#f8fafc`.
  - *Ghost*: Transparent background, `#64748b` text, transitions to `#f1f5f9` on hover.
- **Badges & Chips**: Compact `label-md` or `label-sm` text with `0.25rem`–`0.375rem` radius or pill shape. Status badges pair a `6px` colored dot with a soft tinted background (e.g., `#ecfdf5` with `#065f46` text for "Active").
- **Data Tables**: Full-width `#ffffff` container with `1px solid #e2e8f0` outer border. Header row uses `#f8fafc` background, `label-sm` uppercase `#64748b` text, and `1px solid #e2e8f0` bottom border. Body rows have `48px`–`52px` height, `#e2e8f0` dividers, and `#f8fafc` hover states.
- **Input Fields**: `36px`–`40px` height, `#ffffff` background, `1px solid #e2e8f0` border, `rounded-lg`. Focus state applies a `#4f46e5` border with a `2px` soft indigo ring (`rgba(79, 70, 229, 0.15)`).
- **Checkboxes & Radio Buttons**: `16px` controls with `1px solid #cbd5e1` borders. Checked state fills with `#4f46e5` and a crisp white checkmark or inner dot.
- **Cards**: `#ffffff` background, `1px solid #e2e8f0` border, `rounded-lg`, `space-lg` (`24px`) internal padding, and optional header divider for metric or configuration panels.
- **Navigation Rail**: Fixed left sidebar with `#ffffff` background, `1px solid #e2e8f0` right border. Active items use `#eef2ff` background, `#4f46e5` text/icon, and `600` weight.