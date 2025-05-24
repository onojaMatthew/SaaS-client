import { Book } from './book'

export interface Recommendation {
  contentId?: string;
  interactionType?: string;
  score?: number
  reason?: string
  book?: Book
}


export interface RecommendationResponse {
  success: boolean;
  message: string;
  data: any;
}