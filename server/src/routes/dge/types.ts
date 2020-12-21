import { Request } from 'express';

export interface ExtendedRequest extends Request {
  query: { [key: string]: string | undefined };
}

export interface DGEFilters {
  maxPValue: number;
  minAbsFoldChange: number;
  // hasPeptideEvidence: [string?, string?];
}
