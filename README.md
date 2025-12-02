# Pet Information Microsite

A beautiful and responsive microsite built with Next.js and Tailwind CSS to showcase pet information and owner contact details. Perfect for pet owners who want to share their pet's profile with a professional-looking website.

## Features

- **Dynamic Data Loading**: Integrated with Appwrite to fetch pet data dynamically via URL parameters
- Modern, responsive design with gradient backgrounds
- Detailed pet profile with personality traits
- Medical information display
- Owner contact section with clickable email and phone links
- Fully customizable pet and owner information
- Static fallback data when no parameter is provided
- Loading states and error handling
- Ready for deployment on Vercel
- TypeScript for type safety
- Tailwind CSS for styling

## Project Structure

```
├── app/
│   ├── page.tsx          # Main page component (with Appwrite integration)
│   ├── loading.tsx       # Loading state component
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles
├── components/
│   ├── PetProfile.tsx    # Pet profile component
│   └── ContactSection.tsx # Owner contact component
├── lib/
│   ├── appwrite.ts       # Appwrite client configuration
│   └── getPetData.ts     # Functions to fetch pet data from Appwrite
├── types/
│   └── pet.ts            # TypeScript interfaces
├── data/
│   └── petData.ts        # Fallback pet and owner data
├── .env.local.example    # Example environment variables
└── vercel.json           # Vercel configuration
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your Appwrite credentials:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Appwrite Setup

This microsite uses Appwrite as the backend database to store pet information.

### 1. Create an Appwrite Account

1. Go to [cloud.appwrite.io](https://cloud.appwrite.io) and create a free account
2. Create a new project

### 2. Create Database and Collection

1. In your Appwrite project, go to **Databases**
2. Create a new database
3. Create a collection named "pets" (or any name you prefer)
4. Add the following attributes to your collection:

| Attribute Name | Type | Required | Array |
|---------------|------|----------|-------|
| petName | String | Yes | No |
| species | String | Yes | No |
| breed | String | Yes | No |
| age | Integer | Yes | No |
| gender | String | Yes | No |
| color | String | Yes | No |
| weight | String | Yes | No |
| description | String | Yes | No |
| personality | String | Yes | Yes |
| medicalInfo | String | No | No |
| imageUrl | String | No | No |
| ownerName | String | Yes | No |
| ownerEmail | String | Yes | No |
| ownerPhone | String | Yes | No |
| ownerAddress | String | No | No |
| preferredContact | String | Yes | No |

5. Set collection permissions to allow **Read** access for **Any** role

### 3. Add Pet Data

1. Go to your collection and click "Add Document"
2. Fill in all the pet and owner information
3. Copy the Document ID (you'll use this as the URL parameter)

### 4. Configure Environment Variables

Update your `.env.local` file with your Appwrite credentials from the project settings.

## Usage

### Dynamic URLs

To view a specific pet's profile, use the URL parameter `param`:

```
https://your-domain.com/?param=DOCUMENT_ID
```

For example:
```
https://your-domain.com/?param=DOGSZ
https://your-domain.com/?param=673abc123def456
```

### Fallback Data

If no `param` is provided in the URL, the site will display the static fallback data from `data/petData.ts`.

## Customization

### Update Pet Information

Edit the `data/petData.ts` file to customize your pet's information:

```typescript
export const petInfo: Pet = {
  name: "Your Pet's Name",
  species: "Dog/Cat/etc",
  breed: "Breed Name",
  age: 3,
  // ... other fields
};
```

### Update Owner Contact Information

Edit the owner information in the same file:

```typescript
export const ownerInfo: Owner = {
  name: "Your Name",
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  // ... other fields
};
```

### Styling

The project uses Tailwind CSS. Modify the components in the `components/` directory to change the design.

## Deploy on Vercel

The easiest way to deploy this microsite is using Vercel:

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com/new)
3. Import your repository
4. Vercel will automatically detect Next.js and configure the build settings
5. Click "Deploy"

Alternatively, you can use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Technologies Used

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Appwrite](https://appwrite.io/) - Backend database
- [Vercel](https://vercel.com/) - Deployment platform

## License

Feel free to use this template for your own pet microsite!
