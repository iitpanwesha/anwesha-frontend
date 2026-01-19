"use client";

import { useEffect, useMemo, useState } from "react";

type ImageContent = {
  id: number;
  name: string;
  url: string;
  signal: string;
};

type VideoContent = {
  id: number;
  name: string;
  videoId: string;
  signal: string;
};

type CRTScreenProps = {
  content: ImageContent | VideoContent;
  mode: "image" | "video";
};

export function CRTScreen({ content, mode }: CRTScreenProps) {
  const [isSwitching, setIsSwitching] = useState(false);

  /**
   * Short static “channel switch” effect whenever content changes.
   */
  useEffect(() => {
    setIsSwitching(true);
    const t = setTimeout(() => setIsSwitching(false), 140);
    return () => clearTimeout(t);
  }, [mode, (content as any)?.id]);

  const label = useMemo(() => {
    return content?.name || "UNKNOWN";
  }, [content]);

  const signal = useMemo(() => {
    return (content as any)?.signal || (mode === "video" ? "Audio/Video" : "Visual Feed");
  }, [content, mode]);

  const isImage = mode === "image";
  const isVideo = mode === "video";

  // If image mode but url missing -> NO SIGNAL
  const imageUrl = isImage ? (content as ImageContent)?.url : "";

  return (
    <div className="relative">
      {/* Outer CRT frame */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "420px",
          height: "320px",
          borderRadius: "28px",
          background: "radial-gradient(circle at 30% 20%, #2b2b2b, #0a0a0a 70%)",
          border: "6px solid rgba(0,0,0,0.7)",
          boxShadow:
            "inset 0 0 30px rgba(0,0,0,0.9), 0 10px 25px rgba(0,0,0,0.6)",
        }}
      >
        {/* Content Area */}
        <div
          className="absolute inset-0"
          style={{
            borderRadius: "24px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Switching static overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              opacity: isSwitching ? 0.85 : 0,
              transition: "opacity 120ms ease-out",
              background:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.04), rgba(255,255,255,0.04) 2px, rgba(0,0,0,0.05) 4px)",
              mixBlendMode: "overlay",
              filter: "contrast(140%)",
            }}
          />

          {/* Actual media */}
          {isVideo ? (
            <div className="absolute inset-0 z-10">
              <iframe
                key={(content as VideoContent).videoId}
                loading="lazy"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${
                  (content as VideoContent).videoId
                }?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`}
                title={label}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                style={{
                  border: "none",
                  filter: "brightness(0.85) contrast(1.08) saturate(1.05)",
                }}
              />
            </div>
          ) : imageUrl ? (
            <div className="absolute inset-0 z-10">
              {/* IMPORTANT:
                 Using <img> for Drive links avoids Next/Image domain config issues.
                 Also prevents extra processing overhead. */}
              <img
                key={imageUrl}
                src={imageUrl}
                alt={label}
                className="w-full h-full object-cover select-none"
                draggable={false}
                loading="eager"
                style={{
                  filter: "brightness(0.9) contrast(1.05) saturate(1.08)",
                  transform: "scale(1.02)", // tiny zoom for CRT feel
                }}
              />
            </div>
          ) : (
            // NO SIGNAL fallback
            <div
              className="absolute inset-0 z-10 flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(40,40,40,0.9), rgba(0,0,0,0.98) 70%)",
              }}
            >
              <div className="text-center">
                <div
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontFamily: "monospace",
                    fontSize: "18px",
                    letterSpacing: "0.2em",
                    textShadow: "0 0 10px rgba(255,255,255,0.15)",
                  }}
                >
                  NO SIGNAL
                </div>
                <div
                  style={{
                    marginTop: "8px",
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "monospace",
                    fontSize: "12px",
                  }}
                >
                  Upload images / check Drive links
                </div>
              </div>
            </div>
          )}

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background:
                "repeating-linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, rgba(0,0,0,0) 3px)",
              opacity: 0.35,
              mixBlendMode: "multiply",
            }}
          />

          {/* Vignette + edge darkening */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          {/* Glass reflection */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0) 40%)",
              opacity: 0.35,
              mixBlendMode: "screen",
            }}
          />

          {/* Subtle flicker noise */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              opacity: 0.07,
              backgroundImage:
                "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"120\" height=\"120\" filter=\"url(%23n)\" opacity=\"0.35\"/></svg>')",
              mixBlendMode: "overlay",
              animation: "crtNoise 0.8s steps(2) infinite",
            }}
          />

          {/* Bottom info bar */}
          <div
            className="absolute bottom-0 left-0 right-0 z-40 px-3 py-2 flex items-center justify-between"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
              color: "rgba(255,255,255,0.75)",
              fontFamily: "monospace",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textShadow: "0 0 6px rgba(0,0,0,0.9)",
            }}
          >
            <span>{label}</span>
            <span style={{ color: "rgba(0,255,150,0.7)" }}>{signal}</span>
          </div>
        </div>
      </div>

      {/* Small inline keyframes (safe & isolated) */}
      <style jsx>{`
        @keyframes crtNoise {
          0% {
            transform: translate(0px, 0px);
          }
          20% {
            transform: translate(-1px, 1px);
          }
          40% {
            transform: translate(1px, -1px);
          }
          60% {
            transform: translate(-1px, 0px);
          }
          80% {
            transform: translate(1px, 1px);
          }
          100% {
            transform: translate(0px, -1px);
          }
        }
      `}</style>
    </div>
  );
}
