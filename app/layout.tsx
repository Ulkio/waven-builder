import "./globals.css";
import type { Metadata } from "next";
import { Barlow } from "next/font/google";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Waven deck builder",
  description: "Créez votre deck pour WAVEN !",
  verification: { google: "Qqh2MHF-7nAiuFHhr_saiaNgOeej7YaC3LSQOb-vzro" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  keywords: [
    "Waven",
    "Builder",
    "Waven Builder",
    "Waven Builds",
    "Waven Build",
    "Waven Deck",
    "Deck Waven",
    "Waven Deck Builder",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />

      <body className={barlow.className}>{children}</body>
    </html>
  );
}
