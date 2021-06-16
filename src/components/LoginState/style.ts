import styled, { keyframes } from 'styled-components';

export const Spinner = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;

  display: grid;
  place-items: center;
  align-content: center;
  background-color: rgba(0, 0, 0, 0.6);

  aside {
    position: relative;
    width: 40px;
    height: 40px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
`;

const skCubeMove = keyframes`
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
`;

export const Cube1 = styled.div`
  background-color: #333;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: ${skCubeMove} 1.8s infinite ease-in-out;
  animation: ${skCubeMove} 1.8s infinite ease-in-out;
`;

export const Cube2 = styled.div`
  background-color: #333;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: ${skCubeMove} 1.8s infinite ease-in-out;
  animation: ${skCubeMove} 1.8s infinite ease-in-out;
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
`;
