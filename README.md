# WildSource

An open, community-run catalog of live nature streams. Anyone can add a camera, and the catalog is free for anyone to reuse.

WildSource collects live nature cameras in one place: big projects like bird and bear cams, and small personal ones like a feeder on a porch or a nest box on a barn. It doesn't host any video. Every stream plays through its owner's own player, and every stream belongs to the people who run it.

> **Status:** early development, working towards v0.1. See the [roadmap](ROADMAP.md).

## What makes it different

- **Nature only.** No cities, traffic or landmarks.
- **Anyone can submit a stream,** and volunteers review it.
- **Small personal cameras are welcome:** feeders, nest boxes, ponds, backyards.
- **Open source and open data.** The catalog is available as JSON for anyone to build on.
- **Live first.** The focus is on what's happening right now, not just a directory.
- **Wildlife-aware.** No exact locations for nests or at-risk species, and no identifiable people.

## Features (v0.1)

- Home page with streams that are live right now
- Catalog with habitat and region filters, search and sorting
- A page for each stream, with an embedded player and credit to its owner
- "Add a camera" form that opens a pre-filled GitHub issue for review
- The whole catalog as JSON at `/api/streams.json`
- Light and dark themes, and layouts for phones and desktops

## Getting started

You need [Node.js](https://nodejs.org) 22 or later and [pnpm](https://pnpm.io).

```bash
git clone https://github.com/jasanpreetn9/wildsource.git
cd wildsource
pnpm install
pnpm dev
```

Then open <http://localhost:5173>.

### Scripts

| Command        | What it does                                  |
| -------------- | --------------------------------------------- |
| `pnpm dev`     | Start the development server                  |
| `pnpm build`   | Build for production                          |
| `pnpm preview` | Preview the production build                  |
| `pnpm check`   | Type-check the project with `svelte-check`    |
| `pnpm lint`    | Check formatting (Prettier) and lint (ESLint) |
| `pnpm format`  | Fix formatting                                |
| `pnpm test`    | Run unit tests (Vitest)                       |

Run `pnpm check` and `pnpm lint` before opening a pull request. There are no tests yet, so `pnpm test` reports "No test files found". Tests go next to the code they test, as `*.spec.ts` files.

## How it's built

- [SvelteKit](https://svelte.dev/docs/kit) with Svelte 5 and TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4. The design tokens (colours and fonts for both themes) are in `src/routes/layout.css`.
- Data comes from JSON files for now. A database (Supabase, with PostGIS) is planned for v0.2.

```
data/
  streams.seed.json      the stream catalog
  hosts.seed.json        the people and organisations who run the cameras
docs/
  submission-rules.md    what streams are accepted
src/
  lib/
    catalog.ts           reads the catalog data
    embed.ts             turns a YouTube link into a player or thumbnail URL
    types.ts             the Stream and Host types
    components/          shared UI: header, footer, stream cards...
  routes/                one folder per page, plus /api/streams.json
```

Imports from `src/lib` use the `#lib` alias and include the file extension, for example `#lib/catalog.ts`.

## Adding a stream

Until v0.2 adds a database, streams are added by editing `data/streams.seed.json`. Read the [submission rules](docs/submission-rules.md) first.

1. Check that the stream is public, shows nature, and allows embedding (on YouTube: **Share → Embed**).
2. If the camera's owner isn't in `data/hosts.seed.json` yet, add them there.
3. Add the stream to `data/streams.seed.json`. `habitat` must be one of the values in `src/lib/types.ts`.
4. Set `permission` to `embed-allowed`, or to `owner-approved` once the owner has said yes.
5. Keep `region` general, especially for nests, and always **end it with the country**: `Montana, US`, `Etosha, Namibia`, or just `Panama`. The region filter reads the country from the last part.

Write the description yourself rather than copying the owner's text.

## Branches

- `v0.1`: current work, the catalog
- `v0.2`: work for the next release (sign in and host profiles, later the database). Merge `v0.1` into it regularly.

Restart `pnpm dev` after switching branches.

## Contributing

Contributions are welcome. You can submit streams or code. See [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

WildSource is free to use, change and share for non-commercial purposes under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 License](LICENSE) (CC BY-NC-SA 4.0). In short:

- **Credit** WildSource when you use it.
- **No commercial use.** You may not sell it, charge for access to it, run it with ads or a paywall, or use it in a paid product or service.
- **Share alike.** If you change it, you must release your version under the same license so it stays free.

There is one exception:

- **Photos in `src/lib/assets/photos/`** are © Jasanpreet Nagra, all rights reserved. They are not covered by the CC BY-NC-SA 4.0 License and may not be reused without permission. See [their license](src/lib/assets/photos/LICENSE.md).

The catalog data (stream names, habitats, regions and links) is free to reuse. Live streams belong to the people and organisations who run them. WildSource only shows them through their owners' own players.
