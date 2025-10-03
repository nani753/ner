import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const sampleArticles = [
  {
    title: "The Future of AI in Manufacturing",
    slug: "future-ai-manufacturing",
    content: "Artificial Intelligence is revolutionizing the manufacturing industry...",
    excerpt: "Discover how AI is transforming manufacturing processes and improving efficiency.",
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    author: {
      name: "John Smith",
      avatar: "https://i.pravatar.cc/150?u=john",
    },
    category: "Technology",
    tags: ["AI", "Manufacturing", "Industry 4.0"],
    seo: {
      title: "The Future of AI in Manufacturing | NerlumaHub",
      description: "Learn about the latest AI advancements in manufacturing.",
      keywords: ["AI", "Manufacturing", "Industry 4.0", "Technology"],
    },
    status: "published",
    publishedAt: new Date(),
  },
  {
    title: "Sustainable Manufacturing Practices",
    slug: "sustainable-manufacturing-practices",
    content: "Implementing sustainable practices in manufacturing is crucial...",
    excerpt: "Learn how manufacturers are adopting eco-friendly production methods.",
    heroImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
    author: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    category: "Sustainability",
    tags: ["Sustainability", "Manufacturing", "Green Energy"],
    seo: {
      title: "Sustainable Manufacturing Practices | NerlumaHub",
      description: "Discover sustainable manufacturing methods and their impact.",
      keywords: ["Sustainability", "Manufacturing", "Green Energy"],
    },
    status: "published",
    publishedAt: new Date(),
  },
];

const sampleEvents = [
  {
    title: "Manufacturing Tech Expo 2025",
    slug: "manufacturing-tech-expo-2025",
    description: "Join us for the largest manufacturing technology exhibition in the region.",
    dateTime: {
      start: new Date("2025-11-15T09:00:00"),
      end: new Date("2025-11-17T18:00:00"),
    },
    location: {
      venue: "Tech Convention Center",
      address: "123 Innovation Street",
      city: "Silicon Valley",
      country: "USA",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
    type: "exhibition",
    registrationLink: "https://example.com/register",
    tags: ["Technology", "Manufacturing", "Innovation"],
    heroImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    organizer: {
      name: "TechExpo Inc",
      website: "https://example.com",
      contact: "info@techexpo.com",
    },
    status: "upcoming",
  },
  {
    title: "Industry 4.0 Workshop",
    slug: "industry-4-workshop",
    description: "A hands-on workshop exploring the latest in Industry 4.0 technologies.",
    dateTime: {
      start: new Date("2025-12-01T10:00:00"),
      end: new Date("2025-12-01T16:00:00"),
    },
    location: {
      venue: "Digital Innovation Hub",
      address: "456 Tech Park Avenue",
      city: "Boston",
      country: "USA",
      coordinates: {
        lat: 42.3601,
        lng: -71.0589,
      },
    },
    type: "workshop",
    registrationLink: "https://example.com/workshop",
    tags: ["Industry 4.0", "Workshop", "Training"],
    heroImage: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
    organizer: {
      name: "Digital Manufacturing Institute",
      website: "https://example.com",
      contact: "workshop@dmi.com",
    },
    status: "upcoming",
  },
];

async function seedDatabase() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb+srv://nerlumaevents_db_user:w3N39mvUD9SeOJgP@nerlumahub.ivmxjb5.mongodb.net/nerluma?retryWrites=true&w=majority';
    const client = await MongoClient.connect(uri);
    const db = client.db('nerluma');

    // Insert articles
    await db.collection('articles').deleteMany({});
    await db.collection('articles').insertMany(sampleArticles);
    console.log('Sample articles inserted successfully');

    // Insert events
    await db.collection('events').deleteMany({});
    await db.collection('events').insertMany(sampleEvents);
    console.log('Sample events inserted successfully');

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();