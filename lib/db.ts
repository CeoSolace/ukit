import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db | null> {
  if (!uri) {
    return null;
  }

  if (cachedDb) {
    return cachedDb;
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  cachedDb = cachedClient.db();
  return cachedDb;
}

export async function insertContactMessage(
  name: string,
  email: string,
  message: string
): Promise<void> {
  try {
    const db = await getDb();

    if (!db) {
      return;
    }

    const collection = db.collection("contactMessages");

    await collection.insertOne({
      name,
      email,
      message,
      createdAt: new Date()
    });
  } catch {
    return;
  }
}
