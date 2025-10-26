import { User } from '@models/common/user.model';
import { IUserRepository } from '@src/repositories/interfaces/IUserRepository';
import { IUserService } from './interfaces/IUserService';


export class UserService implements IUserService {
    public constructor(private readonly userRepo: IUserRepository) { }

    public getAllUsers(): Promise<User[]> {
        return this.userRepo.findByAll();
    }

}
