import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haramain Broadcast | Volunteer Portal",
  description: "Official volunteer recruitment portal for Haramain Broadcast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased font-sans">
        <main className="flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
