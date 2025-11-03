import { Entity, EntityType } from '@prisma/client';
import { IEntityRepository } from './interfaces/IEntityrepository';
import { prisma } from '@src/lib/prisma';

export class EntityRepository implements IEntityRepository {

    async findById(entityId: Entity['id']): Promise<(Entity & { entityType: EntityType }) | null> {
        return await prisma.entity.findUnique({
            where: { id: entityId },
            include: { entityType: true },
        });
    }
}