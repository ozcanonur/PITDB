import { Schema, model } from 'mongoose';

const SplicingPsiSchema = new Schema({
  event: String,
  'Nsi/1': Number,
  'Nsi/2': Number,
  'Nsi/3': Number,
  'si/1': Number,
  'si/2': Number,
  'si/3': Number,
  project: String,
});

export const SplicingPsi = model('SplicingPsi', SplicingPsiSchema);
