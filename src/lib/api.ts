import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const signup = async (userData: Record<string, any>) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData)
  return response.data
}

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password })
  return response.data
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('realName')
}

export const getSessions = async () => {
  const response = await axios.get(`${API_BASE_URL}/sessions`, { headers: getAuthHeaders() })
  return response.data
}

export const createSession = async (sessionData: Record<string, any>) => {
  const response = await axios.post(`${API_BASE_URL}/sessions`, sessionData, { headers: getAuthHeaders() })
  return response.data
}

export const getSession = async (sessionId: string) => {
  const response = await axios.get(`${API_BASE_URL}/sessions/${sessionId}`, { headers: getAuthHeaders() })
  return response.data
}

export const getMessages = async (sessionId: string) => {
  const response = await axios.get(`${API_BASE_URL}/messages/${sessionId}`, { headers: getAuthHeaders() })
  return response.data
}

export const sendMessage = async (sessionId: string, content: string) => {
  const response = await axios.post(`${API_BASE_URL}/messages`, { sessionId, content }, { headers: getAuthHeaders() })
  return response.data
}

export const getProfile = async () => {
  const response = await axios.get(`${API_BASE_URL}/auth/profile`, { headers: getAuthHeaders() })
  return response.data
}

export const changePassword = async (oldPassword: string, newPassword: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/change-password`,
    { oldPassword, newPassword },
    { headers: getAuthHeaders() }
  )
  return response.data
} 