import { Schema, model, Document, Model } from 'mongoose';

const ConfigSchema = new Schema({
  output: String,
  reference_gff: String,
  threads: Number,
  reference_fasta: String,
  project: String,
  conditions: Object,
  mzml: {
    runs: {
      forward: {
        files: String,
        SILAC: Object,
        modifications: {
          variable: [],
          fixed: [],
        },
      },
    },
  },
});

export interface IConfig extends Document {
  output: string;
  reference_gff: string;
  threads: number;
  reference_fasta: string;
  project: string;
  conditions: {
    samples: {
      [sample: string]: {
        processed: boolean;
        left: string;
        lastStepDone: number;
        right: string;
      };
    };
  };
  mzml: {
    runs: {
      [direction: string]: {
        files: string;
        SILAC: {
          [condition: string]: string[];
        };
        modifications: {
          variable: any[];
          fixed: any[];
        };
      };
    };
  };
}

export const Config: Model<IConfig> = model<IConfig>('Config', ConfigSchema, 'config');
