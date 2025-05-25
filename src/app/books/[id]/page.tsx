'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import BookDetails from '@/components/books/BookDetails'
import LoadingSpinner from '@/components/common/Spinner'
import { RootState, useAppDispatch, useAppSelector } from '@/types/storeTypes'
import { getBookById } from '@/store/bookSlice'
import { toast } from 'sonner'
export default function BookPage() {
  const dispatch = useAppDispatch();
  const { book, loading, error } = useAppSelector((state: RootState) => state.book);
  const { id } = useParams();

  useEffect(() => {
    if (typeof id !== "string") {
      return;
    }
    dispatch(getBookById(id))
      
  }, [id])

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [ error ])
  return (
    <div className="p-6">
      {loading ? <LoadingSpinner /> : book && <BookDetails book={book} />}
    </div>
  )
}
