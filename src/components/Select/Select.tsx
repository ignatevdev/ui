import * as React from 'react';

import classNames from 'classnames';

import Dropdown, {DropdownOptions} from '../Dropdown/Dropdown';

import {getPrefix} from '../../utils';

import {useOpened, useNavigation} from './hooks/index';

import {Value, Option, onChangeCallback} from './types.d';

interface OptionsProps extends DropdownOptions {
  children: React.ReactNode;

  onMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLElement>) => void;
}

interface OptionProps {
  option: Option;

  index: number;

  className: string;

  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter: (event: React.MouseEvent<HTMLElement>) => void;
}

interface ControlProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onBlur: (event: React.MouseEvent<HTMLElement>) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;

  value: Option | Option[];
}

export interface SelectProps {
  className?: string;

  disabled?: boolean;

  options: Option[];

  multiple: boolean;

  value: Value;

  onChange: onChangeCallback;

  renderButton: (props: ControlProps) => React.ReactNode;
  renderOptions: (props: OptionsProps) => React.ReactNode;
  renderOption: (props: OptionProps) => React.ReactNode;

  animationTimeout?: number;
}

const Select = (props: SelectProps) => {
  const {
    value: rawValue,
    options,
    disabled,
    className,
    animationTimeout,
    onChange,
    renderButton,
    renderOptions,
    renderOption,
    multiple
  } = props;

  const value = multiple ? rawValue || [] : rawValue;

  const {opened, closeSelect, toggleSelect} = useOpened();

  const optionsByValue = options.reduce(
    (acc: any, opt: Option) => acc.set(opt.value, opt),
    new Map()
  );

  let selectedOption;
  let selectedOptions;

  if (multiple && Array.isArray(value)) {
    selectedOptions = value.map(val => optionsByValue.get(val));
  } else if (value) {
    selectedOption = options.find(option => option.value === value);
  }

  const onSelectOption = (option: Option) => {
    if (multiple) {
      if (Array.isArray(value) && value.includes(option.value)) {
        const newValue = value.filter(val => val !== option.value);
        const newOptions = newValue.map(val => optionsByValue.get(val));

        onChange(newValue, newOptions);
      } else {
        const currentOptions = Array.isArray(value)
          ? (value as Array<string | number>).map(
              (val): Option => optionsByValue.get(val)
            )
          : [];

        const newOptions = [...currentOptions, option];
        const newValue = newOptions.map(opt => opt.value);

        onChange(newValue, newOptions);
      }
    } else {
      onChange(option.value, option);

      closeSelect();
    }
  };

  const {navigatedIndex, setNavigatedIndex, onKeyDown} = useNavigation({
    opened,
    closeSelect,
    options,
    onSelectOption,
    selectedOption
  });

  const prefixCls = getPrefix('select');

  const classes = classNames(`${prefixCls}-wrapper`, className, {
    [`${prefixCls}-disabled`]: disabled
  });

  const onClick: ControlProps['onClick'] = e => {
    e.preventDefault();

    toggleSelect();
  };

  const onBlur: ControlProps['onBlur'] = () => {
    closeSelect();
  };

  const onOptionsMouseDown: OptionsProps['onMouseDown'] = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onOptionsMouseLeave: OptionsProps['onMouseLeave'] = () => {
    setNavigatedIndex(-1);
  };

  return (
    <div className={classes}>
      <Dropdown
        opened={opened}
        animationTimeout={animationTimeout}
        renderContent={dropdownOptions => {
          const content = (
            <div className={`${prefixCls}-options`}>
              {options.map((option, index) => {
                let isSelected;

                if (multiple) {
                  isSelected = (value as Array<string | number>).includes(
                    option.value
                  );
                } else {
                  isSelected = option.value === value;
                }

                const isNavigated = navigatedIndex === index;

                const optionClass = classNames(`${prefixCls}-option`, {
                  [`${prefixCls}-option-disabled`]: option.disabled,
                  [`${prefixCls}-option-selected`]: isSelected,
                  [`${prefixCls}-option-navigated`]: isNavigated
                });

                const onOptionClick: OptionProps['onClick'] = e => {
                  e.preventDefault();

                  onSelectOption(option);
                };

                const onOptionMouseEnter = () => {
                  setNavigatedIndex(index);
                };

                return renderOption({
                  option,
                  index,
                  className: optionClass,
                  onClick: option.disabled ? undefined : onOptionClick,
                  onMouseEnter: option.disabled ? undefined : onOptionMouseEnter
                });
              })}
            </div>
          );

          return renderOptions({
            ...dropdownOptions,
            children: content,
            onMouseDown: onOptionsMouseDown,
            onMouseLeave: onOptionsMouseLeave
          });
        }}
      >
        {renderButton({
          onClick,
          onBlur,
          onKeyDown,
          value: selectedOption || selectedOptions
        })}
      </Dropdown>
    </div>
  );
};

export {Select};

export default Select;
