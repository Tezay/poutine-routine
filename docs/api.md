# API contract

This page lists every route of the server. The client and the server are built from it. If a
route has to change, change this page in the same pull request.

## Rules for every route

| Topic | Rule |
|:--------------|:-----------------------------------------------------------------------|
| Base URL | `http://localhost:8080/api` |
| Format | JSON in, JSON out |
| Field names | The column names of the database (`snake_case`), like the files in `client/src/mock/` |
| Dates | ISO 8601 text in UTC (example `2026-10-27T18:00:00.000Z`) |
| Session | A JWT in the `jwt` cookie: `httpOnly`, `SameSite=Strict`, 24 hours. The client sends it with `withCredentials` |
| Who is calling | The user id always comes from the cookie, never from the request |
| Errors | `{ "message": "Short sentence." }` with the status code of the table below |

| Code | Meaning |
|:-----|:-----------------------------------------------------------------------|
| 200 | Done |
| 201 | Created |
| 400 | The data sent is not valid, or the action is not possible (not enough fries) |
| 401 | Not logged in, or the cookie is not valid |
| 404 | Not found. It is also the answer for the data of another user |
| 409 | Already used (email, username or tag name) |
| 429 | Too many requests (login and register) |
| 500 | Server error, without details |

All routes need the session except `POST /user`, `POST /user/login` and `POST /user/logout`.

## User and session

The routes use `/user` (the current user).

| Method and path | Body | Answer |
|:------------------------|:-------------------------------------------|:-----------------------------------|
| `POST /user` | `username`, `email`, `password` (8 to 72 characters) | 201, the user |
| `POST /user/login` | `email`, `password` | 200, the user, and the cookie |
| `GET /user/auth` | none | 200, the user |
| `POST /user/logout` | none | 200, the cookie is cleared |
| `PUT /user` | `email`, `password`, `daily_goal` (all optional) | 200, the user |
| `PUT /user/companion` | `poutine_id` | 200, the user |
| `DELETE /user` | none | 200, the account and its data are deleted |

A wrong email and a wrong password both answer 401 `Invalid email or password.`

The user, as returned by the server (password hash never sent):

```json
{
  "id": 1,
  "username": "romano",
  "email": "romano@example.com",
  "fries_balance": 340,
  "daily_goal": 3,
  "current_streak": 0,
  "best_streak": 0,
  "last_completed_on": null,
  "companion_poutine_id": 1,
  "created_at": "2026-11-08T10:00:00.000Z",
  "updated_at": "2026-11-08T10:00:00.000Z"
}
```

A new account starts with 0 fries and the starter poutine as companion.

## Tasks

| Method and path | Body | Answer |
|:------------------------|:----------------------------------------------------------|:------------------------|
| `GET /tasks` | none | 200, the list of tasks |
| `POST /tasks` | `title`, and optional `description`, `status`, `priority`, `due_at`, `tag_ids` | 201, the task |
| `PUT /tasks/:id` | `title`, `description`, `priority`, `due_at`, `tag_ids` (all optional) | 200, the task |
| `PUT /tasks/:id/move` | `status` (`todo`, `doing` or `done`) | 200, `{ task, fries_earned, fries_balance }` |
| `DELETE /tasks/:id` | none | 200 |

## Tags

| Method and path | Body | Answer |
|:------------------------|:-------------------------------|:-------------------|
| `GET /tags` | none | 200, the list |
| `POST /tags` | `name` (30 characters at most), `color` (`#rrggbb`) | 201, the tag |
| `PUT /tags/:id` | `name`, `color` (optional) | 200, the tag |
| `DELETE /tags/:id` | none | 200, the tag is removed from its tasks |

A tag is `{ id, name, color, created_at }`. Two tags of the same user cannot have the same name.

## Poutines and boxes

| Method and path | Body | Answer |
|:------------------------|:----------|:--------------------------------------------------|
| `GET /poutines` | none | 200, the whole catalogue for the user |
| `POST /boxes` | none | 200, `{ poutine, is_new, fries_balance }` |

- A poutine has the fields of `client/src/mock/poutines.js`: `id`, `slug`, `name`, `lore`,
  `rarity`, `sprite`, `effect`, `quantity` and `first_obtained_at`. `quantity` is 0 when the user
  does not own it.
- `POST /boxes` costs 50 fries. With less, the answer is 400 and nothing changes.
- `PUT /user/companion` accepts only a poutine the user owns.

## Fries rules (server only)

| Rule | Value |
|:----------------------------------------|:----------------------------------------|
| A task moved to Done | 10 fries, once per task (`rewarded_at`) |
| Done before `due_at` | 5 more fries |
| A box | 50 fries |
| Chance of a rarity in a box | common 60, rare 25, epic 12, legendary 3 (in percent) |

The client never sends an amount. Every change of the balance is also written in
`fries_transactions`, and the balance is changed in the same SQL transaction.
