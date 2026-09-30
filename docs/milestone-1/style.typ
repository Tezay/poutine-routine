// Included in the preamble with `pandoc -H style.typ`. Overrides pandoc's defaults:
// ragged right instead of justified (fewer holes in narrow table cells), roomier
// table cells, and smaller table text so wide tables keep their columns readable.
#set page(paper: "a4", margin: (x: 2.2cm, y: 2.4cm), numbering: "1")
// Inter first, then the fonts every machine has: a teammate without Inter still gets a build.
#set text(font: ("Inter", "Helvetica Neue", "Arial"), size: 10.5pt)
#set par(justify: false, leading: 0.68em, spacing: 1.05em)

#show heading.where(level: 1): set text(size: 17pt)
#show heading.where(level: 2): set text(size: 12.5pt)
#show heading.where(level: 3): set text(size: 11pt)

#set table(inset: 8pt, stroke: 0.5pt + rgb("#d1d9e0"))
#show table: set text(size: 9.5pt)
#show table.cell.where(y: 0): set text(weight: "bold")

#show figure.caption: set text(size: 9pt, fill: rgb("#59636e"))
#show link: set text(fill: rgb("#8a5a2b"))
