import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  slug: string;
  category: 'sound-systems' | 'lighting-systems' | 'event-gear';
  brand: string;
  description: string;
  specifications: Record<string, any>;
  price?: {
    amount: number;
    currency: string;
  };
  images: {
    hero: string;
    gallery: string[];
  };
  affiliateLinks: {
    platform: string;
    url: string;
    trackingId?: string;
  }[];
  pros: string[];
  cons: string[];
  review?: string;
  manufacturerInfo: {
    name: string;
    website?: string;
    support?: string;
  };
  useCase: ('live' | 'studio' | 'rental')[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
      enum: ['sound-systems', 'lighting-systems', 'event-gear'],
    },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    specifications: { type: Schema.Types.Mixed, required: true },
    price: {
      amount: Number,
      currency: String,
    },
    images: {
      hero: { type: String, required: true },
      gallery: [{ type: String }],
    },
    affiliateLinks: [{
      platform: { type: String, required: true },
      url: { type: String, required: true },
      trackingId: String,
    }],
    pros: [{ type: String }],
    cons: [{ type: String }],
    review: String,
    manufacturerInfo: {
      name: { type: String, required: true },
      website: String,
      support: String,
    },
    useCase: [{
      type: String,
      enum: ['live', 'studio', 'rental'],
    }],
  },
  {
    timestamps: true,
  }
);

// Add text index for search
ProductSchema.index({
  title: 'text',
  description: 'text',
  brand: 'text',
  'manufacturerInfo.name': 'text',
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);