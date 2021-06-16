import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import Cookie from 'js-cookie';
import LoginState from '../../components/LoginState';

import styles from '../../styles/login.module.css';
import Head from 'next/head';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginState, setLoginState] = useState(false);

  const router = useRouter();

  async function handleMakeLogin(e: FormEvent) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    api
      .post('/admin/login', data, {
        onUploadProgress: (event) => {
          let progress: number = Math.round((event.loaded * 100) / event.total);

          if (progress !== event.total) {
            setLoginState(true);
          }
        },
      })
      .then(async ({ data: { token } }) => {
        setLoginState(false);
        Cookie.set('@token', token);
        router.push('/admin/launchpage', undefined, { shallow: true });
      });
  }

  return (
    <>
      <Head>
        <meta name="robots" content="no" />
        <title>Back Office - BV Móveis</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.logoBV}>
          <img src="/logo.jpg" alt="Logo BV Moveis" />
        </div>
        <h1>BV Móveis</h1>
      </header>

      <LoginState status={loginState} />

      <div className={styles.container}>
        <form onSubmit={handleMakeLogin} autoComplete="off">
          <h2>Bem-vindo de volta</h2>

          <div className={styles.input_group}>
            <label htmlFor="email">E-mail :</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="pass">Senha :</label>
            <input
              type="password"
              id="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Login</button>

          <Link href="/">
            <a className={styles.return_link}>Cancelar e Ir para homepage</a>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
