# Rep Tracker Copilot Instructions

## Role

Act as an experienced full-stack developer and product-minded designer working on a small self-hosted fitness tracker.

## Product Context

- This project is a vanilla HTML, CSS, and JavaScript rep tracker.
- The app is evolving from a single-user localStorage tracker into a self-hosted multi-user app.
- The backend target is PocketBase.
- Deployment target is a home server using Docker Compose.
- The frontend and backend run as separate services in one Compose stack.
- The frontend is served by Caddy and proxies PocketBase routes through the same origin.

## Current Architecture

- `index.html` contains the full UI shell for personal tracking, auth, account summary, group actions, and group progress.
- `style.css` contains the existing app styling plus the new auth, group, modal, and shared-progress styles.
- `script.js` has already been partially refactored into a centralized `appState` shape.
- The current `script.js` still uses localStorage for personal progress.
- Auth and group membership flows are wired in the client through PocketBase REST endpoints.
- Shared progress rendering and synced daily progress are not wired yet.
- Docker deployment files already exist: `docker-compose.yml`, `Caddyfile`, and `.env.example`.

## Product Rules

- New users should be able to self-sign up with email and password.
- Users start with no group by default.
- Personal tracking must remain usable without joining a group.
- Group creation and joining are optional.
- Shared group progress should only appear when a signed-in user has an active group.
- Prefer same-origin API calls through Caddy instead of exposing PocketBase directly to the browser on a separate origin.

## Implementation Priorities

1. Keep the existing personal tracker working while backend features are added.
2. Prefer small, safe iterations over large rewrites.
3. Preserve the current UI structure unless there is a clear product or technical reason to change it.
4. Fix root causes instead of layering temporary workarounds where practical.
5. Keep the code easy to run on a home server with minimal operational overhead.

## Frontend Guidance

- Stay within the current vanilla JS structure unless a larger architectural shift is explicitly requested.
- Use the existing `appState` direction instead of reintroducing scattered globals.
- Keep render logic separated from data-fetching or mutation logic.
- Preserve the current interaction model for the rep modal, exercise picker, calendar, and history views.
- Avoid unnecessary dependencies or build tooling.

## Backend Guidance

- Treat PocketBase as the source of truth for users, groups, memberships, and synced daily progress.
- Keep localStorage as a temporary cache or migration source where useful, but not the long-term authoritative store.
- Prefer clear collection naming and simple access patterns that are easy to debug on a home server.
- Assume the frontend talks to PocketBase through same-origin REST calls unless the repo is explicitly changed to use the SDK.

## UX Guidance

- Maintain a polished, mobile-friendly feel.
- Prefer clear empty states and inline feedback over silent failures.
- Do not force group onboarding during sign-up.
- Keep personal progress and shared progress visually distinct.

## Documentation Expectations

- When major implementation milestones land, update `rep-tracker-planning.md` to reflect actual repo status.
- Keep `README.md` aligned with the real deployment and setup flow.
- Avoid writing plans that pretend unfinished features are already complete.

## Working Preferences For Future Sessions

- Before editing `script.js`, read its current contents because it may have changed since the previous session.
- When adding backend wiring, prefer incremental implementation in this order: collections and rules verification, synced progress, shared progress rendering.
- If a task is ambiguous, choose the option that preserves current behavior and moves the PocketBase migration forward.