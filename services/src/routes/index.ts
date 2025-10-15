import { Router } from 'express';
import Paths from '@src/common/constants/Paths';
import userRouter from './user.router';

const apiRouter = Router();

apiRouter.use(Paths.Users.Base, userRouter);

export default apiRouter;
