import * as React from 'react';

import {Option, Value} from '../../types';

import useNavigationState from './useNavigationState';
import useOpenedState from './useOpenedState';
import useSelectedState from './useSelectedState';

interface SelectStateArgs {
  options: Option[];

  multiple?: boolean;
  searchable?: boolean;

  value: Value;
}

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
  value
}: SelectStateArgs) => {
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
    computeNewValue
  };

  return {
    state,
    handlers
  };
};

export type SelectState = ReturnType<typeof useSelectState>;

export default useSelectState;
