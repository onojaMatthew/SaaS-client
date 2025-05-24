'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import RegistrationForm from '@/components/auth/RegistrationForm'
import { authUser } from '@/lib/utils'
import { registerBusiness } from '@/store/authSlice'
import { RootState, useAppDispatch, useAppSelector } from '@/types/storeTypes'

export default function RegisterPage() {
  const { success, user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleRegister = async (data: {name: string, businessName: string, email: string, password: string}) => {
    try {
      const userRole = "content_manager";
      dispatch(registerBusiness({ email: data.email, name: data.name, businessName: data.businessName, password: data.password, role: userRole }));
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    }
  }

  useEffect(() => {
    if (success && user.role === "content_manager") {
      router.push(`/dashboard/${user.slug}`);
    } 
  }, [ success, user])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <RegistrationForm
        type="register"
        onSubmit={handleRegister}
        error={error}
        title="Create a New Account"
      />
    </div>
  )
}
