import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";

const { Client } = pkg;

export const client = new Client({
  host: "db.mcoxumjmqjvahdkwwewk.supabase.co",
  user: "postgres",
  password: "bociljenong",
  database: "postgres"
});

await client.connect();
console.log("Terhubung ke basis data.");
