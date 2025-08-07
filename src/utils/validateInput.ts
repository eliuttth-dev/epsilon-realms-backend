interface InputType{
    type: "username" | "email" | "password";
    input: string;
}

export const validateInput = ({type, input} : InputType): boolean => {
    const usernameRegex = /^[^\s]{4,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

    switch(type){
        case "username":
            return usernameRegex.test(input);
        case "email":
            return emailRegex.test(input);
        case "password":
            return passwordRegex.test(input);
        default:
            // throw new Error("Type input is not valid. Allowed types are: username | email | password");
            return false;
    }
}