# rep-tracker

Rep Tracker is a small self-hosted family fitness tracker built with vanilla HTML, CSS, and JavaScript. The app is being migrated from browser-only localStorage into a PocketBase-backed multi-user setup with self-sign-up, optional groups, and a shared progress view.

## Current Status

- Frontend and backend deployment scaffolding exist.
- The frontend auth flow is wired to PocketBase REST endpoints.
- Group create, join, switch, and session restore are wired in the client.
- Personal progress is still local-only for now.
- Shared group progress rendering is still not implemented.

## Stack

- Frontend: static HTML, CSS, JavaScript
- Frontend server: Caddy
- Backend: PocketBase
- Deployment: Docker Compose

## Local Run

1. Copy `.env.example` to `.env` if you want to override the default site address.
2. Start the stack:

```bash
docker compose up -d
```

3. Open the app at `http://localhost` unless you changed `CADDY_SITE_ADDRESS`.
4. Open PocketBase admin through the same origin at `http://localhost/_/`.

## Docker Services

- `frontend`: Caddy serving the static app and proxying PocketBase routes
- `backend`: PocketBase with persistent data mounted at `pocketbase_data`

## PocketBase Setup

The current frontend expects these PocketBase collections to exist.

### 1. Users

Collection name:

- `users`

Required fields used by the frontend:

- `email`
- `password`
- `displayName`
- `isActive`

Notes:

- This must be an auth collection.
- Self-sign-up should be allowed.

### 2. Groups

Collection name:

- `groups`

Required fields:

- `name`
- `owner`
- `joinCode`
- `isActive`

Suggested field types:

- `name`: text
- `owner`: relation to `users`, single
- `joinCode`: text
- `isActive`: bool

### 3. Group Members

Collection name:

- `group_members`

Required fields:

- `group`
- `user`
- `role`
- `status`
- `joinedAt`

Suggested field types:

- `group`: relation to `groups`, single
- `user`: relation to `users`, single
- `role`: text
- `status`: text
- `joinedAt`: date

Important:

- Listing memberships should support `expand=group`.

### 4. Daily Progress

Collection name:

- `daily_progress`

Planned fields:

- `user`
- `group`
- `date`
- `exercise`
- `totalReps`
- `dailyGoal`
- `historyJson`

This collection is not used by the frontend yet.

## Minimum Rule Checklist

These are the first rules worth verifying against the current client behavior:

1. Users can create their own auth record and authenticate.
2. Signed-in users can create groups they own.
3. Signed-in users can create membership records for themselves.
4. Signed-in users can list only their own membership records, with group expansion.
5. Signed-in users can query a group by join code when joining.

## Testing Phases

### Phase 0: Smoke Test

You can start testing immediately after the Compose stack is up.

Verify:

1. `http://localhost` serves the frontend.
2. `http://localhost/_/` opens PocketBase admin.
3. Browser requests to `/api/*` and `/_/*` go through Caddy.

### Phase 1: Auth And Group Integration Test

This is the first meaningful feature test phase.

You can start this phase as soon as the PocketBase collections and rules above are created.

Verify:

1. Create account works.
2. Sign-in works.
3. Reload restores the session.
4. Create group works.
5. Join group by code works.
6. Switch active group works.

### Phase 2: Synced Personal Progress Test

Start this phase after `daily_progress` writing and reading is implemented.

Verify:

1. A signed-in user’s reps sync to PocketBase.
2. Reload restores synced personal progress.
3. Local interaction stays responsive.

### Phase 3: Shared Group Progress Test

Start this phase after group progress queries and rendering are implemented.

Verify:

1. Group members appear in the shared view.
2. Exercise bars render for the selected date.
3. Empty-state handling works for members with no activity.

## Practical Answer On Testing

Testing can begin in two stages:

1. Right now for deployment smoke testing.
2. As soon as PocketBase collections and rules are created for real feature testing.

If the goal is to test sign-up, sign-in, and groups, Phase 1 is the point where testing becomes useful.

## Next Steps

1. Create the PocketBase collections and access rules that match the current frontend contract.
2. Verify auth and group flows against a running stack.
3. Implement synced personal progress.
4. Implement shared group progress rendering.
