import { db } from "@/lib/db";

export const getUserByUsername = async (username: string) => {
    try{
        const user = await db.user.findUnique({where: {username} })
        console.log(user)
        return user;
    }catch{
        return null;
    }
}