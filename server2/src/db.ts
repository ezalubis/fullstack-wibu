import  dotenv from 'dotenv';
dotenv.config();

import pkg from "pg";
interface Pool{
  host:string | undefined;
  user: string | undefined;
  password:string |undefined;
  database: string | undefined;
}
const { Client } = pkg;

const pool : Pool[]={
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
pool.password = pool.password.length == 0 ? " " : pool.password
export const client = new Client(pool);
export async function connectToDatabase() {
  await client.connect();
}
console.log("Terhubung ke basis data.");
