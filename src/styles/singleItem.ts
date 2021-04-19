import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 24px;
  }
`;

export const BannerSlider = styled.div`
  width: 100%;
  height: 80vw;
  border-radius: 4px;
  max-height: 350px;
  border-radius: 1px solid #fff;
  box-shadow: 2px 2px 8px -4px black;
  position: relative;
  overflow: hidden;
  margin-bottom: 8px;

  img {
    object-fit: cover;
    transition: opacity 0.8s;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
`;

export const BannerPreview = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  li {
    width: 50px;
    height: 50px;
    list-style-type: none;
    border-radius: 4px;
    overflow: hidden;
    opacity: 0.6;
    cursor: pointer;
  }

  li + li {
    margin-left: 4px;
  }

  li:hover {
    opacity: 1;
  }

  li img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }
`;

export const Description = styled.div`
  display: grid;
  grid-template-rows: 50px 250px 30px;

  h2 {
    font-size: 32px;
    line-height: 42px;
    color: #1e1a1b;
    font-weight: 900;
    letter-spacing: 0.8;
    margin-bottom: 24px;
  }

  p {
    font-size: 22px;
    line-height: 32px;
    color: #413a3c;
  }
`;

export const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    line-height: 28px;
  }
`;
