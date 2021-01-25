import { api } from '../services/api';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ItemComponent, { Item } from '../components/Item';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useEffect } from 'react';
import { IImage } from '../context/files';

const Home: React.FC = ({ items, images }: InferGetStaticPropsType<typeof getStaticProps>) => {
  let time = 4000, currentImageIndex = 0;

  useEffect(() => {
    const images = document.querySelectorAll('#slider img');
    const max = images.length;

    if (max > 0) {
      start();
    }

    function start() {
      images[0].setAttribute('id', 'selected');

      setInterval(() => {
        images[currentImageIndex].removeAttribute('id');

        currentImageIndex++;

        if (currentImageIndex >= max) currentImageIndex = 0;

        images[currentImageIndex].setAttribute('id', 'selected');
      }, time);
    }

  }, [])

  return (
    <>
      <Header />

      <div className={styles.container}>

        {/* <div className={styles.slider_container}> */}
        <div id='slider' className={styles.slider}>
          {images.map((image: IImage) => {
            return (
              <img key={image._id} src={image.url} alt="" />
            )
          })}
        </div>
        {/* </div> */}

        <main>
          <h2>Produtos em destaque</h2>

          <Link href='/items/'>
            <a className={styles.link}>Ver todos produtos</a>
          </Link>

          <ul className={styles.items_container}>
            {items.map((item: Item) => {
              return (
                <ItemComponent key={item._id} item={item} />
              )
            })}
          </ul>

          <Link href='/items/'>
            <a className={styles.link}>Ver todos produtos</a>
          </Link>
        </main>
      </div>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/homepage');

  return {
    props: {
      images: data.images,
      items: data.items,
    }
  }
}

export default Home;