# Contributing to WildSource

Thanks for helping. There are two ways to contribute.

## 1. Submit a stream

The easiest way is the **Add a camera** page on the site. It asks for the stream's details, then opens the **Add a stream** issue form on GitHub with them filled in. Check the answers, tick the checklist and submit.

You can also go straight to GitHub: open a new issue and choose the **Add a stream** template.

Before you submit, check that the stream meets the [submission rules](docs/submission-rules.md): nature subjects only, no identifiable people, no private property, and no precise locations for nests or at-risk species. On YouTube, check that embedding is allowed (**Share → Embed**).

A volunteer reviews every submission before it's added to the catalog.

## 2. Contribute code

### Setup

You need [Node.js](https://nodejs.org) 22 or later and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

Run checks before opening a pull request:

```bash
pnpm check
pnpm lint
```

`pnpm format` fixes most formatting problems that `pnpm lint` reports.

### Workflow

1. Find or open an issue. Comment that you want to work on it.
2. Fork the repo and create a branch from `v0.1`: `git checkout -b fix/short-description v0.1`.
3. Keep changes focused. One pull request should do one thing.
4. Open a pull request against `v0.1`. Say what you changed and why, and link the issue.
5. A maintainer will review it. We aim to respond within a few days.

### Commit messages

Short, imperative, present tense: `Add stream health check`. No special format required.

## Ground rules

- Be kind. Follow the [Code of Conduct](CODE_OF_CONDUCT.md).
- Do not commit secrets, API keys or personal data.
- Do not add streams or images you do not have the right to share.
- By contributing, you agree that your work is licensed under the project's [CC BY-NC-SA 4.0 license](LICENSE).
- Don't reuse the photos in `src/lib/assets/photos/` or the screenshots in `docs/images/` that show them. They aren't covered by the CC BY-NC-SA 4.0 license (see [their license](src/lib/assets/photos/LICENSE.md)).
