import { ISplicingDPSI } from 'db/models/splicingDPSI';
import { ISplicingPsi } from 'db/models/splicingPsi';

export interface SplicingEventsFilters {
  maxPValue: number;
  hasPeptideEvidence: [string?, string?];
  strand: [string?, string?];
}

export interface SplicingDPSIWithConditions extends ISplicingDPSI {
  conditions: ISplicingPsi[];
}
