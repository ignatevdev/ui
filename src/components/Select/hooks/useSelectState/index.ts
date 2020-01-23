import * as React from 'react';

import {SelectProps, Option} from '../../types';

import useNavigationState from './useNavigationState';
import useOpenedState from './useOpenedState';
import useSelectedState from './useSelectedState';

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
  const {opened, openSelect, closeSelect, toggleSelect} = useOpenedState();
  const {
    navigatedIndex,
    setNavigatedIndex,
    navigateUp,
    navigateDown,
    navigateToStart
  } = useNavigationState({options});

  const {computeNewValue, selectedOption, selectedOptions} = useSelectedState({
    options,
    value,
    multiple
  });

  const applyOption = (option: Option) => {
    const computedValue = computeNewValue(option);

    if (computedValue.options) {
      onChange(computedValue.value, computedValue.options);
    } else {
      onChange(computedValue.value, computedValue.option);

      closeSelect();
    }
  };

  const state = {
    searchable,
    opened,
    value,
    multiple,
    navigatedIndex,
    options,
    selectedOption,
    selectedOptions
  };

  const handlers = {
    openSelect,
    closeSelect,
    toggleSelect,
    setNavigatedIndex,
    navigateUp,
    navigateDown,
    navigateToStart,
    onChange,
    computeNewValue,
    applyOption
  };

  return {
    state,
    handlers
  };
};

export type SelectState = ReturnType<typeof useSelectState>;

export default useSelectState;
