import Link from 'next/link';

import { FaWhatsapp, FaInstagram } from 'react-icons/fa'

import styles from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.container}>
      <a target='_blank' href="https://www.instagram.com/bvmoveis_rusticos/">
        <FaInstagram size={24} color='white' className={styles.icons} />
        Instagram
      </a>

      <a target='_blank' href={`https://wa.me/+5531975743244`}>
        <FaWhatsapp size={24} color='white' className={styles.icons} />
        Whatsapp
      </a>
    </footer>
  );
}

export default Footer;