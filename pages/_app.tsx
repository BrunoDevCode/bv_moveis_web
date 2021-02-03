import Head from 'next/head';
import type { AppProps } from 'next/app';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import '../styles/globals.css';

Sentry.init({
  dsn: "https://a884a05e49244ee0a4c10f38b2e225bd@o515965.ingest.sentry.io/5621773",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>BV Móveis Rusticos</title>
        <meta charSet='utf-8' />
        <meta name='robots' content='index, follow' />
        <meta name='description' content='Venha conferir nossos móveis feitos de madeira rústica. Avaliamos seu projeto!!' />
        <meta httpEquiv="content-language" content="pt-br" />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
