import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ToastProvider } from './components/providers/ToastProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>{children}</AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
