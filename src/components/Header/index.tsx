import { useState } from 'react';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';

import { Container, Menu, Content, MenuButton, ResponsiveMenu } from './style';

import { GlobalContainer } from '../../styles/global';

const Header: React.FC = () => {
  const [responsiveType, setResponsiveType] = useState(false);

  function toogleResponsiveMenu() {
    responsiveType == false
      ? setResponsiveType(true)
      : setResponsiveType(false);
  }

  return (
    <Container>
      <GlobalContainer>
        <Content>
          <ResponsiveMenu>
            <h1>BV Móveis</h1>

            <MenuButton onClick={toogleResponsiveMenu}>
              <FiMenu color="white" size={32} />
            </MenuButton>
          </ResponsiveMenu>

          <Menu id="menu" type={responsiveType}>
            <li>
              <Link href="/">
                <a>Início</a>
              </Link>
            </li>

            <li>
              <Link href="/items/">
                <a>Produtos</a>
              </Link>
            </li>

            <li>
              <Link href="/admin/">
                <a>Back Office</a>
              </Link>
            </li>
          </Menu>
        </Content>
      </GlobalContainer>
    </Container>
  );
};

export default Header;
