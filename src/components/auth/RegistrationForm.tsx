"use client";

import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FormField from './FormField'
import LoadingSpinner from '../common/Spinner';

type Props = {
  type: 'login' | 'register'
  onSubmit: (data: {name: string, businessName: string, email: string, password: string}) => void
  error?: string | null
  title?: string
}

export default function RegistrationForm({ type, onSubmit, error, title }: Props) {
  const [loading, setLoading ] = useState(false)
  const { register, handleSubmit, formState: { errors} } = useForm({
    defaultValues: {
      name: "",
      businessName: "",
      email: "",
      password: ""
    }
  })
  ;
  
  const onHandleSubmit = (data: {name: string, businessName: string, email: string, password: string}) => {
    setLoading(true)
    onSubmit(data);
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit(onHandleSubmit)}
      className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">{title}</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <FormField label="Name">
        <Input
          type="name"
          {...register("name", { required: "Name field is required"})}
        />
        {errors.name && <p className='mt-2 text-red'>{errors?.name?.message}</p>}
      </FormField>
      <FormField label="Email">
        <Input
          type="email"
          {...register("email", { required: "Email field is required"})}
        />
        {errors.email && <p className='mt-2 text-red'>{errors?.email?.message}</p>}
      </FormField>
      <FormField label="Business name">
        <Input
          type="text"
          {...register("businessName", { required: "Business name field is required"})}
        />
        {errors.businessName && <p className='mt-2 text-red'>{errors?.businessName?.message}</p>}
      </FormField>
      <FormField label="Password">
        <Input
          type="password"
          {...register("password", { required: "Password field is required"})}
        />
        {errors.password && <p className='mt-2 text-red'>{errors?.password?.message}</p>}
      </FormField>
      <Button type="submit" className="w-full">
        {type === 'login' ? loading ? <LoadingSpinner/> : 'Login' : loading ? <LoadingSpinner /> : 'Register'}
      </Button>
    </form>
  )
}
