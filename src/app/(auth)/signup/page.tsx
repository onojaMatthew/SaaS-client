'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AuthForm from '@/components/auth/AuthForm'
import { RootState, useAppDispatch, useAppSelector } from '@/types/storeTypes'
import { registerUser } from '@/store/authSlice'
import { toast } from 'sonner'

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { error, success , user} = useAppSelector((state: RootState) => state.auth)
  const router = useRouter()

  const handleLogin = async ({ email, password }: {email: string, password: string}) => {
    if (typeof email === "undefined" || typeof password === "undefined") {
      return;
    }
    
    dispatch(registerUser({ email, password }));
  }

  useEffect(() => {
    if (success && user) {
      router.push('/books')
    }
  }, [ success ]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [ error ]);
  
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
