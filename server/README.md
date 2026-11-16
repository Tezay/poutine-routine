# Poutine Routine - Server

API of Poutine Routine. The client in `../client` calls it. Every route is described in
[`../docs/api.md`](../docs/api.md).

## Stack

| Concern    | Choice                                                                |
| ---------- | --------------------------------------------------------------------- |
| Runtime    | [Node.js](https://nodejs.org) with [Express 5](https://expressjs.com) |
| Database   | MySQL 8, run with Docker Compose                                      |
| ORM        | [Sequelize 6](https://sequelize.org) with the `mysql2` driver         |
| Session    | JWT in an `httpOnly` cookie (`jsonwebtoken`, `cookie-parser`)         |
| Passwords  | `bcryptjs`                                                            |
| Validation | `express-validator`                                                   |
| Security   | `helmet` (HTTP headers), `express-rate-limit` (login and register)    |
| Linting    | [ESLint](https://eslint.org) and [Prettier](https://prettier.io)      |

## Prerequisites

- **Node.js 20 or later** and npm.
- **Docker** with Docker Compose. It runs MySQL (so there is nothing else to install).

## Getting started

```bash
cd server
npm install
cp .env.example .env
docker compose up -d
npm run seed
npm start
```

1. In `.env`, replace `JWT_SECRET` with a hex 32 secret.
2. `docker compose up -d` starts MySQL in the `poutine-db` container. The data is kept in a Docker
   volume (survives a restart).
3. `npm run seed` creates the tables, the poutine catalogue and the test accounts.
4. `npm start` starts the API on `http://localhost:8080`. The tables are created at start if they do
   not exist.

Then start the client (see [`../client/README.md`](../client/README.md)).

## Environment variables

| Variable           | Purpose                                                                 | Default                 |
| ------------------ | ----------------------------------------------------------------------- | ----------------------- |
| `PORT`             | Port of the API                                                         | `8080`                  |
| `CLIENT_ORIGIN`    | URL of the client, allowed by CORS                                      | `http://localhost:5173` |
| `JWT_SECRET`       | Key that signs the session cookie. The server does not start without it | none                    |
| `DB_HOST`          | MySQL host                                                              | `localhost`             |
| `DB_PORT`          | MySQL port                                                              | `3306`                  |
| `DB_NAME`          | Database name                                                           | `poutine_routine`       |
| `DB_USER`          | MySQL user                                                              | `poutine`               |
| `DB_PASSWORD`      | MySQL password                                                          | `poutine`               |
| `DB_ROOT_PASSWORD` | MySQL root password, only used by `docker-compose.yml`                  | `root`                  |

## Available scripts

Run from inside `server/`:

| Command                | Effect                                                    |
| ---------------------- | --------------------------------------------------------- |
| `npm start`            | Start the API with nodemon (restarts when a file changes) |
| `npm run seed`         | Add the poutine catalogue and the test accounts           |
| `npm run lint`         | Run ESLint                                                |
| `npm run lint:fix`     | Run ESLint and fix what it can                            |
| `npm run format`       | Run Prettier and rewrite the files                        |
| `npm run format:check` | Run Prettier in check mode (what CI runs)                 |

The CI workflow (`.github/workflows/server-ci.yml`) runs `format:check` and `lint` on every pull
request.

## Test accounts

`npm run seed` creates three accounts. The passwords are in the data files.

| Email                        | Content                                          | File                          |
| ---------------------------- | ------------------------------------------------ | ----------------------------- |
| `romano.denoualo@mariam.app` | The demo account: tasks, tags and a few poutines | `app/seed/data/demo.js`       |
| `debloco@mariam.app`         | Every poutine unlocked, 9999 fries, no tasks     | `app/seed/data/all-unlock.js` |
| `tricho@mariam.app`          | No poutine, the demo tasks, 99999 fries          | `app/seed/data/cheat-demo.js` |

The seed does not change an account that already exists. To get it back as it was, reset the
database.

## Reset the database

```bash
docker compose down -v
docker compose up -d
npm run seed
```

`down -v` deletes the container and its volume, so every table and every account is lost.

## Project structure

```
server/
├── server.js             entry point: middlewares, routes, error handler, then listen
├── docker-compose.yml    MySQL container
├── .env.example          template for the local .env file
└── app/
    ├── config/           auth (cookie, JWT), database and box settings
    ├── models/           one Sequelize model per table, and the relations in index.js
    ├── routes/           one file per resource: user, tasks, tags, poutines, boxes
    ├── controllers/      what each route does
    ├── validators/       express-validator rules for each route
    ├── middleware/       requireAuth (session check) and validate (sends the first error)
    └── seed/             seed.js and its data (poutine catalogue, test accounts)
```
