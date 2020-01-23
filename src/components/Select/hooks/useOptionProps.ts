import * as React from 'react';

import classNames from 'classnames';

import {Option} from '../types';

import {SelectState} from './useSelectState';

interface OptionHookArgs {
  option: Option;

  index: number;

  prefixCls: string;

  selectState: SelectState;
}

const useOptionProps = ({
  prefixCls,
  option,
  index,
  selectState
}: OptionHookArgs) => {
  const {
    state: {value, multiple, navigatedIndex},
    handlers: {applyOption, setNavigatedIndex}
  } = selectState;

  let isSelected;

  if (multiple) {
    isSelected = ((value as Array<string | number>) || []).includes(
      option.value
    );
  } else {
    isSelected = option.value === value;
  }

  const isNavigated = navigatedIndex === index;

  const className = classNames(`${prefixCls}-option`, {
    [`${prefixCls}-option-disabled`]: option.disabled,
    [`${prefixCls}-option-selected`]: isSelected,
    [`${prefixCls}-option-navigated`]: isNavigated
  });

  const getOptionProps = () => {
    return option.disabled
      ? {className}
      : {
          className,
          onClick: (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();

            applyOption(option);
          },
          onMouseEnter: () => {
            setNavigatedIndex(index);
          }
        };
  };

  return {
    option,
    getOptionProps
  };
};

export type OptionProps = ReturnType<typeof useOptionProps>;

export default useOptionProps;
