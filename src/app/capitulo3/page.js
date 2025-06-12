import Link from 'next/link';

export default function Capitulo3() {
  return (
    <main className="container">
      <h1>Capítulo 3: Nosso Final Feliz</h1>

      <section className="texto-capitulo">
        <p>
          Desde o primeiro instante que nossos caminhos se cruzaram, eu sabia que nossa história ia ser diferente.
          Você é meu porto seguro, minha inspiração e a razão de tantos sorrisos espontâneos.
        </p>
        <p>
          Cada momento com você é um capítulo único, cheio de amor, respeito e cumplicidade.
          Nossa relação é a minha maior conquista, o que me faz querer ser melhor todo dia.
        </p>
        <p>
          Eu te amo mais do que palavras conseguem dizer, e quero continuar escrevendo essa história linda,
          lado a lado, com a certeza de que o melhor ainda está por vir.
        </p>
      </section>

      <h2>Feliz Dia dos Namorados! 💖</h2>

      <div className="botao-final">
        <Link href="/">
          <button className="btn">Voltar para o Início</button>
        </Link>
      </div>
    </main>
  );
}
