# Challenges and solutions

## Merge conflicts on the router

**Problem.** Each issue adds its own route in `router/index.js`, so two pull requests often change
the same lines. Git then stops with a conflict.

**Solution.** We kept the router small and chose to learn how to solve these conflicts instead of
avoiding them. The rule is simple: keep both sides.

## Test data must look like the API

**Problem.** If the test data does not match the future API, every screen has to be rewritten in
Milestone 3.

**Solution.** The test files use the database column names. We checked them against the database
schema. One detail showed up: our poutine texts are longer than the 160 characters planned in the
schema, so the column will be made longer when we build the database.

## Dates in local time and UTC

**Problem.** The server stores dates in UTC, but a date field in the browser uses local time.
Without a conversion, a task would move by several hours each time it is edited.

**Solution.** The task form converts the date in both directions. The date and the time are two
fields, and a date without a time becomes 23:59.

## Highlight that blinked while dragging

**Problem.** The column under a dragged card lost its highlight each time the mouse crossed a card
inside the column.

**Solution.** The column removes the highlight only if the mouse has really left the column, not
when it moves onto one of its children.

## Images and Vite

**Problem.** The sprite of a poutine is chosen by its name at runtime, and Vite could not find
the file when the path was built from a name that contained a slash.

**Solution.** A sprite is named after the slug of its poutine. One small component builds the path
from the slug (so the images are found in dev, in the build and on GitHub Pages).
