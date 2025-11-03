import HttpStatusCodes from '@common/constants/HttpStatusCodes';
import { RouteError } from '@common/util/route-errors';
import { JwtPayload } from '@models/common/types/jwt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ENV from '@src/common/constants/ENV';

export function authenticateToken(req: Request, _: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        throw new RouteError(HttpStatusCodes.UNAUTHORIZED, 'Token required');

    } try {
        const secret = ENV.jwtSecret;
        const decoded = jwt.verify(token, secret) as JwtPayload;
        req.user = decoded as JwtPayload;

        next();
    } catch {
        throw new RouteError(HttpStatusCodes.UNAUTHORIZED, 'Invalid or expired token');
    }
}

