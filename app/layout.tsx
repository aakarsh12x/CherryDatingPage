import type { Metadata } from "next";
import { Outfit, Lobster, Domine, Manrope } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-outfit',
  display: 'swap',
});

const lobster = Lobster({
  weight: '400',
  subsets: ["latin"],
  variable: '--font-lobster',
  display: 'swap',
});

const domine = Domine({
  subsets: ["latin"],
  variable: '--font-domine',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Cherry - Dating, but sweeter",
  description: "Experience a new way of dating. Premium matches, safe dates, and verified profiles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${lobster.variable} ${domine.variable} ${manrope.variable} font-sans bg-lightBackground text-primaryText antialiased`}>
        {children}
      </body>
    </html>
  );
}
