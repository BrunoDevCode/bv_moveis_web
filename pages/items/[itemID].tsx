import { useEffect } from 'react';
import Head from 'next/head';
import { api } from '../../services/api';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { IImage } from '../../context/files';

import styles from '../../styles/item.module.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { FaWhatsapp } from 'react-icons/fa';
import { BaseContext } from 'next/dist/next-server/lib/utils';

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

    if (currentImageIndex < 0) currentImageIndex = max - 1;

    images[currentImageIndex].setAttribute('id', 'selected');
  }

  function handleRightImage() {
    const images = document.querySelectorAll('#slider img'), max = images.length;

    images[currentImageIndex].removeAttribute('id');

    currentImageIndex++;

    if (currentImageIndex >= max) currentImageIndex = 0;

    images[currentImageIndex].setAttribute('id', 'selected');
  }

  return (
    <>
      <Head>
        <title>{item.title} - BV Móveis</title>
        <meta name='description' content={`${item.description} - BV Móveis`} />
        <meta name='robots' content='index, follow' />
      </Head>

      <Header />

      <main className={styles.container}>
        <div className={styles.banner_container}>
          <div id='slider' className={styles.slider}>
            {item.images.map((image: IImage) => {
              return (
                <img key={image._id} id={image._id} src={image.url} />
              );
            })}
          </div>

          {item.images.length > 1 && (
            <div className={styles.button_group}>
              <button onClick={handleLeftImage}>
                <FiChevronLeft size={28} color='green' />
              </button>

              <button onClick={handleRightImage}>
                <FiChevronRight size={28} color='green' />
              </button>
            </div>
          )}
        </div>

        <div className={styles.description}>
          <h2>{item.title}</h2>
          <p className={styles.describe}>{item.description}</p>

          <a target='_blank' className={styles.whats} href={`https://wa.me/+5531995877646`}>
            <FaWhatsapp size={24} color='green' className={styles.icons} />
            Whatsapp
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }: BaseContext) => {
  const { data } = await api.get(`item/${params.itemID}`);

  return {
    props: {
      item: data
    }
  }
}

export default ItemPage;