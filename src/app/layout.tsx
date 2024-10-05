import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({subsets: ['latin']})

export const metadata: Metadata = {
  title: "VIChess",
  description: "Upload your game board images and let our advanced AI analyze your moves,offering real-time insights and strategies to help you improve your chess skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} flex flex-col min-h-screen`}
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
