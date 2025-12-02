# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 (App Router) microsite for displaying pet information and owner contact details. The application uses Appwrite as a backend database and is designed to be deployed on Vercel.

**Key Concept**: Each pet gets a unique URL with a document ID parameter (e.g., `?param=DOC_ID`). The microsite fetches pet data from Appwrite and displays it in a beautiful, responsive interface.

## Commands

```bash
# Development
npm run dev          # Start development server on localhost:3000

# Build & Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

## Architecture

### Data Flow
1. User visits site with URL parameter: `/?param=DOCUMENT_ID`
2. `app/page.tsx` extracts the `param` from searchParams
3. Special case: `?param=AIBO` loads demo data from `data/petData.ts`
4. Otherwise: `getPetDataById()` fetches document from Appwrite
5. Data is transformed from Appwrite schema to internal `Pet` and `Owner` types
6. Components render the pet profile and owner contact sections

### Appwrite Integration
- **Client Setup**: `lib/appwrite.ts` initializes the Appwrite SDK client with environment variables
- **Data Fetching**: `lib/getPetData.ts` contains two functions:
  - `getPetDataById(documentId)` - Fetches by document ID (currently used)
  - `getPetDataByCode(code)` - Fetches by querying a code field (not currently used)
- **Data Transformation**: Appwrite documents use field names like `petName`, `ownerName`, etc. These are mapped to internal `Pet` and `Owner` interfaces
- **Personality Field**: Handles both array and string formats (comma-separated or JSON stringified)

### Type System
All types are defined in `types/pet.ts`:
- `Pet` interface: Internal representation for pet data
- `Owner` interface: Internal representation for owner contact info
- `AppwritePetDocument` (in `lib/getPetData.ts`): Appwrite's document schema with metadata fields like `$id`, `$createdAt`, etc.

### Special Behaviors
- **No Parameter**: Shows "No Data Detected" UI with instructions
- **AIBO Demo**: `?param=AIBO` (case-insensitive) loads hardcoded demo data
- **Pet Not Found**: Shows error UI if document doesn't exist in Appwrite
- **Avatar Display**: Uses `petType` field to show different emojis:
  - `dog` → 🐕
  - `cat` → 🐈
  - `other` → 🐾

### Component Structure
- `components/PetProfile.tsx`: Displays pet details, image/avatar, personality traits, and medical info
- `components/ContactSection.tsx`: Shows owner contact information with clickable email/phone links

### Environment Variables
Required for Appwrite integration (prefix `NEXT_PUBLIC_` to expose to client):
- `NEXT_PUBLIC_APPWRITE_ENDPOINT` - Usually `https://cloud.appwrite.io/v1`
- `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
- `NEXT_PUBLIC_APPWRITE_DATABASE_ID`
- `NEXT_PUBLIC_APPWRITE_COLLECTION_ID`

See `.env.local.example` for the template.

## Appwrite Schema

The collection must have these attributes:

**Pet Fields:**
- `petName` (string, required)
- `species` (string, required)
- `breed` (string, required)
- `age` (integer, required)
- `gender` (string, required)
- `color` (string, required)
- `weight` (string, required)
- `description` (string, required)
- `personality` (string array, required) - Must be an array type in Appwrite
- `medicalInfo` (string, optional)
- `imageUrl` (string, optional)
- `petType` (string, optional) - Valid values: `dog`, `cat`, `other`

**Owner Fields:**
- `ownerName` (string, required)
- `ownerEmail` (string, required)
- `ownerPhone` (string, required)
- `ownerAddress` (string, optional)
- `preferredContact` (string, required)

**Important**: Collection must have "Read" permission enabled for "Any" role so the microsite can fetch data publicly.

## Deployment

Configured for Vercel deployment via `vercel.json`. When deploying:
1. Push code to GitHub
2. Import repository to Vercel
3. Add all four environment variables before deploying
4. Vercel auto-detects Next.js configuration

## Important Implementation Notes

- This is a **server-side rendered** application using Next.js App Router
- `searchParams` in `app/page.tsx` is a Promise and must be awaited (Next.js 16+ requirement)
- The `personality` field requires special handling - it can be stored as an array, comma-separated string, or JSON string in Appwrite
- Demo mode (AIBO) is handled entirely with static data, no Appwrite call is made
- Footer has been intentionally removed from all pages (see recent commits)
