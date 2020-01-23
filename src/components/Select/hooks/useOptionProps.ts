import * as React from 'react';

import {Option} from '../types';

import {SelectState} from './useSelectState';

interface OptionHookArgs {
  option: Option;

  selectState: SelectState;
}

const useOptionProps = ({option, selectState}: OptionHookArgs) => {
  const getOptionProps = () => ({});

  return {
    option,
    getOptionProps
  };
};

export type OptionProps = ReturnType<typeof useOptionProps>;

export default useOptionProps;
