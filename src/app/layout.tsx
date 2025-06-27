import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RobertAI | Power & Strategies",
  description:
    "Your personal power strategist blending timeless wisdom with AI.",
  icons: {
    icon: "/favicon.ico", // make sure you place favicon.ico inside your /public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#fdf9f3] text-[#1a1a1a]`}
      >
        {children}
      </body>
    </html>
  );
}
