import { api } from '../services/api';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ItemComponent, { Item } from '../components/Item';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useEffect } from 'react';

const Home: React.FC = ({ items, images }: InferGetStaticPropsType<typeof getStaticProps>) => {
  let time = 2000, currentImageIndex = 0;

  useEffect(() => {
    const images = document.querySelectorAll('#slider img');
    const max = images.length;
    setInterval(() => {
      images[currentImageIndex].removeAttribute('id');

      currentImageIndex++;

      if (currentImageIndex >= max) currentImageIndex = 0;

      images[currentImageIndex].setAttribute('id', 'selected');
    }, time)
  }, [])

  return (
    <>
      <Header />

      <div className={styles.slider_container}>
        <div id='slider' className={styles.slider}>
          {images.map(image => {
            return (
              <img key={image._id} src={image.url} alt="" />
            )
          })}
        </div>
      </div>

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
  const items = await api.get('http://10.0.0.108:3333/items/homepage');
  const images = await api.get('http://10.0.0.108:3333/homepage/images')

  return {
    props: {
      items: items.data,
      images: images.data
    }
  }
}

export default Home;