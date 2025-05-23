'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getBookById, updateBook } from '@/lib/api/book'
import BookForm from '@/components/books/BookForm'
import { Book } from '@/types/book'

export default function EditBookPage() {
  const { id } = useParams()
  const router = useRouter()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id as string)
        setBook(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
  }, [id])

  const handleUpdate = async (data: any) => {
    try {
      await updateBook(id as string, data)
      router.push(`/books/${id}`)
    } catch (err) {
      console.error('Failed to update book', err)
    }
  }

  if (loading || !book) return <div className="p-6"><p>Loading...</p></div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <BookForm onSubmit={handleUpdate} />
    </div>
  )
}
