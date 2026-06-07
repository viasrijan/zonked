"use client";

import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { Header } from "@/components/layout/Header";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { Footer } from "@/components/layout/Footer";
import { MobileFooter } from "@/components/layout/MobileFooter";
import { BannerWrapper } from "@/components/shared/BannerWrapper";
import { MobileSiteBanner } from "@/components/shared/MobileSiteBanner";

interface ResponsiveLayoutProps {
  children: ReactNode;
}

export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        <MobileHeader />
        <main className="flex-1 pt-14">
          <MobileSiteBanner />
          {children}
        </main>
        <MobileFooter />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <BannerWrapper />
        {children}
      </main>
      <Footer />
    </>
  );
}
