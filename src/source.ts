import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/index";
import { createLogsFolder } from "./utils/logMessages";

dotenv.config();

const app = express();
const port = 3030;

createLogsFolder();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`http://localhost:${port}`));
