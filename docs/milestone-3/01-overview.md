# Overview

## Summary

Milestone 3 is the back end. Poutine Routine is now a full application: a Vue client, a Node.js
API and a MySQL database. Users create an account, log in, and their tasks, tags, fries and
poutines are saved. The session is protected by a token in a cookie.

The client of Milestone 2 did not change much. It now reads and saves its data through the API,
instead of test data.

## Milestones 1 and 2 in short

**Milestone 1** described the problem and the plan. Students start a to-do application and stop
after one or two weeks, because it gives no reason to come back. Our answer is a to-do list with a
small game: a task moved to Done earns fries, fries buy a box, and a box gives a random poutine for
the collection. The document had the database schema (ERD), the mockups, the security plan and
the project plan.

**Milestone 2** was the frontend: six screens in Vue 3 with Tailwind CSS. The board with three
columns, the table, the task form, drag and drop, the tag filter, the collection and the settings
all worked, on test data shaped like the future database.

## Links and how to run it

| Item          | Link                                                                         |
| :------------ | :--------------------------------------------------------------------------- |
| Repository    | <https://github.com/Tezay/poutine-routine>                                   |
| API contract  | [`docs/api.md`](https://github.com/Tezay/poutine-routine/blob/main/docs/api.md) |
| Security tests | [`docs/security-checklist.md`](https://github.com/Tezay/poutine-routine/blob/main/docs/security-checklist.md) |

You need Node.js 20 or later and Docker. The full steps are in the `README.md` of the repository:

```bash
cd server && npm install && cp .env.example .env
docker compose up -d && npm run seed && npm start
cd ../client && npm install && cp .env.example .env && npm run dev
```

Then open `http://localhost:5173` and log in with a test account of the seed.

## Key figures

| Figure                               | Value                                       |
| :----------------------------------- | :------------------------------------------ |
| Pull requests merged since the start | 54 (27 in Milestone 3)                      |
| Milestone 3 issues done              | 26 of 29. The last three are this document, the presentation and the final check |
| API routes                           | 18                                          |
| Database tables                      | 7                                           |
| Lines of server JavaScript           | about 1,100                                 |
| Lines of client Vue and JavaScript   | about 2,400                                 |
| Security measures tested             | 13 of 13 pass                               |

## What works now

| Feature                                  | State                                                    |
| :--------------------------------------- | :------------------------------------------------------- |
| Register, log in, log out                | Works. The session lasts 24 hours                        |
| Tasks: create, edit, delete, move        | Works and is saved                                       |
| Tags: create, rename, recolor, delete    | Works, in Settings                                       |
| Fries when a task is done                | Works. 10 fries, 5 more if done on time, once per task   |
| Boxes                                    | Works. 50 fries, random poutine drawn by the server      |
| Collection and companion                 | Works. Click a poutine to read its story and choose it   |
| Settings: email, password, daily goal    | Works                                                    |
| Light, dark or system theme              | Works. New in Milestone 3                                |
| Daily goal reward and streak             | Not done. The goal is saved, but nothing counts it yet   |
