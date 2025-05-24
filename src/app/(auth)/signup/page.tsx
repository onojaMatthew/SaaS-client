'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AuthForm from '@/components/auth/AuthForm'
import { RootState, useAppDispatch, useAppSelector } from '@/types/storeTypes'
import { registerUser } from '@/store/authSlice'

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { success , user} = useAppSelector((state: RootState) => state.auth)
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async ({ email, password }: {email: string, password: string}) => {
    if (typeof email === "undefined" || typeof password === "undefined") {
      return;
    }
    try {

      dispatch(registerUser({ email, password }));
      
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  useEffect(() => {
    if (success && user) {
      router.push('/books')
    }
  }, [ success ]);
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
