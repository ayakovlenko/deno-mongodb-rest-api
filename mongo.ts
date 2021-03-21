import { MongoClient } from "./deps_mongo.ts";

const client = new MongoClient();

const username = Deno.env.get("MONGO_ROOT_USERNAME");
const password = Deno.env.get("MONGO_ROOT_PASSWORD");

await client.connect(
  `mongodb://${username}:${password}@mongo:27017`,
);

const db = client.database("notes");

export { db };
