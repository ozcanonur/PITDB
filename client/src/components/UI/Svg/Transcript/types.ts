export interface TranscriptViewerRailProps {
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
