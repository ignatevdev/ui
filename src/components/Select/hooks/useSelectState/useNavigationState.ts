import * as React from 'react';

import {Option} from '../../types';

interface NavigationHookOptions {
  options: Option[];
}

const getFirstAvailableOption = (options: Option[]) =>
  options.findIndex(option => !option.disabled);

const getLastAvailableOption = (options: Option[]) =>
  options.length - 1 - getFirstAvailableOption(options.slice().reverse());

const getNextAvailableOption = (options: Option[], navigatedIndex: number) => {
  for (let index = navigatedIndex + 1; index < options.length; index += 1) {
    const option = options[index];

    if (!option.disabled) {
      return index;
    }
  }

  return getFirstAvailableOption(options);
};

const getPreviousAvailableOption = (
  options: Option[],
  navigatedIndex: number
) => {
  for (let index = navigatedIndex - 1; index >= 0; index -= 1) {
    const option = options[index];

    if (!option.disabled) {
      return index;
    }
  }

  return getLastAvailableOption(options);
};

const useNavigationState = ({options}: NavigationHookOptions) => {
  const [navigatedIndex, setNavigatedIndex] = React.useState(-1);

  const navigateToStart = () => {
    getFirstAvailableOption(options);
  };

  const navigateUp = () => {
    setNavigatedIndex(getPreviousAvailableOption(options, navigatedIndex));
  };

  const navigateDown = () => {
    setNavigatedIndex(getNextAvailableOption(options, navigatedIndex));
  };

  return {
    navigatedIndex,
    setNavigatedIndex,
    navigateUp,
    navigateDown,
    navigateToStart
  };
};

export default useNavigationState;
