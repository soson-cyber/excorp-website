"use client";

import { useEffect, useRef, useState } from "react";

type ControlledVideoProps = {
  src: string;
  poster: string;
  label: string;
  playLabel: string;
  pauseLabel: string;
};

export function ControlledVideo({ src, poster, label, playLabel, pauseLabel }: ControlledVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantsPlaybackRef = useRef(true);
  const isVisibleRef = useRef(false);
  const reduceMotionRef = useRef(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPlayback = () => {
      const shouldPlay = isVisibleRef.current && wantsPlaybackRef.current && !reduceMotionRef.current;
      if (shouldPlay) {
        void video.play().catch(() => setPlaying(false));
      } else {
        video.pause();
      }
    };

    const onMotionChange = () => {
      reduceMotionRef.current = motion.matches;
      syncPlayback();
    };

    reduceMotionRef.current = motion.matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    motion.addEventListener("change", onMotionChange);

    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
      video.pause();
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      wantsPlaybackRef.current = true;
      void video.play().catch(() => setPlaying(false));
    } else {
      wantsPlaybackRef.current = false;
      video.pause();
    }
  };

  return (
    <div className="controlled-media">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        className="media-control focus-on-dark"
        aria-label={playing ? pauseLabel : playLabel}
        aria-pressed={playing}
        onClick={togglePlayback}
      >
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="m8 5 11 7-11 7z" />
          </svg>
        )}
        <span>{playing ? pauseLabel : playLabel}</span>
      </button>
    </div>
  );
}

export default ControlledVideo;
