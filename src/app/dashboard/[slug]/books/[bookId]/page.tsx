'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import BookDetails from '@/components/books/BookDetails'
import LoadingSpinner from '@/components/common/Spinner'
import { RootState, useAppSelector, useAppDispatch } from "../../../../../types/storeTypes"
import { getBookById } from '@/store/bookSlice'
import { toast } from 'sonner'
export default function BookPage() {
  const dispatch = useAppDispatch();
  const { book, loading, error } = useAppSelector((state: RootState) => state.book);
  const { bookId } = useParams();

  useEffect(() => {
    if (typeof bookId !== "string") {
      return;
    }
    dispatch(getBookById(bookId))
      
  }, [bookId])

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
