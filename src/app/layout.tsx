'use client';

import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-sm border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">
                Ansku
              </Link>
              <nav className="flex gap-6">
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Koti
                </Link>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  CV
                </Link>
                <Link href="/blog" className="hover:text-blue-600 transition-colors">
                  Blog
                </Link>
                <Link href="/english" className="hover:text-blue-600 transition-colors">
                  In English
                </Link>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Yhteys
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
