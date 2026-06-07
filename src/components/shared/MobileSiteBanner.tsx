import Image from "next/image";

export function MobileSiteBanner() {
  return (
    <div className="w-full">
      <div className="relative w-full h-6 overflow-hidden">
        <Image
          src="/banner.jpg"
          alt="ZONKED Banner"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  );
}
