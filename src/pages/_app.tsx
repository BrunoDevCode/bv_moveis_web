import Head from 'next/head';
import type { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>BV Móveis Rústicos</title>
      </Head>

      <Component {...pageProps} />

      <footer>
        <p>
          Todos os direitos reservados &copy; Copyright{' '}
          {new Date().getFullYear()}
        </p>
      </footer>

      <GlobalStyle />
    </>
  );
}

export default MyApp;
