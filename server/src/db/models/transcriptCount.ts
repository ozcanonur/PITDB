import { Schema, model } from 'mongoose';

const TranscriptCountSchema = new Schema({
  transcript: String,
  project: String,
  readCounts: {
    'Nsi/1': Number,
    'Nsi/2': Number,
    'Nsi/3': Number,
    'si/1': Number,
    'si/2': Number,
    'si/3': Number,
  },
});

export const TranscriptCount = model('TranscriptCount', TranscriptCountSchema);
