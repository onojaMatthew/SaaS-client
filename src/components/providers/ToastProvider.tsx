'use client'

import { ReactNode } from 'react'
import { Toaster } from 'sonner'

type Props = {
  children: ReactNode
}

export const ToastProvider = ({ children }: Props) => {
  return (
    <>
      <Toaster richColors position="top-right" />
      {children}
    </>
  )
}
