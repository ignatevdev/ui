import * as React from 'react';

import keyCodes from './keyCodes';

import {SelectState} from './useSelectState';

interface ButtonHookArgs {
  selectState: SelectState;
}

const useButtonProps = ({selectState}: ButtonHookArgs) => {
  const {
    state: {opened, options, navigatedIndex},
    handlers: {toggleSelect, closeSelect, navigateUp, navigateDown, applyOption}
  } = selectState;

  const getButtonProps = () => ({
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();

      toggleSelect();
    },
    onBlur: () => {
      closeSelect();
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      switch (e.keyCode) {
        case keyCodes.UP: {
          e.preventDefault();

          navigateUp();

          break;
        }

        case keyCodes.DOWN: {
          e.preventDefault();

          navigateDown();

          break;
        }

        case keyCodes.ENTER: {
          const navigatedOption = options[navigatedIndex];

          if (navigatedOption && opened) {
            e.preventDefault();
            e.stopPropagation();

            applyOption(navigatedOption);
          }

          break;
        }

        case keyCodes.ESCAPE: {
          e.preventDefault();

          closeSelect();

          break;
        }

        default:
          break;
      }
    }
  });

  return {
    getButtonProps
  };
};

export type ButtonControlProps = ReturnType<typeof useButtonProps>;

export default useButtonProps;
