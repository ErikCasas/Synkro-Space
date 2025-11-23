"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityService = void 0;
class EntityService {
    constructor(entityRepository) {
        this.entityRepository = entityRepository;
    }
    async findAllEntities() {
        return await this.entityRepository.findAll();
    }
}
exports.EntityService = EntityService;
