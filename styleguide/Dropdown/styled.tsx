import styled from 'styled-components';

import {Dropdown} from '../../src';

// Make animation more visible
export const animationTimeout = 400;

export const DropdownComponent = styled(Dropdown)``;

export const Content = styled.div`
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 4px 16px 0px;
  border-radius: 4px;
  padding: 16px;
`;

export const Wrapper = styled.div`
  &.ui-dropdown-content-enter {
    ${Content} {
      opacity: 0;
    }

    &[data-placement*='bottom'] ${Content} {
      transform: translate3d(0, -10px, 0);
    }

    &[data-placement*='top'] ${Content} {
      transform: translate3d(0, 10px, 0);
    }
  }

  &.ui-dropdown-content-enter-active {
    ${Content} {
      opacity: 1;
      transition-duration: ${animationTimeout}ms;
      transition-property: opacity, transform;
    }

    &[data-placement*='bottom'] ${Content} {
      transform: translate3d(0, 0px, 0);
    }

    &[data-placement*='top'] ${Content} {
      transform: translate3d(0, 0px, 0);
    }
  }

  &.ui-dropdown-content-exit {
    ${Content} {
      opacity: 1;
    }

    &[data-placement*='bottom'] ${Content} {
      transform: translate3d(0, 0px, 0);
    }

    &[data-placement*='top'] ${Content} {
      transform: translate3d(0, 0px, 0);
    }
  }

  &.ui-dropdown-content-exit-active {
    ${Content} {
      opacity: 0;
      transition-duration: ${animationTimeout}ms;
      transition-property: opacity, transform;
    }

    &[data-placement*='bottom'] ${Content} {
      transform: translate3d(0, -10px, 0);
    }

    &[data-placement*='top'] ${Content} {
      transform: translate3d(0, 10px, 0);
    }
  }
`;
