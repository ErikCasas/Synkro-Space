import { Prisma, Session } from '@prisma/client';
import { User } from '@models/common/user.model'
export interface ISessionRepository {
    create(session: Prisma.SessionCreateInput, userOwnerId: User['id'], participantIds: Array<User['id']>): Promise<Session>
    findById(sessionId: Session['id']): Promise<Session | null>
    delete(sessionId: Session['id']): Promise<void>
}