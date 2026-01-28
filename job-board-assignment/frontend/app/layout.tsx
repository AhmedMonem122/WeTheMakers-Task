import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanstackQueryContextProvider from "@/context/TanstackQueryContextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Board",
  description:
    "Job Board is a full-stack job board application built with Next.js, React, TypeScript, MongoDB, and Express.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F7FAFC] text-[#0D141C]`}
      >
        <TanstackQueryContextProvider>{children}</TanstackQueryContextProvider>
      </body>
    </html>
  );
}
