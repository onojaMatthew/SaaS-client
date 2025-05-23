// client/app/page.tsx

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to BookWise 📚
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Discover and explore personalized book recommendations powered by AI.
          Upload, browse, and get matched with your next favorite read.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <Button variant="primary">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary">Register</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
