import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import { compare } from 'bcrypt'
import { Button, Card, FloatingLabel } from 'flowbite-react'
import ThemeSwitch from '@/components/themeSwitch'

const SignIn = () => {

    async function createUser(data: FormData) {
        "use server"
        const users = await db.user.findMany()
        console.log(users)

        const username = data.get('username')?.valueOf()
        const password = data.get('password')?.valueOf()

        if (typeof username !== 'string' || username?.length === 0) {
            throw new Error("Invalid Username")
        }
        if (typeof password !== 'string' || password?.length === 0) {
            throw new Error("Invalid Password")
        }

        {
            users.map((user) => {
                console.log(user.username)
                console.log(user.password)
                // const passwordMatch = await compare(user.password,password);
                //     if(!passwordMatch){
                //        console.log("Password incorrect. Please try again.")
                //     }
                //     console.log("decrypted: ",passwordMatch)
                if (username === user.username && (password === user.password)) {
                    console.log("User verified")
                    redirect('/dashboard')
                }
            })
        }
        throw new Error("Credentials do not match. Please try again")
    }

    return (
        <div className='flex bg-transparent px-30 py-30 pt-20 items-center justify-center'>
            <ThemeSwitch />
            <Card className='w-72'>
                <form action={createUser} className='flex gap-2 flex-col '>
                    <FloatingLabel variant='outlined' label='Username' type='text' name='username' />

                    <FloatingLabel variant='outlined' label='Password' type='password' name='password' />
                    {/*<input
                        type='text'
                        name='username'
    className='border border-slate-300 bg-transparent rounded px-2 py-1 outline-black focus-within:border-slate-100' />*/}
                    {/*<input
                        type='text'
                        name='password'
className='border border-slate-300 bg-transparent rounded px-2 py-1 outline-black focus-within:border-slate-100' />*/}
                    {/*<button type='submit' className='border border-slate-300'>Sign In</button>*/}
                    <Button type='submit'>Sign In</Button>
                </form>
            </Card>
        </div>
    )
}

export default SignIn