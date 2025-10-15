import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IReq, IRes } from '../common/types';
import { AppContainer } from '@src/app/container';


export class UserController {
    private readonly userService = AppContainer.userService;

    public getAllUsers = async (_: IReq, res: IRes) => {
        const users = await this.userService.getAllUsers();
        res.status(HttpStatusCodes.OK).json(users);
    };
}