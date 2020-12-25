export type TranscriptReadCounts = {
  transcriptId: string;
  conditions: {
    condition: string;
    [sample: string]: number | string;
  }[];
}[];
