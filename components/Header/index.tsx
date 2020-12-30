import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';

import styles from './header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.responsive_title}>BV Móveis</h1>
      <input type="checkbox" id="menu-check" className={styles.menu_check} />
      <label htmlFor="menu-check" className={styles.menu_bars}>
        <FiMenu size={32} color='white' />
      </label>

      <div className={styles.menu}>
        <h1>
          <div className={styles.logoBV}>
            <img src="/logo.jpg" alt="Logo BV Moveis" />
          </div>
          <Link href='/'>
            <a id='bv_moveis_link'>BV Móveis</a>
          </Link>
        </h1>

        <Link href='/' >
          <a className={styles.responsive_homepage_link}>Pagina Inicial</a>
        </Link>

        <Link href='/items/'>
          <a>Nossos Produtos</a>
        </Link>

        <Link href='/admin/'>
          <a>Área Restrita</a>
        </Link>
      </div>
    </header>
  );
}

export default Header;