import { MongoClient, Db } from 'mongodb';

// Optional MongoDB support
// If MONGODB_URI is not provided, the site will run without a database.

const uri = process.env.MONGODB_URI;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

/**
 * Get a database connection. Returns null if no MONGODB_URI is configured.
 */
export async function getDb(): Promise<Db | null> {
  if (!uri) {
    // No database configured
    return null;
  }
  if (cachedDb) {
    return cachedDb;
  }
  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
  }
  if (!cachedClient.topology?.isConnected()) {
    await cachedClient.connect();
  }
  cachedDb = cachedClient.db();
  return cachedDb;
}

/**
 * Insert a contact message into the database. This function gracefully handles
 * cases where no database is configured by returning early. Messages are stored
 * in a collection named `contactMessages` with a timestamp. If the database
 * connection is not available or an insertion error occurs, the error is
 * silently ignored to avoid leaking internal details to the frontend.
 *
 * @param name The sender's name
 * @param email The sender's email address
 * @param message The message content
 */
export async function insertContactMessage(
  name: string,
  email: string,
  message: string
): Promise<void> {
  try {
    const db = await getDb();
    if (!db) return;
    const collection = db.collection('contactMessages');
    await collection.insertOne({ name, email, message, createdAt: new Date() });
  } catch (err) {
    // Suppress errors. Logging could be added here in a real deployment.
    return;
  }
}