import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Care4Pets Clinic",
  icons: [
    { rel: "icon", url: "/Care4PETSfav.png" }, // Or pngs
  ],
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
   
      <body className="scrollbar-hide overflow-auto">
        <div className="fixed inset-0 -z-50">
          <div className="absolute inset-0 bg-gradient-to-br bg-background opacity-100" />
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <div className="min-h-screen w-full flex flex-col">
          <Navbar />
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}