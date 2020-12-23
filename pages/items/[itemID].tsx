import { useRouter } from 'next/router';

const ItemPage: React.FC = () => {
  const { itemID } = useRouter().query;
  

  return (
    <>
      <h1>Olá Mundo</h1>
      <strong>Item ID</strong>
      <p>{itemID}</p>
    </>
  );
}

export default ItemPage;