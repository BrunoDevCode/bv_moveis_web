import Link from 'next/link';

import styles from './item.module.css';

interface ImageProps {
  _id: string;
  url: string;
}

export interface Item {
  _id: string;
  title: string;
  description?: string;
  images?: Array<ImageProps>;
}

interface ItemProps {
  item: Item;
}

const ItemComponent: React.FC<ItemProps> = ({ item }) => {
  return (
    <li className={styles.container}>
      <div className={styles.item_image_container}>
        <img src={item.images[0] ? item.images[0].url : '/noImage.jpg'} alt="" />
      </div>

      <div className={styles.item_content}>

        <strong className={styles.title}>{item.title}</strong>
        <p>{item.description}</p>

        <button type='button' className={styles.back_link}>
          <Link href={`/items/${item._id}`}>
            <a>Detalhes</a>
          </Link>
        </button>
      </div>
    </li>
  );
}

export default ItemComponent;