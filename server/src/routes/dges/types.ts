import { IAllTranscript } from 'db/models/allTranscript';
import { IDGE } from 'db/models/dge';
import { IGenesPeptide } from 'db/models/genesPeptide';

export interface DGEFilters {
  symbol: string;
  maxPValue: number;
  minAbsFoldChange: number;
}

export interface DGEsWithTranscriptAndPeptides extends IDGE {
  transcripts: IAllTranscript[];
  peptides: IGenesPeptide[];
}
