import Image from "next/image";

export function SiteBanner() {
  return (
    <div className="w-full animate-in">
      <div className="mx-auto max-w-[1200px] px-3 sm:px-4">
        <div className="relative w-full h-6 sm:h-7 overflow-hidden">
          <Image
            src="/banner.jpg"
            alt="ZONKED Banner"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </div>
  );
}
