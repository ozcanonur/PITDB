import { Schema, model } from 'mongoose';

const ConfigSchema = new Schema({
  output: String,
  reference_gff: String,
  threads: Number,
  reference_fasta: String,
  project: String,
  conditions: {
    Nsi: {
      samples: {
        '1': {
          processed: Boolean,
          left: String,
          lastStepDone: Number,
          right: String,
          mzml: [String],
        },
        '2': {
          processed: Boolean,
          left: String,
          lastStepDone: Number,
          right: String,
          mzml: [String],
        },
        '3': {
          processed: Boolean,
          left: String,
          lastStepDone: Number,
          right: String,
          mzml: [String],
        },
      },
    },
    si: {
      samples: {
        '1': {
          processed: Boolean,
          left: String,
          lastStepDone: Number,
          right: String,
          mzml: [String],
        },
        '2': {
          processed: Boolean,
          left: String,
          lastStepDone: Number,
          right: String,
          mzml: [String],
        },
        '3': {
          processed: Boolean,
          left: String,
          lastStepDone: Number,
          right: String,
          mzml: [String],
        },
      },
    },
  },
  mzml: {
    runs: {
      forward: {
        files: String,
        SILAC: {
          Nsi: [String],
          si: [String],
        },
        modifications: {
          variable: [],
          fixed: [],
        },
      },
    },
  },
});

export const Config = model('Config', ConfigSchema);
