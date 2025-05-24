// client/app/dashboard/page.tsx

'use client'

import Link from 'next/link'
import { Book } from '@/types/book'
import BookCard from '@/components/books/BookCard'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/common/Spinner'
import { UploadCloud } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useEffect } from 'react';
import { authUser } from '@/lib/utils'
import { RootState, useAppDispatch, useAppSelector } from '@/types/storeTypes'
import { getUserUploadedBooks } from '@/store/bookSlice'

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { books, loading } = useAppSelector((state: RootState) => state.book);
  const router = useRouter();

const loggedInUser: any = authUser();
  useEffect(() => {
    if (!loggedInUser?.user) {
      router.push("/admin/login");
    }
    dispatch(getUserUploadedBooks());
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Dashboard</h1>
      <p className="text-gray-600">
        Here’s a quick overview of your activity and shortcuts to key actions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <UploadCloud className="w-5 h-5" />
              Upload Books
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">
              Add books to your library and improve your recommendations.
            </p>
            <Link href="/books/upload">
              <Button variant="primary">Upload Book</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recently Uploaded Books</h2>
        <p className="text-gray-500 text-sm">This section will list your most recent uploads.</p>
        {/* TODO: Replace with real book data */}
        <div className="mt-4">
          {loading ? (
            <LoadingSpinner />
          ) : books.length === 0 ? (
            <p className="text-sm text-gray-400 italic">You haven't uploaded any books yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {books.map((book: Book) => (
                <Link key={book._id} href={`/books/${book._id}`}>
                  <BookCard key={book._id} book={book} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
