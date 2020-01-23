import * as React from 'react';

import {SelectState} from './useSelectState';

const useInputProps = ({state, handlers}: SelectState) => {
  const [searchValue, setSearchValue] = React.useState('');
  const inputRef = React.useRef(null);

  const getInputProps = () => ({
    value: searchValue,
    ref: inputRef
  });

  const getInputWrapperProps = () => {};

  return {
    getInputProps,
    getInputWrapperProps
  };
};

export type InputControlProps = ReturnType<typeof useInputProps>;

export default useInputProps;
