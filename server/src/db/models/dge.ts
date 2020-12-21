import { Schema, model, Document, Model } from 'mongoose';

const DGESchema = new Schema({
  symbol: String,
  log2fc: Number,
  padj: Number,
});

export interface IDGE extends Document {
  symbol: string;
  log2fc: number;
  padj: number;
}

export const DGE: Model<IDGE> = model<IDGE>('DGE', DGESchema, 'dges');
