import { WorkStation } from '@prisma/client';
import { IStationService } from './interfaces/IStationService';
import { IStationRepository } from '@src/repositories/interfaces/IStationRepository';

export class StationService implements IStationService {
    constructor(private readonly stationRepo: IStationRepository) { }
    findAllWorkStations(): Promise<WorkStation[]> {
        return this.stationRepo.findAll();
    }
}