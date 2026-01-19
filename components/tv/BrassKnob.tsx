"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type BrassKnobProps = {
  rotation: number;
  onClick?: () => void;
  active?: boolean;

  /**
   * Optional enhancement:
   * If provided, wheel/drag will emit steps (-1 or +1)
   * so you can go previous/next channel like a real TV dial.
   */
  onStep?: (direction: -1 | 1) => void;

  /**
   * Optional: knob sensitivity (lower = more sensitive)
   * Default is good for both desktop and touch.
   */
  stepDegrees?: number;
};

export function BrassKnob({
  rotation,
  onClick,
  active = false,
  onStep,
  stepDegrees = 18,
}: BrassKnobProps) {
  const knobRef = useRef<HTMLDivElement | null>(null);

  const [dragging, setDragging] = useState(false);
  const dragStartAngleRef = useRef<number | null>(null);
  const accumulatedDeltaRef = useRef(0);

  const baseRotation = useMemo(() => {
    // Clamp rotation for stability; you can remove this if you want infinite rotation visuals.
    const normalized = ((rotation % 360) + 360) % 360;
    return normalized;
  }, [rotation]);

  const getAngleFromCenter = (clientX: number, clientY: number) => {
    const el = knobRef.current;
    if (!el) return 0;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = clientX - cx;
    const dy = clientY - cy;

    // atan2 gives angle in radians; convert to degrees
    const rad = Math.atan2(dy, dx);
    const deg = (rad * 180) / Math.PI;

    return deg;
  };

  const emitStepFromDelta = (deltaDeg: number) => {
    // Accumulate small movements and emit step only when threshold reached
    accumulatedDeltaRef.current += deltaDeg;

    while (accumulatedDeltaRef.current >= stepDegrees) {
      accumulatedDeltaRef.current -= stepDegrees;
      onStep?.(1);
    }

    while (accumulatedDeltaRef.current <= -stepDegrees) {
      accumulatedDeltaRef.current += stepDegrees;
      onStep?.(-1);
    }
  };

  // --- DRAG: mouse / touch ---
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Capture pointer so we still receive move events even if leaving the element
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);

    setDragging(true);
    dragStartAngleRef.current = getAngleFromCenter(e.clientX, e.clientY);
    accumulatedDeltaRef.current = 0;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;

    const prev = dragStartAngleRef.current;
    if (prev === null) return;

    const next = getAngleFromCenter(e.clientX, e.clientY);

    // Delta angle
    let delta = next - prev;

    // Fix angle wrap-around jumping
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    dragStartAngleRef.current = next;

    if (onStep) {
      emitStepFromDelta(delta);
    }
  };

  const onPointerUp = () => {
    setDragging(false);
    dragStartAngleRef.current = null;
    accumulatedDeltaRef.current = 0;
  };

  // --- WHEEL support ---
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!onStep) return;

    e.preventDefault(); // prevents scroll while dialing

    // Wheel direction: down => next, up => previous
    const dir = e.deltaY > 0 ? 1 : -1;
    onStep(dir as -1 | 1);
  };

  // Prevent accidental click firing after drag
  const clickLockRef = useRef(false);

  useEffect(() => {
    if (dragging) clickLockRef.current = true;

    if (!dragging && clickLockRef.current) {
      // allow click again after a moment
      const t = setTimeout(() => {
        clickLockRef.current = false;
      }, 120);

      return () => clearTimeout(t);
    }
  }, [dragging]);

  const onSafeClick = () => {
    if (clickLockRef.current) return;
    onClick?.();
  };

  return (
    <div
      ref={knobRef}
      onClick={onSafeClick}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
      className="relative select-none"
      style={{
        width: "88px",
        height: "88px",
        cursor: dragging ? "grabbing" : "grab",
        transform: `rotate(${baseRotation}deg)`,
        transition: dragging ? "none" : "transform 150ms ease",
        touchAction: "none", // IMPORTANT for mobile drag
        filter: active
          ? "drop-shadow(0 0 12px rgba(212, 175, 55, 0.35))"
          : "none",
      }}
      aria-label="TV knob"
      role="button"
    >
      {/* Main knob body */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #f4d03f, #d4af37 35%, #b8960c 70%, #7a5f00 100%)",
          boxShadow:
            "inset 0 2px 4px rgba(255,255,255,0.35), inset 0 -6px 12px rgba(0,0,0,0.5), 0 10px 18px rgba(0,0,0,0.55)",
          border: "2px solid rgba(0,0,0,0.35)",
        }}
      />

      {/* Knurling / ridges */}
      <div className="absolute inset-[6px] rounded-full pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              width: "2px",
              height: "10px",
              background: "rgba(0,0,0,0.25)",
              transform: `translate(-50%, -50%) rotate(${i * 15}deg) translateY(-34px)`,
              borderRadius: "2px",
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* Inner center cap */}
      <div
        className="absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: "38px",
          height: "38px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), rgba(0,0,0,0.25))",
          border: "1px solid rgba(0,0,0,0.25)",
          boxShadow:
            "inset 0 2px 5px rgba(0,0,0,0.45), 0 2px 4px rgba(255,255,255,0.08)",
        }}
      />

      {/* Pointer indicator */}
      <div
        className="absolute left-1/2 top-[8px] -translate-x-1/2 rounded-full"
        style={{
          width: "10px",
          height: "18px",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.65), rgba(0,0,0,0.25))",
          border: "1px solid rgba(0,0,0,0.25)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.45)",
          opacity: active ? 1 : 0.85,
        }}
      />

      {/* Active ring glow */}
      <div
        className="absolute inset-[-4px] rounded-full pointer-events-none"
        style={{
          border: active ? "2px solid rgba(212,175,55,0.45)" : "2px solid transparent",
          boxShadow: active
            ? "0 0 20px rgba(212,175,55,0.35)"
            : "none",
          transition: "all 200ms ease",
        }}
      />
    </div>
  );
}
