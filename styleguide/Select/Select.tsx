import * as React from 'react';

import {SelectProps} from '../../src';

import {
  Wrapper,
  ButtonControl,
  InputWrapper,
  InputControl,
  InputValue,
  DropdownContent,
  DropdownWrapper,
  animationTimeout
} from './styled';

interface Props {
  className?: string;

  value: SelectProps['value'];

  onChange: SelectProps['onChange'];

  placeholder: string;

  multiple?: boolean;
  searchable?: boolean;

  options: SelectProps['options'];
}

const Select = (props: Props) => {
  const {placeholder, ...rest} = props;

  const renderButton: SelectProps['renderButton'] = (
    {getButtonProps},
    {state: {selectedOption, selectedOptions}}
  ) => {
    const text = selectedOptions
      ? selectedOptions.length &&
        selectedOptions.map(val => val.title).join(', ')
      : selectedOption && selectedOption.title;

    return (
      <ButtonControl {...getButtonProps()}>{text || placeholder}</ButtonControl>
    );
  };

  const renderOptions: SelectProps['renderOptions'] = ({
    getOptionsProps,
    placement
  }) => {
    const {children, ...dropdownProps} = getOptionsProps();

    return (
      <DropdownWrapper {...dropdownProps} data-placement={placement}>
        <DropdownContent>{children}</DropdownContent>
      </DropdownWrapper>
    );
  };

  const renderOption: SelectProps['renderOption'] = ({
    option,
    getOptionProps
  }) => <div {...getOptionProps()}>{option.title}</div>;

  const renderInput: SelectProps['renderInput'] = (
    {getInputProps, getInputWrapperProps},
    {state: {selectedOption}}
  ) => {
    return (
      <InputWrapper {...getInputWrapperProps()}>
        <InputValue>
          {selectedOption ? selectedOption.title : placeholder}
        </InputValue>

        <InputControl
          {...getInputProps()}
          placeholder={selectedOption ? selectedOption.title : placeholder}
        />
      </InputWrapper>
    );
  };

  return (
    <Wrapper
      {...rest}
      animationTimeout={animationTimeout}
      renderInput={renderInput}
      renderButton={renderButton}
      renderOptions={renderOptions}
      renderOption={renderOption}
    />
  );
};

export {Select};

export default Select as React.FC<Props>;
