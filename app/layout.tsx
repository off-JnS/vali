import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToneController } from "@/components/ToneController";
import { MotionProvider } from "@/components/MotionProvider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  // „latin“ deckt Umlaute, ß, „“ und € ab – latin-ext würde nur Gewicht kosten
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ReSpin Studios – Neue Objekte aus alten Schallplatten",
    template: "%s – ReSpin Studios",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    title: "ReSpin Studios – Neue Objekte aus alten Schallplatten",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Logo steckt in einer CSS-Maske – ohne Preload würde der Browser es erst spät entdecken
  preload("/images/logo/respin-studios-logo.png", { as: "image", fetchPriority: "high" });

  return (
    <html lang="de" data-tone="dark" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-svh antialiased">
        <a
          href="#inhalt"
          className="sr-only z-[70] rounded-full bg-accent px-5 py-3 font-medium text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Zum Inhalt springen
        </a>
        <MotionProvider>
          <ToneController />
          <Header />
          <main id="inhalt">{children}</main>
          <Footer />
        </MotionProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
