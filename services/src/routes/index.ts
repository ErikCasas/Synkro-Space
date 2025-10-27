import { Router } from 'express';
import Paths from '@src/common/constants/Paths';
import userRouter from './user.router';
import sessionRouter from './session.router';
import { authenticateToken } from './middlewares/auth.middleware';
import authRouter from './auth.router';
import roomRouter from './room.router';

const apiRouter = Router();

apiRouter.use(Paths.Auth.Base, authRouter);

apiRouter.use(authenticateToken);

apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Session.Base, sessionRouter);
apiRouter.use(Paths.Rooms.Base, roomRouter);

export default apiRouter;
