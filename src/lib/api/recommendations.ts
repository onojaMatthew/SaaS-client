import { Recommendation } from "../../types/recommendation"
import { API_BASE_URL } from "@/config/constant"
import { authUser } from '../utils'

 const user = authUser();

const token = user?.token;

export const getRecommendations = async (userId: string): Promise<Recommendation[]> => {
  const res = await fetch(`${API_BASE_URL}/recommendations`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`
    }
  })
  if (!res.ok) throw new Error('Failed to fetch recommendations')
  return res.json()
}
