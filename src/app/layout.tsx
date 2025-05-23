
import './globals.css'
import { Providers } from '@/providers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BookWise – AI Book Recommendations',
  description: 'SaaS platform for personalized book recommendations using AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
