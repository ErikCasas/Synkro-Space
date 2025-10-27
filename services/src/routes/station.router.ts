import { Router } from 'express';
import { StationController } from './controllers/station.controller';


const { findAllWorkStations } = new StationController();
const stationRouter = Router();

stationRouter.get("/", findAllWorkStations)

export default stationRouter;