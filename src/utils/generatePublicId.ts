export const generatePublicId = (username:string) => {
    const randomNumberGen = Math.floor(1000000 + Math.random() * 9000000);
    return `${username}#${randomNumberGen}`;
}