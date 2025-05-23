'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AuthForm from '@/components/auth/AuthForm'
import { loginUser } from '@/lib/api/auth'
import { authUser } from '@/lib/utils'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async ({ email, password }: {email: string, password: string}) => {
    try {
      await loginUser({ email, password })
      const isLoggedIn: any = authUser()
      console.log(isLoggedIn, " the login details")
      if (isLoggedIn && isLoggedIn.user && isLoggedIn?.user.role === "content_manager") {
        router.push('/dashboard');
      } else {
        router.push("/admin/login")
      }
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
        title="Login to Your Account"
      />
    </div>
  )
}
