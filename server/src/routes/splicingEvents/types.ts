import { IAllTranscript } from 'db/models/allTranscript';
import { ISplicingDPSI } from 'db/models/splicingDPSI';
import { ISplicingPsi } from 'db/models/splicingPsi';

export type SplicingEventsFilters = {
  gene: string;
  maxPValue: number;
  hasPeptideEvidence: [string?, string?];
  strand: [string?, string?];
};

export interface SplicingDPSIWithConditions extends ISplicingDPSI {
  conditions: ISplicingPsi[];
}

export interface SplicingDPSIWithtranscripts extends ISplicingDPSI {
  transcripts: IAllTranscript[];
}
