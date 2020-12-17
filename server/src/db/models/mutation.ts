import { Schema, model } from 'mongoose';

const MutationSchema = new Schema({
  ref: String,
  silent: Boolean,
  gene: String,
  refPos: Number,
  inCDS: Boolean,
  alt: String,
  hasPeptideEvidence: Boolean,
  transcriptsPos: Object,
  chr: String,
  project: String,
  conditions: {
    Nsi: {
      '1': {
        AF: Number,
        qual: Number,
      },
      '2': {
        AF: Number,
        qual: Number,
      },
      '3': {
        AF: Number,
        qual: Number,
      },
    },
    si: {
      '1': {
        AF: Number,
        qual: Number,
      },
      '2': {
        AF: Number,
        qual: Number,
      },
      '3': {
        AF: Number,
        qual: Number,
      },
    },
  },
});

export const Mutation = model('Mutation', MutationSchema);
