# Front-end mockups

We first wrote the screens in HTML and CSS. We then imported them into Figma, where they are
editable and linked as a clickable prototype. The colours are the real values of the future
client.

The colours and the controls come from GitHub Primer, including the board colours: green for To
Do, amber for Doing, purple for Done. The layout comes from Notion: a left sidebar, a wide content
area, few borders. The collection uses pixel art and a pixel font. The work area stays sober, the
reward area does not.

Colours are design tokens in two layers, structure and palette. One file changes the whole theme.
Four palettes exist today. Tailwind v4 will use the same token names.

## Authentication

![01 - Login.](../assets/mockups/01-login.png)

![02 - Register.](../assets/mockups/02-register.png)

## Tasks

![03 - Board. Three columns, cards with tags, countdown and reward. Navigation on the left, companion on the right.](../assets/mockups/03-board.png)

![04 - Empty board. First screen of a new account.](../assets/mockups/04-board-empty.png)

![05 - Task detail. Title, description, due date, priority and tags.](../assets/mockups/05-task-detail.png)

![06 - Table view, to sort and scan the tasks.](../assets/mockups/06-table.png)

## Collection

![07 - Poutinerie. Owned poutines with their rarity. Locked ones stay as silhouettes.](../assets/mockups/07-poutinerie.png)

![08 - Opening a box.](../assets/mockups/08-box-opening.png)

## States

![09 - Overdue. The screen edge pulses red twice and the card turns red. Nothing moves if the system asks for reduced motion (WCAG 2.3.1).](../assets/mockups/09-overdue.png)

![10 - Settings. Daily goal, streak, companion, account.](../assets/mockups/10-settings.png)
