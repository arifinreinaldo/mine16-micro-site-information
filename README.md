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

## Appwrite Setup (Complete Guide)

This microsite uses Appwrite as the backend database to store pet information. Follow these detailed steps to pair your application with Appwrite.

### Step 1: Create an Appwrite Account & Project

1. **Sign up for Appwrite**
   - Visit [cloud.appwrite.io](https://cloud.appwrite.io)
   - Click "Sign Up" and create a free account
   - Verify your email address

2. **Create a New Project**
   - After logging in, click "Create Project"
   - Enter a project name (e.g., "Pet Microsite")
   - Click "Create"
   - **Important**: Copy your **Project ID** from the project settings
     - You'll find it at the top of the project dashboard
     - It looks like: `6745abc123def456789`

### Step 2: Get Your Project Credentials

1. **Find Your Endpoint**
   - The endpoint is usually: `https://cloud.appwrite.io/v1`
   - If you're self-hosting, use your server URL

2. **Get Your Project ID**
   - Go to your project dashboard
   - Look for "Project ID" at the top
   - Copy this ID (you'll need it later)

### Step 3: Create Database

1. **Navigate to Databases**
   - In your Appwrite project, click on **"Databases"** in the left sidebar
   - Click **"Create Database"** button
   - Enter a name: `pets_db` (or any name you prefer)
   - Click **"Create"**

2. **Copy Database ID**
   - After creation, you'll see your database listed
   - Click on the database name
   - **Copy the Database ID** from the URL or settings
   - It looks like: `6745xyz123abc456789`

### Step 4: Create Collection

1. **Create a New Collection**
   - Inside your database, click **"Create Collection"**
   - Name it: `pets` (or any name you prefer)
   - Click **"Create"**

2. **Copy Collection ID**
   - After creation, **copy the Collection ID**
   - You'll find it in the collection settings or URL
   - It looks like: `6745qrs123tuv456789`

### Step 5: Add Attributes to Collection

**Important**: Add these attributes in the exact order and format specified:

Click **"Attributes"** tab, then **"Create Attribute"** for each:

#### Pet Information Attributes:

1. **petName**
   - Type: `String`
   - Size: `255`
   - Required: ✅ Yes
   - Array: ❌ No

2. **species**
   - Type: `String`
   - Size: `100`
   - Required: ✅ Yes
   - Array: ❌ No

3. **breed**
   - Type: `String`
   - Size: `100`
   - Required: ✅ Yes
   - Array: ❌ No

4. **age**
   - Type: `Integer`
   - Min: `0`
   - Max: `100`
   - Required: ✅ Yes
   - Array: ❌ No

5. **gender**
   - Type: `String`
   - Size: `50`
   - Required: ✅ Yes
   - Array: ❌ No

6. **color**
   - Type: `String`
   - Size: `100`
   - Required: ✅ Yes
   - Array: ❌ No

7. **weight**
   - Type: `String`
   - Size: `50`
   - Required: ✅ Yes
   - Array: ❌ No

8. **description**
   - Type: `String`
   - Size: `1000`
   - Required: ✅ Yes
   - Array: ❌ No

9. **personality**
   - Type: `String`
   - Size: `100`
   - Required: ✅ Yes
   - **Array: ✅ YES** (This is important!)

10. **medicalInfo**
    - Type: `String`
    - Size: `500`
    - Required: ❌ No
    - Array: ❌ No

11. **imageUrl**
    - Type: `String`
    - Size: `500`
    - Required: ❌ No
    - Array: ❌ No

12. **petType**
    - Type: `String` (enum)
    - Size: `20`
    - Required: ❌ No
    - Array: ❌ No
    - **Valid values:** `dog`, `cat`, `other`
    - **Note:** Determines the default avatar emoji displayed

#### Owner Information Attributes:

13. **ownerName**
    - Type: `String`
    - Size: `255`
    - Required: ✅ Yes
    - Array: ❌ No

14. **ownerEmail**
    - Type: `String`
    - Size: `255`
    - Required: ✅ Yes
    - Array: ❌ No

15. **ownerPhone**
    - Type: `String`
    - Size: `50`
    - Required: ✅ Yes
    - Array: ❌ No

16. **ownerAddress**
    - Type: `String`
    - Size: `500`
    - Required: ❌ No
    - Array: ❌ No

17. **preferredContact**
    - Type: `String`
    - Size: `50`
    - Required: ✅ Yes
    - Array: ❌ No

### Step 6: Configure Permissions

**This is crucial for the microsite to work!**

1. Click on the **"Settings"** tab in your collection
2. Scroll down to **"Permissions"**
3. Click **"Add Role"**
4. Select **"Any"** from the dropdown
5. Check the **"Read"** permission box ✅
6. Click **"Update"**

**Note**: Only enable "Read" permission for public access. Never enable "Create", "Update", or "Delete" for "Any" role for security reasons.

### Step 7: Add Pet Data

1. **Create Your First Pet Document**
   - Go to the **"Documents"** tab in your collection
   - Click **"Create Document"**
   - Fill in all the fields:

   ```
   petName: Luna
   species: Dog
   breed: Golden Retriever
   age: 3
   gender: Female
   color: Golden
   weight: 28 kg
   description: Luna is a friendly and energetic Golden Retriever...
   personality: ["Friendly and social", "Loves to play fetch", "Great with children"]
   medicalInfo: Up to date on all vaccinations. Spayed.
   imageUrl: (leave empty or add image URL)
   petType: dog
   ownerName: John Doe
   ownerEmail: john.doe@example.com
   ownerPhone: +1 (555) 123-4567
   ownerAddress: 123 Pet Street, Pet City, PC 12345
   preferredContact: Email
   ```

2. **Copy the Document ID**
   - After creating the document, you'll see it listed
   - Click on the document to open it
   - **Copy the Document ID** (found at the top)
   - It looks like: `6745mno123pqr456789`
   - This ID is what you'll use in your URL: `?param=6745mno123pqr456789`

### Step 8: Configure Your Application

1. **Update Environment Variables**

   Open your `.env.local` file and update it with your Appwrite credentials:

   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
   NEXT_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id_here
   ```

   Replace each value with the IDs you copied in the previous steps.

2. **Example Configuration**

   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=6745abc123def456789
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=6745xyz123abc456789
   NEXT_PUBLIC_APPWRITE_COLLECTION_ID=6745qrs123tuv456789
   ```

### Step 9: Test Your Connection

1. **Restart Your Development Server**
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

2. **Test the URL**
   - Open your browser
   - Go to: `http://localhost:3000/?param=YOUR_DOCUMENT_ID`
   - Replace `YOUR_DOCUMENT_ID` with the Document ID you copied
   - Example: `http://localhost:3000/?param=6745mno123pqr456789`

3. **Verify Data Loads**
   - You should see your pet's information displayed
   - Check that the owner contact information is correct
   - If you see "Pet Not Found", double-check:
     - Document ID is correct
     - Permissions are set to allow "Read" for "Any"
     - Environment variables are correct
     - You've restarted the dev server

### Step 10: Deploy to Vercel (with Appwrite)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Appwrite configuration"
   git push
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - **Before deploying**, add environment variables:
     - Click "Environment Variables"
     - Add all four variables:
       - `NEXT_PUBLIC_APPWRITE_ENDPOINT`
       - `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
       - `NEXT_PUBLIC_APPWRITE_DATABASE_ID`
       - `NEXT_PUBLIC_APPWRITE_COLLECTION_ID`
     - Use the same values from your `.env.local`
   - Click "Deploy"

3. **Test Production**
   - After deployment, visit: `https://your-app.vercel.app/?param=YOUR_DOCUMENT_ID`
   - Verify everything works in production

### Troubleshooting

**Problem: "Pet Not Found" error**
- ✅ Verify Document ID is correct
- ✅ Check collection permissions (Read access for Any)
- ✅ Confirm environment variables are set correctly
- ✅ Make sure you've restarted the dev server

**Problem: "Failed to fetch" or connection errors**
- ✅ Check your internet connection
- ✅ Verify Appwrite endpoint URL is correct
- ✅ Confirm Project ID, Database ID, and Collection ID match
- ✅ Check Appwrite console for service status

**Problem: Personality traits not showing**
- ✅ Ensure "personality" attribute is set as an Array
- ✅ Enter personality traits as separate items in the array

**Problem: Environment variables not working on Vercel**
- ✅ Double-check all variable names start with `NEXT_PUBLIC_`
- ✅ Redeploy after adding/changing environment variables
- ✅ Check Vercel project settings → Environment Variables

### Quick Reference: Where to Find IDs

| ID Type | Where to Find It |
|---------|-----------------|
| **Project ID** | Project Dashboard → Top of page |
| **Database ID** | Databases → Click database → Copy from URL or settings |
| **Collection ID** | Database → Collections → Click collection → Copy from URL |
| **Document ID** | Collection → Documents → Click document → Top of page |

### Adding More Pets

To add additional pets to your microsite:

1. Go to your Appwrite collection
2. Click "Create Document"
3. Fill in all the pet and owner information
4. Copy the new Document ID
5. Share the URL: `https://your-domain.com/?param=NEW_DOCUMENT_ID`

Each pet gets its own unique URL based on its Document ID!

### Setting Up Found Pets Collection (Optional)

To enable the "Found Pet Report" feature, create a second collection for storing found pet reports:

1. **Create Found Pets Collection**
   - In your Appwrite database, click **"Create Collection"**
   - Name it: `found_pets` (or any name you prefer)
   - Click **"Create"**
   - Copy the Collection ID

2. **Add Attributes to Found Pets Collection**

   Click **"Attributes"** tab, then create these attributes:

   1. **petId** - String, Size: 100, Required: Yes
   2. **petName** - String, Size: 255, Required: Yes
   3. **finderName** - String, Size: 255, Required: Yes
   4. **finderEmail** - String, Size: 255, Required: Yes
   5. **finderPhone** - String, Size: 50, Required: Yes
   6. **location** - String, Size: 500, Required: Yes
   7. **message** - String, Size: 1000, Required: No
   8. **status** - String, Size: 20, Required: Yes (values: pending, contacted, resolved)
   9. **reportedAt** - String, Size: 50, Required: Yes

3. **Configure Permissions**
   - Click **"Settings"** tab
   - Add **"Create"** permission for **"Any"** role (allows public to submit reports)
   - Add **"Read"** permission for role with owner access only

4. **Update Environment Variables**
   - Add to your `.env.local` file:
     ```
     NEXT_PUBLIC_APPWRITE_FOUND_PETS_COLLECTION_ID=your_found_pets_collection_id
     ```

## Usage

### Demo Profile

To see the microsite in action, try the demo profile:

```
https://your-domain.com/?param=AIBO
```

This displays a sample Aibo (robotic dog) profile with demo data. Perfect for:
- Testing the microsite functionality
- Showing potential users what the site looks like
- Development and debugging

### Dynamic URLs

To view a specific pet's profile, use the URL parameter `param`:

```
https://your-domain.com/?param=DOCUMENT_ID
```

For example:
```
https://your-domain.com/?param=DOGSZ
https://your-domain.com/?param=673abc123def456
https://your-domain.com/?param=AIBO (demo)
```

### Avatar Types

The microsite displays different avatars based on the `petType` field:
- **dog**: 🐕 Dog emoji
- **cat**: 🐈 Cat emoji
- **other**: 🐾 Paw prints emoji

Set the `petType` field in your Appwrite document to customize the avatar.

### No Parameter Behavior

If no `param` is provided in the URL, the site will display a "No Data Detected" message with instructions on how to use the microsite and a link to the demo profile.

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
