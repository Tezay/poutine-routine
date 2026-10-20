# Frontend progress

## Summary

Milestone 2 is the frontend. It is done for this milestone: six screens, ten components and one
shared store, written in Vue 3 with Tailwind CSS. The application runs in the browser on test
data. There is no back end yet. The back end, the database and the secure login come in
Milestone 3.

The test data has the same shape as the future API: the field names are the database column
names. In Milestone 3 we change where the data comes from. The screens stay the same.

The Milestone 1 document explains the problem, the solution, the database and the security plan.
This document does not repeat them. It shows what we built, how it is organised, and what changes
in the plan.

## Links and how to run it

| Item | Link |
|:------------|:--------------------------------------------------------|
| Repository | <https://github.com/Tezay/poutine-routine> (frontend in `client/`) |
| Live demo | <https://tezay.github.io/poutine-routine/> (frontend only, test data) |

To run the frontend on your computer (Node.js 20 or later):

```bash
git clone https://github.com/Tezay/poutine-routine.git
cd poutine-routine/client
npm install
cp .env.example .env
npm run dev
```

Then open `http://localhost:5173`.

## Key figures

| Figure | Value |
|:----------------------------------|:------------------------------------------|
| Pull requests merged (19 October) | 24 |
| Feature issues done | 15 of 17. The other two move to Milestone 3 |
| Screens (one per route) | 6 |
| Components | 10 |
| Shared stores | 1 |
| Poutine sprites | 26 |
| Lines of Vue and JavaScript | about 1,700 |

## What works and what is test data

The board is a real working frontend, but nothing is saved. A page reload brings back the test
data.

| Feature | State | Note |
|:-------------------------------|:-------------------|:---------------------------------------------|
| Board with three columns | Works | Reads the shared store |
| Create, edit and delete a task | Works | Title, description, status, due date, priority, tags |
| Drag and drop between columns | Works | The Status field of the task form is the keyboard way |
| Tag filter and search | Works | Several tags at once. Search looks at titles and tags |
| Table view | Works | Sort by clicking a column title |
| Countdown and overdue alert | Works | Updates every minute |
| Poutine collection | Works | Owned and locked poutines come from the test data |
| Box opening | Draw only | A random poutine appears. It costs nothing and is not saved |
| Companion | Display only | Shows the chosen poutine. The choice in Settings has no effect yet |
| Fries, daily goal and streak | Display only | Values come from the test data. The server will compute them |
| Register and login | Forms only | Fields are checked. There is no API call and no session |
| Settings | Form only | No change is saved |

Everything marked "Display only" or "Forms only" needs the back end. It is planned for
Milestone 3.
