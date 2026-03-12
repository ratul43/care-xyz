import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/home/Navbar";
import NextAuthProvider from "@/provider/NextAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://care-xyz-orcin.vercel.app"),

  title: {
    default: "Carexyz | Trusted Home Services Platform",
    template: "%s | Carexyz",
  },

  description:
    "Carexyz is a modern home service booking platform where you can find trusted professionals for baby care, cleaning, and household services.",

  keywords: [
    "home services",
    "cleaning service",
    "baby care",
    "household services",
    "service booking platform",
    "home maintenance",
  ],

  authors: [{ name: "Carexyz Team" }],
  creator: "Carexyz",
  publisher: "Carexyz",

  icons: {
    icon: "https://i.ibb.co.com/MyvsncRM/logo.png",
    shortcut: "https://i.ibb.co.com/MyvsncRM/logo.png",
    apple: "https://i.ibb.co.com/MyvsncRM/logo.png",
  },

  openGraph: {
    title: "Carexyz – Trusted Home Service Platform",
    description:
      "Book trusted home services like baby care, cleaning, and maintenance with Carexyz.",
    url: "https://yourdomain.com",
    siteName: "Carexyz",
    images: [
      {
        url: "https://i.ibb.co.com/p63m4B8c/homepage.png",
        width: 1200,
        height: 630,
        alt: "Carexyz Home Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Carexyz – Trusted Home Services",
    description:
      "Find trusted professionals for baby care, cleaning and home services.",
    images: ["https://i.ibb.co.com/p63m4B8c/homepage.png"],
    creator: "@Carexyz",
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://care-xyz-orcin.vercel.app/",
  },
};

export default function RootLayout({ children }) {
  return (
      <NextAuthProvider>
    <html lang="en">
    
<body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar></Navbar>
        {children}
      </body>

    
      
    </html>
  </NextAuthProvider>

  );
}
