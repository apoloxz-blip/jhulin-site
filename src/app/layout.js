import '@/style/globals.css';
import Head from 'next/head';
import MusicPlayer from '@/components/MusicPlayer'; // 👈 importa aqui

export const metadata = {
  title: 'Jhulin & Irving',
  description: 'Nossa história de amor 💖',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="author" content="Irving & Jhulin" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jhulin-irving-sz.netlify.app" />
        <meta property="og:image" content="https://jhulin-irving-sz.netlify.app/og-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://jhulin-irving-sz.netlify.app/og-image.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="root-body">
        <MusicPlayer /> {/* 👈 música em todas as páginas */}
        {children}
      </body>
    </html>
  );
}
