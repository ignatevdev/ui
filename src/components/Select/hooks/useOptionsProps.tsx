import * as React from 'react';

import {DropdownOptions} from '../../Dropdown/Dropdown';

import {SelectProps, Option} from '../types';

import {SelectState} from './useSelectState';

import useOptionProps from './useOptionProps';

interface OptionsHookArgs {
  dropdownOptions: DropdownOptions;

  renderOption: SelectProps['renderOption'];

  selectState: SelectState;

  prefixCls: string;

  options: Option[];
}

interface OptionContentProps {
  prefixCls: string;

  option: Option;

  index: number;

  selectState: SelectState;

  renderOption: SelectProps['renderOption'];
}

const OptionContent = ({
  option,
  renderOption,
  selectState
}: OptionContentProps): any => {
  const optionProps = useOptionProps({option, selectState});

  return renderOption(optionProps, selectState);
};

const useOptionsProps = ({
  dropdownOptions,
  selectState,
  options,
  prefixCls,
  renderOption
}: OptionsHookArgs) => {
  const {ref, style, placement, arrowProps} = dropdownOptions;
  const {handlers} = selectState;

  const {setNavigatedIndex} = handlers;

  const children = (
    <div className={`${prefixCls}-options`}>
      {options.map((option, index) => (
        <OptionContent
          renderOption={renderOption}
          key={option.value}
          prefixCls={prefixCls}
          option={option}
          index={index}
          selectState={selectState}
        />
      ))}
    </div>
  );

  const getOptionsProps = () => ({
    onMouseDown: (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
    },
    onMouseLeave: () => {
      setNavigatedIndex(-1);
    },
    ref,
    style,
    children
  });

  const getArrowProps = () => arrowProps;

  return {
    getOptionsProps,
    getArrowProps,
    placement
  };
};

export type OptionsProps = ReturnType<typeof useOptionsProps>;

export default useOptionsProps;
