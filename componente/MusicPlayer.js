'use client';

import { useEffect, useRef, useState } from 'react';

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    const permitido = localStorage.getItem('musicaPermitida');
    if (permitido === 'true') {
      setAutorizado(true);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (autorizado && audio) {
      audio.play().catch(() => {});
    }
  }, [autorizado]);

  return (
    <audio ref={audioRef} loop>
      <source src="/son.mp3" type="audio/mpeg" />
      Seu navegador não suporta áudio.
    </audio>
  );
}
