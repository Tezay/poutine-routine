# Accessibility

The product has to work for everyone, and a to-do application can be used every day. These points
are in the code today:

- **HTML sementic tags:** Every page has one `<main>` and one `<h1>`. Cards, columns, tags and
  buttons use `<article>`, `<section>`, `<ul>` and `<button>`.
- **Labels on every input:** Each field has a visible label linked to it. Error messages are
  announced by screen readers.
- **The keyboard reaches the main actions:** The tags of the filter, the title in the table, the
  cards and the column headers of the table are all buttons.
- **Windows behave:** The task form and the box reveal tell screen readers that
  they are dialogs, and both close with Escape.
- **Late is not only red:** An overdue task shows the words "Overdue by" and not only a red
  colour.
- **Less motion:** The red pulse at the edge of the screen runs twice (once per second), and it
  does not run at all if the system asks for less motion (WCAG 2.3.1).
- **Images:** Decorative images have an empty `alt`, and icon-only buttons have a name.

We did not run a full accessibility audit yet.
