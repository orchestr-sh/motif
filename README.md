# @orchestr-sh

A modular CSS utility library. One file per concern — import only what you need.

---

## Installation

Copy the `@orchestr-sh/` folder into your project, or reference it via a CDN/package.

---

## Usage

### Import everything (quick start)

```css
@import '@orchestr-sh/index.css';
```

### Import selectively (recommended)

Always start with `tokens.css`. Everything else depends on it.

```css
/* Required */
@import '@orchestr-sh/core/tokens.css';
@import '@orchestr-sh/core/reset.css';   /* optional but recommended */

/* Pick what you need */
@import '@orchestr-sh/components/button.css';
@import '@orchestr-sh/components/card.css';
@import '@orchestr-sh/utilities/layout.css';
@import '@orchestr-sh/utilities/spacing.css';
```

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

## Component examples

### Button

```html
<button class="btn btn-primary">Save</button>
<button class="btn btn-secondary btn-sm">Cancel</button>
<button class="btn btn-danger btn-lg btn-pill">Delete account</button>
<button class="btn btn-primary btn-loading">Saving…</button>

<!-- Button group -->
<div class="btn-group">
  <button class="btn btn-secondary">Left</button>
  <button class="btn btn-secondary">Center</button>
  <button class="btn btn-secondary">Right</button>
</div>
```

### Card

```html
<div class="card card-elevated card-interactive">
  <img class="card-media" src="…" alt="…">
  <div class="card-body">
    <h3 class="card-title">Card title</h3>
    <p class="card-description">Supporting text goes here.</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary btn-sm">Action</button>
  </div>
</div>
```

### Badge

```html
<span class="badge badge-success badge-dot">Active</span>
<span class="badge badge-danger">Overdue</span>
<span class="badge badge-primary badge-square">v2.0</span>
```

### Input / Form

```html
<div class="field">
  <label class="field-label field-label-required">Email</label>
  <div class="input-group">
    <input class="input" type="email" placeholder="you@example.com">
  </div>
  <span class="field-hint">We'll never share your email.</span>
</div>

<!-- Toggle -->
<label class="toggle">
  <input type="checkbox">
  <span class="toggle-track"></span>
  <span class="toggle-thumb"></span>
</label>
```

### Layout

```html
<div class="container container-lg">
  <div class="grid grid-cols-3 gap-6">
    <div class="card">…</div>
    <div class="card">…</div>
    <div class="card">…</div>
  </div>
</div>

<div class="flex items-center justify-between gap-4">
  <span class="text-lg font-semibold">Title</span>
  <button class="btn btn-primary btn-sm">Add new</button>
</div>
```

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

## PostCSS / build tools

Works out of the box with any tool that supports `@import`:

- **Vite** — native support, zero config
- **webpack** — `css-loader` with `import: true`
- **PostCSS** — `postcss-import` plugin
- **plain browser** — supported natively in modern browsers
