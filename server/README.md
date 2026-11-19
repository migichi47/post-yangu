# PostYangu API

The Express API connects to MongoDB through Mongoose and listens on port 3000.

1. Make sure MongoDB is running locally.
2. Set `MONGODB_URI` and a private `SESSION_SECRET` in `.env` (see `.env.example`).
3. Run `npm install`, then `npm run dev`.
4. Check `http://localhost:3000/api/health` for API and database status.

The default local URI is `mongodb://127.0.0.1:27017/post-yangu`.

Authentication endpoints:

- `POST /auth/signup` with username, password, display name, and profile image creates a creator and signs them in immediately.
- `POST /auth/login` with `{ "username": "...", "password": "..." }` or `{ "email": "...", "password": "..." }` creates a one-hour session.
- `GET /auth/me` returns the logged-in creator, or `401` when no valid session exists.

The browser must send requests with credentials enabled so it can store and send the session cookie.
