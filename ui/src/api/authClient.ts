import { HttpClient } from "./httpClient"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1"

export const createAuthClient = () => {

  const client = new HttpClient(API_URL)

  return {
    login: async (email: string, password: string): Promise<{ token: string }> => {
      const response = await client.post<{ token: string }>("/auth", { email, password })
      return response
    },
  }
}
