import { LogMessagesResponse } from "../types";
import { fileURLToPath } from "url";
import path, {dirname} from "path";
import fs from "fs/promises";
import dotenv from "dotenv";


dotenv.config();

const { ENV } = process.env;
//@ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const createLogsFolder = async ():Promise<void> => {
    const logsPath = path.join(__dirname, "../../logs");
    if(logsPath) console.log(logsPath, "Yes it is true")

    try{
        await fs.stat(logsPath);
        successLogMessages("Logs folder already exists at:", logsPath);
    }catch(error: any){

        try{
            await fs.mkdir(logsPath, {recursive: true});
            successLogMessages("Created logs folder at:", logsPath);
        }catch(mkdirErr: any){
            errorLogMessages("Failed to create logs folder", mkdirErr);
            throw mkdirErr;
        }
    }
}

export const warningLogMessages = <T = any>(message:string, data?:T): LogMessagesResponse => {
    // This should create a log file root/logs/warning/file.txt
    if(ENV === "DEVELOPMENT") console.warn("status: warning,", message, data);
    
    return {
        status:"warning",
        message,
        data
    }
};
export const errorLogMessages = <T = any>(message:string, data?:T): LogMessagesResponse => {
    if(ENV === "DEVELOPMENT") console.error("status: error,", message, data);

    return {
        status:"error",
        message,
        data
    }
};

export const successLogMessages = <T = any>(message:string, data?:T): LogMessagesResponse => {
    if(ENV === "DEVELOPMENT") console.log("status: success,", message, data);

    return {
        status:"sucess",
        message,
        data
    }
};
export const logMessages = <T = any>(message:string, data?:T): LogMessagesResponse => {
    if(ENV === "DEVELOPMENT") console.log("status: log,", message, data);

    return {
        status:"log",
        message,
        data
    }
};