'use client'

import { useEffect, useState } from 'react'
import { Book } from '@/types/book'
import { getBooks } from '@/lib/api/books'
import BookGrid from '@/components/books/BookGrid'
import LoadingSpinner from '@/components/common/Spinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data: any = await getBooks()
        console.log(data, " the response")
        setBooks(data?.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Dashboard</h1>
      <p className="text-gray-600">
        Here’s a quick overview of your activity and shortcuts to key actions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <Sparkles className="w-5 h-5" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">
              Explore personalized book suggestions powered by AI.
            </p>
            <Link href="/recommendations">
              <Button variant="primary">View Recommendations</Button>
            </Link>
          </CardContent>
        </Card>

        {/* <Card className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <UploadCloud className="w-5 h-5" />
              Upload Books
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">
              Add books to your library and improve your recommendations.
            </p>
            <Link href="/books/upload">
              <Button variant="primary">Upload Book</Button>
            </Link>
          </CardContent>
        </Card> */}

        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <Settings className="w-5 h-5" />
              User Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">
              Customize your profile and reading preferences.
            </p>
            <Link href="/settings/preferences">
              <Button variant="primary">Settings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <h1 className="text-2xl font-bold mt-8 mb-2">All Books</h1>
      {loading ? <LoadingSpinner /> : <BookGrid books={books} />}
    </div>
  )
}
