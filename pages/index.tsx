import { api } from '../services/api';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ItemComponent, { Item } from '../components/Item';
import Footer from '../components/Footer';
import Link from 'next/link';

const Home: React.FC = ({ items }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <aside className={styles.banner_container}>
          Aqui vão as imagens que irão rotacionar
        </aside>

        <main>
          <h2>Produtos em destaque</h2>

          <Link href='/items/'>
            <a>Ver todos produtos</a>
          </Link>

          <ul className={styles.items_container}>
            {items.map((item: Item) => {
              return (
                <ItemComponent key={item._id} item={item} />
              )
            })}
          </ul>

          <Link href='/items/'>
            <a>Ver todos produtos</a>
          </Link>
        </main>
      </div>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('http://10.0.0.108:3333/items/homepage');

  return {
    props: {
      items: data
    }
  }
}

export default Home;