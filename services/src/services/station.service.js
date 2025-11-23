"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationService = void 0;
class StationService {
    constructor(stationRepo) {
        this.stationRepo = stationRepo;
    }
    findAllWorkStations() {
        return this.stationRepo.findAll();
    }
}
exports.StationService = StationService;
