import {Request, Response} from "express";
import { logMessages } from "../utils/logMessages";
export const authRegisterController = (req: Request, res: Response) => {
    const {username, email, passwordHash, type = "user", minecraftUserId} = req.body;

    res.status(200).json({data: req.body});
    logMessages("Data comming from Auth Controller", req.body);
    return;
}