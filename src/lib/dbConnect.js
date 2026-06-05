import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbname = process.env.DBNAME;

let client;
let clientPromise;

function getClientPromise() {
  if (!uri) {
    throw new Error("Missing MONGODB_URI in environment variables");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export const connectDB = async () => {
  const connectedClient = await getClientPromise();
  return connectedClient.db(dbname);
};
