import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { LenisProvider } from "@/components/lenis-provider";
import "./globals.css";

/** Same display serif as `.editorial-design` (globals) — one stack site-wide. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ryan Purakal — Frontend Engineer & Designer",
  description:
    "Portfolio of Ryan Purakal — Rutgers student in CS & Data Science. Frontend, AI/ML, and Director of Technology at Health Decoded.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} dark h-full antialiased`}
    >
      <body className="min-h-full">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
