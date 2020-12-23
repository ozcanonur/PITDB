import { Schema, model, Document, Model } from 'mongoose';

const AllTranscriptSchema = new Schema({
  TPM: Object,
  strand: String,
  CDS: Object,
  gene: String,
  exons: [[Number, Number]],
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

export interface IAllTranscript extends Document {
  TPM: { [condition: string]: { [sample: string]: number } };
  strand: String;
  CDS: {
    [transcript: string]: {
      sequence: string;
      strand: string;
      start: number;
      end: number;
      type: string;
    };
  };
  gene: String;
  exons: [number, number][];
  variations: [
    {
      ref: String;
      pos: Number;
      refPos: Number;
      alt: String;
    }
  ];
  start: Number;
  end: Number;
  chr: String;
  type: String;
  seq: String;
  transcriptID: String;
  project: String;
}

export const AllTranscript: Model<IAllTranscript> = model<IAllTranscript>(
  'AllTranscript',
  AllTranscriptSchema,
  'allTranscripts'
);
