import { AppContainer } from '@src/app/container';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { Request, Response } from 'express';
import { LoginRequestBody } from '../common/types/loginRequest';

export class AuthController {
    private readonly authService = AppContainer.authService;

    public login = async (req: Request<unknown, unknown, LoginRequestBody>, res: Response) => {
        const { email, password } = req.body
        const token = await this.authService.login(email, password);
        res.status(HttpStatusCodes.OK).json(token);
    };
}