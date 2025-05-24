"use client";

import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ToastProvider } from './components/providers/ToastProvider'
import { Provider } from 'react-redux';
import { store } from './store/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
          <Provider store={store}>
            {children}
          </Provider>
      </ToastProvider>
    </ThemeProvider>
  );
}
