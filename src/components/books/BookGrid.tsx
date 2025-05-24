import { Book } from '@/types/book'
import BookCard from './BookCard'
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/types/storeTypes';
import { logInteraction } from '@/store/recommendationSlice';

type Props = {
  books: Book[]
}

export default function BookGrid({ books }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleClick = (id: any) => {
    const data = {
      contentId: id, interactionType: "click",
    }
    dispatch(logInteraction(data));
    router.push(`/books/${id}`);
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book) => (
        <div 
          key={book._id} 
          onClick={() => handleClick(book._id)} 
          className="hover:cursor-pointer"
        >
          <BookCard key={book._id} book={book} />
        </div>
      ))}
    </div>
  )
}
