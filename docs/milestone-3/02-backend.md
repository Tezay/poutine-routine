# Back end

## Stack

| Concern    | Choice                                                        |
| :--------- | :------------------------------------------------------------ |
| Runtime    | Node.js with Express 5                                        |
| Database   | MySQL 8, started with Docker Compose                          |
| ORM        | Sequelize 6                                                   |
| Session    | JWT in an `httpOnly` cookie                                   |
| Passwords  | bcrypt                                                        |
| Validation | express-validator                                             |
| Security   | helmet (HTTP headers), express-rate-limit (login and register) |

We follow the structure of the course: `config`, `models`, `routes` and `controllers`. We added
three folders: `validators` (the rules for each route), `middleware` (session check) and `seed`
(test data).

## Folders

```
server/
├── server.js          middlewares, routes, error handler, then listen
├── docker-compose.yml MySQL container
└── app/
    ├── config/        cookie and JWT settings, database, box price and odds
    ├── models/        one Sequelize model per table, relations in index.js
    ├── routes/        user, tasks, tags, poutines, boxes
    ├── controllers/   what each route does
    ├── validators/    the rules for each route
    ├── middleware/    requireAuth and validate
    └── seed/          poutine catalogue and test accounts
```

## The path of a request

Take `PUT /api/tasks/12/move` with `{ "status": "done" }`:

1. `helmet`, `cors`, `cookie-parser` and `body-parser` run first, for every request.
2. The route runs `requireAuth`. It reads the `jwt` cookie, checks it, and loads the user. Without a
   valid cookie, the answer is 401.
3. The validator checks that `status` is `todo`, `doing` or `done`. If not, the answer is 400.
4. The controller looks for task 12 **of this user**. A task of another user gives 404.
5. It moves the task, pays the fries if needed, and answers with the task and the new balance.
6. If something breaks, the error handler answers 500 without details.

## Routes

The full list, with the body and the answer of each route, is in `docs/api.md`. We wrote this
contract first, so the client and the server could be built at the same time.

| Resource | Routes                                                                  |
| :------- | :---------------------------------------------------------------------- |
| User     | register, log in, session check, log out, update, choose companion, delete |
| Tasks    | list, create, update, move, delete                                      |
| Tags     | list, create, update, delete                                            |
| Poutines | the catalogue, with what the user owns                                  |
| Boxes    | buy a box                                                               |

## Login and session

- **Register.** The password is hashed with bcrypt (10 rounds). The new user gets the starter
  poutine as companion.
- **Log in.** If the email and the password are right, the server signs a JWT with the user id and
  puts it in the `jwt` cookie: `httpOnly`, `SameSite=Strict`, 24 hours. The token is never in the
  JSON answer, and the client never stores it.
- **Every other request.** The browser sends the cookie by itself (`withCredentials` in axios).
  `requireAuth` checks it. The user id always comes from the token, never from the request.
- **Session check.** When the app opens, the client calls `GET /api/user/auth`. The router waits for
  this answer before it shows a page, so a logged-out visitor goes straight to the login screen.
- **Log out.** The server clears the cookie.

## The client side

The client keeps the structure of Milestone 2. We added one service per resource (for example
`TaskDataService`), like in the course, and three Pinia stores: `auth` (the user), `tasks` (tasks
and tags) and `poutines` (the collection). The screens read the stores, the stores call the
services.
