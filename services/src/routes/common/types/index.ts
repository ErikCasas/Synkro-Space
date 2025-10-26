import { JwtPayload } from '@models/common/types/jwt';
import { Response, Request } from 'express';


/******************************************************************************
                                Types
******************************************************************************/

type TRecord = Record<string, unknown>;

export interface AuthenticatedRequest<
    P = TRecord,
    ResBody = unknown,
    ReqBody = TRecord,
    ReqQuery = TRecord
> extends Request<P, ResBody, ReqBody, ReqQuery> {
    user: JwtPayload;
}

export type IReq = Request<TRecord, void, TRecord, TRecord>;
export type IRes = Response<unknown, TRecord>;

