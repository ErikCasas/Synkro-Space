import { Entity } from '@prisma/client';
import { IEntityService } from './interfaces/IEntityService';
import { IEntityRepository } from '@src/repositories/interfaces/IEntityrepository';

export class EntityService implements IEntityService {
    constructor(private readonly entityRepository: IEntityRepository) { }

    async findAllEntities(): Promise<Entity[]> {
        return await this.entityRepository.findAll()
    }
}