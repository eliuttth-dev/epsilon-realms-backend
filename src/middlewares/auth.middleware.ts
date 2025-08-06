import {Request, Response, NextFunction} from "express";
import { searchUserByMatchingProps } from "../models/user.model";
import { generatePublicId } from "../utils/generatePublicId";
import { ERROR_MESSAGES } from "../constants/errorMessages";

interface RegisterBody {
    username: string;
    email: string;
    password: string;
    userPublicId?: string;
}

export const authRegisterMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {username, email, password} = req.body as RegisterBody;
    
    // Move this to a file in utils -> utils/validateInput.ts
    const usernameRegex = /^[^\s]{4,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;


    // Check inputs are correct format
    if(!usernameRegex.test(username)) {
        res.status(400).json({message: ERROR_MESSAGES.validation.username});
        return;
    }
    if(!emailRegex.test(email)) {
        res.status(400).json({message: ERROR_MESSAGES.validation.email});
        return;
    }
    if(!passwordRegex.test(password)) {
        res.status(400).json({message: ERROR_MESSAGES.validation.password});
        return;
    }

    try{
        const searchForExistingUser = await searchUserByMatchingProps({username, email});
        console.log(searchForExistingUser);
        if(searchForExistingUser.success === true) {
            res.status(400).json({message: ERROR_MESSAGES.auth.userExists, data: searchForExistingUser.data});
            return;
        }
        req.body.userPublicId = generatePublicId(username);
        next();
    }catch(error: any){
        res.status(500).json({message: ERROR_MESSAGES.server.generic, error: error.message})
        return;
    }
}