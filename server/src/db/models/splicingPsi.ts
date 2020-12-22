import { Schema, model, Document, Model } from 'mongoose';

const SplicingPsiSchema = new Schema({
  event: String,
  project: String,
});

export interface ISplicingPsi extends Document {
  event: string;
  project: string;
}

export const SplicingPsi: Model<ISplicingPsi> = model<ISplicingPsi>('SplicingPsi', SplicingPsiSchema, 'SplicingPsi');
