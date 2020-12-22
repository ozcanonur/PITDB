import { Request } from 'express';

export interface ExtendedRequest extends Request {
  query: { [key: string]: string | undefined };
}

export interface MutationFilters {
  type: [string?, string?, string?];
  inCDS: [string?, string?];
  hasPeptideEvidence: [string?, string?];
  sortedOn?: {
    field: string;
    order?: 1 | -1;
  };
}
