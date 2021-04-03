import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { api } from "../../services/api";
import ItemComponent, { Item } from "../../components/Item";
import Header from "../../components/Header";

import styles from "../../styles/allItems.module.css";

const AllItems: React.FC = ({
  allItems,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Todos Produtos - BV Móveis Rusticos</title>
        <meta name="robots" content="index, follow" />
      </Head>
      <Header />

      <div className={styles.container}>
        <h2 className={styles.title}>Confira todos nossos produtos !</h2>

        <ul className={styles.items_container}>
          {allItems.map((item: Item) => {
            return <ItemComponent key={item._id} item={item} />;
          })}
        </ul>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("/items");

  return {
    props: {
      allItems: data,
    },
    revalidate: 600,
  };
};

export default AllItems;
