"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const route_errors_1 = require("@src/common/util/route-errors");
const HttpStatusCodes_1 = __importDefault(require("@src/common/constants/HttpStatusCodes"));
class SessionService {
    constructor(sessionRepo, entityRepo) {
        this.sessionRepo = sessionRepo;
        this.entityRepo = entityRepo;
    }
    async checkIn(entityId, userId) {
        const entity = await this.entityRepo.findById(entityId);
        if (!entity) {
            throw new route_errors_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, `Entity with id: ${entityId} not found`);
        }
        const entityType = entity.entityType.type;
        const linkedId = entity.meetingRoomId ?? entity.workStationId;
        if (!linkedId) {
            throw new route_errors_1.RouteError(HttpStatusCodes_1.default.BAD_REQUEST, `Entity ${entity.name} has no linked ${entityType}`);
        }
        const now = new Date();
        const session = await this.sessionRepo.findActiveSessionByEntity(entity.id, now);
        if (!session) {
            throw new route_errors_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, `No active session found for ${entityType} ${entity.name}`);
        }
        const minAcceptableCheckIn = session.startAt.getTime() - 5 * 60 * 1000;
        const maxAcceptableCheckIn = session.endAt.getTime() - 15 * 60 * 1000;
        if (now.getTime() < minAcceptableCheckIn) {
            throw new route_errors_1.RouteError(HttpStatusCodes_1.default.CONFLICT, 'Check-in too early.');
        }
        if (now.getTime() > maxAcceptableCheckIn) {
            throw new route_errors_1.RouteError(HttpStatusCodes_1.default.CONFLICT, 'Check-in too late.');
        }
        const isParticipant = session.SessionParticipant.some(p => p.userId === userId);
        if (!isParticipant) {
            throw new route_errors_1.RouteError(HttpStatusCodes_1.default.FORBIDDEN, 'User is not a participant of this session');
        }
        await this.sessionRepo.confirmUserAttendance(session.id, userId);
    }
    async findUserSessions(userId) {
        return this.sessionRepo.findAllUserSessions(userId);
    }
    async findSessionsById(sessionId) {
        const session = await this.sessionRepo.findById(sessionId);
        if (!session)
            throw new route_errors_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, `Session with id: ${sessionId.toString()} was not found`);
        return session;
    }
    async deleteSession(sessionId) {
        await this.sessionRepo.delete(sessionId);
    }
    async createSession(dto, ownerId) {
        const { startAt, endAt } = dto;
        const startInTime = new Date(startAt);
        const endInTime = new Date(endAt);
        this.validateSessionTime(startInTime, endInTime);
        return this.sessionRepo.createFromDto(dto, ownerId);
    }
    validateSessionTime(start, end) {
        const nowUtc = new Date(Date.now());
        const minStart = nowUtc.getTime() + 15 * 60 * 1000;
        if (start.getTime() < minStart) {
            throw new route_errors_1.RouteError(HttpStatusCodes_1.default.CONFLICT, 'The session must start at least 15 minutes after the current time.');
        }
        if (start.getTime() >= end.getTime())
            throw new route_errors_1.RouteError(HttpStatusCodes_1.default.CONFLICT, 'The start time must be less than the end time.');
        const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        if (duration > 8)
            throw new route_errors_1.RouteError(HttpStatusCodes_1.default.CONFLICT, 'The session cannot last more than 8 hours');
    }
}
exports.SessionService = SessionService;
