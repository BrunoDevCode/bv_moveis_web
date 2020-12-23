import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { api } from '../../services/api';
import ItemComponent, { Item } from '../../components/Item';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import styles from '../../styles/allItems.module.css';

const AllItems: React.FC = ({ allItems }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Header />
      <ul className={styles.items_container}>
        {allItems.map((item: Item) => {
          return (
            <ItemComponent key={item._id} item={item} />
          )
        })}
      </ul>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('http://10.0.0.108:3333/items')

  return {
    props: {
      allItems: data
    },
    revalidate: 600,
  }
}

export default AllItems;