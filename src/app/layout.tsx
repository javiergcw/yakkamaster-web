import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yakka - Connect Workers with Employers",
  description: "Yakka is a platform that connects skilled workers with employers across multiple industries including sports, labour, and hospitality. Find your next job opportunity or hire qualified professionals today.",
  keywords: [
    "jobs",
    "employment",
    "workers",
    "employers",
    "sports industry",
    "labour",
    "hospitality",
    "job search",
    "hiring",
    "workforce",
    "careers",
    "professional services"
  ],
  authors: [{ name: "Yakka Team" }],
  creator: "Yakka",
  publisher: "Yakka",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yakka.com",
    title: "Yakka - Connect Workers with Employers",
    description: "Connect skilled workers with employers across sports, labour, and hospitality industries. Find jobs or hire professionals today.",
    siteName: "Yakka",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Yakka Logo - Connect Workers with Employers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yakka - Connect Workers with Employers",
    description: "Connect skilled workers with employers across sports, labour, and hospitality industries.",
    images: ["/img/Yakka_logo.png"],
    creator: "@yakka",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2E7D32" },
    { media: "(prefers-color-scheme: dark)", color: "#1B5E20" },
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "/logo.png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "/logo.png" },
    ],
  },
  manifest: "/manifest.json",
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
