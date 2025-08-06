import express from "express";
import { authRegisterController } from "../controllers/auth.controller";
import { authRegisterMiddleware } from "../middlewares/auth.middleware";

export const router = express.Router();

router.get("/hello", (req, res) => res.send("Hello World"));
router.post("/api/v1/auth/register", authRegisterMiddleware, authRegisterController)