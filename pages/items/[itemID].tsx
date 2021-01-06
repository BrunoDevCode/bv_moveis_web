import { useEffect } from 'react';
import Head from 'next/head';
import { api } from '../../services/api';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import styles from '../../styles/item.module.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { FaWhatsapp } from 'react-icons/fa';

const ItemPage: React.FC = ({ item }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  let currentImageIndex = 0;

  useEffect(() => {
    const images = document.querySelectorAll('#slider img');

    console.log(images);

    images[0].setAttribute('id', 'selected');
  });

  function handleLeftImage() {
    const images = document.querySelectorAll('#slider img'), max = images.length;

    images[currentImageIndex].removeAttribute('id');

    currentImageIndex--;

    if (currentImageIndex < 0)
      currentImageIndex = max - 1;

    console.log(currentImageIndex)

    images[currentImageIndex].setAttribute('id', 'selected');
  }

  function handleRightImage() {
    const images = document.querySelectorAll('#slider img'), max = images.length;

    images[currentImageIndex].removeAttribute('id');

    currentImageIndex++;

    if (currentImageIndex >= max)
      currentImageIndex = 0;

    console.log(currentImageIndex)

    images[currentImageIndex].setAttribute('id', 'selected');
  }

  return (
    <>
      <Head>
        <title>{item.title} - BV Móveis</title>
        <meta name='description' content={`${item.description} - BV Móveis`} />
      </Head>

      <Header />

      <main className={styles.container}>
        <div className={styles.banner_container}>
          <div id='slider' className={styles.slider}>
            {item.images.map((image) => {
              return (
                <img key={image._id} src={image.url} />
              );
            })}
          </div>

          <div className={styles.button_group}>
            <button onClick={handleLeftImage}>
              <FiChevronLeft size={28} color='green' />
            </button>

            <button onClick={handleRightImage}>
              <FiChevronRight size={28} color='green' />
            </button>
          </div>
        </div>

        <div className={styles.description}>
          <h2>{item.title}</h2>
          <p className={styles.describe}>{item.description}</p>

          <button className={styles.whats}>
            <FaWhatsapp size={24} color='green' />
            <p>Faça um orçamento</p>
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await api.get(`item/${params.itemID}`);

  return {
    props: {
      item: data
    }
  }
}

export default ItemPage;