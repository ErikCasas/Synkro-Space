import { AuthRepository } from '@src/repositories/authRepository';
import { SessionRepository } from '@src/repositories/session.respository';
import { UserRepository } from '@src/repositories/user.repository';
import { AuthService } from '@src/services/auth.service';
import { IAuthService } from '@src/services/interfaces/IAuthService';
import { ISessionService } from '@src/services/interfaces/ISessionService';
import { SessionService } from '@src/services/session.service';
import { UserService } from '@src/services/user.service';

export class AppContainer {
    public static userService: UserService = new UserService(new UserRepository())
    public static sessionService: ISessionService = new SessionService(new SessionRepository())
    public static authService: IAuthService = new AuthService(new AuthRepository())
}