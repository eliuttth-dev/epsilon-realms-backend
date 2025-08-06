export interface UserProps{
    userPublicId: string;
    username: string;
    email: string;
    passwordHash: string;
    // location?: string; // location: Location
    type: "user" | "vip" | "sub" | "observer" | "admin" | "owner"; 
    minecraftUserId?: string;
}
