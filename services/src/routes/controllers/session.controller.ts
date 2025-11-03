import { AppContainer } from '@src/app/container';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/util/route-errors';
import { CreateSessionDto } from '@src/models/DTOs';
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

    public createSession = async (req: Request<unknown, unknown, CreateSessionDto>, res: Response) => {
        const body = req.body
        const newSesion = await this.sessionService.createSession(body);
        res.status(HttpStatusCodes.CREATED).send(newSesion);
    };

    public checkIn = async (req: Request<unknown, { entityId: string }>, res: Response) => {
        const { user } = req
        const entityId = req.query.entityId

        if (!entityId)
            throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'entityId are required')

        await this.sessionService.checkIn(entityId.toString(), user.id)

        res.status(HttpStatusCodes.NO_CONTENT).send()
    }
}