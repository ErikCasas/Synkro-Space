import { User } from '@/models'
import { HttpClient } from './httpClient'
import { UserResponse } from './responsesModels/userResponse.mode'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1"

export const userClient = () => {

    const client = new HttpClient(API_URL)

    return {
        getAllUsers: async (): Promise<User[]> => {
            const response = await client.get<UserResponse[]>("/users")
            const users: User[] = response.map((item) => ({
                ...item,
                role: item.role.name
            }))

            return users
        },

    }
}
