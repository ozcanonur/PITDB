import { IAllTranscript } from 'db/models/allTranscript';
import { ITranscriptUsageDPSI } from 'db/models/transcriptUsageDPSI';

export interface TranscriptUsageFilters {
  maxPValue: number;
}

export interface TranscriptUsagesWithTranscript extends ITranscriptUsageDPSI {
  transcripts: IAllTranscript[];
}

export interface ConditionsByGeneName {
  [transcript: string]: {
    [conditionName: string]: number[];
  };
}
