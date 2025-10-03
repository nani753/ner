import mongoose, { Schema, Document } from 'mongoose';

export interface IRSSItem extends Document {
  source: mongoose.Types.ObjectId;
  title: string;
  link: string;
  guid: string;
  pubDate: Date;
  content: string;
  excerpt: string;
  author?: string;
  categories?: string[];
  featured: boolean;
  hidden: boolean;
  editorialNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RSSItemSchema = new Schema<IRSSItem>(
  {
    source: { type: Schema.Types.ObjectId, ref: 'RSSSource', required: true },
    title: { type: String, required: true },
    link: { type: String, required: true },
    guid: { type: String, required: true, unique: true },
    pubDate: { type: Date, required: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    author: String,
    categories: [String],
    featured: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },
    editorialNotes: String,
  },
  {
    timestamps: true,
  }
);

// Add text index for search
RSSItemSchema.index({
  title: 'text',
  content: 'text',
  excerpt: 'text',
  categories: 'text',
});

// Add compound index for efficient filtering
RSSItemSchema.index({ source: 1, pubDate: -1 });
RSSItemSchema.index({ featured: 1, pubDate: -1 });
RSSItemSchema.index({ hidden: 1 });

export default mongoose.models.RSSItem || mongoose.model<IRSSItem>('RSSItem', RSSItemSchema);