import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Analytics } from "@/components/shared/Analytics";

export const metadata: Metadata = {
  title: {
    default: "Zonked - Your Daily Dose of Indian Entertainment",
    template: "%s | Zonked",
  },
  description:
    "Latest Bollywood news, celebrity gossip, TV updates, South cinema, Hollywood, K-pop, fashion and lifestyle - all in one place.",
  openGraph: {
    siteName: "Zonked",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
