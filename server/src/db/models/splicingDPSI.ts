import { Schema, model, Document, Model } from 'mongoose';

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

export interface ISplicingDPSI extends Document {
  geneName: string;
  event: string;
  deltaPsi: number;
  pval: number;
  eventType: string;
  pepEvidence: boolean;
  comparison: string;
}

export const SplicingDPSI: Model<ISplicingDPSI> = model<ISplicingDPSI>(
  'SplicingDPSI',
  SplicingDPSISchema,
  'SplicingDPSI'
);
