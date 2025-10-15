import { Router } from 'express';
import { UserController } from './controllers/user.controller';


const { getAllUsers } = new UserController();

const userRouter = Router();

userRouter.get('/', getAllUsers);

export default userRouter;