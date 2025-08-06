import {Request, Response} from "express";

export const authRegisterController = (req: Request, res: Response) => {
    const {username, email, passwordHash, type = "user", minecraftUserId} = req.body;

    res.status(200).json({data: req.body});
    return;
}