'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AuthForm from '@/components/auth/AuthForm'
import { registerUser } from '@/lib/api/auth'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async ({ email, password }: {email: string, password: string}) => {
    try {
      await registerUser({ email, password });
      router.push('/books')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <AuthForm
        type="login"
        onSubmit={handleLogin}
        error={error}
        title="Create a New Account"
      />
    </div>
  )
}
