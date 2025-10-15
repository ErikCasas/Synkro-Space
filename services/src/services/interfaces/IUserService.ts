import { User } from '@models/common/user.model'

export interface IUserSevice {
    getAllUsers(): Promise<User[]>
}