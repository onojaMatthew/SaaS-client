'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AuthForm from '@/components/auth/AuthForm'
import { authUser } from '@/lib/utils'
import { RootState, useAppDispatch, useAppSelector } from '@/types/storeTypes'
import { loginBusiness } from '@/store/authSlice'

export default function LoginPage() {
  const { user, success } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async ({ email, password }: {email: string, password: string}) => {
    try {
      const data = { email, password }
      dispatch(loginBusiness(data));
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  useEffect(() => {
    if (success && user.role === "content_manager") {
      router.push(`/dashboard/${user.slug}`)
    } else {
      router.push("/admin/login");
    }
  }, [ success, user ]);

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
