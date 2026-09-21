# Design Spec — extracted from the template

Every value here comes from the Vercel template at `D:\Rohit\vercel portfolio`.
This is the target. Do not invent values; look them up here.

---

## Colours

The template uses `oklch()`, a modern colour format supported by all current
browsers. Use these exact values — copy them literally.

| Purpose              | Value                        | Used for                       |
|----------------------|------------------------------|--------------------------------|
| background           | `oklch(0.145 0.005 260)`     | page background (near-black)   |
| foreground           | `oklch(0.96 0.003 260)`      | main text (near-white)         |
| card                 | `oklch(0.185 0.006 260)`     | project card backgrounds       |
| primary (accent)     | `oklch(0.86 0.19 128)`       | the lime green — links, accents|
| primary-foreground   | `oklch(0.17 0.02 128)`       | text ON the green buttons      |
| secondary            | `oklch(0.24 0.006 260)`      | tag pill backgrounds           |
| muted-foreground     | `oklch(0.68 0.006 260)`      | dimmed text, descriptions      |
| border               | `oklch(1 0 0 / 9%)`          | all borders (white at 9% alpha)|

### Reading oklch

`oklch(L C H)` — Lightness 0–1, Chroma (saturation), Hue 0–360.
Only the lightness changes between most of these greys, which is why the
palette feels consistent.

---

## Typography

Font family: **Geist Sans** for text, **Geist Mono** for small labels,
years, tags, and section numbers.

Both are free Google Fonts. Fallback stack:
`font-family: Geist, system-ui, sans-serif;`
`font-family: 'Geist Mono', ui-monospace, monospace;`

### Sizes

| Element                | Desktop | Mobile | line-height |
|------------------------|---------|--------|-------------|
| Hero `h1`              | 96px    | 48px   | 1.05        |
| Hero tagline           | 20px    | 18px   | normal      |
| Section `h2`           | 36px    | 30px   | tight       |
| Project title `h3`     | 20px    | 20px   | tight       |
| Body text              | 16px    | 16px   | 1.6         |
| Project description    | 14px    | 14px   | relaxed     |
| Small mono labels      | 12px    | 12px   | normal      |
| Tag pills              | 11px    | 11px   | normal      |

Headings use `font-weight: 600` (semibold) and slightly negative
`letter-spacing` (`-0.025em`) — this is the "tracking-tight" look.

---

## Spacing

The template uses a 4px scale. Every spacing value is a multiple of 4.

| Where                          | Value       |
|--------------------------------|-------------|
| Page container max width       | 1152px      |
| Container horizontal padding   | 24px        |
| Section vertical padding       | 96px (128px on desktop) |
| Gap between project cards      | 24px        |
| Card inner padding             | 24px        |
| Gap under a section heading    | 48px        |
| Gap between tag pills          | 8px         |

---

## Components

### Section heading
A row of three things side by side:
`[mono number]  [the h2 title]  [a thin line filling the rest]`
Gap of 16px between them. The number is green, 14px, mono. The line is 1px
tall, uses the border colour, and stretches to fill remaining space.

### Project card
- Background: card colour
- Border: 1px, border colour, turns greenish on hover
- Corner radius: 18px
- Image on top, 16:10 aspect ratio, image scales up slightly on hover
- Below the image: 24px padding, containing
  - title (left) and year in mono (right), on one row
  - description in muted colour, 12px below
  - row of tag pills, 20px below
- Two cards per row on desktop, one per row on mobile

### Tag pill
- Background: secondary colour
- Padding: 4px top/bottom, 8px left/right
- Corner radius: 8px
- 11px mono text

### Buttons (hero)
- Primary: green background, dark text, fully rounded (pill shape),
  24px horizontal padding, 12px vertical
- Secondary: transparent background, 1px border, same shape and padding

---

## Breakpoints

| Name    | Width    | Meaning                     |
|---------|----------|-----------------------------|
| mobile  | < 768px  | default styles              |
| desktop | >= 768px | the `md:` styles above      |

Build mobile first, then add desktop overrides.
