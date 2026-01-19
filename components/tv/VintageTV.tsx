"use client";

import { useEffect, useMemo, useState } from "react";
import { BrassKnob } from "./BrassKnob";
import { CRTScreen } from "./CRTScreen";

export type TVImageInput = {
  name?: string;
  url: string;
};

type TVImageContent = {
  id: number;
  name: string;
  url: string;
  signal: string;
};

type TVVideoContent = {
  id: number;
  name: string;
  videoId: string;
  signal: string;
};

export function VintageTV({ images }: { images: TVImageInput[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [mode, setMode] = useState<"image" | "video">("image");

  /**
   * Convert incoming images into the exact shape CRTScreen expects.
   * useMemo prevents rebuilding the array on every render.
   */
  const tvImages: TVImageContent[] = useMemo(() => {
  //   return (images || []).map((img, index) => ({
  //     id: index + 1,
  //     name: img.name?.trim() || `CH ${String(index + 1).padStart(2, "0")}`,
  //     url: img.url,
  //     signal: "Visual Feed",
  //   }));
  // }, [images]);// for working with google drive images we can use this 
return [
    {
      id: 1,
      name: "TEST IMAGE 1",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      signal: "Visual Feed",
    },
    {
      id: 2,
      name: "TEST IMAGE 2",
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
      signal: "Visual Feed",
    },
  ];
}, []);
  /**
   * Your existing demo music/videos (YouTube IDs).
   * You can replace these later or pass as props if needed.
   */
  const videos: TVVideoContent[] = useMemo(
    () => [
      {
      id: 1,
      name: "YOUTUBE VIDEO 1",
      videoId: "S-ukmg7hPnk",
      signal: "Audio/Video",
    },
    {
      id: 2,
      name: "YOUTUBE VIDEO 2",
      videoId: "FSBZHSo1zVw",
      signal: "Audio/Video",
    },

    ],
    []
  );

  /**
   * Keep indexes safe if images list changes.
   */
  useEffect(() => {
    if (tvImages.length === 0) {
      setCurrentImageIndex(0);
      if (mode === "image") setMode("video");
      return;
    }

    if (currentImageIndex >= tvImages.length) {
      setCurrentImageIndex(0);
    }
  }, [tvImages.length, currentImageIndex, mode]);

  const handleImageChange = () => {
    if (tvImages.length === 0) return;

    setCurrentImageIndex((prev) => (prev + 1) % tvImages.length);
    setMode("image");
  };

  const handleVideoChange = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    setMode("video");
  };

  // Safe content fallback
  const activeContent =
    mode === "image"
      ? tvImages[currentImageIndex] ??
        ({
          id: 0,
          name: "NO SIGNAL",
          url: "",
          signal: "No images loaded",
        } as TVImageContent)
      : videos[currentVideoIndex];

  return (
    // ✅ overflow-visible prevents antennas/legs from clipping
    <div className="relative overflow-visible">
      {/* Screen glow effect */}
      <div
        className="absolute inset-0 blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            mode === "video"
              ? "radial-gradient(ellipse at center, rgba(255, 100, 200, 0.3), transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(0, 255, 100, 0.4), transparent 70%)",
        }}
      />

      {/* TV Antennas */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 flex gap-12 pointer-events-none">
        {/* Left antenna */}
        <div
          className="w-1 h-32 origin-bottom"
          style={{
            background: "linear-gradient(to top, #8b7355, #c0c0c0)",
            transform: "rotate(-25deg)",
            boxShadow:
              "0 0 10px rgba(0, 0, 0, 0.5), inset 1px 0 1px rgba(255, 255, 255, 0.3)",
          }}
        >
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 -translate-x-1" />
        </div>

        {/* Right antenna */}
        <div
          className="w-1 h-32 origin-bottom"
          style={{
            background: "linear-gradient(to top, #8b7355, #c0c0c0)",
            transform: "rotate(25deg)",
            boxShadow:
              "0 0 10px rgba(0, 0, 0, 0.5), inset 1px 0 1px rgba(255, 255, 255, 0.3)",
          }}
        >
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 -translate-x-1" />
        </div>
      </div>

      {/* Main TV chassis */}
      <div
        className="relative rounded-[40px] p-2 shadow-2xl"
        style={{
          // ✅ responsive sizing (fixes broken look)
          width: "min(700px, 92vw)",
          height: "auto",
          aspectRatio: "700 / 520",

          background:
            "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%)",
          boxShadow:
            "0 30px 60px rgba(0, 0, 0, 0.8), inset 0 2px 4px rgba(255, 255, 255, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Gold/Brass trim border */}
        <div
          className="absolute inset-0 rounded-[40px] pointer-events-none"
          style={{
            border: "6px solid transparent",
            borderImage:
              "linear-gradient(135deg, #d4af37, #f4d03f, #b8960c, #d4af37) 1",
            borderRadius: "40px",
            boxShadow:
              "inset 0 0 20px rgba(212, 175, 55, 0.3), 0 0 30px rgba(212, 175, 55, 0.2)",
          }}
        />

        {/* Inner wood panel */}
        <div
          className="relative w-full h-full rounded-[36px] p-6"
          style={{
            background:
              "linear-gradient(135deg, #3e2723 0%, #5d4037 25%, #4e342e 50%, #3e2723 75%, #2c1810 100%)",
          }}
        >
          {/* Wood grain overlay */}
          <div
            className="absolute inset-0 rounded-[36px] opacity-30 pointer-events-none mix-blend-multiply"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  rgba(0, 0, 0, 0.1) 2px,
                  rgba(0, 0, 0, 0.1) 4px
                ),
                repeating-linear-gradient(
                  0deg,
                  rgba(139, 90, 43, 0.2),
                  rgba(101, 67, 33, 0.3) 8px,
                  rgba(139, 90, 43, 0.2) 16px
                )
              `,
            }}
          />

          {/* Decorative speaker grille */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-40">
            <div
              className="w-full h-full rounded-lg bg-gradient-to-b from-black/40 to-black/60 p-2"
              style={{
                border: "2px solid rgba(212, 175, 55, 0.3)",
              }}
            >
              <div className="w-full h-full grid grid-cols-3 gap-[2px]">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full bg-black/50"
                    style={{
                      boxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.8)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="relative flex items-center justify-between h-full">
            {/* Screen */}
            <div className="flex-1 flex items-center justify-center">
              <CRTScreen content={activeContent as any} mode={mode} />
            </div>

            {/* Knobs */}
            <div className="flex flex-col items-center gap-12 ml-8">
              <div className="flex flex-col items-center gap-2">
                <BrassKnob
                  rotation={currentImageIndex * 60}
                  onClick={handleImageChange}
                  active={mode === "image"}
                />
                <span
                  className="text-amber-200/70 text-xs tracking-wider"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  IMAGES
                </span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <BrassKnob
                  rotation={currentVideoIndex * 72}
                  onClick={handleVideoChange}
                  active={mode === "video"}
                />
                <span
                  className="text-amber-200/70 text-xs tracking-wider"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  MUSIC
                </span>
              </div>
            </div>
          </div>

          {/* Brand badge */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <span
              className="text-amber-200/50 tracking-[0.3em] text-sm"
              style={{ fontFamily: "Georgia, serif" }}
            >
              RETROVIEW ◆ 1974
            </span>
          </div>

          {/* Mode indicator lights */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-6">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  mode === "image"
                    ? "bg-green-400 shadow-[0_0_10px_rgba(0,255,100,0.8)]"
                    : "bg-gray-600"
                }`}
              />
              <span
                className="text-amber-200/50 text-xs"
                style={{ fontFamily: "Georgia, serif" }}
              >
                IMG
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  mode === "video"
                    ? "bg-pink-400 shadow-[0_0_10px_rgba(255,100,200,0.8)]"
                    : "bg-gray-600"
                }`}
              />
              <span
                className="text-amber-200/50 text-xs"
                style={{ fontFamily: "Georgia, serif" }}
              >
                VID
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Wooden legs */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-[400px] pointer-events-none">
        {/* Left leg */}
        <div
          className="relative"
          style={{
            width: "80px",
            height: "100px",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #8B4513 0%, #654321 50%, #3e2723 100%)",
              clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
              boxShadow:
                "0 10px 20px rgba(0, 0, 0, 0.6), inset 2px 0 4px rgba(139, 90, 43, 0.3)",
            }}
          />

          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0, 0, 0, 0.2) 4px, rgba(0, 0, 0, 0.2) 6px)",
              clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
            }}
          />

          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full"
            style={{
              background: "radial-gradient(ellipse at center, #d4af37, #b8960c)",
              boxShadow:
                "0 4px 8px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
            }}
          />
        </div>

        {/* Right leg */}
        <div
          className="relative"
          style={{
            width: "80px",
            height: "100px",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #8B4513 0%, #654321 50%, #3e2723 100%)",
              clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
              boxShadow:
                "0 10px 20px rgba(0, 0, 0, 0.6), inset 2px 0 4px rgba(139, 90, 43, 0.3)",
            }}
          />

          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0, 0, 0, 0.2) 4px, rgba(0, 0, 0, 0.2) 6px)",
              clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
            }}
          />

          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full"
            style={{
              background: "radial-gradient(ellipse at center, #d4af37, #b8960c)",
              boxShadow:
                "0 4px 8px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
