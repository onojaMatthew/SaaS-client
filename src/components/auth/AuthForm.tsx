import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import FormField from './FormField'
import LoadingSpinner from '../common/Spinner'
import { RootState, useAppSelector } from '@/types/storeTypes'
import Link from 'next/link'

type Props = {
  type: 'login' | 'register'
  onSubmit: (data:{email: string, password: string}) => void
  error?: string | null
  title?: string
}

export default function AuthForm({ type, onSubmit, error, title }: Props) {
  const { loading } = useAppSelector((state: RootState) => state.auth)
  const pathname = usePathname()
  const { register, handleSubmit, formState: { errors} } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const onHandleSubmit = (data: {email: string, password: string }) => {
    onSubmit(data);
  }

  console.log(pathname)
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
      {pathname === "/admin/login" ? <p className='py-2'>Don't have account? <Link href={"/register"}>Register</Link></p> : pathname === "/register" ?
      <p className='py-2'>Already have account? <Link href={"/admin/login"}>Login</Link></p> : null}
      {pathname === "/login" ? <p className='py-2'>Don't have account? <Link href={"/signup"}>Register</Link></p> : pathname === "/signup" ?
      <p className='py-2'>Already have account? <Link href={"/login"}>Login</Link></p> : null}
      
    </form>
  )
}
