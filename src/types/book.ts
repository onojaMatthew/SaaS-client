export type Book = {
  _id: string
  title: string
  author: string
  description: string
  category: string
  url?: string
  uploadedAt: string
  uploaderId: string
  averageRating: number
  textContent: string
}

export type BookPayload = {
  id?: string;
  title: string
  author: string
  description: string
  category: string
  url?: string
  textContent: string
  businessId?: string
}

export type BookResponse = {
  success: boolean;
  data: {
    _id: string
    title: string
    author: string
    description: string
    category: string
    url?: string
    uploadedAt: string
    uploaderId: string
    averageRating: number
    textContent: string
    business: object
  };
  message: string;
}
