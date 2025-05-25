'use client'

import BookForm from '@/components/books/BookForm'
import { useRouter } from 'next/navigation'
import { BookPayload } from '@/types/book'
import { ArrowLeftCircle } from 'lucide-react'
import { RootState, useAppDispatch, useAppSelector } from '@/types/storeTypes'
import { uploadBook } from '@/store/bookSlice'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { authUser } from '@/lib/utils'

export default function UploadBookPage() {
  const dispatch = useAppDispatch();
  const { book, loading, error } = useAppSelector((state: RootState) => state.book)
  const router = useRouter()
  

  const handleUpload = async (formData: BookPayload) => {
    dispatch(uploadBook(formData));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [ error ])

  useEffect(() => {
    const user = authUser()?.user;
    if (!user || user.role !== "content_manager") {
      router.push("/admin/login");
    }
  })

  return (
    <div className="p-6">
      <div className="flex">
        <ArrowLeftCircle onClick={() => router.back()} size={40} className='mx-4 hover:cursor-pointer'/>
        <h1 className="text-2xl font-bold mb-4">Upload New Book</h1>
        </div>
      
      <BookForm book={book} onSubmit={handleUpload} loading={loading} />
    </div>
  )
}
