import { Schema, model, Document, Model } from 'mongoose';

const TranscriptUsageDPSISchema = new Schema({
  geneName: String,
  transcript: String,
  deltaPsi: Number,
  pval: Number,
  project: String,
  comparison: String,
});

export interface ITranscriptUsageDPSI extends Document {
  geneName: string;
  transcript: string;
  deltaPsi: string;
  pval: number;
  project: string;
  comparison: string;
}

export const TranscriptUsageDPSI: Model<ITranscriptUsageDPSI> = model<ITranscriptUsageDPSI>(
  'TranscriptUsageDPSI',
  TranscriptUsageDPSISchema,
  'transcriptUsageDPSI'
);
