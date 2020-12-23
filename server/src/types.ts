import { Request } from 'express';

export interface ExtendedRequest extends Request {
  query: { [key: string]: string | undefined };
}
