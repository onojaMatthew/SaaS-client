"use client";

import { useEffect, useState } from 'react';
import { Book } from '@/types/book'
import { useRouter } from 'next/navigation';
import { RatingStars } from './RatingStars'
import { ArrowLeftCircleIcon } from 'lucide-react';
import { authUser } from '@/lib/utils';
import {  RootState, useAppDispatch, useAppSelector } from '@/types/storeTypes';
import { deleteBook, rateBook } from '@/store/bookSlice';
import { logInteraction } from '@/store/recommendationSlice';
import LoadingSpinner from '../common/Spinner';

export default function BookDetails({ book }: any) {
  const { deleteSuccess, deleteLoading } = useAppSelector((state: RootState) => state.book);
  const dispatch = useAppDispatch();
  const [userRating, setUserRating] = useState<number | null>(null);
  const router = useRouter();
  const loggedInUser = authUser()?.user;

  useEffect(() => {
    // Optional: fetch user's existing rating if needed
    const stored = localStorage.getItem(`book-rating-${book?._id}`)
    if (stored) setUserRating(parseInt(stored))
  }, [book._id])

  const handleRate = async (value: number, id: string) => {
    setUserRating(value);
    localStorage.setItem(`book-rating-${book?._id}`, value.toString())

    try {
      dispatch(rateBook({id, rating: value}))
    } catch (err) {
      console.error('Failed to rate book', err)
    }
  }

  useEffect(() => {
    dispatch(logInteraction({ contentId: book?._id, interactionType: "view" }))
  }, [])

  const handleDelete = (id: string) => {
    dispatch(deleteBook(id));
  }

  useEffect(() => {
    if (deleteSuccess) {
      router.push(`/dashboard/${loggedInUser?.slug}`)
    }
  }, [ deleteSuccess ]);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <ArrowLeftCircleIcon size={40} className='mb-2 hover:cursor-pointer' onClick={() => router.back()}/>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={book?.url}
          alt={book?.title}
          className="w-full md:w-64 h-auto object-cover rounded"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{book?.title}</h1>
          <p className="text-lg text-gray-700 mt-2">by {book?.author}</p>
          <p className="text-sm text-gray-500 mt-1">{book?.category}</p>
          <p className="mt-4 text-gray-800">{book?.description}</p>
          <p className="mt-4 text-gray-800">{book?.textContent}</p>
        </div>
      </div>
     
      <div className="mt-4 flex justify-between">
        <div>
          <p className="font-medium text-gray-700 mb-1">Rate this book:</p>
          <RatingStars
            rating={book?.averageRating ?? 0}
            userRating={userRating ?? undefined}
            onRate={(value) => {
              setUserRating(value)
              handleRate(value, book?._id)
            }}
          />
        </div>
        {loggedInUser?.role === "content_manager" && loggedInUser?.businessId?.toString() === book?.businessId?.toString() && (
          <div className='flex'>
            <div 
              className='bg-blue-600 text-white h-10 px-2 hover:bg-blue-700 mr-4 focus:ring-blue-500 rounded hover:cursor-pointer shadow flex justify-center items-center gb-blue-500' 
              onClick={() => router.push(`/books/${book?._id}/edit`)}>
                Edit book
            </div>
            <div
              className='bg-red-600 text-white hover:bg-red-700 focus:ring-blue-red rounded h-10 px-2 hover:cursor-pointer shadow flex justify-center items-center gb-red-500' 
              onClick={() => handleDelete(book?._id)}>
                { deleteLoading ? <LoadingSpinner /> : "Delete book"}
            </div>  
          </div>
          
        )}
        
      </div>

    </div>
  )
}
