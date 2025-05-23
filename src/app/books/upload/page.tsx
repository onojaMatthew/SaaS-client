'use client'

import { useState } from 'react'
import BookForm from '@/components/books/BookForm'
import { uploadBook } from '@/lib/api/books'
import { useRouter } from 'next/navigation'
import { Book } from '@/types/book'

export default function UploadBookPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [ book, setBook ] = useState<Book>({
    _id: "",
    title: "",
    author: "",
    description: "",
    category: "",
    url: "",
    uploadedAt: "",
    uploaderId: "",
    averageRating: 0,
    textContent: ""
  })

  const handleUpload = async (formData: FormData) => {
    try {
      setLoading(true)
      await uploadBook(formData)
      router.push('/books')
      setLoading(true);
    } catch (err) {
      console.error('Upload failed', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload New Book</h1>
      <BookForm book={book} onSubmit={handleUpload} loading={loading} />
    </div>
  )
}
