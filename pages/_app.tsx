import Head from 'next/head';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>BV Móveis Rusticos</title>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
        <meta charSet='utf-8' />
        <meta name='robots' content='index, follow' />
        <meta name='keywords' content='BV Móveis, Móveis Rústicos, Mesas, Bancos, Armários, Madeira' />
        <meta name='description' content='Venha conferir nossos móveis feitos de madeira rústica. Avaliamos seu projeto!!' />
        <meta name='author' content='https://github.com/BrunoDevCode' />
        <meta httpEquiv="content-language" content="pt-br" />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
