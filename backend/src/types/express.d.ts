import { JwtPayload } from '../../../shared/types/user.types';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}