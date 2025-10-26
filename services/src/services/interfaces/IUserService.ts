import { User } from '@models/common/user.model'

export interface IUserService {
    getAllUsers(): Promise<User[]>
}