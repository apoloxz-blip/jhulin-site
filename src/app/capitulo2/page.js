'use client';
import { useEffect, useRef, useState } from 'react';

export default function Capitulo2() {
  const titleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const fotosCapitulo2 = [
    { nome: "13.jpg", legenda: "Nossa fase de convivência, viramos avós em pouquíssimo tempo kkk" },
    { nome: "14.jpg", legenda: "Nossa viagem pros lençóis maranhenses, parecia o deserto do Saara hahahaha" },
    { nome: "15.jpg", legenda: "Meu primeiro carnaval, nunca fui de sair no carnaval mas com você eu topo tudo." },
    { nome: "16.jpg", legenda: "Se o mundo acabasse nesse dia, eu morreria feliz" },
    { nome: "17.jpg", legenda: "Seu aniversário de 26 anos, espero sempre estar ao seu lado vendo seu crescimento." },
    { nome: "18.jpg", legenda: "Nosso jantar do dia dos namorados, nem parece que eu fiz raiva pra você nesse dia, me perdoe pelos meus erros, você sabe como sempre tento ser melhor pra você." },
    { nome: "19.jpg", legenda: "Nosso período mais focado, precisamos voltar hein." },
    { nome: "20.jpg", legenda: "Essas duas últimas fotos resumem bem esse nosso capítulo hahahaha." },
    { nome: "21.jpg", legenda: "Eu amo você!!!" },
    { nome: "22.jpg", legenda: "Nosso primeiro picnic, nunca tinha feito isso antes, você tem as melhores ideias!" }
  ];

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
      if (titleRef.current) observer.unobserve(titleRef.current);
    };
  }, []);

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
      }, 30);
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

  return (
    <main style={{ maxWidth: '390px', margin: '0 auto', padding: '20px 15px', paddingBottom: '80px' }}>
      <section className="capitulo2">
        <div
          style={{ textAlign: 'center', opacity: isVisible ? 1 : 0, transition: 'opacity 1.5s ease' }}
          ref={titleRef}
        >
          <h2 className="capitulo-titulo">Capítulo 2: Histórias de Nós Dois</h2>
        </div>

        {fotosCapitulo2.map((foto, i) => (
          <div
            key={i}
            style={{ marginTop: '40px' }}
          >
            <img
              src={`/2capitulo/${foto.nome}`}
              alt={`Foto capítulo 2 - ${i + 13}`}
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
            <p
              className="typewriter"
              data-text={foto.legenda}
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.4',
                color: '#333',
                marginTop: '10px',
                backgroundColor: 'transparent',
                padding: 0,
                border: 'none'
              }}
            />
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <button
            onClick={() => window.location.href = '/capitulo3'}
            style={{
              backgroundColor: '#ff4d6d',
              color: '#fff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '30px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              fontWeight: '600',
              boxShadow: '0 4px 8px rgba(255, 77, 109, 0.4)',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e43e5b')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#ff4d6d')}
            aria-label="Ir para o Capítulo 3"
          >
            Pronta para o Capítulo 3?
          </button>
        </div>
      </section>
    </main>
  );
}
