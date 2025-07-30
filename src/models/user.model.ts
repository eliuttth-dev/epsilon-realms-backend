import { UserProps } from "./interface";

// Main functions 
export const createNewUser = async ({props}: {props: UserProps}): Promise<void> => {
    const {name, username, email, password} = props;

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
export const searchUserByMatchingProps = async(props): Promise<object> => { return {} };