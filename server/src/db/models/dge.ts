import { Schema, model, Document, Model } from 'mongoose';

const DGESchema = new Schema({
  project: String,
  symbol: String,
  log2fc: Number,
  padj: Number,
  ms: Object,
});

export interface IDGE extends Document {
  project: string;
  symbol: string;
  log2fc: number;
  padj: number;
  ms?: {
    FWD?: { log2fc: number };
    REV?: { log2fc: number };
  };
}

export const DGE: Model<IDGE> = model<IDGE>('DGE', DGESchema, 'dges');
