# PostYangu API

The Express API connects to MongoDB through Mongoose and listens on port 3000.

1. Make sure MongoDB is running locally.
2. Set `MONGODB_URI` and a private `SESSION_SECRET` in `.env` (see `.env.example`).
3. Run `npm install`, then `npm run dev`.
4. Check `http://localhost:3000/api/health` for API and database status.

The default local URI is `mongodb://127.0.0.1:27017/post-yangu`.

Authentication endpoints:

- `POST /api/auth/signup` with username, password, display name, and profile image creates a creator and signs them in immediately. Creators can optionally include a location for discovery.
- `POST /api/auth/login` with `{ "username": "...", "password": "..." }` or `{ "email": "...", "password": "..." }` creates a one-hour session.
- `POST /api/auth/fan/signup` with `{ "fullName": "...", "email": "...", "password": "..." }` creates a fan account and signs them in immediately. Fan email addresses are unique and passwords must contain at least 8 characters.
- `POST /api/auth/fan/login` with `{ "email": "...", "password": "..." }` creates a one-hour fan session.
- `POST /api/auth/logout` deletes the current session and clears its cookie.
- `GET /api/auth/me` returns the logged-in account with `accountType` (`creator` or `fan`), or `401` when no valid session exists.
- Authenticated users can browse `GET /api/creators` with `q`, `niche`, `location`, `verified`, `sort`, `page`, and `limit` filters or read a profile via `GET /api/creators/:username`.
- Fans can list followed creators with `GET /api/creators/following`, follow with `PUT /api/creators/:username/follow`, and unfollow with `DELETE /api/creators/:username/follow`. Follow requests are idempotent and duplicate rows are prevented by a unique database index.

The browser must send requests with credentials enabled so it can store and send the session cookie.
