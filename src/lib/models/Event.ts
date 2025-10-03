import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  dateTime: {
    start: Date;
    end: Date;
  };
  location: {
    venue: string;
    address: string;
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  type: 'exhibition' | 'workshop' | 'demo' | 'conference';
  registrationLink?: string;
  tags: string[];
  heroImage?: string;
  organizer: {
    name: string;
    website?: string;
    contact?: string;
  };
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    dateTime: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    location: {
      venue: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    type: {
      type: String,
      required: true,
      enum: ['exhibition', 'workshop', 'demo', 'conference'],
    },
    registrationLink: String,
    tags: [{ type: String }],
    heroImage: String,
    organizer: {
      name: { type: String, required: true },
      website: String,
      contact: String,
    },
    status: {
      type: String,
      required: true,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for search
EventSchema.index({
  title: 'text',
  description: 'text',
  'location.venue': 'text',
  'location.city': 'text',
  'organizer.name': 'text',
});

// Add index for date queries
EventSchema.index({ 'dateTime.start': 1 });

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);