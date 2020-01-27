import * as React from 'react';

import {SelectProps, Option} from '../../types';

import useNavigationState from './useNavigationState';
import useOpenedState from './useOpenedState';
import useSelectedState, {NewComputedValue} from './useSelectedState';
import useInputState from './useInputState';

interface InputState {
  inputRef: React.MutableRefObject<HTMLInputElement>;
  searchValue: string;
}

interface InputHandlers {
  setSearchValue: (searchValue: string) => void;
}

const useSelectState = ({
  options,
  multiple,
  searchable,
  onChange,
  value
}: SelectProps) => {
  const wrapperRef: React.MutableRefObject<HTMLDivElement> = React.useRef(null);

  const {opened, openSelect, closeSelect, toggleSelect} = useOpenedState();

  const {computeNewValue, selectedOption, selectedOptions} = useSelectedState({
    options,
    value,
    multiple
  });

  const {
    inputRef,
    searchValue,
    setSearchValue,
    filteredOptions,
    focusInput
  } = useInputState({options});

  const applyOption = (option: Option) => {
    const computedValue: NewComputedValue = computeNewValue(option);

    if (computedValue.options) {
      onChange(computedValue.value, computedValue.options);
    } else {
      onChange(computedValue.value, computedValue.option);

      closeSelect();
    }

    if (searchable) {
      setSearchValue('');

      if (inputRef.current) {
        inputRef.current.blur();

        if (wrapperRef.current) {
          wrapperRef.current.focus();
        }
      }
    }
  };

  const {
    navigatedIndex,
    setNavigatedIndex,
    navigateUp,
    navigateDown,
    navigateToStart
  } = useNavigationState({options: filteredOptions});

  const state = {
    searchable,
    opened,
    value,
    multiple,
    navigatedIndex,
    options: filteredOptions,
    selectedOption,
    selectedOptions,
    searchValue,
    wrapperRef,
    inputRef
  };

  const handlers = {
    openSelect,
    closeSelect,
    toggleSelect,
    setNavigatedIndex,
    setSearchValue,
    navigateUp,
    navigateDown,
    navigateToStart,
    onChange,
    computeNewValue,
    applyOption,
    focusInput
  };

  return {
    state,
    handlers
  };
};

export type SelectState = ReturnType<typeof useSelectState>;

export default useSelectState;
