import { Schema, model, Document, Model } from 'mongoose';

const GenesPeptideSchema = new Schema({
  gene: String,
  project: String,
  peptides: Object,
});

export interface IGenesPeptide extends Document {
  gene: string;
  project: string;
  peptides: {
    [peptide: string]: {
      isGeneUnique: boolean;
      intensities: {
        FWD: {
          [condition: string]: number;
        };
        REV: {
          [condition: string]: number;
        };
      };
      sequence: string;
      ratios: {
        FWD: number;
        REV: number;
      };
    };
  };
}

export const GenesPeptide: Model<IGenesPeptide> = model<IGenesPeptide>(
  'GenesPeptide',
  GenesPeptideSchema,
  'genesPeptides'
);
