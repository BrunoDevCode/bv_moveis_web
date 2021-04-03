import styled from 'styled-components';

export const Container = styled.header`
  background-color: var(--back-header);
  margin-bottom: 24px;

  display: grid;
  align-items: center;

  @media (min-width: 768px) {
    margin-bottom: 64px;
    height: 70px;
  }
`;

export const Content = styled.div`
  color: white;

  h1 {
    font-weight: 700;
    letter-spacing: 0.8px;
    font-family: 'Caveat', sans-serif;
    font-size: 24px;
    line-height: 34px;
  }

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-size: 42px;
      line-height: 52px;
    }
  }
`;

export const ResponsiveMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 4px;
`;

interface IMenuType {
  type: Boolean;
}

export const Menu = styled.ul<IMenuType>`
  @media (max-width: 768px) {
    opacity: ${(props) => (props.type ? 1 : 0)};
    visibility: ${(props) => (props.type ? 'visible' : 'hidden')};
    position: absolute;
    width: 100%;
    left: 0;

    z-index: 99;

    li {
      border-top: 1px solid white;
      width: 100%;
    }

    li a {
      font-size: 14px;
      line-height: 24px;
    }
  }

  li {
    list-style-type: none;
    font-weight: 400;
    text-transform: uppercase;
    background-color: var(--back-header);
    display: block;
    text-align: center;
  }

  @media (min-width: 768px) {
    opacity: 1;
    visibility: visible;
    position: initial;

    margin-left: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    li {
      font-size: 14px;
      line-height: 24px;
    }

    li:hover {
      color: black;
      transition: color 0.2s;
    }

    li + li {
      margin-left: 24px;
    }
  }
`;

export const MenuButton = styled.button`
  @media (min-width: 768px) {
    display: none;
  }
`;
