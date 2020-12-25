export type TranscriptsData = {
  transcripts: {
    transcriptId: string;
    exons?: { start: number; end: number }[];
  }[];
  minimumPosition: number;
  maximumPosition: number;
};
