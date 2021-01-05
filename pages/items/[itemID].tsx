import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Item } from '../../components/Item';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import styles from '../../styles/item.module.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { FaWhatsapp } from 'react-icons/fa';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const ItemPage: React.FC = ({ item }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  useEffect(() => {
    // const images = document.querySelectorAll('#slider img'), max = images.length;

    // console.log(images)
  })

  console.log(item);


  function handleLeftImage() {
    console.log(item.images);
  }

  function handleRightImage() {

  }

  return (
    <>
      <Header />
      <div className={styles.banner_container}>
        <div id='slider' className={styles.slider}>
          <button onClick={handleLeftImage}>
            <FiChevronLeft size={24} color='white' />
          </button>

          {item.images.map((image) => {
            return (
              <img key={image._id} src={image.url} />
            );
          })}

          <button onClick={handleRightImage}>
            <FiChevronRight size={24} color='white' />
          </button>
        </div>
      </div>
      {/* <h1>{item.title}</h1>
      <p>{item.description}</p> */}

      <p>Você tem algum projeto diferente, podemos dar uma olhada</p>

      <button>
        <FaWhatsapp size={24} color='white' />
        <p>Mande uma mensagem</p>
      </button>
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