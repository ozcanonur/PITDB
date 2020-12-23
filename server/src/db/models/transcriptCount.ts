import { Schema, model, Model, Document } from 'mongoose';

const TranscriptCountSchema = new Schema({
  transcript: String,
  project: String,
  readCounts: Object,
});

export interface ITranscriptCount extends Document {
  transcript: string;
  project: string;
  readCounts: {
    [condition: string]: number;
  };
}

export const TranscriptCount: Model<ITranscriptCount> = model<ITranscriptCount>(
  'TranscriptCount',
  TranscriptCountSchema,
  'transcriptCounts'
);
