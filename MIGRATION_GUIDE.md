# Migration Guide: localStorage → Neon Postgres

This guide shows how to migrate your OSHA Logbook application from localStorage to Neon Postgres database.

---

## 📋 Overview

**Current State**: Data stored in browser `localStorage`  
**Target State**: Data stored in Neon Postgres via Prisma ORM  
**Status**: Database configured, migration pending

---

## 🔄 Migration Steps

### Step 1: Create API Routes (Server-Side)

Since we're using Vite + React (not Next.js), you'll need to add a backend API. Options:

#### Option A: Add Express Server
```bash
npm install express cors
```

Create `server/api/incidents.ts`:
```typescript
import express from 'express';
import { db } from '../src/lib/db';

const router = express.Router();

// GET all incidents
router.get('/incidents', async (req, res) => {
  try {
    const incidents = await db.oSHAIncident.findMany({
      orderBy: { created_at: 'desc' }
    });
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch incidents' });
  }
});

// POST new incident
router.post('/incidents', async (req, res) => {
  try {
    const incident = await db.oSHAIncident.create({
      data: req.body
    });
    res.json(incident);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create incident' });
  }
});

export default router;
```

#### Option B: Migrate to Next.js or Remix
For full-stack React with built-in API routes.

---

## 🔧 Code Migration Examples

### Before (localStorage):

```typescript
// src/lib/storage.ts
export const storage = {
  getIncidents: (): OSHAIncident[] => {
    const data = localStorage.getItem(INCIDENTS_KEY);
    return data ? JSON.parse(data) : [];
  },
  
  saveIncident: (incident: OSHAIncident): void => {
    const incidents = storage.getIncidents();
    incidents.push(incident);
    localStorage.setItem(INCIDENTS_KEY, JSON.stringify(incidents));
  }
};
```

### After (Neon Postgres with Prisma):

```typescript
// src/lib/api/incidents.ts
import { db } from '@/lib/db';
import type { OSHAIncident } from '@prisma/client';

/**
 * Get all incidents from database
 * @returns Array of OSHA incidents
 */
export async function getIncidents(): Promise<OSHAIncident[]> {
  try {
    return await db.oSHAIncident.findMany({
      orderBy: [
        { year_of_filing: 'desc' },
        { case_number: 'desc' }
      ]
    });
  } catch (error) {
    console.error('Database error fetching incidents:', error);
    throw new Error('Failed to fetch incidents from database');
  }
}

/**
 * Save a new incident to database
 * @param incident - Incident data to save
 * @returns Created incident with ID
 */
export async function saveIncident(
  incident: Omit<OSHAIncident, 'id' | 'created_at' | 'updated_at'>
): Promise<OSHAIncident> {
  try {
    return await db.oSHAIncident.create({
      data: incident
    });
  } catch (error) {
    console.error('Database error saving incident:', error);
    throw new Error('Failed to save incident to database');
  }
}

/**
 * Get incidents for a specific year and establishment
 */
export async function getIncidentsByYear(
  establishmentName: string,
  year: number
): Promise<OSHAIncident[]> {
  return await db.oSHAIncident.findMany({
    where: {
      establishment_name: establishmentName,
      year_of_filing: year
    },
    orderBy: { case_number: 'asc' }
  });
}

/**
 * Delete an incident by ID
 */
export async function deleteIncident(id: string): Promise<void> {
  await db.oSHAIncident.delete({
    where: { id }
  });
}

/**
 * Update an existing incident
 */
export async function updateIncident(
  id: string,
  data: Partial<OSHAIncident>
): Promise<OSHAIncident> {
  return await db.oSHAIncident.update({
    where: { id },
    data
  });
}
```

---

## 📊 Query Examples

### Basic Queries

```typescript
import { db } from '@/lib/db';

// Get all incidents
const allIncidents = await db.oSHAIncident.findMany();

// Get incidents for 2024
const incidents2024 = await db.oSHAIncident.findMany({
  where: { year_of_filing: 2024 }
});

// Get incidents with days away from work
const dafwIncidents = await db.oSHAIncident.findMany({
  where: { 
    incident_outcome: 2,
    dafw_num_away: { gt: 0 }
  }
});

// Count total incidents by establishment
const incidentCount = await db.oSHAIncident.count({
  where: { establishment_name: "Plant 1" }
});
```

### Advanced Queries

```typescript
// Get incidents with aggregations
const stats = await db.oSHAIncident.aggregate({
  where: { year_of_filing: 2024 },
  _sum: {
    dafw_num_away: true,
    djtr_num_tr: true
  },
  _count: {
    id: true
  }
});

// Search incidents by description
const searchResults = await db.oSHAIncident.findMany({
  where: {
    incident_description: {
      contains: 'machine',
      mode: 'insensitive'
    }
  }
});

// Get incidents with pagination
const page = 1;
const pageSize = 10;
const paginatedIncidents = await db.oSHAIncident.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize,
  orderBy: { date_of_incident: 'desc' }
});
```

---

## 🔐 Data Migration Script

Create a one-time migration script to move existing localStorage data to Neon:

```typescript
// scripts/migrate-localstorage-to-neon.ts
import { db } from '../src/lib/db';

async function migrateLocalStorageData() {
  // Get data from localStorage (you'll need to access this in browser)
  const localStorageIncidents = JSON.parse(
    localStorage.getItem('osha_incidents') || '[]'
  );

  console.log(`Migrating ${localStorageIncidents.length} incidents...`);

  for (const incident of localStorageIncidents) {
    // Remove the old UUID to let Prisma generate a new one
    const { id, ...incidentData } = incident;
    
    await db.oSHAIncident.create({
      data: incidentData
    });
  }

  console.log('Migration complete!');
}

migrateLocalStorageData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
```

---

## 🎯 React Component Updates

### Dashboard Component

**Before**:
```typescript
const [incidents, setIncidents] = useState<OSHAIncident[]>([]);

useEffect(() => {
  setIncidents(storage.getIncidents());
}, []);
```

**After** (with React Query):
```typescript
import { useQuery } from '@tanstack/react-query';

const { data: incidents = [], isLoading, error } = useQuery({
  queryKey: ['incidents'],
  queryFn: async () => {
    const res = await fetch('/api/incidents');
    if (!res.ok) throw new Error('Failed to fetch incidents');
    return res.json();
  }
});

if (isLoading) return <div>Loading incidents...</div>;
if (error) return <div>Error loading incidents</div>;
```

### NewIncident Component

**Before**:
```typescript
const onSubmit = (data: OSHAIncident) => {
  const incident = { ...data, id: crypto.randomUUID() };
  storage.saveIncident(incident);
  navigate("/dashboard");
};
```

**After** (with React Query mutation):
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

const createIncidentMutation = useMutation({
  mutationFn: async (data: Omit<OSHAIncident, 'id'>) => {
    const res = await fetch('/api/incidents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create incident');
    return res.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['incidents'] });
    navigate("/dashboard");
  }
});

const onSubmit = (data: OSHAIncident) => {
  createIncidentMutation.mutate(data);
};
```

---

## 📝 Summary of Changes Needed

### Backend (New):
1. ✅ **Database configured** (Neon + Prisma)
2. ⏳ **API server needed** (Express, Next.js, or similar)
3. ⏳ **API routes** (CRUD operations for incidents/summaries)
4. ⏳ **Authentication** (Clerk.js recommended)

### Frontend (Updates):
1. ⏳ Replace `storage.ts` calls with API fetch calls
2. ⏳ Update React Query queries/mutations
3. ⏳ Add loading states
4. ⏳ Add error handling
5. ⏳ Migrate localStorage data to database (one-time)

### Benefits After Migration:
- ✅ Data persists across devices
- ✅ Multi-user support
- ✅ Better data integrity
- ✅ Query optimization
- ✅ Backup and recovery
- ✅ Scalability

---

## 🚀 Recommended Next Steps

1. **Add Backend API**
   - Express server for REST API, OR
   - Migrate to Next.js for integrated API routes

2. **Implement Authentication**
   - Use Clerk.js or Auth0
   - Add user/organization isolation

3. **Update Frontend**
   - Replace localStorage calls with API calls
   - Add loading/error states
   - Implement optimistic updates

4. **Test Migration**
   - Use seed data to verify functionality
   - Test all CRUD operations
   - Verify CSV export with database data

5. **Deploy**
   - Deploy backend (Railway, Vercel, etc.)
   - Set `DATABASE_URL` in production env
   - Run migrations: `npm run db:migrate:deploy`

---

*Need help with migration? Refer to the Prisma docs: https://www.prisma.io/docs*

