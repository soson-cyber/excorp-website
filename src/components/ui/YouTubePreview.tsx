"use client";

import Image from "next/image";
import { useState } from "react";

type YouTubePreviewProps = {
  videoId: string;
  poster: string;
  title: string;
  playLabel: string;
};

export function YouTubePreview({ videoId, poster, title, playLabel }: YouTubePreviewProps) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=1&playsinline=1&rel=0&modestbranding=1`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        style={{ border: 0 }}
      />
    );
  }

  return (
    <button
      type="button"
      className="youtube-preview focus-on-dark"
      aria-label={playLabel}
      onClick={() => setActive(true)}
    >
      <Image src={poster} alt="" fill sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover" />
      <span className="youtube-preview__shade" aria-hidden="true" />
      <span className="youtube-preview__play" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="m8 5 11 7-11 7z" />
        </svg>
      </span>
      <span className="youtube-preview__label">{playLabel}</span>
    </button>
  );
}

export default YouTubePreview;
