import { AppContainer } from '@src/app/container';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { Request, Response } from 'express';

export class StationController {
    private readonly stationService = AppContainer.stationService;

    public findAllWorkStations = async (req: Request, res: Response) => {
        const workStations = await this.stationService.findAllWorkStations();
        res.status(HttpStatusCodes.ACCEPTED).json(workStations);
    }
}