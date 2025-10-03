# NerlumaHub

A comprehensive event technology website focused on sound systems, lighting systems, and event tech.

## Features

- Product catalog with detailed specifications
- Image management with drag & drop uploads
- CSV import/export functionality
- Admin interface for content management
- Authentication system with admin roles
- Image optimization and CDN support
- Responsive design

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- MongoDB with Mongoose
- NextAuth.js for authentication
- TailwindCSS & Shadcn/UI
- Sonner for toast notifications
- React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- MongoDB database
- npm or yarn

### Local Development

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Copy the environment variables file and update it:
\`\`\`bash
cp .env.example .env.local
\`\`\`

3. Update the environment variables in \`.env.local\` with your values.

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

### Production Deployment

1. Create a new project on [Vercel](https://vercel.com)

2. Set up environment variables in Vercel's dashboard:
   - Add all variables from \`.env.example\`
   - Generate a secure \`NEXTAUTH_SECRET\` using \`openssl rand -base64 32\`
   - Set \`NEXTAUTH_URL\` to your production domain

3. Configure your MongoDB database:
   - Set up network access for Vercel's IP ranges
   - Use MongoDB Atlas for production
   - Update \`MONGODB_URI\` with production credentials

4. Deploy to Vercel:
   - Connect your GitHub repository
   - Configure build settings
   - Deploy the project

### Post-Deployment

1. Set up your first admin user:
   - Update \`ADMIN_EMAIL\` and \`ADMIN_PASSWORD\` in environment variables
   - Access \`/admin\` and log in with these credentials
   - Change password after first login

2. Configure file uploads:
   - For local storage: Ensure \`public/uploads\` directory exists
   - For S3: Configure AWS credentials in environment variables
   - For Cloudinary: Set up Cloudinary credentials

3. Set up monitoring and analytics:
   - Add Google Analytics ID
   - Configure Meta Pixel for conversion tracking
   - Set up error monitoring (e.g., Sentry)
