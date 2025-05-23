import { Book } from '@/types/book'
import BookCard from './BookCard'
import Link from 'next/link'

type Props = {
  books: Book[]
}

export default function BookGrid({ books }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book) => (
        
        <Link key={book._id} href={`/books/${book._id}`} className="block">
          <BookCard key={book._id} book={book} />
        </Link>

      ))}
    </div>
  )
}
