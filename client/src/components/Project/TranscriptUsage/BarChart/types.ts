export type TranscriptReadCountsResponse = {
  [sample: string]: string | number;
  condition: string;
}[];
