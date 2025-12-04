import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pet Information Hub",
  description: "Your trusted pet profile and contact resource.",
  keywords: ["pet", "pet profile", "contact owner"],
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
