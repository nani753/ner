import mongoose, { Schema, Document } from 'mongoose';

export interface IRSSSource extends Document {
  name: string;
  category: 'sound' | 'lighting' | 'events';
  url: string;
  feedUrl: string;
  logo?: string;
  status: 'active' | 'error' | 'disabled';
  lastFetched?: Date;
  lastError?: string;
  headers?: Record<string, string>;
  settings?: {
    fetchInterval?: number;
    timeout?: number;
    maxItems?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const RSSSourceSchema = new Schema<IRSSSource>(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['sound', 'lighting', 'events'],
    },
    url: { type: String, required: true },
    feedUrl: { type: String, required: true, unique: true },
    logo: String,
    status: {
      type: String,
      required: true,
      enum: ['active', 'error', 'disabled'],
      default: 'active',
    },
    lastFetched: Date,
    lastError: String,
    headers: { type: Map, of: String },
    settings: {
      fetchInterval: { type: Number, default: 1800 }, // 30 minutes in seconds
      timeout: { type: Number, default: 10000 }, // 10 seconds
      maxItems: { type: Number, default: 50 },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.RSSSource || mongoose.model<IRSSSource>('RSSSource', RSSSourceSchema);