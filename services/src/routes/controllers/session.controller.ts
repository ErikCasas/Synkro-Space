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

    public findSessionById = async (req: Request<{ sessionId: string }>, res: Response) => {

        const { sessionId } = req.params

        const userSessions = await this.sessionService.findSessionsById(sessionId);

        res.status(HttpStatusCodes.OK).json(userSessions);
    };

    public deleteSession = async (req: Request<{ sessionId: string }>, res: Response) => {

        const { sessionId } = req.params

        await this.sessionService.deleteSession(sessionId);

        res.status(HttpStatusCodes.NO_CONTENT).end();
    };
}