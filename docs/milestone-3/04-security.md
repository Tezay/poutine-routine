# Security

In Milestone 1 we listed 13 security measures. All of them are built, and each one has a test. The
commands and the answers of the server are in
[`docs/security-checklist.md`](https://github.com/Tezay/poutine-routine/blob/main/docs/security-checklist.md).
We ran them on 16 November 2026.

| Measure                                         | How we tested it                                         | Result |
| :------------------------------------------- | :---------------------------------------------------- | :-------- |
| Passwords hashed with bcrypt                    | The database only has `$2b$10$...` hashes                 | Pass   |
| JWT in an `httpOnly`, `SameSite` cookie         | `Set-Cookie: jwt=...; HttpOnly; SameSite=Strict`, no token in the body | Pass |
| Secrets in environment variables                | Both `.env` files are ignored by Git                      | Pass   |
| Login needed on the whole API                   | Every route answers 401 without the cookie                | Pass   |
| Every query filtered by the user id             | User B gets 404 on the task of user A                     | Pass   |
| Every input checked by the server               | 400 for an empty title or a wrong status, 413 above 10 kB | Pass   |
| Same message for unknown email and bad password | Both answer `Invalid email or password.`                  | Pass   |
| Rate limit on login and register                | 429 after 10 failed tries in 15 minutes                   | Pass   |
| `helmet` headers, CORS limited to the client    | The headers are there. CORS only allows the client address | Pass  |
| The server computes the fries                   | A fake amount sent by the client is ignored               | Pass   |
| One SQL transaction for a box                   | 3 boxes at the same time with 120 fries: 2 bought, 1 refused | Pass |
| Random draw on the server                       | A poutine sent by the client is ignored                   | Pass   |
| A task pays only once                           | Done, To Do, then Done again: 0 fries                     | Pass   |

Two more points:

- The routes that change data are also safe from CSRF: with `SameSite=Strict`, the browser does not
  send the cookie when the request comes from another site.
- In production, the cookie also gets the `Secure` flag, so it only travels over HTTPS.
