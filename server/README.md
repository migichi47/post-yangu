# PostYangu API

The Express API connects to MongoDB through Mongoose and listens on port 3000.

1. Make sure MongoDB is running locally.
2. Set `MONGODB_URI` in `.env` (see `.env.example`).
3. Run `npm install`, then `npm run dev`.
4. Check `http://localhost:3000/api/health` for API and database status.

The default local URI is `mongodb://127.0.0.1:27017/post-yangu`.
