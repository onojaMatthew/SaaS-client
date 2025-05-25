'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AuthForm from '@/components/auth/AuthForm';
import { authUser } from '@/lib/utils'
import { RootState, useAppDispatch, useAppSelector } from '@/types/storeTypes'
import { loginReader } from '@/store/authSlice';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { error, success, user } = useAppSelector((state: RootState) => state.auth);
  const [errMsg, setError] = useState<string | null>(null)

  const handleLogin = async ({ email, password }: {email: string, password: string}) => {
    try {
      dispatch(loginReader({ email, password }))
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  useEffect(() => {
    if (success && user) {
      router.push('/books');
    }
  }, [ success ])
  
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [ error ])

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
