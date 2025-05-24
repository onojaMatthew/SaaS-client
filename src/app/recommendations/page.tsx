'use client'

import { useEffect } from 'react'
import RecommendationList from '@/components/recommendations/RecommendationList'
import { authUser } from '@/lib/utils'
import { RootState, useAppDispatch, useAppSelector } from '@/types/storeTypes'
import { getRecommendations } from '@/store/recommendationSlice'

export default function RecommendationsPage() {
  const dispatch = useAppDispatch();
  const { recommendations, loading } = useAppSelector((state: RootState) => state.recommendation)
  const isLoggedIn = authUser()

  useEffect(() => {
    dispatch(getRecommendations(isLoggedIn?.user?.id));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Book Recommendations</h1>
      {loading ? <p>Loading...</p> : <RecommendationList recommendations={recommendations} />}
      {recommendations.length === 0 && <p className='py-2 font-18'>No records found</p>}
    </div>
  )
}
