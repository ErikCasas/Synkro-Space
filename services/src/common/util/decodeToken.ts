import jwt from 'jsonwebtoken';

export interface DecodedToken {
    id: string;
    email: string;
    role: string;
}

export const decodeToken = (token: string): DecodedToken | null => {
    try {
        const decoded = jwt.verify(token, "Tefis") as DecodedToken;
        return decoded;
    } catch (error) {
        return null;
    }
};