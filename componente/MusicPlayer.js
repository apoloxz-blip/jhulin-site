'use client';

import { useEffect, useRef } from 'react';

export default function MusicPlayer() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const play = () => {
        audio.play().catch(() => {});
      };
      document.addEventListener('click', play, { once: true });
      return () => document.removeEventListener('click', play);
    }
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/son.mp3" type="audio/mpeg" />
      Seu navegador não suporta áudio.
    </audio>
  );
}
