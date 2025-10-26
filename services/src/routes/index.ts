import { Router } from 'express';
import Paths from '@src/common/constants/Paths';
import userRouter from './user.router';
import sessionRouter from './session.router';
import { authenticateToken } from './middlewares/auth.middleware';

const apiRouter = Router();
// apiRouter.use(authenticateToken);
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Session.Base, sessionRouter);

export default apiRouter;
