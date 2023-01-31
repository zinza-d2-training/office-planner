// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';
import { User } from '@entities/entities/User';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
