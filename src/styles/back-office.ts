import styled from 'styled-components';

export const AdminHeader = styled.div`
  height: 50px;
  background-color: var(--back-header);
  min-width: 100%;
  display: grid;
  grid-template-columns: 70% 30%;
  place-items: center;
  margin-bottom: 8px;

  a {
    font-size: 2.3rem;
    font-weight: 400;
    color: white;
  }
`;

export const AdminContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  height: 100%;

  @media(min-width: 700px) {
    max-width: 680px;
  }

  @media(min-width: 1000px) {
    max-width: 980px;
  }
`;

export const AdminListContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  width: 100%;
  padding: 4px;

  @media(min-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media(min-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const AdminItem = styled.li`
  display: grid;
  height: 300px;
  border-radius: 6px;
  border: solid 1px var(--back-header);
  overflow: hidden;
  background-color: white;

  h3 {
    font-size: 3rem;
    font-weight: 900;
    text-align: center;
    margin: 4px;
  }

  div {
    object-fit: cover;
    max-height: 250px;

    img {
      object-fit: contain;
    }
  }
`;