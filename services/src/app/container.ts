import { SessionRepository } from '@src/repositories/session.respository';
import { UserRepository } from '@src/repositories/user.repository';
import { SessionService } from '@src/services/session.service';
import { UserService } from '@src/services/user.service';

export class AppContainer {
    public static userService: UserService = new UserService(new UserRepository())
    public static sessionService: SessionService = new SessionService(new SessionRepository())
}