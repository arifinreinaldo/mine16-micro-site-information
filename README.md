# Pet Information Microsite

A beautiful and responsive microsite built with Next.js and Tailwind CSS to showcase pet information and owner contact details. Perfect for pet owners who want to share their pet's profile with a professional-looking website.

## Features

- **Dynamic Data Loading**: Integrated with Appwrite to fetch pet data dynamically via URL parameters
- **Image Carousel**: Support for multiple pet photos with automatic carousel navigation
- **Found Pet Report Form**: Allow finders to submit reports when they find a pet, notifying the owner
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
│   ├── globals.css       # Global styles
│   └── api/
│       └── report-found-pet/
│           └── route.ts  # API route for found pet submissions
├── components/
│   ├── PetProfile.tsx    # Pet profile component
│   ├── ImageCarousel.tsx # Image carousel for multiple photos
│   ├── ContactSection.tsx # Owner contact component (deprecated)
│   └── FoundPetForm.tsx  # Found pet report form
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
NEXT_PUBLIC_APPWRITE_FOUND_PETS_COLLECTION_ID=your_found_pets_collection_id  # Optional: for Found Pet Reports
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
    - **Note:** Deprecated - Use `imageUrls` for better multi-image support

12. **imageUrls**
    - Type: `String`
    - Size: `2000`
    - Required: ❌ No
    - Array: ✅ YES (This allows multiple photos!)
    - **Note:** Store multiple image URLs for carousel display

13. **petType**
    - Type: `String` (enum)
    - Size: `20`
    - Required: ❌ No
    - Array: ❌ No
    - **Valid values:** `dog`, `cat`, `other`
    - **Note:** Determines the default avatar emoji displayed

#### Owner Information Attributes:

14. **ownerName**
    - Type: `String`
    - Size: `255`
    - Required: ✅ Yes
    - Array: ❌ No

15. **ownerEmail**
    - Type: `String`
    - Size: `255`
    - Required: ✅ Yes
    - Array: ❌ No

16. **ownerPhone**
    - Type: `String`
    - Size: `50`
    - Required: ✅ Yes
    - Array: ❌ No

17. **ownerAddress**
    - Type: `String`
    - Size: `500`
    - Required: ❌ No
    - Array: ❌ No

18. **preferredContact**
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

### Step 7A: Adding Photos to Your Pet Profile

The microsite supports multiple photos with an automatic carousel. Here's how to add them:

**Note:** If you don't add any images, the microsite will automatically display a cute emoji avatar based on your pet's type (🐕 for dog, 🐈 for cat, 🐾 for other). You can start without images and add them later!

#### Option 1: Using Appwrite Storage (Recommended)

1. **Create a Storage Bucket**
   - In your Appwrite project, click **"Storage"** in the left sidebar
   - Click **"Create Bucket"**
   - Name it: `pet-images`
   - Click **"Create"**

2. **Configure Bucket Permissions**
   - Click on your new bucket
   - Go to **"Settings"** tab
   - Under **"Permissions"**, add **"Read"** permission for **"Any"** role
   - This allows public access to view images

3. **Upload Pet Photos**
   - Go to the **"Files"** tab in your bucket
   - Click **"Upload File"**
   - Select your pet photos (JPG, PNG, etc.)
   - Upload as many photos as you want (recommended: 2-5 photos)

4. **Get Image URLs**
   - After uploading, click on each image
   - Click the **"View"** button or copy the file URL
   - The URL format is: `https://cloud.appwrite.io/v1/storage/buckets/[BUCKET_ID]/files/[FILE_ID]/view?project=[PROJECT_ID]`
   - Copy each URL

5. **Add URLs to Your Pet Document**
   - Go back to **Databases** → Your collection → Your pet document
   - Click **"Update Document"**
   - In the `imageUrls` field (array), add each URL as a separate item:
     ```
     [
       "https://cloud.appwrite.io/v1/storage/buckets/pet-images/files/abc123/view?project=xyz",
       "https://cloud.appwrite.io/v1/storage/buckets/pet-images/files/def456/view?project=xyz",
       "https://cloud.appwrite.io/v1/storage/buckets/pet-images/files/ghi789/view?project=xyz"
     ]
     ```
   - Click **"Update"**

#### Option 2: Using External Image URLs (Imgur, Cloudinary, etc.)

1. **Upload to Image Host**
   - Use a service like [Imgur](https://imgur.com), [Cloudinary](https://cloudinary.com), or any image hosting service
   - Upload your pet photos
   - Copy the direct image URLs

2. **Add to Appwrite**
   - In your pet document, update the `imageUrls` array field
   - Add each image URL as a separate array item:
     ```
     [
       "https://i.imgur.com/abc123.jpg",
       "https://i.imgur.com/def456.jpg",
       "https://i.imgur.com/ghi789.jpg"
     ]
     ```

#### Option 3: Using Unsplash (For Demo/Testing)

For testing purposes, you can use Unsplash URLs:
```
[
  "https://images.unsplash.com/photo-1234567890?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-0987654321?w=800&h=800&fit=crop"
]
```

#### Image Carousel Features

- **Multiple Photos**: Upload 2-10 photos for the best experience
- **Navigation**: Users can click left/right arrows to browse photos
- **Dot Indicators**: Shows which photo is currently displayed
- **Image Counter**: Displays "1 / 3" in the top right
- **Responsive**: Works perfectly on mobile and desktop
- **Emoji Fallback**: If no images are provided, automatically shows a cute emoji avatar based on petType:
  - `dog` → 🐕 Dog emoji
  - `cat` → 🐈 Cat emoji
  - `other` → 🐾 Paw prints emoji

#### Tips for Best Results

- **Image Size**: Use images at least 800x800px for quality
- **Aspect Ratio**: Square images (1:1) work best
- **File Size**: Keep images under 2MB for fast loading
- **Variety**: Include different angles, close-ups, and action shots
- **Quality**: Use clear, well-lit photos

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
   NEXT_PUBLIC_APPWRITE_FOUND_PETS_COLLECTION_ID=6745def456ghi789012  # Optional
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
     - Add required variables:
       - `NEXT_PUBLIC_APPWRITE_ENDPOINT`
       - `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
       - `NEXT_PUBLIC_APPWRITE_DATABASE_ID`
       - `NEXT_PUBLIC_APPWRITE_COLLECTION_ID`
     - Add optional variable (if using Found Pet Reports):
       - `NEXT_PUBLIC_APPWRITE_FOUND_PETS_COLLECTION_ID`
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

To enable the "Found Pet Report" feature, you'll need to create a second collection for storing found pet reports.

**Quick Setup:**
1. Create a new collection named `found_pets` in your Appwrite database
2. Add the required attributes (see detailed instructions in the [Found Pet Report Feature](#found-pet-report-feature) section)
3. Configure permissions to allow public submissions
4. Add the collection ID to your environment variables

For complete setup instructions, see the **[Found Pet Report Feature](#found-pet-report-feature)** section below.

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

### Image Display

The microsite intelligently handles pet images:

**With Images:**
- Displays an image carousel with navigation arrows
- Shows dot indicators and image counter
- Supports multiple photos per pet

**Without Images (Emoji Avatar Fallback):**
- Automatically shows a cute emoji avatar based on `petType`:
  - **dog**: 🐕 Dog emoji
  - **cat**: 🐈 Cat emoji
  - **other**: 🐾 Paw prints emoji

Set the `petType` field in your Appwrite document to get the appropriate emoji avatar.

### No Parameter Behavior

If no `param` is provided in the URL, the site will display a "No Data Detected" message with instructions on how to use the microsite and a link to the demo profile.

## Found Pet Report Feature

The microsite includes a "Found Pet Report" form that allows people who find a lost pet to quickly notify the owner. This feature is displayed below the pet profile on every pet page.

### How It Works

1. **Finder Submits Report**: When someone finds a pet, they can fill out the form with:
   - Their name
   - Their phone number
   - Description of where/when they found the pet

2. **Data Stored in Appwrite**: The report is submitted to a separate Appwrite collection (`found_pets`) with:
   - Pet ID and name
   - Finder's contact information
   - Location and description
   - Timestamp and status

3. **Owner Access**: Pet owners can view submitted reports by accessing their Appwrite database directly

### Setting Up Found Pet Reports

To enable this feature, you need to create a second collection in Appwrite:

1. **Create the Collection**
   - In your Appwrite database, create a new collection named `found_pets`
   - Copy the Collection ID

2. **Add Required Attributes**:
   - `petId` - String, Size: 100, Required
   - `petName` - String, Size: 255, Required
   - `finderName` - String, Size: 255, Required
   - `finderEmail` - String, Size: 255, Required
   - `finderPhone` - String, Size: 50, Required
   - `location` - String, Size: 500, Required
   - `message` - String, Size: 1000, Optional
   - `status` - String, Size: 20, Required (values: `pending`, `contacted`, `resolved`)
   - `reportedAt` - String, Size: 50, Required

3. **Configure Permissions**
   - Add **"Create"** permission for **"Any"** role (allows public submissions)
   - Add **"Read"** permission for authenticated users/owners only

4. **Add Environment Variable**

   Update your `.env.local` file:
   ```env
   NEXT_PUBLIC_APPWRITE_FOUND_PETS_COLLECTION_ID=your_found_pets_collection_id
   ```

5. **Deploy with Variables**

   If deploying to Vercel, add the environment variable:
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_APPWRITE_FOUND_PETS_COLLECTION_ID`
   - Redeploy the application

### Viewing Found Pet Reports

To view submitted reports:

1. Log into your Appwrite console
2. Navigate to Databases → Your Database → `found_pets` collection
3. Click on the **Documents** tab
4. View all submitted reports with finder contact information
5. Update the `status` field as you process each report (`pending` → `contacted` → `resolved`)

### Form Validation

The form includes:
- Required field validation (name, phone, description)
- Submit button with loading state
- Success/error messages after submission
- Automatic form reset after successful submission

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
