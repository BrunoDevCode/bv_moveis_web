import { useRouter } from 'next/router';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import Switch from 'react-switch';

import styles from '../../styles/launchpage.module.css';

const Launchpage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [isHomepage, setIsHomepage] = useState(false);

  const { push } = useRouter();

  // const userID = localStorage.getItem('token');

  // if (!userID) push('/');

  function handleToogleIsHomepage() {
    isHomepage === true ? setIsHomepage(false) : setIsHomepage(true);
  }

  function handleToogleIsAvailable() {
    isAvailable === true ? setIsAvailable(false) : setIsAvailable(true);
  }

  function handleCreateItem(e: FormEvent) {
    e.preventDefault();

    const data = {
      title,
      description,
      isAvailable,
      isHomepage,
    }

    console.log(data);
  }

  return (
    <div className={styles.container}>
      <details className={styles.list_item_list}>
        <summary>Listar dos produtos</summary>
      </details>

      <details className={styles.new_item_container}>
        <summary>Criar Novo Produto</summary>

        <form className={styles.form_new}>
          <div className={styles.input_group}>
            <label htmlFor="title">Título :</label>
            <input type="text" id='title' value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="description">Descrição do produto :</label>
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
          </div>

          <div className={styles.isHomepage_container}>
            <div className={styles.isHomepage}>
              <label htmlFor="isHomepage">Ficara vísivel na pagina Inicial ?</label>
              <Switch
                checked={isHomepage}
                onChange={handleToogleIsHomepage}
                checkedIcon={false}
                uncheckedIcon={false}
                height={20}
                width={40}
                handleDiameter={20}
                onColor='#4C191B'
              />
            </div>

            <span>Lembrando que se ja houver 6 produtos, pode ser que este não apareça</span>
          </div>

          <div className={styles.isAvailable}>
            <label htmlFor="isAvailable">Há este produto no estoque ?</label>
            <Switch
              checked={isAvailable}
              onChange={handleToogleIsAvailable}
              checkedIcon={false}
              uncheckedIcon={false}
              height={20}
              width={40}
              handleDiameter={20}
              onColor='#4C191B'
            />
          </div>

          <button onClick={handleCreateItem} className={styles.submit_form}>Criar Produto</button>
        </form>

        <form className={styles.form_image_up}>

        </form>
      </details>

      <div className={styles.delete_item_container}>

      </div>
    </div>
  );
}

export default Launchpage;