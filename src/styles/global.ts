import styled, { createGlobalStyle } from 'styled-components';
import 'react-circular-progressbar/dist/styles.css';

export const GlobalContainer = styled.div`
  width: 90%;
  max-width: 400px;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 680px;
  }

  @media (min-width: 1100px) {
    max-width: 940px;
  }
`;

export const GlobalStyle = createGlobalStyle`

  :root {
    --back-color: #f0f0f5;
    --back-header: #4c191b;
    --back-header-light: #592b19;
    --back-footer: #100c08;
    font-size: 60%;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
    box-sizing: border-box;
  }

  html,
  body,
  #__next {
    min-height: 100vh;
  }

  #__next {
    display: flex;
    flex-direction: column;
  }

  body {
    background-color: var(--back-color);
  }

  footer {
    margin-top: auto;
    padding: 8px 0;
    background-color: var(--back-footer);
    width: 100%;
    display: grid;
    gap: 12px;
    place-items: center;
    height: 40px;
  }

  footer p {
    color: white;
    font-weight: 400;
    font-size: 10px;
    line-height: 26px;
  }

  @media(min-width: 768px) {
    footer {
      padding: 32px 0;
      height: 70px;
    }

    footer p {
      font-size: 16px;
      line-height: 26px;
    }
  }

  body,
  input,
  button {
    font-family: "Roboto", sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  button {
    background: none;
    color: inherit;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    width: 100%;
    height: 100%;
  }

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.15);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: rgba(24, 142, 211);
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(7, 117, 180);
  }

  img#selected {
    opacity: 1;
  }
`;
