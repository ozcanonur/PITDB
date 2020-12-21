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
  conditions: Object,
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
  conditions: Object;
}

export const Mutation: Model<IMutation> = model<IMutation>('Mutation', MutationSchema, 'mutations');
