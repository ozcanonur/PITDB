import { Schema, model } from 'mongoose';

const MutationSchema = new Schema({
  chr: String,
  refPos: Number,
  ref: String,
  alt: String,
  hasPeptideEvidence: Boolean,
  inCDS: Boolean,
  silent: Boolean,
  gene: String,
  conditions: {
    Nsi: {
      1: {
        AF: Number,
        qual: Number,
      },
      2: {
        AF: Number,
        qual: Number,
      },
      3: {
        AF: Number,
        qual: Number,
      },
    },
    si: {
      1: {
        AF: Number,
        qual: Number,
      },
      2: {
        AF: Number,
        qual: Number,
      },
      3: {
        AF: Number,
        qual: Number,
      },
    },
  },
  transcriptsPos: Object,
});

export const Mutation = model('Mutation', MutationSchema);
