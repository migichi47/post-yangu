import mongoose from "mongoose";

export async function start() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is required.");
  }

  await mongoose.connect(mongoUri);
  const db = mongoose.connection.db;
  const creatorsCollectionExists = await db
    .listCollections({ name: "creators" }, { nameOnly: true })
    .hasNext();

  if (!creatorsCollectionExists) {
    await db.createCollection("creators");
  }

  console.info("Connected to MongoDB and initialized the creators collection.");
}
