# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 (App Router) microsite for displaying pet information and owner contact details. The application uses Appwrite as a backend database and is designed to be deployed on Vercel.

**Key Concept**: Each pet gets a unique URL with a document ID parameter (e.g., `?param=DOC_ID`). The microsite fetches pet data from Appwrite and displays it in a beautiful, responsive interface with image carousel support and a found pet reporting system.

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
2. `app/page.tsx` extracts the `param` from searchParams (must be awaited in Next.js 16+)
3. Special case: `?param=AIBO` (case-insensitive) loads demo data from `data/petData.ts`
4. Otherwise: `getPetDataById()` fetches document from Appwrite by document ID
5. Data is transformed from Appwrite schema to internal `Pet` and `Owner` types
6. `PetProfile` component renders pet details with either image carousel or emoji avatar
7. `FoundPetForm` component renders below the profile for lost pet reporting

### Appwrite Integration
- **Client Setup**: `lib/appwrite.ts` initializes the Appwrite SDK client with environment variables
- **Data Fetching**: `lib/getPetData.ts` contains two functions:
  - `getPetDataById(documentId)` - Fetches by document ID (currently used)
  - `getPetDataByCode(code)` - Fetches by querying a code field (not currently used)
- **Data Transformation**: Appwrite documents use field names like `petName`, `ownerName`, etc. These are mapped to internal `Pet` and `Owner` interfaces
- **Personality Field**: Handles both array and string formats (comma-separated or JSON stringified)
- **Image URLs**: The `parseImageUrls()` helper supports:
  - `imageUrls` array (preferred for multiple photos)
  - `imageUrls` as JSON string or comma-separated string
  - `imageUrl` single string (deprecated, falls back to this)
- **Found Pet Reports**: `app/api/report-found-pet/route.ts` provides a POST endpoint that creates documents in a separate collection for lost pet reports

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
- `components/PetProfile.tsx`: Server component that displays pet details, image carousel or emoji avatar, personality traits, and medical info
- `components/ImageCarousel.tsx`: Client component with navigation, dot indicators, and image counter for multiple pet photos
- `components/FoundPetForm.tsx`: Client component with form validation and submission for found pet reports
- `components/ContactSection.tsx`: Shows owner contact information with clickable email/phone links (deprecated, contact info now in PetProfile)

### Environment Variables
Required for Appwrite integration (prefix `NEXT_PUBLIC_` to expose to client):
- `NEXT_PUBLIC_APPWRITE_ENDPOINT` - Usually `https://cloud.appwrite.io/v1`
- `NEXT_PUBLIC_APPWRITE_PROJECT_ID` - Your Appwrite project ID
- `NEXT_PUBLIC_APPWRITE_DATABASE_ID` - Database ID containing pet data
- `NEXT_PUBLIC_APPWRITE_COLLECTION_ID` - Collection ID for pet profiles
- `NEXT_PUBLIC_APPWRITE_FOUND_PETS_COLLECTION_ID` - (Optional) Collection ID for found pet reports

See `.env.local.example` for the template.

## Appwrite Schema

### Pet Profiles Collection
The main collection must have these attributes:

**Pet Fields:**
- `petName` (string, required)
- `species` (string, required)
- `breed` (string, required)
- `age` (integer, optional) - Changed to optional to allow minimal profiles
- `gender` (string, optional)
- `color` (string, optional)
- `weight` (string, optional)
- `description` (string, optional)
- `personality` (string array, optional) - Must be an array type in Appwrite
- `medicalInfo` (string, optional)
- `microchip` (string, optional) - Microchip ID number for pet identification
- `imageUrl` (string, optional) - Deprecated: Use `imageUrls` instead
- `imageUrls` (string array, optional) - Array of image URLs for carousel display
- `petType` (string, optional) - Valid values: `dog`, `cat`, `other` (determines emoji avatar)

**Owner Fields:**
- `ownerName` (string, required)
- `ownerEmail` (string, required)
- `ownerPhone` (string, required)
- `ownerAddress` (string, optional)
- `preferredContact` (string, required)

**Permissions**: Collection must have "Read" permission enabled for "Any" role so the microsite can fetch data publicly.

### Found Pet Reports Collection (Optional)
If using the found pet reporting feature, create a second collection with these attributes:
- `petId` (string, required) - Document ID of the pet profile
- `petName` (string, required) - Name of the pet found
- `finderName` (string, required) - Name of person who found the pet
- `finderPhone` (string, required) - Contact number for the finder
- `message` (string, required) - Description of where/when pet was found
- `status` (string, required) - Default: `pending`, values: `pending`, `contacted`, `resolved`
- `reportedAt` (string, required) - ISO timestamp of when report was submitted

**Permissions**: Must have "Create" permission for "Any" role to allow public submissions.

## Deployment

Configured for Vercel deployment via `vercel.json`. When deploying:
1. Push code to GitHub
2. Import repository to Vercel
3. Add environment variables (at minimum the 4 required ones, optionally the 5th for found pet reports)
4. Vercel auto-detects Next.js configuration

## Important Implementation Notes

### Next.js 16 Requirements
- This is a **server-side rendered** application using Next.js App Router
- `searchParams` in `app/page.tsx` is a Promise and must be awaited (Next.js 16+ requirement)
- All page components receive `searchParams` as a Promise that must be resolved with `await`

### Data Handling
- The `personality` field requires special handling - it can be stored as an array, comma-separated string, or JSON string in Appwrite
- The `imageUrls` field supports arrays, JSON strings, or comma-separated strings
- Empty optional fields are automatically hidden in the UI
- Demo mode (`?param=AIBO`, case-insensitive) is handled entirely with static data from `data/petData.ts`, no Appwrite call is made

### Component Architecture
- `app/page.tsx` is a server component that handles data fetching and routing
- `PetProfile` is a server component that displays pet information
- `ImageCarousel` and `FoundPetForm` are client components (use `"use client"` directive)
- Client components are used only when interactivity is needed (carousel navigation, form submission)

### API Routes
- `app/api/report-found-pet/route.ts` handles POST requests for found pet reports
- Validates required fields: `petId`, `petName`, `finderName`, `finderPhone`, `message`
- Creates documents in the Found Pets collection with auto-generated ID and timestamp

### Styling
- Uses Tailwind CSS v4 with PostCSS
- No custom CSS files needed beyond `app/globals.css`
- Footer has been intentionally removed from all pages
