import { Request } from 'express';

export interface ExtendedRequest extends Request {
  query: { [key: string]: string | undefined };
}

export interface SplicingEventsFilters {
  maxPValue: number;
  hasPeptideEvidence: [string?, string?];
}
