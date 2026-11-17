# Tools

| Artefact               | Tool                                                                    |
| :--------------------- | :---------------------------------------------------------------------- |
| Screens in this document | Screenshots of the running application, with a test account of the seed |
| Frontend               | Vue 3, Vite, Vue Router, Pinia, axios and Tailwind CSS                  |
| Back end               | Node.js, Express 5, Sequelize, bcrypt, jsonwebtoken, express-validator, helmet, express-rate-limit |
| Database               | MySQL 8 in Docker, with Docker Compose                                  |
| Database schema        | DBML in `docs/database/schema.dbml`, exported as an image with the vscode-dbml extension |
| API tests              | curl, for the manual tests and the security checklist                   |
| Pixel-art sprites      | Drawn in Pixquare and exported as PNG images                            |
| Icons                  | [Lucide](https://lucide.dev), SVG files copied into the project (ISC license) |
| Code quality           | ESLint and Prettier, on the client and the server                       |
| Continuous integration | GitHub Actions: lint and format check on the client and the server, and the client build, on every pull request |
| This document          | Markdown files in `docs/milestone-3/`, converted to PDF with pandoc and the Typst engine |
| Source control         | Git and GitHub, with issues, pull requests and a branch ruleset         |
| AI assistants          | We used AI assistants (Claude, Gemini) at several steps, as learning tools: to understand new notions and the course prerequisites, and to go deeper into topics like security. Every change went through a pull request, and each member can explain the code they submit |
