"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
class RoomService {
    constructor(roomRepo) {
        this.roomRepo = roomRepo;
    }
    async findAllRooms() {
        return await this.roomRepo.findAll();
    }
}
exports.RoomService = RoomService;
