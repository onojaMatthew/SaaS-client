
export default function RecommendationCard({ recommendation }: any) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <img src={recommendation?.url} alt={recommendation.title} className="w-20 h-28 object-cover rounded" />
        <div>
          <h2 className="text-lg font-bold">{recommendation.title}</h2>
          <p className="text-sm text-gray-600">{recommendation.author}</p>
          <p className="text-xs text-gray-500 mt-1">{recommendation.description}</p>
          <p className="text-sm mt-2 text-gray-700 italic">Average rating: {recommendation.averageRating}</p>
        </div>
      </div>
    </div>
  )
}
