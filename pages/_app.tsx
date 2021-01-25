import Head from 'next/head';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>BV Móveis Rusticos</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='keywords' content='BV Móveis, Móveis Rústicos, Mesas, Bancos, Armários, Madeira' />
        <meta name='description' content='Venha conferir nossos móveis feitos de madeira rústica. Avaliamos seu projeto!!' />
        <meta name='author' content='https://github.com/BrunoDevCode' />
        <meta httpEquiv="content-language" content="pt-br" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
