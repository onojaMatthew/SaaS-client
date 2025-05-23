import { Book } from './book'

export interface Recommendation {
  score: number
  reason: string
  book: Book
}
