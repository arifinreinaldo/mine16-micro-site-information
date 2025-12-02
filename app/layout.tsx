import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pet Information Hub | Luna's Profile",
  description: "Welcome to Luna's pet profile. Get to know our friendly Golden Retriever and find owner contact information.",
  keywords: ["pet", "dog", "golden retriever", "pet profile", "contact owner"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
