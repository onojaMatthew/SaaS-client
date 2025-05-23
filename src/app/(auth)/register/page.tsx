'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import RegistrationForm from '@/components/auth/RegistrationForm'
import { registerBusiness } from '@/lib/api/auth'
import { authUser } from '@/lib/utils'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleRegister = async (data: {name: string, businessName: string, email: string, password: string}) => {
    try {
      const userRole = "content_manager";
      await registerBusiness({ email: data.email, name: data.name, businessName: data.businessName, password: data.password, role: userRole });
      const user = authUser()?.user;
      if (user) {
        router.push(`/dashboard/${user?.slug}`);
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    }
  }

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
