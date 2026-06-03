# Benefits Access Guide — Registration Flow

A high-quality, conversion-optimised multi-step registration experience. Built with React + TypeScript, driven by a config-based wizard engine.

---

## Quick start

**Prerequisites:** Node.js ≥ 18, npm ≥ 9

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open http://localhost:5173
```

---

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Serve the production build locally |

---

## Tech stack

| Concern | Library | Why |
|---|---|---|
| Build | **Vite 6 + React 18 + TypeScript** | Fastest HMR, tiny bundles, strict types |
| Form state | **React Hook Form 7** | Minimal re-renders; single form across all steps |
| Validation | **Zod 3** | Type-safe per-step schemas, composable |
| Animations | **Framer Motion 11** | Step slide transitions, micro-interactions |
| Styling | **Tailwind CSS 3** | Design-token-driven, responsive utilities |
| Class merging | **clsx + tailwind-merge** | Conflict-free conditional classes via cn() |

---

## Project structure

```
src/
├── components/
│   ├── ui/                       # Dumb, reusable primitives
│   │   ├── Button.tsx            # Orange CTA, all interaction states
│   │   ├── FormField.tsx         # Label + control + animated error
│   │   ├── TextInput.tsx
│   │   ├── SelectInput.tsx       # Custom chevron
│   │   ├── DateOfBirthInput.tsx  # Three-select composite
│   │   └── PhoneInput.tsx        # Auto-masked (XXX) XXX-XXXX
│   └── layout/
│       ├── PageShell.tsx         # Full-page layout orchestrator
│       ├── DisclaimerBar.tsx
│       ├── HeroHeader.tsx        # Logo + money image + progress
│       ├── ProgressBar.tsx       # 4-segment animated fill
│       ├── TrustBadges.tsx
│       ├── BenefitCards.tsx
│       └── SiteFooter.tsx
│
├── features/registration/
│   ├── config/steps.config.ts    # Single source of truth for the wizard
│   ├── schema/registration.schema.ts
│   ├── hooks/
│   │   ├── useWizard.ts
│   │   └── usePersistedForm.ts
│   ├── steps/                    # EmailStep, BasicsStep, AddressStep,
│   │                             # PhoneStep, LuckyStep, SuccessStep
│   ├── WizardProvider.tsx
│   ├── StepTransition.tsx
│   └── RegistrationWizard.tsx    # Config-driven engine
│
├── lib/
│   ├── constants/index.ts
│   └── utils/index.ts
├── styles/globals.css
├── types/registration.ts
└── main.tsx / App.tsx
```

---

## How the wizard engine works

The flow is driven by `steps.config.ts`. Each StepConfig declares:

- `id` — maps to a component in RegistrationWizard's lookup table
- `progressIndex` — which progress segment to fill
- `heading/subheading` — support {firstName} token interpolation
- `fieldsToValidate` — RHF dot-notation paths to gate before advancing
- `showHeroHeader / showTrustBadges / showBenefitCards` — layout flags

**To add a step:**
1. Add an entry to STEPS in `steps.config.ts`
2. Add matching key + component to STEP_COMPONENTS in `RegistrationWizard.tsx`
3. Add Zod schema for any new fields
Nothing else changes.

---

## Form validation

Per-step Zod schemas are merged into a master registrationSchema used by RHF's zodResolver. goNext() calls `trigger(fieldsToValidate)` before advancing. The form stays mounted across all steps so back navigation never loses data.

Rules: email format, names ≥ 2 chars, DOB valid + age ≥ 18, ZIP 5-digit US, phone (XXX) XXX-XXXX auto-masked.

---

## Session persistence

usePersistedForm subscribes to form.watch() and syncs form state + step index to sessionStorage on every keystroke. On reload, WizardProvider restores the user's position. SuccessStep clears it on mount.

---

## Assumptions

1. No backend integration — phone step would POST to an API in production; the loading state is already wired.
2. No ZIP → City/State autofill — requires geocoding API, not in scope.
3. "Feeling Lucky" — both Yes and No advance to Success; distinction drives downstream logic in production.
4. TCPA copy — reproduced verbatim from the mockup; changes require legal review.
5. Flag background — CSS gradient approximation. Replace .patriotic-bg in globals.css with a background-image URL for a photographic version.

---

See DESIGN.md for design decisions and UX rationale.
