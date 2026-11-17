# Database

## MySQL with Docker

MySQL 8 runs in a Docker container, described in `server/docker-compose.yml`. The settings come
from the `.env` file. Every member gets the same database with one command, on macOS and on
Windows, without installing MySQL. The data stays in a Docker volume after a restart.

Sequelize creates the tables when the server starts (`sync`). `npm run seed` adds the 26 poutines
and three test accounts. The seed can run again without making copies.

## Schema

![Entity-relationship diagram, from `docs/database/schema.dbml`.](../assets/erd.png)

The schema is the one of Milestone 1, with small changes found while building:

| Table               | Content                                                           |
| :------------------ | :---------------------------------------------------------------- |
| `users`             | Account, fries balance, daily goal, companion                     |
| `tasks`             | Title, status, priority, due date, `completed_at`, `rewarded_at` |
| `tags`              | Name and color. A name is unique for each user                    |
| `task_tags`         | Which tags are on which task                                      |
| `poutines`          | The catalogue: name, story (lore), rarity, sprite                 |
| `user_poutines`     | Which poutines a user owns, and how many                          |
| `fries_transactions`| Every change of the balance: amount and reason                    |

Every table that belongs to a user has a `user_id`. When an account is deleted, its tasks, tags,
poutines and history are deleted too (`ON DELETE CASCADE`).

## Fries in a transaction

The balance is in `users.fries_balance`, and every change also writes a row in
`fries_transactions`. The two must always agree, so they are saved in **one SQL transaction**:
everything is saved, or nothing.

**A task moved to Done** pays 10 fries, and 5 more if it is before the due date. The task, the
history rows and the new balance are saved together. `rewarded_at` is set the first time, so a task
that leaves Done and comes back pays nothing.

**A box** costs 50 fries. In one transaction, the server reads the user with a lock
(`SELECT ... FOR UPDATE`), checks the balance, takes 50 fries, writes the history row, and adds the
poutine (or one more copy). The lock makes a second request of the same user wait. So two clicks at
the same time cannot spend the same fries twice.

The rarity is drawn on the server with `crypto.randomInt`: common 60%, rare 25%, epic 12%,
legendary 3%. The price and the odds are in `server/app/config/box.config.js`.
