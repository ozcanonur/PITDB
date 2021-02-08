import { IAllTranscript } from 'db/models/allTranscript';
import { IDGE } from 'db/models/dge';

export interface DGEFilters {
  symbol: string;
  maxPValue: number;
  minAbsFoldChange: number;
}

export interface DGEsWithTranscript extends IDGE {
  transcripts: IAllTranscript[];
}
