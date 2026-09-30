# Entity-relationship diagram

![Seven tables. The source of this diagram is `docs/database/schema.dbml`, versioned with the code.](../assets/erd.png)

## Relationships

| Relationship | Type | Meaning |
|:------------------|:-------------------|:-----------------------------------------|
| `users` → `tasks` | one to many | A task belongs to one user |
| `users` → `tags` | one to many | Tags belong to one user and are not shared |
| `tasks` ↔ `tags` | many to many, through `task_tags` | A task has several tags. A tag is used by several tasks |
| `users` ↔ `poutines` | many to many, through `user_poutines` | The join table also stores the number of copies and the first date |
| `users` → `fries_transactions` | one to many | Each change of the balance is one row |
| `users` → `poutines` | optional one to one | `companion_poutine_id` is the poutine on screen. It can be null |

## Tables

- **`users`** - account and game state. The password is stored only as a bcrypt hash.
  `fries_balance` is a copy of the total and can be rebuilt from `fries_transactions`.
- **`tasks`** - title, description, status (`todo`, `doing`, `done`), priority, `position` for the
  order in a column, `due_at` for the countdown, `completed_at` and `rewarded_at`.
- **`tags`** - name and colour, unique per user. Tags are the only way to sort the board.
- **`task_tags`** - join table. Its primary key is the pair of foreign keys.
- **`poutines`** - the list of characters. It is the same for every user and loaded at install.
- **`user_poutines`** - who owns what, and how many copies.
- **`fries_transactions`** - history of the currency: amount, reason, and the task or the poutine.

## Three decisions

**We keep a history, not only a balance.** One `fries_balance` column would be enough. We also
store each change as a row. A wrong total can then be explained and computed again.

**`rewarded_at` is on the task.** A user can mark a task done, undo it, and do it again to farm
fries. We store the date of the payment, so the server pays only once.

**No JSON column.** Drop rates and image lists would be easy in JSON. Our machines run different
local MySQL distributions and their JSON support is different. Drop rates stay in the server
configuration. Image lists stay with the sprites in the client.
