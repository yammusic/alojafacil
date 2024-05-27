import type { Review } from '@/domain/db/features/Review/model'

export const calculateAverageRating = (reviews: Review[], defaultRating: number = 0): number => {
  if (reviews.length === 0) {
    return defaultRating
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0)
  const average = total / reviews.length

  const av = (average > 5 ? average / 2 : average)
  const roundedAverage = Math.round(av * 2) / 2
  return roundedAverage
  // return Math.min(Math.max(roundedAverage, 0), 5)
}
