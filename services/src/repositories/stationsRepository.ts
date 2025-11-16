import { WorkStation } from '@prisma/client';
import { IStationRepository } from './interfaces/IStationRepository';
import { prisma } from '@src/lib/prisma';

export class StationRepository implements IStationRepository {
    findAll(): Promise<WorkStation[]> {
        return prisma.workStation.findMany()
    }
}