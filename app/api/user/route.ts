import { NextResponse } from "next/server";
import { db } from '@/lib/db';
import { hash } from 'bcrypt';

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const { username, email, password } = body;

        //check if email already exists
        const existingUserByEmail = await db.user.findUnique({
            where: {email:email}
        });
        if(existingUserByEmail){
            return NextResponse.json({ user: null, message: 'User with this email already exists'}, {status: 409})
        }

        //check if username already exists
        const existingUserByUsername = await db.user.findUnique({
            where: {username:username}
        });
        if(existingUserByUsername){
            return NextResponse.json({ user: null, message: 'User with this username already exists'}, {status: 409})
        }

        const hashedPassword = await hash(password, 10)
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        //Remove password from response object(do not send password inside response).
        const {password: newUserPassword, ...rest} = newUser;

        return NextResponse.json({user: rest, message: 'User created successfully'}, {status: 201});
    }catch(e){
        return NextResponse.json({message: 'Something went wrong!'}, {status: 500});
    }
}