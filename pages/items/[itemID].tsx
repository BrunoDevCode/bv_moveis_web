import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import Banner from '../../components/Banner';
import { Item } from '../../components/Item';

const ItemPage: React.FC = () => {
  const { itemID } = useRouter().query;
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    api.get(`item/${itemID}`)
      .then(({ data }) => {
        setItem(data);
      });

  }, [itemID]);

  return (
    <>
      <Banner />
      <h1>{item.title}</h1>
      <p>{item.description}</p>
    </>
  );
}

export default ItemPage;