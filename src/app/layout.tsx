import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ReadingProgressWrapper } from "@/components/shared/ReadingProgressWrapper";
import { Analytics } from "@/components/shared/Analytics";

export const metadata: Metadata = {
  title: {
    default: "ZONKED — your daily dose of indian entertainment",
    template: "%s | ZONKED",
  },
  description:
    "Latest Bollywood news, celebrity gossip, TV updates, South cinema, Hollywood, K-pop, fashion and lifestyle — all in one place.",
  openGraph: {
    siteName: "ZONKED",
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="film-grain flex min-h-screen flex-col">
        <ReadingProgressWrapper />
        <Header />
        <main className="flex-1 pt-14">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
