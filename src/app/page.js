'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Carta() {
  const router = useRouter();
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (isOpening) return;

    // Toca o som da carta
    const somCarta = new Audio('/carta.mp3');
    somCarta.play();

    // Para o som depois de 3 segundos
    setTimeout(() => {
      somCarta.pause();
      somCarta.currentTime = 0;
    }, 3000);

    // Libera a música e dispara o evento
    localStorage.setItem('musicaLiberada', 'true');
    window.dispatchEvent(new Event('musicaLiberada'));

    setIsOpening(true);

    setTimeout(() => {
      router.push('/historia');
    }, 1800);
  };

  return (
    <div className="carta-container" style={{ textAlign: 'center', padding: '20px' }}>
      <h1 className="titulo-namorados" style={{ marginBottom: '20px' }}>
        Feliz Dia dos Namorados
      </h1>
      <div
        className={`carta ${isOpening ? 'abrindo' : ''}`}
        onClick={handleClick}
        style={{ cursor: isOpening ? 'default' : 'pointer', display: 'inline-block' }}
      >
        <img
          src={isOpening ? '/carta-aberta.png' : '/carta-fechada.png'}
          alt="Carta"
        />
      </div>
      {!isOpening && (
        <p className="mensagem-clique" style={{ marginTop: '15px', fontSize: '1.1rem' }}>
          Clique na carta para receber seu presente 💌
        </p>
      )}
    </div>
  );
}
