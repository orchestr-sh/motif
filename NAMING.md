# Naming Philosophy

Motif's classes are designed to be **memorable, clear, and consistent**. Every name follows specific patterns that let you predict what a class does—and remember it.

## The semantic scale: xs, sm, md, lg, xl

This is the most important concept in Motif. Everything that has a size uses this scale:

```
xs = extra small   (0.25rem / 4px)
sm = small         (0.5rem / 8px)
md = medium        (1rem / 16px)
lg = large         (1.5rem / 24px)
xl = extra large   (2rem / 32px)
```

This scale is used everywhere:

- **Spacing:** `p-md`, `m-lg`, `gap-sm`
- **Button sizes:** `btn-xs`, `btn-sm`, `btn-lg`, `btn-xl`
- **Card sizes:** `card-sm`, `card-lg`
- **Input sizes:** `input-sm`, `input-lg`
- **Badge sizes:** `badge-sm`, `badge-lg`

**Why?** You learn the scale once and apply it everywhere. No more guessing whether it's `p-4`, `p-2`, or `p-6`—it's always `p-md`, `p-sm`, or `p-lg`.

---

## Component naming: What it is, then what kind

All components follow a simple pattern:

```
.component-[variant]-[size]-[state]
```

### Button

```
btn                          ← base class (required)
btn-primary                  ← variant (color)
btn-sm                       ← size
btn-pill                     ← shape
btn-icon                     ← type
btn-loading                  ← state
```

**Examples:**
- `class="btn btn-primary"` — primary button, medium (default)
- `class="btn btn-secondary btn-sm"` — secondary, small
- `class="btn btn-danger btn-lg btn-pill"` — danger, large, pill-shaped
- `class="btn btn-primary btn-icon"` — icon button (square, same height/width)

### Card

```
card                         ← base class (required)
card-elevated                ← variant (visual style)
card-sm                      ← size
card-interactive             ← behavior
card-accent-success          ← status indicator
card-header                  ← section (child element)
card-body                    ← section
card-footer                  ← section
card-media                   ← image/media container
```

**Examples:**
- `class="card"` — basic card with border
- `class="card card-elevated card-interactive"` — with shadow, clickable
- `class="card card-sm card-accent-success"` — small, green accent
- `<div class="card-header">` — header section

### Badge

```
badge                        ← base class (required)
badge-success                ← color variant
badge-sm                     ← size
badge-square                 ← shape
badge-dot                    ← indicator style
badge-dismiss                ← behavior (with close button)
```

**Examples:**
- `class="badge badge-success"` — success badge, medium pill-shaped
- `class="badge badge-danger badge-dot"` — danger with dot indicator
- `class="badge badge-primary badge-sm badge-square"` — small, square shape

### Input / Form

```
input                        ← text input
textarea                     ← multi-line input
select                       ← dropdown
checkbox                     ← single choice
radio                        ← single choice in group
toggle                       ← on/off switch

field                        ← form field container
field-label                  ← label in field
field-label-required         ← adds red asterisk
field-hint                   ← helper text below input
field-error-msg              ← error message

input-group                  ← icon/addon wrapper
input-group-icon-left        ← icon position
input-group-icon-right       ← icon position
input-addon                  ← prefix/suffix wrapper
input-addon-prefix           ← left addon
input-addon-suffix           ← right addon

control                      ← inline checkbox/radio + label
control-label                ← label in control row
```

**Examples:**
- `<div class="field">` — form field (groups label, input, hint)
- `<input class="input">` — text input, medium (default)
- `<input class="input input-sm input-error">` — small input with error state
- `<div class="input-group">` — wrapper for icon + input
- `<div class="control">` — inline checkbox + label

---

## Spacing and sizing naming

### Padding & Margin

All use the semantic scale:

```
p-xs, p-sm, p-md, p-lg, p-xl, p-2xl    ← all sides
px-xs, px-sm, px-md, px-lg, px-xl      ← left & right
py-xs, py-sm, py-md, py-lg, py-xl      ← top & bottom
pt-xs, pt-sm, pt-md, pt-lg, pt-xl      ← top only
pb-xs, pb-sm, pb-md, pb-lg, pb-xl      ← bottom only
pl-xs, pl-sm, pl-md, pl-lg, pl-xl      ← left only
pr-xs, pr-sm, pr-md, pr-lg, pr-xl      ← right only

m-xs, m-sm, m-md, m-lg, m-xl           ← margin (all sides)
mx-xs, mx-sm, mx-md, mx-lg, mx-xl      ← margin (horizontal)
my-xs, my-sm, my-md, my-lg, my-xl      ← margin (vertical)
mt-xs, mt-sm, mt-md, mt-lg, mt-xl      ← margin-top
mb-xs, mb-sm, mb-md, mb-lg, mb-xl      ← margin-bottom
```

**Special values:**
- `m-auto`, `mx-auto`, `my-auto` — centers content
- `ml-auto`, `mr-auto` — pushes left or right

### Gap (flex/grid spacing)

Same semantic scale:

```
gap-xs, gap-sm, gap-md, gap-lg, gap-xl          ← all directions
gap-x-xs, gap-x-sm, gap-x-md, gap-x-lg         ← horizontal only
gap-y-xs, gap-y-sm, gap-y-md, gap-y-lg         ← vertical only
```

---

## Color naming

### Text colors

```
text-default       ← primary text (dark gray)
text-muted         ← secondary text (medium gray)
text-subtle        ← tertiary text (light gray)
text-accent        ← action/link color (blue)
text-success       ← positive/success (green)
text-warning       ← caution/warning (yellow)
text-danger        ← error/danger (red)
text-white         ← on dark backgrounds
```

**vs Tailwind:** instead of `text-gray-600`, `text-gray-700`, `text-gray-800`, we have just `text-default`, `text-muted`, `text-subtle`. Fewer to remember, same flexibility via tokens.

### Background colors

```
bg-base            ← main background (white)
bg-subtle          ← light background (off-white)
bg-muted           ← darker background (light gray)
bg-white           ← pure white
bg-black           ← pure black
bg-transparent     ← no background

bg-danger          ← danger background (red)
bg-success         ← success background (green)
bg-warning         ← warning background (yellow)
bg-primary-100     ← light tint
bg-primary-500     ← standard color
bg-primary-700     ← darker variant
```

### Border colors

```
border-default     ← standard border (light gray)
border-strong      ← strong border (darker gray)
border-accent      ← accent color
border-success     ← success color
border-warning     ← warning color
border-danger      ← danger color
border-transparent ← no border
```

---

## Layout utilities naming

### Display

```
block, inline-block, inline
flex, inline-flex
grid, inline-grid
hidden
```

These are one-to-one with CSS `display` values.

### Flex direction

```
flex-row           ← default (left to right)
flex-col           ← top to bottom
flex-row-rev       ← right to left
flex-col-rev       ← bottom to top
```

### Justify content

```
justify-start      ← items flush left
justify-center     ← items centered
justify-end        ← items flush right
justify-between    ← space between items
justify-around     ← space around items
justify-evenly     ← equal space everywhere
```

### Align items

```
items-start        ← top aligned
items-center       ← vertically centered
items-end          ← bottom aligned
items-baseline     ← baseline aligned
items-stretch      ← fill container height
```

### Shortcuts (useful combinations)

```
center             ← flex + items-center + justify-center
stack              ← flex-col (for vertical lists/forms)
cluster            ← flex-wrap + items-center (for tags)
```

---

## Why this naming system works

1. **Consistent:** Learn one pattern and predict all names
2. **Memorable:** `p-md`, `btn-lg`, `text-muted` are obvious after you've seen them once
3. **Semantic:** Names describe meaning, not implementation (`text-muted` vs `text-gray-600`)
4. **Scalable:** New components follow the same patterns
5. **Themeable:** Change tokens, all classes update automatically

---

## Quick lookup table

| Need | Class pattern | Examples |
|------|---|---|
| Space inside | `p-{xs,sm,md,lg,xl}` | `p-md`, `px-lg`, `py-sm` |
| Space outside | `m-{xs,sm,md,lg,xl}` | `m-md`, `mx-auto`, `mt-lg` |
| Gap in flex/grid | `gap-{xs,sm,md,lg,xl}` | `gap-md`, `gap-x-sm`, `gap-y-lg` |
| Button size | `btn-{xs,sm,lg,xl}` | `btn-sm`, `btn-lg` |
| Card size | `card-{sm,lg}` | `card-sm`, `card-lg` |
| Input size | `input-{sm,lg}` | `input-sm`, `input-lg` |
| Badge size | `badge-{sm,lg}` | `badge-sm`, `badge-lg` |
| Text color | `text-{default,muted,subtle,accent,success,warning,danger,white}` | `text-muted`, `text-danger` |
| Background | `bg-{base,subtle,muted,white,black,danger,success,warning}` | `bg-muted`, `bg-success` |
| Border | `border-{default,strong,accent,danger,success,warning}` | `border-accent`, `border-danger` |
| Flex layout | `flex`, `flex-col`, `justify-between`, `items-center` | `flex items-center justify-between` |
| Grid layout | `grid`, `grid-cols-{1..6}`, `grid-cols-12` | `grid grid-cols-3 gap-lg` |
