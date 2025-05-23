import { Book } from '@/types/book'
import { API_BASE_URL } from '@/config/constant'
import { authUser } from '../utils'

 const user = authUser();
 console
  const businessId = user?.user?.businessId;
  const token = user?.token;

export const getBooks = async (): Promise<Book[]> => {
  const res = await fetch(`${API_BASE_URL}/contents`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`
    }
  })
  if (!res.ok) throw new Error('Failed to fetch books')
  return res.json()
}

export const uploadBook = async (data: any): Promise<Book> => {
  data["businessId"] = businessId;
  let res = await fetch(`${API_BASE_URL}/contents`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
    
  })
  if (!res.ok) throw new Error('Failed to upload book');
  
  // console.log(res.json())
  return res.json();
}

export const rateBook = async (bookId: string, rating: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contents/${bookId}/rate`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ rating }),
    })

    if (!response.ok) {
      throw new Error('Failed to submit rating')
    }
    console.log(response.json())
    // return response.json();
  } catch (error) {
    console.log(error)
  }
  
}

export async function getUserUploadedBooks(): Promise<Book[]> {
  const res = await fetch(`${API_BASE_URL}/contents?businessId=${businessId}`, { 
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      "authorization": `Bearer ${token}`
    },
  })
  if (!res.ok) throw new Error('Failed to fetch user books')
  return res.json();
}
