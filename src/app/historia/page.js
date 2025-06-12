'use client';
import { useEffect, useRef, useState } from 'react';

export default function Historia() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autorizado, setAutorizado] = useState(false);
  const titleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hideIntro, setHideIntro] = useState(false);

  const fotosCapitulo1 = [
    {
      nome: "03.jpg",
      legenda: "Esse foi o dia em que demos uma das nossas primeiras saidas depois que volte pra Bélem você estava tão contente com minha chegada e eu mais ainda por ver você novamente."
    },
    {
      nome: "04.jpg",
      legenda: "Nossos momentos preguicinha, os primeiros dias com você em Benevides ficaram guardados como um dos melhores momentos da minha vida. Meu amor por você aumentava a cada dia."
    },
    {
      nome: "05.jpg",
      legenda: "Nossa primeira baladinha juntos, só me lembro que a volta da balada foi mlhor que a balada kkk."
    },
    {
      nome: "06.jpg",
      legenda: "Você no modo dentista cuidando de mim 💕"
    },
    {
      nome: "07.jpg",
      legenda: "Minha primeira ida a ilha, com você qualquer experienica se torna a melhor"
    },
    {
      nome: "08.jpg",
      legenda: "Enfim nossa primeira viagem juntos, estavamos tão animados nesse dia."
    },
    {
      nome: "09.jpg",
      legenda: "Você linda como sempre, teve gente até achando que tinhamos casado kkkk"
    },
    {
      nome: "10.jpg",
      legenda: "Nosso passeio radical de quadriciclo, so lembro de ficar queimado de tanto sol hahahaha"
    },
    {
      nome: "11.jpg",
      legenda: "Como sempre você sendo você e tendo razão, se nao fossemos pro lado leste teriamos perdido essa lagoa linda, não tanto quanto você."
    },
    {
      nome: "12.jpg",
      legenda: "Essa foto é engraçada pq todo mundo so prestou atenção na minha bunda 🤡"
    }
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

      {/* Hero Section com vídeo e mensagem */}
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

      {/* Conteúdo Principal */}
      <main style={{ maxWidth: '390px', margin: '0 auto', paddingTop: '40px' }}>
        <section className="capitulo" style={{ padding: '0 20px' }}>
          <div
            style={{ textAlign: 'center' }}
            ref={titleRef}
            className={`chapter-title ${isVisible ? 'visible' : ''}`}
          >
            <h2 className="capitulo-titulo">Capítulo 1: Nosso Início</h2>
          </div>

          <div className="foto-legenda" style={{ backgroundColor: '#fff3e0', padding: '15px', borderRadius: '12px', marginTop: '20px' }}>
            <img
              src="/inicio/01-primeiro-encontro.jpg"
              alt="Primeiro Encontro"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
            <p
              className="typewriter"
              data-text="Lembra desse dia? Nosso primeiro rolê na hamburgueria. Eu cheguei antes e fiquei ali, ansioso… Aí você chegou, linda, com aquele perfume que eu nunca esqueci. Quando você sentou do meu lado, foi ali que percebi… Eu já tava começando a gostar de você."
              style={{ fontSize: '1.1rem', lineHeight: '1.4', color: '#333', marginTop: '10px' }}
            />
          </div>

          <div className="foto-legenda" style={{ backgroundColor: '#fff3e0', padding: '15px', borderRadius: '12px', marginTop: '40px' }}>
            <img
              src="/inicio/02-selfie-no-inicio.jpg"
              alt="Selfie no Início"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
            <p
              className="typewriter"
              data-text="Esse foi o ‘último’ dia em Belém… Saímos pra jantar, como sempre eu fui de camarão, você pediu salmão — e tava delicioso. A gente dividiu a sobremesa, mas o gosto era meio agridoce, né? A conversa tava triste… parecia nosso último encontro. Mal sabíamos que aquilo era só o começo da nossa história."
              style={{ fontSize: '1.1rem', lineHeight: '1.4', color: '#333', marginTop: '10px' }}
            />
          </div>

          {fotosCapitulo1.map((foto, index) => (
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
                src={`/inicio/${foto.nome}`}
                alt={`Foto ${index + 3}`}
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
        <div style={{ textAlign: 'center', marginTop: '60px', paddingBottom: '80px' }}>
          <button
            onClick={() => {
              document.body.classList.add('pagina-virando');
              setTimeout(() => {
                window.location.href = '/capitulo2';
              }, 1200);
            }}
            style={{
              backgroundColor: '#ffcc80',
              color: '#4e342e',
              fontSize: '1.2rem',
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s ease',
            }}
          >
            ✨ Pronta pro Capítulo 2?
          </button>
        </div>
      </main>
    </>
  );
}
