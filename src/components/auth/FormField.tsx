import { ReactNode } from 'react'
import { Label } from '@/components/ui/label'

type Props = {
  label: string
  children: ReactNode
}

export default function FormField({ label, children }: Props) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      {children}
    </div>
  )
}
