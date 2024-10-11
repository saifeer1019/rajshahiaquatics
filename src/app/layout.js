import localFont from "next/font/local";
import "./globals.css";
import { Providers } from '../redux/provider'; // 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Aquafarm",
  description: "Aquafarm",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
    <html lang="en">
    <UserProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Navbar></Navbar>
      <div className="min-h-[80vh]"> 
        {children}
        
      </div>
      <Footer></Footer>
      
      </body>
      </UserProvider>
    </html>
    </Providers>
  );
}
