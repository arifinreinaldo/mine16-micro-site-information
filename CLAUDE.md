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
5. `getUserPhone()` is called with the `userId` to fetch owner's phone from Appwrite auth table
6. Data is transformed from Appwrite schema to internal `Pet` type (including `ownerPhone`)
7. `PetProfile` component renders pet details with either image carousel or emoji avatar
8. Owner phone number (if available) is displayed in a contact section above the Found Pet form
9. `FoundPetForm` component renders below the contact section for lost pet reporting

### Appwrite Integration
- **Client Setup**: `lib/appwrite.ts` initializes two Appwrite SDK clients:
  - Public client for database access (uses public environment variables)
  - Server-side client with API key for Users service (server-side only)
- **Data Fetching**: `lib/getPetData.ts` contains two functions:
  - `getPetDataById(documentId)` - Fetches by document ID (currently used)
  - `getPetDataByCode(code)` - Fetches by querying a code field (not currently used)
- **User Phone Fetching**: Both data fetching functions call `getUserPhone(userId)` to retrieve the owner's phone number from the Appwrite auth table using the Users API
- **Data Transformation**: Appwrite documents use field names like `petName`, etc. These are mapped to internal `Pet` interface
- **Personality Field**: Handles both array and string formats (comma-separated or JSON stringified)
- **Image URLs**: The `parseImageUrls()` helper supports:
  - `imageUrls` array (preferred for multiple photos)
  - `imageUrls` as JSON string or comma-separated string
  - `imageUrl` single string (deprecated, falls back to this)
- **Found Pet Reports**: `app/api/report-found-pet/route.ts` provides a POST endpoint that creates documents in a separate collection for lost pet reports

### Type System
All types are defined in `types/pet.ts`:
- `Pet` interface: Internal representation for pet data, including `ownerPhone` field fetched from Appwrite auth
- `AppwritePetDocument` (in `lib/getPetData.ts`): Appwrite's document schema with metadata fields like `$id`, `$createdAt`, etc.

**Note**: The `Owner` interface is no longer used. Owner contact information (phone number) is now retrieved from the Appwrite auth table via the `userId` field.

### Special Behaviors
- **No Parameter**: Shows "No Data Detected" UI with instructions
- **AIBO Demo**: `?param=AIBO` (case-insensitive) loads hardcoded demo data
- **Pet Not Found**: Shows error UI if document doesn't exist in Appwrite
- **Avatar Display**: Uses `petType` field to show different emojis:
  - `dog` → 🐕
  - `cat` → 🐈
  - `bird` → 🐦
  - `other` → 🐾

### Component Structure
- `components/PetProfile.tsx`: Server component that displays pet details, image carousel or emoji avatar, personality traits, and medical info
- `components/ImageCarousel.tsx`: Client component with navigation, dot indicators, and image counter for multiple pet photos
- `components/FoundPetForm.tsx`: Client component with form validation and submission for found pet reports
- `components/ContactSection.tsx`: Shows owner contact information with clickable email/phone links (deprecated, contact info now in PetProfile)

### Environment Variables
Required for Appwrite integration:

**Public variables** (prefix `NEXT_PUBLIC_` to expose to client):
- `NEXT_PUBLIC_APPWRITE_ENDPOINT` - Usually `https://cloud.appwrite.io/v1`
- `NEXT_PUBLIC_APPWRITE_PROJECT_ID` - Your Appwrite project ID
- `NEXT_PUBLIC_APPWRITE_DATABASE_ID` - Database ID containing pet data
- `NEXT_PUBLIC_APPWRITE_COLLECTION_ID` - Collection ID for pet profiles
- `NEXT_PUBLIC_APPWRITE_FOUND_PETS_COLLECTION_ID` - (Optional) Collection ID for found pet reports

**Server-side only variables** (no `NEXT_PUBLIC_` prefix):
- `APPWRITE_API_READ_KEY` - API key for server-side access to user data (required scopes: `users.read`)

See `.env.local.example` for the template.

## Appwrite Schema

### Pet Profiles Collection
The main collection must have these attributes:

**Pet Fields:**
- `petName` (string, required)
- `breed` (string, required)
- `age` (string, optional) - Stored as string to allow flexible age formats
- `gender` (string, optional)
- `color` (string, optional)
- `weight` (string, optional)
- `description` (string, optional)
- `personality` (string, optional) - Stored as string; can be comma-separated or JSON stringified
- `medicalInfo` (string, optional)
- `microchip` (string, optional) - Microchip ID number for pet identification
- `imageUrls` (string array or string, optional) - Array of image URLs for carousel, or JSON/comma-separated string
- `petType` (string, required) - Valid values: `dog`, `cat`, `bird`, `other` (determines emoji avatar)
- `userId` (string, required) - User authentication ID for pet owner

**Note**: The `species` field is no longer used in the current schema

**Permissions**: Collection must have "Read" permission enabled for "Any" role so the microsite can fetch data publicly.

### Found Pet Reports Collection (Optional)
If using the found pet reporting feature, create a second collection with these attributes:
- `petID` (string, required) - Document ID of the pet profile (note: uppercase ID)
- `petName` (string, required) - Name of the pet found
- `finderName` (string, required) - Name of person who found the pet
- `finderPhone` (string, required) - Contact number for the finder
- `message` (string, required) - Description of where/when pet was found
- `status` (string, required) - Default: `pending`, values: `pending`, `contacted`, `resolved`
- `reportedAt` (string, required) - ISO timestamp of when report was submitted

**Permissions**: Must have "Create" permission for "Any" role to allow public submissions.

**Rate Limiting**: The API endpoint implements IP-based rate limiting:
- 3 submissions per 15 minutes per IP address
- Uses in-memory storage with automatic cleanup
- Returns 429 status code with `Retry-After` header when limit exceeded
- Supports proxy/CDN IP detection (x-forwarded-for, x-real-ip, cf-connecting-ip)

## Deployment

Configured for Vercel deployment via `vercel.json`. When deploying:
1. Push code to GitHub
2. Import repository to Vercel
3. Add environment variables:
   - Required public variables (5):
     - `NEXT_PUBLIC_APPWRITE_ENDPOINT`
     - `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
     - `NEXT_PUBLIC_APPWRITE_DATABASE_ID`
     - `NEXT_PUBLIC_APPWRITE_COLLECTION_ID`
   - Optional variables:
     - `NEXT_PUBLIC_APPWRITE_FOUND_PETS_COLLECTION_ID` (for found pet reports)
   - **Required server-side variable**:
     - `APPWRITE_API_READ_KEY` - Create in Appwrite Console → Settings → API Keys with `users.read` scope
4. Vercel auto-detects Next.js configuration

**Important**: The API key must have the `users.read` scope to fetch phone numbers from the auth table.

## Important Implementation Notes

### Next.js 16 Requirements
- This is a **server-side rendered** application using Next.js App Router
- `searchParams` in `app/page.tsx` is a Promise and must be awaited (Next.js 16+ requirement)
- All page components receive `searchParams` as a Promise that must be resolved with `await`

### Data Handling
- The `personality` field is stored as a **string** in Appwrite (not an array) and can be comma-separated or JSON stringified
- The `imageUrls` field in Appwrite can be:
  - A string array (preferred)
  - A JSON stringified array
  - A comma-separated string
  - The `parseImageUrls()` helper function handles all formats
- Empty optional fields are automatically hidden in the UI
- Demo mode (`?param=AIBO`, case-insensitive) is handled entirely with static data from `data/petData.ts`, no Appwrite call is made
- **Important**: The `Pet` type expects `imageUrls` as an array after transformation, and `personality` as a string

### Component Architecture
- `app/page.tsx` is a server component that handles data fetching and routing
- `PetProfile` is a server component that displays pet information
- `ImageCarousel` and `FoundPetForm` are client components (use `"use client"` directive)
- Client components are used only when interactivity is needed (carousel navigation, form submission)

### API Routes
- `app/api/report-found-pet/route.ts` handles POST requests for found pet reports
- Validates required fields: `petId`, `petName`, `finderName`, `finderPhone`, `message`
- Creates documents in the Found Pets collection with auto-generated ID and timestamp
- Implements IP-based rate limiting (3 requests per 15 minutes)
- Note: Document is created with field name `petID` (uppercase ID) in Appwrite

### Styling
- Uses Tailwind CSS v4 with PostCSS
- No custom CSS files needed beyond `app/globals.css`
- Footer has been intentionally removed from all pages
