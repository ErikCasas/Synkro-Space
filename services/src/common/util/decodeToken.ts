import jwt from 'jsonwebtoken';
import ENV from '../constants/ENV';

export interface DecodedToken {
    id: string;
    email: string;
    role: string;
}

export const decodeToken = (token: string): DecodedToken | null => {
    try {
        const decoded = jwt.verify(token, ENV.jwtSecret) as DecodedToken;
        return decoded;
    } catch (error) {
        return null;
    }
};