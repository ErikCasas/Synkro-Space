import { Router } from 'express';
import { SessionController } from './controllers/session.controller';
import Paths from '@src/common/constants/Paths';

const { findUserSessions } = new SessionController();

const sessionRouter = Router();

sessionRouter.get(Paths.Session.Me, findUserSessions);

export default sessionRouter;