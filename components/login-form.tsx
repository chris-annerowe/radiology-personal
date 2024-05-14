"use client"
import * as z from "zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, FloatingLabel } from 'flowbite-react'
import { LoginSchema } from '@/schemas'
import { login } from '@/actions/login'

export const LoginForm = () => {
    
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        console.log("submitting login")
        setError("")
        setSuccess("")

        startTransition(() => {
            login(values)
            .then((data) => {
                // setError(data.error)
                // setSuccess(data?.success)
            })
        })
    }

    return (
        <div className='flex bg-transparent px-30 py-30 pt-20 items-center justify-center'>
            <Card className='w-72'>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-2 flex-col '>
                    <FloatingLabel variant='outlined' label='Username' type='text' name='username' />

                    <FloatingLabel variant='outlined' label='Password' type='text' name='password' />
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