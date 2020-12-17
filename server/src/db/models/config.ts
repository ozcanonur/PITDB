import { Schema, model } from 'mongoose';

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

export const Config = model('Config', ConfigSchema);
