export interface CreateSessionDto {
  title: string;
  startAt: Date;
  endAt: Date;
  entityId?: string;
  invitedUserIds?: string[];
  ownerId: string;
}