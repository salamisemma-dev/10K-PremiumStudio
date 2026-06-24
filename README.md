# 10K-PremiumStudio

10K-PremiumStudio is a repository for building calm, cinematic, high-performance premium landing pages without letting prompts, brand rules, client input, and code drift apart.

## How This Repo Works

1. Read `AGENTS.md`.
2. Read the nearest child `AGENTS.md` for the files you will touch.
3. Start with `projects/<client>/brief.md`.
4. Load `brand/manifest.md`, the `blueprints/`, and `skills/premium-dev-skill.md`.
5. Consult the design corpus for candidates: `npm run design:lookup -- font "<scene mood>"` (rule: `blueprints/04-design-intelligence.md`; the scene always wins).
6. Build in `apps/`.
7. Prove the result with `npm run check`.

## Source Ownership

- `brand/` owns identity, tone, and hard brand rules.
- `blueprints/` owns visual architecture, motion, SEO, accessibility, and performance rules.
- `prompts/` owns generation templates.
- `projects/` owns client input and assumptions.
- `apps/` owns implementation code.
- `checks/` owns executable verification.
- `design-intelligence/` is a consulted corpus (candidates only); `constitution.md` + `specs/` are the permanent intent, gated by `npm run spec:validate`.

## Commands

```powershell
npm install
npm run check
npm run build
```

## Secrets

Never commit real API keys. Copy `.env.example` to `.env` locally and fill values outside git.
