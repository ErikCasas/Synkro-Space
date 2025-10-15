import { UserRepository } from '@src/repositories/user.repository';
import { UserService } from '@src/services/UserService';

export class AppContainer {
    private static _userRepository: UserRepository;
    private static _userService: UserService;

    static get userRepository(): UserRepository {
        if (!this._userRepository) {
            this._userRepository = new UserRepository();
        }
        return this._userRepository;
    }

    static get userService(): UserService {
        if (!this._userService) {
            this._userService = new UserService(this.userRepository);
        }
        return this._userService;
    }
}