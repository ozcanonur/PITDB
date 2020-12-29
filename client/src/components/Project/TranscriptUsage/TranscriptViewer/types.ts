export type TranscriptsData = {
  transcripts: {
    transcriptId: string;
    exons?: { start: number; end: number }[];
  }[];
  minimumPosition: number;
  maximumPosition: number;
};

export interface TranscriptSvgProps {
  transcriptData: {
    transcript: {
      transcriptId: string;
      exons?: { start: number; end: number }[];
    };
    minimumPosition: number;
    maximumPosition: number;
  };
  color: string;
}
