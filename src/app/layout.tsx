import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import { LenisProvider } from "@/components/lenis-provider";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ryan Purakal — Frontend Engineer & Designer",
  description:
    "Portfolio of Ryan Purakal — Rutgers freshman in CS & Data Science. Frontend, AI/ML, and Director of Technology at Health Decoded.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${inter.variable} dark h-full antialiased`}
    >
      <body className="min-h-full">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
