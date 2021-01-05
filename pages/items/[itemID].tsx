import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Item } from '../../components/Item';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import styles from '../../styles/item.module.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { FaWhatsapp } from 'react-icons/fa';

const ItemPage: React.FC = () => {
  const { itemID } = useRouter().query;
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    api.get(`item/${itemID}`)
      .then(({ data }) => {
        setItem(data);
        console.log(data)
        console.log(item);
      });

  }, [itemID]);

  // const images = document.querySelectorAll('#slider img'), max = images.length;
  // let currentImageIndex = 0;

  function handleLeftImage() {
    
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
          {/* {item.images.map((image) => {
            return (
              <img src={image.url} />
            );
          })} */}

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

export default ItemPage;