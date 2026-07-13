"use client";

import { useRef, useState } from "react";

export function MobileVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const player = useRef<HTMLVideoElement>(null);
  const [retried, setRetried] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (!retried && player.current) {
      setRetried(true);
      player.current.load();
      return;
    }
    setFailed(true);
  };

  return <div className="mobile-video-player">
    <video ref={player} src={src} poster={poster} controls muted playsInline preload="metadata" aria-label={label} onError={handleError}/>
    {failed && <button type="button" onClick={() => { setFailed(false); setRetried(false); player.current?.load(); }}>{label} · Retry</button>}
  </div>;
}
