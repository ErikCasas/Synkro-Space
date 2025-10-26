import { Router } from 'express';
import { AuthController } from './controllers/auth.controller';

const authRouter = Router();

const { login } = new AuthController()

authRouter.post('/', login)


export default authRouter;