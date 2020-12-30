export type TranscriptReadCountsResponse = {
  transcriptId: string;
  conditions: {
    condition: string;
    [sample: string]: number | string;
  }[];
}[];
