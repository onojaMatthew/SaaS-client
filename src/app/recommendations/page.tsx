'use client'

import { useEffect, useState } from 'react'
import { getRecommendations } from '@/lib/api/recommendations'
import { Recommendation } from '@/types/recommendation'
import RecommendationList from '@/components/recommendations/RecommendationList'
import RecommendationFilters from '@/components/recommendations/RecommendationFilters'
import { useAuth } from '@/hooks/use-auth'
import { authUser } from '@/lib/utils'

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const isLoggedIn = authUser()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await getRecommendations(isLoggedIn?.user?.id || '')
        setRecommendations(data?.data);
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (isLoggedIn) fetchData()
  }, []);

  const filtered = recommendations.filter((rec) =>
    filter === 'all' ? true : rec.reason.toLowerCase().includes(filter)
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Book Recommendations</h1>
      {/* <RecommendationFilters filter={filter} setFilter={setFilter} /> */}
      {loading ? <p>Loading...</p> : <RecommendationList recommendations={filtered} />}
    </div>
  )
}
