export interface UserResponse {
    id: string
    name: string,
    roleId: number,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    role: {
        id: number,
        name: "Admin" | "User"
    }
}