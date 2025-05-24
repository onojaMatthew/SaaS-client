'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import BookDetails from '@/components/books/BookDetails'
import LoadingSpinner from '@/components/common/Spinner'
import { RootState, useAppDispatch, useAppSelector } from '@/types/storeTypes'
import { getBookById } from '@/store/bookSlice'
export default function BookPage() {
  const dispatch = useAppDispatch();
  const { book, loading } = useAppSelector((state: RootState) => state.book);
  const { id } = useParams();

  useEffect(() => {
    if (typeof id !== "string") {
      return;
    }
    dispatch(getBookById(id))
      
  }, [id])

  return (
    <div className="p-6">
      {loading ? <LoadingSpinner /> : book && <BookDetails book={book} />}
    </div>
  )
}
