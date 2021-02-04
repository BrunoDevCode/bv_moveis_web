import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import Cookie from 'js-cookie';
import Alert from '../../components/Alert/alert';

import styles from '../../styles/login.module.css';
import Head from 'next/head';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  async function handleMakeLogin(e: FormEvent) {
    e.preventDefault();

    const data = {
      email,
      password,
    }

    api.post('/admin/login', data)
      .then(async ({ data: { token } }) => {
        // try {
        //   // await AsyncStorage.setItem('@token', token);
        //   Cookie.set('@token', token);
        //   router.push('/admin/launchpage', undefined, { shallow: true });
        // } catch (error) {
        //   console.log(error);
        // }

        return (
          <Alert type='sucess' message='Login Executado com Sucesso' />
        )
      })
      .catch(error => {
        // <Alert type='error' message={data.message} />
        // alert(error.response);
        console.log(error);
        console.log(error.response);
        console.log(error.response.data);
        console.log(error.response.message);
      })
  }

  return (
    <>
      <Head>
        <meta name='robots' content='no' />
      </Head>
      <header className={styles.header}>
        <div className={styles.logoBV}>
          <img src="/logo.jpg" alt="Logo BV Moveis" />
        </div>
        <h1>BV Móveis</h1>
      </header>

      <div className={styles.container}>
        <form onSubmit={handleMakeLogin} autoComplete='off'>
          <h2>Bem-vindo de volta</h2>

          <div className={styles.input_group}>
            <label htmlFor="email">E-mail :</label>
            <input type="email" id='email' value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="pass">Senha :</label>
            <input type="password" id='pass' value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <button type='submit'>Login</button>

          <Link href="/">
            <a className={styles.return_link}>Cancelar e Ir para homepage</a>
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;