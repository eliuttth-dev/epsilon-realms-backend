import {Request, Response, NextFunction} from "express";
import { searchUserByMatchingProps } from "../models/user.model";
import { generatePublicId } from "../utils/generatePublicId";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { validateInput } from "../utils/validateInput";
import { RegisterBody } from "../types";
import { errorLogMessages, logMessages } from "../utils/logMessages";


export const authRegisterMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {username, email, password} = req.body as RegisterBody;
    
    const checkUsername = validateInput({type: "username", input: username});
    const checkEmail = validateInput({type: "email", input: email});
    const checkPassword = validateInput({type: "password", input: password});

    // Check inputs are correct format
    if(!checkUsername) {
        res.status(400).json({message: ERROR_MESSAGES.validation.username});
        return;
    }
    if(!checkEmail) {
        res.status(400).json({message: ERROR_MESSAGES.validation.email});
        return;
    }
    if(!checkPassword) {
        res.status(400).json({message: ERROR_MESSAGES.validation.password});
        return;
    }

    try{
        const searchForExistingUser = await searchUserByMatchingProps({username, email});
        logMessages("Testing response from func: searchForExistingUser", searchForExistingUser);

        if(searchForExistingUser.success === true) {
            res.status(400).json({message: ERROR_MESSAGES.auth.userExists, data: searchForExistingUser.data});
            return;
        }
 
        req.body.userPublicId = generatePublicId(username);
        next();
    }catch(error: any){
        errorLogMessages("Auth Register Middleware error", error);
        res.status(500).json({message: ERROR_MESSAGES.server.generic, error: error.message})
        return;
    }
}