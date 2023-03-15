export interface CountInterface {
  excellent: number
  good: number
  normal: number
  bad: number
  worst: number
}

export interface RatingFindResponse {
  total: number
  rating: number
  count: CountInterface
}
