# Documentation

Each milestone report is written in Markdown, one file per section, and converted to a single PDF
with [pandoc](https://pandoc.org) using [Typst](https://typst.app) as the PDF engine. The Markdown
files are the only source: the PDF is a build output.

## Setup, once per machine

```bash
# macOS
brew install pandoc typst
```

```powershell
# Windows
winget install --id JohnMacFarlane.Pandoc -e
winget install --id Typst.Typst -e
```

No LaTeX, no Node, no browser involved.

## Build

```bash
cd docs/milestone-1
pandoc *.md -o "Poutine-Routine-Milestone-1.pdf" --pdf-engine=typst -H style.typ
```

Sections are picked up in alphabetical order, which is why the files are numbered `00-` to `07-`.
The cover page and the table of contents are written as Typst blocks at the top of `00-cover.md`;
`style.typ` holds the page setup, the text size and the table style.

Run the command from the milestone folder: image paths inside the Markdown are relative to it, so
they resolve both in the PDF and in the GitHub preview.

## Layout

```
docs/
├── milestone-1/       one Markdown file per section, plus the built PDF
├── database/          schema.dbml - the written source of the ERD
└── assets/            diagrams (SVG) and exported mockups (PNG)
```

The ERD image is exported from [vscode-dbml](https://github.com/mattmeyers/vscode-dbml) extension with `database/schema.dbml`; the mockups are exported from the Figma file.
