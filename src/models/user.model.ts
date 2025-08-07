import { UserProps } from "./interface";
import { poolConnection } from "../options/db";
import { RowDataPacket } from "mysql2";
import { ApiResponse } from "../types";

// Main functions 
export const createNewUser = async ({props}: {props: UserProps}): Promise<void> => {
    const {username, email, passwordHash, type = "user", minecraftUserId} = props;

}

export const userLogIn = async (props): Promise<void> => {
}

export const userLogOut = async (props): Promise<void> => {

}
export const userEdition = async (props): Promise<void> => {

}


// Search functions
export const searchUserByUsername = async (username): Promise<object> => { return {} };
export const searchUserById = async (id): Promise<object> => { return {} };
export const searchUserByMinecraftId = async (minecraftId): Promise<object> => { return {} };

export const searchUserByMatchingProps = async (props: {username?: string, email?: string}): Promise<ApiResponse> => { 
    const {username, email} = props;
    let connection;
    try{
        connection = await poolConnection.getConnection();

        // Check if user already exists on Db
        const searchByPropsQuery = "SELECT * FROM Users WHERE username = ? OR email = ?"
        const searchByPropsValues = [username, email];
        const [searchResults] = await connection.query<RowDataPacket[]>(searchByPropsQuery, searchByPropsValues); 

        if(searchResults.length > 0) 
            return {
                success: true,
                data: searchResults[0],
                statusCode: 200
            };

        return {
            success: false,
            error: "no user found with provided properties.",
            statusCode: 404
        };
    }catch(error: any){
        console.error("Error searching user:", error.message);
        return {
            success: false,
            error: `Database error: ${error.message}`,
            statusCode: 500
        }
    }finally{
        if(connection) connection.release();
    }
};