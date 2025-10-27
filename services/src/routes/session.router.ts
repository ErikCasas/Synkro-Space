import { Router } from 'express';
import { SessionController } from './controllers/session.controller';
import Paths from '@src/common/constants/Paths';

const { findUserSessions, findSessionById, deleteSession } = new SessionController();

const sessionRouter = Router();

sessionRouter.get(Paths.Session.Me, findUserSessions);
sessionRouter.get(Paths.Session.SessionId, findSessionById);
sessionRouter.delete(Paths.Session.SessionId, deleteSession);

export default sessionRouter;