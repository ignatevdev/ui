import {
  SelectState,
  InputControlProps,
  ButtonControlProps,
  OptionsProps,
  OptionProps
} from './hooks';

export type SingleValue = string | number;
export type MultipleValue = SingleValue[];

export type Value = SingleValue | MultipleValue;

export interface Option {
  value: SingleValue;
  title: any;
  disabled?: boolean;
}

export type onChangeCallback = (
  value: Value,
  option: Option | Option[]
) => void;

export interface SelectProps {
  className?: string;

  disabled?: boolean;

  options: Option[];

  multiple?: boolean;
  searchable?: boolean;

  value: Value;

  onChange: onChangeCallback;

  renderInput?: (
    props: InputControlProps,
    state: SelectState
  ) => React.ReactNode;
  renderOptions: (props: OptionsProps, state: SelectState) => React.ReactNode;
  renderOption: (props: OptionProps, state: SelectState) => React.ReactNode;
  renderButton?: (
    props: ButtonControlProps,
    state: SelectState
  ) => React.ReactNode;

  animationTimeout?: number;
}
