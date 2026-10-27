
import { MongoClient } from "mongodb";
import process from "node:process";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add MONGODB_URI to your .env.local file");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(uri);

const clientPromise =
  process.env.NODE_ENV === "development"
    ? (globalThis._mongoClientPromise ??= client.connect())
    : client.connect();

export default clientPromise;
