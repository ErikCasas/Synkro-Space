import { AuthRepository } from '@src/repositories/authRepository';
import { EntityRepository } from '@src/repositories/EntityRepository';
import { RoomRepository } from '@src/repositories/roomRepository';
import { SessionRepository } from '@src/repositories/session.respository';
import { StationRepository } from '@src/repositories/stationsRepository';
import { UserRepository } from '@src/repositories/user.repository';
import { AuthService } from '@src/services/auth.service';
import { IAuthService } from '@src/services/interfaces/IAuthService';
import { IRoomService } from '@src/services/interfaces/IRoomService';
import { ISessionService } from '@src/services/interfaces/ISessionService';
import { IStationService } from '@src/services/interfaces/IStationService';
import { RoomService } from '@src/services/room.service';
import { SessionService } from '@src/services/session.service';
import { StationService } from '@src/services/station.service';
import { UserService } from '@src/services/user.service';

export class AppContainer {
    public static userService: UserService = new UserService(new UserRepository())
    public static sessionService: ISessionService = new SessionService(new SessionRepository(), new EntityRepository())
    public static authService: IAuthService = new AuthService(new AuthRepository())
    public static roomService: IRoomService = new RoomService(new RoomRepository())
    public static stationService: IStationService = new StationService(new StationRepository())
}