# Project plan

## Planned vs Delivered

This table follows the scope table of Milestone 1.

| Feature (priority in Milestone 1) | State | Note |
|:--------------------------------------------|:---------------------|:------------------------------------------|
| Register, log in, log out, protected session | Screens only | Register and login screens exist. Log out and the session need the backend |
| Task create, edit, delete, with tags and due date | Done | Title, description, status, due date, priority, tags |
| Kanban board with drag and drop and a keyboard way | Done | The Status field of the task form is the keyboard way |
| Tag filter | Done | Several tags at once |
| Fries on completion | Moved to Milestone 3 | The server computes it and pays once per task |
| Boxes and collection | Collection done, boxes partly | The box shows a random poutine. Paying with fries moves to Milestone 3 |
| Countdown and overdue alert | Done | |
| Table view | Done | Sort by column |
| Daily goal and streak | Display only | Counting needs the server |
| Companion with moods | Not done | The companion shows its sprite and one sentence |
| Per-poutine effects | Not done | |
| Dark theme | Not done | The design tokens make it possible |
| Search | Done | Done earlier than planned |
| Box animation, statistics, browser notifications | Not done | Optional if we have time |

For Milestone 3 we commit to four things that need the backend:

1. fries given when a task is done, once per task
2. buying a box with fries, and drawing the poutine on the server
3. a companion that is chosen in Settings and saved
4. creating, renaming and deleting tags

The other features stay "if time allows".

## Timeline

| Period | Sprint | Goal in Milestone 1 | State |
|:-----------|:-------|:-----------------------------------------------|:------------------|
| 8 - 21 Sep | 0 | Concept, scope, data model, mockups, plan | Done. Milestone 1 |
| 22 Sep - 4 Oct | 1 | Vite client, Express server, local MySQL, design tokens, application shell, authentication screens, board with mock data, first sprites | Client, design tokens and first sprites done. Express server and MySQL move to sprint 3 |
| 5 - 18 Oct | 2 | Full frontend on mock data | Done, with the changes above. Milestone 2 |
| 19 Oct - 1 Nov | 3 | Sequelize models, tasks and tags API, authentication, client connected to the API | Next |
| 2 - 15 Nov | 4 | Economy API, security work, poutine catalogue, tests, documentation | Next. Milestone 3, 16 Nov |

## Risks

| Risk | State | What we do |
|:-------------------------------|:-----------|:-------------------------------------------------|
| Authentication is taught late | Open | We start it early, with the course material already online |
| The frontend comes before the database | Handled | The frontend runs on test data shaped like the database |
| Pixel art depends on one person | Handled for now | One image per poutine is enough. Moods and animations are optional |
| Different local MySQL installations | Open | One `.env` file per developer, and a schema that works on MySQL and MariaDB |
| The game grows and the to-do suffers | Open | The task list comes first. Game rules that need the server wait |
| Uneven work between members | Open | We update the task table at each milestone |
| The frontend and the API do not fit | New | The test data uses the database column names |
| Too little time for security and the game | New | Security and the task list come first, the game waits |

## How we work

This section does not change since Milestone 1, with one addition: the client is now published on
GitHub Pages after each merge into `main`.
