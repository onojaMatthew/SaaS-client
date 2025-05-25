'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import RegistrationForm from '@/components/auth/RegistrationForm'
import { registerBusiness } from '@/store/authSlice'
import { RootState, useAppDispatch, useAppSelector } from '@/types/storeTypes'
import { toast } from 'sonner'

export default function RegisterPage() {
  const { success, user, error } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter()

  const handleRegister = async (data: {name: string, businessName: string, email: string, password: string}) => {
    const userRole = "content_manager";
    dispatch(registerBusiness({ email: data.email, name: data.name, businessName: data.businessName, password: data.password, role: userRole }));
  }

  useEffect(() => {
    if (success && user.role === "content_manager") {
      router.push(`/dashboard/${user.slug}`);
    } 
  }, [ success, user])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [ error ]);
  
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
