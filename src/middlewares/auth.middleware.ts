import {Request, Response, NextFunction} from "express";
import { searchUserByMatchingProps } from "../models/user.model";

export const authRegisterMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {username, email, password} = req.body;
    
    const usernameRegex = /^[^\s]{4,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;


    // Check inputs are correct format
    if(!usernameRegex.test(username)) {
        res.status(500).json({message: "Username format incorrect"});
        return;
    }
    if(!emailRegex.test(email)) {
        res.status(500).json({message: "Email format incorrect"});
        return;
    }
    if(!passwordRegex.test(password)) {
        res.status(500).json({message: "Password format incorrect"});
        return;
    }

    try{
        const searchForExistingUser = await searchUserByMatchingProps({username, email});
        console.log(searchForExistingUser);
        if(searchForExistingUser.status === true) {
            res.status(400).json({message: "User already exists", data: searchForExistingUser.data});
            return;
        }
        (req.body as { userPublicId?: string}).userPublicId = "#-TEST-UUID";
        next();
    }catch(error: any){
        res.status(500).json({message: "Internal Server Error Middleware", error: error.message})
        return;
    }
}