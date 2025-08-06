import { UserProps } from "./interface";
import { poolConnection } from "../options/db";
import { RowDataPacket } from "mysql2";

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

export const searchUserByMatchingProps = async (props: any) => { 
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
                status: true,
                data: searchResults[0]
            }
        return {
            status: false,
            data: "no user exists"
        }
    }catch(error: any){
        console.error("Error searching user:", error.message);
        throw new Error(`Database error while searching for user. ${error.message}`);
    }finally{
        if(connection) connection.release();
    }
};