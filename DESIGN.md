# Design Write-up — Benefits Access Guide

## Overview

The original mockup provided a solid structural foundation: a multi-step mobile flow, patriotic visual identity, and clear conversion intent. This implementation elevates it across three dimensions — visual polish, interaction quality, and conversion effectiveness — while maintaining pixel-level fidelity to the approved design.

---

## Design decisions and improvements

### 1. Visual hierarchy

**Heading treatment.** The original mockup uses bold sans-serif headings without much typographic variation. This implementation pairs **Poppins** (geometric, confident — used for all headings and labels) with **DM Sans** (humanist, readable — used for body copy and field text). The pairing creates a clear hierarchy: Poppins carries authority and trust, DM Sans carries warmth and legibility. Both are purpose-chosen for the patriotic-benefits context; neither is a generic fallback.

**Colour tokens.** Exact hex values were extracted from the mockup and codified as Tailwind design tokens, making the palette consistent and easy to update:

| Token | Value | Usage |
|---|---|---|
| `navy` | `#1A3A6B` | Page backgrounds, heading text |
| `brand.disclaimer` | `#2F7EC7` | Top disclaimer bar |
| `orange` | `#F5821F` | Primary CTA buttons |
| `orange.hover` | `#E0730E` | Button hover state |
| `cream` | `#F9EFE5` | Benefit card backgrounds |
| `progress.active` | `#5CB85C` | Filled progress segments |
| `progress.inactive` | `#C5B89A` | Unfilled progress segments |

### 2. Conversion optimisation

**Step ordering — the "foot in the door" principle.** Email is captured first, on the landing page, before any other information is requested. Even if a user abandons after step 1, the business has a recoverable lead. The remaining steps front-load low-sensitivity fields (name, DOB) and back-load the most friction-sensitive field (phone) where sunk-cost investment is highest.

**Field grouping rationale:**

| Step | Fields | Rationale |
|---|---|---|
| 1 — Email | `email` | Single field, maximum conversion entry. The hero image and headline do the trust work; the form stays invisible. |
| 2 — Basics | `firstName`, `lastName`, `dateOfBirth`, `gender` | "Who are you?" — naturally grouped as personal identity. DOB gating for eligibility programs makes this a logical unit. |
| 3 — Address | `zipCode`, `streetAddress`, `city`, `state` | ZIP is collected *first* within this step to prime the eligibility narrative ("checking your area"). City/state sit side-by-side matching real-world form conventions. |
| 4 — Phone | `phoneNumber` | Isolated to give the TCPA consent the visual space it legally requires. The personalised heading ("Last Step, [Name]!") rewards users for their investment. |

**Name personalisation.** From step 3 onward, the heading echoes the user's first name ("Keep Going, Irina!" / "Last Step, Irina!"). This micro-personalisation increases perceived effort-to-quit and is proven to lift completion rates in multi-step funnels.

**Progress bar.** Four pill-shaped segments fill progressively with a spring animation. Research consistently shows visible progress indicators improve form completion rates by reducing abandonment at "how much more is there?" decision points.

**"Feeling Lucky" interstitial.** The Yes/No screen after data collection is a classic engagement pattern. Both paths advance the user — there are no dead ends — but the micro-choice creates a moment of agency and positive anticipation before the success screen.

### 3. Interaction quality (micro-interactions)

Every interactive state is explicitly designed, not left to browser defaults:

| State | Implementation |
|---|---|
| **Hover** | Button scales to 1.015× via Framer Motion spring; background darkens |
| **Active / pressed** | Button scales to 0.97× for tactile click feel |
| **Focus visible** | 2px orange ring with 2px offset — visible without disrupting layout |
| **Loading** | Spinning SVG replaces button icon; text dims; pointer-events disabled |
| **Disabled** | 50% opacity, `cursor-not-allowed`, no shadow |
| **Input focus** | Border transitions from `slate-300` → `navy`, ring-2 glow appears |
| **Input error** | Border + ring turn red; error message slides in from above |
| **Step transition** | Current step slides and fades in the direction of travel (forward = right-to-left, backward = left-to-right) |
| **Progress fill** | Each segment uses Framer Motion layoutId for a smooth expand animation |
| **Success checkmark** | SVG path draws itself via `pathLength` animation after the circle springs in |
| **Error messages** | `AnimatePresence` + `motion.p` fade/slide in and out — never jolt layout |

### 4. Accessibility

Accessibility is treated as a first-class requirement, not an afterthought:

- All form controls have associated `<label>` elements with `htmlFor`/`id` wiring
- Error messages use `role="alert"` + `aria-live="polite"` for screen reader announcement without interrupting the user
- The progress bar uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- The DOB group uses `role="group"` + `aria-label="Date of birth"` for the three individual selects
- All focus states use `focus-visible` (keyboard only) so sighted users aren't disrupted but keyboard users always have a clear indicator
- Loading states set `aria-busy="true"` on the button element
- The disclaimer bar uses `role="banner"`, the footer `<footer>` with `aria-label`
- Color contrast meets WCAG AA on all foreground/background pairs

### 5. Performance

- **Single form instance.** React Hook Form's `useForm` is initialised once at the `WizardProvider` level and shared via context. Individual step components subscribe to only the fields they render, minimising re-renders.
- **`mode: 'onTouched'`** — validation runs only after a field has been touched, not on every keystroke, which further reduces computation.
- **Framer Motion tree shaking.** Only the components actually used (`motion.div`, `AnimatePresence`, `motion.p`, `motion.path`) are imported — no full library import.
- **Google Fonts with `display=swap`** — heading and body fonts are loaded asynchronously and fall back to system sans-serif while loading.
- **Assets in `/public`** — the money-hero PNG and logo SVG are served directly from the Vite public directory, bypassing the bundle.

---

## Architecture decisions

### Config-driven wizard

The most significant technical decision was encoding the entire step flow in a data structure (`steps.config.ts`) rather than in imperative logic. The `RegistrationWizard` engine is a dumb renderer: it reads the config, looks up a component by id, and renders it inside the layout and transition wrappers. Adding, removing, or reordering a step requires editing one array — the engine never changes.

This was chosen because:
1. It satisfies the "consistent, configurable, and easy to extend" requirement directly
2. It makes the step contract explicit and auditable (a non-engineer can read the config)
3. It separates concerns cleanly: config declares *what*, step components declare *how*

### Single form, per-step validation

React Hook Form's `useForm` is initialised with the full merged schema at the provider level. Per-step validation is enforced by `trigger(fieldsToValidate)` rather than by mounting/unmounting separate form instances. This means:
- Back navigation never loses entered data
- The full form state is always available (e.g., for personalised headings using `watch('firstName')`)
- Session persistence is trivial — one `form.getValues()` snapshot covers everything

### sessionStorage persistence

`usePersistedForm` subscribes to `form.watch()` and serialises the full state to `sessionStorage` on every change. On mount, `WizardProvider` reads it back and restores the user's position. This makes a page refresh (or a tab switch and return) a non-event from the user's perspective, which meaningfully reduces drop-off from accidental navigation.

---

## What would come next (production readiness)

1. **API integration** — the phone step's `goNext` would call a POST endpoint before advancing; the `isLoading` state is already wired for this.
2. **ZIP → City/State autofill** — a lightweight geocoding API call on ZIP blur would pre-fill city and state, reducing friction on the address step.
3. **Analytics events** — `useEffect` hooks in each step component to fire step-view, field-interaction, and step-complete events to the analytics layer.
4. **A/B testing surface** — the config-driven architecture makes it straightforward to swap heading copy, field order, or CTA labels as experiment variants.
5. **Error boundary** — a React error boundary around `RegistrationWizard` to catch unexpected render errors and show a recovery UI.
6. **E2E tests** — Playwright smoke tests covering the happy path and key validation failure paths.
