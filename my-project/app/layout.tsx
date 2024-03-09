import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CookiesProvider } from 'next-client-cookies/server';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <CookiesProvider>
      <div className="flex flex-row gap-4 justify-end items-center justify-items-center min-h-max py-1 bg-white">
  
            <Link href={'/product'} className=" text-black font-bold py-2 px-2 rounded-lg hover:bg-slate-100">
              Create a new product
            </Link>
      
  
            <Link href={'#'} className=" text-black font-bold py-2 px-2 rounded-lg">
              Logout
            </Link>

        </div>
        {children}
      </CookiesProvider>
        
      </body>
    </html>
  );
}
