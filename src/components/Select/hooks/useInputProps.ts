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
    state: {opened, options, navigatedIndex, searchValue, inputRef, wrapperRef},
    handlers: {
      openSelect,
      closeSelect,
      navigateUp,
      navigateDown,
      navigateToStart,
      setSearchValue,
      applyOption,
      focusInput
    }
  } = selectState;

  const [focused, setFocused] = React.useState(false);

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
    ref: wrapperRef,
    className: classes,
    tabIndex: 0,
    onClick: () => {
      if (inputRef.current) {
        if (!opened) {
          setFocused(true);
          focusInput();
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
          if (opened) {
            const navigatedOption = options[navigatedIndex];

            if (navigatedOption && opened) {
              e.preventDefault();
              e.stopPropagation();

              applyOption(navigatedOption);
            }
          } else {
            setFocused(true);
            focusInput();

            navigateToStart();
            openSelect();
          }

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
