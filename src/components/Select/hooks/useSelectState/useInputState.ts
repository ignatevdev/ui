import * as React from 'react';

import {Option} from '../../types';

interface InputHookArgs {
  options: Option[];
}

const useInputState = ({options}: InputHookArgs) => {
  const inputRef: React.MutableRefObject<HTMLInputElement> = React.useRef(null);
  const [searchValue, setSearchValue] = React.useState('');

  let filteredOptions = options;

  if (searchValue.trim()) {
    filteredOptions = options.filter(option =>
      option.title.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
  }

  const focusInput = () => {
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
  };

  return {
    inputRef,
    searchValue,
    setSearchValue,
    filteredOptions,
    focusInput
  };
};

export default useInputState;
