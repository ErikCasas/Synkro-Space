import { AppContainer } from '@src/app/container';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { Request, Response } from 'express';
import { LoginRequestBody } from '../common/types/loginRequest';

export class EntityController {
    private readonly entityService = AppContainer.entityService;

    public findAllEntites = async (_req: Request<unknown, unknown, LoginRequestBody>, res: Response) => {
        const entities = await this.entityService.findAllEntities()
        res.json(entities).send()
    };
}