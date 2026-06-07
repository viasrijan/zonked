"use client";

import { getTrendingSongs } from "@/lib/spotify/trending";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Play, Pause } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function AppleMusicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Apple Music">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

export function TrendingSongsClient({ initialSongs }: { initialSongs: Awaited<ReturnType<typeof getTrendingSongs>> }) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  if (initialSongs.length === 0) return null;

  const togglePlay = (song: TrendingSongClientSong) => {
    if (!song.previewUrl || !audioRef.current) return;
    const audio = audioRef.current;
    if (playingId === song.id) {
      audio.pause();
      setPlayingId(null);
      setProgress(0);
    } else {
      audio.src = song.previewUrl;
      audio.currentTime = 0;
      audio.ontimeupdate = () => {
        if (audio.duration > 0) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      };
      audio.onended = () => {
        setPlayingId(null);
        setProgress(0);
      };
      audio.onerror = () => {
        setPlayingId(null);
        setProgress(0);
      };
      audio.play().then(() => {
        setPlayingId(song.id);
      }).catch((err) => {
        console.error("Audio play failed:", err);
        setPlayingId(null);
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ background: "var(--bg-section, #151515)" }}>
      {initialSongs.map((song, idx) => {
        const isPlaying = playingId === song.id;
        return (
          <div
            key={song.id}
            className="group relative flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 transition-colors border-t sm:border-t-0 lg:border-t-0"
            style={{ borderColor: "rgba(255,255,255,0.04)" }}
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 overflow-hidden flex-shrink-0"
              style={{ borderRadius: "3px" }}
            >
              {song.cover ? (
                <img
                  src={song.coverSmall || song.cover}
                  alt={song.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full" style={{ background: "#333" }} />
              )}
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <div
                className="text-[11px] sm:text-xs font-bold leading-tight"
                style={{ color: "var(--text-muted, #888)" }}
              >
                {String(song.rank).padStart(2, "0")}
              </div>
              <div
                className="text-sm sm:text-base font-bold truncate leading-tight mt-0.5"
                style={{ color: "var(--text-primary, #ffffff)" }}
              >
                {song.title}
              </div>
              <div
                className="text-xs sm:text-sm truncate mt-0.5"
                style={{ color: "var(--text-muted, #999)" }}
              >
                {song.artist}
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {song.previewUrl && (
                <button
                  onClick={() => togglePlay(song)}
                  aria-label={isPlaying ? "Pause preview" : "Play preview"}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    backgroundColor: "#1DB954",
                    color: "#ffffff",
                    borderRadius: "50%",
                  }}
                >
                  {isPlaying ? <Pause className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="#ffffff" /> : <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="#ffffff" />}
                </button>
              )}
              <a
                href={song.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open in Apple Music"
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: "#FA243C",
                  color: "#ffffff",
                  borderRadius: "50%",
                }}
              >
                <AppleMusicIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
            </div>
            {isPlaying && (
              <div
                className="absolute bottom-0 left-0 h-0.5 transition-all"
                style={{
                  width: `${progress}%`,
                  backgroundColor: "#1DB954",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

type TrendingSongClientSong = Awaited<ReturnType<typeof getTrendingSongs>>[number];

export async function TrendingSongs() {
  const songs = await getTrendingSongs(15);

  return (
    <section>
      <SectionHeader
        title="Trending Songs"
        color="#1DB954"
        size="small"
      />
      <div
        style={{
          background: "var(--bg-section, #151515)",
        }}
      >
        <TrendingSongsClient initialSongs={songs} />
      </div>
    </section>
  );
}
