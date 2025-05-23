'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getBookById } from '@/lib/api/book'
import { Book } from '@/types/book'
import BookDetails from '@/components/books/BookDetails'
import LoadingSpinner from '@/components/common/Spinner'
export default function BookPage() {
  const { id } = useParams()
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

  return (
    <div className="p-6">
      {loading ? <LoadingSpinner /> : book && <BookDetails book={book} />}
    </div>
  )
}
