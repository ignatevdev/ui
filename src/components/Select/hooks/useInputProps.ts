import * as React from 'react';

import classNames from 'classnames';

import keyCodes from './keyCodes';

import {SelectState} from './useSelectState';

interface InputHookArgs {
  prefixCls: string;

  selectState: SelectState;
}

const useInputProps = ({prefixCls, selectState}: InputHookArgs) => {
  const {
    state: {opened},
    handlers: {openSelect, closeSelect, navigateUp, navigateDown}
  } = selectState;

  const [focused, setFocused] = React.useState(false);

  const [searchValue, setSearchValue] = React.useState('');
  const inputRef = React.useRef(null);

  const className = `${prefixCls}-input-wrapper`;

  const classes = classNames(className, {
    [`${className}-focused`]: focused
  });

  const getInputProps = () => ({
    tabIndex: -1,
    value: searchValue,

    onChange: (e: React.FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;

      setSearchValue(target.value);
    },
    onBlur: () => {
      setSearchValue('');

      setFocused(false);

      closeSelect();
    },
    ref: inputRef
  });

  const getInputWrapperProps = () => ({
    className: classes,
    tabIndex: 0,
    onClick: () => {
      if (inputRef.current) {
        if (!opened) {
          const interval = setInterval(() => {
            if (
              !(
                inputRef.current.offsetHeight === 0 &&
                inputRef.current.offsetWidth === 0
              )
            ) {
              inputRef.current.focus();
              clearInterval(interval);
            }
          }, 20);

          setFocused(true);

          openSelect();
        }
      }
    },
    onMouseDown: (e: React.MouseEvent<HTMLElement>) => {
      if (focused) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
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
          const interval = setInterval(() => {
            if (document.activeElement === inputRef.current) {
              clearInterval(interval);
            } else {
              inputRef.current.focus();
            }
          }, 20);

          setFocused(true);

          openSelect();

          break;
        }
        default:
          break;
      }
    }
  });

  return {
    getInputProps,
    getInputWrapperProps
  };
};

export type InputControlProps = ReturnType<typeof useInputProps>;

export default useInputProps;
