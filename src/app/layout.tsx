import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FixWise — Smart Fixes. Trusted Pros.",
    template: "%s | FixWise",
  },
  description:
    "Practical DIY guides for common home repairs, maintenance, and remodeling. When the job is too big, connect with experienced, trusted contractors.",
  keywords: [
    "DIY home repair",
    "home maintenance",
    "find a contractor",
    "handyman",
    "plumbing repair",
    "drywall repair",
    "home improvement",
  ],
  openGraph: {
    type: "website",
    siteName: "FixWise",
    title: "FixWise — Smart Fixes. Trusted Pros.",
    description:
      "Practical DIY guides and experienced contractors for every home repair need.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
