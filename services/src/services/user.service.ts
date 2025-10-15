import { User } from '@models/common/user.model';
import { IUserRepository } from '@src/repositories/interfaces/IUserRepository';
import { IUserSevice } from './interfaces/IUserService';


export class UserService implements IUserSevice {
    public constructor(private readonly userRepo: IUserRepository) { }

    public getAllUsers(): Promise<User[]> {
        return this.userRepo.findByAll();
    }

}
