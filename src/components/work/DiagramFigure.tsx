"use client";

import { useEffect, useRef, useState } from "react";

export default function DiagramFigure({
  src,
  title,
  caption = "Architecture",
  note = "// hand-built portfolio diagram · click to view full size",
  alt = `${title} architecture diagram`,
}: {
  src: string;
  title: string;
  caption?: string;
  note?: string;
  alt?: string;
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <figure className="mt-12">
      <figcaption className="mb-3.5 flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.14em] text-muted">
        {caption} <span className="h-px flex-1 bg-line" />
      </figcaption>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Zoom ${alt}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-white shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]"
      >
        <span
          aria-hidden="true"
          className="absolute right-2.5 top-2.5 rounded-md bg-black/55 px-2 py-1 font-mono text-[11px] text-white"
        >
          ⤢ zoom
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
      </button>

      <p className="mt-2.5 font-mono text-[12px] text-muted">{note}</p>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-[4vw]"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            aria-label={`Close ${alt}`}
            className="absolute right-4 top-4 font-mono text-[13px] text-[#c9d1d9] hover:text-white"
          >
            <span aria-hidden="true">✕</span> esc
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] max-w-full rounded-lg bg-white"
          />
        </div>
      )}
    </figure>
  );
}
