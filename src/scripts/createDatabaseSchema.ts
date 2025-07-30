import fs from "fs";
import { fileURLToPath } from "url";
import path, {dirname} from "path";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbInitScript = fs.readFileSync(path.join(__dirname, "../migrations/scripts/create_database.sql"), 'utf8');

const { DB_HOST, DB_USER, DB_PASSWORD } = process.env;
if(!DB_HOST || !DB_USER || !DB_PASSWORD) throw new Error("Database env vars are not setted correctly");

(async () => {
    const connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        multipleStatements: true
    });

    await connection.query(dbInitScript);
    await connection.end();
})();