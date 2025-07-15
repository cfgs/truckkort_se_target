import { Footer } from "@/components/footer";
import { Geist, Geist_Mono, League_Spartan } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
});

import HeaderWrapper from "../components/HeaderWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${leagueSpartan.variable} antialiased`}>
        <HeaderWrapper />
        <main className="mt-12 content-wrapper container mx-auto p-4 lg:px-38 lg:py-8 text-2xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
