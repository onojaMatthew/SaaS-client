import Link from 'next/link'
import RecommendationCard from './RecommendationCard'
import { Recommendation } from '@/types/recommendation'
import { Book } from '@/types/book'

type Props = {
  recommendations: Recommendation[]
}

export default function RecommendationList({ recommendations }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {recommendations.map((rec: any, i: number) => (
        <Link href={`/books/${rec._id}`}>
          <RecommendationCard key={i} recommendation={rec} />
        </Link>
      ))}
    </div>
  )
}
