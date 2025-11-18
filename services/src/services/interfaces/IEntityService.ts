import { Entity } from '@prisma/client';

export interface IEntityService {
    findAllEntities(): Promise<Entity[]>
}