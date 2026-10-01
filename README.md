# Poutine Routine

A secure to-do application with a poutine collection. Finishing a task earns fries, fries buy a
box, a box gives a random poutine. Course project for MOD8 - Advanced Web Programming (Concordia
Continuing Education, Fall 2026).

See [`docs/milestone-1/`](docs/milestone-1) for the full write-up: problem statement, proposed
solution, entity-relationship diagram, mockups, and project plan.

## Stack

- **Frontend:** Vue 3 (Options API) with Vite and Tailwind CSS v4
- **Backend:** Node.js with Express and Sequelize (Milestone 3)
- **Database:** MySQL 

Details in [`docs/milestone-1/02-solution.md`](docs/milestone-1/02-solution.md).

## Repository layout

```
poutine-routine/
├── client/     Vue 3 frontend, see client/README.md to get it running
├── server/     Node.js / Express API (Milestone 3)
├── docs/       milestone reports, database schema, diagrams and mockups
└── .github/    pull request template and CI workflows
```

## Getting started

```bash
git clone git@github.com:Tezay/poutine-routine.git
cd poutine-routine/client
npm install
cp .env.example .env
npm run dev
```

See [`client/README.md`](client/README.md) for prerequisites, environment variables, available
scripts, the theming system, and coding conventions.

## Contributing

All changes to `main` go through a pull request:

1. Create or assign yourself a GitHub issue, labelled by type (`feat`, `fix`, `docs`, `chore`),
area (`area: client`, `area: server`, `area: database`, `area: design`, `area: docs`), and milestone.
2. Create one branch per issue, e.g. `feat/12-kanban-board` or `fix/18-romano-denoualo-problemo`.
3. Open a PR into `main` with `Closes #<issue>` and a 
[Conventional Commits](https://www.conventionalcommits.org) title.
4. PRs require one approval and passing CI checks (lint, format, build) before merging.
5. Use squash merge; the PR title becomes the commit message on `main`, and the branch is deleted after merge.

Branch protection and review requirements are enforced by the repository ruleset.

## Team

Eliot Cupillard ([@Tezay](https://github.com/Tezay)) ·
Abigaïl Mialaret ([@abi-mlrt](https://github.com/abi-mlrt)) ·
Romain Denoual ([@Buffaloexe](https://github.com/Buffaloexe)) ·
Tiffany Vongchanh ([@tiffvgch](https://github.com/tiffvgch))
