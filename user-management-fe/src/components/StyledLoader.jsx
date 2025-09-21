import styled, { keyframes } from 'styled-components';

const l5Animation = keyframes`
  20% {background-position: 0% 50% ,50% 100%,100% 100%}
  40% {background-position: 0% 0%  ,50% 50% ,100% 100%}
  60% {background-position: 0% 100%,50% 0%  ,100% 50% }
  80% {background-position: 0% 100%,50% 100%,100% 0%  }
`;

const StyledLoader = styled.div`
    width: 100px;
    aspect-ratio: 0.75;
    --c: no-repeat linear-gradient(#1976d2 0 0);
    background:
        var(--c) 0% 100%,
        var(--c) 50% 100%,
        var(--c) 100% 100%;
    background-size: 20% 65%;
    animation: ${l5Animation} 1s infinite linear;
`;

export default StyledLoader;
