import type { ReactNode } from 'react'
import { useAuthStore } from '../store/authStore';
import { AppHeader } from './AppHeader';

interface LayoutProps {
  children: ReactNode
  title?: string
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAuthStore()
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className={`bg-white shadow-lg rounded-lg p-8 w-full flex flex-col items-center justify-center ${isAuthenticated ? 'max-w-2xl' : 'max-w-md'}`}>
        <AppHeader />
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
