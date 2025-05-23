
'use client'

import { Star } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface RatingStarsProps {
  rating: number 
  onRate?: (value: number) => void
  userRating?: number
  size?: number
  interactive?: boolean
}

export const RatingStars = ({
  rating,
  onRate,
  userRating,
  size = 20,
  interactive = true
}: RatingStarsProps) => {
  const [hovered, setHovered] = useState<number | null>(null)
  const [tempRating, setTempRating] = useState<number | null>(userRating || null)

  const handleClick = (value: number) => {
    if (interactive && onRate) {
      setTempRating(value)
      onRate(value)
    }
  }

  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 5 }, (_, index) => {
        const filled = hovered !== null ? index < hovered : index < (tempRating ?? rating)
        return (
          <Star
            key={index}
            size={size}
            className={cn(
              'cursor-pointer transition-colors',
              filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300',
              !interactive && 'cursor-default'
            )}
            onMouseEnter={() => interactive && setHovered(index + 1)}
            onMouseLeave={() => interactive && setHovered(null)}
            onClick={() => handleClick(index + 1)}
          />
        )
      })}
    </div>
  )
}
