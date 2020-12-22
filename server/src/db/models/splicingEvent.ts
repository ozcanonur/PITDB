import { Schema, model, Model, Document } from 'mongoose';

const SplicingEventSchema = new Schema({
  geneName: String,
  event: String,
  alternative_transcripts: String,
  total_transcripts: [String],
  gene_id: String,
  event_type: String,
  pep_evidence: Boolean,
  project: String,
  comparison: String,
  domains_in: [String],
  domains_out: [String],
});

export interface ISplicingEvent extends Document {
  geneName: string;
  event: string;
  alternative_transcripts: string;
  total_transcripts: string[];
  gene_id: string;
  event_type: string;
  pep_evidence: boolean;
  project: string;
  comparison: string;
  domains_in: string[];
  domains_out: string[];
}

export const SplicingEvent: Model<ISplicingEvent> = model<ISplicingEvent>(
  'SplicingEvent',
  SplicingEventSchema,
  'SplicingEvents'
);
