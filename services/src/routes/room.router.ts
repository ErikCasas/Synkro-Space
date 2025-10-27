import Paths from '@src/common/constants/Paths';
import { Router } from 'express';
import { RoomController } from './controllers/room.controller';

const { findAllRooms } = new RoomController();
const roomRouter = Router();

roomRouter.get("/", findAllRooms)

export default roomRouter;