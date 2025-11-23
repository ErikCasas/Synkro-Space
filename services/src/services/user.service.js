"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    getAllUsers() {
        return this.userRepo.findByAll();
    }
}
exports.UserService = UserService;
