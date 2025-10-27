import { AppContainer } from '@src/app/container';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { Request, Response } from 'express';

export class RoomController {
    private readonly roomService = AppContainer.roomService;
    public findAllRooms = async (_: Request, res: Response) => {
        console.log(_.user)
        const rooms = await this.roomService.findAllRooms();
        res.status(HttpStatusCodes.OK).json(rooms);
    }
}