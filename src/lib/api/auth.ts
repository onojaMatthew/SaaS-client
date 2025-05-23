import { API_BASE_URL } from '@/config/constant';
import { jwtDecode } from 'jwt-decode'
import { User } from '@/types/user';

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  let res: any = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error('Invalid login credentials');
  res = await res.json();
  const tokenData = {
    user: res?.data?.user,
    token: res?.data?.token,
    business: res?.data?.business
  }
  localStorage.setItem("token", JSON.stringify(tokenData));
  return res
}

export const loginReader = async ({ email, password }: { email: string; password: string }) => {
  let res: any = await fetch(`${API_BASE_URL}/auth/reader/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error('Invalid login credentials');
  res = await res.json();
  const tokenData = {
    user: res?.data?.user,
    token: res?.data?.token
  }
  localStorage.setItem("token", JSON.stringify(tokenData));
  return res
}

export const registerUser = async ({ email, password }: { email: string; password: string }) => {
  let res: any = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error('Unable to register');
  res = await res.json()
  const tokenData = {
    user: res?.data?.user,
    token: res?.data?.token
  }
  localStorage.setItem("token", JSON.stringify(tokenData));
  return res;
}

export const registerBusiness = async (data: { name: string, role: string, businessName: string, email: string; password: string }) => {
  let res: any = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Unable to register');
  res = await res.json();
  const tokenData = {
    user: res?.data?.user,
    token: res?.data?.token,
    business: res?.data?.business
  }
  localStorage.setItem("token", JSON.stringify(tokenData));
  return res;
}

export const getUserFromToken = (token: string): User | null => {
  try {
    const decoded = jwtDecode<{ user: User }>(token)
    return decoded.user
  } catch {
    return null
  }
}
