import { Schema, model } from 'mongoose';

const ReadCountSchema = new Schema({
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

export const ReadCount = model('ReadCount', ReadCountSchema);
