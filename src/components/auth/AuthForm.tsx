import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import FormField from './FormField'
import LoadingSpinner from '../common/Spinner'

type Props = {
  type: 'login' | 'register'
  onSubmit: (data:{email: string, password: string}) => void
  error?: string | null
  title?: string
}

export default function AuthForm({ type, onSubmit, error, title }: Props) {
  const [ loading, setLoading ] = useState(false)
  const { register, handleSubmit, formState: { errors} } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const onHandleSubmit = (data: {email: string, password: string }) => {
    setLoading(true)
    onSubmit(data);
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onHandleSubmit)}
      className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">{title}</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <FormField label="Email">
        <Input
          suppressHydrationWarning
          type="email"
          {...register("email", { required: "Email is required"})}
        />
        {errors.email && <p className='mt-2 text-red-500'>{errors?.email?.message}</p>}
      </FormField>
      <FormField label="Password">
        <Input
        suppressHydrationWarning
          type="password"
          {...register("password", { required: "Password is required"})}
        />
        {errors.password && <p className='mt-2 text-red-500'>{errors?.password?.message}</p>}
      </FormField>
      <Button type="submit" className="w-full">
        {type === 'login' ? loading ? <LoadingSpinner /> : 'Login' : loading ? <LoadingSpinner /> : 'Register'}
      </Button>
    </form>
  )
}
