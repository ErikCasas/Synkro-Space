import { HttpClient } from "./httpClient"

const API_URL = import.meta.env.VITE_API_URL || "http:localhost:3000/api/v1"

export const createAuthClient = (getToken: () => string | null) => {
  const client = new HttpClient(API_URL, getToken)

  return {
    login: async (email: string, password: string): Promise<{ token: string }> => {
      const response = await client.post("/auth/login", { email, password })
      return response.json()
    },

    getProfile: async () => {
      const response = await client.get("/auth/me")
      return response.json()
    },
  }
}
