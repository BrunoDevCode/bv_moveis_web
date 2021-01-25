import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Item } from '../../components/Item';
import { MdPowerSettingsNew } from 'react-icons/md';
import Cookie from 'js-cookie';

import { api } from '../../services/api';

import styles from '../../styles/launchpage.module.css';

const Launchpage: React.FC = ({ items }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  async function handleMakeLoggof() {
    Cookie.remove('@token');
    router.push('/') ;
  }

  return (
    <>
      <header className={styles.header}>
        <Link href="/admin/new-item">
          <a>Criar novo produto</a>
        </Link>
        <button
          className={styles.button_loggof}
          onClick={handleMakeLoggof}
        >
          <MdPowerSettingsNew size={24} color='#E57878' />
        </button>
      </header>

      <div className={styles.container}>
        <ul className={styles.item_container}>
          {items.map((item: Item) => (
            <li className={styles.item} key={item._id}>
              <div className={styles.item_image}>
                <img src={item.images![0] ? item.images![0].url : '/noImage.jpg'} alt="" />
              </div>

              <div className={styles.item_content}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>

              <div className={styles.buttons}>
                <Link href={`/admin/${item._id}`}>
                  <a>Modificar</a>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('items');

  return {
    props: {
      items: data
    }
  }
}

export default Launchpage;