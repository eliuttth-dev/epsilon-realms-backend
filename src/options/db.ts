import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;

if(!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_DATABASE) throw new Error("Database env vars are not setted correctly")

const dbConfig = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000, 
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
}

export const poolConnection = mysql.createPool(dbConfig);
