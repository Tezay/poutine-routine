# Poutine Routine - Client

Frontend of Poutine Routine. This package is the Vue 3 single-page application; the API lives in
`../server` (added in Milestone 3) and the project-wide documentation lives in `../docs`.

## Stack

| Concern          | Choice                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------- |
| Framework        | [Vue 3](https://vuejs.org), Options API                                                 |
| Build tool       | [Vite](https://vite.dev)                                                                |
| Routing          | [Vue Router 4](https://router.vuejs.org)                                                |
| State management | [Pinia](https://pinia.vuejs.org)                                                        |
| Styling          | [Tailwind CSS v4](https://tailwindcss.com), via the official `@tailwindcss/vite` plugin |
| HTTP client      | [axios](https://axios-http.com)                                                         |
| Linting          | [ESLint](https://eslint.org) (flat config) with `eslint-plugin-vue`                     |
| Formatting       | [Prettier](https://prettier.io)                                                         |

We used the same configuration as during de course's Lesson 4 material (`npm create vite@latest`,
Vue Router 4, Tailwind v4 through its Vite plugin). ESLint, Prettier and the CI workflow are
additions on top of that, that we adopted for our project.

The sidebar icons come from [Lucide](https://lucide.dev) (ISC license). The SVG files are copied in
`src/assets/icons/`, there is no icon library.

## Prerequisites

- **Node.js 20 or later** and npm. Check your version with `node --version`.
- A running backend is **not** required to work on the client alone, the dev server starts and
  renders on its own. It will be only needed once a view starts calling the API.

## Getting started

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

The dev server prints the local URL (`http://localhost:5173` by default). Open it in a browser.

## Environment variables

Copy `.env.example` to `.env` and adjust if your API runs somewhere other than the default:

| Variable       | Purpose                                                            | Default                     |
| -------------- | ------------------------------------------------------------------ | --------------------------- |
| `VITE_API_URL` | Base URL used by the axios client in `src/services/http-common.js` | `http://localhost:8080/api` |

Vite exposes only `VITE_`-prefixed variables to client code (Vite's own convention).

## Available scripts

Run from inside `client/`:

| Command                | Effect                                                                    |
| ---------------------- | ------------------------------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server with hot reload                                 |
| `npm run build`        | Type-check-free production build, output to `dist/`                       |
| `npm run preview`      | Serve the last `build` output locally, to sanity-check it before a deploy |
| `npm run lint`         | Run ESLint over the project                                               |
| `npm run lint:fix`     | Run ESLint and auto-fix what it safely can                                |
| `npm run format`       | Run Prettier and rewrite files in place                                   |
| `npm run format:check` | Run Prettier in check-only mode (what CI runs)                            |

Run `lint` and `format` before opening a pull request, the CI workflow
(`.github/workflows/client-ci.yml`) runs `format:check`, `lint` and `build` on every pull request
that touches `client/`, and fails the check if any of them fail.

## Deployment

Every push to `main` deploys the client to GitHub Pages (`.github/workflows/deploy-pages.yml`). The
site only has the frontend, with mock data.

To test the Pages build locally:

```bash
npm run build -- --base=/poutine-routine/
npm run preview -- --base=/poutine-routine/
```

Then open `http://localhost:4173/poutine-routine/`.

## Project structure

```
client/
├── index.html              entry HTML document
├── vite.config.js          Vite config: the Vue and Tailwind plugins
├── eslint.config.js        ESLint flat config
├── .env.example            template for the local .env file
└── src/
    ├── main.js             app entry point: creates the app, installs Pinia and the router
    ├── App.vue             root component: a single <router-view/>
    ├── style.css           imports styles/theme.css and sets base body styles
    ├── router/
    │   └── index.js        route table
    ├── views/              one component per route
    ├── components/         modals and other pieces split out of a view
    ├── stores/             Pinia stores, added when a feature needs one
    ├── services/
    │   └── http-common.js  shared axios instance
    └── styles/
        └── theme.css       fonts, colour tokens, and the @theme mapping (see below)
```

## Theming

Colours live in `src/styles/theme.css` as semantic CSS custom properties (`--bg-default`,
`--fg-muted`, `--border-accent`, etc.), mapped onto Tailwind's `@theme` so utilities like
`bg-bg-default` exist (never hard-coded in a component).

Fonts are self-hosted via `@fontsource/inter` and `@fontsource/pixelify-sans` (`font-sans` and
`font-pixel`), imported at the top of `theme.css` and bundled by Vite.
