# Screens

The images in this chapter are screenshots of the real application. They replace the mockups of
Milestone 1. Each screen keeps the number of its mockup (01 to 10). Screens 11 to 14 are new.

The look follows the mockups: a left sidebar, a wide content area, and a right column for the
companion. The colours and the fonts are the same.

## Authentication

![01 - Login. A random poutine is the mascot.](../assets/screenshots/01-login.png)

The user enters an email and a password. Empty fields show a message. The form does not call an
API yet. Login and register use the whole screen, without the sidebar.

![02 - Register. Username, email and a password of at least 8 characters.](../assets/screenshots/02-register.png)

## Tasks

![03 - Board. Three columns, a card for each task, the companion on the right.](../assets/screenshots/03-board.png)

The board has three columns: To Do, Doing and Done. A card shows the title, the tags and the time
left. Clicking a card opens the task form. Dragging a card to another column changes its status.
Only the middle part of the page scrolls.

![04 - Empty board. The first screen of a new account.](../assets/screenshots/04-board-empty.png)

![05 - Task form, editing a task. It also has a Delete button.](../assets/screenshots/05-task-detail.png)

![11 - Task form, creating a task. Only the title is required.](../assets/screenshots/11-task-create.png)

The same form creates and edits a task. A due date without a time means the end of that day.
Escape and a click outside close the form, and the focus returns to the button that opened it.

![13 - Drag and drop. The column under the card is highlighted.](../assets/screenshots/13-drag-and-drop.png)

![12 - Search and tag filter. Clicking a tag turns it on or off.](../assets/screenshots/12-filter-search.png)

![14 - No result. A message appears when nothing matches.](../assets/screenshots/14-no-results.png)

![06 - Table view. Click a column title to sort.](../assets/screenshots/06-table.png)

The table shows the same tasks as the board, with the same search and tag filter. A new task
created on the board appears in the table at once, because both read the same store.

## Collection

![07 - Poutinerie. Owned poutines with their rarity. Locked ones are silhouettes.](../assets/screenshots/07-poutinerie.png)

The poutinerie shows the whole catalogue and how many poutines the user owns. A poutine the user
does not own is a black silhouette, with no name and no rarity.

![08 - Opening a box. A random poutine, with its rarity and a short text.](../assets/screenshots/08-box-opening.png)

## States and settings

![09 - Overdue. The card turns red and says how late the task is.](../assets/screenshots/09-overdue.png)

When a task passes its due date, its card turns red and the label says "Overdue by". The edge of
the screen pulses red twice. Nothing moves if the system asks for less motion.

![10 - Settings. Daily goal, streak, companion, account.](../assets/screenshots/10-settings.png)

## Differences from the Milestone 1 mockups

The screens are close to the mockups. Here is a list of the small differences:

- **Left for Milestone 3 because they need the backend.** The "+10 fries" label on done tasks,
  the "Fed today" bar and the "Earned today" line in the right column, the "Change companion"
  button, the live "Next box in 2 tasks" message, and the "Time is up" message when a task is
  late.
- **Simplified on purpose.** The Board and Table pages are two links in the sidebar, not a switch
  at the top. The task form has a Status field, so the keyboard can move a task. The date and
  the time are two fields. The columns have no "+" button and the cards have no drag handle.
- **Added.** Sidebar icons, tags that filter the board with a task count, a search box that
  works, and real pixel art in place of the grey boxes.
