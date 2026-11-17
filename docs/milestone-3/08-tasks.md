# Task distribution

In Milestone 2 we cut the work by screen. In Milestone 3 we cut it by API resource: each member
built the routes of one resource, then connected the screens to them. The issues were written in
advance, and each member took the ones they wanted. Each change went through a pull request on
GitHub.

## Who did what, since the start

| Contribution                                                                 | Member            | Pull requests |
|:--------------------------------------------|:-----------------|:--------------------------------|
| Project setup and documentation: Milestone 1 and 2 documents, Vue project, design tokens, linting, continuous integration, test data, READMEs, security checklist | Eliot Cupillard | [#3](https://github.com/Tezay/poutine-routine/pull/3), [#4](https://github.com/Tezay/poutine-routine/pull/4), [#14](https://github.com/Tezay/poutine-routine/pull/14), [#15](https://github.com/Tezay/poutine-routine/pull/15), [#18](https://github.com/Tezay/poutine-routine/pull/18), [#43](https://github.com/Tezay/poutine-routine/pull/43), [#47](https://github.com/Tezay/poutine-routine/pull/47), [#48](https://github.com/Tezay/poutine-routine/pull/48), [#98](https://github.com/Tezay/poutine-routine/pull/98), [#99](https://github.com/Tezay/poutine-routine/pull/99), [#100](https://github.com/Tezay/poutine-routine/pull/100) |
| Favicon and pixel art: the 26 poutine sprites                                | Abigaïl Mialaret  | [#16](https://github.com/Tezay/poutine-routine/pull/16), [#35](https://github.com/Tezay/poutine-routine/pull/35) |
| Board: application shell, columns, task cards, tasks store, task form, countdown, drag and drop | Eliot Cupillard | [#17](https://github.com/Tezay/poutine-routine/pull/17), [#19](https://github.com/Tezay/poutine-routine/pull/19), [#32](https://github.com/Tezay/poutine-routine/pull/32), [#33](https://github.com/Tezay/poutine-routine/pull/33), [#36](https://github.com/Tezay/poutine-routine/pull/36), [#39](https://github.com/Tezay/poutine-routine/pull/39), [#40](https://github.com/Tezay/poutine-routine/pull/40), [#41](https://github.com/Tezay/poutine-routine/pull/41), [#42](https://github.com/Tezay/poutine-routine/pull/42), [#46](https://github.com/Tezay/poutine-routine/pull/46) |
| Table view with sorting                                                      | Romain Denoual    | [#29](https://github.com/Tezay/poutine-routine/pull/29) |
| Register screen                                                              | Abigaïl Mialaret  | [#30](https://github.com/Tezay/poutine-routine/pull/30) |
| Login screen                                                                 | Tiffany Vongchanh | [#31](https://github.com/Tezay/poutine-routine/pull/31) |
| Settings screen                                                              | Tiffany Vongchanh | [#37](https://github.com/Tezay/poutine-routine/pull/37) |
| Poutinerie: the collection screen, then connected to the API with the companion and the boxes | Romain Denoual | [#38](https://github.com/Tezay/poutine-routine/pull/38), [#94](https://github.com/Tezay/poutine-routine/pull/94) |
| Box opening                                                                  | Abigaïl Mialaret  | [#44](https://github.com/Tezay/poutine-routine/pull/44) |
| Tag filter and search                                                        | Romain Denoual    | [#45](https://github.com/Tezay/poutine-routine/pull/45) |
| Server base: API contract, Express, MySQL with Docker, models, register, login, session, validation, rate limit, security headers | Eliot Cupillard | [#76](https://github.com/Tezay/poutine-routine/pull/76), [#77](https://github.com/Tezay/poutine-routine/pull/77), [#78](https://github.com/Tezay/poutine-routine/pull/78), [#79](https://github.com/Tezay/poutine-routine/pull/79), [#85](https://github.com/Tezay/poutine-routine/pull/85) |
| Client connected to the API: auth store, route guard, login and register, tasks store | Eliot Cupillard | [#80](https://github.com/Tezay/poutine-routine/pull/80), [#81](https://github.com/Tezay/poutine-routine/pull/81), [#88](https://github.com/Tezay/poutine-routine/pull/88) |
| Tags API                                                                     | Tiffany Vongchanh | [#82](https://github.com/Tezay/poutine-routine/pull/82) |
| Account API, and the Settings screen connected to it                         | Romain Denoual    | [#83](https://github.com/Tezay/poutine-routine/pull/83), [#84](https://github.com/Tezay/poutine-routine/pull/84) |
| Tasks API                                                                    | Tiffany Vongchanh | [#86](https://github.com/Tezay/poutine-routine/pull/86) |
| Seed script: the poutine catalogue and the demo account                      | Abigaïl Mialaret  | [#87](https://github.com/Tezay/poutine-routine/pull/87) |
| Fries and boxes on the server, tag management, theme, poutine details, logged-in user, final fixes | Eliot Cupillard | [#89](https://github.com/Tezay/poutine-routine/pull/89), [#91](https://github.com/Tezay/poutine-routine/pull/91), [#92](https://github.com/Tezay/poutine-routine/pull/92), [#93](https://github.com/Tezay/poutine-routine/pull/93), [#97](https://github.com/Tezay/poutine-routine/pull/97), [#101](https://github.com/Tezay/poutine-routine/pull/101), [#102](https://github.com/Tezay/poutine-routine/pull/102) |
| Poutines API and the test accounts of the seed                               | Romain Denoual    | [#90](https://github.com/Tezay/poutine-routine/pull/90), [#95](https://github.com/Tezay/poutine-routine/pull/95) |
| Fries balance and rewards in the client                                      | Abigaïl Mialaret  | [#96](https://github.com/Tezay/poutine-routine/pull/96) |
| This document and the presentation                                           | All members       |               |

The rows are in the order of their first pull request. Each number links to the pull request on
GitHub. The commits of a pull request are squashed into one, so GitHub shows the author of the pull
request.
