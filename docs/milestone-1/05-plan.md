# Project plan

## Timeline

The plan follows the milestone deadlines and the order of the lectures. The front end is taught
first and is due first. The back end comes after.

| Period | Sprint | Goal | Deliverable |
|:-----------|:-------|:-----------------------------------------------|:------------------|
| 8 - 21 Sep | 0 | Concept, scope, data model, mockups, plan | Milestone 1, 21 Sep |
| 22 Sep - 4 Oct | 1 | Vite client, Express server, local MySQL, design tokens, application shell, authentication screens, board with mock data, first sprites | Running client |
| 5 - 18 Oct | 2 | Full front end on mock data: drag and drop, tags, filters, countdown, table view, collection, box opening, companion | Milestone 2, 19 Oct |
| 19 Oct - 1 Nov | 3 | Sequelize models, tasks and tags API, authentication, client connected to the real API | End-to-end application |
| 2 - 15 Nov | 4 | Economy API, security work, poutine catalogue, tests, documentation, rehearsal | Milestone 3, 16 Nov |

Quiz 1 is on 29 September, the midterm on 20 October, Quiz 2 on 3 November. We plan less project
work on those weeks.

## Risks

| Risk | What we do |
|:-------------------------------|:-------------------------------------------------|
| Authentication is taught two weeks before the deadline | We write it in sprint 3 with the course material that is already online |
| The front end is due before the database is taught | The front end runs on mock data first, like the course project |
| Pixel art depends on one person | One image is enough per poutine. Animations and moods are optional |
| Four different local MySQL installations | Each developer has a `.env` file. The schema works on MySQL and MariaDB |
| The game grows and the to-do suffers | The scope table in section 2 is fixed. New ideas become issues labelled `could` |
| Uneven work between members | Each member takes one feature, front and back, so everyone writes both |

## How we work

- **Repository:** one repository, `Tezay/poutine-routine`, with `client/`, `server/` and `docs/`.
- **Branches:** one branch per issue, named `feat/12-kanban-board`, `fix/...`, `docs/...`.
- **Reviews:** a merge into `main` needs a pull request and one approval. A repository ruleset
  blocks everything else. Merges are squashed, so the pull request title follows Conventional
  Commits.
- **Issues:** we write the issues before we start. Each issue has a type, an area and a
  milestone. Members take the issues they want.
- **Language:** English everywhere - interface, code, commits, issues, documentation.
- **Meetings:** we work in the same room every day. Decisions that affect the others are written
  in the repository.
