import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/index";

dotenv.config();

const app = express();
const port = 3030;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`http://localhost:${port}`));
