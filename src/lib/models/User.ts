import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  password?: string;
  role: 'user' | 'admin';
  bookmarks?: {
    products: mongoose.Types.ObjectId[];
    articles: mongoose.Types.ObjectId[];
  };
  newsletter: boolean;
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: {
      email?: boolean;
      whatsapp?: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: Date,
    image: String,
    password: String, // Will be hashed before storage
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    bookmarks: {
      products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
      articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
    },
    newsletter: {
      type: Boolean,
      default: false,
    },
    preferences: {
      theme: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'system',
      },
      notifications: {
        email: { type: Boolean, default: true },
        whatsapp: { type: Boolean, default: false },
      },
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for search (admin purposes)
UserSchema.index({
  name: 'text',
  email: 'text',
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);