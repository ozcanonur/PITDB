import { Schema, model } from 'mongoose';

const TranscriptUsageSchema = new Schema({
  geneName: String,
  transcript: String,
  project: String,
  psi: {
    Nsi_1: Number,
    Nsi_2: Number,
    Nsi_3: Number,
    si_1: Number,
    si_2: Number,
    si_3: Number,
  },
});

export const TranscriptUsage = model('TranscriptUsage', TranscriptUsageSchema);
