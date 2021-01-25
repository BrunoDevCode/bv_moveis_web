import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from 'next/link';
import Switch from 'react-switch';
import Cookie from 'js-cookie';
import { FileProvider } from '../../context/files';
import styles from '../../styles/admin-item.module.css';
import { FormEvent, useState } from "react";
import { api } from "../../services/api";
import { useRouter } from 'next/router';

import FileList from '../../components/FileList';
import Upload from "../../components/Upload";
import { BaseContext } from "next/dist/next-server/lib/utils";

const ModifyItem: React.FC = ({ item }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const token: any = Cookie.get('@token');

  Cookie.set('@itemID', item._id);

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [isAvailable, setIsAvailable] = useState(item.isAvailable);
  const [isHomepage, setIsHomepage] = useState(item.isHomepage);

  function handleToogleIsHomepage() {
    isHomepage === true ? setIsHomepage(false) : setIsHomepage(true);
  }

  function handleToogleIsAvailable() {
    isAvailable === true ? setIsAvailable(false) : setIsAvailable(true);
  }

  function handleModifyItem(e: FormEvent) {
    e.preventDefault();

    const data = {
      title,
      description,
      isAvailable,
      isHomepage,
    }

    api.put(`/admin/${item._id}/update`, data, {
      headers: {
        authorization: token,
      }
    })
  }

  function handleDeleteItem(e: FormEvent) {
    e.preventDefault();

    api.delete(`/admin/item/delete/${item._id}`, {
      headers: {
        authorization: token,
      }
    }).then(() => {
      router.push('/admin/launchbase');
    });
  }

  return (
    <FileProvider>
      <div className={styles.container}>
        <header>
          <Link href='/admin/launchpage'>
            <a onClick={() => { Cookie.remove('@itemID') }}>Voltar</a>
          </Link>

          <h1>{title}</h1>
        </header>

        <form>
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

          <div>
            <Upload />
            <FileList />
          </div>

          <button type='button' className={styles.submit_form} onClick={handleDeleteItem}>
            Excluir Item e suas imagens
          </button>

          <button type='submit' onClick={handleModifyItem} className={styles.submit_form}>Modificar Produto</button>
        </form>
      </div>
    </FileProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }: BaseContext) => {
  const { data } = await api.get(`item/${params.itemID}`);
  return {
    props: {
      item: data
    }
  };
}

export default ModifyItem;