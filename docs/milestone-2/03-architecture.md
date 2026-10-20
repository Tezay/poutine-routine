# Client architecture

## Stack as built

| Layer | Choice | Note |
|:--------------|:----------------------------|:---------------------------------------------|
| Framework | Vue 3.5, Options API | `setup()` is used only to expose the store, as in the course |
| Build tool | Vite 8 | Created with `npm create vite@latest`, like the course |
| Routing | Vue Router 4.6 | Six routes |
| State | Pinia 4 | One store, for the tasks |
| Styling | Tailwind CSS 4.3 | With the official Vite plugin. No other CSS file than the theme |
| HTTP | axios | One shared instance, ready for Milestone 3. No call is made yet |
| Fonts | Inter and Pixelify Sans | Installed with Fontsource |
| Icons | Lucide | Four SVG files copied in the project, no icon library |
| Quality | ESLint 10, Prettier 3.9 | Both run on every pull request |

The backend (Express, Sequelize, MySQL) is not started. It is the work of Milestone 3.

## Folders

```
client/src/
├── assets/       the logo, 26 poutine sprites, 4 sidebar icons
├── components/   10 components
├── mock/         test data: tasks, tags, poutines, user
├── router/       the six routes
├── services/     the shared axios instance
├── stores/       the tasks store
├── styles/       theme.css, the design tokens
└── views/        one file per screen
```

## How the pieces fit

- A **view** is a screen. There is one per route and it always starts with the top bar.
- A **component** is a part of a screen. A modal or a card is a component, not a route.
- The **tasks store** holds the tasks, the tags, the selected tags and the search text. The board,
  the table, the sidebar and the top bar all read it.
- The **test data** in `src/mock/` fills the store at start. In Milestone 3 the store will fill
  itself from the API.
- The **router** has one extra setting: login and register are marked as full-screen pages, so
  the application shows them without the sidebar and the right column.

| Route | View |
|:----------------|:-----------------------------------------------|
| `/` | Board |
| `/table` | Table |
| `/poutinerie` | Poutinerie (the collection) |
| `/settings` | Settings |
| `/login` and `/register` | Authentication, full screen |

| Component | Role |
|:-------------------|:--------------------------------------------------------------|
| `AppSidebar` | Links, tag filter with task counts |
| `AppTopbar` | Page title, search box, fries balance, main action button |
| `CompanionRail` | The companion, daily goal, streak and the "Open a box" button |
| `TaskColumn` | One column of the board. It is also the drop zone |
| `TaskCard` | One task with its tags and its countdown |
| `TaskModal` | The form to create or edit a task |
| `TaskEditor` | Opens the form. The board and the table both use it |
| `BoxOpeningModal` | The reveal after a box is opened |
| `PoutineSprite` | The image of one poutine |
| `MascotSprite` | A random simple poutine, for the login and the empty board |

## Frontend decisions

### One shared store for the tasks

The board, the table, the filter, the search and the task form all work on the same tasks. A
Pinia store holds them, so a change shows everywhere at once. The course uses Pinia only for the
logged-in user, so this store is an addition of ours. We kept it small:

- **State:** the tasks, the tags, the selected tags and the search text.
- **Getters:** the visible tasks, and the visible tasks of one column.
- **Actions:** add, update, delete and move a task, and turn a tag on or off.

A screen never changes the state by hand: it calls an action. In Milestone 3 the actions will
call the API, and the screens will not change.

### Design tokens with Tailwind

Colours are tokens, defined once in `src/styles/theme.css` and used as Tailwind classes, for
example `bg-bg-muted`, `text-fg-danger` or `border-border-accent`. No component writes a colour
by hand.

### Drag and drop

We use the events of the browser. A card carries the id of its task when it is picked up. A
column accepts the drop, is highlighted while a card is above it, and tells the board which task
was dropped. The board then calls the store. A moved card goes to the end of the new column.

### Test data that matches the API

The files in `src/mock/` use the database column names, for example `due_at`, `completed_at` and
`fries_balance`. A task contains its tags. A poutine with `quantity` 0 is locked. Because the shape
is the same, Milestone 3 changes where the data comes from, and not the screens.

### Dates: local time and UTC

The server will store dates in UTC, so `due_at` ends with a `Z`. The task form works in local
time. The form converts the date in both directions, so a task keeps its hour when it is edited.
A date without a time is saved as 23:59 of that day. The countdown updates every minute, and its
timer stops when the card leaves the screen.

### Pixel-art sprites

Each poutine is one PNG of 96 by 96 pixels, named after its slug. We show it at whole multiples
(96 or 192 pixels) with sharp pixels, so the art stays clean. A locked poutine is the same image
turned into a black silhouette with CSS.

### Quality: lint, format, CI and merge rules

ESLint and Prettier run on every pull request, with the build, in a GitHub Actions workflow. A
repository ruleset blocks a merge without a pull request, one approval and a green check. Merges
are squashed, and the pull request title follows Conventional Commits. Each pull request has a
"How to verify" list.

We tested the frontend by hand in the browser, with that list. We have no automated tests.

### Deployment on GitHub Pages

Every merge into the `main` builds the client and publishes it on GitHub Pages. The site has only the
frontend and the test data.
