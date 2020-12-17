import { Schema, model, Document, Model } from 'mongoose';

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

interface IMutation extends Document {
  ref: string;
  silent: boolean;
  gene: string;
  refPos: number;
  inCDS: boolean;
  alt: string;
  hasPeptideEvidence: boolean;
  transcriptsPos: any;
  chr: string;
  project: string;
  conditions: {
    Nsi: {
      '1': {
        AF: number;
        qual: number;
      };
      '2': {
        AF: number;
        qual: number;
      };
      '3': {
        AF: number;
        qual: number;
      };
    };
    si: {
      '1': {
        AF: number;
        qual: number;
      };
      '2': {
        AF: number;
        qual: number;
      };
      '3': {
        AF: number;
        qual: number;
      };
    };
  };
}

export const Mutation: Model<IMutation> = model<IMutation>('Mutation', MutationSchema);
