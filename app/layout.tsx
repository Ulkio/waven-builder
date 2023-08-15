import "./globals.css";
import type { Metadata } from "next";
import { Barlow } from "next/font/google";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Waven builder",
  description: "Créez votre build pour WAVEN et partagez-le !",
  verification: { google: "Qqh2MHF-7nAiuFHhr_saiaNgOeej7YaC3LSQOb-vzro" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />

      <body className={barlow.className}>{children}</body>
    </html>
  );
}
