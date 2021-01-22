import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import Switch from 'react-switch';
import Upload from '../../components/Upload';
import FileList from '../../components/FileList';
import Cookie from 'js-cookie';
import { FileProvider } from "../../context/files";
import Link from "next/link";

import styles from '../../styles/new-item.module.css';

import { api } from "../../services/api";

const newItem: React.FC = () => {
  let token: String;

  const { push } = useRouter();

  AsyncStorage.getItem('@token', (error, result) => {
    if (error) {
      alert('Por favor faça login novamente');

      push('/admin');
    };

    token = result;
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [isHomepage, setIsHomepage] = useState(false);

  const [uploadFormDisplay, setUploadFormDisplay] = useState('none');
  const [newItemDisplay, setNewItemDisplay] = useState('block');


  function handleToogleIsHomepage() {
    isHomepage === true ? setIsHomepage(false) : setIsHomepage(true);
  }

  function handleToogleIsAvailable() {
    isAvailable === true ? setIsAvailable(false) : setIsAvailable(true);
  }

  async function handleCreateItem(e: FormEvent) {
    e.preventDefault();

    const data = {
      title,
      description,
      isAvailable,
      isHomepage,
    }

    api.post('admin/item/create', data, {
      headers: {
        authorization: token,
      }
    }).then(({ data }) => {
      Cookie.set('@itemID', data.itemID);
      setUploadFormDisplay('block');
      setNewItemDisplay('none');
    }).catch((error) => {
      alert('> Erro em criar novo produto');
    });
  }

  return (
    <FileProvider>
      <div className={styles.container}>
        <header>
          <Link href="/admin/launchpage">
            <a onClick={() => { Cookie.remove('@itemID') }}>Voltar</a>
          </Link>
          <h1>Novo produto</h1>
        </header>

        <form className={styles.form_new} style={{ display: newItemDisplay }}>
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

        <form className={styles.form_image_up} style={{ display: uploadFormDisplay }}>
          <Upload />
          <FileList />
        </form>
      </div>
    </FileProvider>
  );
}

export default newItem;