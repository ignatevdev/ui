import * as React from 'react';

import {SelectProps} from '../../src';

import {
  Wrapper,
  Control,
  DropdownContent,
  DropdownWrapper,
  animationTimeout
} from './styled';

interface Props {
  className?: string;

  value: SelectProps['value'];

  onChange: SelectProps['onChange'];

  placeholder: string;

  multiple: boolean;

  options: SelectProps['options'];
}

const Select = (props: Props) => {
  const {placeholder, ...rest} = props;

  return (
    <Wrapper
      {...rest}
      animationTimeout={animationTimeout}
      renderButton={({value, ...buttonProps}) => {
        const text = Array.isArray(value)
          ? value.length && value.map(val => val.title).join(', ')
          : value && value.title;

        return <Control {...buttonProps}>{text || placeholder}</Control>;
      }}
      renderOptions={({
        ref,
        children,
        placement,
        style,
        onMouseDown,
        onMouseLeave
      }) => (
        <DropdownWrapper
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          style={style}
          ref={ref}
          data-placement={placement}
        >
          <DropdownContent>{children}</DropdownContent>
        </DropdownWrapper>
      )}
      renderOption={({className, onClick, onMouseEnter, option}) => (
        <div
          className={className}
          key={option.value}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
        >
          {option.title}
        </div>
      )}
    />
  );
};

export {Select};

export default Select as React.FC<Props>;
