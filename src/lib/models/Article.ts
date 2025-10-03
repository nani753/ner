import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  heroImage: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  status: 'draft' | 'published';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    heroImage: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      avatar: String,
    },
    category: { type: String, required: true },
    tags: [{ type: String }],
    seo: {
      title: String,
      description: String,
      keywords: [String],
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    publishedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Add text index for search
ArticleSchema.index({
  title: 'text',
  content: 'text',
  excerpt: 'text',
  tags: 'text',
});

export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);