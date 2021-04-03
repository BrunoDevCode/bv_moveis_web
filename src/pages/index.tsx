import { api } from '../services/api';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ItemComponent, { Item } from '../components/Item';
import Link from 'next/link';
import { useEffect } from 'react';
import { IImage } from '../context/files';
import Head from 'next/head';
import { GlobalContainer } from '../styles/global';
// import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const Home: React.FC = ({
  items,
  images,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  let time = 4000,
    currentImageIndex = 0;

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
  }, []);

  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
      </Head>

      <Header />

      <GlobalContainer>
        <div className={styles.container}>
          <div id="slider" className={styles.slider}>
            {images.map((image: IImage) => {
              return <img key={image._id} src={image.url} alt="" />;
            })}
          </div>

          <main>
            <h2>Produtos em destaque</h2>

            <Link href="/items/">
              <a className={styles.link}>Ver todos produtos</a>
            </Link>

            <ul className={styles.items_container}>
              {items.map((item: Item) => {
                return <ItemComponent key={item._id} item={item} />;
              })}
            </ul>
          </main>
        </div>

        {/* <aside>
        <p>Avaliamos seu projeto! Entre em contato</p>

        <a target="_blank" href="https://www.instagram.com/bvmoveis_rusticos/">
          <FaInstagram size={24} color="white" className={styles.icons} />
          Instagram
        </a>

        <a target="_blank" href={`https://wa.me/+5531995877646`}>
          <FaWhatsapp size={24} color="green" className={styles.icons} />
          Whatsapp
        </a>
      </aside> */}
      </GlobalContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/homepage');

  return {
    props: {
      images: data.images,
      items: data.items,
    },
    revalidate: 60,
  };
};

export default Home;
