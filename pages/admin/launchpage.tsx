import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import Switch from 'react-switch';

import styles from '../../styles/launchpage.module.css';

const Launchpage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [isHomepage, setIsHomepage] = useState(false);

  const { push } = useRouter();

  // const userID = localStorage.getItem('token');

  // if (!userID) push('/');

  function handleToogleIsHomepage() {
    isHomepage === true ? setIsHomepage(false) : setIsHomepage(true);
    console.log(isHomepage);
  }

  return (
    <div className={styles.container}>
      <div className={styles.new_item_container}>
        <form>
          <h2>Criar Item</h2>

          <div className={styles.input_group}>
            <label htmlFor="title">Título :</label>
            <input type="text" id='title' value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="description">Descrição :</label>
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
          </div>

          <div className={styles.input_group}>
            <label htmlFor="title">Título :</label>
            <input type="text" id='title' value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="isHomepage">Aparecerá na homepage</label>
            <Switch
              checked={isHomepage}
              onChange={handleToogleIsHomepage}
            />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="isAvailable">Aparecerá na isAvailable</label>
            <Switch
              checked={false}
              onChange={() => { }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Launchpage;