import { IAuthRepository } from '@src/repositories/interfaces/IAuthRepository';
import { IAuthService } from './interfaces/IAuthService';
import { RouteError } from '@src/common/util/route-errors';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService implements IAuthService {
    constructor(private readonly authRepository: IAuthRepository) { }

    async login(email: string, password: string): Promise<{ token: string; }> {

        const user = await this.authRepository.findUserByEmail(email);
        if (!user) {
            throw new RouteError(HttpStatusCodes.UNAUTHORIZED, 'Invalid email or password');
        }

        const [credential] = user.Credential;
        if (!credential) {
            throw new RouteError(HttpStatusCodes.UNAUTHORIZED, 'User has no credentials');
        }

        const isValid = await bcrypt.compare(password, credential.passwordHash);
        if (!isValid) {
            throw new RouteError(HttpStatusCodes.UNAUTHORIZED, 'Invalid email or password');
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role.name,
            },
            "Tefis",
            { expiresIn: '1d' }
        );

        return { token };
    }
}