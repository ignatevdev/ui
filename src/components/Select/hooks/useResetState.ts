import * as React from 'react';

import {SelectState} from './useSelectState';

interface ResetHookArgs {
  selectState: SelectState;
}

const useResetState = ({selectState}: ResetHookArgs) => {
  const {
    state: {opened, selectedOption, options},
    handlers: {setNavigatedIndex, navigateToStart}
  } = selectState;

  React.useEffect(() => {
    if (opened) {
      if (selectedOption) {
        setNavigatedIndex(options.indexOf(selectedOption));
      } else {
        navigateToStart();
      }
    } else {
      setNavigatedIndex(-1);
    }
  }, [opened]);
};

export default useResetState;
