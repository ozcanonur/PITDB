import { Schema, model, Document, Model } from 'mongoose';

const ReadCountSchema = new Schema({
  gene: String,
  counts: Object,
  project: String,
});

interface IReadCount extends Document {
  gene: string;
  counts: { [condition: string]: { [sample: string]: number } };
  project: string;
}

export const ReadCount: Model<IReadCount> = model<IReadCount>('ReadCount', ReadCountSchema, 'readCounts');
