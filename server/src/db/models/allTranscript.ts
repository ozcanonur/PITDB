import { Schema, model } from 'mongoose';

const AllTranscriptSchema = new Schema({
  TPM: {
    Nsi: {
      '1': Number,
      '2': Number,
      '3': Number,
    },
    si: {
      '1': Number,
      '2': Number,
      '3': Number,
    },
  },
  strand: String,
  CDS: Object,
  gene: String,
  exons: [[Number]],
  variations: [
    {
      ref: String,
      pos: Number,
      refPos: Number,
      alt: String,
    },
  ],
  start: Number,
  end: Number,
  chr: String,
  type: String,
  seq: String,
  transcriptID: String,
  project: String,
});

export const AllTranscript = model('AllTranscript', AllTranscriptSchema);
