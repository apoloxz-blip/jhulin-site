// components/MusicPlayer.js
'use client';

import { useEffect, useRef } from 'react';

export default function MusicPlayer() {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current.play().catch(() => {
      // Se o navegador bloquear autoplay, espera uma interação do usuário.
      console.log('Autoplay bloqueado. Esperando interação do usuário.');
    });
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/son.mp3"
      loop
      preload="auto"
      style={{ display: 'none' }} // áudio fica invisível
    />
  );
}
