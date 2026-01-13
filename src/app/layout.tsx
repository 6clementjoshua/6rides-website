import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Update this when your final domain is ready
const SITE_URL = "https://www.6rides.com";

const APP_NAME = "6Rides";
const TITLE = "6Rides — Premium mobility, built for modern Nigeria";
const DESCRIPTION =
  "6Rides is a premium ride-hailing brand in Nigeria with verified drivers, emergency support, partner-listed premium vehicles, and seamless online booking. Cross River (HQ), Abuja, Lagos, Port Harcourt, and Akwa Ibom.";

const OG_IMAGE = "/og-6ride.png";
const TW_IMAGE = "/twitter-6ride.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: TITLE,
    template: "%s — 6Rides",
  },

  description: DESCRIPTION,
  applicationName: APP_NAME,

  keywords: [
    "6Rides",
    "6Ride",
    "ride hailing Nigeria",
    "premium ride Nigeria",
    "book a ride Nigeria",
    "chauffeur Nigeria",
    "corporate rides Nigeria",
    "airport pickup Nigeria",
    "verified drivers Nigeria",
    "emergency support ride Nigeria",
    "partner vehicles Nigeria",
    "Cross River rides",
    "Calabar rides",
    "Abuja rides",
    "Lagos rides",
    "Port Harcourt rides",
    "Akwa Ibom rides",
  ],

  authors: [{ name: "6Rides" }],
  creator: "6Rides",
  publisher: "6Rides",
  category: "Transportation",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: APP_NAME,
    locale: "en_NG",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "6Rides — Premium mobility, built for modern Nigeria",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [TW_IMAGE],
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },

  // Helps some crawlers understand your brand identity
  other: {
    "apple-mobile-web-app-title": APP_NAME,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

function buildJsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_NAME,
    url: SITE_URL,
    logo: new URL("/favicon.png", SITE_URL).toString(),
    sameAs: [
      // Add your official social links when ready
      // "https://x.com/...",
      // "https://www.instagram.com/...",
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "TransportationService",
    name: APP_NAME,
    url: SITE_URL,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Cross River" },
      { "@type": "City", name: "Abuja" },
      { "@type": "City", name: "Lagos" },
      { "@type": "City", name: "Port Harcourt" },
      { "@type": "AdministrativeArea", name: "Akwa Ibom" },
    ],
    serviceType: [
      "Ride-hailing",
      "Chauffeur & corporate rides",
      "Premium partner vehicles",
      "Emergency response support",
      "Food delivery",
    ],
    brand: { "@type": "Brand", name: APP_NAME },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME,
    url: SITE_URL,
    inLanguage: "en-NG",
  };

  return [org, localBusiness, website];
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = buildJsonLd();

  return (
    <html lang="en-NG" suppressHydrationWarning>
      <head>
        {/* Basic SEO helpers */}
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/* Optional: add when you have these files */}
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="sitemap" href="/sitemap.xml" />
        <link rel="canonical" href={SITE_URL} />

        {/* JSON-LD structured data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
