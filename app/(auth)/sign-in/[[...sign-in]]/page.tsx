'use client'

import React, { useState, FormEvent, use, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button, Card, FloatingLabel } from 'flowbite-react'
import ThemeSwitch from '@/components/themeSwitch'
import { useSession } from 'next-auth/react'

const SignIn = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('dashboard/daybook')
    } 
  }, [status, router])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    const username = (formData.get('username') as string) || ''
    const password = (formData.get('password') as string) || ''

    if (!username || !password) {
      setError('Username and password are required')
      return
    }

    setLoading(true)
    try {
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false,
        callbackUrl: '/dashboard',
      })

      if (res?.error) {
        setError('Invalid credentials')
        return
      }

      if (res?.ok) {
        router.push(res.url||'sign-in')
        return
      }

      if (res?.url) {
        router.replace(res.url)
        return
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-transparent flex items-center justify-center px-30 py-30">
  <div className="absolute top-4 left-4 z-10">
    <ThemeSwitch />
  </div>
  <Card className="w-72">
    <form onSubmit={onSubmit} className="flex gap-2 flex-col">
      <FloatingLabel variant="outlined" label="Username" type="text" name="username" />
      <FloatingLabel variant="outlined" label="Password" type="password" name="password" />
      {error && (
        <div className="text-red-600 text-sm mt-1" role="alert">
          {error}
        </div>
      )}
      <Button type="submit" isProcessing={loading} disabled={loading}>
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  </Card>
</div>
  )
}

export default SignIn
