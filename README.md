# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/d44237bc-4bb0-4200-b394-c3a5fdc6d389

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d44237bc-4bb0-4200-b394-c3a5fdc6d389) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Prisma ORM
- Neon Postgres (Serverless PostgreSQL)

## Database Setup (Neon Postgres)

This project uses **Neon** as the PostgreSQL backend with **Prisma** as the ORM.

### Prerequisites

1. Create a free Neon account at [console.neon.tech](https://console.neon.tech)
2. Create a new Neon project

### Environment Configuration

#### Neon Branches for Development

Neon supports database branching similar to Git. We recommend:
- **`main` branch** → Production environment
- **`dev` branch** → Local development (free tier)

To create a development branch:
1. Go to your Neon dashboard
2. Navigate to Branches
3. Create a new branch from `main` called `dev`

#### Local Development Setup

1. Copy the example environment file:
   ```sh
   cp .env.example .env
   ```

2. Get your connection string from Neon:
   - Open [Neon Console](https://console.neon.tech)
   - Select your project
   - Go to the **`dev` branch** (for local development)
   - Copy the connection string
   - **IMPORTANT**: Use the standard endpoint (NOT the pooled endpoint) for local dev

3. Update `.env` with your connection string:
   ```env
   DATABASE_URL="postgresql://user:password@ep-xxxxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
   ```

4. Generate Prisma Client and push schema:
   ```sh
   npm run db:generate
   npm run db:push
   ```

### Database Commands

```sh
# Generate Prisma Client (run after schema changes)
npm run db:generate

# Push schema to database (for development)
npm run db:push

# Create and run migrations (for production)
npm run db:migrate

# Deploy migrations (for CI/CD)
npm run db:migrate:deploy

# Open Prisma Studio (database GUI)
npm run db:studio

# Seed database with sample data
npm run db:seed
```

### Production Deployment

For production environments (Vercel, Railway, Netlify):

1. Use the **pooled connection string** from Neon:
   - Format: `postgresql://user:pass@ep-xxx.pooler.us-east-1.neon.tech/dbname`
   - The `.pooler.` in the hostname indicates connection pooling

2. Set `DATABASE_URL` in your deployment platform's environment variables

3. Run migrations on deploy:
   ```sh
   npm run db:migrate:deploy
   ```

### Schema Information

The database includes two main models:

- **OSHAIncident** - Individual workplace incident records (OSHA Forms 300/301)
- **OSHA300ASummary** - Annual summary reports (OSHA Form 300A)

See `prisma/schema.prisma` for the complete schema definition.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d44237bc-4bb0-4200-b394-c3a5fdc6d389) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
