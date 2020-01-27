import * as React from 'react';

import {Option} from '../types';

const keyCodes = {
  DOWN: 40,
  UP: 38,
  ENTER: 13,
  ESCAPE: 27
};

interface NavigationHookOptions {
  opened: boolean;

  closeSelect: () => void;

  selectedOption: Option;
  selectedOptions: Option[];

  onSelectOption: (option: Option) => void;

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

const useNavigationState = ({
  opened,
  closeSelect,
  options,
  selectedOption,
  selectedOptions,
  onSelectOption
}: NavigationHookOptions) => {
  const [navigatedIndex, setNavigatedIndex] = React.useState(-1);

  React.useEffect(() => {
    if (opened) {
      let initialIndex;

      if (selectedOption) {
        initialIndex = options.indexOf(selectedOption);
      } else if (selectedOptions && selectedOptions.length) {
        initialIndex = options.findIndex(
          option => option.value === selectedOptions[0].value
        );
      } else {
        initialIndex = getFirstAvailableOption(options);
      }

      setNavigatedIndex(initialIndex);
    } else {
      setNavigatedIndex(-1);
    }
  }, [opened]);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.keyCode) {
        case keyCodes.UP: {
          e.preventDefault();

          setNavigatedIndex(
            getPreviousAvailableOption(options, navigatedIndex)
          );

          break;
        }

        case keyCodes.DOWN: {
          e.preventDefault();

          setNavigatedIndex(getNextAvailableOption(options, navigatedIndex));

          break;
        }

        case keyCodes.ENTER: {
          const navigatedOption = options[navigatedIndex];

          if (navigatedOption && opened) {
            e.preventDefault();
            e.stopPropagation();

            onSelectOption(navigatedOption);
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
    },
    [navigatedIndex, opened, options, onSelectOption]
  );

  return {navigatedIndex, setNavigatedIndex, onKeyDown};
};

export default useNavigationState;
