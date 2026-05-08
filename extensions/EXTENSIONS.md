# Motif Extensions

Extensions let you add custom components and themes to Motif without modifying the core library. Any CSS file following the Motif patterns can be a plugin.

## Token contract

All Motif extensions must:

1. **Only reference tokens defined in `core/tokens.css`**
   - Use semantic token aliases: `--color-bg`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-border-strong`, `--color-accent`, `--color-success-500`, etc.
   - Use spacing tokens: `--space-1` through `--space-24`
   - Use typography, radius, shadow, transition, and z-index tokens
   - Do not hardcode color values, spacing, or other design decisions

2. **Follow the Motif class naming convention**
   - Component prefix: `.component-name-*`
   - Semantic modifiers: `-variant`, `-size` (xs/sm/md/lg/xl), `-shape`, `-state`
   - Example: `.accordion`, `.accordion-primary`, `.accordion-sm`, `.accordion-open`

3. **Support dark mode automatically**
   - Never define custom `:root` blocks
   - Reference semantic tokens only
   - When users toggle dark mode via `[data-theme="dark"]`, your colors automatically invert

4. **Work without build tools**
   - Use native CSS only (no preprocessing)
   - Use escaped colons for responsive variants if needed: `.md\:component-name`

5. **Declare dependencies**
   - Add a comment at the top of your CSS file:
     ```css
     /**
      * extension-name.css
      * Description here.
      * Depends on: tokens.css, layout.css (if needed)
      */
     ```

## Creating an extension

### Minimal component example

```css
/**
 * accordion.css
 * Accordion / disclosure component.
 * Depends on: tokens.css
 */

.accordion {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.accordion-item {
  border-bottom: 1px solid var(--color-border);
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-trigger {
  width: 100%;
  padding: var(--space-4);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  transition: background-color var(--duration-normal) var(--ease-default);
}

.accordion-trigger:hover {
  background-color: var(--color-bg-muted);
}

.accordion-panel {
  padding: 0 var(--space-4) var(--space-4) var(--space-4);
  color: var(--color-text-muted);
}

/* Open state (controlled by JS or details/summary) */
.accordion-item[open] .accordion-panel {
  display: block;
}
```

### Using an extension

```css
/* Your site CSS */
@import '@orchestr-sh/motif/core/tokens.css';
@import '@orchestr-sh/motif/index.css';
@import './extensions/accordion.css';
```

## Publishing an extension

### As an npm package

```json
{
  "name": "@user/motif-accordion",
  "version": "1.0.0",
  "main": "accordion.css",
  "files": ["accordion.css"],
  "keywords": ["motif", "extension", "accordion"]
}
```

Then users install and import:

```bash
npm install @user/motif-accordion
```

```css
@import '@orchestr-sh/motif/index.css';
@import '@user/motif-accordion';
```

### As a local file

Keep extensions in your `extensions/` directory:

```
extensions/
├── accordion.css
├── tabs-custom.css
└── theme-dark-alt.css
```

Then import them:

```css
@import './extensions/accordion.css';
@import './extensions/tabs-custom.css';
```

## Best practices

1. **Keep it small** — One component per file or closely related set
2. **Use consistent naming** — Mirror Motif's patterns for familiarity
3. **Test both modes** — Verify your extension works in light and dark theme
4. **Document usage** — Include HTML examples in comments
5. **Don't override core** — Extend tokens, don't redefine them
6. **Semantic over specific** — Use `--color-text` not `--color-neutral-900`

## Semantic tokens reference

### Colors

- **Background:** `--color-bg`, `--color-bg-subtle`, `--color-bg-muted`
- **Text:** `--color-text`, `--color-text-muted`, `--color-text-subtle`
- **Borders:** `--color-border`, `--color-border-strong`
- **Accent:** `--color-accent`, `--color-accent-hover`, `--color-accent-subtle`
- **Status:** `--color-success-500`, `--color-warning-500`, `--color-danger-500`
- **Palette:** `--color-primary-{50..900}`, `--color-neutral-{50..900}`

### Spacing

`--space-0`, `--space-px`, `--space-1`, `--space-2`, `--space-3`, `--space-4`, `--space-5`, `--space-6`, `--space-8`, `--space-10`, `--space-12`, `--space-16`, `--space-20`, `--space-24`

### Typography

- **Font families:** `--font-sans`, `--font-serif`, `--font-mono`
- **Sizes:** `--text-xs`, `--text-sm`, `--text-base`, `--text-md`, `--text-lg`, `--text-xl`, `--text-2xl`, `--text-3xl`, `--text-4xl`
- **Weight:** `--font-weight-light`, `--font-weight-normal`, `--font-weight-medium`, `--font-weight-semibold`, `--font-weight-bold`, `--font-weight-black`
- **Line height:** `--leading-tight`, `--leading-snug`, `--leading-normal`, `--leading-relaxed`, `--leading-loose`

### Other

- **Radius:** `--radius-none`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-2xl`, `--radius-3xl`, `--radius-full`
- **Shadows:** `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--shadow-2xl`, `--shadow-inner`
- **Transitions:** `--duration-fast`, `--duration-normal`, `--duration-slow`, `--duration-slower`
- **Z-index:** `--z-base`, `--z-raised`, `--z-dropdown`, `--z-sticky`, `--z-overlay`, `--z-modal`, `--z-toast`, `--z-tooltip`

## Questions?

Open an issue on [GitHub](https://github.com/orchestr-sh/motif/issues) to discuss extension design or share your plugin!
