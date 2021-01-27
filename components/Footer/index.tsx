import { FaWhatsapp, FaInstagram } from 'react-icons/fa'

import styles from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.container}>
      <p>Avaliamos seu projeto! Entre em contato</p>

      <a target='_blank' href="https://www.instagram.com/bvmoveis_rusticos/">
        <FaInstagram size={24} color='white' className={styles.icons} />
        Instagram
      </a>

      <a target='_blank' href={`https://wa.me/+5531995877646`}>
        <FaWhatsapp size={24} color='green' className={styles.icons} />
        Whatsapp
      </a>
    </footer>
  );
}

export default Footer;