'use client'

import { ReactNode, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface Props {
  children: ReactNode
  attribute?: 'class' | 'data-theme'
}

export const ThemeProvider = ({ children, attribute = 'class' }: Props) => {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme="system"
      enableSystem
    >
      {children}
    </NextThemesProvider>
  )
}
