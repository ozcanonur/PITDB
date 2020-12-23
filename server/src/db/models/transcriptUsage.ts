import { Schema, model, Document, Model } from 'mongoose';

const TranscriptUsageSchema = new Schema({
  geneName: String,
  transcript: String,
  project: String,
  psi: Object,
});

export interface ITranscriptUsage extends Document {
  geneName: string;
  transcript: string;
  project: string;
  psi: {
    [condition: string]: number;
  };
}

export const TranscriptUsage: Model<ITranscriptUsage> = model<ITranscriptUsage>(
  'TranscriptUsage',
  TranscriptUsageSchema,
  'transcriptUsage'
);
