# Challenges and solutions

## Two clicks that spend the same fries

**Problem.** A box costs 50 fries. If two requests read the balance at the same time, both see 50
and both buy a box.

**Solution.** The server reads the user with a lock (`SELECT ... FOR UPDATE`) inside the
transaction. The second request waits for the first one, then reads the real balance and gets a 400.
We tested it with three requests at the same time.

## Branches far behind `main`

**Problem.** Many pull requests were open at the same time. Some branches were created before other
work was merged, and after a merge they would have brought back old code.

**Solution.** Before each review, the branch first gets the latest `main`. When a file was already
rebuilt in `main`, we kept the `main` version and added only the new part.

## An empty body made the server crash

**Problem.** A request without a body (like `POST /api/user/logout`) left `req.body` undefined in
Express 5, and the controllers crashed with a 500.

**Solution.** A small middleware in `server.js` sets `req.body` to an empty object when there is no
body.

## A number too big for MySQL

**Problem.** A test account had the largest possible fries balance. Moving a task to Done added 10
fries, and MySQL refused the number: the server answered 500.

**Solution.** The test account now has 99,999 fries. The bug only came from the test data.

## Icons in the dark theme

**Problem.** The sidebar icons were images. An image keeps its own color, so the icons stayed black
on the dark background.

**Solution.** The icon is now a CSS mask: the shape comes from the SVG file, and the color comes
from the text. The icons follow the theme.
