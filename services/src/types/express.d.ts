import { JwtPayload } from '@src/models/common/types/jwt';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}