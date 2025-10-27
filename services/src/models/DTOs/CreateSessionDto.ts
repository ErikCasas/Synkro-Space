export interface CreateSessionDto {
  title: string;
  startAt: string;
  endAt: string;
  entityId?: string;
  invitedUserIds?: string[];
  ownerId: string;
}