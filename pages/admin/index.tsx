import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import Cookie from 'js-cookie';

import styles from '../../styles/login.module.css';

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
        try {
          // await AsyncStorage.setItem('@token', token);
          Cookie.set('@token', token);
          router.push('/admin/launchpage', undefined, { shallow: true });
        } catch(error) {
          console.log(error);
        }
      })
      .catch(({ response: { data } }) => {
        alert(data.Error);
      })
  }

  return (
    <>
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