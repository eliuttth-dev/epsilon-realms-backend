export interface UserProps{
    name: string;
    username: string;
    email: string;
    password: string;
    location?: string; // location: Location
    type: "user" | "admin" | "vip" | "sub" | "observer"; 
}
