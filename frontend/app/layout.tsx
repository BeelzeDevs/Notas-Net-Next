import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";



const urbanist = Urbanist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hirelens - Ignacio Aprile",
  description: "Hirelens challenge made by Ignacio Aprile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.className}`}
      >
        
        {children}
      
      </body>
    </html>
  );
}
