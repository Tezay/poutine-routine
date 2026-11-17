# Project plan

## Planned vs Delivered

In Milestone 2 we committed to four features that need the back end. All four are done.

| Commitment of Milestone 2                       | State                                          |
| :---------------------------------------------- | :--------------------------------------------- |
| Fries when a task is done, once per task        | Done                                           |
| Buy a box with fries, draw on the server        | Done                                           |
| A companion chosen and saved                    | Done, from the Poutinerie                      |
| Create, rename and delete tags                  | Done, in Settings                              |

The full scope table of Milestone 1:

| Feature (priority in Milestone 1)                  | State     | Note                                         |
| :------------------------------------------------- | :-------- | :------------------------------------------- |
| Register, log in, log out, protected session (must) | Done     | JWT in an `httpOnly` cookie                  |
| Task create, edit, delete, with tags and due date (must) | Done | Saved in MySQL                              |
| Kanban board with drag and drop (must)             | Done      |                                              |
| Tag filter (must)                                  | Done      |                                              |
| Fries on completion (must)                         | Done      | 10 fries, 5 more on time                     |
| Boxes and collection (must)                        | Done      |                                              |
| Countdown and overdue alert (must)                 | Done      |                                              |
| Table view (should)                                | Done      |                                              |
| Daily goal and streak (should)                     | Partly    | The goal is saved. The reward and the streak are not counted |
| Companion with moods (should)                      | Partly    | The companion shows its story, without moods |
| Per-poutine effects (should)                       | Not done  |                                              |
| Dark theme (could)                                 | Done      | Light, dark or the system theme              |
| Search (could)                                     | Done      | Done in Milestone 2                          |
| Box animation, statistics, notifications (could)   | Not done  |                                              |

## Timeline

| Period          | Sprint | Goal                                                    | State                     |
| :-------------- | :----- | :------------------------------------------------------ | :------------------------ |
| 8 - 21 Sep      | 0      | Concept, scope, data model, mockups, plan               | Done. Milestone 1         |
| 22 Sep - 4 Oct  | 1      | Client, design tokens, application shell, first sprites | Done                      |
| 5 - 18 Oct      | 2      | Full frontend on test data                              | Done. Milestone 2         |
| 2 Nov - 15 Nov  | 3      | Models, tasks and tags API, login, client on the API, Fries and boxes, security, tests, documentation    | Done. Milestone 3    |

Sprint 3 started late. Authentication and the database came late in the course, a risk we listed
in Milestone 2. To catch up, we wrote the API contract first. Then everyone could build their part
of the server and the client at the same time.

## Risks

| Risk                                       | What happened                                                    |
| :----------------------------------------- | :--------------------------------------------------------------- |
| Authentication is taught late              | The API contract let us work in parallel |
| Different local MySQL installations        | Solved with Docker: the same MySQL for everyone, on macOS and Windows |
| The frontend and the API do not fit        | Solved: the test data already used the database column names     |
| Too little time for security and the game  | Security and the task list came first. Moods and effects were left out |
| Uneven work between members                | Each member built screens in Milestone 2 and API routes in Milestone 3 |
