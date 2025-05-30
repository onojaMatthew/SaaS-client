'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import BookForm from '@/components/books/BookForm'
import { RootState, useAppDispatch, useAppSelector } from '@/types/storeTypes'
import { getBookById, updateBook } from '@/store/bookSlice'
import { ArrowLeftCircle } from 'lucide-react'
import { authUser } from '@/lib/utils'
import { toast } from 'sonner'

export default function EditBookPage() {
  const dispatch = useAppDispatch();
  const { book, error, loading } = useAppSelector((state: RootState) => state.book)
  const { id } = useParams();
  const router = useRouter();
  const loggedInUser = authUser()?.user;

  useEffect(() => {
    if (typeof id !== 'string') {
      return;
    }
    if (id) {
      dispatch(getBookById(id));
    }
  }, [id])

  const handleUpdate = async (data: any) => {
    if (typeof id !== 'string') {
      return;
    }
      
    dispatch(updateBook({ id, data }))
      
  }
 
  useEffect(() => {
    if (error) {
      toast.error(error);
      if (error && (error.includes("Invalid token") || error?.includes("Access denied"))) {
        router.push("/admin/login")
      }
    }
  }, [ error ])
  if (loading || !book) return <div className="p-6"><p>Loading...</p></div>

  return (
    <div className="p-6">
      <div className='flex '>
        <ArrowLeftCircle size={40} onClick={() => router.push(`/dashboard/${loggedInUser?.slug}`)} className='mx-4' />
        <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      </div>
      
      <BookForm book={book} onSubmit={handleUpdate} />
    </div>
  )
}
