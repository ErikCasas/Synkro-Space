import { WorkStation } from '@prisma/client';

export interface IStationService {
    findAllWorkStations(): Promise<WorkStation[]>
}