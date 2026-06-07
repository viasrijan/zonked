import birthdays from "@/data/celebrity-birthdays.json";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface CelebBirthday {
  name: string;
  month: number;
  day: number;
  profession: string;
  country: string;
}

interface CelebWithPhoto extends CelebBirthday {
  photoUrl: string | null;
}

const CACHE_TTL = 7 * 24 * 60 * 60 * 1000;
const photoCache = new Map<string, { url: string | null; ts: number }>();

async function fetchPhoto(name: string): Promise<string | null> {
  const cached = photoCache.get(name);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.url;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`,
      {
        headers: {
          "User-Agent": "ZonkedNews/1.0 (https://zonked.vercel.app; contact@zonked.app)",
          "Accept": "application/json",
        },
        signal: controller.signal,
      }
    );
    clearTimeout(timer);
    if (!res.ok) {
      photoCache.set(name, { url: null, ts: Date.now() });
      return null;
    }
    const data = await res.json();
    const thumb = data?.thumbnail?.source;
    let url: string | null = null;
    if (thumb) {
      url = thumb.replace(/\/thumb\//, "/").replace(/\/\d+px-[^/]+$/, "");
    }
    photoCache.set(name, { url, ts: Date.now() });
    return url;
  } catch {
    photoCache.set(name, { url: null, ts: Date.now() });
    return null;
  }
}

async function getTodaysBirthdaysWithPhotos(): Promise<CelebWithPhoto[]> {
  const now = new Date();
  const month = now.getUTCMonth() + 1;
  const day = now.getUTCDate();
  const todays = (birthdays as CelebBirthday[])
    .filter((c) => c.month === month && c.day === day)
    .slice(0, 5);

  const withPhotos = await Promise.all(
    todays.map(async (c) => {
      const photoUrl = await fetchPhoto(c.name);
      return { ...c, photoUrl };
    })
  );
  return withPhotos;
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() || "")
    .join("");
}

const AVATAR_GRADIENTS = [
  "linear-gradient(160deg, #6b1437 0%, #3d0a1f 100%)",
  "linear-gradient(160deg, #134e62 0%, #082f3d 100%)",
  "linear-gradient(160deg, #0a4d32 0%, #052a1b 100%)",
  "linear-gradient(160deg, #5a2e15 0%, #331a0c 100%)",
  "linear-gradient(160deg, #6b1a3a 0%, #3d0f21 100%)",
  "linear-gradient(160deg, #3b1f6b 0%, #22124d 100%)",
  "linear-gradient(160deg, #0a3d4a 0%, #052229 100%)",
  "linear-gradient(160deg, #5a1024 0%, #330818 100%)",
];

export async function BirthdaysWidget() {
  const today = await getTodaysBirthdaysWithPhotos();
  if (today.length === 0) return null;

  return (
    <section>
      <SectionHeader title="Today's Birthdays" color="#ec4899" size="small" />
      <div className="grid grid-cols-5" style={{ background: "var(--bg-section, #151515)" }}>
        {today.map((c, i) => {
          const gradient = AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length];
          return (
            <div
              key={c.name}
              className="flex flex-col items-center justify-center p-2 sm:p-3"
              style={{
                background: gradient,
              }}
            >
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 mb-1 sm:mb-1.5 overflow-hidden"
                style={{ borderRadius: "50%" }}
              >
                {c.photoUrl ? (
                  <img
                    src={c.photoUrl}
                    alt={c.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-black text-base sm:text-xl" style={{ background: "rgba(0,0,0,0.2)" }}>
                    {initials(c.name)}
                  </div>
                )}
              </div>
              <div
                className="text-[11px] sm:text-sm font-bold text-center leading-tight line-clamp-1 w-full"
                style={{ color: "#ffffff", textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
              >
                {c.name}
              </div>
              <div
                className="text-[9px] sm:text-[11px] text-center line-clamp-1 w-full"
                style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
              >
                {c.profession}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
