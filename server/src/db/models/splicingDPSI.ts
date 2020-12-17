import { Schema, model } from 'mongoose';

const SplicingDPSISchema = new Schema({
  geneName: String,
  event: String,
  deltaPsi: Number,
  pval: Number,
  eventType: String,
  pepEvidence: Boolean,
  project: String,
  comparison: String,
});

export const SplicingDPSI = model('SplicingDPSI', SplicingDPSISchema);
