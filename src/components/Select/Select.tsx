import * as React from 'react';

import classNames from 'classnames';

import Dropdown, {DropdownOptions} from '../Dropdown/Dropdown';

import {getPrefix} from '../../utils';

import {
  useSelectState,
  useResetState,
  useInputProps,
  useButtonProps,
  useOptionsProps,
  SelectState
} from './hooks';

import {SelectProps} from './types';

interface DropdownContentProps extends SelectProps {
  dropdownOptions: DropdownOptions;

  selectState: SelectState;

  prefixCls: string;
}

const DropdownContent = ({
  renderOptions,
  renderOption,
  dropdownOptions,
  selectState,
  prefixCls,
  options
}: DropdownContentProps): any => {
  const optionsProps = useOptionsProps({
    dropdownOptions,
    renderOption,
    selectState,
    prefixCls,
    options
  });

  return renderOptions(optionsProps, selectState);
};

const Select = (props: SelectProps) => {
  const {
    disabled,
    className,
    animationTimeout,
    renderInput,
    renderButton,
    searchable
  } = props;

  const selectState = useSelectState(props);

  useResetState({selectState});

  const {
    state: {opened}
  } = selectState;

  const prefixCls = getPrefix('select');

  const classes = classNames(`${prefixCls}-wrapper`, className, {
    [`${prefixCls}-disabled`]: disabled
  });

  let control;

  if (searchable) {
    const inputProps = useInputProps({prefixCls, selectState});

    control = renderInput(inputProps, selectState);
  } else {
    const buttonProps = useButtonProps({
      selectState
    });

    control = renderButton(buttonProps, selectState);
  }

  return (
    <div className={classes}>
      <Dropdown
        opened={opened}
        animationTimeout={animationTimeout}
        renderContent={dropdownOptions => (
          <DropdownContent
            {...props}
            dropdownOptions={dropdownOptions}
            selectState={selectState}
            prefixCls={prefixCls}
          />
        )}
      >
        {control}
      </Dropdown>
    </div>
  );
};

export {Select};

export default Select;
