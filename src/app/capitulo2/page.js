'use client';
import { useEffect, useRef, useState } from 'react';

export default function Capitulo2() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autorizado, setAutorizado] = useState(false);
  const titleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hideIntro, setHideIntro] = useState(false);

  const fotosCapitulo2 = [
    {
      nome: "13.jpg",
      legenda: "Lembra desse dia? A gente caminhando pela praia, sentindo a brisa e só curtindo o momento."
    },
    {
      nome: "14.jpg",
      legenda: "Essa foi a viagem que mudou tudo. Entre risadas e aventuras, descobrimos ainda mais um do outro."
    },
    {
      nome: "15.jpg",
      legenda: "Aquele pôr do sol inesquecível que a gente jurou nunca esquecer."
    },
    {
      nome: "16.jpg",
      legenda: "Só nós dois, contra o mundo, vivendo cada instante como se fosse o último."
    },
  ];

  const handlePlayMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      setAutorizado(true);
      localStorage.setItem('musicaLiberada', 'true');
    }
  };

  useEffect(() => {
    const liberado = localStorage.getItem('musicaLiberada') === 'true';
    if (liberado) {
      setAutorizado(true);
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, []);

  // Máquina de escrever
  useEffect(() => {
    const elements = document.querySelectorAll('.typewriter');

    const typeWriterEffect = (el) => {
      if (el.dataset.typed === 'true') return;
      el.dataset.typed = 'true';

      const text = el.getAttribute('data-text');
      let i = 0;
      el.innerHTML = "";

      const interval = setInterval(() => {
        if (i < text.length) {
          el.innerHTML += text.charAt(i);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeWriterEffect(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  // Esconde mensagem inicial ao rolar
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setHideIntro(true);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/son.mp3" loop preload="auto" />

      {!autorizado && (
        <button
          onClick={handlePlayMusic}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            background: '#fff3d6',
            padding: '10px 20px',
            border: '2px solid #ffb347',
            borderRadius: '10px',
            cursor: 'pointer',
            zIndex: 9999,
            fontWeight: 'bold',
            color: '#333',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            userSelect: 'none',
          }}
          aria-label="Abrir carta e tocar música"
        >
          📬 Abrir Carta
        </button>
      )}

      <header
        style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          backgroundColor: 'red',
        }}
      >
        <img
          src="/black.jpg"
          alt="Imagem preta"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        />
      </header>

      <main style={{ maxWidth: '390px', margin: '0 auto', paddingTop: '40px' }}>
        <section className="capitulo" style={{ padding: '0 20px' }}>
          <div
            style={{ textAlign: 'center' }}
            ref={titleRef}
            className={`chapter-title ${isVisible ? 'visible' : ''}`}
          >
            <h2 className="capitulo-titulo">Capítulo 2: Histórias de Nós Dois</h2>
          </div>

          <div className="foto-legenda" style={{ backgroundColor: '#fff3e0', padding: '15px', borderRadius: '12px', marginTop: '20px' }}>
            <img
              src="/2capitulo/01-nova-aventura.jpg"
              alt="Nova aventura"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
            <p
              className="typewriter"
              data-text="Essa foi a nossa nova aventura juntos, cheia de descobertas e momentos inesquecíveis."
              style={{ fontSize: '1.1rem', lineHeight: '1.4', color: '#333', marginTop: '10px' }}
            />
          </div>

          {fotosCapitulo2.map((foto, index) => (
            <div
              key={index}
              className="foto-legenda"
              style={{
                backgroundColor: '#fff3e0',
                padding: '15px',
                borderRadius: '12px',
                marginTop: '40px'
              }}
            >
              <img
                src={`/2capitulo/${foto.nome}`}
                alt={`Foto capítulo 2 - ${index + 2}`}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px'
                }}
              />
              <p
                className="typewriter"
                data-text={foto.legenda}
                style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.4',
                  color: '#333',
                  marginTop: '10px'
                }}
              />
            </div>
          ))}

        </section>
      </main>
    </>
  );
}
