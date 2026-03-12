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
  title: {
   default: "Carexyz",
    template: "%s | Carexyz",
  },
  description: "Best Care Center",
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
