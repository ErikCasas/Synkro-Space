import { User } from '@models/common/user.model';
import { IUserRepository } from '@src/repositories/interfaces/IUserRepository';


export class UserService {
    public constructor(private readonly userRepo: IUserRepository) { }

    public getAllUsers(): Promise<User[]> {
        return this.userRepo.findByAll();
    }

}
