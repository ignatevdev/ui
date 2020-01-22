import styled from 'styled-components';

import {Select, Button} from '../../src';

// Make animation more visible
export const animationTimeout = 400;

export const Wrapper = styled(Select)``;

export const Control = styled(Button)`
  border-radius: 5px;
  border: solid 2px #e3e8f0;
  background: #fff;
  padding: 9px 13px;

  cursor: pointer;

  font-size: 16px;
  color: #3a405b;
`;

export const DropdownContent = styled.div`
  border-radius: 3px;
  box-shadow: 0 0 6px 0 rgba(198, 198, 198, 0.5);
  background-color: #ffffff;

  padding: 8px 2px;

  .ui-select-option {
    display: block;

    padding: 6px 11px;

    cursor: pointer;

    transition: background-color 0.2s ease-in-out;

    font-size: 15px;
    color: #4f546f;

    &:not(.ui-select-option-disabled) {
      &:hover,
      &.ui-select-option-navigated {
        background-color: #f3f5f9 !important;
        transition: background-color 0.2s ease-in-out !important;
      }
    }

    &.ui-select-option-selected {
      background-color: #d0daed;
      transition: none;
    }

    &.ui-select-option-disabled {
      cursor: default;
      color: #ccc;
    }
  }
`;

export const DropdownWrapper = styled.div`
  &.ui-dropdown-content-enter {
    ${DropdownContent} {
      opacity: 0;
    }

    &[data-placement*='bottom'] ${DropdownContent} {
      transform: translate3d(0, -10px, 0);
    }

    &[data-placement*='top'] ${DropdownContent} {
      transform: translate3d(0, 10px, 0);
    }
  }

  &.ui-dropdown-content-enter-active {
    ${DropdownContent} {
      opacity: 1;
      transition-duration: ${animationTimeout}ms;
      transition-property: opacity, transform;
    }

    &[data-placement*='bottom'] ${DropdownContent} {
      transform: translate3d(0, 0px, 0);
    }

    &[data-placement*='top'] ${DropdownContent} {
      transform: translate3d(0, 0px, 0);
    }
  }

  &.ui-dropdown-content-exit {
    ${DropdownContent} {
      opacity: 1;
    }

    &[data-placement*='bottom'] ${DropdownContent} {
      transform: translate3d(0, 0px, 0);
    }

    &[data-placement*='top'] ${DropdownContent} {
      transform: translate3d(0, 0px, 0);
    }
  }

  &.ui-dropdown-content-exit-active {
    ${DropdownContent} {
      opacity: 0;
      transition-duration: ${animationTimeout}ms;
      transition-property: opacity, transform;
    }

    &[data-placement*='bottom'] ${DropdownContent} {
      transform: translate3d(0, -10px, 0);
    }

    &[data-placement*='top'] ${DropdownContent} {
      transform: translate3d(0, 10px, 0);
    }
  }
`;
