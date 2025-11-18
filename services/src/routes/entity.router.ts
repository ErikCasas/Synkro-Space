import { Router } from 'express';
import { EntityController } from './controllers/entity.contoller';

const { findAllEntites } = new EntityController();
const entityRouter = Router();

entityRouter.get("/", findAllEntites)

export default entityRouter;