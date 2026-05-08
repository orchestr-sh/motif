# @orchestr-sh/motif

A thoughtfully designed CSS utility library built for clarity and memorability. Fewer classes, better naming, semantic tokens—import only what you need.

**Why Motif?**
- **Smaller than Tailwind** (~15KB vs 50KB+)
- **Better naming** — semantic scales (xs, sm, md, lg, xl) instead of arbitrary numbers
- **Fewer to memorize** — rational variants only, no class explosion
- **Token-driven** — change one variable, theme everything
- **No breakpoint madness** — design for all screens, not mobile-first variants

---

## Installation

Copy the `@orchestr-sh/` folder into your project, or reference it via a CDN/package.

---

## Usage

### Install the package

```bash
npm install @orchestr-sh/motif
```

### Import everything (quick start)

```css
@import '@orchestr-sh/motif';
```

Or with full path:

```css
@import '@orchestr-sh/motif/index.css';
```

### Import selectively (recommended)

Always start with `tokens.css`. Everything else depends on it.

```css
/* Required */
@import '@orchestr-sh/motif/core/tokens.css';
@import '@orchestr-sh/motif/core/reset.css';   /* optional but recommended */

/* Pick what you need */
@import '@orchestr-sh/motif/components/button.css';
@import '@orchestr-sh/motif/components/card.css';
@import '@orchestr-sh/motif/utilities/layout.css';
@import '@orchestr-sh/motif/utilities/spacing.css';
```

### For unprocessed CSS (Vite, Webpack, PostCSS)

If using a bundler with CSS import support, use the full package path:

```css
@import '@orchestr-sh/motif/core/tokens.css';
@import '@orchestr-sh/motif/components/button.css';
```

The bundler resolves `@orchestr-sh/motif` to `node_modules/@orchestr-sh/motif/` automatically.

---

## File structure

```
@orchestr-sh/
├── index.css                   ← barrel (imports everything)
│
├── core/
│   ├── tokens.css              ← CSS custom properties (⚠ load first)
│   ├── reset.css               ← normalize & base defaults
│   └── typography.css          ← headings, body text, prose
│
├── components/
│   ├── button.css              ← .btn and all variants
│   ├── card.css                ← .card, .card-header, .card-body …
│   ├── badge.css               ← .badge and variants
│   └── input.css               ← .input, .select, .checkbox, .toggle …
│
└── utilities/
    ├── layout.css              ← flex, grid, container, position
    ├── spacing.css             ← margin, padding
    └── color.css               ← bg, border, shadow, opacity
```

---

## Theming

Override any token in your own `:root` block **after** importing `tokens.css`:

```css
@import '@orchestr-sh/core/tokens.css';

:root {
  /* Change the accent color throughout the entire library */
  --color-accent:       #7c3aed;
  --color-accent-hover: #6d28d9;

  /* Rounder corners */
  --radius-md:  0.5rem;
  --radius-lg:  0.75rem;

  /* Custom font */
  --font-sans: 'Geist', system-ui, sans-serif;
}
```

---

## Design philosophy

> **TL;DR:** Learn the semantic scale (xs/sm/md/lg/xl) once and apply it everywhere. Everything else follows consistent patterns.

### Naming conventions that stick

Everything in Motif uses **semantic, memorable naming** so you spend less time in the docs:

- **Spacing** — `p-xs`, `p-sm`, `p-md`, `p-lg`, `p-xl` (not `p-1`, `p-2`, `p-3`…)
  - Map to real design sizes: xs = 0.25rem, sm = 0.5rem, md = 1rem, lg = 1.5rem, xl = 2rem
  - Same scale for all: padding, margin, gap — consistency = memorability
  - You only learn it once
  
- **Components** — `btn-*`, `card-*`, `badge-*` — what it is
  - Variants grouped logically: color, size, shape, state
  - All variants are optional — use just `btn` for defaults
  
- **Colors** — semantic names, not hex
  - `text-default`, `text-muted`, `text-subtle` (vs `text-gray-600`)
  - `bg-base`, `bg-subtle`, `bg-muted` (vs `bg-gray-50`)
  - Status colors: `success`, `warning`, `danger` (no arbitrary numbers)
  
- **Layout** — utilities describe what they do
  - `flex`, `grid`, `center` (not `d-flex`, `d-grid`)
  - `items-center`, `justify-between` (not `ai-c`, `jc-sb`)
  - `gap-md`, `gap-lg` (gap uses the same semantic scale as spacing)
  
- **Interactive states** — handled in CSS, not as separate classes
  - Buttons, cards, and inputs all have `:hover`, `:focus`, `:active` built in
  - No need for `hover:bg-blue` variants

### Philosophy: Fewer, better classes

Motif ships ~200 classes. Tailwind ships 10,000+. We win on:

1. **Memorability** — You learn the semantic scale once (xs, sm, md, lg, xl) and it applies everywhere
2. **Clarity** — No ambiguous names like `top-0` (does it mean position or margin-top?)
3. **Size** — Minimal footprint, no bloat for unused variants
4. **Flexibility** — Token system means you can theme/customize without touching CSS

**Want deep details?** See [NAMING.md](./NAMING.md) for the complete naming philosophy with lookup tables.

---

## Common patterns (copy-paste ready)

Here are the layouts and component combos you'll use 80% of the time:

### Card grid with spacing

```html
<div class="container container-lg">
  <div class="grid grid-cols-3 gap-lg">
    <div class="card card-elevated">
      <img class="card-media" src="…" alt="…">
      <div class="card-body">
        <h3 class="card-title">Title</h3>
        <p class="card-description">Description.</p>
      </div>
    </div>
    <!-- repeat 2 more cards -->
  </div>
</div>
```

**Why this works:**
- `container` centers and constrains width
- `grid grid-cols-3` creates 3-column layout
- `gap-lg` adds breathing room between cards
- `card-elevated` adds shadow for depth

**Adapt it:**
- 2 columns? Use `grid-cols-2`
- Smaller spacing? Use `gap-sm` or `gap-md`
- Responsive? Use `grid-auto-md` (auto-fit with 280px min per item)

### Header with title and action

```html
<div class="flex items-center justify-between p-lg border-b">
  <h1 class="text-2xl font-bold">Page title</h1>
  <button class="btn btn-primary btn-sm">Add item</button>
</div>
```

**Why this works:**
- `flex items-center` aligns title and button vertically
- `justify-between` pushes them to opposite ends
- `p-lg` gives breathing room
- `border-b` separates header from content

**Variations:**
- Left-aligned (no justify-between): `<div class="flex items-center gap-md p-lg">`
- Stacked on mobile? Use `flex-col` and adjust padding
- Dark header? Add `bg-neutral-900 text-white`

### Form with labels and validation

```html
<form class="stack gap-lg max-w-md">
  <div class="field">
    <label class="field-label field-label-required">Email</label>
    <div class="input-group">
      <span class="input-group-icon-left">📧</span>
      <input class="input input-has-icon-left" type="email" placeholder="you@example.com">
    </div>
  </div>

  <div class="field">
    <label class="field-label">Message</label>
    <textarea class="textarea" placeholder="Your message…"></textarea>
    <span class="field-hint">Max 500 characters</span>
  </div>

  <div class="field">
    <label class="field-label">Terms</label>
    <div class="control">
      <input type="checkbox" class="checkbox" id="agree">
      <label class="control-label" for="agree">I agree to the terms</label>
    </div>
  </div>

  <button class="btn btn-primary btn-block">Send</button>
</form>
```

**Why this works:**
- `stack` (flex column) keeps form vertical
- `gap-lg` spaces fields apart
- `max-w-md` prevents the form from getting too wide
- `field` wrapper groups label, input, and hint
- `input-group` handles icons cleanly
- `control` keeps checkbox and label aligned

**Error state:**
```html
<input class="input input-error" value="…">
<span class="field-error-msg">Email is already registered</span>
```

### Sidebar layout (sticky nav, scrolling content)

```html
<div class="flex h-screen">
  <aside class="w-64 bg-neutral-50 border-r p-lg overflow-y-auto shrink-0">
    <nav class="stack gap-md">
      <a href="#" class="text-md font-semibold text-accent">Dashboard</a>
      <a href="#" class="text-md">Users</a>
      <a href="#" class="text-md">Settings</a>
    </nav>
  </aside>
  <main class="flex-1 overflow-y-auto p-lg">
    <!-- page content here -->
  </main>
</div>
```

**Why this works:**
- `flex` makes sidebar + content side-by-side
- `h-screen` fills viewport
- `w-64` fixed width for sidebar
- `shrink-0` prevents sidebar from compressing
- `overflow-y-auto` lets each section scroll independently
- `flex-1` makes main expand to fill remaining space

### Badge with status

```html
<div class="flex items-center gap-sm">
  <span class="badge badge-success badge-dot">Active</span>
  <span>Jane Doe</span>
</div>
```

**Variations:**
```html
<!-- Pending -->
<span class="badge badge-warning">Pending</span>

<!-- Error -->
<span class="badge badge-danger badge-dot">Failed</span>

<!-- Counter (notifications) -->
<div class="badge-wrapper">
  <button class="btn btn-ghost btn-icon">🔔</button>
  <span class="badge badge-danger badge-counter badge-pos">5</span>
</div>
```

### Modal / Dialog overlay

```html
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal">
  <div class="card card-elevated w-96 p-lg">
    <h2 class="card-title mb-md">Confirm action</h2>
    <p class="card-description mb-lg">Are you sure?</p>
    <div class="flex gap-md justify-end">
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-danger">Delete</button>
    </div>
  </div>
</div>
```

**Why this works:**
- `fixed inset-0` fills the viewport
- `bg-black bg-opacity-50` dims the background
- `flex items-center justify-center` centers the modal
- `z-modal` ensures it's on top
- Inner `card` is the modal itself

---

## Quick reference

**What you need to know on day one:**

| What | How | Examples |
|------|-----|----------|
| **Spacing** | Use semantic scale: xs/sm/md/lg/xl | `p-md`, `mb-lg`, `gap-sm` |
| **Colors** | Semantic + palette number | `text-muted`, `bg-danger`, `border-accent` |
| **Size** | Consistent naming pattern | `btn-sm`, `card-lg`, `input-lg` |
| **Layout** | Flex/grid utilities | `flex`, `center`, `stack`, `grid grid-cols-3` |
| **Forms** | Field wrapper + input | `<div class="field">` + `<label>` + `<input class="input">` |
| **Components** | Combine: element + variant + size | `<button class="btn btn-primary btn-lg">` |

**The two most useful patterns:**

```html
<!-- Flex row: spread items apart -->
<div class="flex items-center justify-between gap-md">
  <span>Title</span>
  <button class="btn btn-sm">Action</button>
</div>

<!-- Flex column: stack vertically -->
<form class="stack gap-lg">
  <input class="input">
  <input class="input">
  <button class="btn btn-primary btn-block">Submit</button>
</form>
```

---

## Component examples

### Button

```html
<!-- Color variants -->
<button class="btn btn-primary">Save</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-danger">Delete</button>
<button class="btn btn-success">Confirm</button>
<button class="btn btn-ghost">Dismiss</button>
<button class="btn btn-subtle">Info</button>
<button class="btn btn-danger-outline">Remove</button>
<button class="btn btn-link">Learn more</button>

<!-- Sizes (semantic scale: xs/sm/md/lg/xl) -->
<button class="btn btn-primary btn-xs">Extra small</button>
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary btn-xl">Extra large</button>

<!-- Shapes -->
<button class="btn btn-primary btn-pill">Rounded pill</button>
<button class="btn btn-primary btn-square">Sharp corners</button>

<!-- Icon buttons with sizes -->
<button class="btn btn-primary btn-icon">→</button>
<button class="btn btn-primary btn-icon btn-sm">→</button>
<button class="btn btn-primary btn-icon btn-lg">→</button>

<!-- Full width -->
<button class="btn btn-primary btn-block">Sign in</button>

<!-- Loading state -->
<button class="btn btn-primary btn-loading">Saving…</button>
<button class="btn btn-secondary btn-loading">Processing…</button>

<!-- Button group -->
<div class="btn-group">
  <button class="btn btn-secondary">Left</button>
  <button class="btn btn-secondary">Center</button>
  <button class="btn btn-secondary">Right</button>
</div>
```

**Button variants:**
- **Color:** `btn-primary`, `btn-secondary`, `btn-danger`, `btn-success`, `btn-ghost`, `btn-subtle`, `btn-danger-outline`, `btn-link`
- **Size:** `btn-xs`, `btn-sm`, `btn-lg`, `btn-xl` (default: md)
- **Shape:** `btn-pill`, `btn-square`
- **Icon:** `btn-icon` (use with size modifiers)
- **Layout:** `btn-block` (full width)
- **State:** `btn-loading` (spinner animation)

### Card

```html
<!-- Basic elevated card -->
<div class="card card-elevated">
  <div class="card-body">
    <h3 class="card-title">Card title</h3>
    <p class="card-description">Description text goes here.</p>
  </div>
</div>

<!-- Card with header, media, and footer -->
<div class="card card-elevated card-interactive">
  <div class="card-header">
    <h3 class="card-title">Header section</h3>
  </div>
  <img class="card-media card-media-square" src="…" alt="…">
  <div class="card-body">
    <p class="card-description">Supporting text.</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary btn-sm">Action</button>
  </div>
</div>

<!-- Flat and outlined variants -->
<div class="card card-flat">…</div>
<div class="card card-outlined">…</div>
<div class="card card-ghost">…</div>

<!-- Card sizes -->
<div class="card card-sm">…</div>  <!-- default: md -->
<div class="card card-lg">…</div>

<!-- Horizontal layout (image left, content right) -->
<div class="card card-horizontal">
  <img class="card-media" src="…" alt="…">
  <div class="card-body">…</div>
</div>

<!-- Status accent borders -->
<div class="card card-accent-top">…</div>        <!-- top accent -->
<div class="card card-accent-left">…</div>       <!-- left accent (default color) -->
<div class="card card-accent-success">…</div>    <!-- green -->
<div class="card card-accent-warning">…</div>    <!-- yellow -->
<div class="card card-accent-danger">…</div>     <!-- red -->

<!-- Media aspect ratios -->
<img class="card-media">              <!-- 16:9 default -->
<img class="card-media card-media-square">      <!-- 1:1 -->
<img class="card-media card-media-portrait">    <!-- 3:4 -->
```

**Card variants:**
- **Style:** `card-elevated` (shadow), `card-flat` (muted bg), `card-outlined` (border), `card-ghost` (transparent)
- **Sections:** `card-header`, `card-body`, `card-footer`, `card-media`
- **Layout:** `card-horizontal` (image + content side by side)
- **Size:** `card-sm`, `card-lg` (default: md)
- **Status:** `card-accent-top`, `card-accent-left`, `card-accent-success`, `card-accent-warning`, `card-accent-danger`
- **Media:** `card-media-square`, `card-media-portrait` (default: 16:9)
- **Interactive:** `card-interactive` (hover effects)

### Badge

```html
<!-- Color variants -->
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-danger">Danger</span>
<span class="badge badge-default">Default</span>
<span class="badge badge-dark">Dark</span>
<span class="badge badge-solid">Solid</span>
<span class="badge badge-outline">Outline</span>

<!-- Shapes and indicators -->
<span class="badge badge-success badge-dot">Active</span>        <!-- dot indicator -->
<span class="badge badge-primary badge-square">v2.0</span>      <!-- square corners -->

<!-- Sizes -->
<span class="badge badge-primary badge-sm">Small</span>
<span class="badge badge-primary">Medium (default)</span>
<span class="badge badge-primary badge-lg">Large</span>

<!-- Counter badge (for notifications) -->
<span class="badge badge-danger badge-counter">5</span>

<!-- Dismissible badge -->
<span class="badge badge-primary badge-dismiss">
  Tag
  <button class="badge-dismiss-btn" aria-label="Remove">×</button>
</span>

<!-- Positioned badge (notification dot) -->
<div class="badge-wrapper">
  <img src="avatar.jpg" alt="User">
  <span class="badge badge-danger badge-counter badge-pos">3</span>
</div>
```

**Badge variants:**
- **Color:** `badge-primary`, `badge-success`, `badge-warning`, `badge-danger`, `badge-default`, `badge-dark`, `badge-solid`, `badge-outline`
- **Shape:** `badge-square` (default: pill)
- **Indicator:** `badge-dot` (colored circle prefix)
- **Size:** `badge-sm`, `badge-lg` (default: md)
- **Special:** `badge-counter` (centered count), `badge-dismiss` (with close button), `badge-pos` (positioned notification)

### Input / Form

```html
<!-- Text input -->
<div class="field">
  <label class="field-label field-label-required">Email</label>
  <input class="input" type="email" placeholder="you@example.com">
  <span class="field-hint">We'll never share your email.</span>
</div>

<!-- Input with icon -->
<div class="field">
  <label class="field-label">Search</label>
  <div class="input-group">
    <span class="input-group-icon-left">🔍</span>
    <input class="input input-has-icon-left" type="text" placeholder="Search…">
  </div>
</div>

<!-- Input with prefix/suffix addon -->
<div class="field">
  <label class="field-label">Price</label>
  <div class="input-addon">
    <span class="input-addon-prefix">$</span>
    <input class="input" type="number" placeholder="0.00">
    <span class="input-addon-suffix">.00</span>
  </div>
</div>

<!-- Input sizes and states -->
<input class="input input-sm" type="text">              <!-- small -->
<input class="input" type="text">                   <!-- default: md -->
<input class="input input-lg" type="text">           <!-- large -->
<input class="input input-error" value="Error">    <!-- error state -->
<input class="input input-success" value="Valid">  <!-- success state -->

<!-- Textarea -->
<div class="field">
  <label class="field-label">Message</label>
  <textarea class="textarea" placeholder="Your message…"></textarea>
</div>

<!-- Select dropdown -->
<div class="field">
  <label class="field-label">Option</label>
  <select class="select">
    <option>Choose one…</option>
    <option>Option A</option>
    <option>Option B</option>
  </select>
</div>

<!-- Checkbox -->
<div class="control">
  <input type="checkbox" class="checkbox" id="agree">
  <label class="control-label" for="agree">I agree to terms</label>
</div>

<!-- Radio -->
<div class="control">
  <input type="radio" class="radio" name="choice" id="r1">
  <label class="control-label" for="r1">Option 1</label>
</div>

<!-- Toggle switch -->
<label class="toggle">
  <input type="checkbox">
  <span class="toggle-track"></span>
  <span class="toggle-thumb"></span>
</label>
```

**Form field structure:**
- **Container:** `field` (flex column, gap between elements)
- **Label:** `field-label`, `field-label-required` (adds red asterisk)
- **Hint:** `field-hint` (small, muted text below input)
- **Error:** `field-error-msg` (small, red text)

**Input variants:**
- **Size:** `input-sm`, `input-lg` (default: md)
- **State:** `input-error`, `input-success`
- **Types:** `input` (text), `textarea`, `select`

**Input groups:**
- **Icon left/right:** `input-group` + `input-group-icon-left`/`input-group-icon-right` + `input-has-icon-left`/`input-has-icon-right`
- **Prefix/suffix:** `input-addon` + `input-addon-prefix` / `input-addon-suffix`

**Checkboxes & Radio:**
- **Inline:** Use `control` wrapper with `control-label` for horizontal alignment
- **Classes:** `checkbox`, `radio` (styled with custom appearance)

**Toggle switch:**
- **Structure:** `<label class="toggle">` wrapper with hidden `<input>`, `toggle-track`, and `toggle-thumb` spans
- **Checked:** Apply `:checked` on input to animate thumb and change track color

### Layout & Typography

```html
<!-- Container with max width -->
<div class="container container-lg">
  <!-- content -->
</div>

<!-- Grid layout with semantic gap -->
<div class="grid grid-cols-3 gap-lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Responsive auto-fit grid -->
<div class="grid grid-auto-md gap-md">
  <div class="card">…</div>
  <div class="card">…</div>
  <div class="card">…</div>
</div>

<!-- Flex utilities with semantic gap -->
<div class="flex items-center justify-between gap-md">
  <span class="text-lg font-semibold">Title</span>
  <button class="btn btn-primary btn-sm">Add new</button>
</div>

<!-- Typography -->
<h1 class="h1">Heading 1 (text-4xl)</h1>
<h2 class="h2">Heading 2 (text-3xl)</h2>
<h3 class="h3">Heading 3 (text-2xl)</h3>

<p class="text-body">Body text at base size</p>
<p class="text-lead">Lead text slightly larger</p>
<p class="text-small">Small text</p>
<p class="text-caption">Caption text (xs)</p>

<!-- Text sizes (standalone) -->
<span class="text-xs">Extra small</span>
<span class="text-sm">Small</span>
<span class="text-base">Base</span>
<span class="text-md">Medium</span>
<span class="text-lg">Large</span>
<span class="text-xl">X-Large</span>
<span class="text-2xl">2X-Large</span>

<!-- Font weight -->
<span class="font-light">Light</span>
<span class="font-normal">Normal</span>
<span class="font-medium">Medium</span>
<span class="font-semibold">Semibold</span>
<span class="font-bold">Bold</span>
<span class="font-black">Black</span>

<!-- Text color -->
<span class="text-default">Default</span>
<span class="text-muted">Muted</span>
<span class="text-subtle">Subtle</span>
<span class="text-accent">Accent</span>
<span class="text-success">Success</span>
<span class="text-warning">Warning</span>
<span class="text-danger">Danger</span>

<!-- Text alignment & decoration -->
<p class="text-left">Left aligned</p>
<p class="text-center">Centered</p>
<p class="text-right">Right aligned</p>
<span class="underline">Underlined</span>
<span class="line-through">Strikethrough</span>

<!-- Line height / tracking -->
<p class="leading-tight">Tight line height</p>
<p class="leading-normal">Normal line height</p>
<p class="leading-relaxed">Relaxed line height</p>
<span class="tracking-tight">Tight letter spacing</span>
<span class="tracking-normal">Normal spacing</span>
<span class="tracking-wide">Wide spacing</span>

<!-- Text truncation -->
<p class="truncate">Very long text that will be cut off with ellipsis…</p>
<p class="line-clamp-2">Text limited to 2 lines with ellipsis…</p>
<p class="line-clamp-3">Text limited to 3 lines with ellipsis…</p>

<!-- Prose (styled markdown-like content) -->
<div class="prose">
  <h1>Heading in prose</h1>
  <p>Paragraphs are auto-spaced.</p>
  <a href="#">Links are styled</a>
  <code>Inline code has bg</code>
  <ul>
    <li>List items</li>
    <li>are indented</li>
  </ul>
</div>
```

**Spacing utilities:**
- **Padding:** `p-xs`, `p-sm`, `p-md`, `p-lg`, `p-xl`, `p-2xl` (or per-side: `px-*`, `py-*`, `pt-*`, `pb-*`, `pl-*`, `pr-*`)
- **Margin:** `m-xs`, `m-sm`, `m-md`, `m-lg`, `m-xl` (or per-side: `mx-*`, `my-*`, `mt-*`, `mb-*`)
- **Gap (flex/grid):** `gap-xs`, `gap-sm`, `gap-md`, `gap-lg`, `gap-xl` (or directional: `gap-x-*`, `gap-y-*`)
- **Space between (fallback):** `space-x-*`, `space-y-*` (adds margin to all siblings)
- **Negative margin:** `-mt-xs`, `-mt-sm`, `-mt-md`, `-mx-md` (useful for overlapping elements)

**Semantic scale mapping:**
```
xs = 0.25rem (4px)
sm = 0.5rem  (8px)
md = 1rem    (16px)
lg = 1.5rem  (24px)
xl = 2rem    (32px)
```

**Container sizes:**
- `container-sm`, `container-md`, `container-lg`, `container-xl`, `container-2xl`

**Grid utilities:**
- **Columns:** `grid-cols-1` through `grid-cols-6`, `grid-cols-12`
- **Auto-fit:** `grid-auto-sm` (200px min), `grid-auto-md` (280px min), `grid-auto-lg` (360px min)
- **Span:** `col-span-1` through `col-span-6`, `col-span-12`, `col-span-full`

**Flex utilities:**
- **Direction:** `flex-row`, `flex-col`, `flex-row-rev`, `flex-col-rev`
- **Wrap:** `flex-wrap`, `flex-nowrap`, `flex-wrap-rev`
- **Grow/shrink:** `flex-1`, `flex-auto`, `flex-none`, `grow`, `grow-0`, `shrink`, `shrink-0`
- **Justify:** `justify-start`, `justify-center`, `justify-end`, `justify-between`, `justify-around`, `justify-evenly`
- **Align:** `items-start`, `items-center`, `items-end`, `items-baseline`, `items-stretch`

**Shortcuts:**
- `center` — flex + items-center + justify-center (perfect for centering anything)
- `stack` — flex column (for vertical layouts, forms, lists)
- `cluster` — flex wrap + items-center (for tag-like layouts)

---

## Dependency rules

| File | Depends on |
|------|-----------|
| `reset.css` | `tokens.css` |
| `typography.css` | `tokens.css` |
| `button.css` | `tokens.css` |
| `card.css` | `tokens.css` |
| `badge.css` | `tokens.css` |
| `input.css` | `tokens.css` |
| `layout.css` | `tokens.css` |
| `spacing.css` | `tokens.css` |
| `color.css` | `tokens.css` |

All files depend only on `tokens.css`. There are **no cross-component dependencies**.

---

## Adding a new component

1. Create `@orchestr-sh/components/mycomponent.css`
2. Add `@import './core/tokens.css';` at the top (comment only — for docs; the `:root` only needs one declaration)
3. Use `var(--token-name)` throughout — no hardcoded values
4. Add the import to `index.css` if you want it in the barrel

---

## Build tool setup

### Vite

Works out of the box with zero config:

```css
@import '@orchestr-sh/motif/core/tokens.css';
@import '@orchestr-sh/motif/components/button.css';
```

### Webpack

Requires `css-loader` with `import: true` (default in most setups):

```js
// webpack.config.js
{
  test: /\.css$/,
  use: [
    'style-loader',
    { loader: 'css-loader', options: { import: true } }
  ]
}
```

Then use imports normally:

```css
@import '@orchestr-sh/motif/core/tokens.css';
```

### PostCSS (with postcss-import)

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import'),
    // ... other plugins
  ]
}
```

Then use imports:

```css
@import '@orchestr-sh/motif/core/tokens.css';
```

### Plain browser / CDN

Include via `<link>` tag (no build step required):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@orchestr-sh/motif@0.1.0/index.css">
```

Or reference individual files:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@orchestr-sh/motif@0.1.0/core/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@orchestr-sh/motif@0.1.0/components/button.css">
```
