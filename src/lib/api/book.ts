import { API_BASE_URL } from "@/config/constant"
import { Book } from "@/types/book"
import { authUser } from '../utils'

const user = authUser();
  const businessId = user?.business?._id;
  const token = user?.token;

export const getBookById = async (id: string): Promise<Book> => {
  const res = await fetch(`${API_BASE_URL}/contents/${id}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`
    }
  })
  if (!res.ok) throw new Error('Failed to fetch book')
  return res.json()
}

export const updateBook = async (id: string, data: Book): Promise<Book> => {
 
  const res = await fetch(`${API_BASE_URL}/contents/${id}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update book')
  return res.json()
}
