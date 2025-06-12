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
      legenda: "Nossa fase de convivência, viramos avós em pouquíssimo tempo kkk"
    },
    {
      nome: "14.jpg",
      legenda: "Nossa viagem pros lençóis maranhenses, parecia o deserto do Saara hahahaha"
    },
    {
      nome: "15.jpg",
      legenda: "Meu primeiro carnaval, nunca fui de sair no carnaval mas com você eu topo tudo."
    },
    {
      nome: "16.jpg",
      legenda: "Se o mundo acabasse nesse dia, eu morreria feliz"
    },
{
      nome: "17.jpg",
      legenda: "Seu aniversário de 26 anos, espero sempre esta ao seu lado vendo seu crescimento."
    },
{
      nome: "18.jpg",
      legenda: "Nosso jantar do dia dos namorados, nem parece que eu fiz raiva pra você nesse dia, me perdoe pelos meus erros, você sabe como sempre tento ser melhor pra você."
    },
{
      nome: "19.jpg",
      legenda: "Nosso período mais focado, precisamos voltar hein."
    },
{
      nome: "20.jpg",
      legenda: "Essas duas ultimas fotos resumem bem esse nosso capitulo hahahaha."
    },
{
      nome: "21.jpg",
      legenda: "Eu amo você!!!"
    },
{
      nome: "22.jpg",
      legenda: "Nosso primeiro picnic, nunca tinha feito isso antes, você tem as melhores ideias!"
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
// No final do return do seu componente, antes do fechamento da tag main ou section

<>
  {/* Frase especial */}
  <div
    style={{
      textAlign: 'center',
      fontSize: '1.5rem',
      fontWeight: '700',
      marginTop: '50px',
      marginBottom: '20px',
      color: '#ff4d6d', // cor romântica, rosa/vermelho
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}
  >
    Feliz Dia dos Namorados! 💖
  </div>

  {/* Botão para capítulo 3 */}
  <div style={{ textAlign: 'center', marginBottom: '50px' }}>
    <button
      onClick={() => window.location.href = '/capitulo3'}
      style={{
        backgroundColor: '#ff4d6d',
        color: '#fff',
        border: 'none',
        padding: '12px 30px',
        borderRadius: '30px',
        cursor: 'pointer',
        fontSize: '1.1rem',
        fontWeight: '600',
        boxShadow: '0 4px 8px rgba(255, 77, 109, 0.4)',
        transition: 'background-color 0.3s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e43e5b'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ff4d6d'}
      aria-label="Ir para o Capítulo 3"
    >
      Próximo Capítulo →
    </button>
  </div>
</>
      </main>
    </>
  );
}
