# Pet Information Microsite

A beautiful and responsive microsite built with Next.js and Tailwind CSS to showcase pet information and owner contact details. Perfect for pet owners who want to share their pet's profile with a professional-looking website.

## Features

- Modern, responsive design with gradient backgrounds
- Detailed pet profile with personality traits
- Medical information display
- Owner contact section with clickable email and phone links
- Fully customizable pet and owner information
- Ready for deployment on Vercel
- TypeScript for type safety
- Tailwind CSS for styling

## Project Structure

```
├── app/
│   ├── page.tsx          # Main page component
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles
├── components/
│   ├── PetProfile.tsx    # Pet profile component
│   └── ContactSection.tsx # Owner contact component
├── types/
│   └── pet.ts            # TypeScript interfaces
├── data/
│   └── petData.ts        # Pet and owner data
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

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

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

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Deployment platform

## License

Feel free to use this template for your own pet microsite!
