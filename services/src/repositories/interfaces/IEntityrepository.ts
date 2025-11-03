import { Entity, EntityType } from '@prisma/client';

export interface IEntityRepository {
    findById(entity: Entity['id']): Promise<(Entity & { entityType: EntityType }) | null>
}