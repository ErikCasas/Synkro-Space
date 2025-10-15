import { User } from '@prisma/client';
import { prisma } from '@src/lib/prisma';
import { IUserRepository } from './interfaces/IUserRepository';
import { UserInput } from '@src/models/common/user.model';

export class UserRepository implements IUserRepository {

    public create(userInput: UserInput): Promise<User> {
        throw new Error('Method not implemented.');
    }

    public findById(userId: User['id']): Promise<User | null> {
        throw new Error('Method not implemented.');
    }

    public async findByAll(): Promise<User[]> {
        return await prisma.user.findMany();
    }
}


