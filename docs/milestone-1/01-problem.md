# Problem statement

## Context

Our users are students. A student follows homework for several courses, a group project, and
personal tasks. Each task is simple. Keeping the list up to date for fourteen weeks is not.

Every member of our team has used a to-do application before. Every member stopped after one or
two weeks. These applications were fast and free. They gave no reason to come back.

## What goes wrong

- **Finishing a task gives nothing back.** The task disappears and the screen gets emptier. The
  user sees no progress.
- **Due dates are passive.** The date only turns red after the deadline. This is too late.
- **Gamified applications hide the list.** They add levels, quests and several currencies. The
  game becomes the work.
- **Task data is personal.** A task list shows what a student works on and when they are away.
  Many student projects protect this data badly.

## The problem

> Students stop using to-do applications because finishing a task feels like nothing. The
> gamified ones make the task list harder to use. We want a task manager that stays simple and
> fast, gives a small reward for each finished task, and protects user data.

## Target user

One student, on a laptop, with ten to forty open tasks. This student opens the application at
least once a day. There is no team: sharing is out of scope.

## Goals

1. The user comes back the next day.
2. Creating and finishing a task is as fast as in a plain to-do list.
3. Every reward rule is clear without explanation.
4. The user sees a deadline before it is missed.
5. A user can read and write only their own data.

## Constraints

The project is also a course deliverable:

- front end in **Vue.js**, back end in **Node.js**, database in **MySQL**;
- three task statuses: **To Do**, **Doing**, **Done**;
- authentication with **token-based session management**;
- three graded milestones, so the application must work at each stage;
- four students working in one repository for ten weeks.
