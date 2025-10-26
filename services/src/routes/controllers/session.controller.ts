import { AppContainer } from '@src/app/container';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { Request, Response } from 'express';

export class SessionController {
    private readonly sessionService = AppContainer.sessionService;

    public findUserSessions = async (req: Request, res: Response) => {
        const { id } = req.user
        const userSessions = await this.sessionService.findUserSessions(id);
        res.status(HttpStatusCodes.OK).json(userSessions);
    };
}