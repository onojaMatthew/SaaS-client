"use client";

import { useEffect, useState } from 'react';
import { Book } from '@/types/book'
import { rateBook } from '@/lib/api/books'
import { useRouter } from 'next/navigation';
import { RatingStars } from './RatingStars'
import { ArrowLeft, ArrowLeftCircleIcon } from 'lucide-react';
import { authUser } from '@/lib/utils';

type Props = {
  book: Book
}

export default function BookDetails({ book }: any) {
  const [userRating, setUserRating] = useState<number | null>(null);
  const router = useRouter();
  const loggedInUser = authUser()?.user;

  useEffect(() => {
    // Optional: fetch user's existing rating if needed
    const stored = localStorage.getItem(`book-rating-${book?.data?._id}`)
    if (stored) setUserRating(parseInt(stored))
  }, [book._id])

  const handleRate = async (value: number) => {
    setUserRating(value);
    localStorage.setItem(`book-rating-${book?.data?._id}`, value.toString())

    try {
      await rateBook(book._id, value)
    } catch (err) {
      console.error('Failed to rate book', err)
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <ArrowLeftCircleIcon className='w-5 h-5 hover:cursor-pointer' onClick={() => router.back()}/>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={book?.data?.url}
          alt={book?.data?.title}
          className="w-full md:w-64 h-auto object-cover rounded"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{book?.data?.title}</h1>
          <p className="text-lg text-gray-700 mt-2">by {book?.data?.author}</p>
          <p className="text-sm text-gray-500 mt-1">{book?.data?.category}</p>
          <p className="mt-4 text-gray-800">{book?.data?.description}</p>
          <p className="mt-4 text-gray-800">{book?.data?.textContent}</p>
        </div>
      </div>
     
      <div className="mt-4 flex justify-between">
        <div>
          <p className="font-medium text-gray-700 mb-1">Rate this book:</p>
          <RatingStars
            rating={book?.data?.averageRating ?? 0}
            userRating={userRating ?? undefined}
            onRate={(value) => {
              setUserRating(value)
              rateBook(book?.data?._id, value)
            }}
          />
        </div>
        {loggedInUser?.role === "content_manager" && (
          <div 
            className='p-2 hover:cursor-pointer shadow flex justify-center items-center gb-blue-500' 
            onClick={() => router.push(`/books/${book?.data?._id}/edit`)}>
              Edit book
          </div>
        )}
        
      </div>

    </div>
  )
}
