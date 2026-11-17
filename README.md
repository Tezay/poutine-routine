# Poutine Routine

A secure to-do application with a poutine collection. Finishing a task earns fries, fries buy a
box, a box gives a random poutine. Course project for MOD8 - Advanced Web Programming (Concordia
Continuing Education, Fall 2026).

**Status:** Milestone 3 is done: the client, the API and the MySQL database work together.

## Documentation

Each milestone has a report, written in Markdown and built as a PDF:

- **Milestone 1** - problem, solution, entity-relationship diagram, mockups and project plan:
  [`docs/milestone-1/`](docs/milestone-1) ([PDF](docs/milestone-1/Poutine-Routine-Milestone-1.pdf))
- **Milestone 2** - front-end progress, screenshots, architecture and updated plan:
  [`docs/milestone-2/`](docs/milestone-2) ([PDF](docs/milestone-2/Poutine-Routine-Milestone-2.pdf))
- **Milestone 3** - back end, MySQL, login and session security, security tests, final plan and
  contributions: [`docs/milestone-3/`](docs/milestone-3)
  ([PDF](docs/milestone-3/Poutine-Routine-Milestone-3.pdf))

## Stack

- **Frontend:** Vue 3 (Options API) with Vite, Vue Router, Pinia and Tailwind CSS v4
- **Backend:** Node.js with Express and Sequelize
- **Database:** MySQL 8, run with Docker Compose

Details in [`docs/milestone-2/03-architecture.md`](docs/milestone-2/03-architecture.md) (the
frontend as built) and [`docs/milestone-1/02-solution.md`](docs/milestone-1/02-solution.md) (the
plan).

## Repository layout

```
poutine-routine/
├── client/     Vue 3 frontend, see client/README.md to get it running
├── server/     Node.js / Express API, see server/README.md to get it running
├── docs/       milestone reports, database schema, diagrams and mockups
└── .github/    pull request template and CI workflows
```

## Getting started

You need Node.js 20 or later and Docker (it runs MySQL). Use two terminals.

Terminal 1, the database and the API:

```bash
git clone https://github.com/Tezay/poutine-routine.git
cd poutine-routine/server
npm install
cp .env.example .env
docker compose up -d
npm run seed
npm start
```

In `server/.env`, replace `JWT_SECRET` with a long random text before `npm start`.

Terminal 2, the client:

```bash
cd poutine-routine/client
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173` and log in with a test account from
[`server/README.md`](server/README.md#test-accounts), or create one.

More details, including how to reset the database, in [`server/README.md`](server/README.md) and
[`client/README.md`](client/README.md).

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
