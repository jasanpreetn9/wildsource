# Roadmap

## v0.1: Catalog (MVP)

- [x] Grid of embedded streams, with live thumbnails
- [ ] Map of streams
- [x] Filter by habitat, plus search and sorting
- [x] Filter by region (by country)
- [ ] Filter by species (streams don't have species data yet)
- [x] Stream detail page with source link and credit
- [x] Submission via GitHub issue (manual review)
- [ ] Seed catalog of 30-50 public nature streams (13 so far)
- [x] Open JSON export of the catalog (`/api/streams.json`)
- [x] Light and dark themes
- [x] Sitemap

## v0.2: Database and submissions

- [ ] PostgreSQL + PostGIS storage
- [ ] Submission form in the site
- [ ] Admin review queue
- [ ] Location fuzzing for sensitive sites
- [ ] Nightly stream health check (hide dead streams)

## v0.3: Live-first discovery

- [ ] "Live now" and "golden hour" views based on local time
- [ ] Viewer flags for notable moments
- [ ] Contributor profiles and per-stream stats

## v0.4: Photos and highlights

- [ ] Auto-snapshots per camera
- [ ] Community photo uploads with EXIF stripping and license choice
- [ ] Highlight clips

## v0.5: Contributor camera kit

- [ ] Raspberry Pi image that streams and registers itself
- [ ] Setup guide for bird feeders and nest boxes

## Later

- Species tagging and export to iNaturalist and eBird
- Federation between WildSource instances
- Direct stream hosting via an open source media server
- Public photo sharing: anyone can upload their nature photos and publish them on WildSource for everyone to see (builds on the v0.4 community uploads)
- Interactive photo map: browse published photos by where they were taken. Locations are shown only approximately, and never pinpoint nests, dens or at-risk species.

Items may change. Open an issue to propose or discuss anything here.
