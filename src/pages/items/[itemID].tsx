import { useEffect } from 'react';
import Head from 'next/head';
import { api } from '../../services/api';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { IImage } from '../../context/files';
import Header from '../../components/Header';
import { BaseContext } from 'next/dist/next-server/lib/utils';
import Image from 'next/image';

// import styles from '../../styles/item.module.css';
import {
  Container,
  BannerSlider,
  BannerPreview,
  Description,
  Links,
} from '../../styles/singleItem';
import { GlobalContainer } from '../../styles/global';

interface IImageElement extends Element {
  src: string;
}

const ItemPage: React.FC = ({
  item,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useEffect(() => {
    const images = document.querySelectorAll('#slider img');
    images[0].setAttribute('id', 'selected');
  });

  function handleChangeImage(target: any) {
    const image: IImageElement = document.querySelector(
      '#slider img#selected'
    )!;

    image!.src = target.src;

    target.setAttribute('id', 'selected');
  }

  return (
    <>
      <Head>
        <title>{item.title} - BV Móveis</title>
        <meta name="description" content={`${item.description} - BV Móveis`} />
        <meta name="robots" content="index, follow" />
      </Head>

      <Header />

      <GlobalContainer>
        <Container>
          <div>
            <BannerSlider id="slider">
              {item.images.map((image: IImage) => {
                return <img key={image._id} src={image.url} />;
              })}
            </BannerSlider>

            <BannerPreview>
              {item.images.map((image: IImage) => (
                <li
                  key={image._id}
                  onClick={(e) => handleChangeImage(e.target)}
                >
                  <img src={image.url} />
                </li>
              ))}
            </BannerPreview>
          </div>

          <Description>
            <h2>{item.title}</h2>
            <p>{item.description}</p>

            <Links>
              <a href={`https://wa.me/+5531995877646`}>
                <Image src="/whatsapp.svg" width={30} height={30} />
                Whatsapp
              </a>

              <a
                href="https://www.instagram.com/bvmoveis_rusticos/"
                target="_blank"
              >
                <Image src="/instagram.svg" width={30} height={30} />
                Acesse o instagram
              </a>
            </Links>
          </Description>
        </Container>
      </GlobalContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: BaseContext) => {
  const { data } = await api.get(`item/${params.itemID}`);

  return {
    props: {
      item: data,
    },
  };
};

export default ItemPage;
