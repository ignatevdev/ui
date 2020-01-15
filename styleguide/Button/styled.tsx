import styled from 'styled-components';

import {Button} from '../../src';

// Make animation more visible
export const animationTimeout = 400;

export const Wrapper = styled(Button)`
  background-color: #000;
  color: #fff;
  padding: 20px;

  position: relative;

  transition: color ${animationTimeout}ms ease-in-out;

  .ui-button-loader {
    background: #000;

    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    text-align: center;

    transform: translate(0, -50%);
  }

  .ui-button-loader-enter {
    opacity: 0;
  }

  .ui-button-loader-enter-active {
    opacity: 1;
    transition: opacity 0.2s;
  }

  .ui-button-loader-exit {
    opacity: 1;
  }

  .ui-button-loader-exit-active {
    opacity: 0;
    transition: opacity 0.2s;
  }
`;

export const Loader = styled.div``;
