# Rep Tracker Planning

## Current Goal

Finish the migration from a local-only rep tracker to a self-hosted PocketBase-backed app with account creation, optional groups, and a shared group progress view.

## Confirmed Product Decisions

1. The stack stays free, open source, and self-hostable.
2. PocketBase is the backend target.
3. Deployment uses one `docker-compose.yml` with separate `frontend` and `backend` services.
4. New users self-sign up with email and password.
5. Users start without a group by default.
6. Personal tracking must work even if the user never creates or joins a group.
7. Shared progress only appears when a signed-in user has an active group.

## What Has Been Implemented So Far

### Deployment Scaffold

Implemented:

1. `docker-compose.yml` now defines separate `frontend` and `backend` services.
2. `frontend` uses Caddy to serve the static app.
3. `backend` uses a PocketBase container with persistent storage.
4. `Caddyfile` proxies `/api/*` and `/_/*` to PocketBase.
5. `.env.example` documents the Caddy site address.

Status:

- The deployment scaffold exists in the repo.
- README setup instructions have not been updated yet.
- PocketBase collection bootstrap is not documented yet.

### Frontend UI Shell

Implemented:

1. An auth card was added near the top of the page.
2. The auth card supports a sign-in and create-account mode toggle.
3. An account summary card was added for signed-in users.
4. Group action buttons and feedback areas were added.
5. Create-group, join-group, and switch-group modals were added.
6. A group progress container was added below the tracker and calendar.

Status:

- The UI structure is present and styled.
- The group progress area is still an empty-state placeholder.
- The group action modals are wired in the client and expect PocketBase collections to exist.

### Client State Refactor

Implemented:

1. `script.js` now uses a centralized `appState` object with `session`, `ui`, `personal`, and `group` sections.
2. Rendering has been split into smaller functions such as `renderAuthState()`, `renderGroupSummary()`, `renderPersonalTracker()`, `renderHistory()`, `renderCalendar()`, and `renderGroupProgress()`.
3. Personal tracker behavior still works through localStorage.
4. Tracker actions are disabled while signed out.
5. Auth form submission is handled asynchronously without page reloads.
6. Session state is persisted locally and restored on page load.
7. Group membership loading and active-group persistence are wired into the client.

Status:

- This is now a partially wired PocketBase integration.
- `script.js` still stores personal progress in localStorage.
- Auth uses PocketBase REST endpoints for sign-up, sign-in, sign-out, and auth refresh.
- Group creation, join, and switch flows use PocketBase REST endpoints and existing modals.
- Shared progress rendering is still a placeholder.
- None of the backend flows have been verified against a running PocketBase instance in this repo yet.

## What Is Not Implemented Yet

1. PocketBase collection bootstrap and rules setup in the repo docs.
2. Backend-backed daily progress sync.
3. Shared group progress queries and member bar rendering.
4. README deployment and setup documentation.
5. Post-implementation project context updates.
6. End-to-end verification against a running PocketBase instance and real collections.

## Current Technical Reality

### Frontend

- `index.html` and `style.css` already contain the structural and visual shell for auth and groups.
- `script.js` is mid-refactor and should be treated as the current source of truth for app behavior.
- The personal tracker remains usable only through local state and localStorage.

### Backend

- The container wiring exists and the browser code now targets PocketBase REST endpoints through Caddy.
- PocketBase collections, rules, and field definitions still need to be created and verified.

## Recommended Next Steps To Choose From

### Option 1: Implement PocketBase Collections And Rules

Scope:

1. Create the `users`, `groups`, `group_members`, and `daily_progress` collections in PocketBase.
2. Define required fields and access rules.
3. Make sure the current auth and group requests match the real schema.
4. Verify sign-up, sign-in, create-group, join-group, and switch-group against live data.

Best when:

- You want the current client-side backend wiring to actually work against a running backend.

### Option 2: Implement Synced Personal Progress

Scope:

1. Keep local cache behavior.
2. Sync per-day exercise totals and history into PocketBase.
3. Restore a signed-in user’s progress from backend data.
4. Add a one-time import path for existing localStorage history if needed.

Best when:

- You want persistence to move beyond browser-only storage as early as possible.

### Option 3: Implement Shared Group Progress View

Scope:

1. Query daily progress for all members of the active group.
2. Group results by member and exercise.
3. Render one member card with horizontal exercise bars.
4. Handle empty states for users with no activity on the selected date.

Best when:

- Auth and group membership are already working against real PocketBase collections.

### Option 4: Update Documentation Next

Scope:

1. Document the current Docker Compose setup.
2. Add PocketBase bootstrap instructions.
3. Describe the current implementation status and remaining work.

Best when:

- You want deployment notes cleaned up before more code changes.

## Recommended Order

1. Create and verify the PocketBase collections and rules expected by the current frontend.
2. Implement synced personal progress.
3. Implement shared group progress rendering.
4. Update README and project context docs.

## PocketBase Data Model Still Planned

### Users

- `email`
- `password`
- `displayName`
- `isActive`

### Groups

- `name`
- `owner`
- `joinCode`
- `isActive`

### Group Members

- `group`
- `user`
- `role`
- `status`
- `joinedAt`

### Daily Progress

- `user`
- `group`
- `date`
- `exercise`
- `totalReps`
- `dailyGoal`
- `historyJson`

## Current Backend Contract

This section describes the PocketBase shape the current frontend code expects right now.

### Auth Collection

Expected collection:

- `users`

Expected auth behavior:

1. The collection supports normal PocketBase email and password auth.
2. Self-sign-up is allowed.
3. The frontend uses PocketBase auth endpoints under the same origin.

Expected fields used by the frontend:

- `email`
- `password`
- `displayName`
- `isActive`

Expected auth endpoints already used by `script.js`:

1. `POST /api/collections/users/records`
2. `POST /api/collections/users/auth-with-password`
3. `POST /api/collections/users/auth-refresh`

Frontend assumptions:

1. Auth responses include `token` and `record`.
2. The user record contains `id`, `email`, and preferably `displayName`.

### Groups Collection

Expected collection:

- `groups`

Expected fields used by the frontend:

- `name`
- `owner`
- `joinCode`
- `isActive`

Current frontend operations:

1. Create group with `name`, `owner`, `joinCode`, and `isActive`.
2. Query group by `joinCode` and `isActive=true`.

### Group Members Collection

Expected collection:

- `group_members`

Expected fields used by the frontend:

- `group`
- `user`
- `role`
- `status`
- `joinedAt`

Current frontend operations:

1. Create owner membership when a group is created.
2. Create member membership when joining by code.
3. Query memberships filtered by current `user` and `status="active"`.
4. Expand `group` while listing memberships.

Frontend assumptions:

1. Membership listing supports `expand=group`.
2. The expanded group record includes `id`, `name`, `joinCode`, `owner`, and `isActive`.

### Daily Progress Collection

Expected collection:

- `daily_progress`

Expected future fields:

- `user`
- `group`
- `date`
- `exercise`
- `totalReps`
- `dailyGoal`
- `historyJson`

Current status:

- The frontend declares this collection name but does not query or write it yet.

### Minimum Rules To Verify Next

1. Users can create their own auth record and authenticate.
2. Signed-in users can create groups they own.
3. Signed-in users can create membership records for themselves.
4. Signed-in users can list only their own membership records, with group expansion.
5. Signed-in users can query a group by join code when joining.

## Verification Targets For The Next Milestones

1. A user can create an account and still use the personal tracker without joining a group.
2. Reloading the page restores the user session.
3. A user can create or join a group and switch between available groups.
4. Personal progress syncs to PocketBase without breaking local interactions.
5. Group progress renders one member row or card per member for the selected date.
6. The current auth and group requests succeed against a live PocketBase instance with the expected schema.
