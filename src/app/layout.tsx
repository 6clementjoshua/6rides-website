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

const APP_NAME = "6Ride";
const TITLE = "6Ride — Premium mobility, built for modern Nigeria";
const DESCRIPTION =
  "6Ride is a premium ride-hailing brand in Nigeria with verified drivers, emergency support, partner-listed premium vehicles, and seamless online booking. Cross River (HQ), Abuja, Lagos, Port Harcourt, and Akwa Ibom.";

const OG_IMAGE = "/og-6ride.png";
const TW_IMAGE = "/twitter-6ride.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: TITLE,
    template: "%s — 6Ride",
  },

  description: DESCRIPTION,
  applicationName: APP_NAME,

  keywords: [
    "6Ride",
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
    "Obudu rides",
    "Nigeria transportation",
    "Nigeria mobility",
    "ride booking app Nigeria",
    "safe rides Nigeria",
    "comfortable rides Nigeria",
    "6Ride terms",
    "6Ride privacy",
    "6Ride safety",
    "6Ride insurance",
    "6Ride liability",
    "Tinapa rides",
    "Port Harcourt airport rides",
    "Uyo rides",
    "Uyo airport rides",
    "Benin City rides",
    "Asaba rides",
    "Enugu rides",
    "Awka rides",
    "Nsukka rides",
    "Onitsha rides",  
    "Nnewi rides",
    "Aba rides",
    "Owerri rides",
    "Umuahia rides",
    "Abakaliki rides",
    "Afikpo rides",
    "Ikot Ekpene rides",
    "Eket rides",
    "Oron rides",
    "Ikere Ekiti rides",
    "Ado Ekiti rides",
    "Ekiti transportation",
    "Ekiti mobility",
    "Ibadan rides",
    "Oyo rides",
    "Ogbomosho rides",
    "Ife rides",
    "Ilorin rides",
    "Kwara rides",
    "Ilashe rides",
    "Lekki rides",
    "Victoria Island rides",
    "Ikoyi rides",
    "Ajah rides",
    "Magodo rides",
    "Ogudu rides",
    "Gbagada rides",
    "Yaba rides",
    "Surulere rides",
    "Mushin rides",
    "Agege rides",
    "Festac rides",
    "Amuwo Odofin rides", 
    "Lagos Island rides",
    "Lagos Mainland rides",
    "Apapa rides",
    "Ikeja rides",
    "Maryland rides",
    "Computer Village rides",
    "Ogba rides",
    "Ojota rides",
    "Lagos transportation",
    "Lagos mobility",
    "Nigeria ride services",
    "Nigeria ride app",
    "Nigeria taxi app",
    "Nigeria car hire",
    "Nigeria vehicle hire",
    "Nigeria driver services",
    "Nigeria travel app",
    "Nigeria transport app",
    "Nigeria mobility solutions",
    "Nigeria premium rides",
    "Nigeria safe rides",
    "Nigeria comfortable rides",
    "Nigeria verified drivers",
    "Nigeria emergency support rides",
    "Nigeria partner vehicles",
    "Nigeria online ride booking",
    "Nigeria chauffeur services",
    "Nigeria corporate rides",
    "Nigeria airport rides",
    "Nigeria ride-hailing services",
    "Nigeria ride-hailing app",
    "Leading ride app Nigeria",
    "Top ride app Nigeria",
    "Best ride app Nigeria",  
    "Lekki transportation",
    "Lekki mobility",
    "Victoria Island transportation",
    "Victoria Island mobility",
    "Ikoyi transportation",
    "Ikoyi mobility",
    "Ajah transportation",
    "Ajah mobility",
    "Magodo transportation",
    "Magodo mobility",
    "Ogudu transportation",
    "Ogudu mobility",
    "Gbagada transportation",
    "Gbagada mobility",
    "Yaba transportation",
    "Yaba mobility",
    "Surulere transportation",
    "Surulere mobility",
    "Mushin transportation",
    "Mushin mobility",
    "Agege transportation",
    "Agege mobility",
    "Festac transportation",
    "Festac mobility",
    "Amuwo Odofin transportation",
    "Amuwo Odofin mobility",
    "Lagos Island transportation",
    "Lagos Island mobility",
    "Lagos Mainland transportation",
    "Lagos Mainland mobility",
    "Apapa transportation",
    "Apapa mobility",
    "Ikeja transportation",
    "Ikeja mobility",
    "Maryland transportation",
    "Maryland mobility",
    "Computer Village transportation",
    "Computer Village mobility",
    "Ogba transportation",
    "Ogba mobility",
    "Ojota transportation",
    "Ojota mobility",
    "Maitama rides",
    "Wuse rides",
    "Garki rides",
    "Asokoro rides",
    "Gwarinpa rides",
    "Kubwa rides",
    "Jabi rides",
    "Lokogoma rides",
    "Utako rides",
    "Nigeria safe transportation",
    "Nigeria comfortable transportation",
    "Nigeria verified driver services",
    "Nigeria emergency support transportation",
    "Nigeria partner vehicle services",
    "Nigeria online transportation booking",
    "Nigeria chauffeur transportation",
    "Nigeria corporate transportation",
    "Nigeria airport transportation",
    "Asokoro transportation",
    "Asokoro mobility",
    "Maitama transportation",
    "Maitama mobility",
    "Wuse transportation",
    "City transportation",
    "calabar transportation",
    "Port Harcourt transportation",
    "Uyo transportation",
    "Akwa Ibom transportation",
    "Cross River transportation",
    "Calabar mobility",
    "Port Harcourt mobility",
    "Uyo mobility",
    "Akwa Ibom mobility",
    "Cross River mobility",
    "university transportation Nigeria",
    "school transportation Nigeria",
    "student transportation Nigeria",
    "tutor transportation Nigeria",
    "event transportation Nigeria",
    "guardian-approved transportation Nigeria",
    "Etabor transportation",
    "Sapele transportation",
    "Warri transportation",
    "Effurun transportation",
    "Udu transportation",
    "Agbor transportation",
    "Ozoro transportation",
    "Ughelli transportation",
    "Oghara transportation",
    "Burutu transportation",
    "Niger Delta transportation",
    "Delta State transportation",
    "Delta State mobility",
    "Niger Delta mobility",
    "Watt-market transportation",
    "Watt-market mobility",
    "paliamentary transportation Nigeria",
    "government transportation Nigeria",
    "official transportation Nigeria",
    "diplomatic transportation Nigeria",
    "embassy transportation Nigeria",
    "consulate transportation Nigeria",
    "NGO transportation Nigeria",
    "non-profit transportation Nigeria",
    "international organization transportation Nigeria",

  ],

  authors: [{ name: "6Ride" }],
  creator: "6Ride",
  publisher: "6Ride",
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
        alt: "6Ride — Premium mobility, built for modern Nigeria",
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
