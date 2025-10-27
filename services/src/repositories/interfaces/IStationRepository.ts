import { WorkStation } from '@prisma/client';

export interface IStationRepository {
    findAll(): Promise<WorkStation[]>
}