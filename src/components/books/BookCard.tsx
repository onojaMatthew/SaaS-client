import { Book } from '@/types/book'

type Props = {
  book: Book
}

export default function BookCard({ book }: Props) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={book.url || '/placeholder.jpg'}
        alt={book.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
        <p className="text-xs text-gray-500 mt-2">{book.category}</p>
      </div>
    </div>
  )
}
