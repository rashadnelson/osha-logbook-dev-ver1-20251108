/**
 * Prisma Client Singleton for Neon Postgres Database
 * 
 * This module provides a singleton instance of PrismaClient that is safe
 * for use in serverless environments (Vercel, Netlify, AWS Lambda, etc.)
 * and prevents "too many connections" errors in development.
 * 
 * @module lib/db
 * 
 * Architecture Notes:
 * - Uses global cache workaround to prevent multiple PrismaClient instances
 * - In development: Hot module reloading can create multiple instances; 
 *   we cache on globalThis to prevent connection exhaustion
 * - In production: Each cold start gets a fresh instance, but within
 *   a warm execution context, the instance is reused
 * 
 * Connection Strategy:
 * - Neon uses connection pooling by default via the pooled connection string
 * - For serverless: Use pooled endpoint (*.pooler.*.neon.tech)
 * - For local dev: Standard endpoint is fine (free tier)
 * - Connection timeout and pool settings are managed by Neon
 * 
 * Environment Variables:
 * - DATABASE_URL: Required. Neon Postgres connection string from env
 */

import { PrismaClient } from '@prisma/client';

/**
 * Global type augmentation for PrismaClient caching
 * This prevents TypeScript errors when accessing globalThis.prisma
 */
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/**
 * Prisma Client Configuration
 * 
 * Log Configuration:
 * - Development: Log queries, errors, and warnings for debugging
 * - Production: Log errors only to reduce noise and improve performance
 * 
 * Error Handling:
 * - Queries that fail will throw PrismaClientKnownRequestError
 * - Connection failures will throw PrismaClientInitializationError
 * - Always wrap database calls in try-catch blocks in your application code
 */
const prismaClientConfig = {
  log: 
    process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] as const
      : ['error'] as const,
  
  // Optional: Uncomment to customize connection behavior
  // datasources: {
  //   db: {
  //     url: process.env.DATABASE_URL,
  //   },
  // },
};

/**
 * Get or Create Prisma Client Singleton
 * 
 * This function implements the singleton pattern with global caching
 * to prevent multiple instances in development (hot reload) and 
 * serverless environments (warm starts).
 * 
 * @returns {PrismaClient} Singleton Prisma client instance
 * 
 * @example
 * ```typescript
 * import { db } from '@/lib/db';
 * 
 * // Query the database
 * const incidents = await db.oSHAIncident.findMany({
 *   where: { year_of_filing: 2024 },
 *   orderBy: { date_of_incident: 'desc' }
 * });
 * ```
 * 
 * @example
 * ```typescript
 * // Create a new incident
 * const newIncident = await db.oSHAIncident.create({
 *   data: {
 *     establishment_name: "Plant 1",
 *     year_of_filing: 2024,
 *     // ... other fields
 *   }
 * });
 * ```
 */
function getPrismaClient(): PrismaClient {
  // In production, always create a new instance
  // This ensures each Lambda/serverless function gets a fresh connection
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient(prismaClientConfig);
  }

  // In development, use global cache to prevent connection exhaustion
  // during hot module reloading (HMR)
  if (!global.prisma) {
    global.prisma = new PrismaClient(prismaClientConfig);
  }

  return global.prisma;
}

/**
 * Singleton Prisma Client Instance
 * 
 * Export this instance throughout your application for database access.
 * Do NOT create new PrismaClient instances elsewhere - always import this.
 * 
 * @type {PrismaClient}
 * @constant
 * 
 * @example
 * ```typescript
 * // In an API route or server component
 * import { db } from '@/lib/db';
 * 
 * export async function getIncidents() {
 *   try {
 *     const incidents = await db.oSHAIncident.findMany();
 *     return incidents;
 *   } catch (error) {
 *     console.error('Database error:', error);
 *     throw new Error('Failed to fetch incidents');
 *   }
 * }
 * ```
 */
export const db = getPrismaClient();

/**
 * Graceful Shutdown Handler
 * 
 * Disconnects the Prisma client gracefully when the process terminates.
 * This ensures that all pending queries complete and connections are
 * properly closed before shutdown.
 * 
 * This is particularly important for:
 * - Serverless cold starts/shutdowns
 * - Development server restarts
 * - Production deployments with zero-downtime
 * 
 * Note: In serverless environments, this may not always be called
 * as the runtime may freeze/terminate immediately.
 */
if (process.env.NODE_ENV !== 'production') {
  // In development, listen for process termination
  process.on('beforeExit', async () => {
    await db.$disconnect();
  });
}

/**
 * Type exports for convenience
 * Use these types when working with Prisma models in your application
 * 
 * @example
 * ```typescript
 * import { db } from '@/lib/db';
 * import type { OSHAIncident } from '@prisma/client';
 * 
 * function processIncident(incident: OSHAIncident) {
 *   console.log(`Processing case ${incident.case_number}`);
 * }
 * ```
 */
export type { PrismaClient } from '@prisma/client';

// Re-export Prisma types for convenience
export * from '@prisma/client';

