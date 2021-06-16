import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Item } from '../../components/Item';
import Cookie from 'js-cookie';

import { api } from '../../services/api';

import { AdminContainer, AdminItem, AdminListContainer, AdminHeader } from '../../styles/back-office';
import { FiLogOut } from 'react-icons/fi';


const Launchpage: React.FC = ({ items }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  async function handleMakeLoggof() {
    Cookie.remove('@token');
    router.push('/');
  }

  return (
    <>
      <Head>
        <meta name='robots' content='no' />
      </Head>
      <AdminHeader>
        <Link href="/admin/new-item">
          <a>Criar novo produto</a>
        </Link>
        <button onClick={handleMakeLoggof}>
          <FiLogOut size={24} color='#E57878' />
        </button>
      </AdminHeader>

      <AdminContainer>
        <AdminListContainer>
          {items.map((item: Item) => (
            <Link key={item._id} href={`/admin/${item._id}`}>
              <a>
                <AdminItem>

                  <h3>{item.title}</h3>

                  <div>
                    <img
                      src={item.images![0] ? item.images![0].url : '//placehold.it/350x280?text=Produto sem imagem'}
                      alt="" />
                  </div>


                </AdminItem>
              </a>
            </Link>
          ))}
        </AdminListContainer>
      </AdminContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('items');

  return {
    props: {
      items: data
    }
  }
}

export default Launchpage;