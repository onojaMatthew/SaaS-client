'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AuthForm from '@/components/auth/AuthForm'
import { authUser } from '@/lib/utils'
import { RootState, useAppDispatch, useAppSelector } from '@/types/storeTypes'
import { loginBusiness } from '@/store/authSlice'
import { toast } from 'sonner'

export default function LoginPage() {
  const { user, success, error } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter()

  const handleLogin = async ({ email, password }: {email: string, password: string}) => {
    try {
      const data = { email, password }
      dispatch(loginBusiness(data));
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    if (success && user.role === "content_manager") {
      router.push(`/dashboard/${user.slug}`)
    } else {
      router.push("/admin/login");
    }
  }, [ success, user ]);

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [ error ]);

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
