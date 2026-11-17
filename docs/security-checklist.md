# Security checklist

One test for each security measure of Milestone 1
([`milestone-1/02-solution.md`](milestone-1/02-solution.md#security-approach)). Each test shows the
command we ran and what the server answered. Tested on 16 November 2026, on `main`.

## Summary

| #   | Measure                                         | Result |
| --- | ----------------------------------------------- | ------ |
| 1   | Passwords hashed with bcrypt                    | ✅     |
| 2   | JWT in an `httpOnly`, `SameSite` cookie         | ✅     |
| 3   | Secrets in environment variables                | ✅     |
| 4   | Login needed on the whole API                   | ✅     |
| 5   | Every query filtered by the user id             | ✅     |
| 6   | Every input checked by the server               | ✅     |
| 7   | Same message for unknown email and bad password | ✅     |
| 8   | Rate limit on login and register                | ✅     |
| 9   | `helmet` headers, CORS limited to the client    | ✅     |
| 10  | The server computes the fries                   | ✅     |
| 11  | One SQL transaction for a box                   | ✅     |
| 12  | Random draw on the server                       | ✅     |
| 13  | A task pays only once                           | ✅     |

Every test passes, so no issue was opened.

## Setup

Start the server (see [`../server/README.md`](../server/README.md)) and create two accounts, A and
B, in the app. Then log in with both. `-c` saves the cookie in a file, `-b` sends it back.

```bash
API=http://localhost:8080/api
H='Content-Type: application/json'
curl -c a.txt -H "$H" -d '{"email":"a@example.com","password":"<password of A>"}' $API/user/login
curl -c b.txt -H "$H" -d '{"email":"b@example.com","password":"<password of B>"}' $API/user/login
```

A creates a task. `ID` is its id:

```bash
curl -b a.txt -H "$H" -d '{"title":"Secret of A"}' $API/tasks
# {"id":67,"title":"Secret of A",...}
ID=67
```

Delete `a.txt` and `b.txt` at the end: they hold valid sessions.

## Tests

### 1. Passwords hashed with bcrypt

```bash
docker exec -it poutine-db mysql -u poutine -p poutine_routine \
  -e "SELECT LEFT(password_hash, 7) FROM users WHERE email = 'a@example.com';"
# $2b$10$
```

The hash starts with `$2b$10$` (bcrypt, 10 rounds). The password is never stored.

### 2. JWT in an `httpOnly`, `SameSite` cookie

```bash
curl -i -H "$H" -d '{"email":"a@example.com","password":"<password of A>"}' $API/user/login
# Set-Cookie: jwt=...; Max-Age=86400; Path=/; HttpOnly; SameSite=Strict
# {"id":...,"username":"a",...}   (no token in the body)
```

JavaScript cannot read the cookie, and the browser does not send it from another site.

### 3. Secrets in environment variables

```bash
git check-ignore server/.env client/.env
# server/.env
# client/.env
git ls-files | grep .env
# client/.env.example
# server/.env.example
```

Only the examples are in the repository.

### 4. Login needed on the whole API

```bash
curl -s -o /dev/null -w '%{http_code}\n' $API/tasks           # 401
curl -s -o /dev/null -w '%{http_code}\n' $API/tags            # 401
curl -s -o /dev/null -w '%{http_code}\n' $API/poutines        # 401
curl -s -o /dev/null -w '%{http_code}\n' $API/user/auth       # 401
curl -s -o /dev/null -w '%{http_code}\n' -X POST $API/boxes   # 401
```

### 5. Every query filtered by the user id

B tries to use the task of A:

```bash
curl -s -b b.txt $API/tasks | grep -c 'Secret of A'                         # 0
curl -i -b b.txt -X PUT -H "$H" -d '{"title":"x"}' $API/tasks/$ID           # 404
curl -i -b b.txt -X PUT -H "$H" -d '{"status":"done"}' $API/tasks/$ID/move  # 404
curl -i -b b.txt -X DELETE $API/tasks/$ID                                    # 404
```

The task of A is not in the list of B, and B gets 404 for it.

### 6. Every input checked by the server

```bash
curl -b a.txt -H "$H" -d '{"title":""}' $API/tasks
# 400 {"message":"Title must have 1 to 120 characters."}
curl -b a.txt -X PUT -H "$H" -d '{"status":"won"}' $API/tasks/$ID/move
# 400 {"message":"Status must be todo, doing or done."}
python3 -c "print('{\"title\":\"' + 'a' * 11000 + '\"}')" \
  | curl -s -o /dev/null -w '%{http_code}\n' -b a.txt -H "$H" --data-binary @- $API/tasks
# 413   (body larger than 10 kB)
```

### 7. Same message for unknown email and bad password

```bash
curl -H "$H" -d '{"email":"nobody@example.com","password":"Password123"}' $API/user/login
# 401 {"message":"Invalid email or password."}
curl -H "$H" -d '{"email":"a@example.com","password":"Wrong12345"}' $API/user/login
# 401 {"message":"Invalid email or password."}
```

The answer does not tell if the account exists.

### 8. Rate limit on login and register

```bash
for i in $(seq 11); do
  curl -s -o /dev/null -w '%{http_code} ' -H "$H" \
    -d '{"email":"a@example.com","password":"Wrong12345"}' $API/user/login
done
# 401 401 401 401 401 401 401 401 401 401 429
```

After 10 failed tries in 15 minutes, the answer is 429. The limit counts by address, so even the
right password gets 429 until the end of the 15 minutes (or a restart of the server).

### 9. `helmet` headers, CORS limited to the client

```bash
curl -s -D - -o /dev/null $API/user/auth
# Content-Security-Policy: default-src 'self';...
# X-Content-Type-Options: nosniff
# X-Frame-Options: SAMEORIGIN
curl -s -D - -o /dev/null -H 'Origin: https://mariam.app' $API/user/auth | grep -i allow-origin
# Access-Control-Allow-Origin: http://localhost:5173
```

The server always answers with the client address. For another site, the browser sees a different
address and blocks the answer.

### 10. The server computes the fries

The client sends a fake amount:

```bash
curl -b a.txt -X PUT -H "$H" -d '{"status":"done","fries_earned":1000}' $API/tasks/$ID/move
# {"task":{...},"fries_earned":10,"fries_balance":10}
curl -b a.txt -X PUT -H "$H" -d '{"fries_balance":99999}' $API/user
# {...,"fries_balance":10,...}
```

The extra fields are ignored: the task pays 10, and the client cannot change the balance.

### 11. One SQL transaction for a box

A has 120 fries (set in MySQL for the test). Three boxes at the same time:

```bash
for i in 1 2 3; do
  curl -s -o /dev/null -w '%{http_code} ' -b a.txt -X POST $API/boxes &
done; wait
# 200 200 400
```

Two boxes are bought, the third one is refused. The balance is 20 and there are two `box_opened`
rows in `fries_transactions`.

### 12. Random draw on the server

```bash
curl -b a.txt -X POST -H "$H" -d '{"poutine_id":1,"rarity":"legendary"}' $API/boxes
# {"poutine":{"id":8,"rarity":"rare",...},"is_new":true,"fries_balance":...}
grep -n "crypto.randomInt" server/app/controllers/box.controller.js
# 2 lines: the rarity, then the poutine
```

The body is ignored. The draw uses `crypto.randomInt`, a secure random generator.

### 13. A task pays only once

The task of test 10 is already paid. It leaves Done and comes back:

```bash
curl -b a.txt -X PUT -H "$H" -d '{"status":"todo"}' $API/tasks/$ID/move
curl -b a.txt -X PUT -H "$H" -d '{"status":"done"}' $API/tasks/$ID/move
# {"task":{...},"fries_earned":0,"fries_balance":10}
```

`rewarded_at` is set the first time, so the task pays nothing the second time.
