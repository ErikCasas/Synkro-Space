import { UserInput, User } from '@src/models/common/user.model';

export interface IUserRepository {
    create(userInput: UserInput): Promise<User>;
    findById(userId: User['id']): Promise<User | null>;
    findByAll(): Promise<User[]>;
}