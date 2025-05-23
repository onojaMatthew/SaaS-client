'use client'

import { useState } from 'react'
import BookForm from '@/components/books/BookForm'
import { uploadBook } from '@/lib/api/books'
import { useRouter } from 'next/navigation'

export default function UploadBookPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

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
      <BookForm onSubmit={handleUpload} loading={loading} />
    </div>
  )
}
