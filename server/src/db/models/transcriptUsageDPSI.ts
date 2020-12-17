import { Schema, model } from 'mongoose';

const TranscriptUsageDPSISchema = new Schema({
  geneName: String,
  transcript: String,
  deltaPsi: Number,
  pval: Number,
  project: String,
  comparison: String,
});

export const TranscriptUsageDPSI = model('TranscriptUsageDPSI', TranscriptUsageDPSISchema);
